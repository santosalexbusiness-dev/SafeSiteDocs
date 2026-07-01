import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { StarRating } from "@/components/ui/StarRating";
import { ReviewCard } from "@/components/cards/ReviewCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { reviews, reviewStats } from "@/data/reviews";

/**
 * Reviews / testimonials section.
 *
 * NOTE: Review/AggregateRating JSON-LD is intentionally emitted ONLY when every
 * review is real (reviewStats.allReal). The shipped reviews are placeholders, so
 * no rich-result schema is published — see src/data/reviews.ts.
 */
export function Reviews({ limit, tone = "muted" }: { limit?: number; tone?: "light" | "muted" }) {
  const items = limit ? reviews.slice(0, limit) : reviews;

  return (
    <Section tone={tone} id="reviews">
      {reviewStats.allReal ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Product",
            name: "SafeSite Documents — Safety Templates",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: reviewStats.average,
              reviewCount: reviewStats.count,
            },
          }}
        />
      ) : null}

      <SectionHeader
        eyebrow="What contractors say"
        title="Trusted by trades who hate paperwork"
        intro="Real-world feedback from owners and foremen who got their safety documents organized with SafeSite."
      />

      <Reveal>
        <div className="mt-6 flex items-center justify-center gap-3">
          <StarRating rating={reviewStats.average} size="h-5 w-5" />
          <span className="text-sm font-semibold text-navy-900">
            {reviewStats.average.toFixed(1)} / 5
          </span>
          <span className="text-sm text-steel-500">· {reviewStats.count} reviews</span>
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
