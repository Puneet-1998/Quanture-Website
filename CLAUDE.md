# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static HTML/CSS/JS corporate website for **Quanture Calanytics Private Limited** — a B2B + B2C fintech company providing regulated financial infrastructure services (AePS, DMT, BBPS, CMS) to institutional partners and consumers across India. No build system, bundler, or package manager. Open any `.html` file directly in a browser to preview.

## Development

```bash
python3 -m http.server 8000          # local dev server
open http://localhost:8000            # preview in browser (macOS)
```

No automated test framework. Manually smoke-test pages after changes, especially responsive behavior (mobile nav, card layouts, form validation).

## Architecture

- **Single shared stylesheet:** `assets/css/style.css` (~1000 lines) — all styles for every page. Uses CSS custom properties in `:root` for brand palette and spacing.
- **Single shared script:** `assets/js/main.js` — handles: mobile nav toggle, active link detection, navbar scroll shadow (`.navbar--scrolled`), accordion, smooth scroll with navbar offset, contact form validation (frontend-only, no backend), staggered card fade-in via IntersectionObserver, section heading fade-up, back-to-top button (injected via JS), stat counter animation, and page load fade-in (`body.loaded`).
- **No templating:** Navbar and footer HTML are duplicated across every `.html` file. When changing nav or footer, **update all 10 HTML pages manually**.
- **No backend / form submission:** The contact form (`contact.html#contactForm`) does client-side validation only and shows "Message Sent" on success. Actual submission logic needs to be wired up externally.
- **noscript fallback:** Each page has `<noscript><style>body{opacity:1!important}</style></noscript>` to prevent invisible content when JS is disabled (since the page fade-in is JS-driven).

### Pages (all flat in project root)

`index.html` (Home), `about.html`, `services.html`, `compliance.html`, `leadership.html`, `partners.html`, `contact.html`, `privacy.html`, `terms.html`, `disclaimer.html`

### Non-production directories

- `Codex/` — old snapshot of pages and assets. Not part of the live site.
- `Reference Websites/` — saved competitor page (Instantpay) for design reference. Not part of the live site.
- `icon/` — reference images (e.g., `AePS.jpeg`). Not currently used in the site.

### CSS Organization

`style.css` is organized in this order: CSS custom properties → reset & base → typography → layout utilities (`.container`, `.section`, `.grid-*`) → buttons (`.btn--primary`, `.btn--outline`, `.btn--outline-white`) → navbar → hero → trust bar → cards → service cards → stat bar → timeline → compliance table → leadership cards → accordion → forms → footer → breadcrumb → page hero → icon list → contact info → notice boxes → legal pages → dark section → CTA section → JS-driven states → responsive breakpoints.

Responsive breakpoints: `1024px` (tablet), `768px` (mobile — nav collapses to hamburger), `480px` (small phone — buttons go full-width).

### CSS Naming Conventions

- BEM-like: `.navbar__inner`, `.footer__grid`, `.hero__content`, `.contact-info__icon`
- Section alternation: `.section--alt` applies the light-bg color; `.section--dark` for dark sections
- Section label pattern: `.section__label` (teal uppercase eyebrow) + `.section__title` + `.section__intro`

### JS Behavior

All JS runs on `DOMContentLoaded`. Key details:
- IntersectionObserver sets initial `opacity: 0; transform: translateY(24px)` via JS (not CSS) on `.card, .service-card, .leader-card, .stat-item, .security-badge` — cards are invisible until scrolled into view.
- Section headings get `.fade-up` class via JS; `.visible` is added on intersection.
- Back-to-top button is created dynamically (not in HTML). Appears after 500px scroll.
- Stat counter animates numeric `.stat-item__number` values from 0 with ease-out quad easing.
- `body.loaded` is added at end of DOMContentLoaded to trigger page fade-in.

## Brand & Design Constraints

- Colors (CSS vars): `--blue: #1F5AA6`, `--teal: #2FA4A9`, `--orange: #F7931E`
- Additional vars: `--charcoal: #2E2E2E`, `--grey: #6B7280`, `--light-bg: #F4F7FB`, `--border: #D1D9E6`
- Fonts: **Space Grotesk** (headings, `--font-head`) + **DM Sans** (body, `--font-body`), loaded from Google Fonts. Fallback: Segoe UI, Arial, sans-serif.
- Tone: conservative, institutional — no flashy gradients or consumer-facing hype
- Business model is **B2B + B2C** — serves both institutional partners and consumers
- Footer on every page must retain the regulatory disclaimer (inside `.footer__disclaimer`)

## Content Placeholders (still need confirmation)

- Email domain — currently `@quanturecalanytics.com` (confirm before going live)
- Director photos (Neelam Chandwani, Madan Lal) — currently showing initials avatar on `leadership.html`

## Assets

- Logo: `assets/img/logo.png` — navbar `<img>` has `onerror="this.style.display='none'"` so text fallback renders if file is missing
- Favicon: `assets/img/favicon.png`
- Service SVG icons: `assets/img/icon-aeps.svg`, `icon-dmt.svg`, `icon-bbps.svg`, `icon-cms.svg` — used on `index.html` and `services.html`

## Coding Style

- 2-space indentation across HTML, CSS, and JS
- Semantic HTML; keep ARIA labels where already present
- JS uses single quotes; prefer `const`/`let` over `var` for new code
- Follow existing BEM-like class naming (`.navbar__nav`, `.btn--primary`)
- Keep filenames lowercase for top-level pages (`contact.html`, not `Contact.html`)
