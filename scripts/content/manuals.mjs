// Core Safety Manuals (14 non-sample) + the two plan templates.
// Each trade manual shares a complete program structure and injects
// trade-specific hazard focus and safe work practices.

const manual = (subject, hazards, programs, practices) => ({
  body: `**Written safety program for [COMPANY NAME] — ${subject}.** Replace placeholders, delete sections that don't apply, add anything specific to your operations, and have leadership review and approve before use.

### Table of Contents
1. Safety & Health Policy Statement
2. Responsibilities
3. Hazard Identification & Job Hazard Analysis
4. Key Programs & Safe Work Practices
5. Training
6. Inspections & Audits
7. Incident Reporting & Investigation
8. Emergency Action & First Aid
9. Recordkeeping
10. Program Review

### 1. Safety & Health Policy Statement
[COMPANY NAME] is committed to a safe and healthful workplace. Safety is a core value. Management provides the resources, training, and equipment reasonably necessary to work safely; every employee follows safe work practices, reports hazards, and has **stop-work authority** without fear of retaliation.
Signed: **[OWNER / PRESIDENT]**  Signature: _________________  Date: **[DATE]**

### 2. Responsibilities
- **Management/Owner:** set expectations, provide resources, review performance.
- **Supervisors:** enforce safe practices, run pre-task planning and toolbox talks, correct hazards, document training.
- **Employees:** follow this program, use PPE, inspect tools/equipment, report hazards and incidents, participate in training.

### 3. Hazard Identification & JHA
Hazards are identified through daily pre-task planning, Job Hazard Analyses for non-routine work, and regular inspections. [Describe your JHA process and who approves it.]

### 4. Key Programs & Safe Work Practices
**Primary hazards for ${subject.toLowerCase()}:**
${hazards.map((h) => `- ${h}`).join("\n")}

**Programs that apply (customize and attach):**
${programs.map((p) => `- ${p}`).join("\n")}

**Core safe work practices:**
${practices.map((p) => `- ${p}`).join("\n")}

### 5. Training
New-hire safety orientation plus task-specific training before work that requires it. Competent/qualified persons are designated and documented. Refresher training per the training matrix and when conditions indicate a need.

### 6. Inspections & Audits
Daily jobsite checks, periodic inspections, and equipment inspections; findings are corrected and tracked on a corrective action log.

### 7. Incident Reporting & Investigation
All injuries, illnesses, near misses, and property damage are reported promptly and documented on the Incident Report Form. Incidents are investigated for root cause; corrective actions are tracked to completion.

### 8. Emergency Action & First Aid
Each site has emergency contacts, the nearest medical facility identified, evacuation routes, and a muster point. See the Emergency Action Plan.

### 9. Recordkeeping
Training, inspections, JHAs, incident records, and reviews are maintained per the Safety Records Retention Schedule.

### 10. Program Review
Reviewed at least annually and when work, equipment, personnel, or requirements change. Review and customize based on applicable federal, state, local, client, and project-specific requirements.

Prepared by: **[RESPONSIBLE PERSON]**  Approved by: _________________  Date: **[DATE]**`,
});

const plan = (kind, intro) => ({
  body: `${intro}

### 1. Project / Site Information
- Company: **[COMPANY NAME]**  ·  Project: **[PROJECT NAME]**  ·  Address: **[SITE ADDRESS]**
- Scope of work: [DESCRIBE]
- Dates: [START] – [END]  ·  Competent/Responsible person on site: **[NAME / PHONE]**
- Client / GC: [NAME / CONTACT]

### 2. Roles & Emergency Information
- Site safety contact: [NAME / PHONE]
- Nearest hospital / urgent care: [NAME / ADDRESS / PHONE]
- Site address to give 911: [____]  ·  Muster point: [____]
- First aid / fire extinguisher locations: [____]

### 3. Site-Specific Hazards & Controls
| Hazard | Affected Work / Area | Control Measures |
|---|---|---|
| [e.g., falls at leading edge] | [where] | [guardrails / PFAS] |
| [e.g., overhead power lines] | [where] | [clearance / de-energize] |
| [e.g., excavation] | [where] | [protective system] |
| [e.g., silica dust] | [where] | [water/vacuum controls] |
| [add as needed] |  |  |

### 4. Required Programs & Permits
☐ Fall Protection ☐ Excavation ☐ Confined Space ☐ Hot Work ☐ LOTO ☐ HazCom ☐ Silica control ☐ Other: ____

### 5. PPE Requirements
[List site-required PPE — e.g., hard hat, eye protection, hi-vis, safety-toe boots, gloves.]

### 6. Subcontractors & Coordination
[List subcontractors, their scopes, and how safety is coordinated on a multi-employer site.]

### 7. Training & Communication
Site orientation for all workers; daily pre-task briefings; toolbox talks. [Describe.]

### 8. Inspections & Review
Daily/weekly site inspections; this plan is reviewed and updated when scope, crews, or conditions change.
Review and customize based on applicable federal, state, local, client, and project-specific requirements.

Prepared by: **[RESPONSIBLE PERSON]**  Date: **[DATE]**  Approved: _________________`,
});

export default {
  "general-contractor-safety-manual": manual(
    "General Contractors",
    ["Falls from heights", "Struck-by (vehicles, equipment, falling objects)", "Caught-in/between (trenches, equipment)", "Electrocution (power lines, temporary power)", "Managing multiple subcontractors and trades"],
    ["Fall Protection", "Scaffold & Ladder Safety", "Excavation", "Electrical Safety / LOTO", "Hazard Communication", "Subcontractor Safety Agreement", "Multi-Employer Worksite Coordination"],
    ["Run a site orientation for every worker and subcontractor", "Hold pre-construction and daily pre-task safety meetings", "Prequalify subcontractors and define safety responsibilities in writing", "Control public exposure with barricades and signage", "Maintain housekeeping and protect openings and edges"]
  ),
  "small-construction-company-safety-manual": manual(
    "Small Construction Companies",
    ["Falls from ladders, roofs, and scaffolds", "Struck-by and caught-between", "Electrical hazards and temporary power", "Manual material handling strains", "Power and hand tool injuries"],
    ["Fall Protection", "Ladder & Scaffold Safety", "PPE", "Hazard Communication", "Electrical Safety"],
    ["Keep the program practical and right-sized for your crew", "Do daily pre-task planning before each task", "Inspect tools, ladders, and equipment before use", "Use the right PPE for the task", "Report and fix hazards quickly"]
  ),
  "hvac-contractor-safety-manual": manual(
    "HVAC Contractors",
    ["Electrical shock and arc flash", "Falls from ladders, roofs, and attic access", "Refrigerant handling and asphyxiation in confined areas", "Brazing/soldering (hot work) and burns", "Lifting heavy units; cuts from sheet metal"],
    ["Electrical Safety / LOTO", "Fall Protection & Ladder Safety", "Hazard Communication (refrigerants/chemicals)", "Hot Work", "Respiratory & Confined Space awareness"],
    ["De-energize and lock out before servicing electrical components", "Handle refrigerants per the SDS and ensure ventilation", "Use a hot work permit and fire watch for brazing", "Set ladders safely for roof and attic access", "Team-lift or use equipment for heavy units"]
  ),
  "plumbing-contractor-safety-manual": manual(
    "Plumbing Contractors",
    ["Trenching and excavation cave-ins", "Confined space entry (vaults, tanks)", "Hot work from soldering/torch use", "Chemical exposure (solvents, drain cleaners)", "Biological hazards from sewage; lifting strains"],
    ["Excavation", "Confined Space", "Hot Work", "Hazard Communication", "PPE & Bloodborne/biological awareness"],
    ["Locate utilities and use protective systems before entering trenches", "Follow the confined space program for vaults and tanks", "Use a hot work permit and fire watch for soldering", "Use chemical PPE and ventilation per the SDS", "Protect against sewage exposure with PPE and hygiene"]
  ),
  "roofing-contractor-safety-manual": manual(
    "Roofing Contractors",
    ["Falls from edges, through holes/skylights, and off ladders", "Heat illness on hot roofs", "Hot work from torch-down and kettles", "Material handling and falling objects", "Slips on sloped/wet surfaces"],
    ["Fall Protection", "Fall Rescue", "Ladder Safety", "Hot Work / Fire Prevention", "Heat Illness Prevention"],
    ["Use guardrails or personal fall arrest with rated anchors", "Cover and protect holes and skylights", "Maintain a fire watch for torch and kettle work", "Apply the water/rest/shade plan in heat", "Control falling material and protect people below"]
  ),
  "landscaping-safety-manual": manual(
    "Landscaping",
    ["Heat illness from outdoor work", "Mower, trimmer, and blower hazards (thrown objects, blade contact)", "Pesticide and chemical exposure", "Vehicle, trailer, and equipment hazards", "Insect/animal exposure and manual handling strains"],
    ["Heat Illness Prevention", "Hazard Communication (chemicals/pesticides)", "PPE", "Vehicle & Equipment Safety", "Manual Material Handling"],
    ["Follow the water/rest/shade plan and acclimatize new workers", "Clear debris and bystanders before operating equipment", "Use chemical PPE and follow label/SDS for pesticides", "Inspect trailers, secure loads, and use spotters", "Use eye, face, and hearing protection with equipment"]
  ),
  "remodeling-contractor-safety-manual": manual(
    "Remodeling Contractors",
    ["Silica dust from cutting concrete/masonry/tile", "Lead and asbestos in older homes", "Falls from ladders and scaffolds", "Power tool injuries and dust", "Electrical hazards in existing structures"],
    ["Silica exposure control", "Asbestos & Lead Awareness", "Ladder & Scaffold Safety", "PPE & Respiratory awareness", "Electrical Safety"],
    ["Use water or vacuum dust controls when cutting masonry/tile", "Stop and assess suspect asbestos/lead materials before disturbing", "Verify circuits are de-energized before opening walls", "Inspect and use tools with guards in place", "Contain dust and protect occupants in occupied spaces"]
  ),
  "concrete-contractor-safety-manual": manual(
    "Concrete Contractors",
    ["Silica dust from cutting/grinding", "Skin burns and irritation from wet concrete", "Formwork failure and rebar impalement", "Concrete pump and equipment hazards", "Heat illness and heavy lifting"],
    ["Silica exposure control", "Hazard Communication", "Fall Protection (formwork/elevated)", "Heavy Equipment Safety", "Heat Illness Prevention"],
    ["Use water/vacuum controls for cutting and grinding", "Protect skin from wet concrete and keep eyewash available", "Cap exposed rebar and brace formwork", "Secure pump lines and use spotters", "Apply heat controls and team-lift heavy loads"]
  ),
  "property-maintenance-safety-manual": manual(
    "Property Maintenance",
    ["Slips, trips, and falls; ladder use", "Electrical hazards during repairs", "Chemical exposure (cleaning/maintenance products)", "Lockout/tagout when servicing equipment", "Biological hazards during cleanups"],
    ["Ladder Safety", "Electrical Safety / LOTO", "Hazard Communication", "PPE", "Bloodborne/biological awareness"],
    ["Inspect and set ladders properly for elevated work", "De-energize and lock out before servicing equipment", "Follow label/SDS and use PPE for cleaning chemicals", "Keep walkways clear and address slip hazards", "Use barrier protection for blood/body-fluid cleanups"]
  ),
  "general-industry-safety-manual": manual(
    "General Industry",
    ["Machine hazards and missing guards", "Hazardous energy during service (LOTO)", "Chemical exposure (HazCom)", "Walking-working surface slips/trips/falls", "Ergonomic and material handling strains"],
    ["Machine Guarding", "Lockout/Tagout", "Hazard Communication", "PPE", "Walking-Working Surfaces / Emergency Action"],
    ["Keep machine guards in place and never bypass them", "Apply LOTO before service and maintenance", "Maintain SDSs and label all chemicals", "Keep floors clear, dry, and well lit", "Use ergonomic practices and lifting aids"]
  ),
  "small-business-safety-program-manual": manual(
    "Small Businesses",
    ["General workplace hazards specific to your operations", "Slips, trips, and falls", "Chemical and electrical hazards", "Manual handling and ergonomics", "Emergency preparedness"],
    ["Hazard Communication", "PPE", "Emergency Action Plan", "Incident Reporting", "Inspections"],
    ["Right-size the program to your business and actual hazards", "Train employees and document it", "Keep SDSs and label chemicals", "Maintain emergency plans and contacts", "Inspect regularly and fix hazards"]
  ),
  "subcontractor-safety-manual": manual(
    "Subcontractors",
    ["Working under a general contractor's site rules", "Coordination with other trades on shared sites", "Trade-specific hazards for your scope", "Temporary power and shared equipment", "Multi-employer worksite exposures"],
    ["Subcontractor Safety Agreement", "Multi-Employer Worksite Coordination", "Trade-specific programs", "PPE", "Incident Reporting"],
    ["Follow the host employer's and GC's site safety rules", "Attend site orientations and daily briefings", "Coordinate with other trades to avoid conflicts", "Report hazards and incidents to the GC and your supervisor", "Keep your own training and inspection records"]
  ),
  "site-specific-safety-plan-template": plan(
    "Site-Specific Safety Plan",
    "**Site-Specific Safety Plan for [PROJECT].** This plan documents the hazards and controls for this particular jobsite. Complete it before mobilizing and review it with everyone on site."
  ),
  "project-safety-plan-template": plan(
    "Project Safety Plan",
    "**Project Safety Plan for [PROJECT].** This plan covers the safety requirements, hazards, and responsibilities for the project from start to closeout."
  ),
};
