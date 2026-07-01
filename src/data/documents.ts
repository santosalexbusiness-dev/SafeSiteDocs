/**
 * Document records that power the library, sample, and dashboard views.
 * In production these would come from the database / CMS (see prisma/schema.prisma
 * `Document` model). Each record carries the metadata the library filters on
 * plus the per-document instructions and disclaimer the spec calls for.
 */
export type AccessTier = "starter" | "pro" | "free-sample";
export type DocFormat = "DOCX" | "PDF" | "XLSX";

export type SafetyDocument = {
  id: string;
  title: string;
  category: string; // category slug
  documentType: string;
  industries: string[]; // industry slugs, "all" allowed
  hazards: string[];
  access: AccessTier;
  formats: DocFormat[];
  lastUpdated: string; // ISO date
  recommendedFor: string[];
  howToUse: string;
  description: string;
  pages: number;
};

/** Shared per-document disclaimer (attached to every document card). */
export const DOCUMENT_DISCLAIMER =
  "Template / educational resource only. Not legal advice and not a guarantee of OSHA compliance. Review and adapt for your worksite before use.";

export const documents: SafetyDocument[] = [
  {
    id: "doc-ehs-manual",
    title: "Company Safety Program Manual",
    category: "safety-manuals",
    documentType: "Manual",
    industries: ["general", "electrical", "hvac", "plumbing", "remodeling"],
    hazards: ["general"],
    access: "pro",
    formats: ["DOCX", "PDF"],
    lastUpdated: "2026-06-01",
    recommendedFor: ["Company owners", "Safety coordinators"],
    howToUse:
      "Replace the [Company Name] fields, delete sections that don't apply to your work, and have leadership review before distributing to crews.",
    description:
      "A complete written safety program shell covering responsibilities, training, recordkeeping, and core programs you can tailor to your company.",
    pages: 48,
  },
  {
    id: "doc-toolbox-ladder",
    title: "Toolbox Talk: Ladder Safety",
    category: "toolbox-talks",
    documentType: "Toolbox Talk",
    industries: ["all"],
    hazards: ["ladders", "falls"],
    access: "free-sample",
    formats: ["DOCX", "PDF"],
    lastUpdated: "2026-05-18",
    recommendedFor: ["Foremen", "Crew leads"],
    howToUse:
      "Print or pull up on a phone, read the talking points to the crew, then pass around the sign-in sheet on the last page.",
    description:
      "A 10-minute talk on choosing, setting up, and climbing ladders safely, with a built-in attendance sheet.",
    pages: 2,
  },
  {
    id: "doc-jha-template",
    title: "Job Hazard Analysis (JHA) Template",
    category: "jha-jsa",
    documentType: "JHA / JSA",
    industries: ["all"],
    hazards: ["general"],
    access: "starter",
    formats: ["DOCX", "XLSX", "PDF"],
    lastUpdated: "2026-06-10",
    recommendedFor: ["Foremen", "Safety coordinators"],
    howToUse:
      "List the task steps in the first column, the hazards for each step in the second, and the controls in the third. Review with the crew before the task.",
    description:
      "Break any task into steps, identify the hazards in each step, and document the controls — the backbone of a daily safety routine.",
    pages: 1,
  },
  {
    id: "doc-ppe-assessment",
    title: "PPE Hazard Assessment & Certification",
    category: "ppe-forms",
    documentType: "Assessment",
    industries: ["all"],
    hazards: ["ppe"],
    access: "starter",
    formats: ["DOCX", "PDF"],
    lastUpdated: "2026-04-22",
    recommendedFor: ["Safety coordinators", "Owners"],
    howToUse:
      "Walk each work area, check the PPE required for the hazards present, and sign/date to certify the assessment was completed.",
    description:
      "Documents the workplace hazard assessment that supports your PPE selection, with a certification block.",
    pages: 3,
  },
  {
    id: "doc-incident-report",
    title: "Incident & Near-Miss Report Form",
    category: "incident-reports",
    documentType: "Form",
    industries: ["all"],
    hazards: ["general"],
    access: "free-sample",
    formats: ["DOCX", "PDF"],
    lastUpdated: "2026-06-12",
    recommendedFor: ["Supervisors", "Office admins"],
    howToUse:
      "Complete within 24 hours of any incident or near-miss. Capture witness statements on page 2 and route to management for follow-up.",
    description:
      "Capture what happened, contributing factors, witnesses, and corrective actions for incidents and near-misses.",
    pages: 2,
  },
  {
    id: "doc-loto-procedure",
    title: "Lockout/Tagout Written Program",
    category: "lockout-tagout",
    documentType: "Program",
    industries: ["electrical", "hvac", "general"],
    hazards: ["loto", "electrical"],
    access: "pro",
    formats: ["DOCX", "PDF"],
    lastUpdated: "2026-05-30",
    recommendedFor: ["Electricians", "Maintenance leads"],
    howToUse:
      "Adapt the energy-control steps to your equipment, add machine-specific procedures, and train affected/authorized employees.",
    description:
      "A written energy-control program with a machine-specific procedure template and a periodic inspection form.",
    pages: 14,
  },
  {
    id: "doc-fall-plan",
    title: "Fall Protection Plan",
    category: "fall-protection",
    documentType: "Plan",
    industries: ["roofing", "general", "remodeling"],
    hazards: ["falls"],
    access: "pro",
    formats: ["DOCX", "PDF"],
    lastUpdated: "2026-06-05",
    recommendedFor: ["Roofers", "Site supervisors"],
    howToUse:
      "Document the fall hazards on your site, the systems used (guardrails, PFAS, etc.), and your rescue plan. Review with crews working at height.",
    description:
      "A site fall protection plan covering hazard identification, system selection, inspection, and rescue.",
    pages: 12,
  },
  {
    id: "doc-hazcom-program",
    title: "Hazard Communication Program & Chemical Inventory",
    category: "hazcom-sds",
    documentType: "Program",
    industries: ["all"],
    hazards: ["chemicals"],
    access: "pro",
    formats: ["DOCX", "XLSX", "PDF"],
    lastUpdated: "2026-05-11",
    recommendedFor: ["Safety coordinators", "Owners"],
    howToUse:
      "List your chemicals in the inventory tab, keep matching SDS on file, and label secondary containers. Train employees on the program.",
    description:
      "A written HazCom program plus a chemical inventory log and SDS index to keep your hazardous materials organized.",
    pages: 10,
  },
  {
    id: "doc-daily-inspection",
    title: "Daily Jobsite Safety Inspection Checklist",
    category: "inspection-checklists",
    documentType: "Checklist",
    industries: ["all"],
    hazards: ["general"],
    access: "starter",
    formats: ["DOCX", "PDF"],
    lastUpdated: "2026-06-20",
    recommendedFor: ["Foremen", "Site supervisors"],
    howToUse:
      "Walk the site at the start of each shift, check each item, and note corrective actions with a name and due date.",
    description:
      "A quick daily walk-through covering housekeeping, PPE, electrical, ladders, and more.",
    pages: 2,
  },
  {
    id: "doc-training-matrix",
    title: "Employee Safety Training Matrix",
    category: "training-logs",
    documentType: "Log",
    industries: ["all"],
    hazards: ["general"],
    access: "pro",
    formats: ["XLSX", "PDF"],
    lastUpdated: "2026-06-15",
    recommendedFor: ["Office admins", "Safety coordinators"],
    howToUse:
      "List employees down the left and training topics across the top. Record completion dates and use conditional formatting to flag what's due.",
    description:
      "Track which employees have completed which training, and see at a glance what's coming due.",
    pages: 1,
  },
  {
    id: "doc-eap",
    title: "Emergency Action Plan Template",
    category: "emergency-action-plans",
    documentType: "Plan",
    industries: ["all"],
    hazards: ["general"],
    access: "starter",
    formats: ["DOCX", "PDF"],
    lastUpdated: "2026-04-30",
    recommendedFor: ["Owners", "Site supervisors"],
    howToUse:
      "Fill in your emergency contacts, evacuation routes, and muster points. Post a copy on site and review with employees.",
    description:
      "Covers emergency reporting, evacuation, assembly points, and roles during fire, severe weather, and medical events.",
    pages: 6,
  },
  {
    id: "doc-heat-plan",
    title: "Heat Illness Prevention Plan",
    category: "heat-stress",
    documentType: "Plan",
    industries: ["landscaping", "roofing", "concrete", "general"],
    hazards: ["heat"],
    access: "starter",
    formats: ["DOCX", "PDF"],
    lastUpdated: "2026-06-22",
    recommendedFor: ["Crew leads", "Outdoor crews"],
    howToUse:
      "Set your water/rest/shade schedule, acclimatization plan for new workers, and the signs/symptoms response steps for your crews.",
    description:
      "A hot-weather plan with water, rest, shade, and acclimatization guidance plus an emergency response section.",
    pages: 5,
  },
  {
    id: "doc-electrical-swp",
    title: "Electrical Safe Work Practices",
    category: "electrical-safety",
    documentType: "Program",
    industries: ["electrical"],
    hazards: ["electrical"],
    access: "pro",
    formats: ["DOCX", "PDF"],
    lastUpdated: "2026-05-25",
    recommendedFor: ["Electricians", "Qualified persons"],
    howToUse:
      "Adapt the safe work practices to your scope, define qualified vs. unqualified persons, and use the GFCI/assured grounding log.",
    description:
      "Safe work practices for electrical tasks, including approach boundaries, GFCI use, and energized-work justification.",
    pages: 11,
  },
  {
    id: "doc-newhire-orientation",
    title: "New-Hire Safety Orientation Packet",
    category: "new-hire-orientation",
    documentType: "Packet",
    industries: ["all"],
    hazards: ["general"],
    access: "pro",
    formats: ["DOCX", "PDF"],
    lastUpdated: "2026-06-08",
    recommendedFor: ["Office admins", "Foremen"],
    howToUse:
      "Walk new employees through the orientation checklist on day one, then collect the signed acknowledgement forms for their file.",
    description:
      "Everything you need to onboard a new hire safely: orientation checklist, policy summaries, and acknowledgements.",
    pages: 9,
  },
  {
    id: "doc-ladder-inspection",
    title: "Ladder Inspection Checklist",
    category: "ladder-safety",
    documentType: "Checklist",
    industries: ["all"],
    hazards: ["ladders"],
    access: "starter",
    formats: ["DOCX", "PDF"],
    lastUpdated: "2026-05-02",
    recommendedFor: ["Crew leads", "Equipment managers"],
    howToUse:
      "Inspect each ladder before use, tag and remove damaged ladders from service, and keep the completed logs on file.",
    description:
      "A pre-use inspection checklist for step and extension ladders with a defect tag-out section.",
    pages: 2,
  },
  {
    id: "doc-scaffold-inspection",
    title: "Scaffold Inspection Checklist",
    category: "inspection-checklists",
    documentType: "Checklist",
    industries: ["general", "roofing", "concrete", "remodeling"],
    hazards: ["falls"],
    access: "pro",
    formats: ["DOCX", "PDF"],
    lastUpdated: "2026-06-18",
    recommendedFor: ["Competent persons", "Site supervisors"],
    howToUse:
      "Have a competent person inspect scaffolds before each shift, tag the status (green/yellow/red), and document with this form.",
    description:
      "A competent-person scaffold inspection form covering foundation, components, access, and fall protection.",
    pages: 2,
  },
];

export const sampleDocuments = documents.filter((d) => d.access === "free-sample");

export const documentsByCategory = (slug: string) =>
  documents.filter((d) => d.category === slug);
