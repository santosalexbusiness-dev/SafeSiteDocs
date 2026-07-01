import { NextResponse } from "next/server";
import { isEmailConfigured, sendEmail, internalNotifyHtml } from "@/lib/email";

/**
 * Contact form → emails your sales inbox with reply-to set to the sender.
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (!data?.email || !data?.message) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }

    if (isEmailConfigured() && process.env.SALES_INBOX) {
      await sendEmail({
        to: process.env.SALES_INBOX,
        replyTo: data.email,
        subject: `Contact form: ${data.topic ?? "General"} — ${data.name ?? data.email}`,
        html: internalNotifyHtml("New contact message", [
          `<strong>Name:</strong> ${data.name ?? "—"}`,
          `<strong>Email:</strong> ${data.email}`,
          `<strong>Company:</strong> ${data.company ?? "—"}`,
          `<strong>Topic:</strong> ${data.topic ?? "—"}`,
          `<strong>Message:</strong><br/>${String(data.message).replace(/\n/g, "<br/>")}`,
        ]),
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}
