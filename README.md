# Mapengo Innovations — Website

[![Deploy to GitHub Pages](https://github.com/Nhlobo/testing/actions/workflows/deploy.yml/badge.svg)](https://github.com/Nhlobo/testing/actions/workflows/deploy.yml)

Live site: **<https://nhlobo.github.io/testing/>**

## Tech Stack

- [Astro 5](https://astro.build) — static-site framework
- MDX content collections (blog, solutions, case studies)
- Vanilla CSS design system (`src/styles/global.css`)
- PWA-ready (service worker + web manifest)
- GitHub Actions → GitHub Pages CI/CD

## Local Development

```bash
# Install dependencies
npm ci

# Start dev server (http://localhost:4321/testing/)
npm run dev

# Build for production (output to dist/)
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

```
src/
  content/        # MDX content collections
    blog/         # Blog posts
    solutions/    # Service/solution pages
    case-studies/ # Portfolio case studies
  layouts/
    BaseLayout.astro   # Shared HTML shell
  pages/
    index.astro        # Home
    pricing.astro      # Pricing
    contact.astro      # Contact form
    blog/              # Blog index + [slug] detail
    services/          # Services index + [slug] detail
    work/              # Case studies index + [slug] detail
    legal/             # Privacy + Terms
    404.astro          # Not-found page
    offline.astro      # Offline fallback
  styles/
    global.css    # Design system tokens & global styles
  lib/
    analytics.ts  # Client-side analytics helpers
    consent.ts    # Consent management helpers
public/
  favicon.svg
  manifest.json
  robots.txt
  sw.js           # Service worker (offline support)
.github/
  workflows/
    deploy.yml    # Build & deploy to GitHub Pages
```

## Deployment

The site deploys automatically to **GitHub Pages** on every push to `main`.

### One-time GitHub setup

1. In your repo go to **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Push to `main` — the workflow will build and deploy automatically.

That's it. The live URL will be `https://nhlobo.github.io/testing/`.

### Optional: Contact form endpoint

The contact form (`/contact/`) can POST to any form-handling API. To wire it up:

1. Go to **Settings → Secrets and variables → Actions**.
2. Add a secret named `CONTACT_FORM_ENDPOINT` with the URL of your form handler
   (e.g. a Formspree endpoint `https://formspree.io/f/XXXXXXXX`).

The workflow already passes this secret as an environment variable at build time.

## Content Editing

All content lives in `src/content/` as MDX files. Edit them directly and push
to `main` — the site rebuilds and redeploys automatically.

## License

© Mapengo Innovations. All rights reserved.
