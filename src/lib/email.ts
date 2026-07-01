import "server-only";
import { Resend } from "resend";

/**
 * Transactional email via Resend. Guarded: if RESEND_API_KEY is not set, sends
 * are skipped (logged) so the app runs fine before email is connected.
 *
 * EMAIL_FROM must use a domain you've verified in Resend (e.g.
 * "SafeSite Documents <noreply@safesitedocs.org>"). For quick testing you
 * can use Resend's onboarding@resend.dev sender.
 */
const KEY = process.env.RESEND_API_KEY;
const FROM = process.env.EMAIL_FROM || "SafeSite Documents <onboarding@resend.dev>";
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const isEmailConfigured = () => Boolean(KEY);

const resend = KEY ? new Resend(KEY) : null;

type SendArgs = { to: string | string[]; subject: string; html: string; replyTo?: string };

export async function sendEmail({ to, subject, html, replyTo }: SendArgs) {
  if (!resend) {
    console.info(`[email] not configured — skipped: "${subject}" -> ${to}`);
    return { skipped: true as const };
  }
  try {
    const res = await resend.emails.send({ from: FROM, to, subject, html, replyTo });
    return { ok: true as const, id: (res as { data?: { id?: string } }).data?.id };
  } catch (err) {
    console.error("[email] send failed:", err);
    return { error: true as const };
  }
}

/** Shared branded wrapper. */
function layout(bodyHtml: string) {
  return `<!doctype html><html><body style="margin:0;background:#f6f7f9;font-family:Arial,Helvetica,sans-serif;color:#0B1A30">
    <div style="max-width:560px;margin:0 auto;padding:24px">
      <div style="background:#0B1A30;border-radius:12px 12px 0 0;padding:18px 24px">
        <span style="color:#fff;font-weight:800;font-size:18px">SafeSite <span style="color:#FFC400">Docs</span></span>
      </div>
      <div style="background:#fff;border:1px solid #eceef2;border-top:none;border-radius:0 0 12px 12px;padding:24px">
        ${bodyHtml}
      </div>
      <p style="color:#8593a8;font-size:11px;line-height:1.5;margin:16px 4px">
        These materials are general safety-document templates and educational resources — not legal
        advice and not a guarantee of compliance. You remain responsible for your safety program.
      </p>
    </div>
  </body></html>`;
}

const button = (href: string, label: string) =>
  `<a href="${href}" style="display:inline-block;background:#FFC400;color:#0B1A30;font-weight:700;text-decoration:none;padding:12px 20px;border-radius:8px">${label}</a>`;

/** Free starter pack delivery — lists the trade-specific templates. */
export function freePackEmailHtml(opts: {
  firstName?: string;
  packName: string;
  items: { title: string; route: string }[];
}) {
  const rows = opts.items
    .map(
      (it) =>
        `<li style="margin:6px 0"><a href="${SITE}${it.route}" style="color:#15304f;font-weight:600">${it.title}</a></li>`
    )
    .join("");
  return layout(`
    <h1 style="font-size:20px;margin:0 0 8px">Your free pack is ready${opts.firstName ? `, ${opts.firstName}` : ""}</h1>
    <p style="color:#505d72;font-size:14px;margin:0 0 16px">Here's your <strong>${opts.packName}</strong>. Open any template to read it in full and print it or save it as a PDF.</p>
    <ul style="padding-left:18px;margin:0 0 20px">${rows}</ul>
    <p>${button(`${SITE}/library`, "Browse the full library")}</p>
  `);
}

/** "We received your custom binder intake" confirmation to the customer. */
export function intakeReceivedHtml(opts: { contactName?: string; company?: string }) {
  return layout(`
    <h1 style="font-size:20px;margin:0 0 8px">We received your intake${opts.contactName ? `, ${opts.contactName}` : ""}</h1>
    <p style="color:#505d72;font-size:14px;line-height:1.6;margin:0 0 16px">
      Thanks${opts.company ? ` from ${opts.company}` : ""}! We'll review your information and begin
      organizing the documents needed for your custom safety binder. We'll follow up by email to
      confirm scope and timeline.
    </p>
    <p>${button(`${SITE}/library`, "Browse templates while you wait")}</p>
  `);
}

/** Internal notification (to your sales inbox). */
export function internalNotifyHtml(title: string, lines: string[]) {
  const body = lines.map((l) => `<p style="margin:4px 0;font-size:14px">${l}</p>`).join("");
  return layout(`<h1 style="font-size:18px;margin:0 0 8px">${title}</h1>${body}`);
}
