import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { pageMetadata } from "@/lib/seo";
import { site, TERMS_ACKNOWLEDGEMENT, MASTER_DISCLAIMER } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description:
    "Terms of Use for SafeSite Documents — license, subscriptions, custom binder services, acknowledgements, and limitations of liability.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalShell
      title="Terms of Use"
      intro="These terms govern your access to and use of SafeSite Documents, including the document library and custom safety binder services."
      lastUpdated="June 29, 2026"
    >
      <h2>1. Acceptance of terms</h2>
      <p>
        By accessing or using {site.name} (the &ldquo;Service&rdquo;), you agree to be bound by these
        Terms of Use and our <a href="/privacy">Privacy Policy</a> and{" "}
        <a href="/disclaimer">Disclaimer</a>. If you do not agree, do not use the Service.
      </p>

      <h2>2. The Materials are templates and educational resources</h2>
      <p>
        Before purchasing a subscription, before checkout, and before submitting the custom binder
        intake form, you must affirm the following acknowledgement:
      </p>
      <p>
        <strong>&ldquo;{TERMS_ACKNOWLEDGEMENT}&rdquo;</strong>
      </p>
      <p>{MASTER_DISCLAIMER}</p>

      <h2>3. Accounts</h2>
      <p>
        You are responsible for maintaining the confidentiality of your account credentials and for
        all activity under your account. You agree to provide accurate information and to keep it
        current. Notify us immediately of any unauthorized use.
      </p>

      <h2>4. Subscriptions &amp; billing</h2>
      <ul>
        <li>
          The Safety Document Library is offered as a recurring monthly subscription. By subscribing,
          you authorize us (through our payment processor) to charge your payment method on a
          recurring basis until you cancel.
        </li>
        <li>
          You may cancel at any time from your billing settings. Cancellation stops future renewals;
          you retain access through the end of the current billing period.
        </li>
        <li>
          Fees are stated before purchase and may change with notice. Taxes may apply. Except where
          required by law, payments are non-refundable.
        </li>
      </ul>

      <h2>5. Custom safety binder services</h2>
      <ul>
        <li>
          Custom safety binder packages are one-time services based on the information you submit in
          the intake form. The accuracy and completeness of your intake information directly affects
          the deliverables.
        </li>
        <li>
          Deliverables are provided in editable (e.g., Microsoft Word) and PDF formats. You are
          responsible for reviewing, adapting, and finalizing all deliverables for your worksite.
        </li>
        <li>
          Timelines are estimates and depend on package scope and your responsiveness.
        </li>
      </ul>

      <h2>6. License &amp; acceptable use</h2>
      <p>
        Subject to these terms, we grant you a limited, non-exclusive, non-transferable license to
        download and use the Materials for your own company&apos;s internal safety program. You may
        edit and brand the Materials for that purpose. You may not:
      </p>
      <ul>
        <li>Resell, redistribute, sublicense, or publicly share the Materials as templates;</li>
        <li>Represent the Materials as your own product for sale;</li>
        <li>Use the Service in violation of any applicable law.</li>
      </ul>

      <h2>7. Intellectual property</h2>
      <p>
        The Service and the Materials (excluding your company-specific content) are owned by{" "}
        {site.name} and protected by intellectual property laws. All rights not expressly granted
        are reserved.
      </p>

      <h2>8. Disclaimers</h2>
      <p>
        THE SERVICE AND MATERIALS ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo;
        WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A
        PARTICULAR PURPOSE, AND NON-INFRINGEMENT. We do not warrant that the Materials will meet
        your requirements or result in regulatory compliance. See our{" "}
        <a href="/disclaimer">Disclaimer</a> for details.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, {site.name.toUpperCase()} AND ITS OWNERS WILL NOT BE
        LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR FOR LOST
        PROFITS, FINES, PENALTIES, OR LOSSES ARISING FROM YOUR USE OF THE SERVICE OR MATERIALS. OUR
        TOTAL LIABILITY FOR ANY CLAIM WILL NOT EXCEED THE AMOUNT YOU PAID US IN THE TWELVE MONTHS
        PRECEDING THE CLAIM.
      </p>

      <h2>10. Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless {site.name} and its owners from any claims, damages,
        or expenses arising from your use of the Materials, your safety program, your worksite
        conditions, or your violation of these terms.
      </p>

      <h2>11. Changes to the Service or terms</h2>
      <p>
        We may modify the Service or these terms at any time. Material changes will be posted here
        with an updated date. Continued use after changes constitutes acceptance.
      </p>

      <h2>12. Governing law &amp; dispute resolution</h2>
      <p>
        These terms are governed by the laws of the state in which {site.name} is organized, without
        regard to conflict-of-law principles. Before filing any claim, you agree to first contact us
        so we can try to resolve the matter informally. Any dispute that cannot be resolved that way
        will be brought exclusively in the state or federal courts located in that state, and you
        consent to their jurisdiction. Nothing in this section limits either party&apos;s ability to
        seek relief in small-claims court where available.
      </p>

      <h2>13. Contact</h2>
      <p>
        Questions about these terms? Contact us at <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalShell>
  );
}
