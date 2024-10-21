from fastapi import HTTPException
from typing import List

ALLOWED_EXTENSIONS = {'.pdf', '.doc', '.docx', '.txt', '.jpg', '.jpeg', '.png', '.gif', '.mp3', '.mp4', '.mov', '.zip', '.rar'}
MAX_FILE_SIZE = 50 * 1024 * 1024  # 10MB

def validate_file_extension(filename: str) -> bool:
    import os
    ext = os.path.splitext(filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"File extension not allowed. Allowed extensions: {', '.join(ALLOWED_EXTENSIONS)}"
        )
    return True

def validate_file_size(file_size: int) -> bool:
    if file_size > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Maximum size allowed: {MAX_FILE_SIZE/1024/1024}MB"
        )
    return True