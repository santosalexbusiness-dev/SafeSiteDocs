import type { Metadata } from "next";
import { site } from "@/data/site";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || site.url;

/** Root metadata shared across all pages (title template + social defaults). */
export const baseMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${site.name} — Safety Templates & Custom Binders for Contractors`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "safety document templates for contractors",
    "construction safety manual template",
    "contractor safety binder",
    "OSHA safety forms for small business",
    "toolbox talks for contractors",
    "electrical contractor safety manual",
    "PPE forms for construction",
    "job hazard analysis template",
    "safety training log template",
    "custom safety manual for small business",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Safety Paperwork for Contractors`,
    description: site.description,
    url: baseUrl,
    locale: "en_US",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Safety Paperwork for Contractors`,
    description: site.description,
    images: ["/og.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "business",
};

/** Per-page metadata helper. Keeps canonical URLs + titles consistent. */
export function pageMetadata({
  title,
  description,
  path = "/",
  noindex = false,
}: {
  title: string;
  description: string;
  path?: string;
  noindex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · ${site.name}`,
      description,
      url: path,
    },
    twitter: { title: `${title} · ${site.name}`, description },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

/** Organization + Website JSON-LD for richer search results. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: baseUrl,
    email: site.email,
    description: site.description,
    sameAs: Object.values(site.social),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.salesEmail,
      telephone: site.phone,
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/library?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/** FAQPage JSON-LD from a list of Q&A pairs. */
export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  };
}
