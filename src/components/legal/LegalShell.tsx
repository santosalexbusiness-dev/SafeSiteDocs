import { Scale } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";

/**
 * Shared shell for Terms / Disclaimer / Privacy pages.
 * IMPORTANT: These are strong placeholder documents. Have a qualified attorney
 * review and finalize all legal pages before launch.
 */
export function LegalShell({
  title,
  intro,
  lastUpdated,
  children,
}: {
  title: string;
  intro: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} intro={intro} crumbs={[{ label: title }]} />

      <section className="bg-white py-14 sm:py-16">
        <div className="container max-w-3xl">
          <p className="mb-8 text-sm text-steel-500">Last updated: {lastUpdated}</p>

          {/* Attorney-review reminder (placeholder language). */}
          <div className="mb-8 flex gap-3 rounded-xl border border-navy-100 bg-navy-50 p-4">
            <Scale className="mt-0.5 h-5 w-5 flex-shrink-0 text-safety-700" aria-hidden />
            <p className="text-sm text-steel-600">
              <strong className="text-navy-900">Placeholder notice:</strong> This document is
              provided as strong placeholder language and is not legal advice. Have a qualified
              attorney review and finalize all legal pages before launch.
            </p>
          </div>

          <div className="legal-prose">{children}</div>
        </div>
      </section>
    </>
  );
}
