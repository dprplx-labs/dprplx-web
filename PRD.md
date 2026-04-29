# PRD — dprplx-web

Product Requirements Document. Living document — updated as the site evolves.

---

## What this site is

The brand and portfolio home for dprplx — a holding company that builds and manages a
focused portfolio of software products (mini-SaaS apps).

The site serves two purposes:
1. **Brand statement** — communicate what dprplx stands for to anyone who lands here
2. **Portfolio showcase** — surface the apps being built, create awareness, and drive
   traffic to individual app landing pages/sites as they launch

---

## Who it's for

**Primary:** Potential partners, press, investors, and early adopters who want to understand
what dprplx is and what it's building.

**Secondary:** Potential clients (as dprplx eventually takes on client work) who want to
assess the quality and taste of the work.

**Not for:** End users of individual apps — they go directly to those apps' own domains.

---

## Design north star

Sir Jony Ive. Purposeful, clean, elegant — nothing unnecessary. Complexity is the enemy;
clarity is the goal. The site should feel like the brand it represents.

**Specific constraints:**
- Zero images, zero icons unless absolutely justified
- CSS-only animation — no JS motion
- Font-weight 200 (extralight) for display type
- Zinc palette — nothing loud
- Generous whitespace — negative space carries the weight
- Mobile-first, but desktop is the primary experience for now

---

## Current scope (v1.0)

| Section | Status | Notes |
|---|---|---|
| Intro sequence | ✅ Live | perplexed → deperplex → dprplx |
| Nav | ✅ Live | Cairn logomark + wordmark |
| Hero | ✅ Live | "Software distilled to its essence." |
| Philosophy | ✅ Live | Brand manifesto |
| Portfolio | ✅ Live | Card Show Club (live); 2 placeholders |
| Contact | ✅ Live | Form validates; email not yet delivered |
| Footer | ✅ Live | Wordmark + copyright |

---

## Out of scope (v1.0)

- Individual app landing pages (these will be added as apps launch)
- Blog / news
- Team / people page
- Case studies
- E-commerce / payments
- User accounts

---

## Planned for v1.1

- **Resend integration** — wire contact form to deliver emails to dprplx.labs@gmail.com
- **www redirect** — `www.dprplx.com` → `dprplx.com`
- **GitHub auto-deploy** — fix Vercel/GitHub account connection for push-to-deploy
- **Portfolio card 02** — reveal next app when ready to tease

---

## Planned for future versions

- Individual app landing pages embedded in the site (e.g. `/cardshowclub`)
- App-specific waitlist / early access sign-up flows
- Press kit page
- SEO meta tags, Open Graph images, structured data

---

## Success metrics

- Site loads and renders correctly on dprplx.com ✅
- Intro sequence plays correctly on first visit ✅
- Contact form submission works end-to-end (email delivery pending)
- Card Show Club link resolves to cardshowclub.com ✅
- Passes lint + type-check cleanly ✅
- No JS errors in production console

---

## App portfolio (as of launch)

| App | Domain | Status | Portfolio card |
|---|---|---|---|
| Card Show Club | cardshowclub.com | Live | Card 01 |
| TBD | — | In development | Card 02 |
| TBD | — | In development | Card 03 |

---

## Content decisions

- No personal name or founder title in the UI — brand-first voice
- Philosophy section: "dprplx was founded on the conviction…" (not "Tom founded…")
- Est. 2025 in hero eyebrow
