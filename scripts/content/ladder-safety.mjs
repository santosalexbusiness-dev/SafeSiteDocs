// Ladder Safety (9 non-sample). Program, permit, checklists, guide, tag, report.

const checklist = (intro, items) => ({
  body: `${intro}

| # | Item | Pass | Fail | N/A | Notes |
|---|---|:--:|:--:|:--:|---|
${items.map((it, i) => `| ${i + 1} | ${it} |  |  |  |  |`).join("\n")}

**Inspected by:** [NAME]   **Date:** [DATE]   Remove failed ladders from service and tag "DO NOT USE."`,
});

export default {
  "ladder-safety-program": {
    body: `**Ladder Safety Program for [COMPANY NAME].** Customize and train employees.

### 1. Purpose & Scope
Prevent ladder-related falls for all employees using portable and fixed ladders.

### 2. Responsibilities
- Management provides proper ladders; supervisors enforce safe use; employees inspect and use ladders correctly.

### 3. Selection
- Use the correct type and duty rating for the load (worker + tools). Use non-conductive ladders near electrical hazards.

### 4. Inspection
- Inspect before each use (see ladder checklists). Remove and tag damaged ladders.

### 5. Safe Use
- Set on firm, level ground; secure top and bottom; extension ladders at ~4:1 angle and extended ~3 ft above the landing.
- Maintain three points of contact; face the ladder; keep belt buckle within the rails; don't stand on the top two rungs of a stepladder.
- One person per ladder unless designed otherwise; don't move a ladder while occupied.

### 6. Training
- Train employees to recognize hazards and use ladders safely; document it.

### 7. Review
- Reviewed annually and when conditions change. Review and customize based on applicable federal, state, local, client, and project-specific requirements.

Prepared by: **[RESPONSIBLE PERSON]**   Date: **[DATE]**   Approved: _________________`,
  },

  "ladder-use-permit": {
    body: `Optional permit for higher-risk ladder use. Complete before work.

| Field | Entry |
|---|---|
| Permit #: | [____] |
| Location / task: | [____] |
| Ladder type / duty rating: | [____] |
| Inspected before use: | ☐ Yes |
| Setup verified (angle, secured, level): | ☐ Yes |
| Electrical hazards nearby? Non-conductive ladder used? | [____] |
| Fall protection required by task/height? | [____] |
| Authorized by: | [NAME / SIGNATURE] |
| Date / time: | [____] |`,
  },

  "step-ladder-checklist": checklist(
    "Inspect a stepladder before use.",
    [
      "Rails free of cracks, bends, or splits",
      "Steps tight, not bent or slippery",
      "Spreader bars present and lock fully open",
      "Feet/pads present and not worn",
      "Hinges and hardware tight, no missing rivets",
      "Duty rating label legible and correct for the load",
      "No makeshift repairs; structurally sound",
    ]
  ),

  "extension-ladder-checklist": checklist(
    "Inspect an extension ladder before use.",
    [
      "Rails free of cracks, bends, or splits",
      "Rungs tight, not bent or slippery",
      "Rung locks/dogs engage properly",
      "Rope and pulley intact and functional",
      "Feet/safety shoes present and not worn",
      "Duty rating legible and correct for the load",
      "Non-conductive if used near electrical hazards",
    ]
  ),

  "fixed-ladder-checklist": checklist(
    "Inspect a fixed ladder.",
    [
      "Rungs and rails secure, not corroded or damaged",
      "Anchorage/mounting bolts tight",
      "Cage, well, or fall protection present where required",
      "Clearances around the ladder maintained",
      "No obstructions on the climbing path",
      "Landing/grab points secure",
      "No damaged or missing components",
    ]
  ),

  "ladder-training-log": {
    body: `Document ladder safety training.

| Date | Employee | Topics (selection, inspection, setup, safe use) | Hands-on? | Trainer | Signature |
|---|---|---|:--:|---|---|
|  |  |  | ☐ |  |  |
|  |  |  | ☐ |  |  |
|  |  |  | ☐ |  |  |
|  |  |  | ☐ |  |  |`,
  },

  "defective-ladder-tag": {
    body: `[ Printable tag — fill in, attach to the ladder, and remove the ladder from service. ]

> ## DANGER — DO NOT USE
> **DEFECTIVE LADDER — REMOVED FROM SERVICE**
>
> Ladder ID: [____]
> Defect found: [____]
> Tagged by: [NAME]   Date: [DATE]
> Do not remove this tag or use this ladder until repaired/replaced and re-inspected.
> Contact: [NAME / PHONE]`,
  },

  "ladder-setup-guide": {
    body: `Quick reference for safe ladder setup. Post or share with crews.

**All ladders**
- Inspect before use; remove damaged ladders.
- Set on firm, level ground; do not place on boxes or unstable bases.
- Keep the area around the base clear; barricade in traffic areas.

**Extension ladders**
- Set at about a 4:1 angle (1 ft out for every 4 ft of height).
- Extend ~3 ft above the landing; secure top and bottom.
- Face the ladder; maintain three points of contact.

**Stepladders**
- Open fully and lock the spreaders.
- Don't stand on the top two steps or the top cap.
- Don't use a closed stepladder leaning against a wall.

**Near electrical hazards**
- Use a non-conductive (fiberglass) ladder; keep clear of power lines.

**Reviewed by:** [NAME]   **Date:** [DATE]`,
  },

  "ladder-incident-report-form": {
    body: `Use to document a ladder-related incident or near miss (also complete the company Incident Report Form).

| Field | Entry |
|---|---|
| Date / time: | [____] |
| Location: | [____] |
| Person(s) involved: | [____] |
| Ladder type / ID: | [____] |
| What happened: | [____] |
| Contributing factors (setup, condition, use): | [____] |
| Injuries / damage: | [____] |
| Immediate actions: | [____] |
| Corrective actions to prevent recurrence: | [____] |

**Reported by:** [NAME]   **Supervisor:** _________________   **Date:** [DATE]`,
  },
};
