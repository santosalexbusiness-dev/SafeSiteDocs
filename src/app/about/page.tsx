import type { Metadata } from "next";
import { HardHat, Compass, Handshake, PenTool } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { DisclaimerBlock } from "@/components/ui/DisclaimerBlock";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { trust } from "@/data/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About — Built by a Safety Professional for Contractors",
  description:
    "SafeSite Documents is built by a safety professional with an EHS, occupational health and safety, asbestos/lead, and electrical field background — making practical safety paperwork for small contractors.",
  path: "/about",
});

const values = [
  { icon: PenTool, title: "Practical over polished", body: "Documents written to be used on a jobsite, not to sit in a drawer looking impressive." },
  { icon: Compass, title: "Plain language", body: "We skip the jargon. If a foreman can't read it in five minutes, we rewrite it." },
  { icon: Handshake, title: "Honest about limits", body: "We tell you what these documents are — and what they aren't. No false promises." },
  { icon: HardHat, title: "Built for the trades", body: "Made for electricians, roofers, HVAC, plumbers, and GCs — not office cubicles." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About SafeSite Documents"
        title="Safety paperwork shouldn't slow you down"
        intro="We started SafeSite Documents because small contractors were stuck between expensive consultants and a pile of mismatched templates from the internet. There's a better middle ground."
        crumbs={[{ label: "About" }]}
      />

      {/* Story */}
      <Section tone="light">
        <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-steel-700">
          <p>
            Most small contractors don&apos;t have a full-time safety manager. The owner is on the
            tools, running the crew, bidding the next job — and somewhere in there they&apos;re
            supposed to keep safety paperwork organized, current, and ready when a general
            contractor or client asks for it.
          </p>
          <p>
            SafeSite Documents fixes the paperwork side of that problem. We make editable safety
            templates, toolbox talks, checklists, and forms that are actually usable — and we build
            custom safety binders for companies that would rather have it done for them.
          </p>
          <p>
            The goal is simple: help you spend less time wrestling with documents and more time
            running your business, while looking organized and prepared to the people who matter.
          </p>
        </div>
      </Section>

      {/* Background / credentials */}
      <Section tone="muted">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="eyebrow mb-3">The background</p>
              <h2 className="text-3xl font-display font-extrabold text-navy-950 sm:text-4xl">
                {trust.heading}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-steel-600">{trust.body}</p>
              <ul className="mt-6 space-y-2.5">
                {trust.points.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-sm font-medium text-navy-800">
                    <span className="h-1.5 w-1.5 rounded-full bg-safety" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
              <p className="text-sm font-semibold uppercase tracking-wide text-safety-700">
                What we are — and aren&apos;t
              </p>
              <div className="mt-4 space-y-4 text-sm text-steel-700">
                <p>
                  <strong className="text-navy-900">We are</strong> a source of practical safety
                  document templates and a done-for-you binder service for contractors.
                </p>
                <p>
                  <strong className="text-navy-900">We are not</strong> a law firm, a compliance
                  guarantor, or affiliated with OSHA. We don&apos;t claim to be &ldquo;OSHA
                  approved&rdquo; or &ldquo;guaranteed compliant.&rdquo;
                </p>
                <p>
                  You stay responsible for your worksite, your training, your records, and your
                  final document review.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Values */}
      <Section tone="light">
        <SectionHeader eyebrow="How we work" title="What we care about" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => {
            const ValueIcon = v.icon;
            return (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="card h-full p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-safety/15 text-safety-700">
                    <ValueIcon className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-navy-950">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-steel-600">{v.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <DisclaimerBlock className="mx-auto mt-14 max-w-4xl" />
      </Section>

      <CtaBanner />
    </>
  );
}
