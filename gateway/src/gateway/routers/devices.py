"""Devices API endpoints."""

from typing import List
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime

from gateway.database import db

router = APIRouter()


class Device(BaseModel):
    """Device model."""
    device_id: str
    timestamp: datetime


class DeviceRegistrationResponse(BaseModel):
    """Device registration response model."""
    device_id: str
    timestamp: str
    status: str


class ErrorResponse(BaseModel):
    """Error response model."""
    error: str
    detail: str


@router.get("/", response_model=List[Device])
async def get_devices():
    """Get all devices from database."""
    try:
        devices = await db.get_devices()
        return [
            Device(
                device_id=device["device_id"],
                timestamp=datetime.fromisoformat(device["timestamp"])
            )
            for device in devices
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


@router.post("/register", response_model=DeviceRegistrationResponse)
async def register_device():
    """Register a new device in the database."""
    try:
        result = await db.register_device()
        return DeviceRegistrationResponse(
            device_id=result["device_id"],
            timestamp=result["timestamp"],
            status=result["status"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to register device: {str(e)}")


@router.get("/{device_id}", response_model=Device)
async def get_device(device_id: str):
    """Get a specific device by ID."""
    try:
        devices = await db.get_devices()
        for device in devices:
            if device["device_id"] == device_id:
                return Device(
                    device_id=device["device_id"],
                    timestamp=datetime.fromisoformat(device["timestamp"])
                )
        raise HTTPException(status_code=404, detail="Device not found")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")