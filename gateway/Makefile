# Gateway Makefile

.PHONY: install dev start lint format test clean

# Install dependencies
install:
	uv sync

# Install with dev dependencies
install-dev:
	uv sync --extra dev

# Run development server
dev:
	uv run python main.py

# Start production server
start:
	uv run uvicorn gateway.main:app --host 0.0.0.0 --port 8099

# Run ingest example (preferred method)
ingest-example:
	uv run gateway-ingest-example

# Run ingest example using module syntax
ingest-example-module:
	cd src && uv run python -m gateway.ingest.example

# Run ingest example directly (with path fixing)
ingest-example-direct:
	uv run python src/gateway/ingest/example.py

# Lint code
lint:
	uv run flake8 src/
	uv run black --check src/
	uv run isort --check-only src/
	uv run mypy src/

# Format code
format:
	uv run black src/
	uv run isort src/

# Run tests
test:
	uv run pytest

# Clean cache and build files
clean:
	find . -type d -name __pycache__ -delete
	find . -type f -name "*.pyc" -delete
	rm -rf .pytest_cache/
	rm -rf build/
	rm -rf dist/
	rm -rf *.egg-info/

# Show help
help:
	@echo "Available commands:"
	@echo "  install     - Install dependencies"
	@echo "  install-dev - Install with dev dependencies"
	@echo "  dev         - Run development server"
	@echo "  start       - Start production server"
	@echo "  lint        - Lint code"
	@echo "  format      - Format code"
	@echo "  test        - Run tests"
	@echo "  clean       - Clean cache and build files"