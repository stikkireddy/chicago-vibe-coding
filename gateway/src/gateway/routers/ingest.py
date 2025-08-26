"""Ingest API endpoints."""

import os
from typing import List
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime

from gateway.proto import device_ingest_pb2 as row_pb2
from zerobus_sdk.aio import ZerobusSdk
from zerobus_sdk import TableProperties

router = APIRouter()


class DeviceDataRecord(BaseModel):
    """Device data record model matching the protobuf structure."""
    device_id: str
    x_axis: float
    y_axis: float
    z_axis: float
    movement: str
    timestamp: int


class IngestRequest(BaseModel):
    """Ingest request model."""
    records: List[DeviceDataRecord]


class IngestResponse(BaseModel):
    """Ingest response model."""
    success: bool
    message: str
    records_processed: int
    table_name: str


# Table configuration
TABLE_NAME = "main.sri.chicago_device_data"
table_properties = TableProperties(TABLE_NAME, row_pb2.DeviceData.DESCRIPTOR)


@router.post("/", response_model=IngestResponse)
async def ingest_device_data(request: IngestRequest):
    """
    Ingest device data records into Databricks table.
    
    Accepts an array of DeviceDataRecord and streams them to the configured table.
    """
    if not request.records:
        raise HTTPException(status_code=400, detail="No records provided for ingestion")
    
    try:
        # Initialize ZerobusSdk
        sdk_handle = ZerobusSdk(
            os.getenv("DATABRICKS_INGEST_URL"),
            os.getenv("DATABRICKS_WORKSPACE_URL"),
            os.getenv("DATABRICKS_TOKEN")
        )
        
        # Create stream to table
        stream = await sdk_handle.create_stream(table_properties)
        
        # Process each record
        records_processed = 0
        for record in request.records:
            # Convert Pydantic model to protobuf message
            device_data = row_pb2.DeviceData(
                device_id=record.device_id,
                x_axis=record.x_axis,
                y_axis=record.y_axis,
                z_axis=record.z_axis,
                movement=record.movement,
                timestamp=record.timestamp
            )
            
            # Ingest the record
            await stream.ingest_record(device_data)
            records_processed += 1
            
            # Log progress for large batches
            if records_processed % 100 == 0:
                print(f">> Processed {records_processed} records")
        
        # Flush and close the stream
        await stream.flush()
        await stream.close()
        
        return IngestResponse(
            success=True,
            message=f"Successfully ingested {records_processed} records to {TABLE_NAME}",
            records_processed=records_processed,
            table_name=TABLE_NAME
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Failed to ingest data: {str(e)}"
        )


@router.get("/health")
async def ingest_health():
    """Health check for ingest service."""
    # Check if required environment variables are set
    required_vars = ["DATABRICKS_INGEST_URL", "DATABRICKS_WORKSPACE_URL", "DATABRICKS_TOKEN"]
    missing_vars = [var for var in required_vars if not os.getenv(var)]
    
    if missing_vars:
        return {
            "status": "error",
            "message": f"Missing environment variables: {', '.join(missing_vars)}",
            "table_name": TABLE_NAME
        }
    
    return {
        "status": "healthy",
        "message": "Ingest service is ready",
        "table_name": TABLE_NAME,
        "databricks_ingest_url": os.getenv("DATABRICKS_INGEST_URL"),
        "databricks_workspace_url": os.getenv("DATABRICKS_WORKSPACE_URL")
    }