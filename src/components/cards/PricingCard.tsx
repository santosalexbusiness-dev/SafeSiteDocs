import { Check } from "lucide-react";
import { CheckoutButton } from "@/components/pricing/CheckoutButton";
import { Badge } from "@/components/ui/Badge";
import { formatUSD } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Plan } from "@/data/pricing";

export function PricingCard({ plan }: { plan: Plan }) {
  const highlight = plan.highlight;

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border p-6 transition-all sm:p-7",
        highlight
          ? "border-safety bg-navy-950 text-white shadow-card-hover lg:-translate-y-2"
          : "border-navy-100 bg-white text-navy-900 shadow-card hover:-translate-y-1 hover:shadow-card-hover"
      )}
    >
      {plan.badge ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="safety">{plan.badge}</Badge>
        </span>
      ) : null}

      <div className="flex items-center justify-between gap-2">
        <h3 className={cn("text-lg font-bold", highlight ? "text-white" : "text-navy-950")}>
          {plan.name}
        </h3>
        <Badge variant={highlight ? "safety" : "muted"}>
          {plan.type === "subscription" ? "Subscription" : "One-time"}
        </Badge>
      </div>

      <p className={cn("mt-2 text-sm", highlight ? "text-navy-100/70" : "text-steel-600")}>
        {plan.blurb}
      </p>

      <div className="mt-5 flex items-end gap-1">
        <span className="font-display text-4xl font-extrabold tracking-tight">
          {formatUSD(plan.price)}
        </span>
        <span className={cn("pb-1 text-sm", highlight ? "text-navy-100/60" : "text-steel-500")}>
          {plan.cadence}
        </span>
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <span
              className={cn(
                "mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full",
                highlight ? "bg-safety text-navy-950" : "bg-navy-900 text-safety"
              )}
            >
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            <span className={highlight ? "text-navy-100/90" : "text-steel-700"}>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7">
        <CheckoutButton
          planId={plan.id}
          fallbackHref={plan.cta.href}
          className={cn(highlight ? "btn-primary" : "btn-secondary", "btn-lg w-full")}
        >
          {plan.cta.label}
        </CheckoutButton>
      </div>
    </div>
  );
}
