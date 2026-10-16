"use client";

import * as React from "react";
import { Check, Gift, Plus, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/components/language-provider";
import { formatPrice } from "@/lib/design-system";
import { cn } from "@/lib/utils";

export type AddOnProduct = {
  id: string;
  nameZh: string;
  nameEn: string;
  descZh: string;
  descEn: string;
  addOnPrice: number;
  regularPrice: number;
  currencyCode?: string;
};

const DEFAULT_ADDONS: AddOnProduct[] = [
  {
    id: "graphene-pillow",
    nameZh: "Lunio 石墨烯雙向機能記憶枕 (對枕 2 入組)",
    nameEn: "Lunio Graphene Ergonomic Memory Pillow (2-Pack)",
    descZh: "高低雙向人體工學支撐，買床墊享專屬加購 62 折優惠",
    descEn: "Dual-height cervical contour; exclusive 38% OFF bundle add-on",
    addOnPrice: 2490,
    regularPrice: 3980,
    currencyCode: "TWD",
  },
  {
    id: "tencel-sheets",
    nameZh: "Lunio Bedding 100% 奧地利天絲 60 支床包四件組",
    nameEn: "Lunio Bedding 100% Tencel 60S 4-Piece Sheet Set",
    descZh: "絲滑親膚涼感透氣，專為 25 cm 厚床墊加高包覆設計",
    descEn: "Silky cooling 60S Tencel tailored for 25 cm deep-pocket mattresses",
    addOnPrice: 2990,
    regularPrice: 4580,
    currencyCode: "TWD",
  },
  {
    id: "lunio-life-table",
    nameZh: "Lunio Life 北歐霧紫實木床頭邊几",
    nameEn: "Lunio Life Nordic Solid Wood Nightstand",
    descZh: "圓潤防撞導角與隱藏式充電線槽，完美搭配臥室風格",
    descEn: "Rounded edges with hidden cable routing in Lunio Life finish",
    addOnPrice: 3290,
    regularPrice: 4890,
    currencyCode: "TWD",
  },
];

export function CartGiftLine({
  giftTitleZh = "買床墊隨貨附贈：Lunio 100% 天絲防蟎防水保潔墊 × 1",
  giftTitleEn = "Free Bundle Gift: Lunio 100% Tencel Waterproof Mattress Protector × 1",
  retailValue = 2490,
  currencyCode = "TWD",
  className,
}: {
  giftTitleZh?: string;
  giftTitleEn?: string;
  retailValue?: number;
  currencyCode?: string;
  className?: string;
}) {
  const { isZh } = useLanguage();

  return (
    <div
      data-slot="cart-gift-line"
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-500/30 bg-[var(--status-success-surface)] p-4",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-600/15 text-[var(--status-success-ink)]">
          <Gift className="size-4" aria-hidden="true" />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="success" className="px-2 py-0 text-[10px]">
              {isZh ? "隨床滿額贈品" : "FREE GIFT INCLUDED"}
            </Badge>
            <span className="typo-body-sm font-bold text-foreground">
              {isZh ? giftTitleZh : giftTitleEn}
            </span>
          </div>
          <p className="typo-caption text-muted-foreground mt-0.5">
            {isZh
              ? "已依所選床墊尺寸 (標準雙人 5 尺) 自動配對贈品規格"
              : "Automatically matched to selected mattress size (Standard Double 5 ft)"}
          </p>
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="typo-caption text-muted-foreground line-through">
          {formatPrice(retailValue, currencyCode)}
        </span>
        <span className="typo-label font-extrabold text-[var(--status-success-ink)]">
          {isZh ? "NT0 (免費贈送)" : "NT0 (FREE)"}
        </span>
      </div>
    </div>
  );
}

/**
 * Backlog 014 — CartGiftLine & CartAddOnCard
 * Free gift line and interactive add-on upsell cards in cart/checkout.
 */
export function CartAddOnCard({
  baseMattressPrice = 21990,
  currencyCode = "TWD",
  addOns = DEFAULT_ADDONS,
  className,
}: {
  baseMattressPrice?: number;
  currencyCode?: string;
  addOns?: AddOnProduct[];
  className?: string;
}) {
  const { isZh } = useLanguage();
  const [selectedIds, setSelectedIds] = React.useState<string[]>(["graphene-pillow"]);

  const toggleAddOn = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addOnTotal = addOns
    .filter((item) => selectedIds.includes(item.id))
    .reduce((sum, item) => sum + item.addOnPrice, 0);

  const addOnSavings = addOns
    .filter((item) => selectedIds.includes(item.id))
    .reduce((sum, item) => sum + (item.regularPrice - item.addOnPrice), 0);

  const finalOrderTotal = baseMattressPrice + addOnTotal;

  return (
    <div
      data-slot="cart-addon-card"
      className={cn(
        "rounded-2xl border border-border/80 bg-card p-6 shadow-2xs space-y-5",
        className
      )}
    >
      <CartGiftLine currencyCode={currencyCode} />

      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" aria-hidden="true" />
            <h3 className="typo-h4 text-foreground">
              {isZh ? "買床墊專屬加價購優惠 (Add-On Deals)" : "Exclusive Mattress Bundle Add-Ons"}
            </h3>
          </div>
          <Badge variant="sale">
            {isZh ? "加購最高現省 38%" : "Save up to 38%"}
          </Badge>
        </div>

        <div className="grid gap-3">
          {addOns.map((item) => {
            const isAdded = selectedIds.includes(item.id);
            const itemCurrency = item.currencyCode || currencyCode;
            const savings = item.regularPrice - item.addOnPrice;

            return (
              <div
                key={item.id}
                className={cn(
                  "flex flex-wrap items-center justify-between gap-4 rounded-xl border p-4 transition-all",
                  isAdded
                    ? "border-primary bg-primary/[0.04] dark:bg-primary/[0.1] ring-1 ring-primary"
                    : "border-border/80 bg-background"
                )}
              >
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="typo-label font-bold text-foreground">
                      {isZh ? item.nameZh : item.nameEn}
                    </span>
                    <Badge variant="sale" className="px-2 py-0 text-[10px]">
                      {isZh
                        ? `現省 ${formatPrice(savings, itemCurrency)}`
                        : `Save ${formatPrice(savings, itemCurrency)}`}
                    </Badge>
                  </div>
                  <p className="typo-body-sm text-muted-foreground">
                    {isZh ? item.descZh : item.descEn}
                  </p>
                  <div className="flex items-baseline gap-2 pt-0.5">
                    <span className="typo-price-md text-primary">
                      +{formatPrice(item.addOnPrice, itemCurrency)}
                    </span>
                    <span className="typo-caption text-muted-foreground line-through">
                      {isZh
                        ? `原價 ${formatPrice(item.regularPrice, itemCurrency)}`
                        : formatPrice(item.regularPrice, itemCurrency)}
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant={isAdded ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleAddOn(item.id)}
                  aria-pressed={isAdded}
                  className="gap-1.5 min-w-[116px]"
                >
                  {isAdded ? (
                    <>
                      <Check className="size-4" aria-hidden="true" />
                      {isZh ? "已加入購物車" : "Added"}
                    </>
                  ) : (
                    <>
                      <Plus className="size-4" aria-hidden="true" />
                      {isZh ? "優惠加購" : "Add to Order"}
                    </>
                  )}
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      <Separator />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-0.5">
          <span className="typo-body-sm text-muted-foreground">
            {isZh
              ? `床墊主商品 (${formatPrice(baseMattressPrice, currencyCode)}) + 加價購 ${selectedIds.length} 件 (${formatPrice(addOnTotal, currencyCode)}) + 隨床贈品 (NT0)`
              : `Mattress (${formatPrice(baseMattressPrice, currencyCode)}) + ${selectedIds.length} Add-On(s) (${formatPrice(addOnTotal, currencyCode)}) + Free Gift (NT0)`}
          </span>
          {addOnSavings > 0 && (
            <p className="typo-caption font-semibold text-[var(--sale,#E53935)]">
              {isZh
                ? `加價購與贈品共為您額外省下 ${formatPrice(addOnSavings + 2490, currencyCode)}`
                : `Bundle add-ons & free gift save an extra ${formatPrice(addOnSavings + 2490, currencyCode)}`}
            </p>
          )}
        </div>
        <div className="text-right">
          <span className="typo-caption text-muted-foreground block">
            {isZh ? "購物車小計" : "Cart Subtotal"}
          </span>
          <span className="typo-price-xl text-primary">
            {formatPrice(finalOrderTotal, currencyCode)}
          </span>
        </div>
      </div>
    </div>
  );
}
