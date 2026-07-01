/**
 * Marketing content blocks: the two-offers comparison, the custom binder
 * process, benefits, and trust copy. Kept here so copy edits live in one place.
 */

export const comparison = {
  diy: {
    name: "DIY Safety Document Library",
    tag: "Monthly subscription",
    summary: "Best for owners who want to manage it themselves.",
    points: [
      "Monthly subscription",
      "Editable safety templates",
      "Toolbox talks",
      "PPE forms",
      "Inspection checklists",
      "Training logs",
      "Incident report forms",
      "Updated regularly",
    ],
    cta: { label: "Browse the Library", href: "/library" },
  },
  dfy: {
    name: "Done-for-You Custom Safety Binder",
    tag: "One-time service",
    summary: "Best for companies that want it built for them.",
    points: [
      "One-time service",
      "You fill out a short intake form",
      "Binder is customized with your company information",
      "Includes relevant forms based on work type and hazards",
      "Delivered in editable and PDF formats",
      "Built around your industry and crew",
    ],
    cta: { label: "Build My Safety Binder", href: "/custom-binder" },
  },
} as const;

export type ProcessStep = { step: number; title: string; description: string; icon: string };

export const binderProcess: ProcessStep[] = [
  {
    step: 1,
    title: "Tell us about your company",
    description:
      "Fill out a short intake form — your trade, work type, hazards, equipment, crew size, and the states you work in.",
    icon: "ClipboardList",
  },
  {
    step: 2,
    title: "We identify what you need",
    description:
      "We review your intake and map the safety documents and forms that fit your business and hazards.",
    icon: "Search",
  },
  {
    step: 3,
    title: "We build your custom binder",
    description:
      "We assemble a safety binder branded with your company name and the programs relevant to your work.",
    icon: "FolderCog",
  },
  {
    step: 4,
    title: "You receive your files",
    description:
      "You get editable Word files and a clean, organized PDF binder ready to print or share.",
    icon: "PackageCheck",
  },
];

export type Benefit = { title: string; description: string; icon: string };

export const benefits: Benefit[] = [
  {
    title: "Save time on paperwork",
    description: "Stop building forms from scratch. Start from templates made for contractors.",
    icon: "Clock",
  },
  {
    title: "Look more organized",
    description: "Show clients and general contractors that your safety paperwork is in order.",
    icon: "Sparkles",
  },
  {
    title: "Everything in one place",
    description: "Keep your forms, logs, and templates organized and easy to find.",
    icon: "FolderKanban",
  },
  {
    title: "Standardize safety meetings",
    description: "Run consistent toolbox talks and keep clean training records.",
    icon: "Users",
  },
  {
    title: "Less confusion",
    description: "Know which forms to use instead of guessing what you need.",
    icon: "Lightbulb",
  },
  {
    title: "Easier onboarding",
    description: "Bring on new hires with a ready-made orientation packet.",
    icon: "UserPlus",
  },
  {
    title: "Ready before issues happen",
    description: "Have your paperwork prepared ahead of time, not scrambled together after.",
    icon: "ShieldCheck",
  },
];

export const trust = {
  heading: "Built by a safety professional, for contractors",
  body:
    "SafeSite Documents is built by a safety professional with a background in Environmental Health and Safety, Occupational Health and Safety, asbestos/lead safety, and electrical field work. These materials are written in plain language to be practical on a real jobsite — not buried in jargon.",
  // Intentionally NOT claiming "OSHA approved" / "guaranteed compliant" / "certified by OSHA".
  points: [
    "Environmental Health & Safety (EHS) background",
    "Occupational Health & Safety experience",
    "Asbestos & lead safety familiarity",
    "Hands-on electrical field work",
  ],
};

/** Short value props used as hero "options" after the cinematic intro. */
export const heroOptions = [
  {
    title: "Browse Safety Document Library",
    description: "A growing library of editable templates, talks, checklists, and forms.",
    href: "/library",
    icon: "LibraryBig",
  },
  {
    title: "Build My Custom Safety Binder",
    description: "Answer a few questions and we build a binder around your company.",
    href: "/custom-binder",
    icon: "FolderCog",
  },
  {
    title: "View Sample Documents",
    description: "See the quality and format before you buy. Free samples included.",
    href: "/samples",
    icon: "FileSearch",
  },
];
