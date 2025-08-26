# Example Prompts

## Slides & Presentation Development
- Set up slides for a vibe coding workshop using Slidev framework
- Create 10-slide presentation covering tech stack choices for AI-powered development
- Fix color contrast issues for dark mode environments
- Adjust slide backgrounds from light colors to dark (gray-800) with white text
- Structure slides with interactive elements, code examples, and visual transitions
- Split slides into separate markdown files using ziggiz pattern for easier editing
- Remove emojis from slides to create professional appearance
- Update stack slides to reference actual app technologies with specific examples
- Change slide focus to "AI Coding on Databricks" rather than general development
- Include Databricks Native Auth alongside external auth providers
- Add Databricks Asset Bundles CLI and APIs to collaboration workflow
- Reference Claude + MCP + Commands + Agents for extensible AI workflows
- Add spec-driven development resources and command examples
- Update authentication slides to emphasize JWT tokens and stateless auth
- Focus final slide on project-specific tech stack rather than generic tools

## Navigation & UI Layout
- Clean up router to automatically redirect to dashboard
- Configure navbar with Dashboard, Device, Status, Documentation, and Settings sections (remove projects)
- Create subpages: main-dashboard, devices, status, documentation, settings with proper app router setup
- Fix navbar taking up only half the page width
- Make main dashboard component take full page width and height
- Add padding to mounted dashboard component

## Package Configuration & Scripts
- Modify package.json dev and start scripts to use port 8000
- Ensure start command runs build process
- Set host to 0.0.0.0 instead of localhost for both dev and start

## Database & ORM Setup
- Setup Drizzle ORM with devices table (device_id, timestamp)
- Configure PostgreSQL connection with Databricks JDBC URL
- Use environment variables for database credentials
- Create Makefile commands for migrations (generate, migrate)
- Set schema to 'app'

## Device Management & Data Tables
- Set up a data table to display devices in @app/src/app/devices/
- Use database schema from @app/src/db/schema.ts with only deviceId and timestamp columns
- Populate devices with random generated data (status always online, random locations and types)
- Change "Last Seen" column to "Registered" based on timestamp
- Remove IP address column and disable ellipses action button
- Fetch device data from database instead of mock data
- Create server actions for device CRUD operations
- Add seed data functionality for testing
- Implement search and filtering by device type

## Configuration Management
- Move hardcoded Databricks configuration (instanceUrl, workspaceId, dashboardId) from component to environment variables
- Create server actions to fetch configuration from .env file
- Add proper validation for missing environment variables
- Update databricks-dashboard component to load config from server

## Gateway Service Development
- Set up src directory structure and FastAPI in @gateway/
- Configure pyproject.toml with proper package layout similar to @mcp/ structure
- Set up python-dotenv for loading environment variables from .env file locally
- Fix Python import issues for src layout and package execution
- Add async PostgreSQL support with proper connection pooling
- Create device registration API endpoint using database schema from @app/
- Integrate with Databricks PostgreSQL database for device management
- Create ingest API endpoint that accepts array of DeviceDataRecord and streams to Databricks table
- Use ZerobusSdk streaming functionality with flush and close operations for data ingestion

## Mobile App Development & Device Registration
- Clean up React Native Expo app and apply Databricks branding/logo
- Add environment variable for build .env with GATEWAY_URL
- Implement device registration API call to /api/v1/devices/register
- Create device registration flow with button-triggered registration
- Display device ID, status, and timestamp from server response
- Show registration states: initial button, loading, success, and error handling
- Only display gyroscope data after successful device registration

## Mobile App Data Streaming & Buffering
- Buffer gyroscope data every 5 seconds and post to ingest router
- Create data buffering mechanism with 5-second intervals
- Implement ingest API service for posting DeviceDataRecord arrays
- Update GyroscopeDisplay to collect and stream sensor data
- Add movement analysis and motion detection from gyroscope readings
- Show real-time buffer status and data streaming indicators
- Fix data collection frequency from 10 records/second to 1 record/second

## UI & Design Improvements
- Fix text color contrast for better readability
- Adjust header layout to avoid iPhone notch overlap using safe area insets
- Update registration prompt text to white color for visibility

## Documentation & Configuration
- Add installation instructions to README (brew, pyenv, nvm, nodejs, databricks CLI, tmux)
- Fix MCP server configuration instructions
- Create tmux usage guidelines in CLAUDE.md
- Add application name from Makefile to CLAUDE.md
- Organize example prompts by category (this file)

## Code Quality & TypeScript Fixes
- Fix unused variable warnings in devices/page.tsx catch blocks
- Fix no-explicit-any errors in databricks-dashboard.tsx component
- Fix no-explicit-any errors and unused variables in dashboard.ts
- Add proper TypeScript interfaces for token responses and authorization details
- Fix TypeScript error for DatabricksConfig with undefined properties validation

## Architecture & Documentation
- Update ARCHITECTURE.py with mermaid diagram of system architecture
- Describe high-level tech stack and value proposition for each technology
- Convert architecture.md to be fully Markdown compatible (remove Python docstrings)
- Fix mermaid diagram syntax issues for GitHub rendering compatibility

## Quick Tests & Utilities
- Ping connectivity tests
