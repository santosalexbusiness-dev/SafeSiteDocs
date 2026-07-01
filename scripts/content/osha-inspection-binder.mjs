// OSHA-Style Inspection Binder (14 non-sample). Readiness, response, logs, indexes.

const log = (intro, cols) => ({
  body: `${intro}

| ${cols.join(" | ")} |
|${cols.map(() => "---").join("|")}|
| ${cols.map(() => " ").join(" | ")} |
| ${cols.map(() => " ").join(" | ")} |
| ${cols.map(() => " ").join(" | ")} |
| ${cols.map(() => " ").join(" | ")} |
| ${cols.map(() => " ").join(" | ")} |`,
});

export default {
  "osha-inspection-readiness-checklist": {
    body: `Use this checklist to keep your company prepared in case of an inspection. Review on the schedule you set.

| # | Readiness Item | Yes | No | Notes |
|---|---|:--:|:--:|---|
| 1 | Written safety programs are current and accessible | ☐ | ☐ |  |
| 2 | Training records are complete and organized | ☐ | ☐ |  |
| 3 | Inspection and JHA records are on file | ☐ | ☐ |  |
| 4 | Incident records (and OSHA 300/300A/301 if applicable) are maintained | ☐ | ☐ |  |
| 5 | SDSs and chemical inventory are current | ☐ | ☐ |  |
| 6 | Required postings are displayed | ☐ | ☐ |  |
| 7 | Corrective actions are documented and closed | ☐ | ☐ |  |
| 8 | A point person and response procedure are designated | ☐ | ☐ |  |
| 9 | The inspection binder is assembled and current | ☐ | ☐ |  |
| 10 | Worksites reflect the written programs (PPE, fall, housekeeping) | ☐ | ☐ |  |

**Reviewed by:** [NAME]   **Date:** [DATE]   **Next review:** [DATE]
Being organized helps you stay prepared; it does not by itself ensure compliance or prevent citations.`,
  },

  "osha-inspection-response-procedure": {
    body: `A calm, organized, professional response matters. Customize this to your company and confirm the approach with legal counsel in advance.

**1. At first contact**
- Greet the compliance officer professionally and notify the designated company representative immediately.
- Ask for the inspector's credentials and the reason/scope of the visit; record it on the Inspector Request Log.

**2. Opening conference**
- The company representative attends. Record the scope, focus, and any documents requested (Opening Conference Notes Form).

**3. Walkaround**
- A company representative accompanies the inspector. Take the same photos/notes the inspector takes (Walkaround Inspection Notes Form).
- Correct obvious hazards promptly and document it.

**4. Document requests**
- Log every document requested and provided (Document Request Tracking Log). Provide what is requested in an organized way.

**5. Employee interviews**
- Cooperate as required; log interviews requested (Employee Interview Tracking Log).

**6. Closing conference**
- Record findings discussed and timelines. Begin corrective action planning.

**7. After the visit**
- Track corrective actions and abatement; consult legal counsel before responding to any citation.

**Designated representative:** [NAME / PHONE]   **Backup:** [NAME / PHONE]
This is a general procedure, not legal advice. Consult qualified counsel about your rights and obligations.`,
  },

  "employer-rights-during-inspection-summary": {
    body: `A plain-language general summary to help you prepare. **This is educational only, not legal advice — confirm your specific rights and obligations with qualified legal counsel.**

Employers generally may:
- Ask to see the compliance officer's credentials.
- Have a company representative present during the opening conference, walkaround, and closing conference.
- Ask about the scope and reason for the inspection.
- Take their own notes and photographs alongside the inspector's.
- Request that legitimately confidential trade-secret areas be handled appropriately.
- Consult with legal counsel.

Employers are generally expected to:
- Cooperate with a lawful inspection.
- Not interfere with or obstruct the process.
- Provide records that are properly requested.
- Allow employee interviews as applicable.

**Plan ahead:** decide who represents the company, how requests are routed, and when to involve counsel — before an inspection happens. Laws and procedures vary; review and customize based on applicable federal, state, local, and legal requirements.`,
  },

  "inspection-opening-conference-notes-form": {
    body: `Record the key facts at the opening conference.

| Field | Entry |
|---|---|
| Date / time: | [____] |
| Compliance officer name / ID: | [____] |
| Agency: | [____] |
| Reason for inspection (complaint, programmed, incident, referral): | [____] |
| Scope (full site, specific area/hazard): | [____] |
| Company representative present: | [NAME] |
| Documents requested at opening: | [____] |
| Areas to be inspected: | [____] |
| Notes: | [____] |

**Recorded by:** [NAME]   **Signature:** _________________`,
  },

  "inspector-request-log": log(
    "Log each request the compliance officer makes during the visit.",
    ["Time", "Request", "Made By", "Company Response", "Provided By"]
  ),

  "document-request-tracking-log": log(
    "Track every document requested and provided during an inspection.",
    ["Date/Time", "Document Requested", "Provided? (Y/N)", "Copy Retained?", "Provided By"]
  ),

  "employee-interview-tracking-log": log(
    "Log employee interviews requested or conducted (record-keeping only).",
    ["Date", "Employee/Role", "Interview Type", "Notes", "Logged By"]
  ),

  "walkaround-inspection-notes-form": {
    body: `Use during the walkaround to record the same observations and photos the inspector takes.

| Time | Location / Area | Observation | Photo # | Immediate Action Taken |
|---|---|---|---|---|
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |

**Company representative:** [NAME]   **Date:** [DATE]   **Photos stored:** [LOCATION]`,
  },

  "corrective-action-log": log(
    "Track corrective actions identified from inspections, audits, incidents, or observations.",
    ["Date", "Finding / Hazard", "Corrective Action", "Assigned To", "Due Date", "Completed"]
  ),

  "citation-response-planning-worksheet": {
    body: `If a citation is received, use this worksheet to organize your response. **Consult legal counsel before responding to any citation; do not treat this as legal advice.**

| Field | Entry |
|---|---|
| Citation #/item: | [____] |
| Standard cited / description: | [____] |
| Classification (as stated): | [____] |
| Proposed penalty (as stated): | [____] |
| Abatement date (as stated): | [____] |
| Our assessment (accurate? feasible?): | [____] |
| Options to consider (with counsel): informal conference, abatement, contest, etc. | [____] |
| Corrective/abatement steps planned: | [____] |
| Responsible person: | [NAME] |
| Counsel consulted? | ☐ Yes ☐ No — date: [____] |

**Prepared by:** [NAME]   **Date:** [DATE]
Deadlines are strict and legally significant — verify all dates and engage counsel promptly.`,
  },

  "abatement-tracking-log": log(
    "Track abatement of cited or identified hazards through to verification.",
    ["Item", "Hazard", "Abatement Action", "Due Date", "Completed Date", "Verified By"]
  ),

  "safety-records-index": {
    body: `Index of safety records maintained by [COMPANY NAME]. Use to locate records quickly.

| # | Record / Document | Location (tab/file) | Owner | Last Reviewed |
|---|---|---|---|---|
| 1 | Written safety programs | [Tab] | [NAME] | [DATE] |
| 2 | Inspection records | [Tab] | [NAME] | [DATE] |
| 3 | JHAs / pre-task plans | [Tab] | [NAME] | [DATE] |
| 4 | Incident & near-miss records | [Tab] | [NAME] | [DATE] |
| 5 | SDS / chemical inventory | [Tab] | [NAME] | [DATE] |
| 6 | Equipment inspection records | [Tab] | [NAME] | [DATE] |
| 7 | [Add records] |  |  |  |`,
  },

  "training-records-index": {
    body: `Index of training records maintained by [COMPANY NAME].

| # | Training Record | Location (tab/file) | Owner | Last Reviewed |
|---|---|---|---|---|
| 1 | Master training matrix | [Tab] | [NAME] | [DATE] |
| 2 | Employee training logs | [Tab] | [NAME] | [DATE] |
| 3 | New-hire orientation records | [Tab] | [NAME] | [DATE] |
| 4 | Toolbox talk sign-in sheets | [Tab] | [NAME] | [DATE] |
| 5 | Competent/qualified person designations | [Tab] | [NAME] | [DATE] |
| 6 | Certificates | [Tab] | [NAME] | [DATE] |
| 7 | [Add records] |  |  |  |`,
  },

  "safety-meeting-records-index": {
    body: `Index of safety meeting records maintained by [COMPANY NAME].

| # | Meeting Record | Date Range | Location (tab/file) | Owner |
|---|---|---|---|---|
| 1 | Toolbox talks | [____] | [Tab] | [NAME] |
| 2 | Crew safety meetings | [____] | [Tab] | [NAME] |
| 3 | Pre-construction meetings | [____] | [Tab] | [NAME] |
| 4 | Safety committee minutes | [____] | [Tab] | [NAME] |
| 5 | [Add records] |  |  |  |`,
  },
};
