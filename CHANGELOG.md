# Changelog — dprplx-web

Format: significant milestones and releases. Granular changes live in git history.

---

## [1.1.0] — 2026-04-29 — Baseline hardening

### Infrastructure
- **www redirect** — `www.dprplx.com` → `dprplx.com` (301 Permanent) via Vercel domain +
  GoDaddy CNAME → `cname.vercel-dns.com`
- **GitHub auto-deploy** — Vercel Deploy Hook wired to GitHub Actions; every push to `main`
  triggers a production deployment automatically (bypasses Vercel/GitHub OAuth mismatch)
- **Vercel Analytics** — enabled via `@vercel/analytics/next`; free tier, pageview tracking live

### Features
- **Contact form email delivery** — Resend integrated (`RESEND_API_KEY` env var);
  from `onboarding@resend.dev`, to `dprplx.labs@gmail.com`, reply-to set to sender
- **Favicon** — cairn SVG mark (`app/icon.svg`); dark background, three ellipse outlines
- **Open Graph** — full OG + Twitter card metadata in `layout.tsx`; dynamic OG image
  generated via `app/opengraph-image.tsx` (Next.js ImageResponse, edge runtime)

### Developer experience
- **Branching strategy** established — `main` = production; feature/fix branches → PR → merge
- **`.env.example`** added — documents required env vars with empty values; committed to repo
- **Documentation** — ARCHITECTURE.md, CHANGELOG.md, DECISIONS.md, PRD.md created
  and populated with full project context

---

## [1.0.0] — 2026-04-28 — Initial launch

### Deployed
- dprplx.com live on Vercel (Hobby, CLI-deployed)
- DNS configured at GoDaddy → Vercel A record

### Features shipped
- **Intro sequence** — three-phase animated overlay (perplexed → deperplex → dprplx)
  with noise grain, floating question marks, and cairn logomark reveal
- **Nav** — fixed wordmark + cairn logomark
- **Hero** — full-viewport staggered CSS fade-up
- **Philosophy** — brand manifesto with pull quote
- **Portfolio** — 3-column grid; Card Show Club (card 01) live with real content;
  cards 02 & 03 as "Unannounced / In development" placeholders
- **Contact** — inline form (name, email, message); server-validated
- **Footer** — wordmark + copyright; no personal name/title

### Design decisions
- Cairn logo: three stacked ellipse outlines (white → #87B1FF → IBM blue)
- Typography: Geist extralight throughout; nothing louder than font-weight 200
- Background: #0a0a0a; zinc palette; zero images, zero icons
- CSS-only motion; no JS-driven animation

---

## Upcoming

- Verify dprplx.com as sending domain in Resend (replace `onboarding@resend.dev`)
- Vercel account restructuring (migrate from cardshowclub account to dprplx identity)
- Portfolio card 02 — next app TBD
