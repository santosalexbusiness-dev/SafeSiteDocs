import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
  /** Visual tone — affects default background + padding. */
  tone?: "light" | "muted" | "dark" | "navy";
  containerClassName?: string;
};

const toneStyles: Record<NonNullable<SectionProps["tone"]>, string> = {
  light: "bg-white text-navy-900",
  muted: "bg-steel-50 text-navy-900",
  dark: "bg-navy-950 text-white",
  navy: "bg-navy-900 text-white",
};

export function Section({ id, className, children, tone = "light", containerClassName }: SectionProps) {
  return (
    <section id={id} className={cn("py-16 sm:py-20 lg:py-28", toneStyles[tone], className)}>
      <div className={cn("container", containerClassName)}>{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "center",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow ? (
        <p className={cn("mb-3", tone === "dark" ? "eyebrow-light" : "eyebrow")}>
          <span className="h-px w-6 bg-current opacity-60" aria-hidden />
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-extrabold leading-[1.05]",
          tone === "dark" ? "text-white" : "text-navy-950"
        )}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed text-pretty",
            tone === "dark" ? "text-navy-100/80" : "text-steel-600"
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
