import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isEmailConfigured, sendEmail, freePackEmailHtml, internalNotifyHtml } from "@/lib/email";
import { getResolvedFreePacks } from "@/data/freePacks";

/**
 * Free starter pack lead capture.
 * - Persists the lead (Supabase, if connected).
 * - Emails the visitor their trade-specific pack instantly (Resend, if connected).
 * Both are guarded — the endpoint works even before either is configured.
 */
export async function POST(request: Request) {
  try {
    const { email, firstName, trade, pack, source } = await request.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ ok: false, error: "Email is required." }, { status: 400 });
    }

    // Persist the lead
    if (prisma) {
      await prisma.lead
        .create({ data: { email, firstName, trade, pack, source } })
        .catch((e) => console.error("[lead] db error", e));
    }

    // Email the pack
    if (isEmailConfigured()) {
      const packs = getResolvedFreePacks();
      const chosen = packs[pack] ?? packs[trade] ?? packs.default;
      await sendEmail({
        to: email,
        subject: `Your free ${chosen.name} safety pack`,
        html: freePackEmailHtml({
          firstName,
          packName: chosen.headline,
          items: chosen.items.map((i) => ({ title: i.title, route: i.route })),
        }),
      });
      if (process.env.SALES_INBOX) {
        await sendEmail({
          to: process.env.SALES_INBOX,
          subject: `New free-pack lead: ${email}`,
          html: internalNotifyHtml("New free-pack lead", [
            `<strong>Email:</strong> ${email}`,
            `<strong>Name:</strong> ${firstName ?? "—"}`,
            `<strong>Trade:</strong> ${trade ?? "—"}`,
            `<strong>Pack:</strong> ${pack ?? "—"}`,
          ]),
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}
