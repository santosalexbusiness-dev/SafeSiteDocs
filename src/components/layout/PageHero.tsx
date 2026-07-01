import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Crumb = { label: string; href?: string };

/** Standard interior-page hero on the brand navy with optional breadcrumb + CTA. */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  primaryCta,
  secondaryCta,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs?: Crumb[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <div className="absolute inset-0 bg-blueprint opacity-50" aria-hidden />
      <div
        className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-navy-600/30 blur-[120px]"
        aria-hidden
      />
      <div className="hazard-bar absolute inset-x-0 top-0 opacity-90" aria-hidden />

      <div className="container relative py-14 sm:py-16 lg:py-20">
        {crumbs ? (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1 text-xs text-navy-100/60">
              <li>
                <Link href="/" className="hover:text-safety">
                  Home
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-1">
                  <ChevronRight className="h-3 w-3" />
                  {c.href ? (
                    <Link href={c.href} className="hover:text-safety">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-navy-100/90">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        {eyebrow ? <p className="eyebrow-light mb-3">{eyebrow}</p> : null}
        <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
          {title}
        </h1>
        {intro ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-100/80">{intro}</p>
        ) : null}

        {primaryCta || secondaryCta ? (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {primaryCta ? (
              <Button href={primaryCta.href} variant="primary" size="lg">
                {primaryCta.label}
              </Button>
            ) : null}
            {secondaryCta ? (
              <Button href={secondaryCta.href} variant="ghost-light" size="lg">
                {secondaryCta.label}
              </Button>
            ) : null}
          </div>
        ) : null}

        {children}
      </div>
    </section>
  );
}
