import type { Metadata } from "next";
import { Mail, Phone, Clock, MessagesSquare } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/forms/ContactForm";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact — Talk to SafeSite Documents",
  description:
    "Questions about the safety document library or a custom safety binder? Contact SafeSite Documents and we'll reply within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's get your safety paperwork sorted"
        intro="Tell us what you're working on. Whether you want the library or a custom binder, we'll point you in the right direction."
        crumbs={[{ label: "Contact" }]}
      />

      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          {/* Info */}
          <div>
            <h2 className="text-2xl font-display font-extrabold text-navy-950">Reach us directly</h2>
            <p className="mt-2 text-steel-600">
              Prefer email or phone? Use whatever's easiest — a real person reads every message.
            </p>

            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-navy-900 text-safety">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy-900">Email</p>
                  <a href={`mailto:${site.email}`} className="text-steel-600 hover:text-navy-900">
                    {site.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-navy-900 text-safety">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy-900">Phone</p>
                  <a href={site.phoneHref} className="text-steel-600 hover:text-navy-900">
                    {site.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-navy-900 text-safety">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy-900">Hours</p>
                  <p className="text-steel-600">Mon–Fri, 8am–5pm CT</p>
                </div>
              </li>
            </ul>

            <div className="mt-8 flex items-start gap-3 rounded-xl border border-navy-100 bg-navy-50 p-5">
              <MessagesSquare className="mt-0.5 h-5 w-5 flex-shrink-0 text-safety-700" />
              <p className="text-sm text-steel-600">
                Ready to start a custom binder? Skip the back-and-forth and{" "}
                <a href="/intake" className="link-underline">
                  fill out the intake form
                </a>
                .
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
