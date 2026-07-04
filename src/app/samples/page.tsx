import type { Metadata } from "next";
import { Printer, Check } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { LeadCapture } from "@/components/forms/LeadCapture";
import { Reviews } from "@/components/sections/Reviews";
import { Guarantee } from "@/components/ui/Guarantee";
import { DisclaimerBlock } from "@/components/ui/DisclaimerBlock";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { pageMetadata } from "@/lib/seo";
import { getResolvedFreePacks } from "@/data/freePacks";
import { industries } from "@/data/industries";

export const metadata: Metadata = pageMetadata({
  title: "Free Safety Starter Pack — Tailored to Your Trade",
  description:
    "Pick your trade and get a free, professional safety starter pack — a written safety program, JHAs, checklists, and forms picked for your work. Preview them instantly, free samples included. No credit card.",
  path: "/samples",
});

export default function SamplesPage({ searchParams }: { searchParams: { trade?: string } }) {
  const packs = getResolvedFreePacks();

  return (
    <>
      <PageHero
        eyebrow="Free download · no credit card"
        title="A free safety starter pack, built for your trade"
        intro="See the quality before you buy. Tell us what you do and we'll hand you a curated set of templates to preview — with free samples you can print in full — then point you to your trade's full library."
        crumbs={[{ label: "Free Starter Pack" }]}
      />

      <Section tone="muted">
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Lead capture → trade-tailored pack */}
          <LeadCapture packs={packs} defaultTrade={searchParams.trade ?? ""} source="free-starter-pack" />

          {/* Tailored-for-every-trade signal */}
          <div>
            <h2 className="text-xl font-display font-extrabold text-navy-950">
              A pack tailored to every trade
            </h2>
            <p className="mt-1 text-sm text-steel-600">
              We&apos;ve curated a professional starter pack for each of the trades we serve — the
              right manual, JHAs, checklists, and forms for the way you actually work.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {industries.map((ind) => (
                <div
                  key={ind.slug}
                  className="flex items-center gap-2 rounded-xl border border-navy-100 bg-white p-2.5"
                >
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-safety/15 text-safety-700">
                    <Icon name={ind.icon} className="h-4 w-4" strokeWidth={1.9} />
                  </span>
                  <span className="text-xs font-semibold leading-tight text-navy-900">{ind.name}</span>
                </div>
              ))}
            </div>

            <ul className="mt-6 space-y-2 text-sm text-steel-700">
              {[
                "Curated for your trade — not a generic dump",
                "Free samples you can view and print in full",
                "Editable Word versions unlock with any plan",
              ].map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-safety-700" /> {b}
                </li>
              ))}
            </ul>
            <p className="mt-5 flex items-center gap-2 text-xs text-steel-500">
              <Printer className="h-4 w-4" /> Free samples are viewable and printable in full today.
            </p>
          </div>
        </div>
      </Section>

      {/* Upsell band */}
      <section className="bg-white py-12">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-navy-100 bg-navy-50 p-6 text-center sm:flex-row sm:text-left">
            <div>
              <h2 className="text-lg font-bold text-navy-950">Want everything for your trade?</h2>
              <p className="mt-1 text-sm text-steel-600">
                Your free pack is a starter set. The full library has 350+ editable, printable
                templates across 22 categories.
              </p>
            </div>
            <div className="flex flex-shrink-0 gap-2">
              <Button href="/library" variant="secondary" size="md">
                Browse the library
              </Button>
              <Button href="/pricing" variant="outline" size="md">
                See plans
              </Button>
            </div>
          </div>
          <Guarantee className="mt-8" />
        </div>
      </section>

      <Reviews limit={3} tone="muted" />

      <section className="bg-white pb-16">
        <div className="container">
          <DisclaimerBlock />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
