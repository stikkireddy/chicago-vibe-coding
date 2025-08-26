"""Configuration settings."""

import os
from pathlib import Path
from typing import Optional
from dotenv import load_dotenv

# Load environment variables from .env file
# Look for .env in the project root (gateway directory)
env_path = Path(__file__).parent.parent.parent / ".env"
load_dotenv(dotenv_path=env_path, override=True)


class Settings:
    """Application settings."""

    # Server configuration
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8099"))
    DEBUG: bool = os.getenv("DEBUG", "true").lower() == "true"

    # API configuration
    API_V1_PREFIX: str = "/api/v1"
    PROJECT_NAME: str = "Gateway API"
    VERSION: str = "0.1.0"

    # CORS configuration
    ALLOWED_ORIGINS: list = os.getenv("ALLOWED_ORIGINS", "*").split(",")

    # Database configuration (if needed later)
    DATABASE_URL: Optional[str] = os.getenv("DATABASE_URL")


settings = Settings()