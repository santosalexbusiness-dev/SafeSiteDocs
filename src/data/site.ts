/**
 * Central brand + navigation config. Update copy here and it flows
 * through the header, footer, metadata, and structured data.
 */

export const site = {
  name: "SafeSite Documents",
  shortName: "SafeSite",
  tagline: "Safety paperwork for contractors — organized, editable, and ready when you need it.",
  description:
    "Get access to a growing library of editable safety templates, toolbox talks, checklists, and forms — or have a custom safety binder built for your construction company.",
  url: "https://safesitedocs.com",
  email: "contact@safesitedocs.org",
  salesEmail: "contact@safesitedocs.org",
  // Realistic placeholder. Swap for your real handles before launch.
  social: {
    linkedin: "https://www.linkedin.com/company/safesite-documents",
    facebook: "https://www.facebook.com/safesitedocuments",
    instagram: "https://www.instagram.com/safesitedocuments",
  },
} as const;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Document Library", href: "/library" },
  { label: "Custom Binder", href: "/custom-binder" },
  { label: "Compliance", href: "/compliance" },
  { label: "Free Pack", href: "/samples" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
];

export const footerNav: { heading: string; links: NavItem[] }[] = [
  {
    heading: "Products",
    links: [
      { label: "Safety Document Library", href: "/library" },
      { label: "Custom Safety Binder", href: "/custom-binder" },
      { label: "Prequalification Compliance", href: "/compliance" },
      { label: "Document Categories", href: "/categories" },
      { label: "Free Starter Pack", href: "/samples" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Start Intake Form", href: "/intake" },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "Log In", href: "/login" },
      { label: "Customer Dashboard", href: "/dashboard" },
      { label: "Document Library", href: "/dashboard/library" },
      { label: "Admin", href: "/admin" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms of Use", href: "/terms" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

/**
 * The single source of truth for the site-wide disclaimer.
 * Reused in the footer block, Terms, and Disclaimer pages.
 */
export const MASTER_DISCLAIMER =
  "SafeSite Documents gives you the safety resources, templates, and educational materials to build your program from — the starting point, not the finished product. They are not legal advice and do not guarantee OSHA compliance or prevent citations, penalties, injuries, or losses. Keeping your company and worksites compliant is your responsibility: you are the one who must review and adapt every document to your operations, evaluate your own worksites, follow applicable federal, state, and local requirements, train your employees, maintain your records, and consult a qualified safety, legal, or regulatory professional when needed. Using these materials does not create a consultant-client, attorney-client, or compliance-guarantee relationship.";

/** Checkbox text required before purchase and intake submission. */
export const TERMS_ACKNOWLEDGEMENT =
  "I understand these documents are templates and educational resources. I remain responsible for my company's safety program, worksite compliance, employee training, and final document review.";

/** Hero fine-print about penalty figures. */
export const PENALTY_DISCLAIMER =
  "Penalty examples based on current Federal OSHA maximums. Actual penalties vary by situation, jurisdiction, employer size, history, gravity, and OSHA policy.";
