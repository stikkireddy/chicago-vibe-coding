"""Main FastAPI application."""

import os
from pathlib import Path
from dotenv import load_dotenv

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from gateway.routers import api
from gateway.database import db


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager."""
    # Startup
    await db.connect()
    yield
    # Shutdown
    await db.disconnect()

# Load environment variables from .env file
# Look for .env in the project root (gateway directory)
env_path = Path(__file__).parent.parent.parent / ".env"
load_dotenv(dotenv_path=env_path, override=True)

app = FastAPI(
    title="Gateway API",
    description="Gateway service for the Chicago Vibe Coding Workshop",
    version="0.1.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(api.router, prefix="/api/v1")


@app.get("/")
async def root():
    """Root endpoint."""
    return {"message": "Gateway API is running", "version": "0.1.0"}


@app.get("/health")
async def health():
    """Health check endpoint."""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    
    # Get configuration from environment variables
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", "8099"))
    debug = os.getenv("DEBUG", "true").lower() == "true"
    
    uvicorn.run(
        "gateway.main:app",
        host=host,
        port=port,
        reload=debug
    )