import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, FileSearch, FolderCog, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Intake Received — Custom Safety Binder",
  description: "Your custom safety binder request has been received.",
  path: "/intake/confirmation",
  noindex: true,
});

const next = [
  { icon: FileSearch, title: "We review your intake", body: "We read through your work type, hazards, and crew details." },
  { icon: FolderCog, title: "We organize your documents", body: "We map the forms, logs, and programs your business needs." },
  { icon: Mail, title: "We follow up by email", body: "We confirm scope, timeline, and any questions before we build." },
];

export default function IntakeConfirmationPage() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 text-white sm:py-28">
      <div className="absolute inset-0 bg-blueprint opacity-50" aria-hidden />
      <div
        className="absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-safety/10 blur-[100px]"
        aria-hidden
      />
      <div className="container relative max-w-2xl text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-safety/15 ring-1 ring-safety/40">
          <CheckCircle2 className="h-9 w-9 text-safety" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-extrabold sm:text-4xl">
          Your custom safety binder request has been received
        </h1>
        <p className="mt-4 text-lg text-navy-100/80">
          We&apos;ll review your intake information and begin organizing the documents needed for
          your package. Keep an eye on your inbox — a confirmation is on its way.
        </p>

        <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
          {next.map((n, i) => {
            const NextIcon = n.icon;
            return (
              <div key={n.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-safety text-navy-950">
                  <NextIcon className="h-5 w-5" />
                </span>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-safety">
                  Step {i + 1}
                </p>
                <h2 className="mt-1 text-sm font-bold text-white">{n.title}</h2>
                <p className="mt-1 text-sm text-navy-100/70">{n.body}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/library" variant="primary" size="lg">
            Browse the library while you wait
          </Button>
          <Button href="/" variant="ghost-light" size="lg">
            Back to home
          </Button>
        </div>

        <p className="mt-8 text-sm text-navy-100/50">
          Questions in the meantime?{" "}
          <Link href={`mailto:${site.salesEmail}`} className="text-safety hover:underline">
            {site.salesEmail}
          </Link>
        </p>
      </div>
    </section>
  );
}
