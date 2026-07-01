import { NextResponse } from "next/server";
import { createCheckoutSession, getPriceId, isStripeConfigured } from "@/lib/stripe";

/**
 * Creates a Stripe Checkout Session for a plan and returns its URL.
 * The client redirects the buyer to `url`.
 */
export async function POST(request: Request) {
  try {
    const { planId, email } = await request.json();

    if (!isStripeConfigured() || !getPriceId(planId)) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Payments aren't live yet. Add your Stripe keys + Price IDs in .env.local to enable checkout.",
        },
        { status: 501 }
      );
    }

    const session = await createCheckoutSession(planId, email);
    return NextResponse.json({ ok: true, url: session.url });
  } catch (err) {
    console.error("[checkout] error", err);
    return NextResponse.json({ ok: false, error: "Could not start checkout." }, { status: 400 });
  }
}
