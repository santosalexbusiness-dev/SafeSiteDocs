// Hazard Communication / SDS (15). Programs, inventories, labels, logs, JHA.

const checklist = (intro, items) => ({
  body: `${intro}

| # | Item | Yes | No | N/A | Notes |
|---|---|:--:|:--:|:--:|---|
${items.map((it, i) => `| ${i + 1} | ${it} |  |  |  |  |`).join("\n")}

**Reviewed by:** [NAME]   **Date:** [DATE]`,
});

export default {
  "hazard-communication-program": {
    body: `**Written Hazard Communication Program for [COMPANY NAME].**

### 1. Purpose & Scope
Ensure employees know the hazards of the chemicals they work with and how to protect themselves. Applies to all hazardous chemicals on site.

### 2. Responsibilities
- Program coordinator: **[NAME]**. Supervisors enforce; employees follow.

### 3. Chemical Inventory
- A current list of hazardous chemicals is maintained (see Chemical Inventory Form).

### 4. Safety Data Sheets (SDS)
- An SDS is kept and accessible for every hazardous chemical (binder/app). Employees know how to access them.

### 5. Labels
- Shipped containers keep manufacturer labels; secondary containers are labeled with product identity and hazards.

### 6. Training
- Employees are trained on the program, hazards, label/SDS reading, and protective measures — at assignment and when new hazards are introduced.

### 7. Non-Routine Tasks & Contractors
- Hazards of non-routine tasks are communicated; contractors are informed of chemicals they may encounter (and inform us of theirs).

### 8. Review
- Reviewed at least annually (Annual HazCom Review Checklist). Review and customize based on applicable federal, state, local, client, and project-specific requirements.

Prepared by: **[RESPONSIBLE PERSON]**   Approved: _________________   Date: **[DATE]**`,
  },

  "chemical-inventory-form": {
    body: `Maintain a current list of hazardous chemicals on site. Update when chemicals are added or removed.

| Product Name | Manufacturer | Location/Use | Container Size | SDS on File? | Date Added |
|---|---|---|---|:--:|---|
|  |  |  |  | ☐ |  |
|  |  |  |  | ☐ |  |
|  |  |  |  | ☐ |  |
|  |  |  |  | ☐ |  |
|  |  |  |  | ☐ |  |

**Maintained by:** [NAME]   **Last updated:** [DATE]`,
  },

  "sds-index-template": {
    body: `Index your Safety Data Sheets so any one can be found quickly.

| # | Product Name | Manufacturer | SDS Date | Location (binder tab/app) |
|---|---|---|---|---|
| 1 |  |  |  |  |
| 2 |  |  |  |  |
| 3 |  |  |  |  |
| 4 |  |  |  |  |
| 5 |  |  |  |  |

**Maintained by:** [NAME]   **Updated:** [DATE]   Keep this index matched to the Chemical Inventory.`,
  },

  "sds-binder-table-of-contents": {
    body: `Organize your SDS binder for fast access during an exposure or emergency.

| Tab | Section | Contents |
|---|---|---|
| 1 | How to read an SDS | Quick reference (16-section format) |
| 2 | Chemical Inventory | Current list of hazardous chemicals |
| 3 | SDS Index | Alphabetical index of SDSs |
| 4 | SDSs A–M | Safety Data Sheets |
| 5 | SDSs N–Z | Safety Data Sheets |
| 6 | SDS Request Log | Missing/requested SDSs |

**Binder owner:** [NAME]   **Location:** [____]   **Last reviewed:** [DATE]`,
  },

  "chemical-labeling-checklist": checklist(
    "Verify chemical container labeling.",
    [
      "Shipped containers retain the manufacturer label",
      "Labels include product identifier, signal word, pictograms, hazard/precautionary statements",
      "Secondary/working containers are labeled with product and hazards",
      "Labels are legible and not damaged/faded",
      "No unlabeled containers in use or storage",
      "Portable container exemption only when used by the same employee in one shift",
      "Damaged labels replaced",
    ]
  ),

  "secondary-container-label-template": {
    body: `[ Printable secondary container label — fill in and affix. ]

> **PRODUCT:** [PRODUCT NAME]
> **HAZARDS:** [e.g., flammable, irritant, corrosive]
> **PICTOGRAM(S):** [list / draw]
> **PRECAUTIONS / PPE:** [e.g., gloves, eye protection, ventilation]
> **SDS available:** [location]
> Filled by: [NAME]   Date: [DATE]

Use a label whenever a chemical is transferred to a secondary container that isn't used up by the same worker within the shift. Match the hazards to the SDS.`,
  },

  "hazcom-training-log": {
    body: `Document HazCom training.

| Date | Employee | Topics (program, labels, SDS, hazards, PPE) | Specific Chemicals Covered | Trainer | Signature |
|---|---|---|---|---|---|
|  |  |  |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |`,
  },

  "chemical-storage-inspection-checklist": checklist(
    "Inspect chemical storage areas.",
    [
      "Chemicals stored per SDS (temperature, ventilation, compatibility)",
      "Incompatible chemicals separated (e.g., oxidizers from flammables)",
      "Flammables in approved containers/cabinets, away from ignition",
      "Containers closed, labeled, and not damaged/leaking",
      "Secondary containment where needed",
      "Spill kit available and stocked",
      "Storage area clean, ventilated, and access-controlled",
    ]
  ),

  "chemical-spill-response-plan": {
    body: `**Chemical Spill Response Plan for [COMPANY NAME].** Customize per site and chemical.

### 1. Before Work
- Know the chemicals present, their SDSs, the spill kit location, and PPE required.

### 2. Small Spill (within trained capability)
1. Alert others; control the source if safe. 2. Don PPE per the SDS. 3. Contain with the spill kit (absorbent/booms). 4. Clean up and place waste in proper containers. 5. Report and replenish the kit.

### 3. Large or Hazardous Spill (beyond capability)
1. Evacuate the area; deny entry. 2. Call 911 and the site contact. 3. Provide the SDS to responders. 4. Do not attempt cleanup beyond your training.

### 4. After
- Document the spill, investigate the cause, and take corrective action.

| Field | Entry |
|---|---|
| Spill kit location: | [____] |
| Emergency number: | **911** / [____] |
| Site address for 911: | [____] |

Review and customize based on applicable federal, state, local, client, and project-specific requirements.`,
  },

  "new-chemical-approval-form": {
    body: `Review new chemicals before bringing them on site.

| Field | Entry |
|---|---|
| Product name / manufacturer: | [____] |
| Intended use / location: | [____] |
| Requested by: | [NAME] |
| SDS obtained and reviewed? | ☐ Yes |
| Hazards identified: | [____] |
| Required PPE / ventilation: | [____] |
| Storage/compatibility needs: | [____] |
| Safer alternative considered? | [____] |
| Approved? | ☐ Yes ☐ No — by: [NAME]   Date: [DATE] |

Add the approved chemical to the Chemical Inventory and SDS Index.`,
  },

  "hazardous-substance-use-jha": {
    body: `**Task / Job:** Working with a hazardous substance ([PRODUCT])   **Location:** [____]   **Date:** [DATE]

Review the SDS first. Customize for the specific chemical.

| Task Step | Potential Hazards | Controls / Safe Work Practices | Responsible |
|---|---|---|---|
| Review SDS and set up | Unknown hazards | Read SDS; gather PPE; ensure ventilation; eyewash available | [Name] |
| Open/transfer chemical | Splash, vapor | Pour carefully; secondary containment; label secondary containers | [Name] |
| Apply/use chemical | Skin/eye contact, inhalation | PPE per SDS; ventilation; no eating/smoking | [Name] |
| Clean up and store | Spills, reactions | Spill kit ready; store per SDS; dispose correctly | [Name] |

**Required PPE:** [per SDS]   **First aid (per SDS):** [____]
**Reviewed with crew by:** [NAME]   **Date:** [DATE]`,
  },

  "employee-chemical-exposure-report": {
    body: `Document a suspected or actual chemical exposure (also complete the company Incident Report Form).

| Field | Entry |
|---|---|
| Employee: | [NAME] |
| Date / time of exposure: | [____] |
| Chemical / product: | [____] |
| Route (skin, eyes, inhalation, ingestion): | [____] |
| How it happened: | [____] |
| Symptoms (if any): | [____] |
| First aid given (per SDS): | [____] |
| Medical treatment sought? | ☐ Yes ☐ No |
| SDS reviewed/provided to provider? | ☐ Yes |
| Corrective actions: | [____] |

**Reported by:** [NAME]   **Supervisor:** _________________   **Date:** [DATE]
Keep medical details confidential.`,
  },

  "contractor-chemical-use-form": {
    body: `Use to exchange chemical hazard information with contractors/subcontractors sharing the site.

| Field | Entry |
|---|---|
| Contractor company: | [____] |
| Chemicals they will bring/use: | [____] |
| SDSs provided to [COMPANY NAME]? | ☐ Yes |
| Hazards and precautions communicated to affected workers? | ☐ Yes |
| Chemicals our company uses that they should know about: | [____] |
| Coordination notes (storage, ventilation, timing): | [____] |

**Contractor rep:** ____________________   **[COMPANY NAME] rep:** ____________________   **Date:** [DATE]`,
  },

  "annual-hazcom-review-checklist": checklist(
    "Review the HazCom program at least annually.",
    [
      "Written program is current and accurate",
      "Chemical inventory matches what's actually on site",
      "An SDS is on file and accessible for every chemical",
      "Containers are properly labeled (primary and secondary)",
      "Employees are trained, including on new chemicals/hazards",
      "Storage and compatibility are correct",
      "Spill response capability and kits are ready",
    ]
  ),

  "sds-request-log": {
    body: `Track SDSs that are missing and requested from manufacturers/suppliers.

| Date Requested | Product | Manufacturer/Supplier | Requested By | Received? | Date Received |
|---|---|---|---|:--:|---|
|  |  |  |  | ☐ |  |
|  |  |  |  | ☐ |  |
|  |  |  |  | ☐ |  |
|  |  |  |  | ☐ |  |`,
  },
};
