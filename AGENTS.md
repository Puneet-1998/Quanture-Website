# Repository Guidelines

## Project Structure & Module Organization
This repository is a static multi-page website.
- Root HTML pages: `index.html`, `about.html`, `services.html`, `compliance.html`, `leadership.html`, `partners.html`, `contact.html`, plus legal pages (`privacy.html`, `terms.html`, `disclaimer.html`).
- Shared styles: `assets/css/style.css`.
- Shared behavior: `assets/js/main.js`.
- Reference material (do not treat as production source): `Reference Websites/`.
- Prompt evaluation config: `promptfooconfig.yaml`.

Keep reusable styling and JS in `assets/`; avoid duplicating inline page-specific code unless necessary.

## Build, Test, and Development Commands
- `python3 -m http.server 8000`
  - Run a local static server from the repo root.
- `open http://localhost:8000` (macOS)
  - Preview pages in a browser.
- `promptfoo eval`
  - Run prompt evaluation cases defined in `promptfooconfig.yaml`.
- `promptfoo view`
  - Open the latest eval report UI.

## Coding Style & Naming Conventions
- Use 2-space indentation across HTML, CSS, and JS.
- Use semantic HTML and keep ARIA labels where already present.
- JS style in this repo uses single quotes and `const`/`let` (no `var` for new code).
- Follow existing class naming patterns, including BEM-style forms like `.navbar__nav` and modifiers like `.btn--primary`.
- Keep filenames lowercase and hyphen-free for top-level pages (example: `contact.html`).

## Testing Guidelines
No automated UI test framework is configured in this snapshot.
- Manually smoke-test all primary pages after changes.
- Verify responsive behavior (mobile nav, card layouts, form validation).
- For JS changes, test interactions in `assets/js/main.js` (menu toggle, accordion, scroll effects, contact form).
- If prompt configuration changes, run `promptfoo eval` and confirm assertions pass.

## Commit & Pull Request Guidelines
Git history is not available in this workspace snapshot (`.git` missing), so use this convention:
- Commit format: `type(scope): short summary` (example: `feat(nav): improve mobile menu focus behavior`).
- Keep commits focused and page/component scoped.
- PRs should include: concise description, files changed, manual test notes, and before/after screenshots for UI changes.
- Link related issue/task IDs when available.
