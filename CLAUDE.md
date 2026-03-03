# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static HTML/CSS/JS corporate website for **Quanture Calanytics Private Limited** — a B2B fintech company. No build system, bundler, or package manager. Open any `.html` file directly in a browser to preview.

## Architecture

- **Single shared stylesheet:** `assets/css/style.css` (~770 lines) — all styles for every page live here. It uses CSS custom properties (defined in `:root`) for the brand palette and spacing.
- **Single shared script:** `assets/js/main.js` — handles mobile nav toggle, active link detection (by matching `window.location.pathname`), accordion, smooth scroll, contact form validation (frontend-only, no backend), and IntersectionObserver fade-in for `.card`, `.service-card`, `.leader-card`, `.stat-item`.
- **No templating:** Navbar and footer HTML are duplicated across every `.html` file. When changing nav or footer, **update all 10 HTML pages manually**.
- **No backend / form submission:** The contact form (`contact.html#contactForm`) does client-side validation only and shows "Message Sent" on success. Actual submission logic needs to be wired up externally.

### Pages (all flat in project root)

`index.html` (Home), `about.html`, `services.html`, `compliance.html`, `leadership.html`, `partners.html`, `contact.html`, `privacy.html`, `terms.html`, `disclaimer.html`

### CSS Organization

`style.css` is organized in this order: CSS custom properties → reset & base → typography → layout utilities (`.container`, `.section`, `.grid-*`) → buttons (`.btn--primary`, `.btn--outline`, `.btn--outline-white`) → navbar → hero → cards → stat bar → trust bar → services → compliance → leadership → partners → contact → notice boxes → legal pages → responsive breakpoints.

Responsive breakpoints: `1024px` (tablet), `768px` (mobile — nav collapses to hamburger), `480px` (small phone — buttons go full-width).

### CSS Naming Conventions

- BEM-like: `.navbar__inner`, `.footer__grid`, `.hero__content`, `.contact-info__icon`
- Section alternation: `.section--alt` applies the light-bg color
- Section label pattern: `.section__label` (teal uppercase eyebrow) + `.section__title` + `.section__intro`

### JS Behavior

All JS runs on `DOMContentLoaded`. The IntersectionObserver sets initial `opacity: 0; transform: translateY(20px)` via JS (not CSS), so cards are invisible until scrolled into view. This means cards will be invisible if JS is disabled.

## Brand & Design Constraints

- Colors (CSS vars): `--blue: #1F5AA6`, `--teal: #2FA4A9`, `--orange: #F7931E`
- Additional vars: `--charcoal: #2E2E2E`, `--grey: #6B7280`, `--light-bg: #F4F7FB`, `--border: #D1D9E6`
- Font: Inter (loaded from Google Fonts), fallback: Segoe UI, Arial, sans-serif
- Tone: conservative, institutional, B2B — no flashy gradients or consumer-facing copy
- All services are **partner-only** (not retail consumer) — preserve this framing in any content edits
- Footer on every page must retain the regulatory disclaimer (inside `.footer__disclaimer`)

## Content Placeholders (still need client input)

These are intentionally left blank and should not be fabricated:
- Registered Office address (footers + `contact.html`)
- CIN, GST, PAN, date of incorporation (`contact.html`)
- Phone number (`contact.html`)
- Second director name & bio (`leadership.html`)
- Effective dates on `privacy.html`, `terms.html`, `disclaimer.html`
- Email domain — currently `@quanturecalanytics.com` (confirm before going live)

## Assets

- Logo: `assets/img/logo.png` — navbar `<img>` has `onerror="this.style.display='none'"` so text fallback renders if file is missing
- Favicon: `assets/img/favicon.png`
- `icon/` directory contains reference images (e.g., `AePS.jpeg`) — not currently used in the site
- `Reference Websites/` contains a saved copy of a competitor page (Instantpay) for design reference — not part of the live site
