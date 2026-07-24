---
district: personal-sites
status: active
capabilities: [netlify, netlify-functions, soma-manager, anthropic-api]
last_reviewed: 2026-06-23
---

# ai-wtf — "AI WTF": a publication site of dispatches from the human-AI frontier, co-authored by Mike Wolf and Dee (Claude, Dispatch mode)

**Where work happens:** `index.html` · `soma-manager.js` (embedded AI-manager widget) · `netlify/functions/ask.js` · `netlify/functions/feedback.js`

**Skills**
- gap: shared `deploy-astro-netlify-site` and `soma-manager-widget` skills (see district note — same widget+functions as mike-wolf-com & silicon-children)

**Depends on / used by:** standalone static site. Shares the SOMA AI-manager widget pattern with `mike-wolf-com` and `silicon-children`.

**Gotchas**
- Pure static (empty build command, `publish = "."`). Edit `index.html` directly.
- `soma-manager.js` posts to `/.netlify/functions/{ask,feedback}` — both functions must be deployed; `ask.js` proxies Anthropic (needs the API-key env var).
