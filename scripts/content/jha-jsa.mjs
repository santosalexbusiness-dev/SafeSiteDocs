// Real, ready-to-use content for the 19 non-sample JHA/JSA documents.
// Each specific JHA is pre-filled with typical steps, hazards, and controls
// for that work type — review and customize for the actual task/site.

const jha = (task, rows, ppe, permits) => ({
  body: `**Task / Job:** ${task}   **Location:** [LOCATION]   **Date:** [DATE]   **Competent Person:** [NAME]

This analysis is pre-filled with common steps, hazards, and controls for this type of work. Review and customize each row for your actual task, equipment, crew, and site before use.

| Task Step | Potential Hazards | Controls / Safe Work Practices | Responsible |
|---|---|---|---|
${rows.map(([s, h, c]) => `| ${s} | ${h} | ${c} | [Name] |`).join("\n")}

**Required PPE:** ${ppe}
**Permits / programs that may apply:** ${permits}

**Hierarchy of controls:** eliminate → substitute → engineering → administrative/safe practices → PPE.
**Reviewed with crew by:** [NAME]   **Signature:** _________________   **Date:** [DATE]`,
});

export default {
  "blank-jsa-template": {
    body: `**Task / Job:** [DESCRIBE TASK]   **Location:** [LOCATION]   **Date:** [DATE]   **Supervisor:** [NAME]

Use this blank Job Safety Analysis (JSA) to break a task into steps, identify the hazards in each step, and record the controls before work begins. Complete it with the crew doing the work.

| # | Job Step (what you do) | Potential Hazards (what could go wrong) | Controls / Safe Work Practices | Responsible |
|---|---|---|---|---|
| 1 | [Step] | [Hazards] | [Controls] | [Name] |
| 2 | [Step] | [Hazards] | [Controls] | [Name] |
| 3 | [Step] | [Hazards] | [Controls] | [Name] |
| 4 | [Step] | [Hazards] | [Controls] | [Name] |
| 5 | [Step] | [Hazards] | [Controls] | [Name] |
| 6 | [Step] | [Hazards] | [Controls] | [Name] |

**Required PPE:** [LIST]   **Permits required:** [LIST]
**Hierarchy of controls:** eliminate → substitute → engineering → administrative/safe practices → PPE.

**Crew sign-on** (reviewed hazards and controls; understand stop-work authority):

| # | Print Name | Signature | Date |
|---|---|---|---|
| 1 |  |  | [DATE] |
| 2 |  |  | [DATE] |
| 3 |  |  | [DATE] |

**Prepared/approved by:** _________________   **Date:** [DATE]`,
  },

  "pre-task-plan-template": {
    body: `Complete this pre-task plan with the crew at the start of the task or shift.

**Date:** [DATE]   **Crew / Foreman:** [NAME]   **Location / Project:** [LOCATION]

**1. Today's task(s):** [DESCRIBE]

**2. Top hazards today and controls:**
| Hazard | Control |
|---|---|
| [Hazard] | [Control] |
| [Hazard] | [Control] |
| [Hazard] | [Control] |

**3. Required PPE:** [LIST]
**4. Permits / special programs needed:** ☐ Hot work ☐ Confined space ☐ Energized/LOTO ☐ Excavation ☐ Other: ____
**5. Equipment/tools to inspect before use:** [LIST]
**6. Other trades / coordination needed:** [LIST]
**7. Emergency info:** Nearest first aid/AED: [____]   Site address for 911: [____]   Muster point: [____]

**8. Crew acknowledgment** (we reviewed the plan and can stop work if unsafe):

| Print Name | Signature |
|---|---|
|  |  |
|  |  |
|  |  |`,
  },

  "daily-hazard-assessment-form": {
    body: `Walk the work area at the start of the day and check for hazards. Mark each, note actions, and assign follow-up.

**Date:** [DATE]   **Assessed by:** [NAME]   **Area / Project:** [LOCATION]

| Hazard Category | Present? | Notes / Location | Action / Control |
|---|:--:|---|---|
| Housekeeping / walkways | ☐ |  |  |
| Fall hazards (edges, holes, heights) | ☐ |  |  |
| Ladders / scaffolds | ☐ |  |  |
| Electrical / cords / panels | ☐ |  |  |
| Chemicals / dust / fumes | ☐ |  |  |
| Tools / equipment condition | ☐ |  |  |
| Heavy equipment / vehicles | ☐ |  |  |
| Weather / heat / cold | ☐ |  |  |
| Other trades / public exposure | ☐ |  |  |
| PPE needs | ☐ |  |  |

**Items needing correction:**
| Item | Assigned to | Due | Done |
|---|---|---|---|
| [____] | [NAME] | [DATE] | ☐ |

**Assessor signature:** _________________   **Date:** [DATE]`,
  },

  "electrical-work-jha": jha(
    "Electrical installation / service work",
    [
      ["Plan and verify scope", "Working on the wrong circuit; arc flash; shock", "Confirm scope and circuit; identify qualified persons; review one-line/labels"],
      ["Isolate and lock out", "Unexpected energization; stored energy", "Apply LOTO per equipment procedure; verify zero energy (test before touch)"],
      ["Perform de-energized work", "Residual shock; dropped tools; cuts", "Insulated tools; maintain order; secure tools at height"],
      ["Energized work (only if unavoidable)", "Arc flash; shock; burns", "Energized work permit; qualified persons only; arc-rated PPE; approach boundaries; insulated tools"],
      ["Restore and clean up", "Re-energization; trip hazards", "Reinstall covers/guards; remove locks per procedure; housekeeping"],
    ],
    "Safety glasses, electrical-rated/insulating gloves where required, arc-rated clothing per analysis, hard hat (electrical class), footwear",
    "LOTO Program, Energized Electrical Work Permit, electrical safe work practices"
  ),

  "ladder-work-jha": jha(
    "Work performed from portable ladders",
    [
      ["Select ladder", "Wrong type or duty rating; defects", "Choose correct type/rating; inspect before use; remove damaged ladders"],
      ["Set up ladder", "Slipping out; tipping; power-line contact", "Firm level base; correct angle; secure top/bottom; extend above landing; non-conductive near electrical"],
      ["Climb and work", "Falls; overreaching", "Three points of contact; face the ladder; keep belt buckle within rails; no top rungs"],
      ["Handle tools/materials", "Dropped objects; loss of balance", "Use a tool belt/hoist line; keep hands free to climb; warn people below"],
    ],
    "Hard hat, eye protection, footwear; fall protection if required by task/height",
    "Ladder Safety Program; Ladder Use Permit (if used)"
  ),

  "roof-work-jha": jha(
    "Work on a roof or elevated surface",
    [
      ["Access the roof", "Falls during access; ladder failure", "Secured, inspected ladder; maintain access fall protection"],
      ["Set up fall protection", "Falls from edges, holes, skylights", "Guardrails or personal fall arrest with rated anchors; cover/guard holes and skylights"],
      ["Perform roof work", "Falls; heat; slips; falling tools", "Maintain fall protection; manage heat; secure footing; tether/secure tools; control debris"],
      ["Move materials on roof", "Overloading; falling material", "Distribute loads; keep edges clear; falling-object protection for those below"],
      ["Rescue readiness", "Suspension trauma after a fall", "Fall rescue plan established before work begins"],
    ],
    "Full-body harness and connectors (as required), hard hat, eye protection, slip-resistant footwear",
    "Fall Protection Plan, Fall Rescue Plan, Roof Work Safety Checklist"
  ),

  "scaffold-work-jha": jha(
    "Work performed from a scaffold",
    [
      ["Pre-use inspection", "Defective or incomplete scaffold", "Competent-person inspection tag (green); fully planked; guardrails; safe access"],
      ["Access and position", "Falls; climbing cross-braces", "Use ladder/stair access; never climb braces"],
      ["Work from platform", "Falls; falling objects; overload", "Guardrails or PFAS as required; toeboards; stay within rated capacity; keep platform clear"],
      ["Work near power lines", "Electrocution", "Maintain required clearance; de-energize or insulate as needed"],
    ],
    "Hard hat, eye protection, footwear; harness where required",
    "Scaffold Safety Program; competent-person inspection"
  ),

  "excavation-work-jha": jha(
    "Excavation and trenching",
    [
      ["Locate utilities", "Striking gas, electric, or water lines", "Call 811 / locate service; hand-dig near marked lines"],
      ["Open excavation", "Cave-in / collapse", "Competent person selects sloping, shoring, or shielding by soil and depth"],
      ["Provide access/egress", "Trapped without an exit", "Ladder or ramp within the required distance of workers"],
      ["Work in excavation", "Cave-in; bad atmosphere; water; falling loads", "Daily and after-change inspection; keep spoil/equipment back from edge; test atmosphere where needed; manage water"],
    ],
    "Hard hat, high-visibility clothing, footwear, eye protection",
    "Excavation program / competent-person inspection; confined space program if applicable"
  ),

  "hot-work-jha": jha(
    "Welding, cutting, or grinding (hot work)",
    [
      ["Prepare the area", "Fire from sparks and slag", "Hot work permit; remove or cover combustibles; stage an extinguisher"],
      ["Check enclosed items", "Explosion of flammable vapors", "Test/clean tanks, drums, and pipes before cutting; never assume empty"],
      ["Perform hot work", "Burns; toxic fumes; arc-eye", "Proper PPE; ventilation; welding screens"],
      ["Fire watch", "Smoldering fire after work ends", "Post a fire watch during and for the required time after; final inspection"],
    ],
    "Welding helmet/eye and face protection, flame-resistant clothing, gloves; ventilation/respirator as needed",
    "Hot Work Permit; Fire Prevention Plan"
  ),

  "confined-space-jha": jha(
    "Entry into a confined space",
    [
      ["Identify and classify", "Unknown or permit-required hazards", "Determine if permit-required; follow the confined space program; no entry if untrained"],
      ["Test the atmosphere", "Oxygen deficiency; toxic/flammable gases", "Test before and continuously during entry; ventilate as needed"],
      ["Set up entry", "Engulfment; entrapment; energy", "Isolate energy/material (LOTO); post an attendant; stage retrieval equipment"],
      ["Entry and work", "Emergencies; failed rescue", "Maintain communication; non-entry rescue plan; never perform unplanned rescue"],
    ],
    "Calibrated gas monitor, harness and retrieval line, respiratory protection and PPE per hazard",
    "Permit-Required Confined Space program; entry permit; LOTO"
  ),

  "concrete-work-jha": jha(
    "Concrete forming, placing, and finishing",
    [
      ["Formwork and rebar", "Impalement; struck-by; strains", "Rebar impalement caps; brace/secure forms; team lifts"],
      ["Mix and place", "Skin burns from wet concrete; silica dust", "Skin protection and eyewash; dust controls when cutting/grinding"],
      ["Pumping / equipment", "Hose whip; struck-by; pinch points", "Secure lines; use spotters; keep clear of moving parts"],
      ["Finishing", "Strains; kneeling injuries; slips", "Knee pads; good posture; housekeeping and footing"],
    ],
    "Waterproof gloves and boots, eye protection, knee pads; respirator for cutting/grinding",
    "Silica exposure control plan for cutting/grinding; HazCom for admixtures"
  ),

  "demolition-work-jha": jha(
    "Demolition",
    [
      ["Pre-demolition survey", "Hidden asbestos/lead; live utilities", "Hazardous-materials survey; locate and disconnect utilities"],
      ["Establish controls", "Falling debris; structural collapse; dust", "Engineering survey for structural work; exclusion zones; dust control"],
      ["Demolition activity", "Struck-by; falls; silica/lead dust", "Plan the sequence; fall protection; respiratory protection; water for dust"],
      ["Debris handling", "Cuts; strains; chute hazards", "Controlled chutes/containers; PPE; ongoing housekeeping"],
    ],
    "Hard hat, eye/face protection, gloves, respiratory protection, high-visibility clothing, footwear",
    "Asbestos/lead surveys; utility disconnect; engineering survey"
  ),

  "power-tool-use-jha": jha(
    "Use of portable power tools",
    [
      ["Select and inspect tool", "Defective tool; missing guard", "Use the right tool; inspect cord, blade/bit, and guard; remove damaged tools"],
      ["Set up the work", "Workpiece movement; line of fire", "Secure the workpiece; clear the line of fire; keep bystanders back"],
      ["Operate the tool", "Cuts/amputation; kickback; flying debris", "Keep guards in place; maintain control; eye/face protection"],
      ["Change blades / clear jams", "Unexpected start-up", "Disconnect power before changing blades/bits or clearing jams"],
    ],
    "Eye/face protection, hearing protection, appropriate gloves; dust control as needed",
    "Manufacturer instructions; silica control plan if cutting masonry/concrete"
  ),

  "vehicle-operation-jha": jha(
    "Operating a company vehicle",
    [
      ["Pre-trip inspection", "Mechanical failure", "Inspect tires, brakes, lights, fluids; report defects before driving"],
      ["Load and secure", "Shifting or falling loads", "Secure and distribute the load; stay within rating"],
      ["Drive", "Collisions; distraction; fatigue", "Seatbelt; no handheld phone; rested; obey traffic laws and speed"],
      ["Back and park", "Striking pedestrians; rollaway", "Walk-around; spotter for blind backing; set brake/chock on grades"],
    ],
    "Seatbelt; high-visibility vest when out of the vehicle",
    "Valid license; company authorized-driver list"
  ),

  "heavy-equipment-work-jha": jha(
    "Operating heavy equipment",
    [
      ["Pre-use inspection", "Mechanical/hydraulic failure", "Daily inspection; report defects; verify ROPS and seatbelt"],
      ["Set up the work zone", "Struck-by; swing radius contact", "Barricade swing radius; assign spotters; high-visibility; agreed signals"],
      ["Operate", "Tip-over; overhead lines; underground utilities", "Stable ground; respect capacity; maintain clearance from lines; utilities located"],
      ["Ground workers nearby", "Workers on foot struck or crushed", "Eye contact before approach; keep clear of blind spots and under loads"],
    ],
    "Hard hat, high-visibility clothing, footwear, eye/hearing protection; seatbelt",
    "Operator training/authorization; spotter plan"
  ),

  "chemical-use-jha": jha(
    "Working with chemicals",
    [
      ["Review the SDS", "Unknown chemical hazards", "Read the SDS; identify required PPE, ventilation, and first aid"],
      ["Set up", "Splash; vapor build-up", "Ventilation; secondary containment; eyewash available"],
      ["Use the chemical", "Skin/eye contact; inhalation", "PPE per SDS; correct handling; no eating, drinking, or smoking"],
      ["Store and dispose", "Reactions; spills", "Proper labeled storage; spill kit ready; correct disposal"],
    ],
    "Per SDS: chemical-resistant gloves, eye/face protection, respirator, apron as required",
    "Hazard Communication program; Spill Response Plan"
  ),

  "manual-material-handling-jha": jha(
    "Manual lifting and material handling",
    [
      ["Assess the load", "Strains from heavy/awkward loads", "Know the weight; use mechanical aids; team-lift over limits"],
      ["Lift", "Back and shoulder injury", "Lift with the legs; keep the load close; don't twist"],
      ["Carry", "Trips; blocked vision; pinch points", "Keep the path clear; don't block your view; watch fingers and toes"],
      ["Set down and stack", "Crushing; falling material", "Stable, secured stacking; controlled set-down"],
    ],
    "Gloves, footwear; back support per company policy",
    "N/A — follow safe lifting practices"
  ),

  "landscaping-equipment-jha": jha(
    "Operating landscaping equipment",
    [
      ["Inspect equipment", "Defects; missing guards", "Inspect mowers, trimmers, blowers; verify guards in place"],
      ["Fuel equipment", "Fire; burns", "Refuel cool engines; no smoking; avoid spills; approved containers"],
      ["Operate", "Thrown objects; blade contact; cuts", "Clear area of debris and bystanders; guards on; eye/face/hearing protection"],
      ["Environment", "Heat illness; insect stings; uneven ground", "Water/rest/shade; insect precautions; watch footing"],
    ],
    "Eye/face protection, hearing protection, gloves, footwear, high-visibility clothing",
    "N/A — follow manufacturer instructions"
  ),

  "maintenance-work-jha": jha(
    "General maintenance and repair",
    [
      ["Plan the task", "Unexpected energy; mixed hazards", "Identify all energy sources; apply LOTO when servicing equipment"],
      ["Access the work area", "Falls; ladders; tight spaces", "Use appropriate access; apply fall or confined-space controls as needed"],
      ["Perform maintenance", "Electrical, mechanical, chemical hazards", "Correct tools and PPE; verify de-energized; follow procedures"],
      ["Return to service", "Start-up hazards", "Reinstall guards; remove LOTO per procedure; test before normal use"],
    ],
    "Task-dependent: eye protection, gloves, hearing protection, electrical-rated PPE as needed",
    "LOTO; confined space / hot work programs if applicable"
  ),
};
