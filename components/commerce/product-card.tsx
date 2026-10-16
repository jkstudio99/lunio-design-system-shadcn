"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/components/language-provider";
import { formatPrice, normalizePriceLabel } from "@/lib/design-system";
import { cn } from "@/lib/utils";

/**
 * Display-only contract. Data comes from WooCommerce, never from brand tokens.
 * Standardizes price display to "NT" format (e.g. NT21,990) from `currencyCode`.
 */
export type CommerceProductSummary = {
  name: string;
  imageUrl?: string;
  imageAlt?: string;
  description?: string;
  price?: number;
  regularPrice?: number;
  priceAmount?: number;
  compareAtAmount?: number;
  currencyCode?: string;
  priceSuffix?: string;
  priceLabel?: string;
  regularPriceLabel?: string;
  badge?: string;
  discountBadge?: string;
  soldOut?: boolean;
};

export function ProductCard({
  product,
  children,
  className,
}: {
  product: CommerceProductSummary;
  children?: React.ReactNode;
  className?: string;
}) {
  const { isZh } = useLanguage();
  const currency = product.currencyCode || "TWD";
  const effectivePrice = product.price ?? product.priceAmount;
  const effectiveRegular = product.regularPrice ?? product.compareAtAmount;

  const resolvedPriceLabel =
    typeof effectivePrice === "number"
      ? `${formatPrice(effectivePrice, currency)}${product.priceSuffix ? ` ${product.priceSuffix}` : ""}`
      : normalizePriceLabel(product.priceLabel || "", currency);

  const resolvedRegularLabel =
    typeof effectiveRegular === "number"
      ? formatPrice(effectiveRegular, currency)
      : product.regularPriceLabel
      ? normalizePriceLabel(product.regularPriceLabel, currency)
      : undefined;

  const savingsAmount =
    typeof effectivePrice === "number" &&
    typeof effectiveRegular === "number" &&
    effectiveRegular > effectivePrice
      ? effectiveRegular - effectivePrice
      : undefined;

  const resolvedDiscountBadge =
    product.discountBadge ||
    (savingsAmount
      ? isZh
        ? `現省 ${formatPrice(savingsAmount, currency)}`
        : `Save ${formatPrice(savingsAmount, currency)}`
      : undefined);

  return (
    <Card data-slot="product-card" className={cn("gap-0 overflow-hidden py-0", className)}>
      <div className="relative flex aspect-[4/3] items-center justify-center bg-muted/60 dark:bg-[#151D2C] border-b border-border/50">
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt={product.imageAlt || product.name}
            src={product.imageUrl}
            loading="lazy"
            className="size-full object-cover"
          />
        ) : (
          <div
            aria-label="Product image placeholder"
            role="img"
            className="text-center typo-body-sm text-muted-foreground"
          >
            {isZh ? "產品圖片" : "Product image"}
          </div>
        )}
        {product.badge && <Badge className="absolute left-4 top-4">{product.badge}</Badge>}
        {resolvedDiscountBadge && (
          <Badge variant="sale" className="absolute right-4 top-4">
            {resolvedDiscountBadge}
          </Badge>
        )}
      </div>
      <CardContent className="space-y-2 p-5">
        <h3 className="typo-h4 break-words">{product.name}</h3>
        {product.description && (
          <p className="typo-body-sm text-muted-foreground">{product.description}</p>
        )}
        <div className="flex flex-wrap items-baseline gap-2 pt-1">
          <p className="typo-price-md text-primary">{resolvedPriceLabel}</p>
          {resolvedRegularLabel && (
            <p className="typo-caption text-muted-foreground line-through">
              {isZh ? `原價 ${resolvedRegularLabel}` : resolvedRegularLabel}
            </p>
          )}
        </div>
        {product.soldOut && <Badge variant="destructive">{isZh ? "已售完" : "Sold Out"}</Badge>}
        {children}
      </CardContent>
    </Card>
  );
}

export function ProductCardSkeleton({ className }: { className?: string }) {
  const { isZh } = useLanguage();

  return (
    <Card
      className={cn("gap-0 overflow-hidden py-0", className)}
      aria-busy="true"
      aria-label={isZh ? "產品資料載入中" : "Loading product data"}
    >
      <div className="relative flex aspect-[4/3] items-center justify-center bg-muted/50 border-b border-border/50">
        <Skeleton className="size-full rounded-none" />
      </div>
      <CardContent className="space-y-3 p-5">
        <Skeleton className="h-6 w-3/4 rounded-md" />
        <Skeleton className="h-4 w-1/2 rounded-md" />
        <div className="flex items-center justify-between pt-1">
          <Skeleton className="h-5 w-24 rounded-md" />
          <Skeleton className="h-9 w-20 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}
