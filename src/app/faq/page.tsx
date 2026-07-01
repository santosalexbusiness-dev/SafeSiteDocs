import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { faqs, faqGroups } from "@/data/faq";

export const metadata: Metadata = pageMetadata({
  title: "FAQ — Safety Library & Custom Binder Questions",
  description:
    "Answers about the contractor safety document library, custom safety binders, formats, editing, compliance limits, billing, and cancellation.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero
        eyebrow="FAQ"
        title="Questions, answered straight"
        intro="If you don't see your question here, reach out — we'd rather give you a clear answer than have you guess."
        crumbs={[{ label: "FAQ" }]}
        primaryCta={{ label: "Contact us", href: "/contact" }}
      />

      <Section tone="light">
        <div className="mx-auto max-w-3xl space-y-12">
          {faqGroups.map((group) => {
            const items = faqs.filter((f) => f.group === group);
            return (
              <div key={group}>
                <h2 className="mb-4 text-xl font-display font-extrabold text-navy-950">{group}</h2>
                <Accordion items={items.map((f) => ({ question: f.question, answer: f.answer }))} />
              </div>
            );
          })}
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
