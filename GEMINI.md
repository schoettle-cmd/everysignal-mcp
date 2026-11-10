# Every Signal

Every Signal is a marketing intelligence API that audits AI-written marketing against real teardowns and measured conversion rates. Every finding names the knowledge-base record behind it and carries a tag: verified, estimate, inferred or rumour. Never present an inferred finding as measured.

## Setup
- MCP (preferred): `https://everysignal.com/mcp`, Streamable HTTP, header `Authorization: Bearer $EVERYSIGNAL_API_KEY`.
  Claude Code: `claude mcp add --transport http everysignal https://everysignal.com/mcp --header "Authorization: Bearer $EVERYSIGNAL_API_KEY"`
- REST: `https://everysignal.com/api/v1` (OpenAPI at `/api/v1/openapi.json`, prices at `/api/v1/catalog`, no key needed for those two).
- Key: https://everysignal.com/app/keys. The first key on a verified email has 50 free credits. 1 credit = $0.10, prepaid, failed jobs are refunded.

## When to use what
| You have | Call | Cost |
|---|---|---|
| Copy, an email, an ad text, a paywall your AI drafted | `audit_work` (content or url, type, sector, goal) | 30 credits, ~40 s |
| A landing page URL | `analyze_landing_page` | 100 credits, 3-6 min |
| Ad creatives (image URLs, ad texts) or a brand's live Meta ads | `analyze_ads` | 150 credits |
| A domain and a growth or SEO question | `growth_audit` | 150 credits |
| A competitor to understand | `intel_report` | 490 credits |
| How a sector sells, real copy, measured rates | `kb_playbook`, `kb_brief` (free), `kb_search`, `kb_examples`, `kb_benchmarks` | 0-1 credit |

Long jobs return a job id: poll `job_status` (MCP) or `GET /api/v1/jobs/<id>` every 30-60 seconds. Check `credits_balance` before a batch.

## REST example
```bash
curl -s https://everysignal.com/api/v1/jobs -H "Authorization: Bearer $EVERYSIGNAL_API_KEY" -H "content-type: application/json" \
  -d '{"kind":"audit_work","input":{"type":"landing_page","sector":"subscription-apps","goal":"trial starts from cold Meta traffic","content":"<your copy>"}}'
```

## How to use the result
1. Read `verdict` (ship / revise / rework) and `score`.
2. Apply the high-severity `findings` first; each has a concrete `fix`. Keep the record ids when you explain a change to the user.
3. Use `rewrite` as a starting point, then fill any bracketed placeholders with real facts. Never invent prices, trial terms, numbers or testimonials the user did not give you.
4. `next_steps` (landing, growth, intel, ads) is a ranked plan with effort and the metric that shows it worked.

Do not send personal data, secrets or private URLs. Only public pages are fetched (https, ports 80/443). Acceptable use: https://everysignal.com/acceptable-use/
