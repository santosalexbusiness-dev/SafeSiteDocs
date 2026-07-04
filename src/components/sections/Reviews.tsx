import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { StarRating } from "@/components/ui/StarRating";
import { ReviewCard } from "@/components/cards/ReviewCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { reviews } from "@/data/reviews";

/**
 * Reviews / testimonials section.
 *
 * Only GENUINE (non-placeholder) reviews are ever shown or counted — no
 * fabricated testimonials or ratings reach visitors. When there are no real
 * reviews yet, the whole section is omitted. Review/AggregateRating JSON-LD is
 * emitted only when real reviews exist. See src/data/reviews.ts.
 */
export function Reviews({ limit, tone = "muted" }: { limit?: number; tone?: "light" | "muted" }) {
  const realReviews = reviews.filter((r) => !r.placeholder);

  // No real reviews yet → render nothing rather than fake social proof.
  if (realReviews.length === 0) return null;

  const items = limit ? realReviews.slice(0, limit) : realReviews;
  const average =
    Math.round((realReviews.reduce((s, r) => s + r.rating, 0) / realReviews.length) * 10) / 10;

  return (
    <Section tone={tone} id="reviews">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "SafeSite Documents — Safety Templates",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: average,
            reviewCount: realReviews.length,
          },
        }}
      />

      <SectionHeader
        eyebrow="What contractors say"
        title="Trusted by trades who hate paperwork"
        intro="Real-world feedback from owners and foremen who got their safety documents organized with SafeSite."
      />

      <Reveal>
        <div className="mt-6 flex items-center justify-center gap-3">
          <StarRating rating={average} size="h-5 w-5" />
          <span className="text-sm font-semibold text-navy-900">
            {average.toFixed(1)} / 5
          </span>
          <span className="text-sm text-steel-500">· {realReviews.length} reviews</span>
        </div>
      </Reveal>

      <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((r) => (
          <Reveal key={r.id} as="div">
            <ReviewCard review={r} />
          </Reveal>
        ))}
      </RevealGroup>
    </Section>
  );
}
