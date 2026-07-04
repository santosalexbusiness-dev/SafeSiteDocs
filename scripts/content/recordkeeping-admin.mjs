// Recordkeeping and Admin (15). Instructions, schedules, reviews, trackers.

export default {
  "osha-300-log-recordkeeping-instructions": {
    body: `*Instructions — use the official OSHA forms; do not substitute this page for them.*

**What the OSHA 300 Log is:** a log of work-related injuries and illnesses that meet recording criteria. Not every employer or incident is covered.

**Before you start:**
- Confirm whether your company is required to keep OSHA injury/illness records (some small employers and certain industries are partially exempt). **Verify your obligation — it depends on size and industry.**
- Use the **official OSHA 300, 300A, and 301 forms** (or an equivalent).

**General practice (verify specifics):**
- Record a case if it is work-related and results in death, days away, restricted work/transfer, medical treatment beyond first aid, loss of consciousness, or a significant diagnosis.
- Enter recordable cases within the required timeframe.
- Keep the log for the required retention period and protect employee privacy.
- Post the 300A summary during the required period each year.

| Field | Entry |
|---|---|
| Are we required to keep these records? | ☐ Yes ☐ No ☐ Unsure — confirm |
| Records owner: | [NAME] |
| Where official forms are kept: | [____] |

**This is general educational information, not legal advice. Confirm your specific recordkeeping and reporting obligations.**`,
  },

  "osha-300a-posting-reminder": {
    body: `Reminder to post the annual summary of work-related injuries and illnesses (OSHA 300A) if your company is required to keep these records.

| Field | Entry |
|---|---|
| Required to keep records? | ☐ Yes ☐ No ☐ Confirm |
| Summary (300A) prepared and certified by a company executive? | ☐ Yes |
| Posting location (where employee notices are posted): | [____] |
| Posting period (display the summary for the required months each year): | [____] |
| Responsible person: | [NAME] |
| Date posted: | [____]   Date removed: [____] |

**Note:** the posting period and certification are time-sensitive — verify the current dates and requirements. Also confirm any annual electronic submission requirements that may apply to your company.
*General educational information, not legal advice.*`,
  },

  "osha-301-incident-report-intake-instructions": {
    body: `*Use the official OSHA 301 (or equivalent) for recordable cases.* This page helps you gather the information; it does not replace the official form.

Information typically needed for an injury/illness incident record:
- Employee name and information
- Date of injury/illness and date of treatment
- Where the event occurred
- What the employee was doing before the incident
- What happened
- The injury/illness and the object/substance that harmed the employee
- Treating physician/facility (if any)

| Field | Entry |
|---|---|
| Linked to OSHA 300 Log case #: | [____] |
| Completed by: | [NAME] |
| Date: | [DATE] |

Complete an equivalent official 301 (or 301-equivalent like the company Incident Report Form) for recordable cases, within the required timeframe. Keep medical information confidential.
*General educational information, not legal advice — confirm your obligations.*`,
  },

  "safety-records-retention-schedule": {
    body: `Define how long safety records are kept. **Retention periods vary by record type and jurisdiction — confirm the correct periods for your company.**

| Record Type | Suggested Retention (verify) | Where Stored | Owner |
|---|---|---|---|
| Written programs (current + superseded) | Keep current; archive prior versions | [____] | [____] |
| Training records | Duration of employment + [verify] | [____] | [____] |
| Inspection records / JHAs | [verify] | [____] | [____] |
| Incident/injury records (300/301 if applicable) | [verify — often multi-year] | [____] | [____] |
| Exposure/medical records (if any) | [verify — often long-term] | [____] | [____] |
| Equipment inspection/maintenance | [verify] | [____] | [____] |
| SDS / chemical records | [verify] | [____] | [____] |

**Approved by:** [NAME]   **Date:** [DATE]
Confirm retention requirements with qualified counsel/authorities; some records (e.g., certain exposure/medical records) have long retention periods.`,
  },

  "safety-document-control-log": {
    body: `Track versions of your safety documents so everyone uses the current one.

| Document | Version | Effective Date | Last Reviewed | Next Review | Owner | Location |
|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |

**Process:** update the version and dates whenever a document changes; archive superseded versions.`,
  },

  "monthly-safety-report-template": {
    body: `Summarize safety activity and performance each month.

**Month / Year:** [____]   **Prepared by:** [NAME]

**1. Highlights / good catches:** [____]
**2. Incidents & near misses:** [counts + brief notes]
**3. Inspections completed / findings:** [____]
**4. Training delivered (toolbox talks, etc.):** [____]
**5. Open corrective actions:** [count + key items]
**6. KPIs:** [pull from the Safety KPI Tracker]
**7. Focus for next month:** [____]

**Distribution:** [management / crews]   **Date:** [DATE]`,
  },

  "quarterly-safety-review-template": {
    body: `Review safety performance each quarter.

**Quarter / Year:** [____]   **Prepared by:** [NAME]   **Date:** [DATE]

| Area | Status / Notes |
|---|---|
| Incident & near-miss trends | [____] |
| Inspection findings & closure rate | [____] |
| Training completion vs. plan | [____] |
| Corrective action status | [____] |
| Program updates needed | [____] |
| Goals progress | [____] |

**Actions for next quarter (owner / due):** [____]
**Reviewed with management:** ☐ Yes`,
  },

  "annual-safety-program-review": {
    body: `**Annual Safety Program Review for [COMPANY NAME].** Conduct at least annually.

### 1. Program Effectiveness
- Are the written programs current, accurate, and being followed? [____]

### 2. Performance Data
- Incidents, near misses, inspection findings, training completion, corrective-action closure. [____]

### 3. Hazard Trends
- What hazards/causes recurred this year? [____]

### 4. Training
- Gaps identified; plan for next year. [____]

### 5. Resources
- Are time, budget, equipment, and staffing adequate? [____]

### 6. Goals & Improvements
- Goals for next year and the actions to reach them. [____]

### 7. Updates Made
- Programs/documents revised as a result of this review. [____]

**Reviewed by:** [NAME]   **Management sign-off:** _________________   **Date:** [DATE]
Review and customize based on applicable requirements.`,
  },

  "safety-goals-worksheet": {
    body: `Set measurable safety goals and track them.

| Goal | Measure (how we'll know) | Target | Owner | Due | Status |
|---|---|---|---|---|---|
| [e.g., 100% toolbox talks held] | [attendance records] | [weekly] | [NAME] | [DATE] | ☐ |
| [e.g., close corrective actions on time] | [% closed by due date] | [90%] | [NAME] | [DATE] | ☐ |
| [Add goal] |  |  |  |  | ☐ |

**Set by:** [NAME]   **Date:** [DATE]   Use leading indicators (activities) as well as lagging (incidents).`,
  },

  "safety-kpi-tracker": {
    body: `Track key safety indicators over time.

| Period | Toolbox Talks Held | Inspections Done | Near Misses Reported | Incidents | Corrective Actions Open/Closed | Training % Complete |
|---|---|---|---|---|---|---|
| [Month] |  |  |  |  | __ / __ |  |
| [Month] |  |  |  |  | __ / __ |  |
| [Month] |  |  |  |  | __ / __ |  |

**Leading indicators** (talks, inspections, near-miss reports) predict performance — track them, not just incidents.`,
  },

  "corrective-action-tracker": {
    body: `Master tracker for all open corrective actions from any source.

| ID | Source | Finding / Hazard | Action | Owner | Due | Status | Closed Date |
|---|---|---|---|---|---|---|---|
|  | [inspection/incident/audit] |  |  |  |  | ☐ Open |  |
|  |  |  |  |  |  | ☐ Open |  |
|  |  |  |  |  |  | ☐ Open |  |
|  |  |  |  |  |  | ☐ Open |  |

**Review frequency:** [weekly/monthly]   **Owner:** [NAME]`,
  },

  "safety-committee-meeting-agenda": {
    body: `Run an effective safety committee meeting.

**Date:** [DATE]   **Chair:** [NAME]   **Location:** [____]

1. Review and approve previous minutes
2. Incident & near-miss review since last meeting
3. Inspection findings and open corrective actions
4. Employee safety concerns / suggestions
5. Training status and upcoming topics
6. Program/policy updates
7. KPIs and goals progress
8. New business
9. Action items (owner / due date)
10. Next meeting date

**Attendance:** attach the sign-in sheet.`,
  },

  "safety-committee-minutes-template": {
    body: `Record decisions and actions from the safety committee meeting.

**Date:** [DATE]   **Recorder:** [NAME]   **Attendees:** [____]

**Discussion summary:**
- [Topic] — [summary / decision]
- [Topic] — [summary / decision]

**Action items:**
| Action | Owner | Due | Status |
|---|---|---|---|
|  |  |  | ☐ |
|  |  |  | ☐ |

**Next meeting:** [DATE]   **Minutes approved:** ☐ (at next meeting)`,
  },

  "management-review-form": {
    body: `Document management's periodic review of the safety program.

| Field | Entry |
|---|---|
| Review date: | [DATE] |
| Participants: | [____] |
| Performance reviewed (incidents, KPIs, audits): | [____] |
| Program strengths: | [____] |
| Gaps / risks: | [____] |
| Resource decisions (budget, staffing, equipment): | [____] |
| Actions and owners: | [____] |
| Next review date: | [DATE] |

**Management sign-off:** _________________   **Date:** [DATE]`,
  },

  "safety-budget-planning-worksheet": {
    body: `Plan and track the safety budget.

| Category | Planned | Actual | Notes |
|---|---|---|---|
| PPE | [$] | [$] |  |
| Training | [$] | [$] |  |
| Equipment / inspections | [$] | [$] |  |
| Documentation / software | [$] | [$] |  |
| Medical / fit testing | [$] | [$] |  |
| Outside services (consult/abatement) | [$] | [$] |  |
| Contingency | [$] | [$] |  |
| **Total** | [$] | [$] |  |

**Prepared by:** [NAME]   **Period:** [____]   **Approved:** _________________`,
  },
};
