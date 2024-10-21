from fastapi import APIRouter, File, UploadFile, Query
from fastapi.responses import JSONResponse
from enum import Enum
from ..services.storage_service import StorageService

router = APIRouter()
storage_service = StorageService()

class ExpirationTime(str, Enum):
    THIRTY_SECONDS = "30s"
    ONE_DAY = "24h"
    THREE_DAYS = "3d"
    FIVE_DAYS = "5d"
    ONE_WEEK = "7d"

@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    expiration: ExpirationTime = Query(..., description="File expiration time")
):
    result = await storage_service.upload_file(file, expiration)
    return JSONResponse(
        content={
            'message': 'File uploaded successfully',
            'data': result
        },
        status_code=200
    )