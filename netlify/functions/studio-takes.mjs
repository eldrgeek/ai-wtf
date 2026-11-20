// WTF Studio v0: store a producer's recorded takes, line by line, in Netlify Blobs.
// The studio code in the URL is the gate: the first take for a story locks the story to that code.
// Made 2026-11-20 by Claude Opus 5.5 for Mike Wolf (@WTF).
import { getStore } from "@netlify/blobs";

const STORE = "wtf-studio-takes";
const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
const safe = (s, n = 64) => typeof s === "string" && s.length > 0 && s.length <= n && /^[A-Za-z0-9._-]+$/.test(s);
async function hash(s) {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(d)].map(b => b.toString(16).padStart(2, "0")).join("");
}

export default async (req) => {
  const u = new URL(req.url);
  const story = u.searchParams.get("story"), code = u.searchParams.get("code");
  if (!safe(story) || !safe(code) || code.length < 12) return json({ error: "story and a code of 12+ letters or digits are required" }, 400);
  const store = getStore({ name: STORE, consistency: "strong" });
  const lockKey = `${story}/_lock`, want = await hash(code);
  const lock = await store.get(lockKey);
  if (lock === null) {
    if (req.method !== "POST") return json({ takes: [], chosen: {} });
    await store.set(lockKey, want, { onlyIfNew: true });
    if ((await store.get(lockKey)) !== want) return json({ error: "this story belongs to another studio code" }, 403);
  } else if (lock !== want) return json({ error: "this story belongs to another studio code" }, 403);

  if (req.method === "POST") {           // ?line=<beat>-<i>&take=<n>  body = audio
    const line = u.searchParams.get("line"), take = u.searchParams.get("take");
    if (!safe(line, 80) || !/^\d{1,3}$/.test(take || "")) return json({ error: "line and take are required" }, 400);
    const body = await req.arrayBuffer();
    if (body.byteLength < 1000 || body.byteLength > 25e6) return json({ error: "a take must be between 1 KB and 25 MB" }, 400);
    const type = req.headers.get("content-type") || "audio/webm";
    await store.set(`${story}/takes/${line}/${take}`, body, { metadata: { type, at: Date.now(), bytes: body.byteLength } });
    return json({ ok: true, key: `${line}/${take}` });
  }
  if (req.method === "PUT") {            // body = {"<line>": <take>, ...}  the producer's chosen takes
    const chosen = await req.json().catch(() => null);
    if (!chosen || typeof chosen !== "object") return json({ error: "send the chosen takes as JSON" }, 400);
    await store.setJSON(`${story}/chosen`, chosen);
    return json({ ok: true });
  }
  if (req.method === "GET") {
    const key = u.searchParams.get("key");
    if (key) {                           // one take's audio: key=<line>/<take>
      if (!/^[A-Za-z0-9._-]{1,80}\/\d{1,3}$/.test(key)) return json({ error: "bad key" }, 400);
      const e = await store.getWithMetadata(`${story}/takes/${key}`, { type: "arrayBuffer" });
      if (e === null) return json({ error: "no such take" }, 404);
      return new Response(e.data, { headers: { "content-type": e.metadata.type || "audio/webm" } });
    }
    const { blobs } = await store.list({ prefix: `${story}/takes/` });
    const chosen = (await store.get(`${story}/chosen`, { type: "json" })) || {};
    return json({ takes: blobs.map(b => b.key.slice(story.length + 7)), chosen });
  }
  return json({ error: "method not allowed" }, 405);
};
