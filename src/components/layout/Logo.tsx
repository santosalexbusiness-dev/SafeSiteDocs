import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * SafeSite Docs wordmark + mark. The mark is a navy shield (with a thin white
 * inner border) framing a yellow checklist document, in brand navy/safety yellow.
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
        aria-label="SafeSite Docs logo"
      >
        {/* shield */}
        <path
          d="M20 2.5 5 7.5V19c0 9 6.2 15.8 15 18.5C28.8 34.8 35 28 35 19V7.5L20 2.5Z"
          fill="#0B1A30"
        />
        {/* thin white inner border */}
        <path
          d="M20 5 7.3 9v10c0 7.6 5.1 13.4 12.7 15.8C27.6 32.4 32.7 26.6 32.7 19V9L20 5Z"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.1"
          opacity="0.92"
        />
        {/* checklist document */}
        <path d="M13.5 12.5H22.3L25.8 16V27.5H13.5Z" fill="#FFC400" />
        {/* folded corner */}
        <path d="M22.3 12.5V16H25.8Z" fill="#CF8F00" />
        {/* check rows */}
        <g
          stroke="#0B1A30"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14.6 18l1 1 1.9-2.1" />
          <path d="M19.2 18.1h4.2" />
          <path d="M14.6 21.5l1 1 1.9-2.1" />
          <path d="M19.2 21.6h4.2" />
          <path d="M14.6 25l1 1 1.9-2.1" />
          <path d="M19.2 25.1h4.2" />
        </g>
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
