# SafeSite Documents

**Safety paperwork for contractors — organized, editable, and ready when you need it.**

A premium, production-quality marketing + product website for a contractor safety‑documentation
business with two offers:

1. **Monthly Safety Document Library** — a subscription to editable safety templates, toolbox talks,
   checklists, forms, and logs.
2. **Custom Safety Binder (Done‑for‑You)** — a one‑time service that builds a company‑branded safety
   binder from an intake form.

Built with **Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion**.

---

## ✨ Highlights

- **Cinematic hero** — a code‑based "drone POV" construction scan (pure SVG + Framer Motion) that
  surfaces OSHA‑style hazard callouts, then resolves into a clean dashboard with the three primary
  actions. Fully **reduced‑motion aware** with a skip/replay control. No video file required (see
  [`docs/hero-video-prompt.md`](docs/hero-video-prompt.md) to swap in a generated drone video).
- **17 pages** — marketing, product, account (login + customer/admin/library dashboards), and legal.
- **Full document library on the site** — all **352 templates** from `/safety-doc-library` are wired
  into `/library` (search + filter by category, industry, type, access). Every template has its own
  statically generated page (`/library/[id]`) that renders the master file and is **printable** —
  a one‑click **Print / Save as PDF** with print‑optimized CSS that drops the site chrome and prints
  just the document. Editable Word/PDF downloads are the gated upsell.
- **Full custom‑binder intake form** — 30+ fields incl. a 15‑question hazard questionnaire, file
  upload, package selection, and the required terms acknowledgement.
- **Integration‑ready** — Stripe, NextAuth, Prisma/Postgres, and transactional email are scaffolded
  with clearly commented wiring points. The app builds and runs **before** you add any keys.
- **SEO + a11y + performance** — per‑page metadata, Open Graph, JSON‑LD (Organization, Website,
  FAQPage), `sitemap.xml`, `robots.txt`, semantic landmarks, focus states, skip link, and
  `prefers-reduced-motion` support.

---

## 🚀 Quick start

```bash
# 1. Install dependencies
npm install

# 2. Create your local env file
cp .env.example .env.local      # then fill in values as you wire up integrations

# 3. Run the dev server
npm run dev                     # http://localhost:3000
```

> The site runs fully with **no environment variables** — all content is local sample data, and the
> Stripe/auth/DB layers are stubbed. Add keys only when you're ready to make those features live.

### Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run prisma:generate` | Generate the Prisma client (after installing Prisma) |
| `npm run prisma:migrate` | Run a dev migration |

---

## 🗂 Project structure

```
src/
├─ app/
│  ├─ layout.tsx              # Fonts, header/footer, global JSON-LD
│  ├─ page.tsx                # Home (cinematic hero + all sections)
│  ├─ pricing/ library/ custom-binder/ categories/ samples/
│  ├─ intake/ + intake/confirmation/
│  ├─ faq/ about/ contact/ login/
│  ├─ dashboard/ + dashboard/library/   # customer area (mock data)
│  ├─ admin/                  # admin area (mock data)
│  ├─ terms/ disclaimer/ privacy/       # legal (placeholder language)
│  ├─ api/                    # intake · contact · checkout · stripe/webhook
│  ├─ sitemap.ts · robots.ts · not-found.tsx · icon.svg
│
├─ components/
│  ├─ hero/                   # CinematicHero, DroneScene, HazardCallout, DashboardPreview
│  ├─ sections/               # Offers, Categories, Process, Pricing, Industries, Benefits, Trust, CTA
│  ├─ cards/                  # CategoryCard, IndustryCard, PricingCard, DocumentCard
│  ├─ forms/                  # IntakeForm, ContactForm, fields, TermsCheckbox
│  ├─ dashboard/              # DashboardShell
│  ├─ auth/ legal/ layout/ ui/ seo/
│
├─ data/                      # site, pricing, categories, documents, industries, content, faq, violations, intake
└─ lib/                       # utils, seo, stripe, auth, db   (integration helpers)

prisma/schema.prisma          # Suggested Postgres schema
docs/hero-video-prompt.md     # Drone hero video prompt + asset workflow
```

**Content lives in `src/data/`.** Editing copy, pricing, categories, or documents there flows through
the whole site — no component hunting required.

---

## 🎨 Design system

| Token | Value |
| --- | --- |
| Navy (brand) | `#0B1A30` + a full `navy` scale |
| Safety yellow | `#FFC400` + a full `safety` scale |
| Steel gray / white / near‑black | strong contrast neutrals |
| Display font | Archivo (700–900) |
| Body font | Inter |

Reusable primitives: `Button` (polymorphic link/button), `Badge`, `Section` + `SectionHeader`,
`Reveal`/`RevealGroup` (scroll animations), `Accordion`, `DisclaimerBlock`, and form fields. Buttons,
cards, and the hazard‑tape accent are defined as Tailwind component classes in `globals.css`.

---

## 🔌 Wiring up integrations

Everything below is **scaffolded and commented** — search the file for `TODO` / the commented block.

### Stripe (subscriptions + one‑time packages)
1. `npm i stripe @stripe/stripe-js`
2. Create Products/Prices in Stripe; paste the Price IDs into `.env.local`
   (`NEXT_PUBLIC_STRIPE_PRICE_*`).
3. Uncomment the client in [`src/lib/stripe.ts`](src/lib/stripe.ts) and the bodies of
   [`api/checkout`](src/app/api/checkout/route.ts) and
   [`api/stripe/webhook`](src/app/api/stripe/webhook/route.ts).
4. Test webhooks: `stripe listen --forward-to localhost:3000/api/stripe/webhook`.

Plan → Price mapping lives in `src/lib/stripe.ts`; subscription vs. one‑time is already distinguished.

### Auth (NextAuth / Auth.js)
1. `npm i next-auth @auth/prisma-adapter`
2. Set `NEXTAUTH_SECRET` (+ optional Google OAuth creds).
3. Create `src/app/api/auth/[...nextauth]/route.ts` and `middleware.ts` from the templates in
   [`src/lib/auth.ts`](src/lib/auth.ts). The login UI already calls the right places.

### Database (Prisma + Postgres / Supabase / Neon)
1. `npm i @prisma/client && npm i -D prisma`
2. Set `DATABASE_URL` (and `DIRECT_URL` for serverless pooling).
3. `npx prisma generate && npx prisma migrate dev --name init`
4. Uncomment the singleton in [`src/lib/db.ts`](src/lib/db.ts) and swap the mock data in pages for
   queries. Schema: [`prisma/schema.prisma`](prisma/schema.prisma) — `User`, `Account`, `Session`,
   `Category`, `Document`, `Favorite`, `Subscription`, `Order`, `BinderRequest`, `Announcement`.

### Transactional email (Resend / SendGrid)
1. `npm i resend` (or `@sendgrid/mail`)
2. Set `RESEND_API_KEY`, `EMAIL_FROM`, `SALES_INBOX`.
3. Send from `api/intake` (intake received + internal notice), `api/checkout` success
   (order confirmation), and document delivery. Hooks are marked in those route files.

### Document storage + entitlement
Store files privately (Supabase Storage / S3) and serve via short‑lived **signed URLs** gated by the
user's plan. `DocumentCard` already renders Word/PDF/XLSX download actions and a locked state; point
those `href`s at a `/api/documents/[id]/download?format=docx` route that checks entitlement.

---

## 🌐 Deployment (Vercel)

1. Push the repo to GitHub/GitLab.
2. Import the project in Vercel (Framework preset: **Next.js**).
3. Add the environment variables from `.env.example` in **Project → Settings → Environment Variables**.
4. Set `NEXT_PUBLIC_SITE_URL` to your production domain (drives canonical URLs, sitemap, OG).
5. Deploy. Add the Stripe webhook endpoint (`https://yourdomain.com/api/stripe/webhook`) in the
   Stripe dashboard and store its signing secret as `STRIPE_WEBHOOK_SECRET`.

Works on any Node host that supports Next.js 14 (`npm run build && npm run start`).

---

## ⚖️ Legal & disclaimers

This project intentionally avoids claims like "OSHA approved," "guaranteed compliant," or "certified."
The site‑wide disclaimer, the pre‑purchase/intake acknowledgement, and the hero penalty fine‑print
are centralized in `src/data/site.ts`. **The Terms, Disclaimer, and Privacy pages contain strong
placeholder language and must be reviewed and finalized by a qualified attorney before launch.**

---

## 🛣 Future improvements

See [`docs/future-improvements.md`](docs/future-improvements.md) for the full roadmap (CMS, real
download pipeline, document versioning, search upgrades, analytics, A/B testing, and more).
