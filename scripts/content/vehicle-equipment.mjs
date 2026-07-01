// Vehicle and Equipment Safety (15). Policies, inspections, logs, tags, reports.

const checklist = (intro, items) => ({
  body: `${intro}

| # | Item | Pass | Fail | N/A | Notes |
|---|---|:--:|:--:|:--:|---|
${items.map((it, i) => `| ${i + 1} | ${it} |  |  |  |  |`).join("\n")}

**Inspected by:** [NAME]   **Date:** [DATE]   Report defects; remove unsafe equipment from service.`,
});

const policy = (purpose, statement, requirements) => ({
  body: `**1. Purpose** — ${purpose}

**2. Scope** — All applicable employees and operations of [COMPANY NAME].

**3. Policy Statement** — ${statement}

**4. Requirements**
${requirements.map((r) => `- ${r}`).join("\n")}

**5. Responsibilities** — Management provides safe equipment and training; supervisors enforce; employees comply and report issues.

**6. Enforcement** — Per the Disciplinary Safety Policy.

Approved by: **[RESPONSIBLE PERSON]**   Date: **[DATE]**   Review and customize for applicable requirements.`,
});

export default {
  "company-vehicle-safety-policy": policy(
    "Ensure safe operation of company vehicles.",
    "Drivers operate company vehicles safely, legally, and responsibly.",
    [
      "Only authorized, licensed drivers operate company vehicles.",
      "Seatbelts worn by all occupants; obey traffic laws and speed limits.",
      "No handheld phone use or texting while driving.",
      "Complete pre-trip inspections; report defects; secure all loads.",
      "No driving while impaired or fatigued; report incidents promptly.",
    ]
  ),

  "driver-qualification-file-checklist": checklist(
    "Verify driver qualification documentation is on file (customize to your requirements).",
    [
      "Valid driver's license (correct class) on file",
      "Motor vehicle record (MVR) reviewed",
      "Authorized-driver approval documented",
      "Driver safety training/acknowledgment on file",
      "Medical certification on file (if required for the vehicle type)",
      "Vehicle assignment and insurance documented",
      "Periodic MVR re-check scheduled",
    ]
  ),

  "vehicle-inspection-form": {
    body: `Pre-trip vehicle inspection. Report defects before driving.

**Vehicle:** [Year/Make/Model/Plate]   **Driver:** [NAME]   **Date:** [DATE]   **Mileage:** [____]

| Item | OK | Defect | Item | OK | Defect |
|---|:--:|:--:|---|:--:|:--:|
| Tires/wheels | ☐ | ☐ | Brakes | ☐ | ☐ |
| Lights/signals | ☐ | ☐ | Horn | ☐ | ☐ |
| Mirrors | ☐ | ☐ | Wipers/washer | ☐ | ☐ |
| Fluids/leaks | ☐ | ☐ | Seatbelts | ☐ | ☐ |
| Windshield/glass | ☐ | ☐ | Load secured | ☐ | ☐ |
| Fire ext./first aid (if equipped) | ☐ | ☐ | Registration/insurance | ☐ | ☐ |

**Defects found:** [____]   **Safe to operate?** ☐ Yes ☐ No
**Driver signature:** _________________`,
  },

  "daily-equipment-inspection-form": {
    body: `Daily pre-use inspection for powered equipment. Customize items to the machine.

**Equipment / ID:** [____]   **Operator:** [NAME]   **Date:** [DATE]   **Hours:** [____]

| Item | OK | Defect | Notes |
|---|:--:|:--:|---|
| Fluids (oil/coolant/hydraulic/fuel) | ☐ | ☐ |  |
| Leaks | ☐ | ☐ |  |
| Tires/tracks | ☐ | ☐ |  |
| Lights/horn/backup alarm | ☐ | ☐ |  |
| Controls/steering/brakes | ☐ | ☐ |  |
| Guards/ROPS/seatbelt | ☐ | ☐ |  |
| Hydraulics/attachments | ☐ | ☐ |  |
| Fire extinguisher (if equipped) | ☐ | ☐ |  |

**Defects:** [____]   **Safe to operate?** ☐ Yes ☐ No   **Operator signature:** _________________`,
  },

  "heavy-equipment-inspection-checklist": checklist(
    "Inspect heavy equipment before use.",
    [
      "Fluids checked; no significant leaks",
      "Tires/tracks/undercarriage in good condition",
      "Lights, horn, and backup alarm work",
      "Steering, brakes, and controls function",
      "ROPS and seatbelt present and intact",
      "Hydraulics, hoses, and attachments secure",
      "Fire extinguisher present; cab clean and visibility clear",
    ]
  ),

  "trailer-inspection-checklist": checklist(
    "Inspect a trailer before towing.",
    [
      "Coupler/hitch secure; safety chains crossed and attached",
      "Breakaway cable/brakes functional",
      "Tires (including spare) and wheels in good condition",
      "Lights and signals working",
      "Load secured and within rating; weight distributed",
      "Ramps/gates latched",
      "Registration/plate valid",
    ]
  ),

  "forklift-daily-inspection-checklist": checklist(
    "Operator pre-use inspection for forklifts/powered industrial trucks (only trained/authorized operators).",
    [
      "Forks, mast, and chains in good condition",
      "Hydraulics operate; no leaks",
      "Tires in good condition",
      "Brakes, steering, and controls function",
      "Horn and lights/backup alarm work",
      "Seatbelt present and functional; overhead guard intact",
      "Data plate legible; load capacity known; fuel/charge adequate",
    ]
  ),

  "forklift-operator-training-log": {
    body: `Document forklift/PIT operator training, evaluation, and authorization.

| Date | Operator | Truck Type/Class | Classroom | Hands-on Eval | Evaluator | Authorized? |
|---|---|---|:--:|:--:|---|:--:|
|  |  |  | ☐ | ☐ |  | ☐ |
|  |  |  | ☐ | ☐ |  | ☐ |
|  |  |  | ☐ | ☐ |  | ☐ |

*Re-evaluate periodically and after an incident, near miss, or observed unsafe operation.*`,
  },

  "spotter-safety-checklist": checklist(
    "Verify safe spotting before equipment/vehicle moves.",
    [
      "One designated spotter assigned",
      "Hand signals (including STOP) agreed before moving",
      "Spotter stays in the operator's view and out of the path/pinch points",
      "High-visibility clothing worn",
      "Clearance from overhead/underground hazards confirmed",
      "Move stops immediately if visual contact is lost",
      "Pedestrians kept clear of the work zone",
    ]
  ),

  "backing-safety-policy": policy(
    "Reduce backing-related incidents with vehicles and equipment.",
    "Drivers and operators avoid backing where possible and back safely when necessary.",
    [
      "Park to pull through/forward when possible.",
      "Do a walk-around before backing to check for people and obstacles.",
      "Use a spotter for limited-visibility backing.",
      "Back slowly using mirrors/cameras; sound the horn before moving.",
      "Set the brake and chock on grades.",
    ]
  ),

  "fueling-safety-checklist": checklist(
    "Fuel equipment and vehicles safely.",
    [
      "Engine off and cool before fueling",
      "No smoking or open flames in the fueling area",
      "Approved containers used; nozzle/container bonded where required",
      "Fuel away from ignition sources and storm drains",
      "Spills avoided; spill kit available",
      "Area ventilated (no fueling in enclosed spaces)",
      "Containers capped and stored properly after fueling",
    ]
  ),

  "equipment-maintenance-log": {
    body: `Track maintenance for vehicles and equipment.

| Date | Equipment / ID | Service Performed | Hours/Mileage | Performed By | Next Service Due |
|---|---|---|---|---|---|
|  |  |  |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |`,
  },

  "defective-equipment-tag": {
    body: `[ Printable tag — fill in, attach, and remove the equipment from service. ]

> ## DANGER — DO NOT OPERATE
> **DEFECTIVE EQUIPMENT — OUT OF SERVICE**
>
> Equipment / ID: [____]
> Defect: [____]
> Tagged by: [NAME]   Date: [DATE]
> Do not remove this tag or operate until repaired and re-inspected.
> Contact: [NAME / PHONE]`,
  },

  "mobile-equipment-incident-report": {
    body: `Document an incident involving mobile/heavy equipment (also complete the company Incident Report Form).

| Field | Entry |
|---|---|
| Date / time / location: | [____] |
| Equipment / ID: | [____]   Operator: [NAME] |
| Persons involved: | [____] |
| What happened (tip-over, struck-by, contact, property): | [____] |
| Spotter used? Pre-use inspection done? | [____] |
| Injuries / damage: | [____] |
| Immediate actions: | [____] |
| Corrective actions: | [____] |

**Reported by:** [NAME]   **Supervisor:** _________________   **Date:** [DATE]`,
  },

  "authorized-driver-list": {
    body: `Maintain a current list of employees authorized to drive company vehicles/equipment.

| Employee | License Class | MVR Reviewed | Vehicles/Equipment Authorized | Authorized Date | Re-check Due |
|---|---|:--:|---|---|---|
|  |  | ☐ |  |  |  |
|  |  | ☐ |  |  |  |
|  |  | ☐ |  |  |  |
|  |  | ☐ |  |  |  |

**Maintained by:** [NAME]   **Updated:** [DATE]`,
  },
};
