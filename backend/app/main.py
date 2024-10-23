from fastapi import FastAPI
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from .routes import file_routes
from . import create_app
from .services.storage_service import StorageService

app = create_app()
storage_service = StorageService()

# Register routes
app.include_router(file_routes.router, prefix="/api")

# Set up scheduler for cleanup
scheduler = AsyncIOScheduler()
scheduler.add_job(storage_service.cleanup_expired_files, 'interval', minutes=1)  # Run every 5 minutes
scheduler.start()

@app.get("/")
async def root():
    return {"message": "File Sharing API with auto-cleanup"}

# Handle shutdown
@app.on_event("shutdown")
async def shutdown_event():
    scheduler.shutdown()