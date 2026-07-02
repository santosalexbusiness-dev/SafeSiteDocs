"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

/** Opens the Stripe Billing Portal (update card, invoices, cancel). */
export function BillingPortalButton({ className }: { className?: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string>();

  async function open() {
    setBusy(true);
    setError(undefined);
    try {
      const res = await fetch("/api/billing-portal", { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.url) {
        window.location.href = data.url as string;
        return;
      }
      setError(data?.error ?? "Could not open the billing portal.");
    } catch {
      setError("Could not open the billing portal.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={open}
        disabled={busy}
        className={className ?? "btn btn-secondary btn-sm"}
        aria-busy={busy}
      >
        {busy ? "Opening…" : "Open billing portal"} <ArrowRight className="h-4 w-4" />
      </button>
      {error ? <p className="mt-2 text-xs font-medium text-red-600">{error}</p> : null}
    </div>
  );
}
