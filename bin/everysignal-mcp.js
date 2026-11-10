#!/usr/bin/env node
// Every Signal MCP server over stdio: a zero-dependency bridge to the hosted server at https://everysignal.com/mcp.
// Run: EVERYSIGNAL_API_KEY=es_... npx -y github:schoettle-cmd/everysignal-mcp
// Each JSON-RPC line from the client is POSTed to the remote server; its reply is written back as one line.
import readline from "node:readline";

const URL_ = process.env.EVERYSIGNAL_MCP_URL || "https://everysignal.com/mcp";
const KEY = process.env.EVERYSIGNAL_API_KEY || "";
const log = (...a) => process.stderr.write("[everysignal-mcp] " + a.join(" ") + "\n");
if (!KEY) log("EVERYSIGNAL_API_KEY is not set: free discovery works, tool calls will ask for a key (https://everysignal.com/app/keys).");

async function forward(line) {
  let msg;
  try { msg = JSON.parse(line); } catch { return; }
  const ids = (Array.isArray(msg) ? msg : [msg]).map(m => m && m.id).filter(id => id !== undefined && id !== null);
  try {
    const r = await fetch(URL_, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json, text/event-stream", ...(KEY ? { Authorization: "Bearer " + KEY } : {}) },
      body: JSON.stringify(msg),
    });
    if (r.status === 202 || !ids.length) return;
    const text = await r.text();
    if (!r.ok) throw new Error(`HTTP ${r.status}: ${text.slice(0, 200)}`);
    process.stdout.write(text.trim().replace(/\n/g, " ") + "\n");
  } catch (e) {
    for (const id of ids) process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id, error: { code: -32000, message: "Every Signal unreachable: " + e.message } }) + "\n");
  }
}

const rl = readline.createInterface({ input: process.stdin });
let chain = Promise.resolve();
rl.on("line", line => { if (line.trim()) chain = chain.then(() => forward(line)); });
rl.on("close", () => chain.then(() => process.exit(0)));
