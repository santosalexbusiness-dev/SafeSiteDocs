import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How SafeSite Documents collects, uses, and protects your information, including intake form data and payment processing.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      intro="This policy explains what information we collect, how we use it, and the choices you have."
      lastUpdated="June 29, 2026"
    >
      <h2>1. Information we collect</h2>
      <ul>
        <li>
          <strong>Account information</strong> — name, company, email, and password (stored hashed)
          when you create an account.
        </li>
        <li>
          <strong>Intake form information</strong> — company details, trade, work type, hazards,
          equipment, crew size, states of operation, and any documents you upload, used to scope and
          build your custom binder.
        </li>
        <li>
          <strong>Payment information</strong> — processed by our third-party payment processor
          (e.g., Stripe). We do not store full card numbers on our servers.
        </li>
        <li>
          <strong>Usage information</strong> — basic analytics such as pages visited and documents
          downloaded, to improve the Service.
        </li>
      </ul>

      <h2>2. How we use information</h2>
      <ul>
        <li>To provide, maintain, and improve the Service and Materials;</li>
        <li>To build and deliver custom safety binders based on your intake;</li>
        <li>To process payments and manage subscriptions;</li>
        <li>To send transactional emails (order confirmations, intake receipts, document delivery);</li>
        <li>To respond to support requests and communicate about your account.</li>
      </ul>

      <h2>3. How we share information</h2>
      <p>
        We do not sell your personal information. We share information only with service providers
        that help us operate (such as payment processing, email delivery, hosting, and file
        storage), under agreements that protect your data, or when required by law.
      </p>

      <h2>4. Cookies &amp; analytics</h2>
      <p>
        We use essential cookies to keep you signed in and may use privacy-friendly analytics to
        understand site usage. You can control cookies through your browser settings.
      </p>

      <h2>5. Data retention</h2>
      <p>
        We retain account and order information for as long as your account is active or as needed to
        provide the Service, comply with legal obligations, resolve disputes, and enforce agreements.
        You may request deletion as described below.
      </p>

      <h2>6. Security</h2>
      <p>
        We use reasonable administrative, technical, and physical safeguards to protect your
        information. No method of transmission or storage is 100% secure, and we cannot guarantee
        absolute security.
      </p>

      <h2>7. Your choices &amp; rights</h2>
      <ul>
        <li>Access, update, or delete your account information from your settings or by contacting us;</li>
        <li>Unsubscribe from non-essential emails using the link in those emails;</li>
        <li>
          Depending on where you live, you may have additional rights — such as the right to access,
          correct, delete, or receive a copy of your personal information, or to opt out of certain
          processing (for example, under California&apos;s CCPA/CPRA or the EU/UK GDPR). To exercise
          any of these rights, contact us at <a href={`mailto:${site.email}`}>{site.email}</a> and
          we&apos;ll respond as required by applicable law. We will not discriminate against you for
          exercising your privacy rights.
        </li>
      </ul>

      <h2>8. Children&apos;s privacy</h2>
      <p>
        The Service is intended for businesses and is not directed to children under 16. We do not
        knowingly collect personal information from children.
      </p>

      <h2>9. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. Material changes will be posted here with an
        updated date.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions or requests about your privacy? Contact us at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalShell>
  );
}
