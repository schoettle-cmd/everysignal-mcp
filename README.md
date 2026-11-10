# Every Signal MCP server

[![Every Signal MCP server on Glama](https://glama.ai/mcp/servers/schoettle-cmd/everysignal-mcp/badges/score.svg)](https://glama.ai/mcp/servers/schoettle-cmd/everysignal-mcp)

Every Signal is a marketing intelligence API that audits AI-written marketing against real teardowns and measured conversion rates.

Your agent sends a landing page, an email, an ad, a funnel or a domain. Every Signal compares it with teardowns of real companies (their copy, funnels, prices, ads, tracking) and measured conversion rates, and returns a score, findings that name the knowledge-base record behind each claim, concrete fixes and a rewrite. Every figure carries a tag: verified, estimate, inferred or rumour.

- Remote MCP server: `https://everysignal.com/mcp` (Streamable HTTP, `Authorization: Bearer <API key>`), or `https://everysignal.com/mcp/connect` with OAuth sign-in
- REST API: `https://everysignal.com/api/v1` ([OpenAPI](https://everysignal.com/api/v1/openapi.json), [prices](https://everysignal.com/api/v1/catalog))
- Official MCP registry: `com.everysignal/everysignal`
- Docs for people: https://everysignal.com/connect/ · for LLMs: https://everysignal.com/llms.txt

## Get a key
Sign in at https://everysignal.com/app/keys and create a key. The first key on a verified email comes with 50 free credits ($5), enough for an audit. Credits are prepaid (1 credit = $0.10), never expire, and failed jobs are refunded.

## Connect

Claude.ai, Claude Desktop and ChatGPT (developer mode): add a custom connector with the URL `https://everysignal.com/mcp/connect`. You sign in to Every Signal by email (OAuth, PKCE); no key to paste.


Claude Code
```sh
claude mcp add --transport http everysignal https://everysignal.com/mcp --header "Authorization: Bearer YOUR_KEY"
```

Cursor (`~/.cursor/mcp.json`) and other clients that take a URL
```json
{"mcpServers": {"everysignal": {"url": "https://everysignal.com/mcp", "headers": {"Authorization": "Bearer YOUR_KEY"}}}}
```

Windsurf (`~/.codeium/windsurf/mcp_config.json`)
```json
{"mcpServers": {"everysignal": {"serverUrl": "https://everysignal.com/mcp", "headers": {"Authorization": "Bearer YOUR_KEY"}}}}
```

Claude Desktop (`claude_desktop_config.json`, via mcp-remote)
```json
{"mcpServers": {"everysignal": {"command": "npx", "args": ["-y", "mcp-remote", "https://everysignal.com/mcp", "--header", "Authorization: Bearer YOUR_KEY"]}}}
```

ChatGPT: create a custom GPT, add an Action, import `https://everysignal.com/api/v1/openapi.json`, Authentication = API key, Bearer.

## Install in one step

- Any MCP client, as a local stdio server (zero dependencies, Node 18+):
  `{"mcpServers": {"everysignal": {"command": "npx", "args": ["-y", "github:schoettle-cmd/everysignal-mcp"], "env": {"EVERYSIGNAL_API_KEY": "YOUR_KEY"}}}}`

- Claude Code plugin (MCP server + skill): `/plugin marketplace add schoettle-cmd/everysignal-mcp`, then `/plugin install everysignal@everysignal`; it asks for your API key once and stores it in your system keychain.
- Gemini CLI: `gemini extensions install https://github.com/schoettle-cmd/everysignal-mcp`, and set `EVERYSIGNAL_API_KEY`.
- Cursor: [Add to Cursor](cursor://anysphere.cursor-deeplink/mcp/install?name=everysignal&config=eyJ1cmwiOiJodHRwczovL2V2ZXJ5c2lnbmFsLmNvbS9tY3AiLCJoZWFkZXJzIjp7IkF1dGhvcml6YXRpb24iOiJCZWFyZXIgWU9VUl9LRVkifX0=) (then replace YOUR_KEY in ~/.cursor/mcp.json).
- Cline and other agents: [llms-install.md](llms-install.md).

## Tools

| Tool | What it does | Credits |
|---|---|---|
| `audit_work` | Audit copy, a landing page, an email, an ad, a funnel or a paywall your AI wrote. Score, findings with record ids, fixes, rewrite. About 40 seconds. | 30 ($3) |
| `analyze_landing_page` | Tech stack, copy, speed and funnel signals for one URL against how the sector sells. Ranked fixes and a hero rewrite. | 100 ($10) |
| `analyze_ads` | Ad creatives (image URLs, ad texts) or a brand's live Meta ads scored against real ad patterns. Fixes and new hooks. | 150 ($15) |
| `growth_audit` | What a domain ranks for, its search and AI-answer footprint and tracking, against the sector's growth moves. Ranked plan. | 150 ($15) |
| `intel_report` | Automated snapshot of a company: tracking stack, live Meta ads, search footprint, homepage, with a summary against its sector. | 490 ($49) |
| `kb_sectors`, `kb_brief`, `kb_playbook` | Sectors, sector briefs and task playbooks (homepage, email, paid social, subscription funnel, checkout, GEO). | free |
| `kb_search`, `kb_examples`, `kb_benchmarks`, `kb_get` | Records, real copy and measured conversion rates. | 1 each |
| `list_reports`, `get_report`, `job_status`, `credits_balance` | Published teardowns, job results, balance. | free |

Long jobs return a job id; poll `job_status` (or `GET /api/v1/jobs/<id>`). Webhooks are signed (`Every-Signal-Signature: t=<time>,v1=HMAC-SHA256(secret, "<t>.<body>")`).

## Example
See [`examples/audit.sh`](examples/audit.sh). A sample result for an invented landing page ("DreamWell, an AI sleep coach"): verdict `revise`, score 35; top finding (high, verified, record `calm`): "The free trial has no terms: no length, no card requirement, no renewal price."

## Claude skill
[`skill/SKILL.md`](skill/SKILL.md) tells an agent when to call which tool and how to use the result.

## Rules
Public URLs only (https, ports 80/443); we fetch with [EverySignalBot](https://everysignal.com/bot/). No personal data or secrets in inputs. 60 calls a minute per key, 5 running jobs. [Acceptable use](https://everysignal.com/acceptable-use/) · [Terms](https://everysignal.com/terms/) · [Privacy](https://everysignal.com/privacy/) · hello@everysignal.com

Operated by mjonesone LLC.
