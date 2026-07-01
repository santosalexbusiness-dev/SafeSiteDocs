import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { catalog } from "@/data/libraryCatalog";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || site.url;

/** Public, indexable routes. Account/admin/confirmation pages are excluded. */
const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/library", priority: 0.9, changeFrequency: "daily" },
  { path: "/custom-binder", priority: 0.9, changeFrequency: "monthly" },
  { path: "/compliance", priority: 0.9, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/categories", priority: 0.8, changeFrequency: "weekly" },
  { path: "/samples", priority: 0.8, changeFrequency: "weekly" },
  { path: "/intake", priority: 0.7, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/about", priority: 0.5, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/disclaimer", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // Every template's printable detail page.
  const docs: MetadataRoute.Sitemap = catalog.map((d) => ({
    url: `${baseUrl}/library/${d.id}`,
    lastModified: new Date(d.lastUpdated),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...base, ...docs];
}
