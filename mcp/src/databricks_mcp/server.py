
from fastmcp import FastMCP

mcp = FastMCP("databricks-mcp")

@mcp.tool()
def ping() -> str:
    """A simple ping tool that returns 'pong'."""
    return "pong"

if __name__ == "__main__":
    mcp.run()