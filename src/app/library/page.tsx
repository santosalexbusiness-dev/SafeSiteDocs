import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { CatalogBrowser } from "@/components/library/CatalogBrowser";
import { DisclaimerBlock } from "@/components/ui/DisclaimerBlock";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { pageMetadata } from "@/lib/seo";
import { totalDocuments, catalogCategories } from "@/data/libraryCatalog";

export const metadata: Metadata = pageMetadata({
  title: "Safety Document Library — 350+ Editable, Printable Templates",
  description:
    "Browse the full library of editable, printable construction safety templates — manuals, toolbox talks, JHAs, inspection checklists, training logs, and forms. Filter by category, industry, and type.",
  path: "/library",
});

export default function LibraryPage() {
  return (
    <>
      <PageHero
        eyebrow="Safety Document Library"
        title={`${totalDocuments} editable, printable safety templates`}
        intro={`Search and filter the full library across ${catalogCategories.length} categories by category, industry, hazard, and document type. Open any template to read it in full and print it or save it as a PDF.`}
        crumbs={[{ label: "Document Library" }]}
        primaryCta={{ label: "See plans", href: "/pricing" }}
        secondaryCta={{ label: "Browse by industry", href: "/library?industry=electrical" }}
      />

      <section className="bg-steel-50 py-12 sm:py-16">
        <div className="container">
          <div className="mb-6 rounded-xl border border-safety/30 bg-safety-50 p-4 text-sm text-steel-700">
            <strong className="font-semibold text-navy-900">Every template is viewable and printable.</strong>{" "}
            Open a template to read the full content, then use{" "}
            <span className="font-semibold">Print / Save as PDF</span>. Editable Word/PDF downloads
            unlock with a{" "}
            <a href="/pricing" className="link-underline">
              plan
            </a>
            .
          </div>

          <Suspense fallback={<div className="py-20 text-center text-steel-500">Loading library…</div>}>
            <CatalogBrowser />
          </Suspense>

          <DisclaimerBlock className="mt-10" />
        </div>
      </section>

      <CtaBanner
        title="Unlock editable Word & PDF downloads"
        subtitle="View and print every template here for free. A plan unlocks editable Word and PDF versions, updated regularly."
      />
    </>
  );
}
