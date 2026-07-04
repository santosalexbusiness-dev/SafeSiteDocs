# Safety Document Library

The content foundation for **SafeSite Documents** — a structured, filterable library of editable
contractor safety templates that powers both the monthly subscription and the custom binder service.

- **352 documents** across **22 categories**
- Organized by **category, industry, hazard, and document type**
- Every document is **editable**, **fully written, and ready to use** — real inspection items,
  lesson text, policy language, JHA task analyses, and form fields (bracketed fields only where
  company-, site-, or state-specific information is required)
- All documents follow the same compliance structure (How to Use · body · Company Customization ·
  Last Reviewed · universal disclaimer)
- Authored content lives in `scripts/content/*.mjs` (one module per category) and is composed by
  the generator, so the whole library regenerates deterministically

> Regenerate the masters + catalog any time with: `node scripts/generate-library.mjs`
> (Edit `scripts/generate-library.mjs` — the single source of truth — to add/rename documents.)

---

## Folder structure

```
safety-doc-library/
├─ documents.json        # metadata catalog for the website (all 352)
├─ catalog.md            # human-readable index by category
├─ manuals/                     (15)   Core Safety Manuals
├─ osha-inspection-binder/      (15)   OSHA-Style Inspection Binder
├─ policies/                    (20)   Company Policies
├─ new-hire-orientation/        (15)   New-Hire Safety Orientation
├─ training-records/            (15)   Training Logs and Records
├─ toolbox-talks/               (52)   Weekly Toolbox Talks
├─ jha-jsa/                     (20)   Job Hazard Analysis / JHA / JSA
├─ ppe/                         (15)   PPE Documents
├─ fall-protection/             (15)   Fall Protection
├─ ladder-safety/               (10)   Ladder Safety
├─ scaffolding/                 (10)   Scaffolding
├─ electrical-safety/           (15)   Electrical Safety
├─ hazcom-sds/                  (15)   Hazard Communication / SDS
├─ respiratory-protection/      (10)   Respiratory Protection
├─ heat-cold-stress/            (10)   Heat and Cold Stress
├─ incident-reporting/          (15)   Incident and Near Miss Reporting
├─ emergency-fire/              (15)   Emergency Action and Fire Safety
├─ vehicle-equipment/           (15)   Vehicle and Equipment Safety
├─ construction-specific/       (15)   Construction-Specific Documents
├─ asbestos-lead-awareness/     (15)   Asbestos and Lead Awareness
├─ recordkeeping-admin/         (15)   Recordkeeping and Admin
└─ client-facing/               (10)   Client-Facing Documents
```

Each document is a Markdown **master** (easy to diff, edit, and version). Export to Word/PDF/Excel
for distribution — `documents.json` records the intended `fileType` and a `storagePath`
for the eventual stored file.

### Organized by industry (`/by-industry`)
The same templates are also organized **by trade, then by document type** — a ready starting set for
each industry's safety binder:

```
by-industry/
├─ index.md                  # all trades with tailored/universal/total counts
├─ electrical.md             # Electrical Contractors — grouped by type (Manual, Program, JHA, Checklist…)
├─ plumbing.md  hvac.md  roofing.md  remodeling.md  concrete.md
├─ landscaping.md  painting.md  general.md  property-maintenance.md
└─ ../by-industry.json       # machine-readable: industry → type → documents
```

How it works: **universal** documents (`industry: All`) apply to every trade and appear in each
industry view; documents **tailored** to a trade are marked **★**. Files are **linked, not
duplicated** — the canonical master lives once in its category folder. This powers an
industry → type → document navigation on the website (and gives the custom-binder service a
per-trade starting set). Counts per trade: electrical 341 · general 342 · concrete 342 ·
landscaping 342 · painting 340 · (others 341), out of 352 total.

---

## Document structure (every file)

Every document — sample or generated — contains:

1. **Title**
2. **Document Control header** — bracketed fields for company name, logo, address, responsible person,
   date, and approval signature
3. **Metadata table** — Category · Recommended Industry · Document Type · Access Level · Last
   Reviewed · Last Updated
4. **How to Use This Template**
5. **Main template body** (type-appropriate: checklist, policy, program/plan, JHA, toolbox talk, form…)
6. **Company Customization Needed**
7. **Last Reviewed / Last Updated** (+ Next Review Due)
8. **Disclaimer footer** (the universal disclaimer, verbatim)

Where state-specific customization may be needed, documents include:
*"Review and customize based on applicable federal, state, local, client, and project-specific requirements."*

### Universal disclaimer (in every document)
> This document is a general safety template and educational resource. It is not legal advice, does
> not replace a site-specific hazard assessment, and does not guarantee compliance with OSHA or any
> federal, state, or local requirement. Employers are responsible for reviewing, customizing,
> implementing, training employees on, and maintaining their own safety programs and records.
> Consult a qualified safety professional, legal counsel, or regulatory authority when needed.

**Compliance guardrails:** nothing in this library claims documents are OSHA-approved, guaranteed
compliant, or that they prevent citations, penalties, injuries, lawsuits, or losses.

---

## Access levels

| Level | Meaning | Roughly |
|---|---|---|
| **Starter** | Core, everyday forms, checklists, logs, and foundational toolbox talks | ~216 docs |
| **Pro** | Full manuals, written programs, plans, specialized & industry-specific forms, all toolbox talks | ~118 docs |
| **Custom Binder** | Binder-assembly and client-facing documents delivered with the done-for-you service | ~18 docs |

Access levels are a starting recommendation — adjust per document in `scripts/generate-library.mjs`
(the `pickAccess` rules) or directly in `documents.json`.

---

## `documents.json` (website catalog)

A single JSON file the website reads to **display, filter, and sell** documents. Top-level fields:
`generatedAt`, `universalDisclaimer`, `accessLevels`, `totalDocuments`, `categories[]`, `documents[]`.

Each entry in `documents[]`:

| Field | Example |
|---|---|
| `id` | `ladder-inspection-checklist` |
| `title` | `Ladder Inspection Checklist` |
| `category` | `ladder-safety` (folder slug) |
| `categoryName` | `Ladder Safety` |
| `industry` | `All` / `Electrical` / `Roofing` … |
| `documentType` | `Checklist`, `Manual`, `Toolbox Talk`, `JHA/JSA` … |
| `tags` | `["ladder-safety","inspection","checklist"]` |
| `description` | short selling description |
| `accessLevel` | `Starter` / `Pro` / `Custom Binder` |
| `fileType` | `DOCX` / `XLSX` (primary) |
| `formats` | `["DOCX","PDF"]` |
| `fileName` | `ladder-inspection-checklist.docx` |
| `lastReviewed` / `lastUpdated` | `2026-06-29` |
| `route` | `/library/ladder-inspection-checklist` |
| `filePath` | `safety-doc-library/ladder-safety/ladder-inspection-checklist.md` |
| `storagePath` | `{{STORAGE_BASE_URL}}/ladder-safety/ladder-inspection-checklist.docx` |
| `isSample` | `true` for the 10 showcase docs |

### Wiring it into the site
The filters on `/library` (category, industry, hazard/tag, document type) map directly to these
fields. To use this catalog instead of the demo dataset:

```ts
// src/data/libraryCatalog.ts
import catalog from "../../safety-doc-library/documents.json";
export const libraryDocuments = catalog.documents;
export const libraryCategories = catalog.categories;
```

Replace `{{STORAGE_BASE_URL}}` with your storage origin, and serve downloads through a signed-URL
route that checks the user's plan against each document's `accessLevel`.

---

## The 10 showcase samples (fully authored)

1. Electrical Contractor Safety Manual — `manuals/`
2. OSHA Inspection Binder Table of Contents — `osha-inspection-binder/`
3. PPE Hazard Assessment Form — `ppe/`
4. Ladder Inspection Checklist — `ladder-safety/`
5. Incident Report Form — `incident-reporting/`
6. Toolbox Talk: Fall Protection Basics — `toolbox-talks/`
7. LOTO Procedure Template — `electrical-safety/`
8. New-Hire Safety Orientation Packet — `new-hire-orientation/`
9. Blank JHA Template — `jha-jsa/`
10. Heat Illness Prevention Plan — `heat-cold-stress/`

See `catalog.md` for the full document index (samples are marked ★).
