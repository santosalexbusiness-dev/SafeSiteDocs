/**
 * Document categories shown on the home grid, /categories, and used as
 * library filters. `icon` maps to a lucide-react icon in <CategoryCard/>.
 */
export type Category = {
  slug: string;
  name: string;
  icon: string;
  description: string;
  /** Approximate count for display ("24 documents"). Wire to DB later. */
  count: number;
};

export const categories: Category[] = [
  {
    slug: "safety-manuals",
    name: "Safety Manuals",
    icon: "BookOpenCheck",
    description: "Editable written safety program manuals you can brand and adapt to your company.",
    count: 18,
  },
  {
    slug: "toolbox-talks",
    name: "Toolbox Talks",
    icon: "MessagesSquare",
    description: "Short, ready-to-run safety meeting topics with sign-in sheets.",
    count: 120,
  },
  {
    slug: "ppe-forms",
    name: "PPE Forms",
    icon: "HardHat",
    description: "Hazard assessments, PPE issue logs, and acknowledgement forms.",
    count: 22,
  },
  {
    slug: "jha-jsa",
    name: "Job Hazard Analysis",
    icon: "ClipboardList",
    description: "JHA / JSA templates to break tasks into steps, hazards, and controls.",
    count: 30,
  },
  {
    slug: "training-logs",
    name: "Training Logs",
    icon: "GraduationCap",
    description: "Attendance sheets, training matrices, and certification trackers.",
    count: 16,
  },
  {
    slug: "inspection-checklists",
    name: "Inspection Checklists",
    icon: "ListChecks",
    description: "Daily, weekly, and equipment inspection checklists for the jobsite.",
    count: 40,
  },
  {
    slug: "incident-reports",
    name: "Incident Reports",
    icon: "FileWarning",
    description: "Incident, near-miss, and investigation forms with witness sections.",
    count: 12,
  },
  {
    slug: "emergency-action-plans",
    name: "Emergency Action Plans",
    icon: "Siren",
    description: "Emergency action and fire prevention plan templates with muster maps.",
    count: 9,
  },
  {
    slug: "hazcom-sds",
    name: "Hazard Communication / SDS",
    icon: "FlaskConical",
    description: "Written HazCom program, chemical inventory, and SDS index tools.",
    count: 14,
  },
  {
    slug: "lockout-tagout",
    name: "Lockout / Tagout",
    icon: "Lock",
    description: "LOTO program, machine-specific procedures, and periodic audit forms.",
    count: 15,
  },
  {
    slug: "fall-protection",
    name: "Fall Protection",
    icon: "MoveDown",
    description: "Fall protection plans, harness inspection logs, and rescue planning.",
    count: 17,
  },
  {
    slug: "ladder-safety",
    name: "Ladder Safety",
    icon: "Construction",
    description: "Ladder inspection checklists and safe-use toolbox talks.",
    count: 8,
  },
  {
    slug: "electrical-safety",
    name: "Electrical Safety",
    icon: "Zap",
    description: "Electrical safe work practices, GFCI checks, and qualified-person forms.",
    count: 19,
  },
  {
    slug: "heat-stress",
    name: "Heat Stress",
    icon: "ThermometerSun",
    description: "Heat illness prevention plans, acclimatization logs, and water/rest/shade tools.",
    count: 7,
  },
  {
    slug: "new-hire-orientation",
    name: "New-Hire Safety Orientation",
    icon: "UserCheck",
    description: "Onboarding packets, orientation checklists, and policy acknowledgements.",
    count: 11,
  },
];

export const categoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);
