import type { Metadata } from "next";
import { Suspense } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { CatalogBrowser } from "@/components/library/CatalogBrowser";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Document Library — Dashboard",
  description: "Search, filter, and download your full safety document library.",
  path: "/dashboard/library",
  noindex: true,
});

export default function DashboardLibraryPage() {
  return (
    <DashboardShell
      role="customer"
      title="Document Library"
      subtitle="Your full library — search, filter, then open any template to use or print it."
      actions={
        <Button href="/dashboard" variant="outline" size="sm">
          Back to overview
        </Button>
      }
    >
      <Suspense fallback={<div className="py-20 text-center text-steel-500">Loading library…</div>}>
        {/* Full catalog — each template opens to a printable page. */}
        <CatalogBrowser />
      </Suspense>
    </DashboardShell>
  );
}
