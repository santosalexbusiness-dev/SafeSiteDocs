// PPE Documents (14 non-sample). Real matrices, logs, checklists, and guides.

const inspectChecklist = (intro, items) => ({
  body: `${intro}

| # | Item | Pass | Fail | N/A | Notes |
|---|---|:--:|:--:|:--:|---|
${items.map((it, i) => `| ${i + 1} | ${it} |  |  |  |  |`).join("\n")}

**Inspected by:** [NAME]   **Signature:** _________________   **Date:** [DATE]
Remove failed items from service immediately.`,
});

export default {
  "ppe-selection-matrix": {
    body: `Map each task/area to its hazards and the PPE required. Build this from your PPE Hazard Assessment.

| Task / Area | Hazards Present | Head | Eye/Face | Hearing | Hands | Feet | Body/Other |
|---|---|:--:|:--:|:--:|:--:|:--:|---|
| [e.g., grinding] | flying particles, noise | ☐ | Goggles + shield | Plugs | Cut gloves | Safety-toe | — |
| [e.g., chemical handling] | splash | ☐ | Goggles/shield | — | Chem gloves | Safety-toe | Apron |
| [e.g., overhead work] | falling objects | Hard hat | Glasses | — | Gloves | Safety-toe | — |
| [Add task] |  |  |  |  |  |  |  |

**Prepared by:** [NAME]   **Date:** [DATE]   Review and customize for your actual tasks and hazards.`,
  },

  "ppe-issue-log": {
    body: `Record PPE issued to employees.

| Date | Employee | PPE Item | Type / Size | Quantity | Issued By | Employee Initials |
|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |`,
  },

  "ppe-inspection-checklist": inspectChecklist(
    "Inspect PPE before use. Mark each item.",
    [
      "Hard hat — no cracks, dents, or heavy UV damage; suspension intact",
      "Eye/face protection — no cracks, deep scratches; clear vision",
      "Hearing protection — clean, intact, correct fit",
      "Gloves — no holes, tears, or contamination; correct type",
      "Footwear — soles and toe protection intact",
      "High-visibility clothing — clean, visible, not faded",
      "Fall protection PPE — see dedicated harness/lanyard checklist",
    ]
  ),

  "ppe-replacement-log": {
    body: `Track PPE replaced and why (wear, damage, expiration).

| Date | Employee | Item Replaced | Reason | Old Item Removed/Disposed | Replaced By |
|---|---|---|---|---|---|
|  |  |  |  | ☐ |  |
|  |  |  |  | ☐ |  |
|  |  |  |  | ☐ |  |
|  |  |  |  | ☐ |  |`,
  },

  "ppe-acknowledgment-form-ppe": {
    body: `I acknowledge that [COMPANY NAME] has trained me on the PPE program — why PPE is required, how to select it from the hazard assessment, and how to use, inspect, clean, store, and replace it. I agree to wear required PPE, inspect it before use, and report damaged or worn PPE.

**Employee (print):** ____________________   **Signature:** ____________________   **Date:** [DATE]
**Trainer/Supervisor:** ____________________   **Date:** [DATE]`,
  },

  "eye-and-face-protection-checklist": inspectChecklist(
    "Verify eye and face protection for the task before work.",
    [
      "Correct protection for the hazard (impact, dust, splash, radiation)",
      "Safety glasses have side protection",
      "Goggles used for dust or chemical splash",
      "Face shield worn over glasses/goggles for grinding/cutting/chemicals",
      "Lenses clean, not cracked or deeply scratched",
      "Proper fit; no gaps",
      "Eyewash station identified and functional (for chemical work)",
    ]
  ),

  "hand-protection-selection-guide": {
    body: `Use this guide to choose the right glove for the hazard. Match the glove to the task; no single glove fits all.

| Hazard | Recommended Glove Type | Notes |
|---|---|---|
| Cuts / sharp materials | Cut-resistant (rated) | Match the cut level to the task |
| Abrasion / general handling | Leather or coated work gloves | Durability for rough material |
| Chemicals / solvents | Chemical-resistant (per SDS) | Verify the material resists the specific chemical |
| Heat / hot work | Heat-resistant / welding gloves | Not for electrical work |
| Electrical | Insulating gloves (rated/tested) | Part of electrical PPE program only |
| Cold / wet | Insulated / waterproof | Maintain dexterity |
| Vibration | Anti-vibration | For prolonged powered-tool use |

**Caution:** do not wear gloves near rotating equipment that can grab them. Inspect gloves before use and replace when worn or contaminated.
**Prepared by:** [NAME]   **Date:** [DATE]   Confirm selections against the chemical SDS and task hazards.`,
  },

  "foot-protection-checklist": inspectChecklist(
    "Verify foot protection for the task and conditions.",
    [
      "Safety-toe footwear where crush/impact hazards exist",
      "Puncture-resistant soles where nails/debris present",
      "Slip-resistant soles for wet/sloped surfaces",
      "Electrical-hazard rated footwear where needed",
      "Metatarsal guards for heavy material handling (if applicable)",
      "Footwear in good condition — soles not worn through",
      "Laces tied; proper fit",
    ]
  ),

  "head-protection-checklist": inspectChecklist(
    "Verify head protection before work.",
    [
      "Hard hat worn where falling/flying/fixed-object or electrical hazards exist",
      "Correct type/class for the hazard (incl. electrical)",
      "Shell free of cracks, dents, and heavy UV/chalking",
      "Suspension intact and adjusted for a snug fit",
      "Within manufacturer's service life",
      "Not stored in direct sun/heat (e.g., dashboard)",
      "Accessories (face shield, earmuffs) compatible and secure",
    ]
  ),

  "hearing-protection-checklist": inspectChecklist(
    "Verify hearing protection in noisy areas.",
    [
      "Noise level warrants protection (raise voice at arm's length = protect)",
      "Protection rated adequately for the noise",
      "Earplugs inserted correctly / muffs seal fully",
      "Double protection used for very high noise",
      "Plugs/muffs clean and in good condition",
      "Exposure time managed/rotated where possible",
      "Workers can still hear needed alarms/communication",
    ]
  ),

  "high-visibility-clothing-policy": {
    body: `**1. Purpose** — Ensure workers are visible to operators and drivers near traffic and moving equipment.

**2. Scope** — All employees of [COMPANY NAME] working near vehicle traffic, moving equipment, or as required by the site/client.

**3. Policy Statement** — High-visibility apparel is worn where workers may be exposed to traffic or moving equipment.

**4. Requirements**
- Wear high-visibility garments in designated areas and tasks (flagging, near roadways, around equipment).
- Use the appropriate class for the exposure and conditions (including low-light/night).
- Keep garments clean and visible; replace faded or damaged items.
- Follow any stricter client or site requirements.

**5. Responsibilities** — Management provides garments; supervisors enforce; employees wear and maintain them.

**6. Enforcement** — Per the Disciplinary Safety Policy.

Approved by: **[RESPONSIBLE PERSON]**   Date: **[DATE]**   Review and customize for applicable requirements.`,
  },

  "respiratory-ppe-pre-use-screening-form": {
    body: `**Respiratory protection is more than a mask** — it requires a full program (hazard assessment, medical evaluation, fit testing, and training) before use. This form routes you to that program.

| Field | Entry |
|---|---|
| Task that may require a respirator: | [____] |
| Airborne hazard suspected: | [____] |
| Source controls tried first (ventilation/wet/vacuum): | [____] |
| Is the employee in the Respiratory Protection Program? | ☐ Yes ☐ No |
| Medical evaluation on file? | ☐ Yes ☐ No |
| Fit test current? | ☐ Yes ☐ No |
| Respirator type/cartridge selected: | [____] |

**Do not assign a required respirator until the program steps are complete.** See the Respiratory Protection Program.
**Reviewed by:** [NAME]   **Date:** [DATE]`,
  },

  "fall-protection-ppe-inspection-form": {
    body: `Inspect fall protection PPE before each use and remove damaged equipment from service immediately.

**User:** [NAME]   **Equipment ID:** [____]   **Date:** [DATE]

| Component | Item | Pass | Fail |
|---|---|:--:|:--:|
| Harness | Webbing — no cuts, fraying, burns, chemical damage | ☐ | ☐ |
| Harness | Stitching intact | ☐ | ☐ |
| Harness | D-rings/buckles — no cracks, distortion, corrosion | ☐ | ☐ |
| Lanyard/SRL | Webbing/cable and stitching intact | ☐ | ☐ |
| Lanyard/SRL | Shock pack not deployed; SRL retracts/locks | ☐ | ☐ |
| Connectors | Snap hooks/carabiners lock; gates function | ☐ | ☐ |
| Labels | Legible; within service life | ☐ | ☐ |

**Result:** ☐ Pass ☐ Remove from service   **Inspected by:** _________________   **Date:** [DATE]`,
  },

  "ppe-training-record": {
    body: `Document PPE training for each employee.

**Employee:** [NAME]   **Date:** [DATE]   **Trainer:** [NAME]

Training covered:
- [ ] When PPE is necessary
- [ ] What PPE is necessary (from hazard assessment)
- [ ] How to properly don, doff, adjust, and wear PPE
- [ ] Limitations of the PPE
- [ ] Inspection, care, maintenance, useful life, and disposal

**Employee demonstrated understanding/use:** ☐ Yes ☐ Needs follow-up
**Employee signature:** ____________________   **Trainer signature:** ____________________`,
  },
};
