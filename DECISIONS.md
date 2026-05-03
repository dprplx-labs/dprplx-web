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

## Branching strategy

**Decision:** `main` = production; all work on feature or fix branches; PR before merge.

**Branch naming:** `feat/description` for new features, `fix/description` for bug fixes.

**Why:** Even solo, this pattern provides a safety net (main is always deployable),
a natural review point, and a clean git history. It also sets up correctly for when
collaborators are added.

**Env vars habit:** Local secrets in `.env.local` (gitignored by Next.js). Production
secrets in Vercel Environment Variables. `.env.example` committed to repo with keys
but no values — documents what's required without exposing secrets.

---

## Deployment approach — native Vercel Git integration

**Current state:** Native Vercel Git integration. `dprplx-labs/dprplx-web` is directly
connected to the Vercel project under `dprplx.labs@gmail.com`. Every push to `main`
auto-deploys with no workaround required.

**History:**
- v1.0: CLI-deployed (`vercel --prod`) — original Vercel account tied to `cardshowclub`
  GitHub could not see `dprplx-labs` repos
- v1.1: Deploy Hook + GitHub Actions workaround — Vercel webhook URL called by
  `.github/workflows/deploy.yml` on every push to `main`
- v1.2: Migrated Vercel account to `dprplx.labs@gmail.com` linked to `dprplx` GitHub
  identity → native Git integration connected cleanly → Deploy Hook workaround retired

## Vercel account migration

**Decision:** Create a new Vercel account under `dprplx.labs@gmail.com` / `dprplx`
GitHub identity and migrate dprplx-web to it.

**Why:** The original Vercel account was created under `cardshowclub@gmail.com` as an
experiment before the dprplx org structure was established. It created an OAuth mismatch
that blocked native GitHub integration and would have caused confusion as the portfolio grew.

**How:** New account created using spouse's phone number for verification (existing number
was tied to old account). Domain ownership verified via TXT records at GoDaddy. dprplx.com
and www.dprplx.com transferred cleanly with a brief planned downtime window.

**2FA:** Enabled on `dprplx` personal GitHub account and enforced at the `dprplx-labs`
org level as part of this session.
