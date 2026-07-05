import { PageHero } from "@/components/layout/PageHero";

/**
 * Shared shell for Terms / Disclaimer / Privacy pages.
 * These are complete, standard legal pages. An attorney review is still
 * recommended to tailor them to your entity and jurisdiction.
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

          <div className="legal-prose">{children}</div>
        </div>
      </section>
    </>
  );
}
