/**
 * Google Ads (gtag.js) conversion tracking.
 *
 * Everything here is env-guarded: with no IDs set, the tag never loads and
 * every helper is a no-op, so the site runs exactly as before. Set these on
 * Vercel to switch it on:
 *   NEXT_PUBLIC_GOOGLE_ADS_ID        e.g. "AW-123456789"
 *   NEXT_PUBLIC_GADS_LEAD_LABEL      conversion label for the free-pack lead
 *   NEXT_PUBLIC_GADS_PURCHASE_LABEL  conversion label for a purchase
 */
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
export const LEAD_LABEL = process.env.NEXT_PUBLIC_GADS_LEAD_LABEL;
export const PURCHASE_LABEL = process.env.NEXT_PUBLIC_GADS_PURCHASE_LABEL;

type GtagFn = (...args: unknown[]) => void;

function getGtag(): GtagFn | null {
  if (typeof window === "undefined") return null;
  return (window as unknown as { gtag?: GtagFn }).gtag ?? null;
}

/** Fire a Google Ads conversion. No-ops if the tag or label isn't configured. */
export function trackConversion(
  label: string | undefined,
  opts?: { value?: number; currency?: string; transactionId?: string }
) {
  const gtag = getGtag();
  if (!gtag || !GOOGLE_ADS_ID || !label) return;
  gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${label}`,
    ...(opts?.value != null ? { value: opts.value, currency: opts.currency ?? "USD" } : {}),
    ...(opts?.transactionId ? { transaction_id: opts.transactionId } : {}),
  });
}
