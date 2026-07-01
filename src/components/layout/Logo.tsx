import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * SafeSite Documents wordmark + mark. The mark is a shield framing a
 * hard-hat silhouette, rendered in brand navy/safety yellow.
 */
export function Logo({
  className,
  tone = "dark",
  href = "/",
}: {
  className?: string;
  tone?: "dark" | "light";
  href?: string | null;
}) {
  const wordmark = tone === "light" ? "text-white" : "text-navy-950";

  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9 flex-shrink-0"
        role="img"
        aria-label="SafeSite Documents logo"
      >
        <path
          d="M20 2 4 8v11c0 9.2 6.4 16.4 16 19 9.6-2.6 16-9.8 16-19V8L20 2Z"
          fill="#0B1A30"
        />
        <path
          d="M20 2 4 8v11c0 9.2 6.4 16.4 16 19 9.6-2.6 16-9.8 16-19V8L20 2Z"
          fill="none"
          stroke="#FFC400"
          strokeWidth="1.6"
          opacity="0.9"
        />
        {/* hard hat */}
        <path
          d="M11 25.5h18c0-5.2-3.4-9-6.6-9.9V13a2.4 2.4 0 0 0-4.8 0v2.6C14.4 16.5 11 20.3 11 25.5Z"
          fill="#FFC400"
        />
        <rect x="9.5" y="25.2" width="21" height="2.6" rx="1.3" fill="#FFC400" />
        <rect x="18.7" y="11.6" width="2.6" height="2.2" rx="0.6" fill="#0B1A30" />
      </svg>
      <span className={cn("flex flex-col leading-none", wordmark)}>
        <span className="font-display text-lg font-extrabold tracking-tight">
          SafeSite
          <span className="text-safety-500"> Docs</span>
        </span>
        <span
          className={cn(
            "text-[0.62rem] font-semibold uppercase tracking-[0.22em]",
            tone === "light" ? "text-navy-100/70" : "text-steel-500"
          )}
        >
          Contractor Safety
        </span>
      </span>
    </span>
  );

  if (href === null) return content;

  return (
    <Link href={href} className="rounded-lg focus-visible:ring-2 focus-visible:ring-safety">
      {content}
    </Link>
  );
}
