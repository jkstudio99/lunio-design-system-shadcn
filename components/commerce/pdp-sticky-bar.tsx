"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";

type PDPStickyBarProps = {
  sizeLabel?: string;
  priceLabel: string;
  inStock: boolean;
  ready: boolean;
  onAdd?: () => void;
  className?: string;
  demo?: boolean;
};

/** Demo mode intentionally doesn't execute a purchase; production must validate WooCommerce cart state. */
export function PDPStickyBar({
  sizeLabel,
  priceLabel,
  inStock,
  ready,
  onAdd,
  className,
  demo = false,
}: PDPStickyBarProps) {
  const { isZh } = useLanguage();

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
        <p className="typo-price-md mt-1 text-primary">{priceLabel}</p>
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
