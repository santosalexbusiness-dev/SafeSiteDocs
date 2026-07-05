import Stripe from "stripe";

/**
 * Stripe integration.
 * Guarded: the client only initializes when STRIPE_SECRET_KEY is set, so the
 * app builds and runs before Stripe is connected.
 *
 * Secrets live ONLY in .env.local (git-ignored) — never commit them.
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

/** One-time plans redirect the buyer to the intake form after payment. */
export const oneTimeToIntake: Record<string, string> = {
  "custom-binder": "custom-binder",
  "contractor-pro": "contractor-pro",
  "premium-system": "premium-system",
};

export function getPriceId(planId: string): string | undefined {
  const envKey = planToPriceEnv[planId];
  return envKey ? process.env[envKey] : undefined;
}

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

const globalForStripe = globalThis as unknown as { stripe?: Stripe };

export const stripe: Stripe | null = isStripeConfigured()
  ? globalForStripe.stripe ?? new Stripe(process.env.STRIPE_SECRET_KEY as string)
  : null;

if (isStripeConfigured() && stripe && process.env.NODE_ENV !== "production") {
  globalForStripe.stripe = stripe;
}

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/**
 * Creates a Checkout Session for a plan.
 * - Subscriptions (library) → success returns to the dashboard.
 * - One-time packages (binders) → success sends the buyer straight to the
 *   intake form so they can submit their company details immediately.
 */
export async function createCheckoutSession(
  planId: string,
  customerEmail?: string,
  userId?: string
) {
  if (!stripe) throw new Error("Stripe is not configured.");
  const price = getPriceId(planId);
  if (!price) throw new Error(`No Stripe price configured for plan: ${planId}`);

  const isSubscription = subscriptionPlanIds.has(planId);
  const successUrl = isSubscription
    ? `${SITE}/dashboard?checkout=success&plan=${planId}`
    : `${SITE}/intake?package=${oneTimeToIntake[planId] ?? ""}&checkout=success`;

  return stripe.checkout.sessions.create({
    mode: isSubscription ? "subscription" : "payment",
    line_items: [{ price, quantity: 1 }],
    customer_email: customerEmail || undefined,
    // Ties the Stripe session back to our account so the webhook can
    // activate the right user's subscription.
    client_reference_id: userId || undefined,
    success_url: successUrl,
    cancel_url: `${SITE}/pricing?checkout=cancelled`,
    allow_promotion_codes: true,
    metadata: { planId, ...(userId ? { userId } : {}) },
  });
}
