import { Quote } from "lucide-react";
import { StarRating } from "@/components/ui/StarRating";
import type { Review } from "@/data/reviews";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="card flex h-full flex-col p-6">
      <div className="flex items-center justify-between">
        <StarRating rating={review.rating} />
        <Quote className="h-5 w-5 text-navy-100" aria-hidden />
      </div>
      <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-steel-700">
        “{review.quote}”
      </blockquote>
      <figcaption className="mt-4 border-t border-navy-100 pt-3">
        <span className="block text-sm font-bold text-navy-950">{review.name}</span>
        <span className="block text-xs text-steel-500">
          {review.trade} · {review.location}
        </span>
      </figcaption>
    </figure>
  );
}
