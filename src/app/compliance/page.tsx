import type { Metadata } from "next";
import { Check, ShieldCheck, FileCheck2, Building2, AlertTriangle } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Guarantee } from "@/components/ui/Guarantee";
import { DisclaimerBlock } from "@/components/ui/DisclaimerBlock";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { pageMetadata } from "@/lib/seo";
import {
  prequalPlatforms,
  complianceIncludes,
  complianceSteps,
  TRADEMARK_NOTE,
} from "@/data/compliance";

export const metadata: Metadata = pageMetadata({
  title: "ISNetworld, Avetta & Veriforce Safety Documents for Contractors",
  description:
    "Need to be 'compliant' for ISNetworld®, Avetta®, or Veriforce® to win or keep work? We build the written safety programs and forms contractors are commonly asked for — organized, editable, and ready to upload.",
  path: "/compliance",
});

export default function CompliancePage() {
  return (
    <>
      <PageHero
        eyebrow="Contractor prequalification"
        title="“You need to be in ISNetworld to keep working.” We've got you."
        intro="When a general contractor or client requires prequalification — ISNetworld®, Avetta®, Veriforce®, and others — they ask for written safety programs and forms. We build that documentation for your company, organized and ready to upload."
        crumbs={[{ label: "Prequalification Compliance" }]}
        primaryCta={{ label: "Start My Intake Form", href: "/intake?package=contractor-pro" }}
        secondaryCta={{ label: "See packages", href: "/custom-binder#packages" }}
      />

      {/* The problem */}
      <Section tone="light">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-3 justify-center">The situation</p>
          <h2 className="text-3xl font-display font-extrabold text-navy-950 sm:text-4xl">
            A client requirement shouldn&apos;t cost you the job
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-steel-600">
            More GCs and owners now require contractors to be prequalified before they can bid or
            stay on site. The hold-up is almost always the same: they ask for written safety
            programs and forms you don&apos;t have assembled yet. That&apos;s exactly what we build.
          </p>
        </div>
      </Section>

      {/* Platforms */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="Platforms we help with"
          title="Documentation for the systems contractors get asked about"
          intro="We provide the kinds of written programs and forms commonly requested during prequalification on these platforms."
        />
        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {prequalPlatforms.map((p) => (
            <Reveal key={p.name} as="div">
              <div className="card h-full p-5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-safety-700" />
                  <h3 className="text-base font-bold text-navy-950">
                    {p.name}
                    <span className="align-super text-xs text-steel-400">{p.mark}</span>
                  </h3>
                </div>
                <p className="mt-2 text-sm text-steel-600">{p.blurb}</p>
              </div>
            </Reveal>
          ))}
        </RevealGroup>
        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-steel-400">
          {TRADEMARK_NOTE}
        </p>
      </Section>

      {/* What's included */}
      <Section tone="light">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="eyebrow mb-3">What you get</p>
              <h2 className="text-3xl font-display font-extrabold text-navy-950 sm:text-4xl">
                A company-branded compliance binder
              </h2>
              <p className="mt-4 text-lg text-steel-600">
                Built around your trade, hazards, and the documents reviewers typically request —
                delivered editable and print-ready.
              </p>
              <ul className="mt-6 space-y-3">
                {complianceIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-navy-900 text-safety">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-steel-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button href="/intake?package=contractor-pro" variant="primary" size="lg">
                  Start My Intake Form
                </Button>
                <Button href="/custom-binder#packages" variant="outline" size="lg">
                  Compare packages
                </Button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-navy-100 bg-navy-950 p-6 text-white shadow-card-hover">
              <div className="flex items-center gap-2">
                <FileCheck2 className="h-5 w-5 text-safety" />
                <p className="text-sm font-semibold uppercase tracking-wide text-safety">
                  Built to respond — not to overpromise
                </p>
              </div>
              <p className="mt-3 text-navy-100/85">
                We give you organized, professional documentation to respond to requests with
                confidence. You review and submit it; you stay in control of your safety program.
              </p>
              <div className="mt-4 flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-navy-100/75">
                <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-safety" />
                <p>
                  We don&apos;t submit on your behalf and can&apos;t guarantee acceptance, approval,
                  or a passing score — every platform and client sets its own requirements.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Process */}
      <Section tone="dark">
        <SectionHeader
          tone="dark"
          eyebrow="How it works"
          title="From client requirement to uploaded documents"
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {complianceSteps.map((step, i) => (
            <Reveal key={step.step} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-safety text-sm font-bold text-navy-950">
                    {step.step}
                  </span>
                  <Building2 className="h-5 w-5 text-white/20" />
                </div>
                <h3 className="mt-5 text-base font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-100/70">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <Guarantee className="mx-auto max-w-5xl" />
        <DisclaimerBlock className="mx-auto mt-8 max-w-5xl" />
      </Section>

      <CtaBanner
        title="Don't lose work over missing paperwork"
        subtitle="Start the intake form and we'll assemble the safety documentation your prequalification needs."
      />
    </>
  );
}
