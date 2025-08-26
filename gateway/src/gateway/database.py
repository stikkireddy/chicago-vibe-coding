"""Database connection and operations."""

import os
import asyncpg
from typing import Optional
import uuid
from datetime import datetime


class DatabaseConnection:
    """Async PostgreSQL database connection manager."""
    
    def __init__(self):
        self.pool: Optional[asyncpg.Pool] = None
    
    async def connect(self):
        """Initialize database connection pool."""
        database_url = os.getenv("DATABASE_URL")
        if database_url:
            self.pool = await asyncpg.create_pool(database_url)
        else:
            # Use individual connection parameters
            host = os.getenv("DB_HOST")
            port = int(os.getenv("DB_PORT", 5432))
            database = os.getenv("DB_NAME")
            user = os.getenv("DB_USER")
            password = os.getenv("DB_PASSWORD")
            
            self.pool = await asyncpg.create_pool(
                host=host,
                port=port,
                database=database,
                user=user,
                password=password,
                ssl="require"
            )
    
    async def disconnect(self):
        """Close database connection pool."""
        if self.pool:
            await self.pool.close()
    
    async def register_device(self) -> dict:
        """Register a new device in the database."""
        if not self.pool:
            raise RuntimeError("Database not connected")
        
        device_id = str(uuid.uuid4())
        timestamp = datetime.utcnow()
        
        async with self.pool.acquire() as connection:
            # Insert into the app.devices table
            await connection.execute(
                """
                INSERT INTO app.devices (device_id, timestamp) 
                VALUES ($1, $2)
                """,
                device_id, timestamp
            )
        
        return {
            "device_id": device_id,
            "timestamp": timestamp.isoformat(),
            "status": "registered"
        }
    
    async def get_devices(self) -> list:
        """Get all devices from the database."""
        if not self.pool:
            raise RuntimeError("Database not connected")
        
        async with self.pool.acquire() as connection:
            rows = await connection.fetch("SELECT device_id, timestamp FROM app.devices ORDER BY timestamp DESC")
            
            return [
                {
                    "device_id": row["device_id"],
                    "timestamp": row["timestamp"].isoformat()
                }
                for row in rows
            ]


# Global database instance
db = DatabaseConnection()