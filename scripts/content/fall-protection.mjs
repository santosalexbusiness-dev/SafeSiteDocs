// Fall Protection (15). Real plans, assessments, inspections, permits, checklists.

const checklist = (intro, items, pass = "Pass", fail = "Fail") => ({
  body: `${intro}

| # | Item | ${pass} | ${fail} | N/A | Notes |
|---|---|:--:|:--:|:--:|---|
${items.map((it, i) => `| ${i + 1} | ${it} |  |  |  |  |`).join("\n")}

**Inspected/verified by:** [NAME]   **Signature:** _________________   **Date:** [DATE]`,
});

export default {
  "fall-protection-plan-template": {
    body: `**Fall Protection Plan for [COMPANY NAME] — [PROJECT/SITE].** Customize for the actual site and tasks.

### 1. Scope & Responsibilities
- Applies to work where fall hazards exist. Competent person: **[NAME / PHONE]**.

### 2. Fall Hazard Identification
| Location / Task | Fall Hazard | Height | Control Selected |
|---|---|---|---|
| [____] | [edge/hole/leading edge] | [__ ft] | [guardrail/PFAS/net] |
| [____] |  |  |  |
| [____] |  |  |  |

### 3. Fall Protection Systems Used
☐ Guardrail systems ☐ Personal fall arrest (harness + connector + rated anchor) ☐ Safety nets ☐ Covers ☐ Warning line / controlled access (where permitted)

### 4. Equipment & Anchors
- Anchors rated and selected by the competent person; connectors and harnesses inspected before each use.

### 5. Inspection
- Daily pre-use inspection of equipment; systems checked before work.

### 6. Training
- Workers trained to recognize fall hazards and use the systems.

### 7. Rescue
- Prompt rescue is planned **before** work begins (see Fall Rescue Plan).

### 8. Review
- Updated when site, tasks, or crews change. Review and customize based on applicable federal, state, local, client, and project-specific requirements.

Prepared by: **[RESPONSIBLE PERSON]**   Date: **[DATE]**   Approved: _________________`,
  },

  "fall-hazard-assessment-form": {
    body: `Assess fall hazards before work and select controls.

**Area / task:** [____]   **Location:** [____]   **Date:** [DATE]   **Assessed by:** [NAME]

| Fall Hazard | Present? | Height | Exposed Workers | Control Measure |
|---|:--:|---|---|---|
| Unprotected edge/side | ☐ | [__] |  |  |
| Floor/roof hole or opening | ☐ | [__] |  |  |
| Leading edge | ☐ | [__] |  |  |
| Skylight/fragile surface | ☐ | [__] |  |  |
| Ladder/elevated work | ☐ | [__] |  |  |
| Excavation/wall opening | ☐ | [__] |  |  |

**Selected systems:** ☐ Guardrails ☐ PFAS ☐ Covers ☐ Nets ☐ Other: ____
**Rescue plan referenced:** ☐ Yes   **Assessor signature:** _________________`,
  },

  "fall-protection-equipment-inspection-form": {
    body: `Document inspection of fall protection equipment (harness, connectors, SRL/lanyard, anchors).

**Equipment ID:** [____]   **User:** [NAME]   **Date:** [DATE]

| Component | Condition Checked | Pass | Fail |
|---|---|:--:|:--:|
| Harness webbing | No cuts, frays, burns, chemical/UV damage | ☐ | ☐ |
| Stitching | Intact, no pulled threads | ☐ | ☐ |
| D-rings / buckles | No cracks, distortion, corrosion; function | ☐ | ☐ |
| Lanyard / SRL | Webbing/cable intact; shock pack not deployed; SRL locks/retracts | ☐ | ☐ |
| Connectors | Snap hooks/carabiners self-lock; gates work | ☐ | ☐ |
| Labels | Legible; within service life | ☐ | ☐ |

**Result:** ☐ In service ☐ Remove from service   **Inspector:** _________________`,
  },

  "harness-inspection-checklist": checklist(
    "Inspect the full-body harness before each use.",
    [
      "Webbing — no cuts, frays, burns, or chemical/UV damage",
      "Stitching — intact, no pulled or broken threads",
      "D-rings — no cracks, sharp edges, distortion, or corrosion",
      "Buckles — operate properly, no damage",
      "Grommets/keepers — intact",
      "Labels — present, legible, within service life",
      "Overall — no signs of impact loading",
    ]
  ),

  "lanyard-inspection-checklist": checklist(
    "Inspect the lanyard / self-retracting lifeline (SRL) before each use.",
    [
      "Webbing/cable — no cuts, frays, kinks, or corrosion",
      "Stitching — intact",
      "Shock-absorbing pack — not deployed/torn",
      "SRL — extends and retracts smoothly; locks when pulled sharply",
      "Snap hooks/carabiners — self-close and self-lock",
      "Labels — legible; within service life",
      "Overall — no signs of impact loading",
    ]
  ),

  "anchor-point-inspection-checklist": checklist(
    "Verify anchor points before connecting (competent/qualified person).",
    [
      "Anchor rated for the required load (or designed by qualified person)",
      "Anchor located to limit fall distance and swing falls",
      "Anchor and connecting hardware in good condition",
      "Compatible connectors used (no roll-out risk)",
      "Anchor above the work where feasible",
      "Temporary anchors installed per manufacturer instructions",
      "Structure supporting anchor is sound",
    ]
  ),

  "guardrail-inspection-checklist": checklist(
    "Inspect guardrail systems protecting edges and openings.",
    [
      "Top rail at correct height and present along the exposure",
      "Mid rail (or equivalent) present",
      "Toeboard present where falling-object risk exists",
      "Posts secure and spaced properly",
      "System can withstand required force (no flex/looseness)",
      "Openings/gaps protected (gates, chains)",
      "No damaged or missing components",
    ]
  ),

  "leading-edge-work-checklist": checklist(
    "Verify controls before leading-edge work.",
    [
      "Leading-edge hazard identified and communicated",
      "Fall protection selected for leading-edge work (PFAS with appropriate SRL/anchors)",
      "Anchors positioned to limit fall distance and swing",
      "Warning line / controlled access used only where permitted",
      "Workers trained for leading-edge tasks",
      "Rescue plan in place",
      "Materials and tools secured from falling",
    ]
  ),

  "roof-work-safety-checklist": checklist(
    "Verify roof-work controls before starting.",
    [
      "Roof access is safe (secured ladder / stair)",
      "Edge protection in place (guardrails or PFAS)",
      "Holes and skylights covered or guarded",
      "Anchor points rated and positioned correctly",
      "Weather and heat conditions assessed",
      "Falling-object protection for people below",
      "Rescue plan established before work",
    ]
  ),

  "fall-rescue-plan-template": {
    body: `**Prompt rescue must be planned before work at height begins.** A worker suspended in a harness can be harmed quickly.

| Field | Entry |
|---|---|
| Site / task: | [____] |
| Primary rescue method: | ☐ Self-rescue ☐ Aerial lift ☐ Rescue device/system ☐ Trained rescue team ☐ Call emergency services |
| Rescue equipment on site / location: | [____] |
| Who performs the rescue: | [NAME(S)] |
| How a fall is detected / communicated: | [____] |
| Estimated time to reach a suspended worker: | [____] |
| Suspension-trauma awareness: relieve pressure / move legs / get down ASAP | [____] |
| Emergency number / site address for 911: | **911** / [____] |

**Rescue plan reviewed with crew:** ☐ Yes   **Reviewed by:** [NAME]   **Date:** [DATE]
Relying only on calling 911 may not be fast enough — plan an on-site method where feasible.`,
  },

  "fall-protection-training-log": {
    body: `Document fall protection training.

| Date | Employee | Topics (hazard recognition, systems, inspection, rescue) | Hands-on? | Trainer | Signature |
|---|---|---|:--:|---|---|
|  |  |  | ☐ |  |  |
|  |  |  | ☐ |  |  |
|  |  |  | ☐ |  |  |
|  |  |  | ☐ |  |  |`,
  },

  "fall-protection-competent-person-form": {
    body: `Designate a competent person for fall protection — able to identify fall hazards and authorized to take prompt corrective action.

| Field | Entry |
|---|---|
| Designated person: | [NAME] |
| Basis (training/experience): | [____] |
| Authority: | Identify fall hazards; take prompt corrective action; stop work |
| Sites/scope: | [____] |
| Effective date: | [DATE] |

**Designated by:** ____________________   **Date:** [DATE]
**Competent person acknowledgment:** ____________________   **Date:** [DATE]`,
  },

  "elevated-work-permit": {
    body: `Complete and authorize before elevated work where required by your program.

| Field | Entry |
|---|---|
| Permit #: | [____] |
| Location / task: | [____] |
| Height / exposure: | [____] |
| Fall protection system used: | [____] |
| Anchor points identified/rated: | [____] |
| Equipment inspected: | ☐ Yes |
| Rescue plan in place: | ☐ Yes |
| Weather suitable: | ☐ Yes |
| Authorized by (competent person): | [NAME / SIGNATURE] |
| Date / time issued: | [____] |
| Expiration: | [____] |`,
  },

  "warning-line-system-checklist": checklist(
    "Verify a warning line / controlled access system (use only where permitted by your program).",
    [
      "Warning line set back the required distance from the edge",
      "Line flagged and visible; correct height",
      "Stanchions stable and able to resist tipping",
      "Access path/controlled zone defined",
      "Workers between the line and edge use additional protection as required",
      "Safety monitor assigned if used",
      "System appropriate for the roof slope and task",
    ]
  ),

  "hole-cover-inspection-checklist": checklist(
    "Inspect hole/opening covers.",
    [
      "All floor/roof holes and openings are covered or guarded",
      "Covers capable of supporting the expected load",
      "Covers secured against displacement",
      "Covers marked 'HOLE' or 'COVER' (or equivalent)",
      "No covers removed and left open/unattended",
      "Skylights protected (cover, screen, or guardrail)",
      "Damaged covers replaced",
    ]
  ),
};
