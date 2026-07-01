/**
 * Contractor prequalification ("compliance") offer.
 * This is the highest-intent buying trigger in the niche: a GC/client tells a
 * contractor they must be "ISNetworld/Avetta compliant" to keep working.
 *
 * IMPORTANT positioning (consistent with the site disclaimer): we help contractors
 * ASSEMBLE and RESPOND to document requests. We do NOT submit on their behalf and
 * do NOT guarantee acceptance, approval, or a passing score.
 */

export type PrequalPlatform = { name: string; mark: string; blurb: string };

export const prequalPlatforms: PrequalPlatform[] = [
  { name: "ISNetworld", mark: "®", blurb: "RAVS-style written programs and documentation requests." },
  { name: "Avetta", mark: "®", blurb: "Safety program and policy documentation." },
  { name: "Veriforce", mark: "®", blurb: "Program and form documentation requests." },
  { name: "PEC Premier", mark: "®", blurb: "Contractor safety documentation." },
  { name: "PICS", mark: "®", blurb: "Prequalification document packages." },
  { name: "BROWZ", mark: "®", blurb: "Safety and compliance documentation." },
];

export const complianceIncludes = [
  "A written safety program tailored to your trade and work",
  "The policies and forms commonly requested during prequalification",
  "An organized, company-branded binder (editable Word + clean PDF)",
  "Documents mapped to the topics reviewers typically ask for",
  "A document index so you can find and upload items fast",
  "Plain-language content your crews can actually use",
];

export const complianceSteps = [
  { step: 1, title: "Tell us who's requiring it", description: "Which platform (ISNetworld, Avetta, Veriforce…) and what your client/GC asked for." },
  { step: 2, title: "We map the documents", description: "We identify the written programs and forms typically requested for your trade and hazards." },
  { step: 3, title: "We build your package", description: "A company-branded binder with the relevant programs, forms, and logs — editable and PDF." },
  { step: 4, title: "You respond with confidence", description: "Upload organized, professional documentation. You review and submit; you stay in control." },
];

/** Trademark + no-guarantee notice. Shown wherever platforms are named. */
export const TRADEMARK_NOTE =
  "ISNetworld®, Avetta®, Veriforce®, PEC®, PICS®, and BROWZ® are trademarks of their respective owners. SafeSite Documents is not affiliated with, endorsed by, or sponsored by any of these companies. We provide editable safety-document templates to help you assemble and respond to document requests — we do not submit on your behalf and do not guarantee acceptance, approval, or a passing score. You remain responsible for your safety program, the accuracy of your submissions, and meeting each platform's and client's requirements.";
