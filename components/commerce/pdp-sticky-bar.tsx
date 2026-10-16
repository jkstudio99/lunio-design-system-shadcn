"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import { formatPrice, normalizePriceLabel } from "@/lib/design-system";
import { cn } from "@/lib/utils";

export type PDPStickyBarProps = {
  sizeLabel?: string;
  price?: number;
  priceAmount?: number;
  regularPrice?: number;
  compareAtAmount?: number;
  currencyCode?: string;
  priceLabel?: string;
  discountBadge?: string;
  inStock: boolean;
  ready: boolean;
  onAdd?: () => void;
  className?: string;
  demo?: boolean;
};

/** Demo mode intentionally doesn't execute a purchase; production must validate WooCommerce cart state. */
export function PDPStickyBar({
  sizeLabel,
  price,
  priceAmount,
  regularPrice,
  compareAtAmount,
  currencyCode = "TWD",
  priceLabel,
  discountBadge,
  inStock,
  ready,
  onAdd,
  className,
  demo = false,
}: PDPStickyBarProps) {
  const { isZh } = useLanguage();

  const effectivePrice = price ?? priceAmount;
  const effectiveRegular = regularPrice ?? compareAtAmount;

  const resolvedPrice =
    typeof effectivePrice === "number"
      ? formatPrice(effectivePrice, currencyCode)
      : normalizePriceLabel(priceLabel || "", currencyCode);

  const resolvedRegular =
    typeof effectiveRegular === "number" && typeof effectivePrice === "number" && effectiveRegular > effectivePrice
      ? formatPrice(effectiveRegular, currencyCode)
      : undefined;

  const savings =
    typeof effectiveRegular === "number" && typeof effectivePrice === "number" && effectiveRegular > effectivePrice
      ? effectiveRegular - effectivePrice
      : undefined;

  const selectedText = isZh ? "已選擇：" : "Selected: ";
  const fallbackLabel = isZh ? "請選擇商品規格" : "Select options";
  const actionLabel = !inStock
    ? isZh
      ? "已售完"
      : "Sold Out"
    : !ready
    ? isZh
      ? "請選擇商品規格"
      : "Select options"
    : isZh
    ? "加入購物車"
    : "Add to Cart";

  return (
    <div
      data-slot="pdp-sticky-bar"
      className={cn(
        "flex flex-wrap items-center justify-between gap-4 border border-border bg-background p-4 shadow-lg rounded-xl",
        className
      )}
    >
      <div>
        <p className="typo-caption text-muted-foreground">
          {selectedText}
          <span className="font-semibold text-foreground">{sizeLabel || fallbackLabel}</span>
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <p className="typo-price-md text-primary">{resolvedPrice}</p>
          {resolvedRegular && (
            <span className="typo-caption text-muted-foreground line-through">
              {resolvedRegular}
            </span>
          )}
          {(discountBadge || savings) && (
            <Badge variant="sale" className="px-2 py-0.5 text-[11px]">
              {discountBadge || (isZh ? `現省 ${formatPrice(savings!, currencyCode)}` : `Save ${formatPrice(savings!, currencyCode)}`)}
            </Badge>
          )}
        </div>
      </div>
      <Button
        type="button"
        disabled={!ready || !inStock || demo || !onAdd}
        onClick={onAdd}
      >
        {actionLabel}
      </Button>
    </div>
  );
}
