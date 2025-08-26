# Claude Code Instructions

## Application Name
**sri-chicago-vibe-coding-app**

## Long-Running Commands and Tmux

When running long-running commands or processes that need to persist beyond the current session, use tmux sessions instead of regular bash commands.

### When to Use Tmux Sessions

Use tmux for:
- Server processes (development servers, web servers, etc.)
- Build processes that take more than 30 seconds
- File watching/monitoring commands
- Database migrations or data processing
- Any command that might be interrupted by network issues
- Commands that produce continuous output over time

### When to Use Regular Bash

Use regular bash for:
- Quick commands (< 30 seconds)
- One-time setup commands
- File operations (copy, move, delete)
- Simple queries or checks
- Commands that complete quickly

### Tmux Session Management

Use the tmux MCP tools instead of CLI commands for better integration:

1. **Create a new session** for long-running processes:
   Use `mcp__tmux__create-session` with descriptive names like "dev-server", "build-process", "data-migration"

2. **Execute commands** in the tmux session:
   Use `mcp__tmux__execute-command` to run long-running commands in the session

3. **Monitor output** periodically:
   Use `mcp__tmux__capture-pane` to check progress and output

4. **Clean up** when done:
   Use `mcp__tmux__kill-session` when the process is no longer needed

### Example Workflow

Instead of using regular Bash:
```bash
# DON'T: Run long processes directly with Bash tool
npm run dev
```

Do this:
1. Create tmux session: `mcp__tmux__create-session` with name "dev-server"
2. Execute command: `mcp__tmux__execute-command` to run "npm run dev"
3. Monitor: Use `mcp__tmux__capture-pane` to check output
4. Clean up: `mcp__tmux__kill-session` when done

This approach provides better process isolation and prevents interruption of long-running tasks.

## Databricks App Development Commands

The project includes a Makefile with commands for managing the Databricks application. Use these commands as follows:

### Quick Commands (use regular Bash)

For one-time operations that complete quickly, use the Bash tool directly:

- **Sync app files**: `make sync-app`
- **Deploy app**: `make deploy-app` (includes sync)
- **Get app details**: `make app-details`
- **List deployments**: `make list-deployments`

### Local Development Server (use Tmux)

For running the local development server, use tmux since it's a long-running process:

1. Create tmux session: `mcp__tmux__create-session` with name "local-dev"
2. Execute command: `mcp__tmux__execute-command` to run "make local"
3. Monitor: Use `mcp__tmux__capture-pane` to check server output
4. Clean up: `mcp__tmux__kill-session` when development is done

The local server runs continuously and should be managed through tmux to prevent interruption.