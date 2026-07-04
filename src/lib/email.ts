import "server-only";
import { Resend } from "resend";

/**
 * Transactional email via Resend. Guarded: if RESEND_API_KEY is not set, sends
 * are skipped (logged) so the app runs fine before email is connected.
 *
 * EMAIL_FROM must use a domain you've verified in Resend (e.g.
 * "SafeSite Documents <noreply@safesitedocs.com>"). For quick testing you
 * can use Resend's onboarding@resend.dev sender.
 */
const KEY = process.env.RESEND_API_KEY;
const FROM = process.env.EMAIL_FROM || "SafeSite Documents <onboarding@resend.dev>";
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
// Emails send from the .com domain (no inbound MX), so "just reply to this
// email" must be routed to a monitored, receivable inbox — default to the
// sales inbox (contact@safesitedocs.org on Zoho) unless a send overrides it.
const REPLY_TO = process.env.SALES_INBOX || "contact@safesitedocs.org";

export const isEmailConfigured = () => Boolean(KEY);

const resend = KEY ? new Resend(KEY) : null;

type SendArgs = { to: string | string[]; subject: string; html: string; replyTo?: string };

export async function sendEmail({ to, subject, html, replyTo }: SendArgs) {
  if (!resend) {
    console.info(`[email] not configured — skipped: "${subject}" -> ${to}`);
    return { skipped: true as const };
  }
  try {
    const res = await resend.emails.send({ from: FROM, to, subject, html, replyTo: replyTo ?? REPLY_TO });
    return { ok: true as const, id: (res as { data?: { id?: string } }).data?.id };
  } catch (err) {
    console.error("[email] send failed:", err);
    return { error: true as const };
  }
}

/**
 * Shared branded shell — table-based for broad email-client support (Outlook,
 * Gmail, Apple Mail). Brand navy/safety-yellow with the hazard-bar motif, the
 * SafeSite Docs logo in the header, and a branded footer + disclaimer.
 */
function layout(bodyHtml: string, preheader = "SafeSite Docs — contractor safety templates") {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>SafeSite Docs</title>
</head>
<body style="margin:0;padding:0;background:#eef1f5;-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#eef1f5;font-size:1px;line-height:1px;">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef1f5;">
  <tr><td align="center" style="padding:24px 12px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;">
      <tr><td style="height:6px;background:#FFC400;border-radius:14px 14px 0 0;font-size:0;line-height:0;">&nbsp;</td></tr>
      <tr><td style="background:#ffffff;padding:20px 28px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td style="padding-right:12px;" valign="middle"><img src="${SITE}/logo-mark.png" width="44" height="44" alt="SafeSite Docs" style="display:block;border:0;"></td>
          <td valign="middle">
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:800;color:#0B1A30;line-height:1;">SafeSite <span style="color:#FFC400">Docs</span></div>
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;color:#64748b;margin-top:4px;">CONTRACTOR SAFETY</div>
          </td>
        </tr></table>
      </td></tr>
      <tr><td style="background:#ffffff;padding:8px 28px 30px;font-family:Arial,Helvetica,sans-serif;">
        ${bodyHtml}
      </td></tr>
      <tr><td style="background:#0B1A30;border-radius:0 0 14px 14px;padding:22px 28px;font-family:Arial,Helvetica,sans-serif;">
        <div style="font-size:15px;font-weight:800;color:#ffffff;">SafeSite <span style="color:#FFC400">Docs</span></div>
        <div style="font-size:12px;color:#9fb0c9;line-height:1.6;margin-top:6px;">
          Editable safety templates, toolbox talks &amp; custom binders for contractors.<br>
          <a href="mailto:contact@safesitedocs.org" style="color:#FFC400;text-decoration:none;">contact@safesitedocs.org</a>
          &nbsp;&middot;&nbsp;
          <a href="${SITE}" style="color:#FFC400;text-decoration:none;">safesitedocs.com</a>
        </div>
        <div style="font-size:10px;color:#64748b;line-height:1.5;margin-top:14px;border-top:1px solid rgba(255,255,255,0.10);padding-top:12px;">
          These materials are general safety-document templates and educational resources — not legal advice and not a guarantee of OSHA compliance. You remain responsible for your safety program.
        </div>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

/** Bulletproof (table-based) CTA button. */
const button = (href: string, label: string) =>
  `<table role="presentation" cellpadding="0" cellspacing="0"><tr>
    <td style="background:#FFC400;border-radius:8px;">
      <a href="${href}" style="display:inline-block;padding:13px 26px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:800;color:#0B1A30;text-decoration:none;">${label}</a>
    </td></tr></table>`;

/** Free starter pack delivery — lists the trade-specific templates with context. */
export function freePackEmailHtml(opts: {
  firstName?: string;
  packName: string;
  items: { title: string; route: string; why?: string; type?: string }[];
}) {
  const count = opts.items.length;
  const rows = opts.items
    .map(
      (it, i) => `
      <tr><td style="padding:12px 0;border-bottom:1px solid #eef1f5;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr>
          <td valign="top" width="40" style="padding-right:12px;">
            <div style="width:28px;height:28px;background:#0B1A30;border-radius:7px;color:#FFC400;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:800;text-align:center;line-height:28px;">${i + 1}</div>
          </td>
          <td valign="top">
            <a href="${SITE}${it.route}" style="font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:#0B1A30;text-decoration:none;">${it.title}</a>${
              it.type
                ? ` <span style="font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.4px;color:#64748b;background:#f1f4f8;border-radius:4px;padding:2px 6px;white-space:nowrap;">${it.type}</span>`
                : ""
            }${
              it.why
                ? `<div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#64748b;line-height:1.5;margin-top:3px;">${it.why}</div>`
                : ""
            }
          </td>
        </tr></table>
      </td></tr>`
    )
    .join("");

  return layout(
    `
    <div style="font-size:11px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:#8a6d00;background:#FFF7DC;display:inline-block;padding:5px 11px;border-radius:20px;">Free Starter Pack</div>
    <h1 style="font-size:24px;font-weight:800;color:#0B1A30;margin:16px 0 8px;line-height:1.25;">Your safety pack is ready${opts.firstName ? `, ${opts.firstName}` : ""} 🦺</h1>
    <p style="font-size:15px;color:#505d72;line-height:1.6;margin:0 0 22px;">Here's your <strong style="color:#0B1A30;">${opts.packName}</strong> — <strong>${count} professional templates</strong> hand-picked for your trade. Every one is viewable in full right now; open any of them and print it or save it as a PDF.</p>

    <div style="background:#f7f9fc;border:1px solid #eef1f5;border-radius:12px;padding:4px 18px 8px;margin:0 0 24px;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:0.6px;color:#0B1A30;padding:14px 0 2px;">What's inside your pack</div>
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">${rows}</table>
    </div>

    ${button(`${SITE}/library`, "Open your pack →")}

    <p style="font-size:13px;color:#8593a8;line-height:1.6;margin:16px 0 24px;">📄 <strong style="color:#505d72;">How to use them:</strong> open any template, then use your browser's <em>Print → Save as PDF</em> to keep a copy or print it for the crew. Fully editable Word versions unlock with any plan.</p>

    <div style="background:#0B1A30;border-radius:12px;padding:20px 22px;margin:0 0 22px;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:800;color:#ffffff;margin-bottom:4px;">Need the whole library?</div>
      <p style="font-size:13px;color:#9fb0c9;line-height:1.6;margin:0 0 14px;">Get <strong style="color:#ffffff;">350+ editable templates</strong> across 22 categories — manuals, toolbox talks, JHAs, and inspection forms — updated regularly.</p>
      ${button(`${SITE}/pricing`, "See plans &amp; pricing")}
    </div>

    <p style="font-size:14px;color:#505d72;line-height:1.6;margin:0;">Questions? Just reply to this email — a real person with an EHS background will help you out.</p>
  `,
    `Your ${opts.packName} is ready — ${count} templates inside.`
  );
}

/** "We received your custom binder intake" confirmation to the customer. */
export function intakeReceivedHtml(opts: { contactName?: string; company?: string }) {
  return layout(
    `
    <h1 style="font-size:22px;font-weight:800;color:#0B1A30;margin:8px 0 10px;line-height:1.3;">We received your intake${opts.contactName ? `, ${opts.contactName}` : ""}</h1>
    <p style="font-size:15px;color:#505d72;line-height:1.6;margin:0 0 20px;">
      Thanks${opts.company ? ` from ${opts.company}` : ""}! We'll review your information and begin
      organizing the documents needed for your custom safety binder. We'll follow up by email to
      confirm scope and timeline.
    </p>
    ${button(`${SITE}/library`, "Browse templates while you wait")}
    <p style="font-size:14px;color:#505d72;line-height:1.6;margin:22px 0 0;">Questions in the meantime? Just reply to this email.</p>
  `,
    "We received your custom binder intake — here's what happens next."
  );
}

/**
 * Post-purchase: sent right after a binder package is paid for, prompting the
 * buyer to complete the intake form (in case they close the checkout tab before
 * the redirect, or want to come back to it later).
 */
export function completeIntakeHtml(opts: { firstName?: string; packageId: string }) {
  const labels: Record<string, string> = {
    "custom-binder": "Custom Safety Binder",
    "contractor-pro": "Contractor Safety Pro Package",
    "premium-system": "Premium Safety System",
  };
  const label = labels[opts.packageId] ?? "custom safety binder";
  const intakeUrl = `${SITE}/intake?package=${encodeURIComponent(opts.packageId)}`;
  const step = (n: number, title: string, body: string) => `
    <tr><td style="padding:9px 0;border-bottom:1px solid #eef1f5;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr>
        <td valign="top" width="40" style="padding-right:12px;"><div style="width:28px;height:28px;background:#0B1A30;border-radius:7px;color:#FFC400;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:800;text-align:center;line-height:28px;">${n}</div></td>
        <td valign="top"><div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:#0B1A30;">${title}</div><div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#64748b;line-height:1.5;margin-top:2px;">${body}</div></td>
      </tr></table>
    </td></tr>`;

  return layout(
    `
    <div style="font-size:11px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:#0f7a3d;background:#e7f6ec;display:inline-block;padding:5px 11px;border-radius:20px;">&#10003; Order confirmed</div>
    <h1 style="font-size:24px;font-weight:800;color:#0B1A30;margin:16px 0 8px;line-height:1.25;">You're all set${opts.firstName ? `, ${opts.firstName}` : ""} — let's build your binder 🦺</h1>
    <p style="font-size:15px;color:#505d72;line-height:1.6;margin:0 0 10px;">Thanks for your order! You purchased the <strong style="color:#0B1A30;">${label}</strong>. To start building it around <strong>your</strong> company and worksites, we just need a few details.</p>
    <p style="font-size:15px;color:#505d72;line-height:1.6;margin:0 0 22px;">It takes about <strong style="color:#0B1A30;">10 minutes</strong> — the more you tell us, the better we match the right documents to your trade and hazards.</p>

    ${button(intakeUrl, "Complete your intake form →")}

    <div style="background:#f7f9fc;border:1px solid #eef1f5;border-radius:12px;padding:4px 18px 14px;margin:24px 0 22px;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:0.6px;color:#0B1A30;padding:14px 0 8px;">What you'll tell us</div>
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        ${step(1, "Your company basics", "Name, trade, crew size, and the states you work in.")}
        ${step(2, "Your work &amp; hazards", "A quick yes/no on heights, electrical, chemicals, equipment, and more.")}
        ${step(3, "Prequalification needs", "ISNetworld, Avetta, Veriforce — tell us who's asking so we match it.")}
        ${step(4, "Anything you already have", "Upload any current docs so we don't rebuild what you've got.")}
      </table>
    </div>

    <p style="font-size:13px;color:#8593a8;line-height:1.6;margin:0 0 22px;">🔒 <strong style="color:#505d72;">Your link stays active</strong> — if now's not a good time, come back to it whenever you're ready. The sooner you complete it, the sooner we start building.</p>
    <p style="font-size:14px;color:#505d72;line-height:1.6;margin:0;">Questions? Just reply to this email — a real person with an EHS background will help you out.</p>
  `,
    "Your binder order is confirmed — complete your intake to get started."
  );
}

/** Internal notification (to your sales inbox). */
export function internalNotifyHtml(title: string, lines: string[]) {
  const body = lines
    .map((l) => `<p style="margin:4px 0;font-size:14px;color:#334155;line-height:1.5;">${l}</p>`)
    .join("");
  return layout(
    `<h1 style="font-size:18px;font-weight:800;color:#0B1A30;margin:8px 0 10px;">${title}</h1>${body}`,
    title
  );
}
