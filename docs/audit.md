# Mapengo Innovations — Site Audit

**Audited:** April 2025  
**Auditor:** Internal engineering team  
**Live URL:** https://nhlobo.github.io/testing/  
**Framework:** Astro 5 (static output, GitHub Pages)

---

## 1. Current Information Architecture (Site Map)

```
/                           Home
/services/                  Services index
  /services/[slug]/         Individual service pages (7 services)
/work/                      Case studies index  
  /work/[slug]/             Individual case study pages (6 case studies)
/case-studies/              Case studies index (alias, same content as /work/)
/industries/                Industries index
  /industries/[slug]/       Individual industry pages (6 industries)
/about/                     About page
/contact/                   Contact / Get Quote
/pricing/                   Pricing page
/blog/                      Blog index
  /blog/[slug]/             Individual blog posts (3 posts)
/process/                   Process / How we work
/solutions/                 Solution-specific landing pages (3 pages)
/legal/privacy/             Privacy Policy
/legal/terms/               Terms of Service
/legal/popia/               POPIA Compliance Notice
/offline/                   Offline fallback (PWA)
/404                        404 error page
```

---

## 2. UI/UX Weaknesses (Pre-Rebuild Assessment)

### Navigation
- **No shared navigation component.** Every page duplicates its own header `<nav>` inline. This creates inconsistency: some pages include "Industries", "About", "Blog" while others omit them entirely.
- **Mobile navigation** has no hamburger/slide-out menu — the inline flex nav wraps awkwardly on small screens.
- **Active state** — the currently-active nav link is only sometimes highlighted; no consistent pattern.
- **Footer** — similarly duplicated per page, minimal with only copyright + 2 legal links. No secondary nav, social links, or company info.

### Visual Design
- Design tokens are well-defined (CSS variables) but inconsistently applied — some pages use inline styles that deviate from the token system.
- Hero sections across pages feel interchangeable; only the home hero has real differentiation.
- No illustrations, icon system, or graphic elements beyond emoji icons in content.
- No image content at all (no team photos, client logos, office imagery, project screenshots).

### Content Presentation
- Service cards on `/services/` show only a description + feature tags. No pricing hint, no CTA per card, no "why choose this" angle.
- Case study cards on `/work/` are visually clean but lack a thumbnail/image to break up the grid visually.
- Individual case study pages have good markdown content but the layout has only 2 columns — the sidebar is sparsely populated.
- The `/about/` page exists but is not listed in the main navigation on most pages.

### Forms
- Contact form is a basic single-step form. No guided flow, no budget/timeline fields, no business-type selector.
- Form action points to `import.meta.env.CONTACT_FORM_ENDPOINT || '#'` — without configuring the env variable the form submits to `#` (no-op). No client-side handling for this fallback.
- No form validation feedback beyond native HTML `required`.
- No success state / thank-you message after submission.

---

## 3. Content Gaps & Missing Sections

| Gap | Impact |
|---|---|
| No client logo strip | Reduces social proof significantly |
| No testimonials section on homepage | Low conversion trust |
| No stats/numbers bar on homepage | Misses quick authority signal |
| "Get Quote" has no guided multi-step flow | Reduces qualified lead quality |
| Services pages lack "Problem → Solution → Business Impact" structure | Weak conversion narrative |
| `/about/` missing from most page headers | About page gets no organic traffic |
| No "Process" link in main nav | Process page is an orphan |
| No individual `/case-studies/[slug]/` canonical URL | SEO gap; all detail lives at `/work/[slug]/` |
| Blog has only 3 articles | Thin content for SEO |
| No FAQ section | Misses long-tail SEO + common objections |
| No testimonials page or section | Trust gap |
| No team/people section on About | Reduces trust |

---

## 4. User Journey & Conversion Issues

### Awareness → Consideration
- Homepage hero is good (clear headline + CTA) but does not segment visitors by type (Startup / SME / Enterprise / Government). A first-time visitor from any of these groups gets identical messaging.
- No clear visual hierarchy guiding the eye from headline → value proof → CTA.

### Consideration → Intent
- Services pages are informational only. There is no inline "Start with this service" CTA that pre-fills the contact form. 
- Case studies lack a direct "Build something similar" CTA that passes the relevant service context to the quote form.
- Pricing page provides ranges but no calculator or indicative quote to capture intent.

### Intent → Conversion
- Contact form is a generic "send us a message" form. For enterprise/government visitors, this under-sells the experience.
- No confirmation email or auto-responder messaging.
- WhatsApp button is present (BaseLayout) ✅ but its pre-filled message is generic. Industry/page context should be injected.
- Sticky CTA bar is present ✅ but triggers on scroll position only via JS — the JS logic for showing it is not visible in HTML source (it's `display:none` with JS required to show it).

---

## 5. Trust Signal Deficiencies

| Signal | Status |
|---|---|
| Client logos | ❌ Absent |
| Testimonials (homepage) | ❌ Absent |
| Named testimonials with company/role | ❌ Absent |
| Stats bar ("10+ projects, 5+ industries") | ❌ Absent from homepage |
| Case study metrics (quantified results) | ✅ Present on case study pages |
| POPIA compliance notice | ✅ Dedicated page exists |
| Security/compliance hints in forms | ❌ Absent |
| Team photos / named founder | ❌ Absent |
| Awards / press mentions | ❌ Absent (understandable for a new company) |
| LinkedIn / social proof links | ❌ Absent |

---

## 6. Performance & Technical Issues

| Issue | Severity |
|---|---|
| **Deploy workflow uploads repo root, not `dist/`** — the Astro site is never actually deployed; raw HTML files from root are served instead | 🔴 Critical |
| Google Fonts loaded via `<link>` in every page — render-blocking | 🟡 Medium |
| No `<link rel="preload">` for fonts | 🟡 Medium |
| No image optimization (no actual images in the site yet) | 🟡 Medium (future) |
| Service Worker (`public/sw.js`) not registered in any page | 🟡 Medium |
| No `loading="lazy"` on images (no images currently) | 🟡 Low (future) |
| `dist/` folder should be `.gitignore`d (it currently is ✅) | ✅ OK |
| `node_modules/` in `.gitignore` ✅ | ✅ OK |

---

## 7. Mobile Responsiveness Issues

- Navigation collapses to wrapping flex on small screens — not a hamburger menu. On 320px screens the nav items overflow.
- Some sections use fixed `padding` values rather than the CSS token system, which can cause tight spacing on mobile.
- The two-column layout on case study detail pages (`.prose` + sidebar) is not responsive on screens under 768px.
- Form grid (first/last name side-by-side) can be too narrow on mobile.

---

## 8. SEO Assessment

| Item | Status |
|---|---|
| `<title>` and `<meta description>` on all pages | ✅ Present |
| Open Graph tags | ✅ Present in BaseLayout |
| Twitter Card | ✅ Present |
| Canonical URLs | ✅ Present |
| `robots.txt` | ✅ Present at `/public/robots.txt` |
| Sitemap | ✅ Generated by `@astrojs/sitemap` |
| Structured data (JSON-LD) | ❌ Absent — no Organization, WebSite, or Service schema |
| `hreflang` | ❌ Absent (English-only site, acceptable) |
| Image `alt` attributes | N/A (no images currently) |
| Heading hierarchy | ✅ Consistent h1 per page |
| Internal linking | 🟡 Weak — nav inconsistency limits crawlability |

---

## 9. Priority Recommendations

### P0 — Critical (must fix)
1. **Fix deploy workflow** — change `upload-pages-artifact` path from `.` to `dist` and add `npm ci && npm run build` steps. Without this, the Astro site is not deployed at all.

### P1 — High impact, quick wins
2. **Shared Nav component** — DRY up navigation into `src/components/Nav.astro` and `src/components/Footer.astro`. Ensure all pages show all links.
3. **Guided quote flow** — upgrade `/contact/` to a multi-step form (industry → service → budget → timeline → details) with client-side indicative pricing/timeline estimate.
4. **Homepage trust signals** — add stats bar, testimonials section, and client logo strip to the homepage.
5. **Industry targeting on homepage** — add a segmentation section that dynamically shows relevant services/CTAs per audience type (Startup / SME / Enterprise / Government).

### P2 — Important
6. **Add individual `/case-studies/[slug]/`** — currently case study detail is only at `/work/[slug]/`. Add a dedicated route with canonical SEO for both paths.
7. **Add structured data (JSON-LD)** — Organization, WebSite, and Service schema in BaseLayout.
8. **Mobile hamburger nav** — replace inline flex nav with a proper responsive toggle.
9. **WhatsApp context injection** — pass page context (industry, service) into the pre-filled WhatsApp message using JS.

### P3 — Nice to have
10. **Service Worker registration** — register `sw.js` for offline/PWA support.
11. **Font optimization** — use `font-display: swap` and preload the most critical font weights.
12. **FAQ sections** — add FAQ to Services and Contact pages to capture long-tail queries and address common objections.
13. **Team section** — add founder/team profile to About page.
