import Link from "next/link";
import { ArrowRight, Printer, FileText, CalendarClock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatMonth } from "@/lib/utils";
import type { CatalogDoc } from "@/data/libraryCatalog";

const accessVariant: Record<CatalogDoc["accessLevel"], "navy" | "safety" | "muted"> = {
  Starter: "navy",
  Pro: "safety",
  "Custom Binder": "muted",
};

export function CatalogCard({ doc }: { doc: CatalogDoc }) {
  return (
    <article className="card flex flex-col p-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="muted">{doc.categoryName}</Badge>
        <Badge variant={accessVariant[doc.accessLevel]}>{doc.accessLevel}</Badge>
        {doc.industry !== "All" ? <Badge variant="outline">{doc.industry}</Badge> : null}
      </div>

      <h3 className="mt-3 text-base font-bold leading-snug text-navy-950">
        <Link href={`/library/${doc.id}`} className="hover:text-navy-700">
          {doc.title}
        </Link>
      </h3>
      <p className="mt-1.5 line-clamp-3 flex-1 text-sm leading-relaxed text-steel-600">
        {doc.description}
      </p>

      <div className="mt-3 flex items-center gap-3 text-xs text-steel-500">
        <span className="inline-flex items-center gap-1">
          <FileText className="h-3.5 w-3.5" /> {doc.documentType}
        </span>
        <span className="inline-flex items-center gap-1">
          <CalendarClock className="h-3.5 w-3.5" /> {formatMonth(doc.lastUpdated)}
        </span>
      </div>

      <div className="mt-4 flex gap-2 border-t border-navy-100 pt-4">
        <Link href={`/library/${doc.id}`} className="btn btn-secondary btn-md flex-1">
          View & Print <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href={`/library/${doc.id}#print`}
          className="btn btn-outline btn-md"
          aria-label={`Print ${doc.title}`}
        >
          <Printer className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
