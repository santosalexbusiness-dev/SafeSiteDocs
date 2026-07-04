import { NextResponse } from "next/server";
import { isEmailConfigured, sendEmail, internalNotifyHtml, esc } from "@/lib/email";
import { isHoneypotTripped, rateLimit, clientKey } from "@/lib/antispam";

/**
 * Contact form → emails your sales inbox with reply-to set to the sender.
 * Contact messages are not persisted, so if email can't be delivered we tell the
 * client honestly rather than showing a false "sent" confirmation.
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Honeypot: pretend success so bots don't learn they were caught.
    if (isHoneypotTripped(data?.botField)) {
      return NextResponse.json({ ok: true });
    }
    if (!rateLimit(clientKey(request, "contact"), 5, 60_000)) {
      return NextResponse.json(
        { ok: false, error: "Too many messages — please wait a minute and try again." },
        { status: 429 }
      );
    }

    if (!data?.email || !data?.message) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }

    // We don't store contact messages, so email is the only delivery path.
    if (!isEmailConfigured() || !process.env.SALES_INBOX) {
      return NextResponse.json(
        {
          ok: false,
          error: "Messaging is temporarily unavailable. Please email us directly at contact@safesitedocs.org.",
        },
        { status: 503 }
      );
    }

    const result = await sendEmail({
      to: process.env.SALES_INBOX,
      replyTo: String(data.email),
      subject: `Contact form: ${data.topic ?? "General"} — ${data.name ?? data.email}`,
      html: internalNotifyHtml("New contact message", [
        `<strong>Name:</strong> ${esc(data.name) || "—"}`,
        `<strong>Email:</strong> ${esc(data.email)}`,
        `<strong>Company:</strong> ${esc(data.company) || "—"}`,
        `<strong>Topic:</strong> ${esc(data.topic) || "—"}`,
        `<strong>Message:</strong><br/>${esc(data.message).replace(/\n/g, "<br/>")}`,
      ]),
    });

    if (!("ok" in result)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Could not send your message. Please email us directly at contact@safesitedocs.org.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}
