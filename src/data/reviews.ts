/**
 * Customer reviews / testimonials.
 *
 * ⚠️ PLACEHOLDER SAMPLE REVIEWS — REPLACE BEFORE LAUNCH.
 * These are realistic samples to populate the UI. Do NOT publish fabricated
 * reviews as if they were real, and do NOT emit Review/AggregateRating
 * structured data until every review here is a genuine, verifiable customer
 * review (publishing fake review schema violates Google's policies). Swap these
 * for real reviews (e.g., from your intake follow-up, Google, or a review tool),
 * set `placeholder: false`, and then the JSON-LD in <Reviews/> can be enabled.
 */

export type Review = {
  id: string;
  name: string;
  trade: string;
  location: string;
  rating: number; // 1–5
  quote: string;
  date: string; // ISO
  placeholder: boolean;
};

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Marcus D.",
    trade: "Electrical Contractor",
    location: "TX",
    rating: 5,
    quote:
      "A GC told us we needed to be in ISNetworld before our next job. SafeSite had our binder organized in days — programs, forms, the works. Saved me a week of nights.",
    date: "2026-05-12",
    placeholder: true,
  },
  {
    id: "r2",
    name: "Renee K.",
    trade: "Roofing",
    location: "FL",
    rating: 5,
    quote:
      "The toolbox talks alone are worth it. I pull one up on my phone, read it to the crew, and everyone signs in. We finally have clean training records.",
    date: "2026-04-28",
    placeholder: true,
  },
  {
    id: "r3",
    name: "Tony V.",
    trade: "General Contractor",
    location: "OH",
    rating: 5,
    quote:
      "We look way more buttoned-up to clients now. When someone asks for our safety docs, I send a clean PDF binder instead of scrambling.",
    date: "2026-04-15",
    placeholder: true,
  },
  {
    id: "r4",
    name: "Sandra P.",
    trade: "HVAC",
    location: "AZ",
    rating: 5,
    quote:
      "Editable Word files were the selling point. We dropped in our company name and logo and it actually fit how we work. Not generic junk.",
    date: "2026-03-30",
    placeholder: true,
  },
  {
    id: "r5",
    name: "Big Creek Concrete",
    trade: "Concrete",
    location: "GA",
    rating: 4,
    quote:
      "The custom binder covered silica, heat, and the forms we never had. Wish we'd done it two years ago. Took a little back-and-forth to tailor it.",
    date: "2026-03-18",
    placeholder: true,
  },
  {
    id: "r6",
    name: "Luis M.",
    trade: "Plumbing",
    location: "CA",
    rating: 5,
    quote:
      "Onboarding new guys used to be a mess. The new-hire orientation packet made it a 20-minute, documented process.",
    date: "2026-02-22",
    placeholder: true,
  },
  {
    id: "r7",
    name: "Hannah R.",
    trade: "Landscaping",
    location: "NC",
    rating: 5,
    quote:
      "Heat illness plan, equipment checklists, and weekly talks — exactly what our crews needed for summer. Easy to print and hand out.",
    date: "2026-02-09",
    placeholder: true,
  },
  {
    id: "r8",
    name: "Dave's Remodeling",
    trade: "Remodeling",
    location: "CO",
    rating: 5,
    quote:
      "Plain language, no fluff. My foreman actually reads these. The JHAs made our pre-task planning consistent across jobs.",
    date: "2026-01-26",
    placeholder: true,
  },
];

export const reviewStats = {
  count: reviews.length,
  average:
    Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10,
  /** True only when every review is real & verifiable — gates review JSON-LD. */
  allReal: reviews.every((r) => !r.placeholder),
};
