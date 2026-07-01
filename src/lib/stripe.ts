/**
 * Stripe wiring (architecture-ready).
 *
 * This module is intentionally dependency-free so the project builds before you
 * install Stripe. To go live:
 *   1) npm i stripe @stripe/stripe-js
 *   2) Add keys + Price IDs to .env.local (see .env.example)
 *   3) Uncomment the client below and the checkout/webhook route bodies.
 */

/** Maps internal plan ids → the env var holding the Stripe Price ID. */
export const planToPriceEnv: Record<string, string> = {
  "library-starter": "NEXT_PUBLIC_STRIPE_PRICE_LIBRARY_STARTER",
  "library-pro": "NEXT_PUBLIC_STRIPE_PRICE_LIBRARY_PRO",
  "custom-binder": "NEXT_PUBLIC_STRIPE_PRICE_CUSTOM_BINDER",
  "contractor-pro": "NEXT_PUBLIC_STRIPE_PRICE_CONTRACTOR_PRO",
  "premium-system": "NEXT_PUBLIC_STRIPE_PRICE_PREMIUM_SYSTEM",
};

/** Plans that should create a subscription vs. a one-time payment. */
export const subscriptionPlanIds = new Set(["library-starter", "library-pro"]);

/** Resolve the configured Stripe Price ID for a plan, if present. */
export function getPriceId(planId: string): string | undefined {
  const envKey = planToPriceEnv[planId];
  return envKey ? process.env[envKey] : undefined;
}

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

/*
// ---------------------------------------------------------------------------
// Server-side Stripe client (uncomment after `npm i stripe`):
//
// import Stripe from "stripe";
//
// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2024-06-20",
//   typescript: true,
// });
//
// // Create a Checkout Session for a plan:
// export async function createCheckoutSession(planId: string, customerEmail?: string) {
//   const price = getPriceId(planId);
//   if (!price) throw new Error(`No Stripe price configured for plan: ${planId}`);
//   const mode = subscriptionPlanIds.has(planId) ? "subscription" : "payment";
//   return stripe.checkout.sessions.create({
//     mode,
//     line_items: [{ price, quantity: 1 }],
//     customer_email: customerEmail,
//     success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?checkout=success`,
//     cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?checkout=cancelled`,
//     allow_promotion_codes: true,
//   });
// }
// ---------------------------------------------------------------------------
*/
