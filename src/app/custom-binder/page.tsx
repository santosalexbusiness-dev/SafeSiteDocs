import type { Metadata } from "next";
import { Check, FileText, FolderCheck, Layers, ShieldCheck, Building2 } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PricingCard } from "@/components/cards/PricingCard";
import { DisclaimerBlock } from "@/components/ui/DisclaimerBlock";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { oneTimePlans } from "@/data/pricing";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Custom Safety Binder — Done-for-You Safety Package",
  description:
    "Answer a short intake and we build a custom safety binder for your company — manual, forms, logs, and toolbox talks matched to your trade, hazards, and crew. Delivered in Word and PDF.",
  path: "/custom-binder",
});

const included = [
  { icon: FileText, title: "Company safety manual", body: "A written program branded with your company name and tailored to your work." },
  { icon: FolderCheck, title: "OSHA-style inspection binder", body: "Organized sections so your paperwork is easy to find and present." },
  { icon: Layers, title: "Relevant forms & logs", body: "Only the forms that fit your trade and hazards — no 200 pages you'll never use." },
  { icon: ShieldCheck, title: "Toolbox talk pack", body: "Ready-to-run safety meeting topics with sign-in sheets." },
  { icon: Building2, title: "Industry-specific content", body: "Built around electrical, roofing, HVAC, plumbing, concrete — whatever you do." },
  { icon: Check, title: "Editable + PDF delivery", body: "Word files you can edit forever, plus a clean PDF binder ready to print." },
];

const mappingExamples = [
  { q: "Work at heights / roofing", forms: "Fall protection plan, harness inspection log, ladder & scaffold checklists" },
  { q: "Electrical work", forms: "Lockout/tagout program, electrical safe work practices, GFCI logs" },
  { q: "Chemicals on site", forms: "Hazard Communication program, chemical inventory, SDS index" },
  { q: "Outdoor crews in heat", forms: "Heat illness prevention plan, water/rest/shade schedule" },
  { q: "New employees", forms: "New-hire orientation packet, training matrix, acknowledgement forms" },
  { q: "Confined space / trenching", forms: "Permit forms, atmospheric testing logs, excavation checklists" },
];

export default function CustomBinderPage() {
  return (
    <>
      <PageHero
        eyebrow="Done-for-you · One-time service"
        title="A custom safety binder, built around your company"
        intro="Tell us about your trade, hazards, equipment, crew size, and states. We assemble a safety binder with your company name and the forms that actually fit your work — delivered in editable Word and clean PDF."
        crumbs={[{ label: "Custom Safety Binder" }]}
        primaryCta={{ label: "Start My Intake Form", href: "/intake" }}
        secondaryCta={{ label: "See packages", href: "#packages" }}
      />

      {/* What's included */}
      <Section tone="light">
        <SectionHeader
          eyebrow="What's included"
          title="Everything you need, nothing you don't"
          intro="We don't hand you a generic 300-page binder. We build the documents that match your business and leave out the rest."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {included.map((item, i) => {
            const ItemIcon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="card h-full p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900 text-safety">
                    <ItemIcon className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-navy-950">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-steel-600">{item.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Process */}
      <ProcessSteps withCta={false} />

      {/* How we customize */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="How we customize it"
          title="Your answers map to the right documents"
          intro="Your intake form drives the build. Here's how common answers translate into the forms we include."
          align="left"
        />
        <div className="mt-10 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
          <div className="grid grid-cols-1 divide-y divide-navy-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            <div className="hidden bg-navy-900 p-5 text-sm font-semibold uppercase tracking-wide text-safety sm:block">
              If you tell us…
            </div>
            <div className="hidden bg-navy-900 p-5 text-sm font-semibold uppercase tracking-wide text-safety sm:block">
              …we include
            </div>
          </div>
          <ul className="divide-y divide-navy-100">
            {mappingExamples.map((m) => (
              <li key={m.q} className="grid gap-1 p-5 sm:grid-cols-2 sm:gap-6">
                <span className="font-semibold text-navy-900">{m.q}</span>
                <span className="text-sm text-steel-600">{m.forms}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Packages */}
      <Section tone="light" id="packages">
        <SectionHeader
          eyebrow="Custom binder packages"
          title="Pick the package that fits your crew"
          intro="One-time pricing. The Premium Safety System also includes three months of document updates."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {oneTimePlans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.08}>
              <PricingCard plan={plan} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/intake" variant="primary" size="lg">
            Start My Intake Form
          </Button>
        </div>
        <DisclaimerBlock className="mx-auto mt-12 max-w-4xl" />
      </Section>

      <CtaBanner
        title="Ready to have it built for you?"
        subtitle="The intake form takes about 10 minutes. We'll review it and confirm scope and timeline before we start."
      />
    </>
  );
}
