// Company Policies (20). Each has real, ready-to-adopt policy language.

const policy = (purpose, scope, statement, requirements) => ({
  body: `**1. Purpose** — ${purpose}

**2. Scope** — ${scope}

**3. Policy Statement** — ${statement}

**4. Requirements**
${requirements.map((r) => `- ${r}`).join("\n")}

**5. Responsibilities**
- **Management:** provide resources and support, lead by example, and review compliance.
- **Supervisors:** communicate and enforce this policy, train employees, and correct issues.
- **Employees:** understand and follow this policy and report concerns.

**6. Enforcement** — Non-compliance is addressed consistently with the company Disciplinary Safety Policy.

**7. References & Customization** — Review and customize based on applicable federal, state, local, client, and project-specific requirements.

Approved by: **[OWNER / RESPONSIBLE PERSON]**  Signature: _________________  Date: **[DATE]**`,
});

export default {
  "safety-and-health-policy-statement": {
    body: `**[COMPANY NAME] Safety and Health Policy**

The safety and health of our employees is a core value of [COMPANY NAME]. We are committed to providing a safe and healthful workplace and to preventing injuries and illnesses.

To meet this commitment, the company will:
- Provide the resources, training, and equipment reasonably necessary to perform work safely.
- Identify, evaluate, and control workplace hazards.
- Comply with applicable safety and health requirements.
- Involve employees in the safety program and respond to their concerns.
- Continuously review and improve our safety performance.

Every employee is responsible for working safely, following safe work practices, using required PPE, reporting hazards and incidents, and looking out for coworkers. **Every employee has stop-work authority** and is expected to use it when work appears unsafe — without fear of retaliation.

This commitment starts at the top and is shared by everyone.

Signed: **[OWNER / PRESIDENT]**  Title: **[TITLE]**  Signature: _________________  Date: **[DATE]**

Review and customize based on applicable federal, state, local, client, and project-specific requirements.`,
  },

  "stop-work-authority-policy": policy(
    "Empower every worker to stop work that is unsafe, without fear of reprisal.",
    "All employees, subcontractors, and visitors at [COMPANY NAME] worksites.",
    "Any person who observes an unsafe condition or act has the authority and the responsibility to stop the affected work immediately. Stopping work to address a safety concern will never result in retaliation.",
    [
      "When you identify an unsafe condition, stop the affected work and make the area safe.",
      "Notify the supervisor and affected workers.",
      "The hazard is corrected or controlled before work resumes.",
      "Document the stop-work event and the resolution.",
      "Good-faith use of stop-work authority is supported and recognized, never punished.",
    ]
  ),

  "employee-safety-responsibilities-policy": policy(
    "Define what the company expects of every employee for safety.",
    "All employees of [COMPANY NAME].",
    "Each employee shares responsibility for a safe workplace and is expected to actively participate in the safety program.",
    [
      "Follow all safety rules, programs, and safe work practices.",
      "Use, inspect, and maintain required PPE.",
      "Inspect tools and equipment before use; do not use damaged equipment.",
      "Report hazards, near misses, injuries, and incidents promptly.",
      "Participate in training and toolbox talks.",
      "Use stop-work authority when work appears unsafe.",
    ]
  ),

  "management-safety-responsibilities-policy": policy(
    "Define management's accountability for safety leadership and resources.",
    "All owners, managers, and supervisors at [COMPANY NAME].",
    "Management owns the safety program and is accountable for providing a safe workplace and the resources to maintain it.",
    [
      "Provide the time, budget, training, and equipment needed to work safely.",
      "Set clear safety expectations and lead by example.",
      "Ensure hazards are identified, assessed, and controlled.",
      "Ensure training is provided and documented.",
      "Investigate incidents and ensure corrective actions are completed.",
      "Review safety performance and drive improvement.",
    ]
  ),

  "disciplinary-safety-policy": policy(
    "Apply fair, consistent accountability for safety performance.",
    "All employees of [COMPANY NAME].",
    "Safety rules apply to everyone. The company uses progressive, consistent discipline for violations, while recognizing that reporting hazards and near misses in good faith is encouraged, not punished.",
    [
      "Discipline is applied consistently and based on the severity and circumstances.",
      "Typical progression: verbal warning, written warning, suspension, termination — serious or willful violations may skip steps.",
      "Reporting a hazard, near miss, or incident in good faith is not disciplined.",
      "Document each step and the corrective action.",
      "[Customize the specific steps to your company and confirm with HR/legal counsel.]",
    ]
  ),

  "return-to-work-policy": policy(
    "Support injured employees returning to work safely, including modified duty.",
    "All employees of [COMPANY NAME] returning from a work-related injury or illness.",
    "The company supports a safe and timely return to work, offering transitional or modified duty where appropriate and consistent with medical guidance.",
    [
      "Maintain communication with the injured employee during recovery.",
      "Follow the treating provider's work restrictions.",
      "Offer transitional/modified-duty assignments within restrictions when available.",
      "Document restrictions, assignments, and progress.",
      "[Coordinate with your workers' compensation carrier and confirm with legal/HR.]",
    ]
  ),

  "drug-and-alcohol-policy-placeholder": policy(
    "State the company's expectation of a drug- and alcohol-free workplace. (Placeholder — legal review required.)",
    "All employees of [COMPANY NAME]; subcontractors as required by contract.",
    "[PLACEHOLDER] [COMPANY NAME] is committed to a workplace free of the influence of drugs and alcohol that could impair safe work. The specifics of testing and consequences must be defined with legal counsel.",
    [
      "Working under the influence of drugs or alcohol is prohibited.",
      "[Define testing program if any — pre-employment, reasonable suspicion, post-incident — with legal counsel.]",
      "[Define how prescription medications affecting safety are handled.]",
      "[Define consequences and any assistance/EAP resources.]",
      "**This policy must be reviewed and finalized by qualified legal counsel before use; drug and alcohol testing is heavily regulated and varies by state.**",
    ]
  ),

  "workplace-violence-prevention-policy": policy(
    "Prevent and respond to threats, intimidation, and violence at work.",
    "All employees, subcontractors, and visitors at [COMPANY NAME].",
    "The company has zero tolerance for threats, intimidation, harassment, or acts of violence in the workplace.",
    [
      "Threats, intimidation, and violence are prohibited and must be reported.",
      "Report concerns to a supervisor or management immediately; call 911 for emergencies.",
      "Weapons are prohibited on company property/worksites except as allowed by law and policy.",
      "Reports are taken seriously and handled discreetly; retaliation is prohibited.",
      "[Customize reporting contacts and confirm with legal/HR.]",
    ]
  ),

  "severe-weather-policy": policy(
    "Protect workers from lightning, high wind, extreme heat/cold, and storms.",
    "All employees at [COMPANY NAME] worksites.",
    "Work is adjusted or suspended when severe weather creates an unsafe condition. Worker safety takes priority over schedule.",
    [
      "Monitor forecasts and conditions before and during the shift.",
      "Stop outdoor/elevated work and seek shelter when lightning is in the area; wait the recommended time before returning.",
      "Adjust or stop work at height, with materials, and with lifts in high wind.",
      "Apply heat and cold stress controls in extreme temperatures.",
      "Know shelter locations and the plan to account for everyone.",
    ]
  ),

  "emergency-communication-policy": policy(
    "Ensure fast, clear communication during emergencies.",
    "All employees and worksites of [COMPANY NAME].",
    "The company maintains clear methods to alert, communicate with, and account for employees during an emergency.",
    [
      "Each site has a method to raise the alarm and contact emergency services.",
      "Maintain a current emergency contact list and communication tree.",
      "Post the site address for 911 and the muster point.",
      "Account for all personnel at the muster point and report anyone missing.",
      "Designate who communicates with responders, media, and families.",
    ]
  ),

  "visitor-safety-policy": policy(
    "Keep visitors safe and informed on worksites.",
    "All visitors to [COMPANY NAME] worksites and facilities.",
    "Visitors are protected while on site and must follow site safety rules and remain escorted in work areas.",
    [
      "Visitors sign in and receive a brief safety orientation.",
      "Visitors wear required PPE (e.g., hard hat, eye protection, hi-vis) in work areas.",
      "Visitors stay with an escort and out of active hazard zones.",
      "Visitors follow all posted rules and emergency procedures.",
      "Visitors sign out when leaving.",
    ]
  ),

  "subcontractor-safety-policy": policy(
    "Set safety expectations for subcontractors working with the company.",
    "All subcontractors performing work for [COMPANY NAME].",
    "Subcontractors are expected to work safely, comply with site rules, and maintain their own compliant safety programs and records.",
    [
      "Subcontractors are prequalified for safety before award where applicable.",
      "Subcontractors follow site rules, attend orientations, and coordinate with other trades.",
      "Subcontractors provide their own trained workers, PPE, and equipment in safe condition.",
      "Subcontractors report hazards and incidents promptly.",
      "Subcontractors maintain required insurance and safety documentation.",
    ]
  ),

  "housekeeping-policy": policy(
    "Keep worksites clean and organized to prevent injuries and fires.",
    "All employees and worksites of [COMPANY NAME].",
    "Good housekeeping is a continuous, everyone's-job standard — not an end-of-day task.",
    [
      "Keep walkways, stairs, and exits clear at all times.",
      "Stack and store material so it won't fall or block egress.",
      "Clean up debris and spills as work progresses.",
      "Manage cords and hoses to prevent trip hazards.",
      "Place scrap and waste in the proper containers; control combustible waste.",
    ]
  ),

  "jobsite-conduct-policy": policy(
    "Define expected professional conduct that supports safety.",
    "All employees and subcontractors at [COMPANY NAME] worksites.",
    "Professional conduct supports a safe and respectful worksite. Horseplay, harassment, and unsafe behavior are not tolerated.",
    [
      "No horseplay, fighting, or distracting behavior.",
      "Treat coworkers, clients, and the public with respect.",
      "Follow all safety rules, signage, and supervisor direction.",
      "No phone use that distracts from a safety-sensitive task.",
      "Report unsafe or inappropriate behavior.",
    ]
  ),

  "ppe-policy": policy(
    "Require selection, use, and maintenance of appropriate PPE.",
    "All employees of [COMPANY NAME]; visitors and subs as required.",
    "PPE is provided and used based on a hazard assessment, as the last layer of protection after other controls.",
    [
      "PPE is selected from a documented PPE Hazard Assessment.",
      "Required PPE is worn correctly in designated areas/tasks.",
      "Employees inspect PPE before use and replace damaged/expired items.",
      "The company provides required PPE and training on its use.",
      "Specialty PPE (respiratory, fall, electrical-rated) follows its specific program.",
    ]
  ),

  "heat-illness-prevention-policy": policy(
    "Protect workers from heat-related illness.",
    "All employees performing work in hot indoor or outdoor environments.",
    "The company prevents heat illness through water, rest, shade, acclimatization, training, and monitoring.",
    [
      "Provide cool drinking water and encourage frequent drinking.",
      "Provide access to shade/cool areas and allow preventive cool-down rest.",
      "Acclimatize new and returning workers gradually.",
      "Train workers and supervisors to recognize and respond to heat illness.",
      "Heat stroke is a 911 emergency — cool aggressively while waiting for help. See the Heat Illness Prevention Plan.",
    ]
  ),

  "cold-stress-prevention-policy": policy(
    "Protect workers from cold-related illness and injury.",
    "All employees performing work in cold environments.",
    "The company prevents cold stress through clothing, warm-up breaks, monitoring, and training.",
    [
      "Encourage layered, dry clothing and covered head/hands.",
      "Provide warm-up breaks and warming areas.",
      "Monitor conditions and adjust work in extreme cold/wind.",
      "Train workers to recognize hypothermia and frostbite.",
      "Address ice on walkways, ladders, and scaffolds. See the Cold Stress Prevention Plan.",
    ]
  ),

  "incident-reporting-policy": policy(
    "Ensure timely reporting and investigation of incidents.",
    "All employees of [COMPANY NAME].",
    "All injuries, illnesses, and significant incidents are reported promptly so workers get care and causes get fixed.",
    [
      "Report injuries, illnesses, and incidents to a supervisor as soon as it is safe.",
      "Complete the Incident Report Form, including witness statements.",
      "Preserve the scene as practical until documented.",
      "Cooperate with the investigation to identify root causes.",
      "Confirm whether the event triggers OSHA recordkeeping/reporting for the company.",
    ]
  ),

  "near-miss-reporting-policy": policy(
    "Encourage reporting of close calls to prevent future incidents.",
    "All employees of [COMPANY NAME].",
    "Near misses are valuable warnings. Reporting them is encouraged and never disciplined.",
    [
      "Report close calls (almost-incidents) to a supervisor or via the Near Miss Report Form.",
      "Reporting is about fixing conditions, not assigning blame.",
      "Each report is reviewed and the hazard corrected.",
      "Lessons learned are shared with the crew.",
      "Good-faith reporting is recognized, never punished.",
    ]
  ),

  "vehicle-safety-policy": policy(
    "Ensure safe operation of company and personal vehicles on company business.",
    "All employees who drive on company business for [COMPANY NAME].",
    "Drivers operate vehicles safely, legally, and without distraction.",
    [
      "Maintain a valid license and be an authorized driver.",
      "Wear seatbelts and obey all traffic laws and speed limits.",
      "No handheld phone use or texting while driving.",
      "Perform pre-trip inspections; report defects; secure loads.",
      "Use a spotter and walk-around for backing; never drive impaired or fatigued.",
    ]
  ),
};
