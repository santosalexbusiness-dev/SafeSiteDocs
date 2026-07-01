// Incident and Near Miss Reporting (14 non-sample). Reports, RCA, logs, reviews.

export default {
  "near-miss-report-form": {
    body: `A near miss is a close call with no injury — reporting it helps fix the cause. Reporting is encouraged and not disciplined.

| Field | Entry |
|---|---|
| Date / time: | [____] |
| Location: | [____] |
| Reported by: | [NAME] (optional/anonymous allowed) |
| What almost happened: | [____] |
| What could the outcome have been: | [____] |
| Contributing conditions: | [____] |
| Immediate action taken: | [____] |
| Suggested fix: | [____] |

**Reviewed by:** [NAME]   **Corrective action assigned:** [NAME / DUE DATE]   **Date:** [DATE]`,
  },

  "injury-report-form": {
    body: `Document a work-related injury or illness (also see the company Incident Report Form). Get medical care first.

| Field | Entry |
|---|---|
| Employee: | [NAME]   Job title: [____] |
| Date / time of injury: | [____]   Date reported: [____] |
| Location / project: | [____] |
| Body part(s) affected: | [____] |
| Nature of injury (cut, strain, burn, etc.): | [____] |
| Task being performed: | [____] |
| How it happened: | [____] |
| PPE in use: | [____] |
| First aid / medical treatment given: | [____] |
| Treated off-site? Provider: | [____] |
| Witnesses: | [____] |
| Corrective actions: | [____] |

**Employee (if able):** _________________   **Supervisor:** _________________   **Date:** [DATE]
Keep medical information confidential. Confirm any recordkeeping/reporting obligations.`,
  },

  "property-damage-report": {
    body: `Document damage to property or equipment (no injury, or in addition to an injury report).

| Field | Entry |
|---|---|
| Date / time: | [____] |
| Location: | [____] |
| Property/equipment damaged: | [____] |
| Owner (company/client/third party): | [____] |
| Estimated value/impact: | [____] |
| What happened: | [____] |
| Contributing factors: | [____] |
| Immediate actions (secure area, remove from service): | [____] |
| Corrective actions: | [____] |

**Reported by:** [NAME]   **Supervisor:** _________________   **Date:** [DATE]`,
  },

  "vehicle-incident-report": {
    body: `Document a vehicle incident. Ensure everyone is safe and call 911 if needed.

| Field | Entry |
|---|---|
| Date / time: | [____]   Location: [____] |
| Driver: | [NAME]   License #: [____] |
| Company vehicle: | [Year/Make/Model/Plate] |
| Other party (if any): | [Name/contact/insurance/plate] |
| Description of incident: | [____] |
| Injuries? | ☐ Yes ☐ No — describe: [____] |
| Police report #: | [____] |
| Witnesses: | [____] |
| Photos taken: | ☐ Yes (log them) |
| Conditions (weather/road/visibility): | [____] |
| Corrective actions: | [____] |

**Driver signature:** _________________   **Supervisor:** _________________   **Date:** [DATE]
Do not admit fault on scene; report to your insurer per company process.`,
  },

  "witness-statement-form": {
    body: `For a witness to record what they observed, in their own words.

| Field | Entry |
|---|---|
| Witness name: | [____]   Contact: [____] |
| Date of statement: | [DATE] |
| Incident date/time/location: | [____] |

**Describe what you saw/heard, in your own words** (use factual observations, not opinions):

[____]

**Did you see the events leading up to it?** [____]
**Anything else relevant?** [____]

**Witness signature:** ____________________   **Date:** [DATE]
*Voluntary statement. Keep confidential.*`,
  },

  "root-cause-analysis-form": {
    body: `Find the underlying causes, not just the immediate one. Use "5 Whys" or a similar method.

| Field | Entry |
|---|---|
| Incident: | [____]   Date: [____] |
| What happened (brief): | [____] |

**5 Whys:**
1. Why? [____]
2. Why? [____]
3. Why? [____]
4. Why? [____]
5. Why? [____]

**Contributing factors:**
| Category | Factor |
|---|---|
| People/training | [____] |
| Equipment/tools | [____] |
| Procedures | [____] |
| Environment/conditions | [____] |
| Management systems | [____] |

**Root cause(s):** [____]
**Corrective actions (address the root cause):** [____]
**Completed by:** [NAME]   **Date:** [DATE]`,
  },

  "corrective-action-form": {
    body: `Document and track a corrective action to completion.

| Field | Entry |
|---|---|
| Source (incident/near miss/inspection/audit): | [____] |
| Hazard / finding: | [____] |
| Corrective action (what will be done): | [____] |
| Control level (eliminate/engineer/admin/PPE): | [____] |
| Assigned to: | [NAME] |
| Due date: | [DATE] |
| Date completed: | [____] |
| Verified effective by: | [NAME] |

**Status:** ☐ Open ☐ In progress ☐ Complete ☐ Verified
**Notes:** [____]`,
  },

  "incident-investigation-checklist": {
    body: `Use to run a thorough incident investigation.

| # | Step | Done | Notes |
|---|---|:--:|---|
| 1 | Ensure injured are cared for; area secured | ☐ |  |
| 2 | Preserve the scene; take photos (log them) | ☐ |  |
| 3 | Gather facts: who/what/when/where/how | ☐ |  |
| 4 | Interview involved persons and witnesses | ☐ |  |
| 5 | Identify contributing factors | ☐ |  |
| 6 | Determine root cause(s) | ☐ |  |
| 7 | Develop corrective actions | ☐ |  |
| 8 | Assign and track actions to completion | ☐ |  |
| 9 | Share lessons learned | ☐ |  |
| 10 | Confirm recordkeeping/reporting obligations | ☐ |  |

**Investigator:** [NAME]   **Date:** [DATE]   Investigate to prevent recurrence, not to assign blame.`,
  },

  "supervisor-incident-review-form": {
    body: `For the supervisor to review an incident report and initiate follow-up.

| Field | Entry |
|---|---|
| Incident / employee: | [____] |
| Date reviewed: | [DATE]   Reviewed by: [NAME] |
| Report complete and accurate? | ☐ Yes ☐ Needs follow-up |
| Immediate cause: | [____] |
| Was a similar incident reported before? | [____] |
| Corrective actions initiated: | [____] |
| Root cause analysis needed? | ☐ Yes ☐ No |
| Recordable/reportable determination pending? | [____] |

**Supervisor signature:** _________________   **Date:** [DATE]`,
  },

  "photo-evidence-log": {
    body: `Log photos taken during an incident investigation or inspection.

| Photo # | Date/Time | Subject / Location | Taken By | Stored At |
|---|---|---|---|---|
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |

**Investigation/Incident reference:** [____]`,
  },

  "medical-treatment-tracking-log": {
    body: `Track medical treatment and follow-up for work-related injuries (keep confidential).

| Employee | Injury Date | Provider | Treatment / Visit Dates | Work Status (full/modified/off) | Next Appt |
|---|---|---|---|---|---|
|  |  |  |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |

*Confidential — store per privacy practices and coordinate with your workers' comp process.*`,
  },

  "return-to-work-review-form": {
    body: `Use when an injured employee returns, including transitional/modified duty.

| Field | Entry |
|---|---|
| Employee: | [NAME] |
| Injury / date: | [____] |
| Provider restrictions: | [____] |
| Modified-duty assignment offered: | [____] |
| Tasks within restrictions? | ☐ Yes |
| Start date of return: | [DATE] |
| Follow-up/review date: | [DATE] |

**Employee:** _________________   **Supervisor:** _________________   **Date:** [DATE]
Coordinate with the treating provider and your workers' comp carrier; confirm with HR/legal as needed.`,
  },

  "monthly-incident-summary": {
    body: `Summarize incident activity each month to spot trends.

**Month / Year:** [____]   **Prepared by:** [NAME]

| Metric | This Month | Year to Date |
|---|---|---|
| Injuries/illnesses | [__] | [__] |
| Recordable cases (if tracked) | [__] | [__] |
| Near misses reported | [__] | [__] |
| Property/vehicle incidents | [__] | [__] |
| Corrective actions opened | [__] | [__] |
| Corrective actions closed | [__] | [__] |

**Notable incidents / trends:** [____]
**Focus for next month:** [____]`,
  },

  "annual-incident-review-template": {
    body: `Review the year's incident data and set direction for next year.

**Year:** [____]   **Prepared by:** [NAME]   **Date:** [DATE]

**1. Summary of incidents** (injuries, near misses, property/vehicle): [____]
**2. Trends and common causes:** [____]
**3. Most effective corrective actions:** [____]
**4. Outstanding/recurring issues:** [____]
**5. Training and program gaps identified:** [____]
**6. Goals and focus areas for next year:** [____]

**Reviewed with management:** ☐ Yes — date: [____]   Pair with the Annual Safety Program Review.`,
  },
};
