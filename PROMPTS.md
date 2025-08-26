# Example Prompts

## Slides & Presentation Development

### Content Strategy & Messaging
- "focus more on agent, spec, intent based coding and not trying to zero shot 'vibe' code. the goal is to create a controlled outcome"
- "change the title slide from vibe coding to vibe coding at scale using Databricks"
- "the title should be AI + Databricks + Data = Success" 
- "also include use the right tools and reference https://github.com/punkpeye/awesome-mcp-servers"

### Slide Structure & Organization
- Set up slides for a vibe coding workshop using Slidev framework
- "make a slide 2 which suggests the user to install expo go on android store or apple app store which helps install the native app on their phone"
- "make a slide 3 that highlights my personal workflow on projects that i collaborate on startups: 1. Plan (chatgpt or claude) 2. Research (Deep research in one of the llms) 3. Delegate (Create Github issues, claude code commands) 4. Test (Integration tests, functional tests) 5. Fix (Plan and fix things that are broken) 6. Review (Review the PR, always manually review in detail for auth, security and performance critical components (i do this based on folder structure)) 7. repeat the process"
- "make a slide 04.5 which is the app stack in detail that splits it up into backend, frontend, middleware, auth & identity"
- Create 10-slide presentation covering tech stack choices for AI-powered development
- Split slides into separate markdown files using ziggiz pattern for easier editing

### Content Refinements & Updates
- "clean up the title of slide @slides/pages/slides/04-why-tech-choices.md based on the content"
- "at the bottom of the slide explain what mcp in ELI5 with an analogy short"
- "change title of @slides/pages/slides/05-backend-choices.md slide to Database Choices"
- "in @slides/pages/slides/06-services-apis.md adjust the note at the bottom for why this stack"
- Update stack slides to reference actual app technologies with specific examples
- Change slide focus to "AI Coding on Databricks" rather than general development
- Include Databricks Native Auth alongside external auth providers
- Add Databricks Asset Bundles CLI and APIs to collaboration workflow
- Reference Claude + MCP + Commands + Agents for extensible AI workflows
- Add spec-driven development resources and command examples
- Update authentication slides to emphasize JWT tokens and stateless auth
- Focus final slide on project-specific tech stack rather than generic tools

### Visual & Design Updates  
- Fix color contrast issues for dark mode environments
- "fix the color i cant see it its dark mode"
- "make it so that the left and the right are aligned cleanly in this new slide like a grid with the title"
- Adjust slide backgrounds from light colors to dark (gray-800) with white text
- Structure slides with interactive elements, code examples, and visual transitions
- Remove emojis from slides to create professional appearance

### File Management
- "you should fix @slides/slides.md to refer to these new slides"
- "dont rename any slide just make a new slide"
- "on the right mention to use github to manage code"

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
