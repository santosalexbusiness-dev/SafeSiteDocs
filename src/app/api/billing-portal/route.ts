import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/**
 * Opens the Stripe Billing Portal for the signed-in user so they can update
 * their card, view invoices, or cancel — no card data ever touches our app.
 */
export async function POST() {
  try {
    if (!stripe || !prisma) {
      return NextResponse.json({ ok: false, error: "Billing not configured." }, { status: 501 });
    }
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ ok: false, needAuth: true }, { status: 401 });
    }

    const sub = await prisma.subscription.findFirst({
      where: { userId: user.id, stripeCustomerId: { not: null } },
      orderBy: { createdAt: "desc" },
    });
    if (!sub?.stripeCustomerId) {
      return NextResponse.json(
        { ok: false, error: "No billing profile yet — subscribe to a plan first." },
        { status: 404 }
      );
    }

    const portal = await stripe.billingPortal.sessions.create({
      customer: sub.stripeCustomerId,
      return_url: `${SITE}/dashboard`,
    });
    return NextResponse.json({ ok: true, url: portal.url });
  } catch (err) {
    console.error("[billing-portal] error", err);
    return NextResponse.json({ ok: false, error: "Could not open billing portal." }, { status: 400 });
  }
}
