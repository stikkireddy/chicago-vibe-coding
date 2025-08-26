"""Main API router."""

from fastapi import APIRouter

from . import devices, status

router = APIRouter()

# Include sub-routers
router.include_router(devices.router, prefix="/devices", tags=["devices"])
router.include_router(status.router, prefix="/status", tags=["status"])


@router.get("/")
async def api_root():
    """API root endpoint."""
    return {"message": "Gateway API v1", "endpoints": ["/devices", "/status"]}