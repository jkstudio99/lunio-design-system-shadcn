"use client";

import * as React from "react";
import { Star, StarHalf } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
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
  featuredBadges,
  className,
}: ProductRatingProps) {
  const { isZh } = useLanguage();
  const fullStars = Math.floor(score);

  const defaultBadges = isZh
    ? ["100晚試睡", "10年保固", "免運到府"]
    : ["100-Night Trial", "10-Year Warranty", "Free Delivery"];
  const badges = featuredBadges || defaultBadges;

  return (
    <div
      data-slot="product-rating"
      className={cn("flex flex-wrap items-center gap-3 py-1", className)}
      aria-label={
        isZh
          ? `評分 ${score} 顆星，共 ${reviewCount.toLocaleString()} 則真實評價`
          : `Rating ${score} out of 5 stars, based on ${reviewCount.toLocaleString()} customer reviews`
      }
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
                isFilled ? "fill-current text-current" : "text-muted-foreground/30"
              )}
              aria-hidden="true"
            />
          );
        })}
      </div>
      <div className="flex items-center gap-1.5 typo-body-sm">
        <span className="font-bold text-foreground">{score.toFixed(1)}</span>
        <span className="text-muted-foreground">
          ({reviewCount.toLocaleString()} {isZh ? "則顧客評價" : "reviews"})
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {badges.map((b) => (
          <Badge key={b} variant="outline" className="text-[11px] font-normal py-0">
            {b}
          </Badge>
        ))}
      </div>
    </div>
  );
}
