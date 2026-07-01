// Respiratory Protection (10). Program, assessments, logs, schedules, forms.

export default {
  "respiratory-protection-program-placeholder": {
    body: `**Respiratory Protection Program for [COMPANY NAME].** *Placeholder framework — a required respirator program has specific elements that must be completed and overseen by a qualified person/program administrator before respirators are used.*

### 1. Program Administrator
- **[NAME]** administers the program and evaluates its effectiveness.

### 2. Hazard Assessment
- Identify respiratory hazards and exposures (see Respirator Hazard Assessment Form). Control at the source first (ventilation, wet methods, substitution).

### 3. Respirator Selection
- Select appropriate respirators/cartridges based on the hazard (see Respirator Selection Worksheet).

### 4. Medical Evaluation
- Employees are medically evaluated and cleared before using a respirator (track on the Medical Evaluation Tracking Log).

### 5. Fit Testing
- Tight-fitting respirators are fit-tested before use and periodically; no facial hair under the seal (Fit Test Tracking Log).

### 6. Use, Inspection, Cleaning, Storage
- Inspect before/after use; clean and store properly; change cartridges on schedule.

### 7. Training
- Train users on hazards, limitations, use, and maintenance.

### 8. Recordkeeping & Review
- Maintain records; evaluate the program regularly.

**Complete each element with a qualified person before assigning required respirators.** Review and customize based on applicable federal, state, local, client, and project-specific requirements.

Prepared by: **[RESPONSIBLE PERSON]**   Date: **[DATE]**`,
  },

  "respirator-hazard-assessment-form": {
    body: `Assess respiratory hazards before selecting respirators. Control at the source first.

| Field | Entry |
|---|---|
| Task / process: | [____] |
| Airborne hazard(s): | [e.g., silica, lead, fumes, solvents] |
| Form (dust/fume/mist/vapor/gas): | [____] |
| Estimated exposure / basis: | [____] |
| Source controls applied (ventilation/wet/vacuum/substitution): | [____] |
| Is a respirator required after controls? | ☐ Yes ☐ No |
| Type/cartridge indicated: | [____] |
| IDLH or oxygen-deficient conditions? | ☐ Yes (special requirements) ☐ No |

**Assessed by (qualified person):** _________________   **Date:** [DATE]`,
  },

  "respirator-selection-worksheet": {
    body: `Document respirator selection based on the hazard assessment.

| Field | Entry |
|---|---|
| Hazard / contaminant: | [____] |
| Respirator type (APR/PAPR/SAR, etc.): | [____] |
| Cartridge/filter type (e.g., P100, OV): | [____] |
| Assigned protection factor adequate? | ☐ Yes |
| Facepiece type/size: | [____] |
| Basis for selection: | [____] |
| Selected by (qualified person): | [NAME] |

**Date:** [DATE]   Verify selection against the contaminant and conditions.`,
  },

  "medical-evaluation-tracking-log": {
    body: `Track respirator medical evaluations/clearances (keep medical details confidential with the provider).

| Employee | Date Evaluated | Cleared? | Restrictions | Re-eval Due | Tracked By |
|---|---|:--:|---|---|---|
|  |  | ☐ |  |  |  |
|  |  | ☐ |  |  |  |
|  |  | ☐ |  |  |  |
|  |  | ☐ |  |  |  |`,
  },

  "fit-test-tracking-log": {
    body: `Track respirator fit tests for tight-fitting respirators.

| Employee | Respirator Make/Model/Size | Test Type (QLFT/QNFT) | Date | Pass/Fail | Next Due |
|---|---|---|---|---|---|
|  |  |  |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |

*No facial hair under the seal; re-test when facepiece changes or facial changes affect the seal.*`,
  },

  "respirator-inspection-checklist": {
    body: `Inspect the respirator before and after each use.

| # | Item | Pass | Fail |
|---|---|:--:|:--:|
| 1 | Facepiece — no cracks, tears, or distortion | ☐ | ☐ |
| 2 | Straps — elastic, not torn, buckles work | ☐ | ☐ |
| 3 | Valves — present, clean, seat properly | ☐ | ☐ |
| 4 | Cartridges/filters — correct type, not expired/clogged | ☐ | ☐ |
| 5 | Seals/gaskets — intact | ☐ | ☐ |
| 6 | Seal check (user) — positive and negative | ☐ | ☐ |

**User:** [NAME]   **Date:** [DATE]   Remove from service if any item fails.`,
  },

  "respirator-cleaning-log": {
    body: `Log cleaning and disinfecting of reusable respirators.

| Date | Employee/Respirator ID | Cleaned/Disinfected By | Method | Stored Properly? |
|---|---|---|---|:--:|
|  |  |  |  | ☐ |
|  |  |  |  | ☐ |
|  |  |  |  | ☐ |
|  |  |  |  | ☐ |`,
  },

  "respirator-cartridge-change-out-schedule-template": {
    body: `Establish and document a cartridge change-out schedule (do not rely on smell/taste for change-out).

| Field | Entry |
|---|---|
| Contaminant: | [____] |
| Cartridge type: | [____] |
| Change-out basis (schedule/end-of-service-life indicator): | [____] |
| Change-out frequency: | [e.g., daily / per shift / per use] |
| Conditions affecting service life (humidity, concentration): | [____] |

| Date | Respirator/User | Cartridge Changed | By | Next Due |
|---|---|:--:|---|---|
|  |  | ☐ |  |  |
|  |  | ☐ |  |  |

**Established by (qualified person):** _________________   **Date:** [DATE]`,
  },

  "voluntary-respirator-use-form": {
    body: `For employees who voluntarily use a respirator (e.g., a filtering facepiece/dust mask) where one isn't required.

I understand that [COMPANY NAME] allows voluntary respirator use where exposures are below required levels. I have received the basic information about voluntary use, including that:
- I should use the respirator according to the manufacturer's instructions.
- I should keep it clean and not share it.
- Some respirators (other than filtering facepieces) require medical evaluation even for voluntary use.

| Field | Entry |
|---|---|
| Employee: | [NAME] |
| Respirator type: | [____] |
| Required or voluntary? | Voluntary |

**Employee signature:** ____________________   **Date:** [DATE]
*Confirm which voluntary-use requirements apply to your situation.*`,
  },

  "respiratory-protection-training-log": {
    body: `Document respiratory protection training.

| Date | Employee | Topics (hazards, limitations, use, seal check, maintenance) | Hands-on? | Trainer | Signature |
|---|---|---|:--:|---|---|
|  |  |  | ☐ |  |  |
|  |  |  | ☐ |  |  |
|  |  |  | ☐ |  |  |
|  |  |  | ☐ |  |  |`,
  },
};
