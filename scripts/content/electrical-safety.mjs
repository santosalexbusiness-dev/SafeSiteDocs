// Electrical Safety (14 non-sample). Programs, LOTO, permits, checklists, reports.

const checklist = (intro, items) => ({
  body: `${intro}

| # | Item | Pass | Fail | N/A | Notes |
|---|---|:--:|:--:|:--:|---|
${items.map((it, i) => `| ${i + 1} | ${it} |  |  |  |  |`).join("\n")}

**Inspected by:** [NAME]   **Date:** [DATE]   Remove failed items from service.`,
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
  "electrical-safety-program": {
    body: `**Electrical Safety Program for [COMPANY NAME].** Customize to your scopes and voltages.

### 1. Purpose & Scope
Protect employees from electrical hazards (shock, arc flash, arc blast) during installation, service, and maintenance.

### 2. Qualified vs. Unqualified Persons
- Only **qualified persons** (trained to identify and avoid electrical hazards) work on or near exposed energized parts. Unqualified persons maintain safe distances.

### 3. De-energized Work (Default)
- Work de-energized whenever feasible. Verify with a rated tester ("test before touch") and apply LOTO.

### 4. Energized Work (Exception)
- Only when de-energizing introduces greater hazards or is infeasible; requires an Energized Electrical Work Permit, qualified persons, arc-rated PPE, and approach boundaries.

### 5. Temporary Power & GFCI
- Use GFCI protection on construction receptacle circuits or an assured grounding program; inspect cords and tools.

### 6. PPE & Tools
- Use electrical-rated/insulated tools and PPE matched to the hazard analysis.

### 7. Training
- Train qualified and affected employees; document it.

### 8. Review
- Reviewed annually and when conditions change. Review and customize based on applicable federal, state, local, client, and project-specific requirements.

Prepared by: **[RESPONSIBLE PERSON]**   Approved: _________________   Date: **[DATE]**`,
  },

  "lockout-tagout-program": {
    body: `**Lockout/Tagout (Energy Control) Program for [COMPANY NAME].** Pair with equipment-specific procedures.

### 1. Purpose & Scope
Prevent injury from unexpected energization or release of stored energy during service and maintenance.

### 2. Definitions
- **Authorized employee:** applies/removes locks and tags. **Affected employee:** operates/uses the equipment.

### 3. Energy Control Procedures
- Each machine/equipment has a specific procedure identifying energy sources and isolation points (see Equipment-Specific LOTO Form).

### 4. Lockout Sequence
1. Notify affected employees. 2. Shut down. 3. Isolate energy. 4. Apply locks/tags (each authorized employee their own). 5. Release/restrain stored energy. 6. Verify zero energy (test before touch).

### 5. Removal Sequence
- Confirm work complete and people clear, reinstall guards, each authorized employee removes only their own lock, notify, then re-energize.

### 6. Group & Shift Transfer
- Use a group lockout device/lock box and a defined shift-transfer process so protection is continuous.

### 7. Training & Periodic Inspection
- Train authorized/affected employees; conduct periodic inspections (LOTO Audit Form) at least as required.

### 8. Review
- Reviewed periodically and when equipment changes. Review and customize based on applicable requirements.

Prepared by: **[RESPONSIBLE PERSON]**   Approved: _________________   Date: **[DATE]**`,
  },

  "equipment-specific-loto-form": {
    body: `Create one procedure per machine/equipment. Verify with a qualified person.

**Equipment / machine:** [NAME / ID]   **Location:** [____]   **Authorized employees:** [____]

| # | Energy Type | Magnitude | Isolation Device & Location | Lock/Tag Method | Verify Zero |
|---|---|---|---|---|---|
| 1 | Electrical | [volts] | [disconnect/breaker] | [lock] | [test] |
| 2 | Hydraulic | [____] | [valve] | [____] | [bleed] |
| 3 | Pneumatic | [____] | [valve] | [____] | [bleed] |
| 4 | Mechanical/stored | [____] | [block/restraint] | [____] | [verify] |
| 5 | Thermal/Chemical/Other | [____] | [____] | [____] | [____] |

**Shutdown/isolation/verification steps:** [describe, customized to this equipment]
**Verified by (qualified person):** _________________   **Date:** [DATE]`,
  },

  "loto-audit-form": {
    body: `Periodically inspect energy-control procedures and authorized employees' performance.

| Field | Entry |
|---|---|
| Date of audit: | [____] |
| Equipment / procedure reviewed: | [____] |
| Authorized employee(s) observed: | [____] |
| Auditor: | [NAME] |

| Audit Item | Yes | No | Notes |
|---|:--:|:--:|---|
| Procedure is current and accurate | ☐ | ☐ |  |
| Authorized employee followed the procedure | ☐ | ☐ |  |
| All energy sources isolated and verified | ☐ | ☐ |  |
| Locks/tags applied correctly | ☐ | ☐ |  |
| Deviations corrected and retraining (if needed) | ☐ | ☐ |  |

**Auditor signature:** _________________   **Date:** [DATE]`,
  },

  "energized-electrical-work-permit-template": {
    body: `Required when energized work is justified. Authorize before work; qualified persons only.

| Field | Entry |
|---|---|
| Permit #: | [____] |
| Equipment / circuit: | [____]   Voltage: [____] |
| Justification (why de-energizing is infeasible/greater hazard): | [____] |
| Qualified persons performing work: | [____] |
| Shock & arc-flash hazard analysis / boundaries: | [____] |
| Required PPE (arc-rated, insulating gloves, etc.): | [____] |
| Insulated tools / barriers: | [____] |
| Energized work procedure attached: | ☐ Yes |
| Authorized by (qualified person/management): | [NAME / SIGNATURE] |
| Date/time issued: | [____]   Expiration: [____] |

**Energized work is a last resort. Verify all controls are in place before starting.**`,
  },

  "electrical-ppe-checklist": checklist(
    "Verify electrical PPE for the task (based on the hazard analysis).",
    [
      "Insulating (rubber) gloves rated for voltage; inspected/air-tested; within test date",
      "Leather protectors over rubber gloves",
      "Arc-rated clothing/face protection per the arc-flash analysis",
      "Electrical-class hard hat",
      "Insulated tools rated for the voltage",
      "Safety glasses/face shield",
      "Rubber insulating mats/blankets where applicable",
    ]
  ),

  "extension-cord-inspection-form": {
    body: `Inspect cords before use; remove damaged cords from service.

| Cord ID | Inspected For | Pass | Fail |
|---|---|:--:|:--:|
| [____] | Insulation — no cuts, cracks, exposed wires | ☐ | ☐ |
| [____] | Ground pin present and intact | ☐ | ☐ |
| [____] | Plug/connector not damaged or overheated | ☐ | ☐ |
| [____] | Rated for the load and jobsite/outdoor use | ☐ | ☐ |
| [____] | No splices or makeshift repairs | ☐ | ☐ |
| [____] | GFCI protection in use | ☐ | ☐ |

**Inspected by:** [NAME]   **Date:** [DATE]   Tag/remove failed cords.`,
  },

  "gfci-inspection-log": {
    body: `Test GFCIs and log results (use the test button or a tester).

| Date | GFCI / Location | Tripped on Test? (Y/N) | Reset OK? | Result | Tested By |
|---|---|---|---|---|---|
|  |  |  |  | ☐ Pass ☐ Fail |  |
|  |  |  |  | ☐ Pass ☐ Fail |  |
|  |  |  |  | ☐ Pass ☐ Fail |  |
|  |  |  |  | ☐ Pass ☐ Fail |  |`,
  },

  "temporary-power-checklist": checklist(
    "Verify temporary power installations.",
    [
      "GFCI protection on receptacle circuits (or assured grounding program)",
      "Panels and spider boxes labeled and covered",
      "Circuits not overloaded",
      "Wiring protected from damage; elevated out of walkways/water",
      "Weatherproof connections",
      "Grounding intact",
      "No tampering or missing covers",
    ]
  ),

  "electrical-panel-clearance-checklist": checklist(
    "Verify working space and access at electrical panels.",
    [
      "Required clear working space in front of the panel maintained",
      "No storage of materials in front of/around panels",
      "Panel cover/door closes and latches",
      "Circuits labeled/identified",
      "No exposed energized parts",
      "Access path to the panel is clear",
      "Adequate lighting at the panel",
    ]
  ),

  "electrical-incident-report": {
    body: `Document an electrical incident or near miss (also complete the company Incident Report Form).

| Field | Entry |
|---|---|
| Date / time: | [____] |
| Location: | [____] |
| Person(s) involved: | [____] |
| Voltage / equipment involved: | [____] |
| What happened (shock, arc flash, contact, near miss): | [____] |
| Was it de-energized/LOTO in place? | [____] |
| Injuries / damage: | [____] |
| Immediate actions: | [____] |
| Corrective actions: | [____] |

**Reported by:** [NAME]   **Supervisor:** _________________   **Date:** [DATE]`,
  },

  "shock-response-procedure": {
    body: `Post where electrical work occurs. Customize contacts.

**If someone receives an electrical shock:**
1. **Do not touch the person** if they are still in contact with the source.
2. **De-energize** the source if you can do so safely (shut off breaker/disconnect).
3. **Call 911.** Give the site address: [____].
4. If the person is free of the source and trained help is available, check responsiveness and breathing; begin CPR/AED if trained and needed.
5. Treat for burns at entry/exit points; do not move a person with a suspected spine injury unless in danger.
6. Keep the person still and monitor until help arrives — electrical injuries can affect the heart even if the person seems okay.
7. Report the incident and preserve the scene as safe to do so.

**Site emergency contact:** [NAME / PHONE]   **Nearest medical facility:** [____]
This is general guidance, not a substitute for first aid/CPR training.`,
  },

  "arc-flash-awareness-toolbox-talk": {
    body: `**Topic:** Arc Flash Awareness

**5-Minute Lesson**
- An arc flash is an explosive release of energy from an electrical fault — it can cause severe burns, blast injuries, and hearing/eye damage in an instant.
- Work de-energized whenever feasible; most arc-flash injuries happen during energized work.
- Energized work requires qualified persons, an energized work permit, arc-rated PPE, and respect for approach/arc-flash boundaries.
- Keep panel covers on, don't work in tight/cluttered electrical spaces, and use insulated, rated tools.
- Know the labels: equipment may be marked with arc-flash information — read it.

**Key Hazards**
- Severe burns and blast pressure from a fault
- Working energized without proper PPE or boundaries
- Unqualified persons near exposed energized parts
- Dropped tools or contact causing a fault

**Discussion Questions**
1. Which tasks today could expose us to an arc-flash hazard?
2. Can the equipment be de-energized and locked out instead?
3. Do we have the right arc-rated PPE and a permit if working energized?

**Crew Checklist**
- [ ] De-energize and LOTO where feasible
- [ ] Energized work permit and qualified persons only
- [ ] Arc-rated PPE and insulated tools
- [ ] Boundaries respected; bystanders clear

${SIGNIN}`,
  },

  "electrical-tool-inspection-checklist": checklist(
    "Inspect corded/cordless electrical tools before use.",
    [
      "Housing not cracked; no exposed wiring",
      "Cord and plug intact; ground pin present (if applicable)",
      "Switch operates and stays off when released",
      "Guards in place and functional",
      "Battery/charger (cordless) in good condition",
      "Double-insulated or properly grounded",
      "Used with GFCI protection on temporary power",
    ]
  ),
};
