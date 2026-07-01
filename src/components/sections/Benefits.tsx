import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { benefits } from "@/data/content";

export function Benefits() {
  return (
    <Section tone="light" id="benefits">
      <SectionHeader
        eyebrow="Why contractors use it"
        title="Less paperwork chaos. More time on the job."
        intro="SafeSite Documents helps you get your safety paperwork in order so you can focus on the work — and look prepared while doing it."
      />

      <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((b) => (
          <Reveal key={b.title} as="div">
            <div className="card card-hover h-full p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-safety/15 text-safety-700">
                <Icon name={b.icon} className="h-5 w-5" strokeWidth={1.9} />
              </span>
              <h3 className="mt-4 text-base font-bold text-navy-950">{b.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-steel-600">{b.description}</p>
            </div>
          </Reveal>
        ))}
      </RevealGroup>
    </Section>
  );
}
