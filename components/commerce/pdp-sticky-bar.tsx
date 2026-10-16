"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import { formatPrice, normalizePriceLabel } from "@/lib/design-system";
import { cn } from "@/lib/utils";

type PDPStickyBarProps = {
  sizeLabel?: string;
  price?: number;
  regularPrice?: number;
  currencyCode?: string;
  priceLabel?: string;
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
  regularPrice,
  currencyCode = "TWD",
  priceLabel,
  inStock,
  ready,
  onAdd,
  className,
  demo = false,
}: PDPStickyBarProps) {
  const { isZh } = useLanguage();

  const resolvedPrice =
    typeof price === "number"
      ? formatPrice(price, currencyCode)
      : normalizePriceLabel(priceLabel || "", currencyCode);

  const resolvedRegular =
    typeof regularPrice === "number" && typeof price === "number" && regularPrice > price
      ? formatPrice(regularPrice, currencyCode)
      : undefined;

  const savings =
    typeof regularPrice === "number" && typeof price === "number" && regularPrice > price
      ? regularPrice - price
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
          {savings && (
            <Badge variant="sale" className="px-2 py-0.5 text-[11px]">
              {isZh ? `現省 ${formatPrice(savings, currencyCode)}` : `Save ${formatPrice(savings, currencyCode)}`}
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
