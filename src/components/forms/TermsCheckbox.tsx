"use client";

import Link from "next/link";
import { TERMS_ACKNOWLEDGEMENT } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Required acknowledgement used before purchase and before submitting the
 * custom binder intake form. Controlled — parent owns the checked state.
 */
export function TermsCheckbox({
  checked,
  onChange,
  error,
  id = "terms-ack",
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  error?: string;
  id?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className={cn(
          "flex cursor-pointer gap-3 rounded-xl border p-4 transition-colors",
          error ? "border-red-400 bg-red-50" : "border-navy-200 bg-white hover:border-navy-300"
        )}
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
          className="mt-0.5 h-5 w-5 flex-shrink-0 rounded border-navy-300 text-navy-900 accent-safety focus-visible:ring-2 focus-visible:ring-safety"
        />
        <span className="text-sm leading-relaxed text-steel-700">
          {TERMS_ACKNOWLEDGEMENT}{" "}
          <Link href="/terms" className="link-underline" target="_blank">
            Terms
          </Link>{" "}
          &amp;{" "}
          <Link href="/disclaimer" className="link-underline" target="_blank">
            Disclaimer
          </Link>
          .
        </span>
      </label>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
