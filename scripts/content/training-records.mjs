// Training Logs and Records (15). Real, ready-to-use logs, matrices, and forms.

export default {
  "master-training-matrix": {
    body: `List employees down the left and required training topics across the top. Enter the completion date in each cell; highlight cells due within 30 days.

| Employee | New-Hire Orient. | HazCom | PPE | Fall Protection | Ladder/Scaffold | LOTO | First Aid | [Add topic] |
|---|---|---|---|---|---|---|---|---|
| [Name] |  |  |  |  |  |  |  |  |
| [Name] |  |  |  |  |  |  |  |  |
| [Name] |  |  |  |  |  |  |  |  |
| [Name] |  |  |  |  |  |  |  |  |

**Legend:** enter date completed · blank = not trained · flag cells due within 30 days.
**Maintained by:** [NAME]   **Reviewed:** [DATE]   Review and customize the topic columns to your work.`,
  },

  "employee-training-log": {
    body: `Record each training an employee completes. Keep with the employee's file.

**Employee:** [NAME]   **Position:** [____]   **Hire date:** [DATE]

| Date | Training Topic | Method | Duration | Trainer | Employee Signature |
|---|---|---|---|---|---|
|  |  |  |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |`,
  },

  "toolbox-talk-attendance-form": {
    body: `Use to record attendance at a toolbox talk.

**Topic:** [____]   **Date:** [DATE]   **Presenter:** [NAME]   **Location:** [JOBSITE]   **Duration:** ~5 min

**Key points covered:** [____]

| # | Print Name | Signature |
|---|---|---|
| 1 |  |  |
| 2 |  |  |
| 3 |  |  |
| 4 |  |  |
| 5 |  |  |
| 6 |  |  |
| 7 |  |  |
| 8 |  |  |

**Questions/concerns raised:** [____]   **Follow-up:** [____]`,
  },

  "safety-meeting-sign-in-sheet": {
    body: `Use for safety meetings of any length.

**Meeting topic:** [____]   **Date:** [DATE]   **Facilitator:** [NAME]   **Location:** [____]

| # | Print Name | Company/Crew | Signature |
|---|---|---|---|
| 1 |  |  |  |
| 2 |  |  |  |
| 3 |  |  |  |
| 4 |  |  |  |
| 5 |  |  |  |
| 6 |  |  |  |
| 7 |  |  |  |
| 8 |  |  |  |

**Topics covered / notes:** [____]`,
  },

  "training-completion-certificate-template": {
    body: `[ Printable certificate — customize with your logo and details. ]

---

### Certificate of Training Completion

This certifies that

**[EMPLOYEE NAME]**

has successfully completed

**[TRAINING TITLE]**

Date completed: **[DATE]**   ·   Duration: **[HOURS]**

Trainer / Authorized by: ____________________
[COMPANY NAME]   ·   [COMPANY LOGO]

---

*This certificate documents internal training completion. It is not a government or third-party certification unless stated and verifiable.*`,
  },

  "competent-person-designation-form": {
    body: `Use to designate a competent person — someone who can identify existing and predictable hazards and has authority to take prompt corrective action.

| Field | Entry |
|---|---|
| Designated person: | [NAME] |
| Area of competency: | ☐ Excavation ☐ Scaffolding ☐ Fall protection ☐ [Other: ____] |
| Basis for designation (training/experience): | [____] |
| Authority granted: | Identify hazards and take prompt corrective action, including stopping work |
| Effective date: | [DATE] |

**Designated by (management):** ____________________   **Date:** [DATE]
**Competent person acknowledgment:** ____________________   **Date:** [DATE]
Review and customize based on applicable federal, state, local, client, and project-specific requirements.`,
  },

  "qualified-person-designation-form": {
    body: `Use to designate a qualified person — someone who, by training, knowledge, and experience, can perform or supervise the specified work safely.

| Field | Entry |
|---|---|
| Designated person: | [NAME] |
| Area of qualification: | [e.g., electrical work, equipment operation] |
| Basis (training/credentials/experience): | [____] |
| Scope and limits: | [____] |
| Effective date: | [DATE] |

**Designated by (management):** ____________________   **Date:** [DATE]
**Qualified person acknowledgment:** ____________________   **Date:** [DATE]`,
  },

  "equipment-training-log": {
    body: `Document training and authorization to operate specific equipment.

| Date | Employee | Equipment / Type | Trained By | Evaluated (hands-on)? | Authorized? | Signature |
|---|---|---|---|---|---|---|
|  |  |  |  | ☐ | ☐ |  |
|  |  |  |  | ☐ | ☐ |  |
|  |  |  |  | ☐ | ☐ |  |
|  |  |  |  | ☐ | ☐ |  |`,
  },

  "refresher-training-tracker": {
    body: `Track recurring/refresher training and due dates.

| Employee | Training | Last Completed | Frequency | Next Due | Status |
|---|---|---|---|---|---|
| [Name] | [Topic] | [DATE] | [Annual/etc.] | [DATE] | ☐ Current ☐ Due soon ☐ Overdue |
| [Name] |  |  |  |  |  |
| [Name] |  |  |  |  |  |
| [Name] |  |  |  |  |  |

**Reviewed by:** [NAME]   **Date:** [DATE]`,
  },

  "annual-training-calendar": {
    body: `Plan safety training across the year. Assign topics to months and track completion.

| Month | Planned Topic(s) | Audience | Responsible | Completed |
|---|---|---|---|---|
| January |  |  |  | ☐ |
| February |  |  |  | ☐ |
| March |  |  |  | ☐ |
| April |  |  |  | ☐ |
| May |  |  |  | ☐ |
| June |  |  |  | ☐ |
| July |  |  |  | ☐ |
| August |  |  |  | ☐ |
| September |  |  |  | ☐ |
| October |  |  |  | ☐ |
| November |  |  |  | ☐ |
| December |  |  |  | ☐ |

[Tip: pair this with the 52 weekly toolbox talks for ongoing crew training.]`,
  },

  "monthly-safety-training-calendar": {
    body: `Plan weekly toolbox talks and training for the month.

**Month:** [____]   **Year:** [____]   **Crew/Location:** [____]

| Week | Toolbox Talk / Training Topic | Date | Presenter | Completed |
|---|---|---|---|---|
| Week 1 |  |  |  | ☐ |
| Week 2 |  |  |  | ☐ |
| Week 3 |  |  |  | ☐ |
| Week 4 |  |  |  | ☐ |
| Week 5 |  |  |  | ☐ |

**Notes:** [____]`,
  },

  "training-needs-assessment-form": {
    body: `Identify what training each role or employee needs based on their tasks and hazards.

| Role / Employee | Tasks / Hazards | Training Needed | Priority | Target Date |
|---|---|---|---|---|
| [____] | [____] | [____] | [High/Med/Low] | [DATE] |
| [____] | [____] | [____] |  | [DATE] |
| [____] | [____] | [____] |  | [DATE] |

**Assessed by:** [NAME]   **Date:** [DATE]   **Review frequency:** [annual/as needed]`,
  },

  "safety-quiz-answer-sheet": {
    body: `Use to record quiz responses and scoring for documented training.

**Employee:** [NAME]   **Quiz/Topic:** [____]   **Date:** [DATE]

| Q# | Answer | Correct? |
|---|---|:--:|
| 1 |  | ☐ |
| 2 |  | ☐ |
| 3 |  | ☐ |
| 4 |  | ☐ |
| 5 |  | ☐ |
| 6 |  | ☐ |
| 7 |  | ☐ |
| 8 |  | ☐ |

**Score:** ___ / 8   **Pass threshold:** [____]   **Result:** ☐ Pass ☐ Retrain
**Reviewed by:** _________________   **Date:** [DATE]`,
  },

  "employee-coaching-record": {
    body: `Document a coaching or corrective conversation about safety (supportive, not necessarily disciplinary).

| Field | Entry |
|---|---|
| Employee: | [NAME] |
| Date: | [DATE] |
| Topic / observation: | [____] |
| Discussion summary: | [____] |
| Expectations going forward: | [____] |
| Support/resources provided: | [____] |
| Follow-up date: | [DATE] |

**Supervisor:** ____________________   **Employee:** ____________________   **Date:** [DATE]
*If this is a disciplinary action, also follow the Disciplinary Safety Policy.*`,
  },

  "training-records-audit-checklist": {
    body: `Periodically audit your training records for completeness.

| # | Audit Item | Yes | No | Notes / Action |
|---|---|:--:|:--:|---|
| 1 | New hires have documented orientation | ☐ | ☐ |  |
| 2 | Training matrix is current for all employees | ☐ | ☐ |  |
| 3 | Required task-specific training is documented | ☐ | ☐ |  |
| 4 | Refresher/renewal dates are tracked | ☐ | ☐ |  |
| 5 | Competent/qualified person designations on file | ☐ | ☐ |  |
| 6 | Toolbox talk sign-in sheets are retained | ☐ | ☐ |  |
| 7 | Certificates/records are complete and signed | ☐ | ☐ |  |
| 8 | Records retained per retention schedule | ☐ | ☐ |  |

**Audited by:** [NAME]   **Date:** [DATE]   **Corrective actions due:** [DATE]`,
  },
};
