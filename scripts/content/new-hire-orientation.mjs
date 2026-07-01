// New-Hire Safety Orientation (14 non-sample). Real forms, checklists, and acks.

const checklist = (intro, items) => ({
  body: `${intro}

| # | Item | ✔ | Initials |
|---|---|:--:|---|
${items.map((it, i) => `| ${i + 1} | ${it} |  |  |`).join("\n")}

**Completed by:** [NAME]   **Signature:** _________________   **Employee:** _________________   **Date:** [DATE]`,
});

const ack = (statement, extra = "") => ({
  body: `${statement}

${extra}**Employee (print):** ____________________   **Signature:** ____________________   **Date:** [DATE]
**Supervisor (print):** ____________________   **Signature:** ____________________   **Date:** [DATE]`,
});

export default {
  "new-hire-safety-checklist": checklist(
    "Use this checklist on a new employee's first day, before field work. Cover each item and initial.",
    [
      "Company safety policy and commitment reviewed",
      "Employee safety responsibilities explained",
      "Stop-work authority explained",
      "Hazard, near-miss, and incident reporting process explained",
      "Required PPE identified, issued, and fitted",
      "Applicable programs identified (HazCom, fall protection, ladders, etc.)",
      "Jobsite rules and conduct reviewed",
      "Tool and equipment inspection basics covered",
      "Emergency procedures, exits, and muster point reviewed",
      "First-aid kit and fire extinguisher locations shown",
      "Emergency Contact Form completed",
      "Required acknowledgments signed",
      "Supervisor introduced; questions answered",
    ]
  ),

  "employee-safety-acknowledgment-form": ack(
    "I acknowledge that I have received and understand [COMPANY NAME]'s safety orientation, including my safety responsibilities, the company's safety rules, how to report hazards and incidents, and my stop-work authority. I agree to follow the company's safety program and to ask questions when I am unsure. I understand I will receive additional task-specific training before performing work that requires it."
  ),

  "ppe-acknowledgment-form": ack(
    "I acknowledge that [COMPANY NAME] has provided the personal protective equipment (PPE) listed below and trained me on its proper use, inspection, care, and limitations. I agree to wear the required PPE, inspect it before use, keep it in good condition, and request replacements when it is damaged or worn.",
    `**PPE issued:**

| Item | Type / Size | Date Issued |
|---|---|---|
| Hard hat |  |  |
| Eye protection |  |  |
| Gloves |  |  |
| Footwear (employee-provided unless noted) |  |  |
| Hearing protection |  |  |
| High-visibility vest |  |  |
| Other: |  |  |

`
  ),

  "employee-emergency-contact-form": {
    body: `Complete and keep this confidential form on file. Information is voluntary where noted and used only for emergencies.

| Field | Entry |
|---|---|
| Employee name: | [____] |
| Home address: | [____] |
| Personal phone: | [____] |
| Primary emergency contact: | [NAME] |
| Relationship / phone: | [____] |
| Secondary emergency contact: | [NAME] |
| Relationship / phone: | [____] |
| Physician (optional): | [____] |
| Medical conditions/allergies relevant in an emergency (voluntary): | [____] |
| Preferred hospital (optional): | [____] |

**Employee signature:** _________________   **Date:** [DATE]
*Keep confidential per company privacy practices.*`,
  },

  "safety-rules-acknowledgment": ack(
    `I acknowledge that I have read and understand the following general safety rules of [COMPANY NAME] and agree to follow them:

1. Wear required PPE for the task and area.
2. Inspect tools and equipment before use; do not use damaged equipment.
3. Follow fall protection requirements when working at height.
4. Keep work areas clean and walkways/exits clear.
5. Follow lockout/tagout before servicing equipment.
6. Read labels and SDSs before using chemicals.
7. Report hazards, near misses, and incidents promptly.
8. Use stop-work authority when work appears unsafe.
9. No horseplay, and no phone use during safety-sensitive tasks.
10. Follow all site-specific and client safety rules.

[Customize these rules to your company and worksite.]`
  ),

  "hazard-reporting-instructions": {
    body: `**How to report a hazard at [COMPANY NAME]**

Reporting hazards keeps everyone safe. You will never be disciplined for reporting in good faith.

**Steps:**
1. If there is immediate danger, stop work and make the area safe (you have stop-work authority).
2. Tell your supervisor right away — in person, by phone, or by radio.
3. Describe what and where the hazard is and any immediate action you took.
4. For non-urgent hazards, you may also use the hazard report below or your company's reporting tool.
5. The supervisor corrects or controls the hazard and follows up with you.

**Who to contact:** Supervisor: [NAME / PHONE]   Safety contact: [NAME / PHONE]   Emergency: **911**

**Hazard report (optional):**
| Field | Entry |
|---|---|
| Reported by: | [NAME] |
| Date / time: | [____] |
| Location: | [____] |
| Hazard described: | [____] |
| Immediate action taken: | [____] |
| Reported to: | [NAME] |`,
  },

  "stop-work-authority-acknowledgment": ack(
    "I understand that [COMPANY NAME] grants me the authority and responsibility to stop any work I reasonably believe is unsafe, and that I will not face retaliation for doing so. I understand the process: stop the affected work, make the area safe, notify my supervisor, and ensure the hazard is corrected before work resumes."
  ),

  "new-employee-training-log": {
    body: `Record each training the new employee completes during onboarding.

**Employee:** [NAME]   **Start date:** [DATE]   **Supervisor:** [NAME]

| Date | Training Topic | Method (talk/hands-on/video) | Trainer | Employee Initials |
|---|---|---|---|---|
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |

**Verified complete by:** _________________   **Date:** [DATE]`,
  },

  "first-day-safety-briefing-template": {
    body: `Cover these topics with the new employee on day one. Check each and add notes.

| Topic | Covered | Notes |
|---|:--:|---|
| Company safety commitment | ☐ |  |
| Reporting hazards, near misses, injuries | ☐ |  |
| Stop-work authority | ☐ |  |
| Required PPE for their work | ☐ |  |
| Key hazards for their tasks | ☐ |  |
| Emergency exits, alarms, muster point | ☐ |  |
| First aid and fire extinguisher locations | ☐ |  |
| Who their supervisor and safety contact are | ☐ |  |
| Where to find SDSs and safety documents | ☐ |  |

**Briefed by:** [NAME]   **Employee:** _________________   **Date:** [DATE]`,
  },

  "new-hire-quiz-template": {
    body: `Use this short quiz to confirm understanding after orientation. Customize questions and the answer key to your program.

1. What should you do first if you see an unsafe condition? ____________________
2. Who do you report an injury or near miss to, and how soon? ____________________
3. Name two pieces of PPE required for your work. ____________________
4. What is "stop-work authority" and who has it? ____________________
5. Where do you find a Safety Data Sheet (SDS)? ____________________
6. Where is the muster point and what is the site address for 911? ____________________
7. What do you do before using a tool or ladder? ____________________
8. True/False: You can be disciplined for reporting a near miss in good faith. ____________________

**Employee:** _________________   **Score:** ___ / 8   **Reviewed by:** _________________   **Date:** [DATE]
*[Attach your answer key — customize to your program.]*`,
  },

  "supervisor-orientation-checklist": checklist(
    "Use this checklist to orient a new supervisor or foreman to their safety responsibilities.",
    [
      "Reviewed the company safety program and policies",
      "Understands how to run pre-task planning and toolbox talks",
      "Knows how to conduct and document training",
      "Knows the inspection and corrective-action process",
      "Knows the incident reporting and investigation process",
      "Understands enforcement and the disciplinary policy",
      "Knows emergency procedures and how to account for the crew",
      "Knows where safety documents, forms, and SDSs are kept",
      "Understands subcontractor and multi-trade coordination",
      "Knows their authority to stop unsafe work and support workers who do",
    ]
  ),

  "field-employee-orientation-checklist": checklist(
    "Use this checklist to orient a field employee to jobsite-specific safety.",
    [
      "Site-specific hazards and controls reviewed",
      "Required PPE for the site issued and worn",
      "Fall protection, ladder, and scaffold requirements explained",
      "Electrical and temporary power hazards reviewed",
      "Housekeeping and material handling expectations covered",
      "Tool and equipment inspection demonstrated",
      "Emergency procedures, exits, and muster point reviewed",
      "Hazard and incident reporting explained",
      "Stop-work authority explained",
      "Coordination with other trades and site rules covered",
    ]
  ),

  "subcontractor-orientation-form": {
    body: `Complete with each subcontractor's workers before they begin on site.

| Field | Entry |
|---|---|
| Subcontractor company: | [____] |
| Scope of work: | [____] |
| On-site supervisor / contact: | [NAME / PHONE] |
| Number of workers oriented: | [____] |

**Site rules reviewed:** ☐ PPE requirements ☐ Fall protection ☐ Emergency procedures/muster ☐ Hazard & incident reporting ☐ Housekeeping ☐ Coordination with other trades ☐ Site-specific hazards

**Acknowledgment:** The subcontractor confirms its workers are trained for their tasks, will follow site safety rules, and will report hazards and incidents.

**Subcontractor representative:** ____________________   **Signature:** ____________________   **Date:** [DATE]
**[COMPANY NAME] representative:** ____________________   **Date:** [DATE]`,
  },

  "visitor-orientation-form": {
    body: `Complete for each visitor before they enter work areas.

| Field | Entry |
|---|---|
| Visitor name: | [____] |
| Company / purpose: | [____] |
| Escort (employee): | [NAME] |
| Time in / out: | [____] / [____] |

**Brief safety orientation given:** ☐ Required PPE issued/worn ☐ Stay with escort ☐ Emergency exits & muster point ☐ Keep clear of hazard zones ☐ Follow posted rules

**Visitor acknowledgment:** I will follow site safety rules and remain with my escort.
**Visitor signature:** ____________________   **Date:** [DATE]`,
  },
};
