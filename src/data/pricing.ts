/**
 * Pricing source of truth. The `stripePriceEnv` field names the env var
 * that should hold the matching Stripe Price ID (see .env.example).
 * Admin "Update pricing copy" edits would write back to this shape.
 */
export type PlanType = "subscription" | "one-time";

export type Plan = {
  id: string;
  name: string;
  type: PlanType;
  price: number;
  cadence: string;
  blurb: string;
  features: string[];
  cta: { label: string; href: string };
  badge?: string;
  highlight?: boolean;
  stripePriceEnv: string;
};

export const subscriptionPlans: Plan[] = [
  {
    id: "library-starter",
    name: "Safety Library Starter",
    type: "subscription",
    price: 20,
    cadence: "/month",
    blurb: "Core templates to get your safety paperwork organized fast.",
    features: [
      "Access to core safety templates",
      "Toolbox talks",
      "PPE forms",
      "Inspection forms",
      "Training logs",
      "Monthly updates",
    ],
    cta: { label: "Get Starter", href: "/login?plan=library-starter" },
    stripePriceEnv: "NEXT_PUBLIC_STRIPE_PRICE_LIBRARY_STARTER",
  },
  {
    id: "library-pro",
    name: "Safety Library Pro",
    type: "subscription",
    price: 50,
    cadence: "/month",
    blurb: "The full library with industry-specific forms and priority updates.",
    features: [
      "Everything in Starter",
      "Full manual templates",
      "More toolbox talks",
      "More industry-specific forms",
      "Priority document updates",
    ],
    cta: { label: "Get Pro", href: "/login?plan=library-pro" },
    badge: "Best Value",
    highlight: true,
    stripePriceEnv: "NEXT_PUBLIC_STRIPE_PRICE_LIBRARY_PRO",
  },
];

export const oneTimePlans: Plan[] = [
  {
    id: "custom-binder",
    name: "Custom Safety Binder",
    type: "one-time",
    price: 350,
    cadence: "one-time",
    blurb: "A done-for-you binder built around your company and work type.",
    features: [
      "Custom company safety manual",
      "OSHA-style inspection binder",
      "Core forms and logs",
      "10 toolbox talks",
      "Delivered in Word / PDF",
      "Best for small contractors",
    ],
    cta: { label: "Start Intake Form", href: "/intake?package=custom-binder" },
    stripePriceEnv: "NEXT_PUBLIC_STRIPE_PRICE_CUSTOM_BINDER",
  },
  {
    id: "contractor-pro",
    name: "Contractor Safety Pro Package",
    type: "one-time",
    price: 750,
    cadence: "one-time",
    blurb: "A complete program for growing crews with full hazard coverage.",
    features: [
      "Full custom safety binder",
      "25 toolbox talks",
      "JHA / JSA package",
      "PPE, LOTO, HazCom, ladder, incident & training forms",
      "New-hire safety orientation packet",
      "Optional library add-on",
    ],
    cta: { label: "Start Intake Form", href: "/intake?package=contractor-pro" },
    badge: "Most Popular",
    highlight: true,
    stripePriceEnv: "NEXT_PUBLIC_STRIPE_PRICE_CONTRACTOR_PRO",
  },
  {
    id: "premium-system",
    name: "Premium Safety System",
    type: "one-time",
    price: 1250,
    cadence: "one-time",
    blurb: "Our most complete system — the full program plus ongoing document updates.",
    features: [
      "Everything in Pro",
      "52 toolbox talks",
      "Safety training matrix",
      "Safety calendar",
      "Company-specific forms",
      "3 months of document updates",
    ],
    cta: { label: "Start Intake Form", href: "/intake?package=premium-system" },
    stripePriceEnv: "NEXT_PUBLIC_STRIPE_PRICE_PREMIUM_SYSTEM",
  },
];

export const allPlans = [...subscriptionPlans, ...oneTimePlans];
