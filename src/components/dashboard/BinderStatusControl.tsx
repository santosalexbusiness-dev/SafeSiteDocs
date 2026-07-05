"use client";

import { useState, useTransition } from "react";
import { Check, Loader2 } from "lucide-react";
import { updateBinderStatus } from "@/app/admin/actions";
import { cn } from "@/lib/utils";

/** The stages the customer sees on their dashboard progress tracker. */
const STEPS = [
  { value: "SUBMITTED", label: "Submitted" },
  { value: "IN_REVIEW", label: "In review" },
  { value: "BUILDING", label: "Building" },
  { value: "DELIVERED", label: "Delivered" },
];

/**
 * Admin control to set a binder request's status. Clicking a stage writes it
 * to the database (via the admin-only server action); the customer's dashboard
 * tracker reflects it on their next visit.
 */
export function BinderStatusControl({ id, current }: { id: string; current: string }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string>();

  const update = (next: string) => {
    if (next === current || pending) return;
    setError(undefined);
    startTransition(async () => {
      const res = await updateBinderStatus(id, next);
      if (!res?.ok) setError(res?.error ?? "Could not update status.");
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-steel-500">
          Update status — the customer sees this on their dashboard
        </p>
        {pending ? (
          <span className="flex items-center gap-1 text-xs text-steel-500">
            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving…
          </span>
        ) : null}
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {STEPS.map((s) => {
          const active = current === s.value;
          return (
            <button
              key={s.value}
              type="button"
              disabled={pending}
              onClick={() => update(s.value)}
              aria-pressed={active}
              className={cn(
                "inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60",
                active
                  ? "border-navy-900 bg-navy-900 text-safety"
                  : "border-navy-200 bg-white text-steel-600 hover:border-navy-300 hover:text-navy-900"
              )}
            >
              {active ? <Check className="h-3.5 w-3.5" /> : null}
              {s.label}
            </button>
          );
        })}

        <button
          type="button"
          disabled={pending}
          onClick={() => update("ON_HOLD")}
          aria-pressed={current === "ON_HOLD"}
          className={cn(
            "inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60",
            current === "ON_HOLD"
              ? "border-amber-500 bg-amber-100 text-amber-800"
              : "border-navy-200 bg-white text-steel-500 hover:border-amber-300 hover:text-amber-700"
          )}
        >
          On hold
        </button>
      </div>

      {error ? <p className="mt-2 text-xs font-medium text-red-600">{error}</p> : null}
    </div>
  );
}
