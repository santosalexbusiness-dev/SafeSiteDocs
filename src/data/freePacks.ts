/**
 * Trade-specific FREE starter packs. Each industry gets a curated set of the
 * most relevant templates, resolved against the real library (documents.json),
 * so every item links to a viewable + printable page. The lead form delivers
 * the pack that matches the trade the visitor selects.
 *
 * Items reference real document ids; titles/types are resolved from the catalog
 * so they never drift. Unknown ids are dropped defensively.
 */
import { getDoc } from "./libraryCatalog";

type RawItem = { id: string; why: string };
type RawPack = { slug: string; name: string; headline: string; intro: string; items: RawItem[] };

export type ResolvedItem = {
  id: string;
  title: string;
  type: string;
  category: string;
  route: string;
  why: string;
};
export type ResolvedPack = {
  slug: string;
  name: string;
  headline: string;
  intro: string;
  count: number;
  items: ResolvedItem[];
};

const RAW: RawPack[] = [
  {
    slug: "electrical",
    name: "Electrical Contractors",
    headline: "Electrical Contractor Safety Starter Pack",
    intro:
      "Hand-picked for electrical crews — energy control, shock and arc-flash awareness, and the daily paperwork general contractors ask for. Every template is viewable and printable now; editable Word unlocks with a plan.",
    items: [
      { id: "electrical-contractor-safety-manual", why: "Your written safety program shell, ready to brand with your company name." },
      { id: "loto-procedure-template", why: "Lock out hazardous energy with an equipment-specific procedure." },
      { id: "electrical-work-jha", why: "Pre-task hazard analysis pre-filled for electrical work." },
      { id: "electrical-ppe-checklist", why: "Verify insulating gloves and arc-rated PPE before energized tasks." },
      { id: "gfci-inspection-log", why: "Document GFCI testing on temporary power." },
      { id: "ppe-hazard-assessment-form", why: "Certify the PPE your tasks require." },
      { id: "incident-report-form", why: "Capture incidents and near-misses the right way." },
    ],
  },
  {
    slug: "general",
    name: "General Contractors",
    headline: "General Contractor Safety Starter Pack",
    intro:
      "Run a safer, more organized site — the plans, subcontractor paperwork, and daily checks a GC is expected to have on hand.",
    items: [
      { id: "general-contractor-safety-manual", why: "A multi-trade written safety program for your company." },
      { id: "construction-site-safety-plan", why: "Document this site's specific hazards and controls." },
      { id: "daily-jobsite-safety-checklist", why: "A 2-minute start-of-shift walk-through." },
      { id: "subcontractor-safety-agreement", why: "Set safety expectations with your subs in writing." },
      { id: "pre-construction-safety-meeting-agenda", why: "Run a professional kickoff meeting." },
      { id: "fall-protection-plan-template", why: "Cover the #1 construction hazard up front." },
      { id: "multi-employer-worksite-coordination-form", why: "Coordinate trades on shared sites." },
    ],
  },
  {
    slug: "roofing",
    name: "Roofing",
    headline: "Roofing Safety Starter Pack",
    intro:
      "Built for work at height and in the heat — fall protection, rescue planning, and the inspections that keep crews safe on the roof.",
    items: [
      { id: "roofing-contractor-safety-manual", why: "A written safety program tailored to roofing." },
      { id: "fall-protection-plan-template", why: "Document your fall hazards, systems, and anchors." },
      { id: "roof-work-jha", why: "Step-by-step hazard analysis for roof work." },
      { id: "harness-inspection-checklist", why: "Inspect harnesses before every use." },
      { id: "fall-rescue-plan-template", why: "Have a rescue plan before anyone goes up." },
      { id: "ladder-inspection-checklist", why: "Tag out damaged ladders before they fail." },
      { id: "heat-illness-prevention-plan", why: "Water, rest, and shade for hot roofs." },
    ],
  },
  {
    slug: "hvac",
    name: "HVAC",
    headline: "HVAC Contractor Safety Starter Pack",
    intro:
      "For crews juggling electrical, refrigerants, ladders, and brazing — the core programs and checks for safe service calls.",
    items: [
      { id: "hvac-contractor-safety-manual", why: "A written safety program tailored to HVAC." },
      { id: "loto-procedure-template", why: "De-energize and lock out before servicing units." },
      { id: "electrical-ppe-checklist", why: "PPE checks for electrical work." },
      { id: "hot-work-jha", why: "Plan brazing/soldering with a fire watch." },
      { id: "hazard-communication-program", why: "Manage refrigerants and chemicals with SDSs." },
      { id: "ladder-inspection-checklist", why: "Safe roof and attic access." },
      { id: "ppe-hazard-assessment-form", why: "Certify required PPE for your tasks." },
    ],
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    headline: "Plumbing Contractor Safety Starter Pack",
    intro:
      "Trenches, confined spaces, hot work, and chemicals — the documents plumbing crews actually need.",
    items: [
      { id: "plumbing-contractor-safety-manual", why: "A written safety program tailored to plumbing." },
      { id: "excavation-work-jha", why: "Cave-in protection and utility locating." },
      { id: "confined-space-jha", why: "Entry hazards for vaults and tanks." },
      { id: "hot-work-jha", why: "Soldering/torch work with a fire watch." },
      { id: "hazard-communication-program", why: "Solvents and drain chemicals, organized." },
      { id: "manual-material-handling-jha", why: "Protect backs on heavy lifts." },
      { id: "incident-report-form", why: "Document incidents and near-misses." },
    ],
  },
  {
    slug: "remodeling",
    name: "Remodeling",
    headline: "Remodeling Contractor Safety Starter Pack",
    intro:
      "Older homes mean silica, lead, and dust — plus ladders and power tools. Here's the awareness and paperwork to handle them.",
    items: [
      { id: "remodeling-contractor-safety-manual", why: "A written safety program tailored to remodeling." },
      { id: "renovation-safety-checklist", why: "Pre-job checks for existing structures." },
      { id: "asbestos-awareness-toolbox-talk", why: "Stop-and-report training for suspect materials." },
      { id: "lead-awareness-toolbox-talk", why: "Lead-safe work practices for pre-1978 homes." },
      { id: "tbt-45-silica-dust-awareness", why: "Control dust from cutting masonry and tile." },
      { id: "power-tool-use-jha", why: "Safe power-tool use." },
      { id: "ppe-hazard-assessment-form", why: "Certify required PPE for your tasks." },
    ],
  },
  {
    slug: "landscaping",
    name: "Landscaping",
    headline: "Landscaping Safety Starter Pack",
    intro:
      "Heat, equipment, and chemicals — the seasonal essentials to keep outdoor crews safe and documented.",
    items: [
      { id: "landscaping-safety-manual", why: "A written safety program tailored to landscaping." },
      { id: "heat-illness-prevention-plan", why: "Water, rest, shade, and acclimatization." },
      { id: "landscaping-equipment-jha", why: "Mowers, trimmers, and blowers — safely." },
      { id: "water-rest-shade-checklist", why: "Daily heat controls in one checklist." },
      { id: "trailer-inspection-checklist", why: "Safe towing and load securement." },
      { id: "hazard-communication-program", why: "Pesticides and chemicals, organized." },
      { id: "incident-report-form", why: "Document incidents and near-misses." },
    ],
  },
  {
    slug: "concrete",
    name: "Concrete",
    headline: "Concrete Contractor Safety Starter Pack",
    intro:
      "Silica, heat, and heavy work — the analyses and controls concrete crews rely on.",
    items: [
      { id: "concrete-contractor-safety-manual", why: "A written safety program tailored to concrete." },
      { id: "concrete-work-jha", why: "Forming, placing, and finishing hazards." },
      { id: "tbt-45-silica-dust-awareness", why: "Respirable silica control for cutting/grinding." },
      { id: "dust-control-checklist", why: "Water and vacuum dust controls." },
      { id: "heat-illness-prevention-plan", why: "Beat the heat with a real plan." },
      { id: "manual-material-handling-jha", why: "Protect backs on heavy lifts." },
      { id: "ppe-hazard-assessment-form", why: "Certify required PPE for your tasks." },
    ],
  },
  {
    slug: "painting",
    name: "Painting",
    headline: "Painting Contractor Safety Starter Pack",
    intro:
      "Solvents, ladders, lead in older homes, and respiratory protection — the documents painting crews need most.",
    items: [
      { id: "hazard-communication-program", why: "SDSs and labels for paints and solvents." },
      { id: "respiratory-ppe-pre-use-screening-form", why: "Start your respiratory protection program." },
      { id: "lead-awareness-toolbox-talk", why: "Lead-safe work in pre-1978 buildings." },
      { id: "ladder-inspection-checklist", why: "Inspect ladders before every use." },
      { id: "scaffold-use-checklist", why: "Verify scaffolds before you work from them." },
      { id: "ppe-hazard-assessment-form", why: "Certify required PPE for your tasks." },
      { id: "incident-report-form", why: "Document incidents and near-misses." },
    ],
  },
  {
    slug: "property-maintenance",
    name: "Property Maintenance",
    headline: "Property Maintenance Safety Starter Pack",
    intro:
      "A little of everything — ladders, electrical, chemicals, and slips. The core documents for maintenance teams.",
    items: [
      { id: "property-maintenance-safety-manual", why: "A written safety program for maintenance teams." },
      { id: "ladder-inspection-checklist", why: "Inspect ladders before elevated work." },
      { id: "loto-procedure-template", why: "Lock out equipment before servicing it." },
      { id: "hazard-communication-program", why: "Cleaning and maintenance chemicals, organized." },
      { id: "tbt-31-slips-trips-and-falls", why: "Prevent the most common injuries." },
      { id: "first-aid-kit-inspection-checklist", why: "Keep first-aid kits stocked and ready." },
      { id: "incident-report-form", why: "Document incidents and near-misses." },
    ],
  },
  {
    slug: "default",
    name: "All Trades",
    headline: "Contractor Safety Starter Pack",
    intro:
      "The core templates every contractor needs — viewable and printable right now. Tell us your trade for a pack tailored to your work.",
    items: [
      { id: "tbt-01-fall-protection-basics", why: "A ready-to-run 5-minute toolbox talk." },
      { id: "ladder-inspection-checklist", why: "Inspect ladders before every use." },
      { id: "blank-jha-template", why: "Break any task into steps, hazards, and controls." },
      { id: "ppe-hazard-assessment-form", why: "Certify the PPE your work requires." },
      { id: "incident-report-form", why: "Capture incidents and near-misses." },
      { id: "new-hire-safety-orientation-packet", why: "Onboard new hires in a documented way." },
      { id: "daily-jobsite-safety-checklist", why: "A 2-minute start-of-shift walk-through." },
    ],
  },
];

/** Resolve every pack's items against the catalog (titles/types stay accurate). */
export function getResolvedFreePacks(): Record<string, ResolvedPack> {
  const out: Record<string, ResolvedPack> = {};
  for (const p of RAW) {
    const items = p.items
      .map((it) => {
        const d = getDoc(it.id);
        return d
          ? {
              id: d.id,
              title: d.title,
              type: d.documentType,
              category: d.category,
              route: `/library/${d.id}`,
              why: it.why,
            }
          : null;
      })
      .filter(Boolean) as ResolvedItem[];
    out[p.slug] = {
      slug: p.slug,
      name: p.name,
      headline: p.headline,
      intro: p.intro,
      count: items.length,
      items,
    };
  }
  return out;
}
