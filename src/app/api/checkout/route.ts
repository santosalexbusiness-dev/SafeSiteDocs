import { NextResponse } from "next/server";
import { getPriceId, isStripeConfigured, subscriptionPlanIds } from "@/lib/stripe";

/**
 * Creates a Stripe Checkout Session for a plan and returns its URL.
 * The client redirects the customer to `url`.
 *
 * Returns 501 until Stripe is installed + configured (see src/lib/stripe.ts).
 */
export async function POST(request: Request) {
  try {
    const { planId, email } = await request.json();
    const priceId = getPriceId(planId);

    if (!isStripeConfigured() || !priceId) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Stripe is not configured yet. Add keys + Price IDs and enable the client in src/lib/stripe.ts.",
        },
        { status: 501 }
      );
    }

    const mode = subscriptionPlanIds.has(planId) ? "subscription" : "payment";

    // --- Enable after `npm i stripe` (see src/lib/stripe.ts) ---------------
    // const session = await createCheckoutSession(planId, email);
    // return NextResponse.json({ ok: true, url: session.url });

    void email;
    void mode;
    return NextResponse.json(
      { ok: false, error: "Checkout client not enabled." },
      { status: 501 }
    );
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}
