# Mapengo Innovations Website

A premium, multi-page static website for **Mapengo Innovations** — a South African digital/tech consultancy based in Johannesburg, Gauteng.

![Mapengo Innovations Homepage](https://github.com/user-attachments/assets/8dfd9558-022e-497a-b3e5-0c09e2e4079b)

---

## Pages

| Page | Path |
|------|------|
| Home | `index.html` |
| About | `about/index.html` |
| Services | `services/index.html` |
| Work / Portfolio | `work/index.html` |
| Products | `products/index.html` |
| Technologies | `technologies/index.html` |
| Blog | `blog/index.html` |
| Blog Post — Digital Transformation | `blog/posts/digital-transformation-sa/index.html` |
| Blog Post — Building Mobile Apps | `blog/posts/building-mobile-apps-south-africa/index.html` |
| Blog Post — Designing for Africa | `blog/posts/designing-for-africa/index.html` |
| Careers | `careers/index.html` |
| Contact | `contact/index.html` |
| 404 | `404.html` |

---

## Local Preview

### Option 1 — Python (no install needed)

```bash
# Python 3
python3 -m http.server 8080

# Then open: http://localhost:8080
```

### Option 2 — Node.js `serve`

```bash
npx serve .
# Then open the URL shown in the terminal (typically http://localhost:3000)
```

### Option 3 — VS Code Live Server

1. Install the **Live Server** extension in VS Code.
2. Right-click `index.html` → **Open with Live Server**.

> **Note:** The site must be served over HTTP (not opened as `file://`) so that JavaScript modules, relative asset paths, and the shared header/footer component injection work correctly.

---

## Project Structure

```
testing/
├── index.html                              # Home
├── about/index.html
├── services/index.html
├── work/index.html
├── products/index.html
├── technologies/index.html
├── blog/
│   ├── index.html
│   └── posts/
│       ├── digital-transformation-sa/
│       │   └── index.html
│       ├── building-mobile-apps-south-africa/
│       │   └── index.html
│       └── designing-for-africa/
│           └── index.html
├── careers/index.html
├── contact/index.html
├── legal/
│   ├── privacy.html
│   ├── terms.html
│   └── cookies.html
├── 404.html
├── robots.txt
├── sitemap.xml
└── assets/
    ├── css/
    │   ├── main.css        # Design system & global styles
    │   └── pages.css       # Page-specific component styles
    ├── js/
    │   ├── main.js         # Core interactions (nav, scroll, animations)
    │   └── components.js   # Shared header/footer injection
    ├── data/
    │   └── site.json       # Centralised site content/configuration
    └── img/
        ├── logo.svg
        ├── favicon.svg
        └── og-image.svg
```

---

## Tech Stack

- **HTML5** — semantic markup, ARIA attributes, structured data (JSON-LD)
- **CSS3** — custom properties design system, fluid typography, CSS Grid/Flexbox, scroll animations
- **Vanilla JavaScript** — shared component injection, mobile nav, scroll effects, counter animations, cookie consent

No build tools or external frameworks are required. The site works as plain static files.

---

## Design System

| Token | Value |
|-------|-------|
| Primary | `#0A1628` (dark navy) |
| Accent | `#FF6B35` (orange) |
| Teal | `#00C9A7` |
| Heading font | Syne (Google Fonts) |
| Body font | Inter (Google Fonts) |

---

## SEO & Performance

- Unique `<title>` and `<meta name="description">` per page
- Open Graph and Twitter Card meta tags
- JSON-LD structured data (Organization, Service, BlogPosting, JobPosting, etc.)
- `robots.txt` and `sitemap.xml`
- SVG assets (zero raster images, sub-1 KB overhead)
- Google Fonts loaded with `preconnect` for fast rendering

---

## Deployment

The site is configured for **GitHub Pages** at:

```
https://nhlobo.github.io/testing/
```

The `assets/js/components.js` file automatically detects the base path depth so all relative links and asset references resolve correctly both locally and on GitHub Pages.
