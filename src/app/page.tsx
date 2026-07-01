import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { CinematicHero } from "@/components/hero/CinematicHero";
import { OffersComparison } from "@/components/sections/OffersComparison";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { PricingSection } from "@/components/sections/PricingSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { Benefits } from "@/components/sections/Benefits";
import { TrustSection } from "@/components/sections/TrustSection";
import { Reviews } from "@/components/sections/Reviews";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { DisclaimerBlock } from "@/components/ui/DisclaimerBlock";
import { Guarantee } from "@/components/ui/Guarantee";
import { Button } from "@/components/ui/Button";
import { industries } from "@/data/industries";
import { prequalPlatforms } from "@/data/compliance";

export default function HomePage() {
  return (
    <>
      <CinematicHero />

      {/* Trust strip — scrolling industry marquee */}
      <div className="border-y border-navy-100 bg-white py-5">
        <div className="container flex items-center gap-6">
          <span className="hidden flex-shrink-0 text-xs font-semibold uppercase tracking-widest text-steel-400 sm:block">
            Built for
          </span>
          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="flex w-max gap-8 motion-safe:animate-marquee">
              {[...industries, ...industries].map((ind, i) => (
                <span
                  key={`${ind.slug}-${i}`}
                  className="whitespace-nowrap text-sm font-semibold text-steel-500"
                >
                  {ind.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 1 — Two ways to get organized */}
      <OffersComparison />

      {/* Prequalification compliance highlight */}
      <section className="relative overflow-hidden bg-navy-950 py-14 text-white">
        <div className="absolute inset-0 bg-blueprint opacity-50" aria-hidden />
        <div className="hazard-bar absolute inset-x-0 top-0 opacity-90" aria-hidden />
        <div className="container relative grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="eyebrow-light mb-3">
              <ShieldCheck className="h-3.5 w-3.5" /> Prequalification compliance
            </p>
            <h2 className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">
              &ldquo;You need to be in ISNetworld<span className="align-super text-sm">®</span> to keep working.&rdquo;
            </h2>
            <p className="mt-3 max-w-xl text-navy-100/80">
              When a GC or client requires ISNetworld®, Avetta®, or Veriforce® prequalification, they
              ask for written safety programs and forms. We build that documentation for your
              company — organized and ready to upload.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button href="/compliance" variant="primary" size="lg">
                See how it works <ArrowRight className="h-5 w-5" />
              </Button>
              <Button href="/intake?package=contractor-pro" variant="ghost-light" size="lg">
                Start my intake
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {prequalPlatforms.map((p) => (
              <span
                key={p.name}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-semibold text-navy-100/90"
              >
                {p.name}
                <span className="align-super text-[0.6rem] text-safety">{p.mark}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2 — What's inside the library */}
      <CategoriesSection limit={6} />

      {/* Section 3 — Custom binder process */}
      <ProcessSteps />

      {/* Section 4 — Pricing */}
      <PricingSection tone="muted" />

      {/* Risk reversal / guarantee */}
      <section className="bg-steel-50 pb-4">
        <div className="container">
          <Guarantee />
        </div>
      </section>

      {/* Section 5 — Industries served */}
      <IndustriesSection />

      {/* Section 6 — Why contractors use it */}
      <Benefits />

      {/* Section 7 — Trust / credentials */}
      <TrustSection />

      {/* Reviews / testimonials */}
      <Reviews limit={6} tone="light" />

      {/* Section 8 — Strong disclaimer block near footer */}
      <section className="bg-white pb-16">
        <div className="container">
          <DisclaimerBlock />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
