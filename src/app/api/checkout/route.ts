import { NextResponse } from "next/server";
import {
  createCheckoutSession,
  getPriceId,
  isStripeConfigured,
  subscriptionPlanIds,
} from "@/lib/stripe";
import { getSessionUser } from "@/lib/auth";

/**
 * Creates a Stripe Checkout Session for a plan and returns its URL.
 * Subscription plans require a signed-in account (so the webhook can activate
 * access on the right user). One-time binder packages allow guest checkout.
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

    const user = await getSessionUser();

    if (subscriptionPlanIds.has(planId) && !user) {
      return NextResponse.json(
        { ok: false, needAuth: true, error: "Create an account to start your subscription." },
        { status: 401 }
      );
    }

    const session = await createCheckoutSession(
      planId,
      user?.email ?? email,
      user?.id ?? undefined
    );
    return NextResponse.json({ ok: true, url: session.url });
  } catch (err) {
    console.error("[checkout] error", err);
    return NextResponse.json({ ok: false, error: "Could not start checkout." }, { status: 400 });
  }
}
