// Scaffolding (10). Program, inspections, tagging, checklists, designation, report.

const checklist = (intro, items) => ({
  body: `${intro}

| # | Item | Pass | Fail | N/A | Notes |
|---|---|:--:|:--:|:--:|---|
${items.map((it, i) => `| ${i + 1} | ${it} |  |  |  |  |`).join("\n")}

**Inspected by (competent person):** [NAME]   **Date:** [DATE]   Tag the scaffold accordingly (green/yellow/red).`,
});

export default {
  "scaffold-safety-program": {
    body: `**Scaffold Safety Program for [COMPANY NAME].** Customize and train employees.

### 1. Purpose & Scope
Protect workers who erect, use, move, or dismantle scaffolds.

### 2. Competent & Qualified Persons
- A competent person supervises erection/alteration/dismantling and inspects scaffolds before each shift and after changes.
- A qualified person designs scaffolds and rigging as required.

### 3. Erection & Use
- Scaffolds are erected on a firm foundation, fully planked, plumb and braced, with guardrails and safe access.
- Capacity is not exceeded; platforms are kept clear; safe access (ladder/stair) is used — never climb cross-braces.

### 4. Inspection & Tagging
- Inspect before each shift and after any change/weather event; tag status (green = safe, yellow = caution, red = do not use).

### 5. Fall & Falling-Object Protection
- Guardrails and/or personal fall arrest as required; toeboards/screens to protect those below.

### 6. Training
- Train erectors and users on hazards and safe practices; document it.

### 7. Review
- Reviewed annually and when conditions change. Review and customize based on applicable federal, state, local, client, and project-specific requirements.

Prepared by: **[RESPONSIBLE PERSON]**   Date: **[DATE]**   Approved: _________________`,
  },

  "daily-scaffold-inspection-form": {
    body: `A competent person inspects the scaffold before each shift and after changes.

**Scaffold ID / location:** [____]   **Type:** [____]   **Date/shift:** [____]   **Competent person:** [NAME]

| Item | Pass | Fail | Notes |
|---|:--:|:--:|---|
| Foundation firm, level; base plates/mud sills | ☐ | ☐ |  |
| Plumb, level, and properly braced | ☐ | ☐ |  |
| Fully planked; planks sound and secured | ☐ | ☐ |  |
| Guardrails (top rail, mid rail) and toeboards | ☐ | ☐ |  |
| Safe access (ladder/stair) | ☐ | ☐ |  |
| Within rated capacity; platform clear | ☐ | ☐ |  |
| Ties/anchors as required for height | ☐ | ☐ |  |
| Clearance from power lines | ☐ | ☐ |  |

**Tag status applied:** ☐ Green ☐ Yellow ☐ Red   **Signature:** _________________`,
  },

  "scaffold-tagging-log": {
    body: `Track scaffold tag status and inspections.

| Date | Scaffold ID / Location | Status (Green/Yellow/Red) | Reason / Notes | Competent Person |
|---|---|---|---|---|
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |`,
  },

  "scaffold-erection-checklist": checklist(
    "Verify during/after scaffold erection (competent person).",
    [
      "Foundation firm and level; base plates and mud sills used",
      "Frames/standards plumb and level",
      "Bracing installed per the design",
      "Planking complete, sound, and secured against movement",
      "Guardrails and toeboards installed",
      "Ties/anchors installed at required intervals for height",
      "Safe access provided; clearance from power lines",
    ]
  ),

  "scaffold-use-checklist": checklist(
    "Verify before using a scaffold.",
    [
      "Current green inspection tag present",
      "Fully planked with guardrails and toeboards",
      "Safe access in use (no climbing braces)",
      "Load within rated capacity; platform clear of excess material",
      "Fall protection used where required",
      "Falling-object protection for people below",
      "No damage, missing components, or alterations",
    ]
  ),

  "mobile-scaffold-checklist": checklist(
    "Verify before using a mobile (rolling) scaffold.",
    [
      "Casters lock and are in good condition; locked during use",
      "Height-to-base ratio within safe limits (outriggers if required)",
      "Fully planked with guardrails",
      "No workers or loose materials on the platform while moving",
      "Floor is level, firm, and free of holes/obstructions",
      "Moved only by pushing at the base, watching for overhead hazards",
      "Within rated capacity",
    ]
  ),

  "scaffold-training-log": {
    body: `Document scaffold training for erectors and users.

| Date | Employee | Role (erector/user) | Topics | Hands-on? | Trainer | Signature |
|---|---|---|---|:--:|---|---|
|  |  |  |  | ☐ |  |  |
|  |  |  |  | ☐ |  |  |
|  |  |  |  | ☐ |  |  |
|  |  |  |  | ☐ |  |  |`,
  },

  "scaffold-competent-person-designation": {
    body: `Designate a competent person for scaffolding.

| Field | Entry |
|---|---|
| Designated person: | [NAME] |
| Basis (training/experience): | [____] |
| Authority: | Supervise erection/alteration/dismantling; inspect; take prompt corrective action; stop work |
| Scope / sites: | [____] |
| Effective date: | [DATE] |

**Designated by:** ____________________   **Date:** [DATE]
**Competent person acknowledgment:** ____________________   **Date:** [DATE]`,
  },

  "scaffold-incident-report": {
    body: `Document a scaffold-related incident or near miss (also complete the company Incident Report Form).

| Field | Entry |
|---|---|
| Date / time: | [____] |
| Location / scaffold ID: | [____] |
| Person(s) involved: | [____] |
| What happened: | [____] |
| Scaffold condition / tag status at the time: | [____] |
| Contributing factors: | [____] |
| Injuries / damage: | [____] |
| Immediate actions: | [____] |
| Corrective actions: | [____] |

**Reported by:** [NAME]   **Competent person:** _________________   **Date:** [DATE]`,
  },

  "scaffold-dismantling-checklist": checklist(
    "Verify before and during scaffold dismantling (competent person supervises).",
    [
      "Dismantling plan/sequence established",
      "Area below barricaded; no unauthorized entry",
      "Fall protection maintained for workers during dismantling",
      "Components lowered, not dropped; falling-object controls",
      "Ties removed only in the proper sequence",
      "Workers trained for dismantling tasks",
      "Components inspected and sorted (damaged removed from service)",
    ]
  ),
};
