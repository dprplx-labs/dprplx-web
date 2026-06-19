# dprplx.com — Implementation Brief for Claude Code

**Repo:** `dprplx-labs/dprplx-web` (local: `C:\dev\dprplx\dprplx-web`)
**Task:** Enhance the current site from a single-page, Lab-only brand site into a **two-page** site: a new **agency-focused home page** (`/`) and a **Lab page** (`/lab`) that is a close replica of today's home.
**Status:** Copy and design decisions are final (embedded below). This brief is self-contained — implement directly from it.

---

## 1. Objective

The current site presents dprplx as a portfolio company ("Software distilled to its essence"). We are repositioning the **home page** to present dprplx as **an agency that rebuilds how businesses work for the age of agents**, and moving the existing portfolio content to a separate **`/lab`** page.

The home page is written entirely for prospective **agency clients**. It must read as a focused agency site.

---

## 2. Hard constraints (do not violate)

1. **Do NOT modify `app/components/IntroSequence.tsx`, `app/components/LogoMark.tsx`, or the cairn/wordmark in any way.** Reuse `IntroSequence` as a wrapper only. These are brand-locked.
2. **Do NOT use the literal term "AI" anywhere in rendered copy.** It is intentionally implied via "agents" and "the age of agents." (Code comments are fine; visible text is not.)
3. **Home page is agency-only.** No mention of the Lab, the portfolio, products, or any other venture in the home copy. No "two halves," no flywheel, no "we build to prove it." The only connection to the Lab is the restrained nav link.
4. **Preserve the existing aesthetic exactly:** background `#0a0a0a`, Geist, font-weight 200 (extralight) for display type, zinc palette, **zero images / icons / drop shadows**, generous whitespace, CSS-only animation. When in doubt, remove rather than add.
5. **No new dependencies.** No external UI libraries. Hand-crafted Tailwind only.
6. **Server Components by default.** Only `ContactForm` and `IntroSequence` are client components; keep it that way (new sections are Server Components).
7. **Next.js 16** conventions apply (see §8).

---

## 3. Target architecture

```
/        Home  — agency. IntroSequence → Nav → main( Hero → Work → WhyItWorks → Contact ) → Footer
/lab     Lab   — portfolio. IntroSequence → Nav → main( Hero(lab) → Philosophy → Portfolio ) → Footer
```

- Both routes are wrapped in the **unchanged** `IntroSequence`. Its `sessionStorage` guard (`dprplx_intro`) ensures the intro plays only once per session regardless of which page the visitor lands on — no edit to the component needed.
- **Contact lives on the home page only.** `/lab` ends with the Portfolio section, then Footer. (Rationale: avoid a duplicate contact form; easy to add to `/lab` later if desired.)
- `Footer` appears on both pages, unchanged.

---

## 4. File-by-file changes

| File | Action |
|---|---|
| `app/components/Hero.tsx` | **Edit** — parametrize via props (eyebrow, two title lines, subhead) with no behavioral change to layout/type/animation. See §5. |
| `app/components/Work.tsx` | **Create** (Server) — new home section. §6. |
| `app/components/WhyItWorks.tsx` | **Create** (Server) — new home section. §6. |
| `app/components/Nav.tsx` | **Edit** — add a single restrained "Lab" link; wordmark links to `/`. Logo/mark untouched. §7. |
| `app/page.tsx` | **Rewrite** — agency home composition. §9. |
| `app/lab/page.tsx` | **Create** — Lab page composition + route metadata. §9. |
| `app/components/Contact.tsx` | **Edit copy** — broaden intro line. §6. |
| `app/layout.tsx` | **Edit** — update global `metadata` to agency positioning. §10. |
| `app/opengraph-image.tsx` | **Edit** — update eyebrow + tagline text. §10. |
| `app/components/Philosophy.tsx`, `Portfolio.tsx`, `Footer.tsx`, `ContactForm.tsx`, `actions.ts` | **No change** — reused as-is on `/lab` / home. |
| `app/components/IntroSequence.tsx`, `LogoMark.tsx` | **Do not touch.** |

---

## 5. `Hero.tsx` — parametrize (preserve everything else)

Add a props interface and use it in place of the hardcoded strings. Keep the exact class names, the `fadeUp` animation timings, and the two-line `<h1>` structure.

```tsx
type HeroProps = {
  eyebrow: string
  line1: string
  line2: string
  subhead: string
}

export default function Hero({ eyebrow, line1, line2, subhead }: HeroProps) {
  // same <section> / <div> / classes as today
  // eyebrow -> the <p> eyebrow
  // line1 + <br/> + line2 -> the <h1>
  // subhead -> the subtext <p>
}
```

Keep: the three `style={{ animation: "fadeUp 0.9s ease-out <delay> both" }}` staggers exactly as they are now (0.1s / 0.3s / 0.5s).

---

## 6. Home section content (exact copy)

Match the existing section styling used in `Philosophy.tsx` / `Contact.tsx`:
- Section wrapper: `className="px-8 md:px-16 lg:px-24 py-32 md:py-48 border-t border-zinc-900"`, inner `<div className="max-w-5xl">`.
- Eyebrow label: `className="text-[11px] font-light tracking-[0.45em] text-[#87B1FF] uppercase mb-16"`.
- Display headline / pull-quote: extralight, e.g. `className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extralight text-zinc-100 leading-[1.2] tracking-tight mb-16"`.
- Body copy: `className="max-w-lg space-y-5 text-[15px] font-light text-zinc-400 leading-7"`.

### Hero (home) — props to pass from `page.tsx`
- **eyebrow:** `AGENCY · EST. 2026`
- **line1:** `We rebuild how`
- **line2:** `businesses work.`
- **subhead:** `dprplx is an agency that helps businesses rebuild how they operate for the age of agents — leaner, clearer, and built to run themselves.`

### `Work.tsx`
- **eyebrow:** `THE WORK`
- **headline** (two lines): `Less to run.` / `More that works.`
- **body:** `We rebuild how a business runs: simpler operations, automation where it counts, systems that finally talk to each other, and software where it's needed. The work, redesigned around what agents can now do.`

### `WhyItWorks.tsx`
- **eyebrow:** `WHY IT WORKS`
- **pull-quote** (large, two lines, mirror the `Philosophy` blockquote style): `Most companies add tools.` / `We rebuild the work.`
- **body:** `We don't bolt new tools onto how you already work. We rebuild the operation so agents can run inside it — clean data, structured knowledge, clear permissions. People set direction and judge the work; agents do the middle. The result isn't software added on. It's a business that runs leaner and gets sharper over time.`

### `Contact.tsx` — edit the intro line only
- **headline:** keep `Let's talk.`
- **replace** the current `For partnerships, press, or investment inquiries.` with:
  `Whether you want to work together, partner, or just compare notes on building for the age of agents — start here.`
- Leave `ContactForm` and `actions.ts` unchanged.

---

## 7. `Nav.tsx` — add the Lab link

Keep the fixed bar, the `LogoMark width={34}`, and the wordmark. Two changes:
1. Make the logo + wordmark a link to `/` (use `next/link`).
2. Add a single right-aligned text link to `/lab` labeled **Lab**, in a restrained style consistent with the wordmark.

Suggested structure (change the container to space-between):

```tsx
import Link from 'next/link'
import LogoMark from './LogoMark'

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 md:px-16 lg:px-24 h-16 flex items-center justify-between bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-zinc-900/60">
      <Link href="/" className="flex items-center gap-4">
        <LogoMark width={34} />
        <span className="text-sm font-light tracking-[0.28em] text-white/80">dprplx</span>
      </Link>
      <Link
        href="/lab"
        className="text-[11px] font-light tracking-[0.3em] uppercase text-zinc-500 hover:text-zinc-300 transition-colors duration-300"
      >
        Lab
      </Link>
    </nav>
  )
}
```

Do not alter `LogoMark`. (On `/lab`, the wordmark returning home is sufficient navigation; no active-state styling required.)

---

## 8. Lab page (`/lab`) content

`/lab` is a close replica of the **current** home page — reuse existing components and current copy **verbatim**:
- **Hero (lab):** pass the current values — eyebrow `PORTFOLIO CO. · EST. 2026`, line1 `Software distilled`, line2 `to its essence.`, subhead `dprplx builds a focused portfolio of software products. Each one shaped by a single principle: the beauty of simplicity.`
- **Philosophy:** unchanged.
- **Portfolio:** unchanged (keeps the 3 product cards, status dots, domain links).
- No Contact section on `/lab`.

---

## 9. Page compositions

### `app/page.tsx` (home)
```tsx
import IntroSequence from "@/app/components/IntroSequence";
import Nav from "@/app/components/Nav";
import Hero from "@/app/components/Hero";
import Work from "@/app/components/Work";
import WhyItWorks from "@/app/components/WhyItWorks";
import Contact from "@/app/components/Contact";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <IntroSequence>
      <Nav />
      <main>
        <Hero
          eyebrow="AGENCY · EST. 2026"
          line1="We rebuild how"
          line2="businesses work."
          subhead="dprplx is an agency that helps businesses rebuild how they operate for the age of agents — leaner, clearer, and built to run themselves."
        />
        <Work />
        <WhyItWorks />
        <Contact />
      </main>
      <Footer />
    </IntroSequence>
  );
}
```

### `app/lab/page.tsx` (lab) — include route metadata
```tsx
import type { Metadata } from "next";
import IntroSequence from "@/app/components/IntroSequence";
import Nav from "@/app/components/Nav";
import Hero from "@/app/components/Hero";
import Philosophy from "@/app/components/Philosophy";
import Portfolio from "@/app/components/Portfolio";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "dprplx Lab — Software distilled to its essence",
  description:
    "A focused portfolio of software products, each built by dprplx. Each one shaped by a single principle: the beauty of simplicity.",
};

export default function Lab() {
  return (
    <IntroSequence>
      <Nav />
      <main>
        <Hero
          eyebrow="PORTFOLIO CO. · EST. 2026"
          line1="Software distilled"
          line2="to its essence."
          subhead="dprplx builds a focused portfolio of software products. Each one shaped by a single principle: the beauty of simplicity."
        />
        <Philosophy />
        <Portfolio />
      </main>
      <Footer />
    </IntroSequence>
  );
}
```

---

## 10. Metadata / OG

### `app/layout.tsx` — update global `metadata`
- **title:** `dprplx — An agency that rebuilds how businesses work`
- **description:** `dprplx is an agency that helps businesses rebuild how they operate for the age of agents — leaner, clearer, and built to run themselves.`
- Update `openGraph.title` / `openGraph.description` / `twitter` strings to match the above.

### `app/opengraph-image.tsx` — update the two text strings
- Eyebrow `Portfolio Co. · Est. 2025` → `Agency · Est. 2026`
- Tagline `Software distilled to its essence.` → `We rebuild how businesses work.`
- Keep the `dprplx` headline and all styling as-is.

---

## 11. Acceptance criteria

- [ ] `/` renders: Hero (agency) → Work → Why it works → Contact → Footer.
- [ ] `/lab` renders: Hero (current copy) → Philosophy → Portfolio → Footer.
- [ ] IntroSequence still plays once per session, on either entry point, with identical motion/timing. (`IntroSequence.tsx` and `LogoMark.tsx` have **zero** diff.)
- [ ] Nav: wordmark → `/`; "Lab" link → `/lab`; works from both pages.
- [ ] The literal string "AI" appears nowhere in rendered copy (home, lab, metadata, OG).
- [ ] Home copy contains no reference to the Lab/portfolio/other ventures (the nav link is the only path to `/lab`).
- [ ] Aesthetic unchanged: `#0a0a0a`, extralight type, zinc palette, no images/icons/shadows.
- [ ] New sections are Server Components; no new dependencies added.
- [ ] `npm run lint` passes.
- [ ] `npx tsc --noEmit` passes.
- [ ] `npm run build` succeeds.

---

## 12. Out of scope (later phases — do not build now)

Dedicated `/solutions`, `/model`, `/about`, `/contact` routes; per-product `/lab/[app]` pages; a "labs-live" page; proposal microsites; any nav expansion beyond the single "Lab" link. Keep new sections self-contained so they can later move to their own routes without rework.

---

## 13. Workflow notes

- Read `node_modules/next/dist/docs/` before any non-trivial Next API use (this is Next.js 16; params/`cookies()`/`headers()` are async; ESLint is not run by `next build`).
- Run `npm run lint` **and** `npx tsc --noEmit` before considering the task complete.
- Deploy is automatic on push to `main` (Vercel native Git integration, account `dprplx.labs@gmail.com`). Do not push without Tom's go-ahead.
```
