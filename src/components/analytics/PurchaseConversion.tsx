"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { trackConversion, PURCHASE_LABEL } from "@/lib/gtag";

/** Purchase value (USD) by plan / package id, for conversion value + ROAS. */
const VALUE: Record<string, number> = {
  "custom-binder": 350,
  "contractor-pro": 750,
  "premium-system": 1250,
  "library-starter": 20,
  "library-pro": 50,
};

/**
 * Fires the Google Ads purchase conversion once when a buyer lands on a
 * checkout-success page (`?checkout=success`). Deduped per browser session so a
 * refresh of the success page doesn't double-count. Render inside <Suspense>.
 */
export function PurchaseConversion() {
  const params = useSearchParams();

  useEffect(() => {
    if (params.get("checkout") !== "success") return;
    const id = params.get("package") ?? params.get("plan") ?? "purchase";
    const key = `gads_purchase_${id}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      /* sessionStorage unavailable — fire anyway */
    }
    const value = VALUE[id];
    trackConversion(PURCHASE_LABEL, value != null ? { value } : undefined);
  }, [params]);

  return null;
}
