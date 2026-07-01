import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { IndustryCard } from "@/components/cards/IndustryCard";
import { industries } from "@/data/industries";

export function IndustriesSection() {
  return (
    <Section tone="navy" id="industries">
      <SectionHeader
        tone="dark"
        eyebrow="Industries served"
        title="Made for the trades that build things"
        intro="The hazards differ by trade — so do the forms. We cover the documents that matter for your line of work."
      />

      <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {industries.map((ind) => (
          <Reveal key={ind.slug} as="div">
            <IndustryCard industry={ind} />
          </Reveal>
        ))}
      </RevealGroup>
    </Section>
  );
}
