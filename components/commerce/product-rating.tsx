import * as React from "react";
import { Star, StarHalf, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type ProductRatingProps = {
  score?: number;
  reviewCount?: number;
  featuredBadges?: string[];
  className?: string;
};

export function ProductRating({
  score = 4.9,
  reviewCount = 12850,
  featuredBadges = ["100晚試睡", "10年保固", "免運到府"],
  className,
}: ProductRatingProps) {
  const fullStars = Math.floor(score);
  return (
    <div
      data-slot="product-rating"
      className={cn(
        "flex flex-wrap items-center gap-3 py-1",
        className
      )}
      aria-label={`評分 ${score} 顆星，共 ${reviewCount.toLocaleString()} 則真實評價`}
    >
      <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
        {Array.from({ length: 5 }).map((_, i) => {
          const isFilled = i < fullStars;
          const isHalf = !isFilled && score > i && score < i + 1;
          if (isHalf) {
            return (
              <StarHalf
                key={i}
                className="size-4 fill-current text-current"
                aria-hidden="true"
              />
            );
          }
          return (
            <Star
              key={i}
              className={cn(
                "size-4",
                isFilled
                  ? "fill-current text-current"
                  : "text-muted-foreground/30"
              )}
              aria-hidden="true"
            />
          );
        })}
      </div>
      <div className="flex items-center gap-1.5 typo-body-sm">
        <span className="font-bold text-foreground">{score.toFixed(1)}</span>
        <span className="text-muted-foreground">
          ({reviewCount.toLocaleString()} 則評價)
        </span>
      </div>
      {featuredBadges && featuredBadges.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          {featuredBadges.map((badge) => (
            <Badge
              key={badge}
              variant="outline"
              className="text-[11px] font-medium text-muted-foreground"
            >
              <Award className="mr-1 size-3 text-primary" />
              {badge}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
