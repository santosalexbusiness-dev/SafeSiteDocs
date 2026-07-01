import type { MetadataRoute } from "next";
import { site } from "@/data/site";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || site.url;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Keep private/account areas out of search results.
        disallow: ["/dashboard", "/admin", "/login", "/intake/confirmation", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
