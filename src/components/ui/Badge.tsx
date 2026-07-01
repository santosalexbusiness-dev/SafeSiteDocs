import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "safety" | "navy" | "outline" | "muted" | "success";
  className?: string;
};

const variants = {
  safety: "bg-safety text-navy-950",
  navy: "bg-navy-900 text-white",
  outline: "border border-navy-200 text-navy-700",
  muted: "bg-navy-50 text-navy-700",
  success: "bg-emerald-100 text-emerald-800",
};

export function Badge({ children, variant = "safety", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
