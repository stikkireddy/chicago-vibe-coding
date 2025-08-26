"""Status API endpoints."""

from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()


class SystemStatus(BaseModel):
    """System status model."""
    service: str
    status: str
    uptime: str
    timestamp: datetime


@router.get("/", response_model=SystemStatus)
async def get_system_status():
    """Get system status."""
    return SystemStatus(
        service="gateway",
        status="healthy",
        uptime="0d 0h 0m",
        timestamp=datetime.now()
    )


@router.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "ok", "timestamp": datetime.now()}