import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PricingSection } from "@/components/sections/PricingSection";
import { Reviews } from "@/components/sections/Reviews";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Accordion } from "@/components/ui/Accordion";
import { Guarantee } from "@/components/ui/Guarantee";
import { Section, SectionHeader } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { faqs } from "@/data/faq";

export const metadata: Metadata = pageMetadata({
  title: "Pricing — Safety Library & Custom Binder Packages",
  description:
    "Simple pricing for contractor safety paperwork. Subscribe to the safety document library from $49/month, or get a one-time custom safety binder from $799.",
  path: "/pricing",
});

const billingFaqs = faqs.filter((f) => f.group === "Billing" || f.group === "Custom Binder");

export default function PricingPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(billingFaqs)} />
      <PageHero
        eyebrow="Pricing"
        title="Pricing that fits how contractors actually work"
        intro="Month-to-month access to the document library, or a one-time custom binder built for your company. Cancel the subscription anytime."
        crumbs={[{ label: "Pricing" }]}
        primaryCta={{ label: "Get the Library", href: "/library" }}
        secondaryCta={{ label: "Build My Binder", href: "/custom-binder" }}
      />

      <PricingSection tone="light" showDisclaimer />

      <section className="bg-white pb-8">
        <div className="container">
          <Guarantee />
        </div>
      </section>

      <Reviews limit={3} tone="muted" />

      <Section tone="light">
        <SectionHeader
          eyebrow="Pricing questions"
          title="Common pricing & billing questions"
          intro="Still deciding? Here are the answers contractors ask most before they buy."
        />
        <div className="mx-auto mt-10 max-w-3xl">
          <Accordion items={billingFaqs.map((f) => ({ question: f.question, answer: f.answer }))} />
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
