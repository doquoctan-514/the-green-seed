# AGENTS.md — THE GREEN SEED

## Project scope

This repository is a static, multi-page website built with plain HTML, CSS, and JavaScript. Do not introduce a framework, bundler, or large architectural change without explicit approval.

## Run locally

From the repository root:

```bash
python -m http.server 8080
```

Open `http://127.0.0.1:8080/`.

There is no package install or production build step. Validation is performed against the static files served by the local HTTP server.

## Main files

- Page content: `*.html`
- Shared styles: `assets/css/styles.css`
- Shared navigation, footer, FAQ, and form behavior: `assets/js/site.js`
- Frequently changed brand, price, contact, and endpoint data: `assets/js/content.js`
- Google Apps Script receiver template: `google-apps-script/Code.gs`

## Required QA

Test mobile-first at 360px, 390px, 430px, 768px, 1280px, and 1440px.

Before handoff:

- Check every internal HTML link and anchor.
- Check mobile menu open, close, focus, and Escape behavior.
- Check the interest form in demo mode and, when configured, its submission states.
- Confirm there is no page-level horizontal overflow.
- Confirm browser console has no errors.
- Confirm images load and below-the-fold images use lazy loading where appropriate.
- Capture one mobile and one desktop screenshot.

## Content and safety guardrails

- Do not change product prices unless explicitly requested.
- Do not present research targets or unverified scientific properties as proven facts.
- Keep statements about biodegradation, food safety, antibacterial properties, and antioxidant properties appropriately qualified.
- Do not expose formulation ratios, processing parameters, or production secrets.
- Keep `meta robots="noindex,nofollow,noarchive"`, `robots.txt`, and hosting-level `X-Robots-Tag` rules unless explicitly instructed otherwise.
- Do not connect or simulate a production form endpoint without a real URL.
- Keep image labels transparent when assets are mockups or infographics.

## Repository rules

- Never commit `node_modules/`, `dist/`, `.env*` files other than `.env.example`, or logs.
- Work on a feature branch and open a pull request for review; do not merge directly into `main`.
- Preserve unrelated user changes.
