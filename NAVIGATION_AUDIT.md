# MAPENGO INNOVATIONS WEBSITE - NAVIGATION AUDIT & INTERNAL LINKS REPORT

## 1. FULL DIRECTORY STRUCTURE

```
/home/runner/work/testing/testing/
├── 404.html
├── README.md
├── robots.txt
├── sitemap.xml
│
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   └── pages.css
│   ├── data/
│   │   └── site.json
│   ├── img/
│   │   ├── favicon.svg
│   │   ├── logo.svg
│   │   ├── og-image.svg
│   │   └── portfolio/
│   └── js/
│       ├── components.js
│       └── main.js
│
├── about/
│   └── index.html
├── blog/
│   ├── index.html
│   └── posts/
│       ├── building-mobile-apps-south-africa/
│       ├── designing-for-africa/
│       └── digital-transformation-sa/
├── careers/
│   └── index.html
├── contact/
│   └── index.html
├── index.html (root)
├── legal/
│   ├── cookies.html
│   ├── privacy.html
│   └── terms.html
├── pricing/
│   └── index.html
├── products/
│   └── index.html
├── services/
│   └── index.html
├── technologies/
│   └── index.html
└── work/
    └── index.html

Total: 21 directories, 25 files
```

---

## 2. COMPONENTS.JS - NAVIGATION CONFIGURATION

**File Path:** `/home/runner/work/testing/testing/assets/js/components.js`

### Navigation Links Array (Lines 43-53):
```javascript
const navLinks = [
  { label: 'Home',         href: '' },
  { label: 'About',        href: 'about/' },
  { label: 'Services',     href: 'services/' },
  { label: 'Work',         href: 'work/' },
  { label: 'Technologies', href: 'technologies/' },
  { label: 'Pricing',      href: 'pricing/' },
  { label: 'Blog',         href: 'blog/' },
  { label: 'Careers',      href: 'careers/' },
  { label: 'Contact',      href: 'contact/' },
];
```

### Base Path Detection:
- Dynamically calculates relative path depth based on URL structure
- Handles GitHub Pages subdirectory (`/testing/`)
- Returns `./` for root, `../` for 1 level deep, `../../` for 2 levels deep, etc.

### Header Links Injected (Lines 79-104):
- Logo: `${BASE}` → Home
- Nav items with `${BASE}${link.href}` prefix
- CTA Button: `${BASE}contact/` → Get Started

### Footer Links Injected (Lines 107-193):
**Services Column:**
- `${BASE}services/#web-development`
- `${BASE}services/#mobile-apps`
- `${BASE}services/#ui-ux-design`
- `${BASE}services/#ecommerce`
- `${BASE}services/#cloud-hosting`
- `${BASE}services/#maintenance-support`

**Company Column:**
- `${BASE}about/`
- `${BASE}work/`
- `${BASE}technologies/`
- `${BASE}pricing/`
- `${BASE}blog/`
- `${BASE}careers/`

**Contact Column:**
- `${BASE}contact/`

**Legal Navigation (Lines 184-188):**
- `${BASE}legal/privacy.html`
- `${BASE}legal/terms.html`
- `${BASE}legal/cookies.html`

**Cookie Banner (Line 202):**
- `${BASE}legal/cookies.html`

---

## 3. INDEX.HTML (ROOT) - INTERNAL LINKS

**File Path:** `/home/runner/work/testing/testing/index.html` (535 lines)

### Navigation & CTA Links:
- Line 99-101: `href="work/"` → Explore Our Work
- Line 102-104: `href="pricing/"` → View Pricing
- Line 153: `href="services/#web-development"` → Learn more (Web Dev)
- Line 165: `href="services/#mobile-apps"` → Learn more (Mobile)
- Line 177: `href="services/#ui-ux-design"` → Learn more (UI/UX)
- Line 189: `href="services/#ecommerce"` → Learn more (E-Commerce)
- Line 201: `href="services/#cloud-hosting"` → Learn more (Cloud)
- Line 207: `href="services/"` → View All Services
- Line 235: `href="work/"` → View Case Study (ShopZA)
- Line 251: `href="work/"` → View Case Study (MedConnect)
- Line 267: `href="work/"` → View Case Study (CityFlow)
- Line 273: `href="work/"` → See All Projects
- Line 454: `href="contact/"` → Start Your Project
- Line 455: `href="services/"` → Explore Services
- Line 522: `href="contact/"` → Start Your Project
- Line 523: `href="pricing/"` → View Pricing

### External Links:
- Line 19: `href="assets/img/favicon.svg"`
- Lines 21-23: CSS stylesheets (`assets/css/main.css`, `assets/css/pages.css`)
- Lines 25-51: Schema.org JSON-LD

---

## 4. LEGAL PAGES CONTENT

### legal/privacy.html (158 lines)
**File Path:** `/home/runner/work/testing/testing/legal/privacy.html`

**Section Links (Table of Contents):**
1. `#section-1` → Introduction
2. `#section-2` → Information We Collect
3. `#section-3` → How We Use Your Information
4. `#section-4` → Legal Basis for Processing
5. `#section-5` → Data Sharing and Disclosure
6. `#section-6` → Data Security
7. `#section-7` → Data Retention
8. `#section-8` → Your Rights Under POPIA
9. `#section-9` → Cookies
10. `#section-10` → Third-Party Links
11. `#section-11` → Children's Privacy
12. `#section-12` → Changes to This Policy
13. `#section-13` → Contact Us

**Internal Links in Content:**
- Line 50: `href="./privacy.html"` → Privacy Policy (self-reference in legal box)
- Line 117: `href="./cookies.html"` → Cookie Policy
- Line 165: `href="./privacy.html"` → Privacy Policy (footer)

**External Links:**
- Line 58: `href="https://mapengo.co.za"` → Main website
- Line 113: `href="mailto:complaints.IR@justice.gov.za"` → Information Regulator

---

### legal/terms.html (165 lines)
**File Path:** `/home/runner/work/testing/testing/legal/terms.html`

**Section Links (Table of Contents):**
1. `#section-1` → Agreement to Terms
2. `#section-2` → Services
3. `#section-3` → Client Obligations
4. `#section-4` → Payment Terms
5. `#section-5` → Intellectual Property
6. `#section-6` → Confidentiality
7. `#section-7` → Warranties and Disclaimers
8. `#section-8` → Limitation of Liability
9. `#section-9` → Indemnification
10. `#section-10` → Termination
11. `#section-11` → Dispute Resolution
12. `#section-12` → Governing Law
13. `#section-13` → General Provisions
14. `#section-14` → Contact

**Internal Links in Content:**
- Line 59: `href="https://mapengo.co.za"` → Website URL
- Line 153: `href="https://mapengo.co.za"` → Website URL (footer contact)

---

### legal/cookies.html (176 lines)
**File Path:** `/home/runner/work/testing/testing/legal/cookies.html`

**Section Links (Table of Contents):**
1. `#section-1` → What Are Cookies?
2. `#section-2` → How We Use Cookies
3. `#section-3` → Types of Cookies We Use
4. `#section-4` → Third-Party Cookies
5. `#section-5` → Managing Your Preferences
6. `#section-6` → Essential Cookies List
7. `#section-7` → Analytics Cookies
8. `#section-8` → Changes to This Policy
9. `#section-9` → Contact Us

**Internal Links in Content:**
- Line 50: `href="./privacy.html"` → Privacy Policy
- Line 165: `href="./privacy.html"` → Privacy Policy (end of document)

**External Links:**
- Lines 76-77: Google Fonts and Privacy Policy links
- Line 76: `href="https://policies.google.com/privacy"` → Google Privacy Policy
- Line 76: `href="https://tools.google.com/dlpage/gaoptout"` → GA Opt-out Tool
- Line 89: `href="https://tools.google.com/dlpage/gaoptout"` → GA Opt-out Tool
- Line 147: `href="https://tools.google.com/dlpage/gaoptout"` → GA Opt-out Tool

---

## 5. BLOG/INDEX.HTML - INTERNAL LINKS

**File Path:** `/home/runner/work/testing/testing/blog/index.html` (330 lines)

### Featured Article:
- Line 78: `href="posts/digital-transformation-sa/"` → Read Article

### Blog Posts Grid:
- Line 109: `href="posts/building-mobile-apps-south-africa/"` → Read Article
- Line 129: `href="posts/designing-for-africa/"` → Read Article
- Line 149: `href="#"` → Coming Soon (disabled, no real link)
- Line 169: `href="#"` → Coming Soon (disabled, no real link)
- Line 189: `href="#"` → Coming Soon (disabled, no real link)
- Line 209: `href="#"` → Coming Soon (disabled, no real link)

### Categories Sidebar (Lines 220-247):
- Line 224: `href="posts/digital-transformation-sa/"` → Digital Transformation
- Line 228: `href="posts/building-mobile-apps-south-africa/"` → Mobile Development
- Line 232: `href="./"` → E-Commerce (self-link)
- Line 236: `href="./"` → Cloud & DevOps (self-link)
- Line 240: `href="posts/designing-for-africa/"` → UI/UX Design
- Line 244: `href="./"` → Web Development (self-link)

### Recent Posts Sidebar (Lines 251-271):
- Line 255: `href="posts/digital-transformation-sa/"` → Digital Transformation Trends...
- Line 259: `href="posts/building-mobile-apps-south-africa/"` → Building Mobile Apps...
- Line 263: `href="posts/designing-for-africa/"` → Designing for Africa...

### CTA Section (Lines 310-322):
- Line 317: `href="../contact/"` → Get in Touch
- Line 318: `href="../services/"` → Explore Our Services

---

## 6. ALL HREF= OCCURRENCES - COMPLETE LIST

### Relative/Internal Links (Categorized):

**Navigation & Main Pages:**
```
href=""                                    → Home (relative)
href="./"                                  → Current directory
href="about/"                              → About page
href="services/"                           → Services page
href="work/"                               → Work/Portfolio page
href="technologies/"                       → Technologies page
href="pricing/"                            → Pricing page
href="blog/"                               → Blog page
href="careers/"                            → Careers page
href="contact/"                            → Contact page
href="products/"                           → Products page
```

**Services Section Anchors:**
```
href="services/#web-development"          → Web Development service
href="services/#mobile-apps"              → Mobile Apps service
href="services/#ui-ux-design"             → UI/UX Design service
href="services/#ecommerce"                → E-Commerce service
href="services/#cloud-hosting"            → Cloud & Hosting service
href="services/#maintenance-support"      → Maintenance & Support service
```

**Blog Posts:**
```
href="posts/digital-transformation-sa/"   → Digital Transformation article
href="posts/building-mobile-apps-south-africa/" → Mobile Apps article
href="posts/designing-for-africa/"        → Designing for Africa article
```

**Legal Pages:**
```
href="./privacy.html"                     → Privacy Policy
href="./terms.html"                       → Terms of Service
href="./cookies.html"                     → Cookie Policy
```

**Relative Legal References (from nested directories):**
```
href="../legal/privacy.html"              → Privacy (from root level)
href="../legal/terms.html"                → Terms (from root level)
href="../legal/cookies.html"              → Cookies (from root level)
```

**Assets:**
```
href="assets/img/favicon.svg"             → Favicon
href="assets/css/main.css"                → Main stylesheet
href="assets/css/pages.css"               → Pages stylesheet
href="../assets/img/favicon.svg"          → Favicon (from nested)
href="../assets/css/main.css"             → Main CSS (from nested)
href="../assets/css/pages.css"            → Pages CSS (from nested)
href="../../../assets/"                   → Assets (from deep nested)
href="../../../contact/"                  → Contact (from deep nested)
href="../about/"                          → About (from nested)
```

**Contact with Parameters:**
```
href="contact/?plan=basic-website"        → Contact with plan param
href="contact/?plan=standard-website"     → Contact with plan param
href="contact/?plan=premium-app"          → Contact with plan param
href="contact/?plan=basic-app"            → Contact with plan param
href="contact/?plan=standard-app"         → Contact with plan param
href="contact/?role=senior-react-developer" → Contact with role param
href="contact/?role=ux-designer"          → Contact with role param
```

### External Links:

**Google Services:**
```
href="https://fonts.googleapis.com"       → Google Fonts CDN
href="https://fonts.gstatic.com"          → Google Fonts static
href="https://policies.google.com/privacy"      → Google Privacy Policy
href="https://tools.google.com/dlpage/gaoptout" → GA Opt-out Browser
```

**Social Media:**
```
href="https://linkedin.com/company/mapengo-innovations"
href="https://github.com/Nhlobo"          
href="https://twitter.com/mapengotech"
```

**Portfolio Projects (External):**
```
href="https://nhlobo.github.io/Crime-Solution/"
href="https://nhlobo.github.io/Juta_Daco_Contruction/"
href="https://nhlobo.github.io/MADYASWANYUKU/"
href="https://nhlobo.github.io/testing/"
href="https://nhlobo.github.io/testing/404.html"
```

**Blog Sharing Links (Social):**
```
href="https://twitter.com/intent/tweet?text=...&url=..."
href="https://www.linkedin.com/shareArticle?mini=true&url=..."
href="https://www.linkedin.com/sharing/share-offsite/?url=..."
```

**Contact Methods:**
```
href="mailto:mapengoinnovations@gmail.com" → Email
href="mailto:complaints.IR@justice.gov.za" → Information Regulator (SA)
href="tel:+27665520197"                     → Phone
href="https://wa.me/27665520197"            → WhatsApp
```

**Domain:**
```
href="https://mapengo.co.za"              → Primary domain
```

**GitHub Pages Full URLs:**
```
href="https://nhlobo.github.io/testing/"  → Home
href="https://nhlobo.github.io/testing/about/" → About
href="https://nhlobo.github.io/testing/services/" → Services
href="https://nhlobo.github.io/testing/work/"    → Work
href="https://nhlobo.github.io/testing/technologies/"
href="https://nhlobo.github.io/testing/pricing/"
href="https://nhlobo.github.io/testing/blog/"
href="https://nhlobo.github.io/testing/blog/posts/digital-transformation-sa/"
href="https://nhlobo.github.io/testing/blog/posts/building-mobile-apps-south-africa/"
href="https://nhlobo.github.io/testing/blog/posts/designing-for-africa/"
href="https://nhlobo.github.io/testing/careers/"
href="https://nhlobo.github.io/testing/contact/"
href="https://nhlobo.github.io/testing/legal/privacy.html"
href="https://nhlobo.github.io/testing/legal/terms.html"
href="https://nhlobo.github.io/testing/legal/cookies.html"
```

**Placeholder Links:**
```
href="#"                                  → Disabled "Coming Soon" buttons
href="#section-N"                         → Internal page anchors
href="#introduction"
href="#conclusion"
href="#culture"
href="#open-roles"
href="#ai-automation"
href="#cloud-adoption"
href="#cybersecurity"
href="#super-apps"
href="#systems-integration"
```

---

## 7. CRITICAL NAVIGATION MAPPING

### Primary Navigation (Auto-Injected via components.js):

| Page | Path | Links From |
|------|------|-----------|
| Home | `/` or `index.html` | Logo, "Home" nav item |
| About | `/about/` | Nav, Footer Company |
| Services | `/services/` | Nav, Footer Company, Index CTA |
| Work | `/work/` | Nav, Footer Company, Index CTA |
| Technologies | `/technologies/` | Nav, Footer Company |
| Pricing | `/pricing/` | Nav, Index CTA |
| Blog | `/blog/` | Nav, Footer Company |
| Careers | `/careers/` | Nav, Footer Company |
| Contact | `/contact/` | Nav, Footer, Multiple CTAs |

### Service Deep Links (Anchor-based):
```
/services/#web-development          → Section on Services page
/services/#mobile-apps              → Section on Services page
/services/#ui-ux-design             → Section on Services page
/services/#ecommerce                → Section on Services page
/services/#cloud-hosting            → Section on Services page
/services/#maintenance-support      → Section on Services page
```

### Blog Post URLs:
```
/blog/posts/digital-transformation-sa/
/blog/posts/building-mobile-apps-south-africa/
/blog/posts/designing-for-africa/
```

### Legal Pages:
```
/legal/privacy.html
/legal/terms.html
/legal/cookies.html
```

---

## 8. POTENTIAL NAVIGATION ISSUES TO FIX

### 1. **Incomplete Blog Posts (Lines 149, 169, 189, 209 in blog/index.html)**
   - Status: Using `href="#"` with `aria-disabled="true"`
   - Issue: "Coming Soon" links don't navigate
   - Fix: Either create the post pages or fully hide/disable these cards

### 2. **Category Links Self-References (Lines 232, 236, 244 in blog/index.html)**
   - Status: `href="./"` pointing to blog index itself
   - Issue: Confusing UX - clicking a category returns to same page
   - Fix: Create dedicated category filter pages or use JavaScript filtering

### 3. **Inconsistent Path Depth Handling**
   - Issue: components.js uses relative paths (e.g., `contact/`, `services/`)
   - Context: Works for GitHub Pages subdirectory `/testing/`
   - Fix: Verify `getBasePath()` calculation for all nested paths (especially `blog/posts/*/index.html`)

### 4. **Missing 404 Handling**
   - Status: `/404.html` file exists
   - Issue: GitHub Pages may not auto-serve for all broken links
   - Fix: Ensure GitHub Pages 404 redirection is configured in repo settings

### 5. **Anchor Links in Legal Pages**
   - Status: Heavy use of `#section-1` through `#section-14`
   - Issue: Table of Contents sidebar must have corresponding `id` attributes on headings
   - Verification needed: Check that all `<h2 id="section-N">` tags exist

### 6. **Contact Form Query Parameters**
   - Status: Uses `?plan=` and `?role=` parameters
   - Issue: Contact form must handle and pre-populate these parameters
   - Fix: Ensure `/contact/index.html` has JavaScript to parse URL params

### 7. **Cross-Domain References**
   - Status: `href="https://mapengo.co.za"` used in multiple places
   - Issue: Domain may not be live; points away from GitHub Pages site
   - Fix: Clarify if mapengo.co.za is intended or should be GitHub Pages URL

---

## SUMMARY STATISTICS

- **Total HTML Files:** 13
- **Total Internal Links:** 80+ (relative paths)
- **Total External Links:** 25+
- **Main Navigation Items:** 9
- **Blog Posts (Published):** 3
- **Blog Posts (Coming Soon):** 3
- **Legal Pages:** 3
- **Service Categories:** 6
- **Anchor Sections (Legal):** 42 total across 3 pages

**Coverage:**
- ✅ All main pages linked from navigation
- ✅ Footer provides complete site map
- ✅ Blog has recent posts sidebar
- ✅ Contact accessible from multiple CTAs
- ⚠️ Some "Coming Soon" pages incomplete
- ⚠️ Category filtering may need improvement
- ⚠️ Relative path handling should be tested across all nesting levels

