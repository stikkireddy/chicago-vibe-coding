# Databricks MCP Server

A basic MCP server built with fastmcp that provides a simple ping tool.

## Installation

```bash
uv install
```

## Configuration

Add the following to your Claude Code MCP settings:

```json
{
  "mcpServers": {
    "databricks-mcp": {
      "command": "uvx",
      "args": [
        "--with",
        "/path/to/chicago-vibe-coding-workshop/mcp/",
        "python",
        "mcp/src/databricks_mcp/server.py"
      ]
    }
  }
}
```

Replace `/path/to/chicago-vibe-coding-workshop/mcp/` with the absolute path to your MCP directory.

## Usage

The server provides a single tool:
- `ping`: Returns "pong"

## Development

Install development dependencies:
```bash
uv install --dev
```

Run the server directly:
```bash
uvx --with mcp/ python mcp/src/databricks_mcp/server.py
```
