# Future Improvements & Roadmap

A prioritized backlog for taking SafeSite Documents from this polished foundation to a fully live
product. Nothing here is required to demo or deploy the marketing site — these are the next steps to
make the product layer real.

## Phase 1 — Make the core live (highest priority)
- **Payments**: enable Stripe Checkout for subscriptions + one‑time packages; wire the webhook to
  create `Order`/`Subscription` rows and grant access (`src/lib/stripe.ts`, `api/checkout`,
  `api/stripe/webhook`).
- **Auth**: enable NextAuth (credentials + Google), `middleware.ts` route protection, and role‑based
  access for `/admin` (`src/lib/auth.ts`).
- **Database**: provision Postgres (Supabase/Neon), run the Prisma schema, and replace mock data in
  the dashboards/library/admin with real queries.
- **Document delivery**: private storage (Supabase Storage / S3) + a signed‑URL download route gated
  by the user's plan/entitlement. Track downloads.
- **Transactional email**: order confirmation, intake‑received, and document‑delivery emails
  (Resend/SendGrid).

## Phase 2 — Content operations
- **Headless CMS** for documents, categories, pricing copy, and announcements (Sanity, Contentful, or
  a custom admin) so non‑developers can publish updates. Admin UI is already mocked.
- **Real document uploader** in `/admin` (file → storage, metadata → DB, tagging, Starter/Pro access).
- **Document versioning + "last updated" history**, change logs, and a monthly "what's new" feed
  surfaced in the customer dashboard.
- **Bundle / ZIP downloads** ("download this whole category").

## Phase 3 — Library UX
- **Server‑side search** with typo tolerance + facets (e.g., Algolia/Typesense or Postgres FTS).
- **Favorites/saved** persisted per user; "recently downloaded"; collections.
- **Per‑document detail pages** with preview thumbnails and SEO‑friendly URLs (`/library/[slug]`).
- **Document preview** (first page render) before download.

## Phase 4 — Custom binder pipeline
- **Intake → build workflow** in admin: status transitions, internal notes, deliverable uploads, and
  customer notifications at each stage.
- **Generated binder assembly**: map intake answers → a document set → a branded, merged PDF/Word
  binder (server‑side doc generation).
- **Customer‑facing request tracker** with file delivery (the status stepper UI already exists).

## Phase 5 — Growth, trust & polish
- **Analytics**: privacy‑friendly analytics (Plausible) + conversion events; Stripe revenue dashboard.
- **A/B testing** on hero copy, pricing, and CTAs.
- **Testimonials / case studies / logos** once available (kept honest — no fabricated claims).
- **Blog / resource center** targeting the SEO keywords already in metadata (toolbox talks,
  JHA templates, etc.) for organic acquisition.
- **Referral / affiliate** program for trade associations.

## Phase 6 — Hardening
- **Tests**: unit (utils, data selectors), component (forms, pricing), and E2E (Playwright) for the
  purchase + intake flows.
- **Rate limiting + spam protection** on `api/intake` and `api/contact` (honeypot + Turnstile/reCAPTCHA).
- **Observability**: error tracking (Sentry), structured logs, uptime checks.
- **CSP hardening** in `next.config.mjs` once third‑party origins are finalized (Stripe, fonts, analytics).
- **Accessibility audit** (axe) + Lighthouse CI budget in the pipeline.
- **i18n** if expanding beyond English.

## Nice‑to‑haves
- Swap the SVG hero for a generated drone video (see `docs/hero-video-prompt.md`).
- Team/sub‑user seats for larger contractors.
- Native mobile "toolbox talk" companion (run a talk + collect signatures on a phone).
- E‑signature capture on acknowledgement forms.
