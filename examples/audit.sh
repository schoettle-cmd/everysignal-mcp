#!/bin/sh
# Audit a piece of marketing copy with Every Signal (30 credits = $3). Needs EVERYSIGNAL_API_KEY (https://everysignal.com/app/keys).
curl -s https://everysignal.com/api/v1/jobs \
  -H "Authorization: Bearer $EVERYSIGNAL_API_KEY" -H "content-type: application/json" \
  -d '{"kind":"audit_work","input":{"type":"landing_page","sector":"subscription-apps","goal":"trial starts from cold Meta traffic","content":"Sleep better tonight. Start your free trial today!"}}'
# Then poll: curl -s https://everysignal.com/api/v1/jobs/<id> -H "Authorization: Bearer $EVERYSIGNAL_API_KEY"
