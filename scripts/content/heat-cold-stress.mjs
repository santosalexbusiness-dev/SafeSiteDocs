// Heat and Cold Stress (9 non-sample). Checklists, plans, logs, bulletin.

const checklist = (intro, items) => ({
  body: `${intro}

| # | Item | Yes | No | N/A | Notes |
|---|---|:--:|:--:|:--:|---|
${items.map((it, i) => `| ${i + 1} | ${it} |  |  |  |  |`).join("\n")}

**Completed by:** [NAME]   **Date:** [DATE]`,
});

export default {
  "heat-stress-daily-checklist": checklist(
    "Use on hot days before and during work.",
    [
      "Forecast/heat index checked; plan adjusted",
      "Cool drinking water stocked and close to the work",
      "Shade or a cool rest area available",
      "Rest break schedule set for the conditions",
      "New/returning workers identified for acclimatization",
      "Crew briefed on heat-illness signs and the 911 response for heat stroke",
      "Buddy system / supervisor checks in place for high heat",
    ]
  ),

  "heat-acclimatization-plan": {
    body: `**Heat Acclimatization Plan for [COMPANY NAME].** New and returning workers are at higher risk and need to build tolerance gradually.

### New Workers
- Gradually increase workload/exposure over the first several days (for example, a smaller portion of normal work on day 1, increasing each day).
- Supervise closely and watch for symptoms.

### Returning Workers
- Workers returning from a week or more away re-acclimatize over the first few days back.

### Heat Waves
- During sudden heat increases, watch **all** workers closely and ease into the heat.

### Supervision
- Assign someone to monitor acclimatizing workers and enforce water/rest/shade.

| Worker | Start Date | Acclimatization Schedule | Monitored By |
|---|---|---|---|
| [Name] | [DATE] | [Day 1–N plan] | [NAME] |
| [Name] |  |  |  |

Review and customize based on applicable federal, state, local, client, and project-specific requirements.`,
  },

  "water-rest-shade-checklist": checklist(
    "Verify the core heat controls are in place.",
    [
      "WATER: cool, potable water available and close to work",
      "WATER: enough for the crew and the full shift; refilled before empty",
      "REST: preventive cool-down breaks allowed and encouraged",
      "REST: break frequency increased as heat rises",
      "SHADE: shade or a cool area accessible to all workers",
      "Workers reminded to drink regularly (not just when thirsty)",
      "Supervisor monitoring conditions and workers",
    ]
  ),

  "heat-illness-incident-report": {
    body: `Document a heat-related illness (also complete the company Incident Report Form). Heat stroke is a 911 emergency.

| Field | Entry |
|---|---|
| Employee: | [NAME] |
| Date / time: | [____] |
| Temperature / heat index / conditions: | [____] |
| Symptoms observed: | [____] |
| Suspected condition: | ☐ Heat cramps ☐ Heat exhaustion ☐ Heat stroke (911) |
| Actions taken (shade, water, cooling, 911): | [____] |
| Acclimatization status of worker: | [____] |
| Water/rest/shade available at the time? | [____] |
| Corrective actions: | [____] |

**Reported by:** [NAME]   **Supervisor:** _________________   **Date:** [DATE]`,
  },

  "cold-stress-prevention-plan": {
    body: `**Cold Stress Prevention Plan for [COMPANY NAME].** Customize for your conditions.

### 1. Scope
Applies to work in cold, wet, or windy conditions that can cause hypothermia or frostbite.

### 2. Controls
- Encourage layered, dry clothing; cover head and hands; bring spare clothing if work may get wet.
- Provide warm-up breaks and a warming area; schedule heavier work during warmer parts of the day where possible.
- Provide warm liquids; monitor conditions and wind chill.

### 3. Recognition & Response
- **Hypothermia:** shivering, slurred speech, clumsiness, confusion — move to warmth, remove wet clothing, warm gradually, seek medical help; severe cases call 911.
- **Frostbite:** numb, white/waxy skin — warm gradually, do not rub; seek medical help.

### 4. Slips & Surfaces
- Treat ice on walkways, ladders, and scaffolds; use traction aids.

### 5. Training & Review
- Train workers to recognize and respond to cold stress. Review seasonally.

Review and customize based on applicable federal, state, local, client, and project-specific requirements.`,
  },

  "cold-weather-work-checklist": checklist(
    "Use on cold days before and during work.",
    [
      "Conditions/wind chill checked; plan adjusted",
      "Workers dressed in layers; head and hands covered",
      "Dry clothing available; plan to stay dry",
      "Warm-up breaks and warming area available",
      "Warm liquids provided",
      "Ice hazards on walkways/ladders/scaffolds treated",
      "Crew briefed on hypothermia and frostbite signs",
    ]
  ),

  "weather-monitoring-log": {
    body: `Log weather conditions that affect work (heat, cold, wind, storms).

| Date/Time | Temp / Heat Index / Wind Chill | Conditions | Action Taken (adjust/stop/shelter) | Recorded By |
|---|---|---|---|---|
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |`,
  },

  "outdoor-work-safety-plan": {
    body: `**Outdoor Work Safety Plan for [COMPANY NAME].** Covers weather-related hazards for outdoor crews.

### 1. Heat
- Apply the Heat Illness Prevention Plan: water, rest, shade, acclimatization.

### 2. Cold
- Apply the Cold Stress Prevention Plan: layers, warm-up breaks, dry clothing.

### 3. Lightning & Storms
- Stop outdoor/elevated work and seek shelter when lightning is in the area; wait the recommended time before returning.

### 4. Wind
- Adjust or stop work at height, with materials, and with lifts in high wind.

### 5. Sun / UV
- Encourage sun protection (shade, clothing, sunscreen) for prolonged exposure.

### 6. Insects / Wildlife
- Take precautions for stinging insects, ticks, and other site-specific wildlife.

### 7. Monitoring
- Check the forecast each day and monitor conditions; use the Weather Monitoring Log.

Review and customize based on applicable federal, state, local, client, and project-specific requirements.`,
  },

  "seasonal-safety-bulletin-template": {
    body: `[ Editable one-page bulletin to post or hand out at the start of a season. ]

---

### [COMPANY NAME] Seasonal Safety Bulletin — [SEASON / YEAR]

**Top hazards this season:** [e.g., heat / cold / storms / reduced daylight]

**What to watch for:**
- [Hazard 1 and the warning signs]
- [Hazard 2 and the warning signs]

**What we're doing about it:**
- [Controls — e.g., water/rest/shade schedule, warm-up breaks, adjusted hours]

**What we need from you:**
- [Actions — e.g., drink water, dress in layers, report symptoms early, use stop-work authority]

**Reminders:** Emergency number **911** · Site address posted · Report hazards to [NAME / PHONE]

Issued by: [NAME]   Date: [DATE]

---`,
  },
};
