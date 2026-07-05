import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { IntakeForm } from "@/components/forms/IntakeForm";
import { DisclaimerBlock } from "@/components/ui/DisclaimerBlock";
import { PurchaseConversion } from "@/components/analytics/PurchaseConversion";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Custom Binder Intake Form",
  description:
    "Start your custom safety binder. Tell us about your company, work type, hazards, equipment, crew size, and states, and we'll build a binder matched to your business.",
  path: "/intake",
});

export default function IntakePage({
  searchParams,
}: {
  searchParams: { package?: string };
}) {
  return (
    <>
      <Suspense fallback={null}>
        <PurchaseConversion />
      </Suspense>
      <PageHero
        eyebrow="Custom binder intake"
        title="Let's build your safety binder"
        intro="This takes about 10 minutes. The more detail you give us, the better we can match the right documents to your business. Required fields are marked with an asterisk."
        crumbs={[{ label: "Custom Binder", href: "/custom-binder" }, { label: "Intake Form" }]}
      />

      <section className="bg-steel-50 py-12 sm:py-16">
        <div className="container max-w-3xl">
          <IntakeForm defaultPackage={searchParams.package ?? ""} />
          <DisclaimerBlock className="mt-8" />
        </div>
      </section>
    </>
  );
}
