# Architecture — dprplx-web

## Overview

The dprplx brand and portfolio website. A static-leaning Next.js site with a contact form
backed by a Server Function. Hosted on Vercel, deployed from `dprplx-labs/dprplx-web` on GitHub.

---

## Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 16.2.4 (App Router) | Breaking changes vs older Next — see below |
| Language | TypeScript (strict mode) | Import alias `@/*` → `./` |
| React | 19.2.4 | |
| Styling | Tailwind CSS v4 | Via `@tailwindcss/postcss` — NOT the Webpack plugin |
| Bundler | Turbopack | Default in Next 16; pass `--webpack` to opt out |
| Linting | ESLint v9 flat config | `eslint.config.mjs`; NOT run automatically by `next build` |
| Font | Geist (Sans + Mono) | Via `next/font/google` |
| Deployment | Vercel (Hobby) | CLI-deployed; GitHub auto-deploy not yet wired |
| Domain | dprplx.com | GoDaddy DNS → Vercel A record `216.198.79.1` |
| Repo | dprplx-labs/dprplx-web | GitHub org: dprplx-labs |

---

## Next.js 16 Breaking Changes

These differ from training data for older Next versions:

- **Dynamic params/searchParams are Promises** — always `await` them
- **`cookies()` and `headers()` are async** — always `await`
- **`fetch` caching changed** — new model uses `use cache` directive + `cacheLife`/`cacheTag`
- **ESLint** — runs via `npm run lint`, not integrated into `next build`
- **Server Functions** — "Server Actions" are a subset; authenticate inside every one

---

## Component Architecture

All components live in `app/components/`. Default is **Server Component** unless
interactivity requires client-side — then add `'use client'` explicitly.

| Component | Type | Notes |
|---|---|---|
| `Nav.tsx` | Server | Fixed wordmark + cairn logomark |
| `Hero.tsx` | Server | Full-viewport, CSS fade-up animations |
| `Philosophy.tsx` | Server | Brand manifesto, pull quote |
| `Portfolio.tsx` | Server | 3-column grid, app cards |
| `Contact.tsx` | Server | Shell; delegates to ContactForm |
| `ContactForm.tsx` | Client | Form state + calls Server Function |
| `Footer.tsx` | Server | Wordmark + copyright |
| `IntroSequence.tsx` | Client | Full-screen intro animation overlay |
| `LogoMark.tsx` | Server | SVG cairn mark — inline, no image file |

---

## Intro Sequence

Client component (`IntroSequence.tsx`) wraps the entire page as an overlay.

**Phases:**
1. `perplexed` — noise grain + floating `?` marks + "perplexed?" text
2. `deperplex` — noise fades, "deperplex." fades in
3. `brand` — logomark fades up, "dprplx" fades in
4. `done` — overlay unmounts, main site revealed

**Session behaviour:** Shown once per browser session via `sessionStorage`. Click anywhere
or press Enter/Space to skip.

**Motion:** CSS transitions only — no JS-driven animation. Phase state managed in React.

---

## Logo Mark

SVG cairn: three stacked elliptical stone outlines, no fill.

| Stone | Size | Colour |
|---|---|---|
| Top | Smallest | `#FFFFFF` (white) |
| Middle | Medium | `#87B1FF` (exact midpoint between white and IBM blue) |
| Bottom | Largest | `#0F62FE` (IBM blue) |

Used in: `Nav.tsx` (width=34) and `IntroSequence.tsx` brand phase (width=88).

---

## Contact Form

`ContactForm.tsx` (client) calls `app/actions.ts` (Server Function, `'use server'`).

Current state: validates fields, logs submission to console. **Email delivery not yet wired.**
Intended provider: [Resend](https://resend.com) — free tier, 100 emails/day.

---

## Styling Conventions

- Background: `#0a0a0a`
- Font weight: 200 (extralight) for display type
- Colour palette: zinc scale — nothing loud
- Zero images, zero icons, zero drop shadows unless justified
- Generous whitespace; section labels uppercase wide-tracked zinc-600
- Animations: CSS only — subtle fade-ups, no JS motion

---

## Commands

```bash
npm run dev      # Turbopack dev server
npm run build    # Production build
npm run lint     # ESLint (must pass before considering any task done)
npx tsc --noEmit # Type-check (run alongside lint)
vercel --prod    # Manual production deploy (until GitHub auto-deploy is wired)
```
