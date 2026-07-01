"use client";

import { useEffect } from "react";

/** If the page is opened with #print (e.g. the card's print icon), open the print dialog. */
export function AutoPrint() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#print") {
      const t = setTimeout(() => window.print(), 500);
      return () => clearTimeout(t);
    }
  }, []);
  return null;
}
