import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe, planToPriceEnv } from "@/lib/stripe";
import { prisma } from "@/lib/db";

// Stripe needs the raw body to verify the signature — no caching/parsing.
export const dynamic = "force-dynamic";

/** Reverse lookup: a Stripe price id → our plan id (from the env mapping). */
function planFromPriceId(priceId?: string | null): string | null {
  if (!priceId) return null;
  for (const [plan, envKey] of Object.entries(planToPriceEnv)) {
    if (process.env[envKey] === priceId) return plan;
  }
  return null;
}

/** Map a Stripe subscription status onto our enum. */
function subStatus(s: Stripe.Subscription.Status): "ACTIVE" | "TRIALING" | "PAST_DUE" | "CANCELED" {
  if (s === "trialing") return "TRIALING";
  if (s === "past_due" || s === "unpaid") return "PAST_DUE";
  if (s === "active") return "ACTIVE";
  return "CANCELED";
}

/** Upsert our Subscription row from a Stripe subscription object. */
async function syncSubscription(sub: Stripe.Subscription, userId?: string | null) {
  if (!prisma) return;

  // Resolve the owning user: explicit id (checkout metadata) or via customer email.
  let uid = userId ?? null;
  if (!uid && stripe && typeof sub.customer === "string") {
    try {
      const customer = await stripe.customers.retrieve(sub.customer);
      const email = (customer as Stripe.Customer).email;
      if (email) {
        const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
        uid = user?.id ?? null;
      }
    } catch {
      /* customer lookup is best-effort */
    }
  }
  if (!uid) {
    console.warn(`[stripe webhook] subscription ${sub.id}: no matching user — skipped`);
    return;
  }

  const priceId = sub.items.data[0]?.price?.id ?? null;
  const periodEnd = sub.items.data[0]?.current_period_end ?? null;

  await prisma.subscription.upsert({
    where: { stripeSubscriptionId: sub.id },
    update: {
      status: subStatus(sub.status),
      stripePriceId: priceId,
      currentPeriodEnd: periodEnd ? new Date(periodEnd * 1000) : null,
    },
    create: {
      userId: uid,
      plan: planFromPriceId(priceId) ?? "library-starter",
      status: subStatus(sub.status),
      stripeCustomerId: typeof sub.customer === "string" ? sub.customer : null,
      stripeSubscriptionId: sub.id,
      stripePriceId: priceId,
      currentPeriodEnd: periodEnd ? new Date(periodEnd * 1000) : null,
    },
  });
}

/**
 * Stripe webhook receiver. Verifies the signature, then:
 * - one-time payments  → records a PAID Order
 * - subscriptions      → creates/updates the user's Subscription (unlocks access)
 */
export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    return NextResponse.json({ received: false, error: "Stripe not configured." }, { status: 501 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature") ?? "";

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    console.error("[stripe webhook] signature verification failed", err);
    return NextResponse.json({ received: false }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const s = event.data.object as Stripe.Checkout.Session;
        const userId = s.client_reference_id ?? s.metadata?.userId ?? null;

        if (prisma && s.mode === "payment") {
          await prisma.order.create({
            data: {
              userId,
              email: s.customer_details?.email ?? s.customer_email ?? "",
              packageId: (s.metadata?.planId as string) ?? "",
              amount: s.amount_total ?? 0,
              currency: s.currency ?? "usd",
              status: "PAID",
              stripeCheckoutId: s.id,
              stripePaymentIntentId:
                typeof s.payment_intent === "string" ? s.payment_intent : null,
            },
          });
        }

        if (s.mode === "subscription" && typeof s.subscription === "string") {
          const sub = await stripe.subscriptions.retrieve(s.subscription);
          await syncSubscription(sub, userId);
        }
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        await syncSubscription(event.data.object as Stripe.Subscription, null);
        break;
      }
      case "invoice.payment_failed": {
        console.info("[stripe webhook] invoice.payment_failed");
        break;
      }
      default:
        break;
    }
  } catch (err) {
    console.error("[stripe webhook] handler error", err);
    // Return 200 so Stripe doesn't retry a handler bug indefinitely.
  }

  return NextResponse.json({ received: true });
}
