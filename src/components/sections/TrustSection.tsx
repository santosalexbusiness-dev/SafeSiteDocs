import { BadgeCheck, ShieldQuestion } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { trust } from "@/data/content";

export function TrustSection() {
  return (
    <Section tone="muted" id="trust">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div>
            <p className="eyebrow mb-3">Built by a safety professional</p>
            <h2 className="text-3xl font-display font-extrabold leading-tight text-navy-950 sm:text-4xl">
              {trust.heading}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-steel-600">{trust.body}</p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {trust.points.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-sm font-medium text-navy-800">
                  <BadgeCheck className="h-5 w-5 flex-shrink-0 text-safety-700" />
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex items-start gap-2 rounded-xl border border-navy-100 bg-white p-4 text-sm text-steel-600">
              <ShieldQuestion className="mt-0.5 h-5 w-5 flex-shrink-0 text-steel-400" />
              <p>
                We don&apos;t claim to be &ldquo;OSHA approved,&rdquo; &ldquo;guaranteed
                compliant,&rdquo; or &ldquo;certified by OSHA.&rdquo; These are practical templates
                and educational resources — you stay in control of your safety program.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative">
            <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { stat: "15+", label: "Document categories" },
                  { stat: "300+", label: "Templates & forms" },
                  { stat: "52", label: "Toolbox talks (Premium)" },
                  { stat: "10", label: "Industries served" },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-navy-50 p-5 text-center">
                    <p className="font-display text-3xl font-extrabold text-navy-950">{item.stat}</p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-steel-500">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl bg-navy-900 p-5 text-white">
                <p className="text-sm font-semibold text-safety">Plain-language by design</p>
                <p className="mt-1 text-sm text-navy-100/80">
                  Written to be usable on a real jobsite — not buried in jargon or legalese.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
