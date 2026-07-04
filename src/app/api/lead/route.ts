import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isEmailConfigured, sendEmail, freePackEmailHtml, internalNotifyHtml, esc } from "@/lib/email";
import { getResolvedFreePacks } from "@/data/freePacks";
import { isHoneypotTripped, rateLimit, clientKey } from "@/lib/antispam";

/**
 * Free starter pack lead capture.
 * - Persists the lead (Supabase, if connected).
 * - Emails the visitor their trade-specific pack instantly (Resend, if connected).
 * Both are guarded — the endpoint works even before either is configured.
 * Returns `emailed` so the client only claims "we emailed you" when it's true.
 */
export async function POST(request: Request) {
  try {
    const { email, firstName, trade, pack, source, botField } = await request.json();

    // Honeypot: pretend success so bots don't learn they were caught.
    if (isHoneypotTripped(botField)) {
      return NextResponse.json({ ok: true, emailed: false });
    }
    if (!rateLimit(clientKey(request, "lead"), 5, 60_000)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests — please wait a minute and try again." },
        { status: 429 }
      );
    }

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
    let emailed = false;
    if (isEmailConfigured()) {
      const packs = getResolvedFreePacks();
      const chosen = packs[pack] ?? packs[trade] ?? packs.default;
      const res = await sendEmail({
        to: email,
        subject: `Your free ${chosen.name} safety pack`,
        html: freePackEmailHtml({
          firstName,
          packName: chosen.headline,
          items: chosen.items.map((i) => ({
            title: i.title,
            route: i.route,
            why: i.why,
            type: i.type,
          })),
        }),
      });
      emailed = "ok" in res;
      if (process.env.SALES_INBOX) {
        await sendEmail({
          to: process.env.SALES_INBOX,
          subject: `New free-pack lead: ${email}`,
          html: internalNotifyHtml("New free-pack lead", [
            `<strong>Email:</strong> ${esc(email)}`,
            `<strong>Name:</strong> ${esc(firstName) || "—"}`,
            `<strong>Trade:</strong> ${esc(trade) || "—"}`,
            `<strong>Pack:</strong> ${esc(pack) || "—"}`,
          ]),
        });
      }
    }

    return NextResponse.json({ ok: true, emailed });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}
