/**
 * SafeSite Documents — Safety Document Library generator.
 *
 * Single source of truth for the document library. Produces:
 *   - /safety-doc-library/<category>/ folders
 *   - a templated, editable Markdown master for every document
 *     (with How to Use, body, Company Customization Needed, Last Reviewed,
 *      bracketed fields, and the universal disclaimer)
 *   - /safety-doc-library/documents.json  (metadata catalog for the website)
 *   - /safety-doc-library/catalog.md       (human-readable index)
 *   - /safety-doc-library/README.md
 *
 * The 10 showcase samples are authored by hand (skipped here) but still
 * appear in documents.json. Run: `node scripts/generate-library.mjs`
 */
import { mkdir, writeFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "safety-doc-library");
const TODAY = "2026-06-29";

const UNIVERSAL_DISCLAIMER =
  "This document is a general safety template and educational resource. It is not legal advice, does not replace a site-specific hazard assessment, and does not guarantee compliance with OSHA or any federal, state, or local requirement. Employers are responsible for reviewing, customizing, implementing, training employees on, and maintaining their own safety programs and records. Consult a qualified safety professional, legal counsel, or regulatory authority when needed.";

const STATE_NOTE =
  "Review and customize based on applicable federal, state, local, client, and project-specific requirements.";

// Documents authored by hand as polished samples (skip scaffold generation).
const SAMPLE_IDS = new Set([
  "electrical-contractor-safety-manual",
  "osha-inspection-binder-table-of-contents",
  "ppe-hazard-assessment-form",
  "ladder-inspection-checklist",
  "incident-report-form",
  "tbt-01-fall-protection-basics",
  "loto-procedure-template",
  "new-hire-safety-orientation-packet",
  "blank-jha-template",
  "heat-illness-prevention-plan",
]);

const TOOLBOX_TOPICS = [
  "Fall Protection Basics", "Ladder Safety", "Scaffold Awareness", "PPE Basics",
  "Eye and Face Protection", "Hand Protection", "Foot Protection", "Head Protection",
  "Hearing Protection", "Respiratory Protection Awareness", "Heat Stress", "Cold Stress",
  "Hydration on the Jobsite", "Hazard Communication", "SDS Basics", "Chemical Labeling",
  "Lockout/Tagout Awareness", "Electrical Shock Prevention", "Extension Cord Safety",
  "Temporary Power Safety", "Power Tool Safety", "Hand Tool Safety", "Machine Guarding Awareness",
  "Excavation Awareness", "Trenching Hazards", "Confined Space Awareness", "Fire Prevention",
  "Hot Work Safety", "Compressed Gas Cylinder Safety", "Housekeeping", "Slips, Trips, and Falls",
  "Material Handling", "Back Injury Prevention", "Forklift Awareness", "Spotter Safety",
  "Vehicle Backing Safety", "Distracted Driving", "Job Hazard Analysis", "Stop Work Authority",
  "Near Miss Reporting", "Incident Reporting", "Emergency Action Plans", "First Aid Awareness",
  "Bloodborne Pathogens Awareness", "Silica Dust Awareness", "Asbestos Awareness", "Lead Awareness",
  "Working Around Heavy Equipment", "Noise Hazards", "Weather Hazards", "Jobsite Communication",
  "End-of-Year Safety Review",
];

const STARTER_TOOLBOX = new Set([
  "tbt-01-fall-protection-basics", "tbt-02-ladder-safety", "tbt-04-ppe-basics",
  "tbt-05-eye-and-face-protection", "tbt-06-hand-protection", "tbt-11-heat-stress",
  "tbt-13-hydration-on-the-jobsite", "tbt-14-hazard-communication", "tbt-30-housekeeping",
  "tbt-31-slips-trips-and-falls", "tbt-32-material-handling", "tbt-51-jobsite-communication",
]);

/** Category → folder + ordered document titles (transcribed from spec). */
const CATEGORIES = [
  {
    folder: "manuals",
    name: "Core Safety Manuals",
    docs: [
      "General Contractor Safety Manual", "Small Construction Company Safety Manual",
      "Electrical Contractor Safety Manual", "HVAC Contractor Safety Manual",
      "Plumbing Contractor Safety Manual", "Roofing Contractor Safety Manual",
      "Landscaping Safety Manual", "Remodeling Contractor Safety Manual",
      "Concrete Contractor Safety Manual", "Property Maintenance Safety Manual",
      "General Industry Safety Manual", "Small Business Safety Program Manual",
      "Subcontractor Safety Manual", "Site-Specific Safety Plan Template",
      "Project Safety Plan Template",
    ],
  },
  {
    folder: "osha-inspection-binder",
    name: "OSHA-Style Inspection Binder",
    docs: [
      "OSHA Inspection Binder Table of Contents", "OSHA Inspection Readiness Checklist",
      "OSHA Inspection Response Procedure", "Employer Rights During Inspection Summary",
      "Inspection Opening Conference Notes Form", "Inspector Request Log",
      "Document Request Tracking Log", "Employee Interview Tracking Log",
      "Walkaround Inspection Notes Form", "Corrective Action Log",
      "Citation Response Planning Worksheet", "Abatement Tracking Log",
      "Safety Records Index", "Training Records Index", "Safety Meeting Records Index",
    ],
  },
  {
    folder: "policies",
    name: "Company Policies",
    docs: [
      "Safety and Health Policy Statement", "Stop Work Authority Policy",
      "Employee Safety Responsibilities Policy", "Management Safety Responsibilities Policy",
      "Disciplinary Safety Policy", "Return-to-Work Policy", "Drug and Alcohol Policy Template",
      "Workplace Violence Prevention Policy", "Severe Weather Policy", "Emergency Communication Policy",
      "Visitor Safety Policy", "Subcontractor Safety Policy", "Housekeeping Policy",
      "Jobsite Conduct Policy", "PPE Policy", "Heat Illness Prevention Policy",
      "Cold Stress Prevention Policy", "Incident Reporting Policy", "Near Miss Reporting Policy",
      "Vehicle Safety Policy",
    ],
  },
  {
    folder: "new-hire-orientation",
    name: "New-Hire Safety Orientation",
    docs: [
      "New-Hire Safety Orientation Packet", "New-Hire Safety Checklist",
      "Employee Safety Acknowledgment Form", "PPE Acknowledgment Form",
      "Employee Emergency Contact Form", "Safety Rules Acknowledgment",
      "Hazard Reporting Instructions", "Stop Work Authority Acknowledgment",
      "New Employee Training Log", "First-Day Safety Briefing Template",
      "New-Hire Quiz Template", "Supervisor Orientation Checklist",
      "Field Employee Orientation Checklist", "Subcontractor Orientation Form",
      "Visitor Orientation Form",
    ],
  },
  {
    folder: "training-records",
    name: "Training Logs and Records",
    docs: [
      "Master Training Matrix", "Employee Training Log", "Toolbox Talk Attendance Form",
      "Safety Meeting Sign-In Sheet", "Training Completion Certificate Template",
      "Competent Person Designation Form", "Qualified Person Designation Form",
      "Equipment Training Log", "Refresher Training Tracker", "Annual Training Calendar",
      "Monthly Safety Training Calendar", "Training Needs Assessment Form",
      "Safety Quiz Answer Sheet", "Employee Coaching Record", "Training Records Audit Checklist",
    ],
  },
  {
    folder: "toolbox-talks",
    name: "Toolbox Talks",
    docs: TOOLBOX_TOPICS.map((t) => `Toolbox Talk: ${t}`),
  },
  {
    folder: "jha-jsa",
    name: "Job Hazard Analysis / JHA / JSA",
    docs: [
      "Blank JHA Template", "Blank JSA Template", "Pre-Task Plan Template",
      "Daily Hazard Assessment Form", "Electrical Work JHA", "Ladder Work JHA",
      "Roof Work JHA", "Scaffold Work JHA", "Excavation Work JHA", "Hot Work JHA",
      "Confined Space JHA", "Concrete Work JHA", "Demolition Work JHA", "Power Tool Use JHA",
      "Vehicle Operation JHA", "Heavy Equipment Work JHA", "Chemical Use JHA",
      "Manual Material Handling JHA", "Landscaping Equipment JHA", "Maintenance Work JHA",
    ],
  },
  {
    folder: "ppe",
    name: "PPE Documents",
    docs: [
      "PPE Hazard Assessment Form", "PPE Selection Matrix", "PPE Issue Log",
      "PPE Inspection Checklist", "PPE Replacement Log", "PPE Acknowledgment Form",
      "Eye and Face Protection Checklist", "Hand Protection Selection Guide",
      "Foot Protection Checklist", "Head Protection Checklist", "Hearing Protection Checklist",
      "High-Visibility Clothing Policy", "Respiratory PPE Pre-Use Screening Form",
      "Fall Protection PPE Inspection Form", "PPE Training Record",
    ],
  },
  {
    folder: "fall-protection",
    name: "Fall Protection",
    docs: [
      "Fall Protection Plan Template", "Fall Hazard Assessment Form",
      "Fall Protection Equipment Inspection Form", "Harness Inspection Checklist",
      "Lanyard Inspection Checklist", "Anchor Point Inspection Checklist",
      "Guardrail Inspection Checklist", "Leading Edge Work Checklist",
      "Roof Work Safety Checklist", "Fall Rescue Plan Template", "Fall Protection Training Log",
      "Fall Protection Competent Person Form", "Elevated Work Permit",
      "Warning Line System Checklist", "Hole Cover Inspection Checklist",
    ],
  },
  {
    folder: "ladder-safety",
    name: "Ladder Safety",
    docs: [
      "Ladder Safety Program", "Ladder Inspection Checklist", "Ladder Use Permit",
      "Step Ladder Checklist", "Extension Ladder Checklist", "Fixed Ladder Checklist",
      "Ladder Training Log", "Defective Ladder Tag", "Ladder Setup Guide",
      "Ladder Incident Report Form",
    ],
  },
  {
    folder: "scaffolding",
    name: "Scaffolding",
    docs: [
      "Scaffold Safety Program", "Daily Scaffold Inspection Form", "Scaffold Tagging Log",
      "Scaffold Erection Checklist", "Scaffold Use Checklist", "Mobile Scaffold Checklist",
      "Scaffold Training Log", "Scaffold Competent Person Designation",
      "Scaffold Incident Report", "Scaffold Dismantling Checklist",
    ],
  },
  {
    folder: "electrical-safety",
    name: "Electrical Safety",
    docs: [
      "Electrical Safety Program", "Lockout/Tagout Program", "LOTO Procedure Template",
      "Equipment-Specific LOTO Form", "LOTO Audit Form",
      "Energized Electrical Work Permit Template", "Electrical PPE Checklist",
      "Extension Cord Inspection Form", "GFCI Inspection Log", "Temporary Power Checklist",
      "Electrical Panel Clearance Checklist", "Electrical Incident Report",
      "Shock Response Procedure", "Arc Flash Awareness Toolbox Talk",
      "Electrical Tool Inspection Checklist",
    ],
  },
  {
    folder: "hazcom-sds",
    name: "Hazard Communication / SDS",
    docs: [
      "Hazard Communication Program", "Chemical Inventory Form", "SDS Index Template",
      "SDS Binder Table of Contents", "Chemical Labeling Checklist",
      "Secondary Container Label Template", "HazCom Training Log",
      "Chemical Storage Inspection Checklist", "Chemical Spill Response Plan",
      "New Chemical Approval Form", "Hazardous Substance Use JHA",
      "Employee Chemical Exposure Report", "Contractor Chemical Use Form",
      "Annual HazCom Review Checklist", "SDS Request Log",
    ],
  },
  {
    folder: "respiratory-protection",
    name: "Respiratory Protection",
    docs: [
      "Respiratory Protection Program (Framework)", "Respirator Hazard Assessment Form",
      "Respirator Selection Worksheet", "Medical Evaluation Tracking Log",
      "Fit Test Tracking Log", "Respirator Inspection Checklist", "Respirator Cleaning Log",
      "Respirator Cartridge Change-Out Schedule Template", "Voluntary Respirator Use Form",
      "Respiratory Protection Training Log",
    ],
  },
  {
    folder: "heat-cold-stress",
    name: "Heat and Cold Stress",
    docs: [
      "Heat Illness Prevention Plan", "Heat Stress Daily Checklist", "Heat Acclimatization Plan",
      "Water/Rest/Shade Checklist", "Heat Illness Incident Report", "Cold Stress Prevention Plan",
      "Cold Weather Work Checklist", "Weather Monitoring Log", "Outdoor Work Safety Plan",
      "Seasonal Safety Bulletin Template",
    ],
  },
  {
    folder: "incident-reporting",
    name: "Incident and Near Miss Reporting",
    docs: [
      "Incident Report Form", "Near Miss Report Form", "Injury Report Form",
      "Property Damage Report", "Vehicle Incident Report", "Witness Statement Form",
      "Root Cause Analysis Form", "Corrective Action Form", "Incident Investigation Checklist",
      "Supervisor Incident Review Form", "Photo Evidence Log", "Medical Treatment Tracking Log",
      "Return-to-Work Review Form", "Monthly Incident Summary", "Annual Incident Review Template",
    ],
  },
  {
    folder: "emergency-fire",
    name: "Emergency Action and Fire Safety",
    docs: [
      "Emergency Action Plan Template", "Fire Prevention Plan Template", "Emergency Contact List",
      "Evacuation Drill Log", "Fire Extinguisher Inspection Form",
      "First Aid Kit Inspection Checklist", "Emergency Equipment Inspection Log",
      "Severe Weather Plan", "Earthquake Response Plan", "Jobsite Emergency Map Template",
      "Muster Point Checklist", "Emergency Communication Tree", "Spill Response Plan",
      "Medical Emergency Procedure", "Crisis Communication Template",
    ],
  },
  {
    folder: "vehicle-equipment",
    name: "Vehicle and Equipment Safety",
    docs: [
      "Company Vehicle Safety Policy", "Driver Qualification File Checklist",
      "Vehicle Inspection Form", "Daily Equipment Inspection Form",
      "Heavy Equipment Inspection Checklist", "Trailer Inspection Checklist",
      "Forklift Daily Inspection Checklist", "Forklift Operator Training Log",
      "Spotter Safety Checklist", "Backing Safety Policy", "Fueling Safety Checklist",
      "Equipment Maintenance Log", "Defective Equipment Tag", "Mobile Equipment Incident Report",
      "Authorized Driver List",
    ],
  },
  {
    folder: "construction-specific",
    name: "Construction-Specific Documents",
    docs: [
      "Construction Site Safety Plan", "Daily Jobsite Safety Checklist",
      "Weekly Jobsite Inspection Checklist", "Subcontractor Prequalification Form",
      "Subcontractor Safety Agreement", "Site Safety Orientation Form",
      "Pre-Construction Safety Meeting Agenda", "Daily Pre-Task Briefing Form",
      "Construction Housekeeping Checklist", "Material Storage Checklist",
      "Public Protection Checklist", "Barricade and Signage Checklist",
      "Tool Inspection Checklist", "Jobsite Closeout Safety Checklist",
      "Multi-Employer Worksite Coordination Form",
    ],
  },
  {
    folder: "asbestos-lead-awareness",
    name: "Asbestos and Lead Awareness",
    docs: [
      "Asbestos Awareness Policy Template", "Lead Awareness Policy Template",
      "Pre-Renovation Hazard Questionnaire", "Suspect Material Stop Work Form",
      "Asbestos/Lead Notification Checklist", "Building Material Survey Request Form",
      "Asbestos Awareness Toolbox Talk", "Lead Awareness Toolbox Talk",
      "Renovation Safety Checklist", "Client Hazard Disclosure Form",
      "Dust Control Checklist", "PPE Checklist for Dust-Generating Work",
      "Regulated Material Referral Form", "Contractor Awareness Acknowledgment",
      "Do-Not-Disturb Material Sign Template",
    ],
  },
  {
    folder: "recordkeeping-admin",
    name: "Recordkeeping and Admin",
    docs: [
      "OSHA 300 Log — Recordkeeping Instructions", "OSHA 300A Posting Reminder",
      "OSHA 301 Incident Report — Intake & Instructions", "Safety Records Retention Schedule",
      "Safety Document Control Log", "Monthly Safety Report Template",
      "Quarterly Safety Review Template", "Annual Safety Program Review",
      "Safety Goals Worksheet", "Safety KPI Tracker", "Corrective Action Tracker",
      "Safety Committee Meeting Agenda", "Safety Committee Minutes Template",
      "Management Review Form", "Safety Budget Planning Worksheet",
    ],
  },
  {
    folder: "client-facing",
    name: "Client-Facing Documents",
    docs: [
      "Safety Capability Statement", "Contractor Safety One-Pager", "Safety Program Summary",
      "Safety Prequalification Response Template", "Client Safety Questionnaire Response Template",
      "Insurance and Safety Document Checklist", "Jobsite Safety Rules Handout",
      "Subcontractor Safety Packet", "Safety Binder Cover Page", "Safety Binder Table of Contents",
    ],
  },
];

/**
 * Industries we build views for. `match` lists the documents.json `industry`
 * values considered *tailored* to that trade; every view also includes all
 * universal documents (industry === "All").
 */
const INDUSTRY_VIEWS = [
  { slug: "electrical", name: "Electrical Contractors", match: ["Electrical"] },
  { slug: "general", name: "General Contractors", match: ["General"] },
  { slug: "hvac", name: "HVAC", match: ["HVAC"] },
  { slug: "plumbing", name: "Plumbing", match: ["Plumbing"] },
  { slug: "roofing", name: "Roofing", match: ["Roofing"] },
  { slug: "remodeling", name: "Remodeling", match: ["Remodeling"] },
  { slug: "concrete", name: "Concrete", match: ["Concrete"] },
  { slug: "landscaping", name: "Landscaping", match: ["Landscaping"] },
  { slug: "painting", name: "Painting", match: [] },
  { slug: "property-maintenance", name: "Property Maintenance", match: ["Property Maintenance"] },
];

/** Logical ordering of document types within an industry view. */
const TYPE_ORDER = [
  "Manual", "Program", "Plan", "Procedure", "Policy", "JHA/JSA", "Toolbox Talk",
  "Permit", "Checklist", "Form", "Acknowledgment", "Log", "Matrix", "Tracker",
  "Calendar", "Schedule", "Certificate", "Designation", "Agenda", "Minutes",
  "Worksheet", "Questionnaire", "Report", "Statement", "Index", "Guide",
  "Handout", "Packet", "Summary", "Bulletin", "Tag", "Sign", "Instructions",
];

// --------------------------------- helpers ---------------------------------

const slugify = (s) =>
  s.toLowerCase().trim()
    .replace(/\//g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function classifyType(title) {
  const t = title.toLowerCase();
  if (/toolbox talk/.test(t)) return "Toolbox Talk";
  if (/\bjha\b|\bjsa\b|job hazard analysis|job safety analysis/.test(t)) return "JHA/JSA";
  if (/manual/.test(t)) return "Manual";
  if (/program/.test(t)) return "Program";
  if (/procedure/.test(t)) return "Procedure";
  if (/\bplan\b/.test(t)) return "Plan";
  if (/policy/.test(t)) return "Policy";
  if (/permit/.test(t)) return "Permit";
  if (/matrix/.test(t)) return "Matrix";
  if (/checklist/.test(t)) return "Checklist";
  if (/acknowledg/.test(t)) return "Acknowledgment";
  if (/sign-in|sign in|attendance/.test(t)) return "Log";
  if (/\blog\b|tracker/.test(t)) return "Log";
  if (/calendar/.test(t)) return "Calendar";
  if (/certificate/.test(t)) return "Certificate";
  if (/designation/.test(t)) return "Designation";
  if (/agenda/.test(t)) return "Agenda";
  if (/minutes/.test(t)) return "Minutes";
  if (/worksheet/.test(t)) return "Worksheet";
  if (/questionnaire/.test(t)) return "Questionnaire";
  if (/report/.test(t)) return "Report";
  if (/index|table of contents/.test(t)) return "Index";
  if (/\btag\b/.test(t)) return "Tag";
  if (/\bsign\b/.test(t)) return "Sign";
  if (/guide/.test(t)) return "Guide";
  if (/statement/.test(t)) return "Statement";
  if (/handout/.test(t)) return "Handout";
  if (/packet/.test(t)) return "Packet";
  if (/summary/.test(t)) return "Summary";
  if (/bulletin/.test(t)) return "Bulletin";
  if (/schedule/.test(t)) return "Schedule";
  if (/instructions/.test(t)) return "Instructions";
  if (/\bform\b|notes/.test(t)) return "Form";
  return "Form";
}

function pickIndustry(title) {
  const t = title.toLowerCase();
  if (/electrical contractor/.test(t)) return "Electrical";
  if (/hvac/.test(t)) return "HVAC";
  if (/plumbing/.test(t)) return "Plumbing";
  if (/roofing/.test(t)) return "Roofing";
  if (/landscaping/.test(t)) return "Landscaping";
  if (/remodeling/.test(t)) return "Remodeling";
  if (/concrete/.test(t)) return "Concrete";
  if (/property maintenance/.test(t)) return "Property Maintenance";
  if (/general contractor|general industry/.test(t)) return "General";
  return "All";
}

function pickAccess(folder, id, title, type) {
  const t = title.toLowerCase();
  if (folder === "client-facing") return "Custom Binder";
  if (/capability statement|safety binder (cover|table of contents)/.test(t)) return "Custom Binder";
  if (folder === "osha-inspection-binder" &&
      /(table of contents|readiness|response procedure|rights|citation response|abatement)/.test(t))
    return "Custom Binder";
  if (folder === "manuals" && /(site-specific|project safety plan)/.test(t)) return "Custom Binder";
  if (folder === "toolbox-talks") return STARTER_TOOLBOX.has(id) ? "Starter" : "Pro";
  if (folder === "manuals" || folder === "policies") return "Pro";
  if (["Manual", "Program", "Plan", "Procedure"].includes(type)) return "Pro";
  if (/(matrix|respiratory|arc flash|root cause|investigation|prequalification|agreement|coordination|fit test|medical evaluation|energized|qualified person|competent person|annual|program review|retention)/.test(t))
    return "Pro";
  return "Starter";
}

const KEYWORD_TAGS = [
  [/fall protection|harness|lanyard|anchor|guardrail|leading edge|warning line|hole cover/, "fall-protection"],
  [/\broof/, "roofing"],
  [/ladder/, "ladder-safety"],
  [/scaffold/, "scaffolding"],
  [/ppe|eye|face|hand protection|foot protection|head protection|hearing|high-vis|high visibility/, "ppe"],
  [/electrical|loto|lockout|tagout|gfci|arc flash|energized|shock|panel|extension cord|temporary power/, "electrical"],
  [/hazcom|hazard communication|\bsds\b|chemical|label|spill/, "hazcom"],
  [/respirator|respiratory|fit test|cartridge/, "respiratory"],
  [/heat|hydration|acclimatization/, "heat"],
  [/cold/, "cold-stress"],
  [/incident|injury|near miss|root cause|investigation|witness/, "incident"],
  [/emergency|evacuation|fire|extinguisher|muster|crisis|first aid/, "emergency"],
  [/vehicle|driving|forklift|equipment|trailer|backing|fueling|driver/, "vehicle-equipment"],
  [/asbestos|lead|silica|renovation|dust/, "asbestos-lead"],
  [/excavation|trench/, "excavation"],
  [/confined space/, "confined-space"],
  [/hot work|welding|cutting|compressed gas/, "hot-work"],
  [/training|orientation|toolbox|quiz|competent|qualified|certificate|coaching/, "training"],
  [/inspection|checklist|audit|walkaround/, "inspection"],
  [/osha 300|recordkeeping|retention|301|300a|document control/, "recordkeeping"],
  [/policy/, "policy"],
  [/subcontractor/, "subcontractor"],
];

function makeTags(folder, title, industry, type) {
  const t = title.toLowerCase();
  const tags = new Set([folder]);
  for (const [re, tag] of KEYWORD_TAGS) if (re.test(t)) tags.add(tag);
  tags.add(slugify(type));
  if (industry !== "All") tags.add(slugify(industry));
  return [...tags].slice(0, 7);
}

function describe(type, title, industry) {
  const topic = title.replace(/^Toolbox Talk:\s*/, "");
  const low = topic.toLowerCase();
  switch (type) {
    case "Manual":
      return `Editable written safety manual template${industry !== "All" ? ` for ${industry.toLowerCase()} contractors` : ""}, ready to brand and customize to your company.`;
    case "Program":
      return `Editable written ${low} you can tailor to your company, train employees on, and maintain.`;
    case "Plan":
      return `Editable ${low} template to customize for your company, site, and specific hazards.`;
    case "Policy":
      return `Editable company policy template that sets clear, written expectations. Customize and have leadership approve before use.`;
    case "Procedure":
      return `Editable step-by-step ${low} template you can adapt to your equipment and operations.`;
    case "Checklist":
      return `Editable checklist to inspect, verify, and document conditions, with space for corrective actions.`;
    case "Log":
      return `Editable log to record and track entries over time as part of your safety records.`;
    case "Form":
      return `Editable form to capture information accurately and consistently at the time of the task or event.`;
    case "Toolbox Talk":
      return `A short, ready-to-run safety meeting on ${low} with key hazards, discussion questions, a crew checklist, and a sign-in sheet.`;
    case "JHA/JSA":
      return `Editable job hazard analysis to break a task into steps, identify hazards, and document controls before work begins.`;
    case "Permit":
      return `Editable permit template to authorize and document the work with the required controls and approvals.`;
    case "Acknowledgment":
      return `Editable acknowledgment form to document that employees received and understood the material.`;
    case "Matrix":
      return `Editable matrix to track which employees have completed which training and what is coming due.`;
    case "Index":
      return `Editable index / table of contents to organize and quickly locate your safety documents and records.`;
    case "Tag":
    case "Sign":
      return `Editable, printable ${type.toLowerCase()} you can customize and post on the jobsite.`;
    default:
      return `Editable ${type.toLowerCase()} template: ${title}. Customize with your company details and use within your safety program.`;
  }
}

function howToUse(type) {
  switch (type) {
    case "Toolbox Talk":
      return "Print this talk or pull it up on a phone or tablet. Review the lesson and key hazards with the crew (about five minutes), ask the discussion questions, walk the crew checklist, then collect signatures on the attendance section. File the signed copy with your training records.";
    case "Checklist":
      return "Use this checklist during the inspection or task it covers. Mark each item, note any issues, and assign corrective actions with a responsible name and due date. Keep the completed checklist on file.";
    case "Log":
    case "Matrix":
      return "Record each entry as it happens and keep the document current. Store it with your safety records and review it periodically for gaps or trends.";
    case "Policy":
      return "Review the policy, customize it to your company, have leadership approve it, then communicate and train employees on it. Keep a signed or acknowledged copy on file.";
    case "Program":
    case "Plan":
    case "Procedure":
      return "Customize this template to your company and worksite, have a qualified person and leadership review it, train affected employees, and implement it. Review and update it on a set schedule or whenever conditions change.";
    case "JHA/JSA":
      return "Complete this analysis with the crew before the task. List the task steps, identify the hazards in each step, and document the controls. Review it on site and update it if conditions change.";
    case "Permit":
      return "Complete and authorize this permit before the work begins. Verify the controls are in place, obtain the required approvals, and post or retain the permit for the duration of the work.";
    case "Acknowledgment":
      return "Have the employee read the content, then sign and date. Keep the signed acknowledgment in the employee's training or personnel file.";
    case "Index":
      return "Use this index to organize the section. List each document, where it lives (tab or location), and its last review date. Update it as documents are added or revised.";
    default:
      return "Complete the fields as fully and accurately as possible at the time of the task or event. Route the completed document per your internal process and retain it with your records.";
  }
}

function bodyFor(type, title) {
  const topic = title.replace(/^Toolbox Talk:\s*/, "");
  switch (type) {
    case "Checklist":
      return `Complete this checklist for **[ITEM / AREA / TASK]** at **[LOCATION]** on **[DATE]**. Mark each item and record corrective actions.

| # | Item to Verify | OK | Needs Attention | N/A | Notes / Corrective Action |
|---|---|:--:|:--:|:--:|---|
| 1 | [Add an item specific to your work] |  |  |  |  |
| 2 | [Add item] |  |  |  |  |
| 3 | [Add item] |  |  |  |  |
| 4 | [Add item] |  |  |  |  |
| 5 | [Add item] |  |  |  |  |
| 6 | [Add item] |  |  |  |  |

**Inspected by:** [NAME]  **Signature:** _________________  **Date:** [DATE]
**Corrective actions assigned to:** [NAME]  **Due:** [DATE]`;

    case "Log":
    case "Matrix":
      return `Record each entry below and add rows as needed.

| Date | Description / Subject | Performed / Reported By | Result / Notes | Initials |
|---|---|---|---|---|
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |

**Maintained by:** [RESPONSIBLE PERSON]  **Review frequency:** [e.g., monthly]`;

    case "Policy":
      return `**1. Purpose** — Describe why this policy exists for **[COMPANY NAME]**.

**2. Scope** — Identify who and what this policy applies to (employees, subcontractors, sites, equipment).

**3. Policy Statement** — [State the company's position, rules, and expectations here. Customize to your operations.]

**4. Responsibilities**
- **Management:** [responsibilities]
- **Supervisors:** [responsibilities]
- **Employees:** [responsibilities]

**5. Requirements / Procedures** — [List the specific requirements, steps, or expectations.]

**6. Enforcement** — Describe how the policy is enforced, consistent with your disciplinary policy.

**7. References** — [List internal programs or external references. ${STATE_NOTE}]

Approved by: **[RESPONSIBLE PERSON]**  Signature: _________________  Date: **[DATE]**`;

    case "Program":
    case "Manual":
      return `**1. Purpose & Scope** — What this ${type.toLowerCase()} covers and who it applies to at **[COMPANY NAME]**.

**2. Roles & Responsibilities** — Management, supervisors, competent/qualified persons, and employees.

**3. Hazard Identification & Assessment** — How hazards are identified, assessed, and prioritized.

**4. Controls & Safe Work Practices** — Required controls, procedures, and safe work practices. [Customize to your operations.]

**5. Training** — Who is trained, on what topics, how often, and how training is documented.

**6. Inspections & Audits** — What is inspected or audited, by whom, and how findings are corrected.

**7. Recordkeeping** — Records kept and how long they are retained.

**8. Review & Revision** — Reviewed at least annually or when conditions change. ${STATE_NOTE}

Prepared by: **[RESPONSIBLE PERSON]**  Approved by: _________________  Date: **[DATE]**`;

    case "Plan":
      return `**1. Purpose & Scope** — What this plan covers and who it applies to.

**2. Site / Project Information** — Company: **[COMPANY NAME]**  Project: **[PROJECT]**  Address: **[ADDRESS]**  Competent/Responsible Person: **[NAME]**

**3. Hazards & Controls**

| Hazard | Affected Work / Area | Control Measures |
|---|---|---|
| [Hazard] | [Where] | [Controls] |
| [Hazard] | [Where] | [Controls] |
| [Hazard] | [Where] | [Controls] |

**4. Responsibilities** — Who is responsible for implementing and enforcing each control.

**5. Training & Communication** — How affected employees are trained and how the plan is communicated.

**6. Emergency Procedures** — Reference your Emergency Action Plan and on-site emergency contacts.

**7. Review** — Review and update when site conditions, scope, or crews change. ${STATE_NOTE}`;

    case "Procedure":
      return `**Equipment / Task:** [DESCRIBE]  **Location:** [LOCATION]  **Prepared by:** [NAME]  **Date:** [DATE]

**Step-by-step procedure** (customize each step to your equipment and operation):
1. [Step one — what to do, what to verify]
2. [Step two]
3. [Step three]
4. [Step four]
5. [Step five]

**Required PPE / tools:** [LIST]
**Verification / sign-off:** Performed by [NAME], Verified by [NAME], Date [DATE]

${STATE_NOTE}`;

    case "JHA/JSA":
      return `**Task / Job:** [DESCRIBE TASK]  **Location:** [LOCATION]  **Date:** [DATE]  **Competent Person:** [NAME]

| Task Step | Potential Hazards | Controls / Safe Work Practices | Responsible |
|---|---|---|---|
| [Step 1] | [Hazards] | [Controls] | [Name] |
| [Step 2] | [Hazards] | [Controls] | [Name] |
| [Step 3] | [Hazards] | [Controls] | [Name] |
| [Step 4] | [Hazards] | [Controls] | [Name] |

**Required PPE:** [LIST]   **Permits required:** [LIST]
**Reviewed with crew by:** [NAME]   **Signature:** _________________   **Date:** [DATE]`;

    case "Permit":
      return `| Field | Entry |
|---|---|
| Permit #: | [____] |
| Location / Equipment: | [____] |
| Description of work: | [____] |
| Hazards identified: | [____] |
| Controls in place: | [____] |
| PPE required: | [____] |
| Authorized by (name/signature): | [____] |
| Issue date / time: | [____] |
| Expiration date / time: | [____] |

${STATE_NOTE}`;

    case "Acknowledgment":
      return `I, **[EMPLOYEE NAME]**, acknowledge that I have received, read, and understand **${topic.replace(/ acknowledg.*/i, "")}** provided by **[COMPANY NAME]**. I understand my responsibilities and agree to follow the requirements. I understand I may ask questions at any time, and that I have stop-work authority if I believe a task is unsafe.

Employee Signature: _________________  Date: **[DATE]**
Supervisor Signature: _________________  Date: **[DATE]**`;

    case "Toolbox Talk":
      return `**Topic:** ${topic}

**5-Minute Lesson**
[Summarize the key points the crew needs to know about ${topic.toLowerCase()}. Keep it short, plain, and specific to your work.]
- Why it matters on our jobsite
- The main do's and don'ts
- What "good" looks like for this task

**Key Hazards**
- [Hazard 1 related to ${topic.toLowerCase()}]
- [Hazard 2]
- [Hazard 3]

**Discussion Questions**
1. Where on our current job could these hazards show up?
2. What controls are we using, and are they working?
3. Has anyone had a close call related to this? What did we learn?

**Crew Checklist**
- [ ] Required PPE available and worn
- [ ] Tools and equipment inspected
- [ ] Hazards reviewed and controlled
- [ ] Everyone knows the stop-work signal

**Attendance / Sign-In** — Date: [DATE]  Supervisor: [NAME]  Location: [LOCATION]

| # | Print Name | Signature |
|---|---|---|
| 1 |  |  |
| 2 |  |  |
| 3 |  |  |
| 4 |  |  |
| 5 |  |  |`;

    case "Index":
      return `Use this index to organize and locate the documents in this section.

| # | Document / Record | Tab / Location | Last Reviewed |
|---|---|---|---|
| 1 | [Document name] | [Tab] | [DATE] |
| 2 | [Document name] | [Tab] | [DATE] |
| 3 | [Document name] | [Tab] | [DATE] |
| 4 |  |  |  |
| 5 |  |  |  |`;

    case "Tag":
    case "Sign":
      return `[ Printable ${type.toLowerCase()} — customize the text, print, and post as needed. ]

> ## [HEADER TEXT — e.g., DANGER / DO NOT USE / DO NOT DISTURB]
> **Reason:** [____]
> **Tagged / posted by:** [NAME]  **Date:** [DATE]
> **Do not remove without authorization from:** [NAME / PHONE]`;

    case "Matrix2":
    default:
      return `Complete all fields. Attach additional pages if needed.

| Field | Entry |
|---|---|
| Company: | [COMPANY NAME] |
| Completed by: | [NAME] |
| Date: | [DATE] |
| Location / Project: | [____] |
| Details: | [____] |
| Action required: | [____] |
| Reviewed by (name/signature): | [____] |`;
  }
}

function scaffold({ id, title, categoryName, industry, type, access, body, howTo }) {
  const bodyHeading =
    type === "Toolbox Talk" ? "Toolbox Talk"
    : type === "JHA/JSA" ? "Job Hazard Analysis"
    : ["Checklist", "Policy", "Program", "Plan", "Procedure", "Permit", "Acknowledgment", "Index", "Log", "Matrix"].includes(type)
      ? type
      : "Template Body";
  const bodyContent = body ?? bodyFor(type, title);
  const howToContent = howTo ?? howToUse(type);

  return `# ${title}

> **Document Control**
> Company: **[COMPANY NAME]**  ·  Logo: **[COMPANY LOGO]**  ·  Address: **[COMPANY ADDRESS]**
> Prepared by: **[RESPONSIBLE PERSON]**  ·  Date: **[DATE]**  ·  Approved by (signature): **_________________**

| Field | Value |
|---|---|
| Category | ${categoryName} |
| Recommended Industry | ${industry} |
| Document Type | ${type} |
| Access Level | ${access} |
| Last Reviewed | ${TODAY} |
| Last Updated | ${TODAY} |

---

## How to Use This Template
${howToContent}

---

## ${bodyHeading}
${bodyContent}

---

## Company Customization Needed
- Replace every bracketed field (**[COMPANY NAME]**, **[RESPONSIBLE PERSON]**, **[DATE]**, **[LOCATION]**, etc.) with your information, and add your company logo and address.
- ${STATE_NOTE}
- Add, remove, or edit content so it reflects your actual operations, equipment, materials, and worksites.
- Assign a responsible person and obtain an approval signature before putting this document into use.
- Set a review schedule and update the **Last Reviewed / Last Updated** date whenever you change it.

## Last Reviewed / Last Updated
- **Last Reviewed:** ${TODAY}
- **Last Updated:** ${TODAY}
- **Next Review Due:** [SET DATE]

---

### Disclaimer
*${UNIVERSAL_DISCLAIMER}*

<sub>Template ID: \`${id}\` · Editable master (Markdown). Export to Word/PDF for distribution. Access level: ${access}.</sub>
`;
}

// --------------------------------- build -----------------------------------

const used = new Set();
function uniqueId(folder, title, index) {
  let base;
  if (folder === "toolbox-talks") {
    const n = String(index + 1).padStart(2, "0");
    base = `tbt-${n}-${slugify(title.replace(/^Toolbox Talk:\s*/, ""))}`;
  } else {
    base = slugify(title);
  }
  let id = base;
  if (used.has(id)) id = `${base}-${folder}`;
  let i = 2;
  while (used.has(id)) id = `${base}-${i++}`;
  used.add(id);
  return id;
}

/**
 * Build the by-industry organization: one Markdown index per trade (templates
 * grouped by document type, linking to canonical files) plus by-industry.json.
 * Universal documents (industry "All") apply to every trade and are included in
 * each view; tailored documents are marked with ★.
 */
async function buildIndustryViews(catalog) {
  const dir = path.join(ROOT, "by-industry");
  await mkdir(dir, { recursive: true });
  const typeRank = (t) => {
    const i = TYPE_ORDER.indexOf(t);
    return i === -1 ? 999 : i;
  };
  const universalAll = catalog.filter((d) => d.industry === "All");
  const jsonIndustries = [];

  let indexMd = `# Safety Documents by Industry\n\n`;
  indexMd += `Every template, organized by the trades we serve and grouped by document type. `;
  indexMd += `Universal documents (industry: **All**) apply to every trade and appear in each view; `;
  indexMd += `**★** marks documents tailored to that specific trade.\n\n`;
  indexMd += `| Industry | Tailored | Universal | Total |\n|---|--:|--:|--:|\n`;

  for (const ind of INDUSTRY_VIEWS) {
    const specific = catalog.filter((d) => ind.match.includes(d.industry));
    const docs = [...specific, ...universalAll];

    const byType = {};
    for (const d of docs) (byType[d.documentType] ||= []).push(d);
    const types = Object.keys(byType).sort((a, b) => typeRank(a) - typeRank(b));

    let md = `# ${ind.name} — Safety Document Set\n\n`;
    md += `**${docs.length} templates** for ${ind.name.toLowerCase()} `;
    md += `(${specific.length} tailored to this trade + ${universalAll.length} universal), grouped by document type.\n\n`;
    md += `> This is a starting document set for **${ind.name}**. `;
    md += `**★** = tailored specifically for this trade. Universal templates apply to every trade — `;
    md += `customize all documents to your company and worksite before use.\n\n`;
    md += `**Jump to a type:** ${types.map((t) => `[${t}](#${slugify(t)}-${byType[t].length})`).join(" · ")}\n\n`;

    const jsonTypes = [];
    for (const t of types) {
      const list = byType[t]
        .slice()
        .sort(
          (a, b) =>
            (a.industry === "All" ? 1 : 0) - (b.industry === "All" ? 1 : 0) ||
            a.title.localeCompare(b.title)
        );
      md += `## ${t} (${list.length})\n\n`;
      for (const d of list) {
        const star = d.industry !== "All" ? "★ " : "";
        md += `- ${star}[${d.title}](../${d.category}/${d.id}.md) — _${d.accessLevel}_ · ${d.category}\n`;
      }
      md += `\n`;
      jsonTypes.push({
        type: t,
        count: list.length,
        documents: list.map((d) => ({
          id: d.id,
          title: d.title,
          accessLevel: d.accessLevel,
          category: d.category,
          tailored: d.industry !== "All",
          route: d.route,
          filePath: d.filePath,
        })),
      });
    }

    await writeFile(path.join(dir, `${ind.slug}.md`), md, "utf8");
    jsonIndustries.push({
      slug: ind.slug,
      name: ind.name,
      tailored: specific.length,
      universal: universalAll.length,
      total: docs.length,
      types: jsonTypes,
    });
    indexMd += `| [${ind.name}](${ind.slug}.md) | ${specific.length} | ${universalAll.length} | ${docs.length} |\n`;
  }

  await writeFile(path.join(dir, "index.md"), indexMd, "utf8");
  await writeFile(
    path.join(ROOT, "by-industry.json"),
    JSON.stringify(
      {
        generatedAt: TODAY,
        note: "Universal documents (industry 'All') apply to every trade and are included in each industry view. 'tailored' = specific to that trade. Files are linked, not duplicated — canonical masters live in the category folders.",
        typeOrder: TYPE_ORDER,
        industries: jsonIndustries,
      },
      null,
      2
    ),
    "utf8"
  );

  return jsonIndustries;
}

/** Load authored body content from scripts/content/*.mjs (id -> {body, howTo?}). */
async function loadContent() {
  const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "content");
  let files = [];
  try {
    files = (await readdir(dir)).filter((f) => f.endsWith(".mjs"));
  } catch {
    return {};
  }
  const merged = {};
  for (const f of files) {
    const mod = await import(pathToFileURL(path.join(dir, f)).href);
    Object.assign(merged, mod.default || {});
  }
  return merged;
}

async function run() {
  await mkdir(ROOT, { recursive: true });
  const CONTENT = await loadContent();
  const catalog = [];
  let written = 0;
  let authoredCount = 0;
  const needsContent = [];

  for (const cat of CATEGORIES) {
    const dir = path.join(ROOT, cat.folder);
    await mkdir(dir, { recursive: true });

    for (let i = 0; i < cat.docs.length; i++) {
      const title = cat.docs[i];
      const id = uniqueId(cat.folder, title, i);
      const type = classifyType(title);
      const industry = pickIndustry(title);
      const access = pickAccess(cat.folder, id, title, type);
      const tags = makeTags(cat.folder, title, industry, type);
      const formats =
        ["Log", "Matrix", "Tracker", "Calendar", "Index", "Schedule"].includes(type) ||
        /inventory|matrix|\blog\b|tracker|calendar|schedule|kpi/i.test(title)
          ? ["XLSX", "PDF"]
          : ["DOCX", "PDF"];
      const fileType = formats[0];
      const fileName = `${id}.${fileType.toLowerCase()}`;

      catalog.push({
        id,
        title,
        category: cat.folder,
        categoryName: cat.name,
        industry,
        documentType: type,
        tags,
        description: describe(type, title, industry),
        accessLevel: access,
        fileType,
        formats,
        fileName,
        lastReviewed: TODAY,
        lastUpdated: TODAY,
        route: `/library/${id}`,
        filePath: `safety-doc-library/${cat.folder}/${id}.md`,
        storagePath: `{{STORAGE_BASE_URL}}/${cat.folder}/${fileName}`,
        isSample: SAMPLE_IDS.has(id),
      });

      if (!SAMPLE_IDS.has(id)) {
        const authored = CONTENT[id];
        if (authored?.body) authoredCount++;
        else needsContent.push(id);
        await writeFile(
          path.join(dir, `${id}.md`),
          scaffold({
            id, title, categoryName: cat.name, industry, type, access,
            body: authored?.body, howTo: authored?.howTo,
          }),
          "utf8"
        );
        written++;
      }
    }
  }

  // documents.json
  await writeFile(
    path.join(ROOT, "documents.json"),
    JSON.stringify(
      {
        generatedAt: TODAY,
        universalDisclaimer: UNIVERSAL_DISCLAIMER,
        accessLevels: ["Starter", "Pro", "Custom Binder"],
        totalDocuments: catalog.length,
        categories: CATEGORIES.map((c) => ({
          slug: c.folder,
          name: c.name,
          count: c.docs.length,
        })),
        documents: catalog,
      },
      null,
      2
    ),
    "utf8"
  );

  // catalog.md
  const counts = {};
  for (const d of catalog) counts[d.accessLevel] = (counts[d.accessLevel] || 0) + 1;
  let md = `# Safety Document Library — Catalog\n\n`;
  md += `Generated ${TODAY} · **${catalog.length} documents** across **${CATEGORIES.length} categories**.\n\n`;
  md += `Access mix — Starter: ${counts.Starter || 0} · Pro: ${counts.Pro || 0} · Custom Binder: ${counts["Custom Binder"] || 0}.\n\n`;
  for (const cat of CATEGORIES) {
    const docs = catalog.filter((d) => d.category === cat.folder);
    md += `## ${cat.name} \`/${cat.folder}\` (${docs.length})\n\n`;
    md += `| Title | Type | Industry | Access | Sample |\n|---|---|---|---|:--:|\n`;
    for (const d of docs) {
      md += `| ${d.title} | ${d.documentType} | ${d.industry} | ${d.accessLevel} | ${d.isSample ? "★" : ""} |\n`;
    }
    md += `\n`;
  }
  await writeFile(path.join(ROOT, "catalog.md"), md, "utf8");

  // By-industry organization (templates grouped by trade, then document type).
  const industryViews = await buildIndustryViews(catalog);

  console.log(`✓ ${catalog.length} documents catalogued`);
  console.log(
    `✓ Industry views: ${industryViews.length} (by-industry/*.md + by-industry.json) — ` +
      industryViews.map((i) => `${i.slug}:${i.total}`).join(", ")
  );
  console.log(`✓ ${written} template masters written (${SAMPLE_IDS.size} samples authored by hand)`);
  console.log(`✓ Access — Starter: ${counts.Starter || 0}, Pro: ${counts.Pro || 0}, Custom Binder: ${counts["Custom Binder"] || 0}`);
  console.log(`✓ Authored full content: ${authoredCount}/${written} masters`);
  if (needsContent.length) {
    console.log(`⚠ Still using fallback (${needsContent.length}): ${needsContent.join(", ")}`);
  } else {
    console.log(`✓ 100% of masters have authored, ready-to-use content`);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
