"use client";

import { Printer } from "lucide-react";

/** Triggers the browser print dialog (Print or Save as PDF). */
export function PrintButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={className ?? "btn btn-primary btn-md"}
    >
      <Printer className="h-4 w-4" /> Print / Save as PDF
    </button>
  );
}
