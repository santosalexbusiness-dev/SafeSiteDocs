import { Check, LibraryBig, FolderCog } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { comparison } from "@/data/content";

export function OffersComparison() {
  const offers = [
    { ...comparison.diy, icon: LibraryBig, accent: false },
    { ...comparison.dfy, icon: FolderCog, accent: true },
  ];

  return (
    <Section tone="muted" id="offers">
      <SectionHeader
        eyebrow="Two ways to get organized"
        title="Do it yourself, or have it done for you"
        intro="Pick the path that fits how you work. Subscribe to the library and manage it yourself, or let us build a custom binder around your company."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {offers.map((offer, i) => {
          const OfferIcon = offer.icon;
          return (
            <Reveal key={offer.name} delay={i * 0.1}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border p-7 ${
                  offer.accent
                    ? "border-safety/60 bg-navy-950 text-white shadow-card-hover"
                    : "border-navy-100 bg-white shadow-card"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                      offer.accent ? "bg-safety text-navy-950" : "bg-navy-900 text-safety"
                    }`}
                  >
                    <OfferIcon className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <Badge variant={offer.accent ? "safety" : "muted"}>{offer.tag}</Badge>
                </div>

                <h3
                  className={`mt-5 text-xl font-bold ${offer.accent ? "text-white" : "text-navy-950"}`}
                >
                  {offer.name}
                </h3>
                <p className={`mt-1.5 text-sm ${offer.accent ? "text-navy-100/70" : "text-steel-600"}`}>
                  {offer.summary}
                </p>

                <ul className="mt-6 flex-1 space-y-3">
                  {offer.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm">
                      <span
                        className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                          offer.accent ? "bg-safety text-navy-950" : "bg-navy-900 text-safety"
                        }`}
                      >
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className={offer.accent ? "text-navy-100/90" : "text-steel-700"}>{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
                  <Button
                    href={offer.cta.href}
                    variant={offer.accent ? "primary" : "secondary"}
                    size="lg"
                    className="w-full"
                  >
                    {offer.cta.label}
                  </Button>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
