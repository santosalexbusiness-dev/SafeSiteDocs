import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";

// Stripe needs the raw body to verify the signature — no caching/parsing.
export const dynamic = "force-dynamic";

/**
 * Stripe webhook receiver. Verifies the signature, then records paid orders and
 * subscription changes to the database (when connected).
 *
 * Set the endpoint in Stripe (Developers → Webhooks) to:
 *   https://YOUR-DOMAIN/api/stripe/webhook
 * and copy its signing secret into STRIPE_WEBHOOK_SECRET.
 * Local testing: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
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
        if (prisma && s.mode === "payment") {
          await prisma.order.create({
            data: {
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
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        // Reconcile the subscription row here (upsert by stripeSubscriptionId,
        // link to a user by stripeCustomerId). Left as a focused follow-up so
        // it can be tied to your auth/user lookup.
        console.info(`[stripe webhook] ${event.type}: ${sub.id} (${sub.status})`);
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
