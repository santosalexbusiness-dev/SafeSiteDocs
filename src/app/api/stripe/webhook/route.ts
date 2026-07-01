import { NextResponse } from "next/server";

/**
 * Stripe webhook receiver.
 * Reconciles subscriptions/orders into the database when events fire.
 *
 * IMPORTANT: verify the signature against STRIPE_WEBHOOK_SECRET using the RAW
 * body. Do not parse JSON before verifying. Local testing:
 *   stripe listen --forward-to localhost:3000/api/stripe/webhook
 */

// Stripe needs the raw body — disable any body parsing/caching.
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ received: false, error: "Webhook secret not set." }, { status: 501 });
  }

  // --- Enable after `npm i stripe` --------------------------------------
  // import { stripe } from "@/lib/stripe";
  // let event: Stripe.Event;
  // try {
  //   event = stripe.webhooks.constructEvent(rawBody, signature!, process.env.STRIPE_WEBHOOK_SECRET);
  // } catch (err) {
  //   return NextResponse.json({ received: false }, { status: 400 });
  // }
  // switch (event.type) {
  //   case "checkout.session.completed": /* create Order / activate access */ break;
  //   case "customer.subscription.updated":
  //   case "customer.subscription.deleted": /* sync Subscription row */ break;
  //   case "invoice.payment_failed": /* flag past_due */ break;
  // }

  void rawBody;
  void signature;
  return NextResponse.json({ received: true });
}
