import { ShieldAlert } from "lucide-react";
import { MASTER_DISCLAIMER } from "@/data/site";
import { cn } from "@/lib/utils";

/** Reusable, prominent disclaimer card. `tone` matches the surrounding section. */
export function DisclaimerBlock({
  tone = "light",
  className,
  text = MASTER_DISCLAIMER,
  title = "Important Disclaimer",
}: {
  tone?: "light" | "dark";
  className?: string;
  text?: string;
  title?: string;
}) {
  return (
    <div
      className={cn(
        "flex gap-4 rounded-2xl border p-5 sm:p-6",
        tone === "dark"
          ? "border-safety/20 bg-navy-950/60 text-navy-100/80"
          : "border-safety/30 bg-safety-50 text-steel-700",
        className
      )}
      role="note"
    >
      <ShieldAlert
        className={cn("h-6 w-6 flex-shrink-0", tone === "dark" ? "text-safety" : "text-safety-700")}
        aria-hidden
      />
      <div>
        <p
          className={cn(
            "text-sm font-semibold uppercase tracking-wide",
            tone === "dark" ? "text-safety" : "text-safety-800"
          )}
        >
          {title}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
