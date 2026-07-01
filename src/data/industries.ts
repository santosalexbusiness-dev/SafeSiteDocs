/** Industries served — used on the home grid, library filters, and SEO copy. */
export type Industry = {
  slug: string;
  name: string;
  icon: string; // lucide icon name
  blurb: string;
};

export const industries: Industry[] = [
  { slug: "electrical", name: "Electrical Contractors", icon: "Zap", blurb: "LOTO, arc flash, GFCI, and qualified-person paperwork." },
  { slug: "general", name: "General Contractors", icon: "Building2", blurb: "Multi-trade programs, subcontractor management, site safety." },
  { slug: "roofing", name: "Roofing", icon: "Home", blurb: "Fall protection plans, ladder and harness inspections." },
  { slug: "hvac", name: "HVAC", icon: "Wind", blurb: "Refrigerant handling, LOTO, ladder, and electrical safety." },
  { slug: "plumbing", name: "Plumbing", icon: "Wrench", blurb: "Confined space, trenching, HazCom, and hot work." },
  { slug: "remodeling", name: "Remodeling", icon: "Hammer", blurb: "Silica, lead-safe work, ladders, and power tools." },
  { slug: "landscaping", name: "Landscaping", icon: "Trees", blurb: "Heat illness, equipment, chemicals, and PPE." },
  { slug: "concrete", name: "Concrete", icon: "Layers", blurb: "Silica, heat, formwork, and heavy equipment." },
  { slug: "painting", name: "Painting", icon: "Paintbrush", blurb: "HazCom, respiratory protection, ladders, and lead-safe work." },
  { slug: "property-maintenance", name: "Property Maintenance", icon: "Building", blurb: "General duty programs, ladders, electrical, and chemicals." },
];

export const industryBySlug = (slug: string) =>
  industries.find((i) => i.slug === slug);
