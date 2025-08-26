# Example Prompts

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

## Mobile App Development & Branding
- Clean up React Native Expo app and apply Databricks branding/logo

## Documentation & Configuration
- Add installation instructions to README (brew, pyenv, nvm, nodejs, databricks CLI, tmux)
- Fix MCP server configuration instructions
- Create tmux usage guidelines in CLAUDE.md
- Add application name from Makefile to CLAUDE.md
- Organize example prompts by category (this file)

## Quick Tests & Utilities
- Ping connectivity tests