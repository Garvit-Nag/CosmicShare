from appwrite.client import Client
from appwrite.services.storage import Storage
from appwrite.input_file import InputFile
from appwrite.exception import AppwriteException
from fastapi import UploadFile, HTTPException
from datetime import datetime, timedelta
import uuid
import os
from typing import Dict, Any
from ..config import settings
from ..utils.validators import validate_file_extension, validate_file_size

class StorageService:
    def __init__(self):
        try:
            self.client = Client()
            self.client.set_endpoint(settings.APPWRITE_ENDPOINT)
            self.client.set_project(settings.APPWRITE_PROJECT_ID)
            self.client.set_key(settings.APPWRITE_API_KEY)
            self.storage = Storage(self.client)
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Failed to initialize storage service: {str(e)}"
            )

    def _get_expiration_seconds(self, expiration_time: str) -> int:
        expiration_map = {
            "30s": 30,
            "24h": 86400,
            "3d": 259200,
            "5d": 432000,
            "7d": 604800
        }
        return expiration_map.get(expiration_time, 86400)

    async def upload_file(self, file: UploadFile, expiration_time: str) -> Dict[str, Any]:
        try:
            validate_file_extension(file.filename)
            contents = await file.read()
            validate_file_size(len(contents))

            _, ext = os.path.splitext(file.filename)
            file_id = f"{uuid.uuid4().hex[:8]}{ext}"
            
            expiration_seconds = self._get_expiration_seconds(expiration_time)
            expiration = datetime.now() + timedelta(seconds=expiration_seconds)
            
            result = self.storage.create_file(
                bucket_id=settings.APPWRITE_BUCKET_ID,
                file_id=file_id,
                file=InputFile.from_bytes(contents, file.filename),
                permissions=['read("any")']
            )
            
            new_file_name = f"{file_id}__exp_{expiration.isoformat()}"
            self.storage.update_file(
                bucket_id=settings.APPWRITE_BUCKET_ID,
                file_id=file_id,
                name=new_file_name,
                permissions=['read("any")']
            )

            url = f"{settings.APPWRITE_ENDPOINT}/storage/buckets/{settings.APPWRITE_BUCKET_ID}/files/{file_id}/view?project={settings.APPWRITE_PROJECT_ID}"
            
            return {
                'file_id': file_id,
                'url': url,
                'expiration': expiration.isoformat(),
                'original_name': file.filename
            }

        except HTTPException as e:
            raise e
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
        finally:
            await file.seek(0)

    async def cleanup_expired_files(self):
        try:
            files = self.storage.list_files(settings.APPWRITE_BUCKET_ID)
            now = datetime.now()
            
            for file in files['files']:
                try:
                    file_name = file['name']
                    if '__exp_' in file_name:
                        _, exp_str = file_name.split('__exp_')
                        expiration = datetime.fromisoformat(exp_str)
                        if now > expiration:
                            self.storage.delete_file(
                                bucket_id=settings.APPWRITE_BUCKET_ID,
                                file_id=file['$id']
                            )
                            print(f"Deleted expired file: {file['$id']}")
                except Exception as e:
                    print(f"Error processing file {file['$id']}: {str(e)}")
                    continue

        except Exception as e:
            print(f"Error during cleanup: {str(e)}")

    async def get_file_info(self, file_id: str) -> Dict[str, Any]:
        try:
            file = self.storage.get_file(
                bucket_id=settings.APPWRITE_BUCKET_ID,
                file_id=file_id
            )
            return file
        except AppwriteException as e:
            raise HTTPException(status_code=404, detail="File not found")