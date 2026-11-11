# AI WTF, the podcast: brand kit

_Written 2026-11-11 by Claude Opus 5.5 (claude.ai project thread "WTF: Brand the podcast and intro sting") for Mike Wolf, host and producer. Built on the AI WTF look of 2026-09-23 (`SOMA/aiwtf/art-2026-09-23/brief.md`) and the SOMA Studios ident of 2026-10-29 (`~/Projects/soma-studios-brand/final/`)._

## The show

- **Name:** AI WTF. Not a new brand: the podcast is a new channel of the Substack (AI What the F*ck) and ai-wtf.org.
- **Tagline:** What happens when you work with a team of AIs.
- **Promise (one breath):** Mike Wolf is 83 and works with a team of human friends and AIs. Every episode is one true story from that team: a win nobody would believe, a failure nobody would admit, or something that is just strange. Then the team talks back.
- **Credit line:** Hosted by Mike Wolf. Made with the team. A SOMA Studios production.
- **Segments:** The WTF of the week, True Confessions, The guest, The team talks back (`src/data/podcast.ts`).

## Look

Same rules as the publication: deep navy ground, the split question mark (amber left, cyan right, a seam of light where they meet), cream text. No robots, no glowing brains, no circuit boards.

| Role | Hex |
|---|---|
| Ground | `#0d1d37` (matches the mark's own background, so the mark sits on it with no edge) |
| "AI" (machine side) | `#22c3df` |
| "WTF" (human side) | `#f5a524` |
| Text | `#f5f0e6` |
| Small caps, credits | `#9fb3cf` |

Type: Inter Black for the wordmark, Inter Medium for the tagline, Inter SemiBold in spaced capitals for credits. The site's body face (Merriweather) stays on the site.

**How it sits next to SOMA Studios.** The SOMA Studios ident is warm dark brown with seven coloured strokes; its amber (`#f2a83b`) and teal (`#3fa7a3`) are close cousins of the AI WTF amber and cyan, so the cut from the studio ident to the show card reads as one family without either brand bending.

## Files

| File | Use |
|---|---|
| `public/podcast/ai-wtf-podcast-cover-3000.jpg` | Show art for Substack, Apple Podcasts, Spotify (3000 x 3000, the size Apple asks for) |
| `public/podcast/ai-wtf-podcast-cover-1400.jpg`, `-600.jpg` | Same art, smaller, for the site |
| `public/podcast/title-card.jpg` | 1920 x 1080 show card: follows the SOMA Studios ident in the video pre-roll |
| `cover.html` | Source of the show art. Render: `node render.cjs cover.html 3000 3000 out.png` |
| `card.html` | Source of the title card and per-episode cards and thumbnails. `card.html?e=Episode%201&t=Colleague,%20not%20tool`, render with `node render2.cjs "file://$PWD/card.html?e=...&t=..." 1920 1080 out.png` |
| `mark.png` | The 1080 px split question mark (master in `SOMA/aiwtf/art-2026-09-23/logo-mark-1080.png`) |

Both scripts need Playwright and the Inter font installed.

## The pre-roll (made by SOMA Studios)

- **Video, about 5 s:** the SOMA Studios opener (3.2 s, "SOMA STUDIOS presents", with its sting), then the AI WTF title card for about 2 s while the sting's hall tail rings under it, then a hard cut into the episode.
- **Audio, about 5 s:** the same sting, with a short voice-over on the tail: "SOMA Studios presents... AI WTF." A designed voice says "SOMA Studios presents"; Mike says "AI WTF" (a bank of takes in different intonations). No cloned or real person's voice without a signed release.
- Delivery and loudness targets are in the @SS request (projects-meta mail).
