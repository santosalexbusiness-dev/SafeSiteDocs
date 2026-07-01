import { ShieldCheck, RefreshCw, Headset } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Satisfaction / risk-reversal band. This is a product-satisfaction guarantee
 * (a fit/refund promise) — NOT a compliance guarantee, consistent with the
 * site disclaimer. Adjust the window/terms to your actual refund policy.
 */
export function Guarantee({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const items = [
    { icon: ShieldCheck, title: "14-day satisfaction guarantee", body: "If the templates aren't a fit, tell us within 14 days and we'll make it right or refund you." },
    { icon: RefreshCw, title: "Updated regularly", body: "Library plans get ongoing updates — your documents don't go stale." },
    { icon: Headset, title: "Built by a safety pro", body: "Real EHS background behind every template — and a real person to email." },
  ];

  return (
    <div
      className={cn(
        "rounded-2xl border p-6 sm:p-7",
        tone === "dark" ? "border-white/10 bg-white/[0.03]" : "border-navy-100 bg-white shadow-card",
        className
      )}
    >
      <div className="grid gap-5 sm:grid-cols-3">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <div key={it.title} className="flex gap-3">
              <span
                className={cn(
                  "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl",
                  tone === "dark" ? "bg-safety text-navy-950" : "bg-navy-900 text-safety"
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className={cn("text-sm font-bold", tone === "dark" ? "text-white" : "text-navy-950")}>
                  {it.title}
                </p>
                <p className={cn("mt-0.5 text-xs leading-relaxed", tone === "dark" ? "text-navy-100/70" : "text-steel-600")}>
                  {it.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
