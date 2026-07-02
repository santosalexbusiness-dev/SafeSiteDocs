"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Starts Stripe Checkout for a plan. Until Stripe is configured (keys + Price
 * IDs), /api/checkout returns 501 and we fall back to the normal flow
 * (login for subscriptions, intake for one-time packages) — so buttons always
 * work, and light up as real checkout the moment Stripe is live.
 */
export function CheckoutButton({
  planId,
  fallbackHref,
  className,
  children,
}: {
  planId: string;
  fallbackHref: string;
  className?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function go() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.url) {
        window.location.href = data.url as string;
        return;
      }
      if (res.status === 401 && data?.needAuth) {
        // Subscriptions need an account first — sign up, then checkout resumes.
        router.push(`/login?plan=${encodeURIComponent(planId)}`);
        return;
      }
      router.push(fallbackHref);
    } catch {
      router.push(fallbackHref);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button type="button" onClick={go} disabled={loading} className={className} aria-busy={loading}>
      {loading ? "Starting checkout…" : children}
    </button>
  );
}
