import { Download, Lock, Info, CalendarClock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { categoryBySlug } from "@/data/categories";
import { formatMonth } from "@/lib/utils";
import { DOCUMENT_DISCLAIMER, type SafetyDocument } from "@/data/documents";

const accessLabel: Record<SafetyDocument["access"], { label: string; variant: "safety" | "navy" | "success" }> = {
  starter: { label: "Starter", variant: "navy" },
  pro: { label: "Pro", variant: "safety" },
  "free-sample": { label: "Free Sample", variant: "success" },
};

/**
 * @param locked  When true (public/library preview without entitlement),
 *                download buttons are replaced with an upgrade lock state.
 */
export function DocumentCard({
  doc,
  locked = false,
}: {
  doc: SafetyDocument;
  locked?: boolean;
}) {
  const category = categoryBySlug(doc.category);
  const access = accessLabel[doc.access];
  const isLocked = locked && doc.access !== "free-sample";

  return (
    <article className="card flex flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="muted">{category?.name ?? doc.documentType}</Badge>
          <Badge variant={access.variant}>{access.label}</Badge>
        </div>
        <span className="text-xs font-medium text-steel-400">{doc.formats.join(" · ")}</span>
      </div>

      <h3 className="mt-3 text-base font-bold leading-snug text-navy-950">{doc.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-steel-600">{doc.description}</p>

      {/* Recommended-for tags */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {doc.recommendedFor.map((r) => (
          <span key={r} className="chip">
            {r}
          </span>
        ))}
      </div>

      {/* How to use */}
      <div className="mt-4 rounded-lg bg-navy-50 p-3">
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-navy-700">
          <Info className="h-3.5 w-3.5 text-safety-700" /> How to use this document
        </p>
        <p className="mt-1 text-xs leading-relaxed text-steel-600">{doc.howToUse}</p>
      </div>

      <div className="mt-4 flex items-center gap-1.5 text-xs text-steel-500">
        <CalendarClock className="h-3.5 w-3.5" />
        Last updated {formatMonth(doc.lastUpdated)} · {doc.pages} {doc.pages === 1 ? "page" : "pages"}
      </div>

      {/* Download / lock actions */}
      <div className="mt-4 flex gap-2 border-t border-navy-100 pt-4">
        {isLocked ? (
          <a
            href="/pricing"
            className="btn btn-outline btn-md w-full"
          >
            <Lock className="h-4 w-4" /> Unlock with a plan
          </a>
        ) : (
          doc.formats.map((fmt) => (
            <a
              key={fmt}
              // Wire to a signed download URL (storage/CMS) gated by entitlement.
              href={`#download-${doc.id}-${fmt.toLowerCase()}`}
              className="btn btn-outline btn-md flex-1"
            >
              <Download className="h-4 w-4" /> {fmt}
            </a>
          ))
        )}
      </div>

      <p className="mt-3 text-[0.68rem] leading-snug text-steel-400">{DOCUMENT_DISCLAIMER}</p>
    </article>
  );
}
