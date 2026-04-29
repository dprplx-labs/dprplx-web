# Changelog — dprplx-web

Format: significant milestones and releases. Granular changes live in git history.

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
- **Contact** — inline form (name, email, message); server-validated;
  submission logs to console pending email provider wiring
- **Footer** — wordmark + copyright; no personal name/title

### Design decisions
- Cairn logo: three stacked ellipse outlines (white → #87B1FF → IBM blue)
- Typography: Geist extralight throughout; nothing louder than font-weight 200
- Background: #0a0a0a; zinc palette; zero images, zero icons
- CSS-only motion; no JS-driven animation

---

## Upcoming

- Wire Resend for contact form email delivery
- Add `www.dprplx.com` → `dprplx.com` redirect
- Connect GitHub repo to Vercel for automatic deploys on push
- Portfolio card 02 — next app TBD
