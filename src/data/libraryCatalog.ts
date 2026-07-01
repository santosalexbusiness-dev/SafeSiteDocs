/**
 * Loads the full generated safety document library (all 352 templates) into the
 * website. Source of truth is /safety-doc-library, produced by
 * scripts/generate-library.mjs. Regenerate that, and the site updates.
 */
import catalogJson from "../../safety-doc-library/documents.json";
import industryJson from "../../safety-doc-library/by-industry.json";

export type AccessLevel = "Starter" | "Pro" | "Custom Binder";

export type CatalogDoc = {
  id: string;
  title: string;
  category: string;
  categoryName: string;
  industry: string;
  documentType: string;
  tags: string[];
  description: string;
  accessLevel: AccessLevel;
  fileType: string;
  formats: string[];
  fileName: string;
  lastReviewed: string;
  lastUpdated: string;
  route: string;
  filePath: string;
  downloadUrlPlaceholder: string;
  isSample: boolean;
};

export const catalog = catalogJson.documents as CatalogDoc[];
export const catalogCategories = catalogJson.categories as {
  slug: string;
  name: string;
  count: number;
}[];
export const universalDisclaimer = catalogJson.universalDisclaimer as string;
export const totalDocuments = catalog.length;

/** Unique document types, ordered by the generator's logical type order. */
export const documentTypes = (industryJson.typeOrder as string[]).filter((t) =>
  catalog.some((d) => d.documentType === t)
);

/** Served industries (from the by-industry views) for the industry filter. */
export const industryOptions = (industryJson.industries as { slug: string; name: string }[]).map(
  (i) => ({ value: i.slug, label: i.name })
);

/** Maps an industry filter slug to the catalog `industry` value tailored to it. */
const INDUSTRY_MATCH: Record<string, string> = {
  electrical: "Electrical",
  general: "General",
  hvac: "HVAC",
  plumbing: "Plumbing",
  roofing: "Roofing",
  remodeling: "Remodeling",
  concrete: "Concrete",
  landscaping: "Landscaping",
  painting: "__none__",
  "property-maintenance": "Property Maintenance",
};

/**
 * Industry matching mirrors the by-industry views: a trade includes the
 * documents tailored to it PLUS every universal ("All") document.
 */
export function matchesIndustry(doc: CatalogDoc, slug: string): boolean {
  if (!slug || slug === "all") return true;
  return doc.industry === INDUSTRY_MATCH[slug] || doc.industry === "All";
}

export const getDoc = (id: string) => catalog.find((d) => d.id === id);

/** A few related documents (same category first, then same industry). */
export function relatedDocs(doc: CatalogDoc, n = 6): CatalogDoc[] {
  const sameCategory = catalog.filter((d) => d.id !== doc.id && d.category === doc.category);
  const pool = [...sameCategory];
  if (pool.length < n) {
    const more = catalog.filter(
      (d) => d.id !== doc.id && !pool.includes(d) && d.documentType === doc.documentType
    );
    pool.push(...more);
  }
  return pool.slice(0, n);
}

export const accessLevels: AccessLevel[] = ["Starter", "Pro", "Custom Binder"];
