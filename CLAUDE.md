# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## About dprplx

**dprplx** (pronounced "deperplex") is a holding company that builds and manages a portfolio of software products (mini-SaaS apps). Founded and run by Tom, CEO. The name is a play on "deperplex" — to remove confusion and bewilderment.

**Brand philosophy:** The beauty of simplicity. Design north star is Sir Jony Ive — purposeful, clean, elegant, with nothing unnecessary. Complexity is the enemy; clarity is the goal.

**Operating model:** Solo founder, AI-assisted development (vibe coding). Agent-first — automate rather than hire.

**App portfolio domains:** Sports card collecting, personal finance, health & wellness (early stage — no live apps yet).

**Tech stack:** Claude Code + Anthropic tools for all development. Notion as knowledge base. Cowork for operations.

## This Repository — dprplx-web

The dprplx brand and portfolio website. Currently a portfolio/brand site; will evolve to include landing pages for portfolio apps as they launch.

**Live domain:** dprplx.com (live in production)
**Hosting:** Vercel (deployed)
**GitHub org:** dprplx-labs

### Design Principles for this site

- Background: #0a0a0a (near-black)
- Font: Geist, font-weight 200 (extralight) for display type — restraint is intentional
- Color palette: zinc scale, restrained. Nothing loud.
- Zero images, zero drop shadows unless absolutely justified
- Generous whitespace — negative space carries the weight
- Section labels: uppercase, wide letter-spacing, zinc-600 — architectural, barely-there
- Animations: CSS only where possible; client components only when interactivity requires it
- Mobile-first, but the desktop experience is primary for now

### LogoMark

A cairn: three stacked elliptical stones, outline only. Top (smallest) = white, middle = #87B1FF, bottom (largest) = IBM blue #0F62FE. Lives in `app/components/LogoMark.tsx`. Do not alter without Tom's explicit direction.

### Current site structure

- `app/components/Nav.tsx` — Fixed wordmark, dprplx, wide letter-spacing, top-left
- `app/components/Hero.tsx` — Full-viewport, staggered CSS fade-up: eyebrow → heading → subtext
- `app/components/Philosophy.tsx` — Brand manifesto, large pull-quote, founder copy
- `app/components/Portfolio.tsx` — 3-column grid, hairline dividers, placeholder app cards
- `app/components/Contact.tsx` — Contact section (partnerships, press, investment)
- `app/components/ContactForm.tsx` — Contact form (client component)
- `app/components/Footer.tsx` — Minimal: wordmark · Tom — CEO · copyright
- `app/components/LogoMark.tsx` — SVG cairn logomark (three stacked ellipses)
- `app/components/IntroSequence.tsx` — Client component; full-screen branded intro on first visit: perplexed? → deperplex. → dprplx. Floating question marks, noise texture, fade transitions. Skippable. Uses sessionStorage to show once per session.
- `app/opengraph-image.tsx` — OG image for social sharing

### When making changes

- Preserve the Jony Ive aesthetic — when in doubt, remove rather than add
- Keep all components as Server Components unless interactivity genuinely requires client-side
- No external UI libraries — hand-craft everything with Tailwind
- Run `npm run lint` and `npx tsc --noEmit` before considering any task complete

## Commands

```bash
npm run dev      # Start dev server (Turbopack, default)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint (eslint.config.mjs flat config)
```

There are no tests configured yet.

## Next Session

<!-- 
INSTRUCTIONS FOR CLAUDE CODE:
At the end of every session, capture any unfinished tasks or follow-up actions here.
These are automatically synced to the dprplx Notion Task Board (tagged "Claude Code") by a Cowork scheduled task, then cleared.

Format — one task per line, starting with "- ":
- Task description [optional: due:YYYY-MM-DD]

Examples:
- Add contact form validation
- Migrate auth to Supabase due:2026-05-10

Leave this section empty if there are no pending tasks.
-->

## Architecture

- **Framework**: Next.js 16.2.4 with App Router (`app/` directory)
- **React**: 19.2.4
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss` (PostCSS plugin, not the Webpack plugin)
- **Language**: TypeScript (strict mode), import alias `@/*` → `./`
- **Bundler**: Turbopack (default in Next.js 16; pass `--webpack` to opt out)
- **Linting**: ESLint v9 flat config (`eslint.config.mjs`); `next build` no longer runs ESLint automatically

## Next.js 16 breaking changes vs. training data

Read `node_modules/next/dist/docs/` for authoritative API docs before writing code. Critical differences:

**Dynamic route params/searchParams are now Promises** — always `await` them:
```tsx
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
}
```

**`cookies()` and `headers()` are async** — always `await`:
```tsx
const cookieStore = await cookies()
```

**Caching model changed** — `fetch` cache options and `export const revalidate` still work, but the new model uses the `use cache` directive and `cacheLife`/`cacheTag`/`updateTag` from `next/cache`. Enable with `cacheComponents: true` in `next.config.ts`.

**PPR (Partial Prerendering) is default** when `cacheComponents` is enabled — wrap runtime-data components in `<Suspense>`, or they will throw `Uncached data was accessed outside of <Suspense>` at build time.

**`eslint` CLI, not `next lint`** — linting is now a separate script and not integrated into the build.

**Server Functions terminology** — "Server Actions" are a subset of "Server Functions" (`'use server'` directive). Always authenticate/authorize inside every Server Function since they are reachable via direct POST requests.
