# Decisions — dprplx-web

Records non-obvious choices: what was decided, why, and what was ruled out.
Add an entry whenever a meaningful fork-in-the-road is reached.

---

## Logo mark

**Decision:** Cairn — three stacked elliptical stone outlines (no fill), white → mid-blue → IBM blue.

**Why:** A cairn is a human-made landmark built to mark a path and bring order to a landscape.
It maps cleanly to the dprplx brand promise (clarity from confusion) without being literal
or trend-dependent. Three stones = three colour steps = visual progression from confusion
(white/neutral) to clarity (IBM blue). Outline-only keeps it minimal and Jony Ive-appropriate.

**Ruled out (in order):**
- Scattered hashmarks → too dark to read on black background
- Three converging lines → looked like a heartbeat flatlining (wrong connotation)
- Looping knot → looked like tangled cord, hard to read at nav size
- Scattered pixels → concept right but mark didn't hold at small sizes
- D + arrow with pixel scatter → original concept revisited; SVG faithful but complex
- Tangled ball → looping/crossing lines → looked good but didn't fit nav size cleanly

---

## Intro sequence

**Decision:** Three-phase CSS overlay: perplexed? → deperplex. → dprplx + logomark.

**Why:** The brand name is a coined word that needs a moment of explanation on first encounter.
Walking a visitor through the etymology before revealing the site earns the name rather than
just asserting it. The noise grain and floating question marks in phase 1 reinforce "perplex"
visually without being heavy-handed.

**Key choices within the sequence:**
- Session-scoped (shows once per browser session via `sessionStorage`) — not every page load
- Click anywhere / press Enter to skip — respects impatient users
- CSS transitions only — no JS animation libraries; keeps bundle lean
- Noise grain via SVG `feTurbulence` data URI — no external asset

---

## Contact section

**Decision:** Inline form (name, email, message) rather than a mailto link.

**Why:** A mailto link opens the user's email client, which breaks the flow and doesn't work
on all devices. An inline form keeps the user on the page and feels more intentional.

**Current state:** Form validates and submits but only logs to console — email delivery
not yet wired. Chosen provider will be Resend (free tier, simple API, works well with
Next.js Server Functions).

---

## No personal name or title in UI

**Decision:** Removed "Tom — CEO" from the footer and all public-facing copy.

**Why:** The site represents the dprplx brand, not an individual. Keeping it brand-first
is more professional and scales better as the company grows. Founder attribution lives
in the Philosophy section implicitly ("dprplx was founded on the conviction…").

---

## Philosophy copy change

**Decision:** "dprplx was founded on the conviction…" rather than "Tom founded dprplx…"

**Why:** Brand-voice consistency. The site speaks as dprplx, not about Tom in the third
person. More confident and less founder-centric.

---

## Server Components by default

**Decision:** All components are Server Components unless interactivity explicitly requires
client-side state or browser APIs.

**Why:** Next.js App Router default; better performance, smaller JS bundle, simpler data
fetching. Client boundary (`'use client'`) is added only where genuinely needed:
`IntroSequence` (phase state, sessionStorage), `ContactForm` (form state, transitions).

---

## Tailwind v4

**Decision:** Use Tailwind CSS v4 via `@tailwindcss/postcss` plugin, not the Webpack plugin.

**Why:** Next.js 16 with Turbopack requires the PostCSS approach. The Webpack plugin is
incompatible with Turbopack. This is a breaking change from Tailwind v3 setups.

---

## Deployment approach (CLI not GitHub integration)

**Decision:** Deploy via `vercel --prod` CLI rather than GitHub-connected auto-deploy.

**Why:** The Vercel account is authenticated to the `cardshowclub` GitHub account, while
the repo lives under the `dprplx-labs` org (owned by a different GitHub identity). The
OAuth mismatch prevented GitHub integration from being established at launch time.

**To fix later:** Add the personal `dprplx` GitHub account as a connected identity in
Vercel, then reconnect the repo under project Git settings.
