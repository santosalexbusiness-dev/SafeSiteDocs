// Emergency Action and Fire Safety (15). Plans, inspections, lists, procedures.

const checklist = (intro, items) => ({
  body: `${intro}

| # | Item | Pass | Fail | N/A | Notes |
|---|---|:--:|:--:|:--:|---|
${items.map((it, i) => `| ${i + 1} | ${it} |  |  |  |  |`).join("\n")}

**Checked by:** [NAME]   **Date:** [DATE]`,
});

export default {
  "emergency-action-plan-template": {
    body: `**Emergency Action Plan for [COMPANY NAME] — [SITE].** Post and review with all workers.

### 1. Emergency Reporting
- How to report an emergency: call **911**; then notify [SITE CONTACT / PHONE].
- Site address to give 911: **[____]**.

### 2. Alarm / Notification
- How an emergency is announced: [air horn / radio / verbal / alarm].

### 3. Evacuation
- Evacuation routes: [describe / see Jobsite Emergency Map].
- Muster point: **[____]**.

### 4. Accounting for People
- After evacuating, each crew lead accounts for their people at the muster point and reports anyone missing to responders. **Do not re-enter.**

### 5. Specific Emergencies
- Fire, severe weather, medical, chemical spill, utility strike — [brief response for each].

### 6. Equipment & First Aid
- First aid kit and fire extinguisher locations: [____]. Trained first aiders: [NAMES].

### 7. Roles
- Who calls 911, who leads evacuation, who meets responders: [NAMES].

### 8. Training & Review
- Reviewed at orientation and when sites change; drills as appropriate.

Review and customize based on applicable federal, state, local, client, and project-specific requirements.`,
  },

  "fire-prevention-plan-template": {
    body: `**Fire Prevention Plan for [COMPANY NAME] — [SITE].**

### 1. Major Fire Hazards
- [Flammable/combustible materials, hot work, temporary heating, electrical, fueling — list yours.]

### 2. Controls
- Store flammables in approved containers/cabinets, away from ignition sources.
- Control combustible debris (housekeeping); separate fuels from heat.
- Hot work requires a permit and fire watch.
- Maintain electrical equipment; avoid overloaded circuits.

### 3. Fire Protection Equipment
- Extinguishers accessible, inspected, and matched to the hazard; exits clear.

### 4. Responsibilities
- Who controls fuel-source hazards and maintains equipment: [NAMES].

### 5. Training
- Employees trained on hazards, extinguisher use (PASS), and evacuation.

Review and customize based on applicable federal, state, local, client, and project-specific requirements.`,
  },

  "emergency-contact-list": {
    body: `Post at each jobsite and keep current.

| Contact | Name | Phone |
|---|---|---|
| Emergency services | — | **911** |
| Site address for 911 | [____] | — |
| Company emergency contact | [____] | [____] |
| Site supervisor / superintendent | [____] | [____] |
| Safety contact | [____] | [____] |
| Nearest hospital / urgent care | [____] | [____] |
| Poison control | — | [local number] |
| Utility emergency (gas/electric) | [____] | [____] |
| Property owner / client | [____] | [____] |

**Posted by:** [NAME]   **Date:** [DATE]   **Muster point:** [____]`,
  },

  "evacuation-drill-log": {
    body: `Log evacuation drills.

| Date | Site | Scenario | # Participants | Evac Time | Issues Found | Actions |
|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |`,
  },

  "fire-extinguisher-inspection-form": {
    body: `Inspect portable fire extinguishers (monthly visual; annual maintenance by a qualified service).

| Extinguisher ID / Location | Pressure in Green? | Pin/Seal Intact? | No Damage/Corrosion? | Accessible/Visible? | Tag Signed | Pass/Fail |
|---|:--:|:--:|:--:|:--:|:--:|---|
|  | ☐ | ☐ | ☐ | ☐ | ☐ |  |
|  | ☐ | ☐ | ☐ | ☐ | ☐ |  |
|  | ☐ | ☐ | ☐ | ☐ | ☐ |  |

**Inspected by:** [NAME]   **Date:** [DATE]   Service or replace failed units.`,
  },

  "first-aid-kit-inspection-checklist": checklist(
    "Inspect first aid kits and restock as needed.",
    [
      "Kit present and accessible at the designated location",
      "Contents match the kit list and quantity",
      "No expired items",
      "Bandages, gauze, tape, antiseptic stocked",
      "Gloves and barrier/CPR shield present",
      "Trauma supplies appropriate to the work (if applicable)",
      "Restocked after any use; eyewash available where needed",
    ]
  ),

  "emergency-equipment-inspection-log": {
    body: `Track inspection of emergency equipment (extinguishers, first aid, eyewash, AED, alarms).

| Date | Equipment / Location | Inspected | Condition | Action Needed | Inspector |
|---|---|:--:|---|---|---|
|  |  | ☐ |  |  |  |
|  |  | ☐ |  |  |  |
|  |  | ☐ |  |  |  |
|  |  | ☐ |  |  |  |`,
  },

  "severe-weather-plan": {
    body: `**Severe Weather Plan for [COMPANY NAME] — [SITE].**

### Lightning
- Stop outdoor/elevated work and seek substantial shelter (building or hard-topped vehicle) when lightning is in the area; wait the recommended time after the last thunder before returning.

### High Wind
- Adjust or stop work at height, crane/lift operations, and material handling in high wind per equipment limits.

### Tornado / Severe Storm
- Identify the nearest sturdy shelter; monitor warnings; move workers to shelter on a warning.

### Flooding / Heavy Rain
- Avoid flooded areas and excavations; watch ground stability and electrical hazards.

### Monitoring & Communication
- Assign someone to monitor forecasts/alerts; communicate the plan and shelter location to all workers.

Shelter location: [____]   Muster point after: [____]
Review and customize based on applicable federal, state, local, client, and project-specific requirements.`,
  },

  "earthquake-response-plan": {
    body: `**Earthquake Response Plan for [COMPANY NAME] — [SITE].** (Customize for your region's risk.)

### During Shaking
- **Drop, Cover, and Hold On.** Stay clear of falling materials, glass, heavy equipment, and unstable structures.
- On scaffolds/heights, hold on and protect yourself; outdoors, move to an open area away from structures and power lines.

### After Shaking
- Check for injuries; render first aid; call 911 for serious injuries.
- Evacuate damaged structures; watch for aftershocks, gas leaks, and downed lines.
- Account for all workers at the muster point.
- Do not re-enter damaged structures until cleared.

### Utilities
- Know how to shut off gas/electric if a leak/hazard is suspected: [____].

Muster point: [____]   Emergency: **911**   Site address: [____]
Review and customize based on applicable requirements.`,
  },

  "jobsite-emergency-map-template": {
    body: `Create a simple site map and post it. Mark the items below.

**Site / project:** [____]   **Date:** [DATE]

Mark on the map (sketch or attach):
- ★ Muster / assembly point
- → Evacuation routes and exits
- 🚒 Fire extinguisher locations
- ➕ First aid kit / AED locations
- ⚡ Electrical panel / utility shutoffs
- ☣ Chemical storage / spill kit
- 🏥 Route to nearest hospital

**Site address for 911:** [____]   **Site contact:** [NAME / PHONE]

\`\`\`
[ Insert or sketch site map here — keep it simple and visible. ]
\`\`\``,
  },

  "muster-point-checklist": checklist(
    "Verify muster point setup and headcount process.",
    [
      "Muster point identified, safe distance from hazards, and known to all",
      "Clear evacuation routes to the muster point",
      "Headcount/roster method established per crew",
      "Process to report missing persons to responders",
      "Alternate muster point identified",
      "Muster point marked/communicated at orientation",
      "Re-entry only after the all-clear",
    ]
  ),

  "emergency-communication-tree": {
    body: `Define who calls whom in an emergency so information flows fast.

\`\`\`
                 [ Person discovering emergency ]
                              |
                        Call 911 (if needed)
                              |
                   [ Site Supervisor: NAME / PHONE ]
                       /              \\
        [ Company Mgmt: NAME ]   [ Safety Contact: NAME ]
                  |                        |
        [ Owner / Office ]        [ Affected families /
                                    next of kin as needed ]
\`\`\`

| Role | Name | Phone |
|---|---|---|
| Discoverer → calls 911 then supervisor | — | **911** |
| Site supervisor | [____] | [____] |
| Company management | [____] | [____] |
| Safety contact | [____] | [____] |
| Owner / spokesperson | [____] | [____] |

**Last updated:** [DATE]   Designate one spokesperson for outside communication.`,
  },

  "spill-response-plan": {
    body: `**Spill Response Plan for [COMPANY NAME] — [SITE].** For fuels, oils, and chemicals. Pair with SDSs.

### Small Spill (within trained capability)
1. Alert others; stop the source if safe. 2. Don PPE per SDS. 3. Contain with the spill kit. 4. Clean up; bag/label waste. 5. Report; restock the kit.

### Large/Hazardous Spill (beyond capability)
1. Evacuate; deny entry. 2. Call **911** and [SITE CONTACT]. 3. Provide SDS to responders. 4. Do not exceed your training.

### Prevention
- Use secondary containment; keep spill kits stocked; fuel carefully.

Spill kit location(s): [____]   Reportable-quantity contacts (if applicable): [____]
Review and customize based on applicable federal, state, local, client, and project-specific requirements.`,
  },

  "medical-emergency-procedure": {
    body: `Post where workers can see it. Customize contacts.

**If someone is seriously hurt or ill:**
1. **Call 911.** Give the site address: **[____]** and stay on the line.
2. Send someone to meet and guide responders to the location.
3. Provide first aid/CPR/AED only if trained; control bleeding with direct pressure.
4. Do not move a person with a suspected head/neck/back injury unless they are in danger.
5. Use barrier protection (gloves) around blood/body fluids.
6. Notify the site supervisor: [NAME / PHONE].
7. After care, secure the scene and complete the Incident Report Form.

**Trained first aiders on site:** [NAMES]   **First aid/AED location:** [____]   **Nearest hospital:** [____]
General guidance only — not a substitute for first aid/CPR training.`,
  },

  "crisis-communication-template": {
    body: `Plan how the company communicates during a serious incident or crisis. Designate one spokesperson.

| Field | Entry |
|---|---|
| Company spokesperson: | [NAME / PHONE] |
| Backup spokesperson: | [NAME / PHONE] |
| Who may speak to media/public: | Only the spokesperson |
| Internal notification order: | [supervisor → management → owner] |
| Family/next-of-kin notification (handled by): | [NAME — coordinate carefully and compassionately] |

**Holding statement (fill in, verify facts first):**
"[COMPANY NAME] is aware of an incident at [GENERAL LOCATION] on [DATE]. The safety of our people is our priority. We are cooperating with authorities and will share verified information as appropriate. We are not able to comment further at this time."

**Guidance:** stick to verified facts; do not speculate or assign blame; protect privacy; consult legal counsel.
Review and customize for your company.`,
  },
};
