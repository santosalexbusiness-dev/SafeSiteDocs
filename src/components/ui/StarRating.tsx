import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/** Renders a 0–5 star rating. Rounds to the nearest whole star. */
export function StarRating({
  rating,
  className,
  size = "h-4 w-4",
}: {
  rating: number;
  className?: string;
  size?: string;
}) {
  const rounded = Math.round(rating);
  return (
    <span
      className={cn("inline-flex items-center gap-0.5", className)}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(size, i < rounded ? "fill-safety text-safety" : "fill-transparent text-steel-300")}
          strokeWidth={1.5}
        />
      ))}
    </span>
  );
}
