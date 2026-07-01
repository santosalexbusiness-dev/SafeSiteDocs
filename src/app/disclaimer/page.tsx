import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { DisclaimerBlock } from "@/components/ui/DisclaimerBlock";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Disclaimer",
  description:
    "Important disclaimer for SafeSite Documents. Templates and educational resources only — not legal advice and not a guarantee of OSHA compliance.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <LegalShell
      title="Disclaimer"
      intro="Please read this disclaimer carefully. It explains the nature and limits of the materials we provide."
      lastUpdated="June 29, 2026"
    >
      <DisclaimerBlock className="mb-8" />

      <h2>General educational purpose</h2>
      <p>
        The materials provided by {site.name} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
        &ldquo;our&rdquo;), including safety manuals, toolbox talks, forms, checklists, logs,
        templates, and custom safety binders (collectively, the &ldquo;Materials&rdquo;), are
        general safety-document templates and educational resources. They are intended to help you
        organize safety paperwork — not to serve as legal, regulatory, or professional safety
        advice for your specific situation.
      </p>

      <h2>No guarantee of compliance</h2>
      <p>
        We do not guarantee that use of the Materials will result in compliance with the
        Occupational Safety and Health Administration (OSHA) standards or any other federal, state,
        local, or industry requirement. The Materials do not guarantee prevention of citations,
        penalties, fines, injuries, illnesses, property damage, or other losses.
      </p>
      <ul>
        <li>We are not OSHA and are not affiliated with, approved by, or endorsed by OSHA.</li>
        <li>
          We do not claim our Materials are &ldquo;OSHA approved,&rdquo; &ldquo;guaranteed
          compliant,&rdquo; or &ldquo;certified&rdquo; by any regulatory body.
        </li>
        <li>
          Penalty figures referenced anywhere on this site are marketing/educational examples based
          on current published Federal OSHA maximums and may not reflect your situation. Actual
          penalties vary by jurisdiction, employer size, history, gravity, and OSHA policy.
        </li>
      </ul>

      <h2>Your responsibilities</h2>
      <p>As the employer or responsible party, you remain solely responsible for:</p>
      <ul>
        <li>Evaluating your own worksites and conducting site-specific hazard assessments;</li>
        <li>Complying with all applicable federal, state, and local requirements;</li>
        <li>Training your employees and verifying competency;</li>
        <li>Maintaining accurate records;</li>
        <li>
          Reviewing, editing, and adapting any Material before use, and consulting qualified safety,
          legal, or regulatory professionals when needed.
        </li>
      </ul>

      <h2>No professional relationship</h2>
      <p>
        Use of the Materials or this website does not create a consultant-client,
        attorney-client, or compliance-guarantee relationship between you and {site.name}.
      </p>

      <h2>Questions</h2>
      <p>
        If you have questions about this disclaimer, contact us at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalShell>
  );
}
