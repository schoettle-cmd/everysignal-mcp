# Installing the Every Signal MCP server (for AI agents such as Cline)

Every Signal is a remote MCP server. There is nothing to clone, build or run locally.

1. Ask the user for an Every Signal API key. They create one at https://everysignal.com/app/keys (sign in by email; the first key includes 50 free credits). Never invent a key.
2. Add this entry to the MCP settings file (for Cline: `cline_mcp_settings.json`), replacing YOUR_KEY:

```json
{
  "mcpServers": {
    "everysignal": {
      "type": "streamableHttp",
      "url": "https://everysignal.com/mcp",
      "headers": { "Authorization": "Bearer YOUR_KEY" },
      "disabled": false
    }
  }
}
```

3. Check it works: call the free tool `credits_balance`. It returns the balance and the price list.
4. Try `kb_sectors` (free), then `audit_work` on a short piece of copy (30 credits).

Clients with OAuth support (Claude.ai, ChatGPT developer mode) can instead use `https://everysignal.com/mcp/connect` and sign in, with no key.
