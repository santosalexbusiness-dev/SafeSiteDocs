import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { categories } from "@/data/categories";

export function CategoriesSection({ limit }: { limit?: number }) {
  const items = limit ? categories.slice(0, limit) : categories;

  return (
    <Section tone="light" id="categories">
      <SectionHeader
        eyebrow="What's inside the library"
        title="Every safety document, organized by category"
        intro="From toolbox talks to full written programs — find the right form fast and download it in editable Word and clean PDF."
      />

      <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <Reveal key={c.slug} as="div">
            <CategoryCard category={c} />
          </Reveal>
        ))}
      </RevealGroup>

      {limit ? (
        <div className="mt-10 text-center">
          <Button href="/categories" variant="outline" size="lg">
            View all {categories.length} categories
          </Button>
        </div>
      ) : null}
    </Section>
  );
}
