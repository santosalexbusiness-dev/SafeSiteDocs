// Asbestos and Lead Awareness (15). Awareness-level only — abatement is for
// trained, licensed professionals. Emphasis: identify, stop, don't disturb.

const checklist = (intro, items) => ({
  body: `${intro}

| # | Item | Yes | No | N/A | Notes |
|---|---|:--:|:--:|:--:|---|
${items.map((it, i) => `| ${i + 1} | ${it} |  |  |  |  |`).join("\n")}

**Completed by:** [NAME]   **Date:** [DATE]`,
});

const SIGNIN = `**Attendance / Sign-In** — Date: [DATE]   Supervisor: [NAME]   Location: [JOBSITE]

| # | Print Name | Signature |
|---|---|---|
| 1 |  |  |
| 2 |  |  |
| 3 |  |  |
| 4 |  |  |
| 5 |  |  |`;

export default {
  "asbestos-awareness-policy-template": {
    body: `**Asbestos Awareness Policy for [COMPANY NAME].** *Awareness-level policy — our crews do not perform asbestos abatement.*

**1. Purpose** — Prevent disturbance of asbestos-containing materials (ACM) by our workers.

**2. Scope** — All employees, especially on renovation/demolition of older structures.

**3. Policy**
- Assume materials in older buildings may contain asbestos until determined otherwise (floor tile, mastic, insulation, joint compound, siding, etc.).
- Do **not** cut, drill, sand, break, or otherwise disturb suspect materials.
- If suspect material may be disturbed, **stop work** and report it (Suspect Material Stop Work Form).
- Only trained, licensed professionals assess and abate asbestos.
- Follow client/building survey information and do-not-disturb markings.

**4. Training** — Employees receive asbestos awareness training appropriate to their role.

**5. Responsibilities** — Management arranges assessment/abatement by qualified firms; employees stop and report.

Approved by: **[RESPONSIBLE PERSON]**   Date: **[DATE]**   This is awareness-level guidance, not abatement authorization. Review and customize based on applicable federal, state, local, client, and project-specific requirements.`,
  },

  "lead-awareness-policy-template": {
    body: `**Lead Awareness Policy for [COMPANY NAME].** *Awareness-level policy for recognizing and avoiding uncontrolled lead exposure.*

**1. Purpose** — Protect workers and others from lead exposure during work that may disturb lead-based paint (common in pre-1978 buildings).

**2. Scope** — All employees performing renovation, repair, or painting that could disturb paint in older structures.

**3. Policy**
- Assume paint in pre-1978 buildings may contain lead until determined otherwise.
- Do not dry-sand, dry-scrape, torch, or power-sand suspect lead paint without proper controls and trained personnel.
- Use lead-safe work practices (containment, dust control, cleanup) where work disturbs suspect paint.
- Avoid take-home lead: don't eat/drink/smoke in the area; wash hands/face; change out of work clothes.
- Work that exceeds awareness-level controls is performed by trained/certified personnel.

**4. Training** — Lead awareness and lead-safe practices appropriate to the work.

**5. Responsibilities** — Management arranges assessment and certified work where required; employees follow safe practices and report.

Approved by: **[RESPONSIBLE PERSON]**   Date: **[DATE]**   Review and customize based on applicable federal, state, local, client, and project-specific requirements.`,
  },

  "pre-renovation-hazard-questionnaire": {
    body: `Complete **before** starting renovation/demo to flag regulated materials (asbestos, lead, mold, etc.).

| Question | Answer |
|---|---|
| Year the building was built (approx.): | [____] |
| Will the work disturb painted surfaces? | ☐ Yes ☐ No |
| Will the work disturb flooring, tile, mastic, insulation, drywall/joint compound, or siding? | ☐ Yes ☐ No |
| Is there a prior asbestos/lead survey for this building? | ☐ Yes ☐ No — obtain if available |
| Are there suspect materials in the work area? | ☐ Yes ☐ No |
| Has the client/owner disclosed any known hazards? | ☐ Yes ☐ No |
| Could the work generate significant dust? | ☐ Yes ☐ No |

**If "Yes" to suspect materials/disturbance:** do not proceed with disturbing them until assessed. Refer to qualified professionals (Regulated Material Referral Form).
**Completed by:** [NAME]   **Date:** [DATE]`,
  },

  "suspect-material-stop-work-form": {
    body: `Use the moment a worker encounters or suspects a regulated material (asbestos/lead/other).

| Field | Entry |
|---|---|
| Date / time: | [____] |
| Location / area: | [____] |
| Material suspected: | [e.g., floor tile, pipe insulation, painted surface] |
| Why suspected: | [age, appearance, survey] |
| Work stopped? | ☐ Yes (required) |
| Area secured / signage posted? | ☐ Yes |
| Reported to: | [NAME] |

**Do not disturb the material. Do not resume work in the area until it is assessed by a qualified professional and you are cleared.**
**Reported by:** [NAME]   **Supervisor:** _________________   **Date:** [DATE]`,
  },

  "asbestos-lead-notification-checklist": checklist(
    "Verify notifications and information are handled before disturbing suspect materials.",
    [
      "Building age and survey status checked",
      "Client/owner asked about known asbestos/lead",
      "Prior survey obtained and reviewed (if available)",
      "Suspect materials identified and marked",
      "Qualified professional engaged for assessment where needed",
      "Any required notifications identified (confirm with a qualified firm/authority)",
      "Workers informed; do-not-disturb areas communicated",
    ]
  ),

  "building-material-survey-request-form": {
    body: `Request a hazardous-materials survey (asbestos/lead) from a qualified firm before disturbing suspect materials.

| Field | Entry |
|---|---|
| Building / address: | [____] |
| Approx. year built: | [____] |
| Scope of planned work: | [____] |
| Areas/materials to be disturbed: | [____] |
| Survey requested from: | [qualified firm] |
| Requested by: | [NAME] |
| Date needed: | [DATE] |

**Status:** ☐ Requested ☐ Scheduled ☐ Received   **Results location:** [____]
Do not disturb suspect materials until results are received and reviewed.`,
  },

  "asbestos-awareness-toolbox-talk": {
    body: `**Topic:** Asbestos Awareness

**5-Minute Lesson**
- Asbestos was used in many building materials before it was restricted — floor tile and mastic, pipe and boiler insulation, joint compound, ceiling texture, siding, and more.
- You can't tell if a material contains asbestos just by looking — it has to be tested.
- Disturbing asbestos releases tiny fibers that cause serious lung disease and cancer, often decades later.
- Our rule: if you might disturb a suspect material, **stop and report it** — don't cut, drill, sand, or break it.
- Only trained, licensed professionals assess and remove asbestos.

**Key Hazards**
- Releasing fibers by disturbing suspect materials
- Assuming a material is safe without testing
- Long-latency lung disease and cancer
- Spreading contamination on clothing/tools

**Discussion Questions**
1. What suspect materials could be in the building we're working on?
2. What do we do the moment we find or suspect one?
3. Who is allowed to handle asbestos — and it isn't us, right?

**Crew Checklist**
- [ ] Suspect materials identified before disturbing anything
- [ ] Stop work and report if found
- [ ] No cutting/drilling/sanding of suspect material
- [ ] Licensed professionals handle assessment/abatement

${SIGNIN}`,
  },

  "lead-awareness-toolbox-talk": {
    body: `**Topic:** Lead Awareness

**5-Minute Lesson**
- Lead-based paint is common in buildings built before 1978. Sanding, scraping, cutting, or demo can release lead dust and fumes.
- Lead harms the nervous system and organs, and you can carry it home to your family on clothes, skin, and tools.
- Use lead-safe practices when disturbing suspect paint: contain the area, control dust (wet methods/HEPA), and clean up carefully.
- Don't eat, drink, or smoke in the work area; wash hands and face before breaks; change out of work clothes.
- Work beyond awareness-level controls is done by trained/certified personnel.

**Key Hazards**
- Lead poisoning from dust and fumes
- Take-home lead exposure to families
- Dry sanding/scraping/torching without controls
- Eating/smoking with lead on hands

**Discussion Questions**
1. Could we disturb lead paint on this job?
2. What controls and PPE do we use if we do?
3. How do we avoid taking lead home?

**Crew Checklist**
- [ ] Lead-disturbing tasks identified
- [ ] Containment and dust controls in place
- [ ] Proper PPE/respirator per the program
- [ ] Wash up; no eating/smoking in the area

${SIGNIN}`,
  },

  "renovation-safety-checklist": checklist(
    "Verify hazards are addressed before and during renovation of existing structures.",
    [
      "Pre-renovation hazard questionnaire completed",
      "Asbestos/lead suspect materials assessed (or avoided)",
      "Utilities located and de-energized/isolated as needed",
      "Dust controls planned (silica, lead, general)",
      "Occupant/public protection and containment in place",
      "PPE and respiratory protection appropriate to the work",
      "Waste handling and cleanup planned",
    ]
  ),

  "client-hazard-disclosure-form": {
    body: `*Coordinate disclosures with legal counsel.* Use to request and record what the client/owner knows about building hazards.

| Field | Entry |
|---|---|
| Project / address: | [____] |
| Client / owner: | [____] |
| Known asbestos-containing materials? | ☐ Yes ☐ No ☐ Unknown — details: [____] |
| Known lead-based paint? | ☐ Yes ☐ No ☐ Unknown — details: [____] |
| Prior surveys/reports available? | ☐ Yes ☐ No — provide copies |
| Other known hazards (mold, PCBs, etc.): | [____] |

**Client/owner representative:** ____________________   **Date:** [DATE]
**[COMPANY NAME] representative:** ____________________   **Date:** [DATE]
*Disclosure obligations vary — confirm requirements with qualified counsel and authorities.*`,
  },

  "dust-control-checklist": checklist(
    "Verify dust controls for dust-generating work (silica, lead, wood, general).",
    [
      "Source controls selected (water/wet methods or tool-mounted HEPA vacuum)",
      "Containment/enclosure where needed to limit spread",
      "Negative pressure/HEPA filtration if required by the task",
      "Bystanders and occupants kept clear of the dust zone",
      "No dry sweeping of hazardous dust (use water or HEPA vacuum)",
      "Respiratory protection per the relevant program",
      "Cleanup and waste handling planned (HEPA/wet methods)",
    ]
  ),

  "ppe-checklist-for-dust-generating-work": checklist(
    "Verify PPE for dust-generating tasks (after source controls).",
    [
      "Respiratory protection appropriate to the dust (per program)",
      "Eye protection (goggles) for fine dust",
      "Coveralls/protective clothing where needed (esp. lead)",
      "Gloves appropriate to the task",
      "Head and foot protection as required",
      "Hygiene plan: wash facilities; no eat/drink/smoke in the area",
      "Clothing change-out to prevent take-home contamination",
    ]
  ),

  "regulated-material-referral-form": {
    body: `Refer suspect regulated materials to a qualified/licensed professional for assessment or abatement.

| Field | Entry |
|---|---|
| Project / address: | [____] |
| Material / location: | [____] |
| Suspected hazard (asbestos/lead/other): | [____] |
| Reason for referral: | [____] |
| Referred to (firm/contact): | [____] |
| Date referred: | [DATE] |
| Work in the area paused until cleared? | ☐ Yes |

**Referred by:** [NAME]   **Supervisor:** _________________
Do not disturb the material; await assessment/clearance.`,
  },

  "contractor-awareness-acknowledgment": {
    body: `I acknowledge that I have received asbestos and lead **awareness** training/information from [COMPANY NAME] and that I understand:
- Older buildings may contain asbestos-containing materials and lead-based paint that cannot be identified by sight alone.
- I will **not** cut, drill, sand, break, or otherwise disturb suspect materials.
- If I encounter or suspect a regulated material that may be disturbed, I will **stop work and report it** immediately.
- Only trained, licensed professionals assess and abate asbestos and perform regulated lead work.
- I will follow lead-safe and dust-control practices and hygiene rules where applicable to avoid exposure and take-home contamination.

**Employee/Contractor (print):** ____________________   **Signature:** ____________________   **Date:** [DATE]
**Supervisor:** ____________________   **Date:** [DATE]
*Awareness-level acknowledgment — not authorization to perform abatement.*`,
  },

  "do-not-disturb-material-sign-template": {
    body: `[ Printable sign — fill in, print, and post at the suspect material/area. ]

> ## ⚠ DO NOT DISTURB
> **SUSPECT REGULATED MATERIAL (POSSIBLE ASBESTOS / LEAD)**
>
> Location: [____]
> Do not cut, drill, sand, break, or remove.
> Posted by: [NAME]   Date: [DATE]
> Questions / before any work here, contact: [NAME / PHONE]
>
> This area is pending assessment by a qualified professional.`,
  },
};
