import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowLeft, Lock, FileSignature, BadgeCheck } from "lucide-react";
import { PrintButton } from "@/components/library/PrintButton";
import { AutoPrint } from "@/components/library/AutoPrint";
import { Paywall } from "@/components/library/Paywall";
import { DocumentSignOff } from "@/components/sign/DocumentSignOff";
import { getSignConfig } from "@/lib/signing";
import { Badge } from "@/components/ui/Badge";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { renderDocHtml, renderDocPreviewHtml } from "@/lib/docContent";
import { getDoc, relatedDocs } from "@/data/libraryCatalog";
import { getSessionUser, getAccessTier, canViewDoc } from "@/lib/auth";
import { formatMonth } from "@/lib/utils";

// Rendered per-request: what you see depends on your subscription.
export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const doc = getDoc(params.id);
  if (!doc) return {};
  return pageMetadata({
    title: `${doc.title} — Editable, Printable Template`,
    description: doc.description,
    path: `/library/${doc.id}`,
  });
}

export default async function DocumentPage({ params }: { params: { id: string } }) {
  const doc = getDoc(params.id);
  if (!doc) notFound();

  const user = await getSessionUser();
  const tier = await getAccessTier(user);
  const unlocked = canViewDoc(doc, tier);

  const html = unlocked ? renderDocHtml(doc.filePath) : renderDocPreviewHtml(doc.filePath);
  const related = relatedDocs(doc, 6);
  const sign = getSignConfig(doc.documentType, doc.title);

  return (
    <section className="bg-steel-50">
      {unlocked ? <AutoPrint /> : null}
      <div className="container py-8 lg:py-10">
        {/* Action bar — hidden when printing */}
        <div data-no-print>
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1 text-xs text-steel-500">
              <li>
                <Link href="/" className="hover:text-navy-900">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-1">
                <ChevronRight className="h-3 w-3" />
                <Link href="/library" className="hover:text-navy-900">
                  Library
                </Link>
              </li>
              <li className="flex items-center gap-1">
                <ChevronRight className="h-3 w-3" />
                <Link href={`/library?category=${doc.category}`} className="hover:text-navy-900">
                  {doc.categoryName}
                </Link>
              </li>
              <li className="flex items-center gap-1">
                <ChevronRight className="h-3 w-3" />
                <span className="text-navy-700">{doc.title}</span>
              </li>
            </ol>
          </nav>

          <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-navy-100 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="muted">{doc.categoryName}</Badge>
              <Badge variant={doc.accessLevel === "Pro" ? "safety" : "navy"}>
                {doc.isSample ? "Free sample" : doc.accessLevel}
              </Badge>
              <Badge variant="outline">{doc.documentType}</Badge>
              {doc.industry !== "All" ? <Badge variant="outline">{doc.industry}</Badge> : null}
              {unlocked && !doc.isSample ? (
                <Badge variant="safety">
                  <BadgeCheck className="mr-1 h-3.5 w-3.5" /> Unlocked
                </Badge>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/library" className="btn btn-outline btn-md">
                <ArrowLeft className="h-4 w-4" /> Library
              </Link>
              {unlocked ? (
                <>
                  {sign.kind !== "none" ? (
                    <a href="#sign" className="btn btn-secondary btn-md">
                      <FileSignature className="h-4 w-4" /> Sign online
                    </a>
                  ) : null}
                  <PrintButton />
                </>
              ) : (
                <Link
                  href="/pricing"
                  className="btn btn-primary btn-md"
                  title="Full access with a library plan"
                >
                  <Lock className="h-4 w-4" /> Unlock full template
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          {/* The printable document (or its preview) */}
          <div className="min-w-0">
            <article
              id="print"
              className={`doc-paper doc-prose rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-10 ${
                doc.isSample ? "" : "paywalled"
              }`}
              dangerouslySetInnerHTML={{ __html: html }}
            />
            {!unlocked ? (
              <div className="mt-2">
                <Paywall
                  docTitle={doc.title}
                  requiredLevel={doc.accessLevel === "Starter" ? "Starter" : "Pro"}
                  signedIn={Boolean(user)}
                  docRoute={doc.route}
                />
              </div>
            ) : null}
          </div>

          {/* Sidebar — hidden when printing */}
          <aside data-no-print className="space-y-5">
            <div className="rounded-2xl border border-navy-100 bg-white p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-steel-500">Details</h2>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-steel-500">Category</dt>
                  <dd className="text-right font-medium text-navy-900">{doc.categoryName}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-steel-500">Type</dt>
                  <dd className="text-right font-medium text-navy-900">{doc.documentType}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-steel-500">Industry</dt>
                  <dd className="text-right font-medium text-navy-900">{doc.industry}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-steel-500">Access</dt>
                  <dd className="text-right font-medium text-navy-900">
                    {doc.isSample ? "Free sample" : doc.accessLevel}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-steel-500">Formats</dt>
                  <dd className="text-right font-medium text-navy-900">{doc.formats.join(", ")}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-steel-500">Updated</dt>
                  <dd className="text-right font-medium text-navy-900">{formatMonth(doc.lastUpdated)}</dd>
                </div>
              </dl>
              <div className="mt-4">
                {unlocked ? (
                  <PrintButton className="btn btn-primary btn-md w-full" />
                ) : (
                  <Link href="/pricing" className="btn btn-primary btn-md w-full">
                    <Lock className="h-4 w-4" /> Unlock full template
                  </Link>
                )}
              </div>
            </div>

            {doc.tags.length ? (
              <div className="rounded-2xl border border-navy-100 bg-white p-5">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-steel-500">Tags</h2>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {doc.tags.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {related.length ? (
              <div className="rounded-2xl border border-navy-100 bg-white p-5">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-steel-500">
                  Related templates
                </h2>
                <ul className="mt-3 space-y-2">
                  {related.map((r) => (
                    <li key={r.id}>
                      <Link
                        href={`/library/${r.id}`}
                        className="text-sm font-medium text-navy-700 hover:text-navy-900"
                      >
                        {r.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>

        {unlocked && sign.kind !== "none" ? (
          <section id="sign" data-no-print className="mt-8 scroll-mt-24">
            <DocumentSignOff docId={doc.id} title={doc.title} config={sign} />
          </section>
        ) : null}
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: doc.title,
          about: doc.categoryName,
          genre: doc.documentType,
          description: doc.description,
          dateModified: doc.lastUpdated,
          isAccessibleForFree: doc.isSample,
          ...(doc.isSample
            ? {}
            : {
                hasPart: {
                  "@type": "WebPageElement",
                  isAccessibleForFree: false,
                  cssSelector: ".paywalled",
                },
              }),
        }}
      />
    </section>
  );
}
