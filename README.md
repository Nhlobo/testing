# Mapengo Innovations

Premium South African digital agency — Next.js 14 web application.

**Live site:** https://nhlobo.github.io/testing

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| UI Primitives | Radix UI |
| Deployment | GitHub Pages (static export) |

---

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:3000

# Build for production
npm run build

# Preview the production build
npx serve out
```

---

## Architecture

```
src/
  app/               # Next.js App Router pages
    layout.tsx       # Root layout (fonts, metadata, Header, Footer)
    page.tsx         # Home page
    about/
    services/
    work/
    blog/
      page.tsx       # Blog index
      [slug]/        # Dynamic blog post pages
    contact/
    members/         # Password-gated members area
    pricing/
    sitemap.ts       # Auto-generated sitemap
    robots.ts        # Auto-generated robots.txt
  components/
    layout/          # Header, Footer
    sections/        # Page sections (Hero, Services, etc.)
    ui/              # Reusable UI components
  lib/
    data.ts          # All static content
    utils.ts         # Utility functions (cn, formatDate)
  types/
    index.ts         # TypeScript interfaces
```

---

## Deployment

### GitHub Pages (current)

Deployed automatically via GitHub Actions on push to `main`. The workflow:
1. Runs `npm run build` → generates `out/` directory
2. Uploads `out/` as a Pages artifact
3. Deploys to GitHub Pages

> **Config:** `next.config.mjs` sets `output: "export"`, `basePath: "/testing"`, `trailingSlash: true`.

### Vercel (recommended for production)

1. Import the repo at [vercel.com/new](https://vercel.com/new)
2. Remove the `basePath` and `output: "export"` settings in `next.config.mjs`
3. Deploy — Vercel handles everything automatically

---

## Customising Content

All site content is in **`src/lib/data.ts`**:

- `siteConfig` — name, contact info, social links
- `services` — service cards
- `caseStudies` — portfolio items
- `testimonials` — client testimonials
- `blogPosts` — blog articles
- `pricingTiers` — pricing table
- `teamMembers` — about page team

---

## Members Area

The `/members` page is password-gated:

- **Demo password:** `members2024`
- Password is checked client-side and the session token is stored in `localStorage`
- To change the password, update `MEMBERS_PASSWORD` in `src/app/members/page.tsx`
- For production, replace with proper authentication (NextAuth, Clerk, Supabase Auth, etc.)

---

## Environment Variables

No environment variables are required for the current setup. For production extensions:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_FORMSPREE_ID` | Formspree form ID for contact form |
| `NEXT_PUBLIC_GA_ID` | Google Analytics measurement ID |

---

## Contact Form

The contact form POSTs to [Formspree](https://formspree.io). To activate:

1. Create a free account at formspree.io
2. Create a new form and get your form ID
3. Replace `YOUR_FORM_ID` in `src/components/sections/ContactForm.tsx`

---

## Contact

**Mapengo Innovations**  
📧 info@MapengoInnovations.co.za  
📱 +27665520197  
💬 [WhatsApp](https://wa.me/27665520197)  
📍 Johannesburg, Gauteng, South Africa
