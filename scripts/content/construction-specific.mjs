// Construction-Specific Documents (15). Plans, checklists, agreements, agendas.

const checklist = (intro, items) => ({
  body: `${intro}

| # | Item | Pass | Fail | N/A | Notes / Corrective Action |
|---|---|:--:|:--:|:--:|---|
${items.map((it, i) => `| ${i + 1} | ${it} |  |  |  |  |`).join("\n")}

**Completed by:** [NAME]   **Signature:** _________________   **Date:** [DATE]`,
});

export default {
  "construction-site-safety-plan": {
    body: `**Construction Site Safety Plan for [PROJECT].** Complete before mobilizing; review with all on site.

### 1. Project Information
- Company: **[COMPANY NAME]**   GC/Client: [____]   Address: **[SITE ADDRESS]**   Dates: [____]
- Site safety contact / competent person: **[NAME / PHONE]**

### 2. Emergency Information
- Site address for 911: [____]   Nearest hospital: [____]   Muster point: [____]
- First aid / extinguisher locations: [____]

### 3. Major Hazards & Controls
| Hazard | Area/Task | Control |
|---|---|---|
| Falls | [____] | [guardrails/PFAS] |
| Struck-by / caught-between | [____] | [traffic plan/spotters] |
| Electrical / utilities | [____] | [locate/clearance/LOTO] |
| Excavation | [____] | [protective system] |
| Silica/dust | [____] | [water/vacuum] |

### 4. Programs & Permits
☐ Fall Protection ☐ Excavation ☐ Confined Space ☐ Hot Work ☐ LOTO ☐ HazCom ☐ Silica ☐ Other: ____

### 5. Site Rules & PPE
- Required PPE: [____]   Site rules: [____]

### 6. Subcontractors & Coordination
- [List subs/scopes and coordination approach — multi-employer worksite.]

### 7. Inspections & Training
- Daily/weekly inspections; site orientation; daily pre-task briefings; toolbox talks.

### 8. Review
- Updated when scope, crews, or conditions change. Review and customize based on applicable federal, state, local, client, and project-specific requirements.

Prepared by: **[RESPONSIBLE PERSON]**   Date: **[DATE]**   Approved: _________________`,
  },

  "daily-jobsite-safety-checklist": checklist(
    "Walk the site at the start of each shift.",
    [
      "Housekeeping: walkways, stairs, exits clear",
      "Fall hazards protected (edges, holes, leading edges)",
      "Ladders and scaffolds inspected and tagged",
      "Electrical: GFCI, cords, panels OK",
      "PPE in use for the tasks and area",
      "Tools and equipment inspected",
      "Excavations/trenches protected and inspected (if any)",
      "Chemicals labeled; SDSs available; storage OK",
      "Fire extinguishers accessible; combustibles controlled",
      "Emergency info posted; first aid available",
    ]
  ),

  "weekly-jobsite-inspection-checklist": checklist(
    "More thorough weekly inspection by a supervisor/competent person.",
    [
      "All daily-checklist items reviewed and trends noted",
      "Fall protection systems and anchors verified",
      "Scaffold tags current; ladders in good condition",
      "Electrical/temporary power and GFCIs tested",
      "Excavation protective systems and access verified",
      "Equipment inspections and maintenance up to date",
      "HazCom: inventory, labels, SDSs current",
      "Emergency equipment inspected (extinguishers, first aid)",
      "Subcontractor compliance reviewed",
      "Open corrective actions tracked to closure",
    ]
  ),

  "subcontractor-prequalification-form": {
    body: `Evaluate a subcontractor's safety before award. Customize to your criteria.

| Field | Entry |
|---|---|
| Subcontractor: | [____]   Scope: [____] |
| Contact: | [NAME / PHONE] |
| Written safety program? | ☐ Yes ☐ No |
| Incident history provided (e.g., rates/logs)? | ☐ Yes ☐ No |
| Training program for workers? | ☐ Yes ☐ No |
| Required insurance / certificates? | ☐ Yes ☐ No |
| Competent persons for their scope? | ☐ Yes ☐ No |
| References checked? | ☐ Yes ☐ No |
| Notes / concerns: | [____] |

**Prequalification result:** ☐ Approved ☐ Conditional ☐ Not approved
**Reviewed by:** [NAME]   **Date:** [DATE]`,
  },

  "subcontractor-safety-agreement": {
    body: `Agreement of safety expectations between [COMPANY NAME] and the subcontractor.

The subcontractor agrees to:
- Comply with all applicable safety requirements and the site safety rules.
- Maintain its own written safety program and trained, equipped workers.
- Attend site orientations and daily briefings, and coordinate with other trades.
- Provide PPE and equipment in safe condition for its workers.
- Report hazards, near misses, and incidents promptly to [COMPANY NAME].
- Maintain required insurance and provide safety documentation on request.
- Correct hazards it creates and stop its own unsafe work.

| Field | Entry |
|---|---|
| Subcontractor company: | [____] |
| Scope of work: | [____] |
| Project: | [____] |

**Subcontractor representative:** ____________________   **Signature:** ____________________   **Date:** [DATE]
**[COMPANY NAME] representative:** ____________________   **Date:** [DATE]
*This is a general template; have contracts/agreements reviewed by qualified counsel.*`,
  },

  "site-safety-orientation-form": {
    body: `Document site safety orientation for each worker entering the site.

**Project:** [____]   **Date:** [DATE]   **Conducted by:** [NAME]

Topics covered: ☐ Site hazards & controls ☐ Required PPE ☐ Fall protection ☐ Emergency procedures/muster ☐ Hazard & incident reporting ☐ Stop-work authority ☐ Housekeeping ☐ Site rules ☐ Other: ____

| # | Worker Name | Company | Signature |
|---|---|---|---|
| 1 |  |  |  |
| 2 |  |  |  |
| 3 |  |  |  |
| 4 |  |  |  |
| 5 |  |  |  |`,
  },

  "pre-construction-safety-meeting-agenda": {
    body: `Use to run a pre-construction (kickoff) safety meeting.

**Project:** [____]   **Date:** [DATE]   **Facilitator:** [NAME]

1. Introductions and roles (who owns safety on site)
2. Scope of work and schedule overview
3. Major hazards and planned controls
4. Required programs/permits (fall, excavation, hot work, LOTO, HazCom, silica)
5. Site rules, PPE, and access/security
6. Emergency procedures, muster point, and contacts
7. Subcontractor coordination (multi-employer worksite)
8. Inspections, reporting, and toolbox-talk schedule
9. Stop-work authority
10. Questions and action items

**Attendance:** attach the Safety Meeting Sign-In Sheet.   **Action items / owners:** [____]`,
  },

  "daily-pre-task-briefing-form": {
    body: `Brief the crew before the task/shift.

**Date:** [DATE]   **Crew/Foreman:** [NAME]   **Location:** [____]

- **Today's tasks:** [____]
- **Top hazards & controls:** [____]
- **Required PPE:** [____]
- **Permits/special programs:** ☐ Hot work ☐ Confined space ☐ LOTO ☐ Excavation ☐ Other: ____
- **Equipment/tools to inspect:** [____]
- **Coordination with other trades:** [____]
- **Emergency info:** 911 / site address [____] / muster point [____]

**Crew sign-on:**
| Print Name | Signature |
|---|---|
|  |  |
|  |  |
|  |  |`,
  },

  "construction-housekeeping-checklist": checklist(
    "Verify housekeeping on the jobsite.",
    [
      "Walkways, stairs, ramps, and exits clear",
      "Material stored/stacked safely, not blocking access",
      "Debris and scrap removed to proper containers",
      "Protruding nails bent/removed; sharp debris controlled",
      "Cords and hoses managed to prevent trips",
      "Spills cleaned up; flammable waste controlled",
      "Openings/holes covered and marked",
    ]
  ),

  "material-storage-checklist": checklist(
    "Verify safe material storage and handling.",
    [
      "Materials stacked stable, bound/blocked to prevent sliding",
      "Stacks not too high; load limits respected (floors/racks)",
      "Aisles and access maintained around storage",
      "Flammables/chemicals stored per SDS and separated",
      "Heavy items stored low; mechanical aids available",
      "Storage clear of exits, panels, and fire equipment",
      "Wind/weather considered for outdoor storage",
    ]
  ),

  "public-protection-checklist": checklist(
    "Protect the public around the jobsite.",
    [
      "Site perimeter secured (fencing/barriers)",
      "Pedestrian routes protected and clearly marked",
      "Overhead protection where work is above walkways",
      "Falling-object and debris controls in place",
      "Signage and barricades for hazards and openings",
      "Traffic control plan where work affects roadways",
      "Site secured against unauthorized entry after hours",
    ]
  ),

  "barricade-and-signage-checklist": checklist(
    "Verify barricades and signage.",
    [
      "Hazard areas barricaded (hard barricades for serious hazards)",
      "Warning signage posted and legible",
      "Floor/wall openings guarded and marked",
      "Overhead work areas marked below",
      "Traffic/pedestrian signage where needed",
      "Barricade tape used appropriately (caution vs. danger)",
      "Barricades maintained and removed when no longer needed",
    ]
  ),

  "tool-inspection-checklist": checklist(
    "Inspect hand and power tools before use.",
    [
      "Power tools: housing, cord, and plug intact; guards in place",
      "Switches operate and don't stick on",
      "Blades/bits sharp, correct, and secure",
      "Hand tools: no cracked handles or mushroomed heads",
      "Pneumatic tools: hoses/fittings secure; safety clips",
      "Damaged tools tagged and removed from service",
      "GFCI protection used for corded tools on temporary power",
    ]
  ),

  "jobsite-closeout-safety-checklist": checklist(
    "Verify safety items at project closeout/demobilization.",
    [
      "Temporary protections removed safely (after no longer needed)",
      "Openings/penetrations permanently protected/closed",
      "Tools, equipment, and materials removed/secured",
      "Hazardous materials/waste removed and disposed properly",
      "Temporary power and utilities safely disconnected",
      "Site cleaned; debris removed",
      "Records (inspections, training, incidents) filed",
    ]
  ),

  "multi-employer-worksite-coordination-form": {
    body: `Coordinate safety on sites with multiple employers/trades.

**Project:** [____]   **Date:** [DATE]   **Coordinated by (controlling/GC):** [NAME]

| Employer / Trade | Scope | On-Site Contact | Hazards They Create | Coordination Needed |
|---|---|---|---|---|
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |

**Shared protections:** [perimeter, access, traffic, overhead protection, etc.]
**Communication method:** [daily huddle / radio channel / signage]
**Each employer acknowledges responsibility for its workers and to report hazards.**

Coordinator signature: _________________   Date: [DATE]`,
  },
};
