"use client";

import * as React from "react";
import { CreditCard, ShieldCheck, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { formatPrice } from "@/lib/design-system";
import { cn } from "@/lib/utils";

export type PriceBlockProps = {
  salePrice?: number;
  priceAmount?: number;
  regularPrice?: number;
  compareAtAmount?: number;
  currencyCode?: string;
  installmentMonths?: 3 | 6 | 12 | number;
  sizeLabel?: string;
  size?: "sm" | "md" | "lg" | "xl" | string;
  sizeNote?: string;
  dimensionsCm?: string;
  mode?: "sale" | "regular" | "from" | "sold-out";
  compact?: boolean;
  className?: string;
};

/**
 * Backlog 005 / 024 — PriceBlock
 * Standardized PDP & card pricing block:
 * - Renders canonical "NT" format (e.g. NT21,990) from `currencyCode`
 * - Struck-through 原價 from real WooCommerce `regularPrice`
 * - 現省 badge using the semantic `--sale` (#E53935) token
 * - 月付 × 12期0利率 installment breakdown
 */
export function PriceBlock({
  salePrice: rawSalePrice,
  priceAmount,
  regularPrice: rawRegularPrice,
  compareAtAmount,
  currencyCode = "TWD",
  installmentMonths = 12,
  sizeLabel,
  size,
  sizeNote,
  dimensionsCm,
  mode = "sale",
  compact = false,
  className,
}: PriceBlockProps) {
  const { isZh } = useLanguage();
  const salePrice = rawSalePrice ?? priceAmount ?? 0;
  const regularPrice = rawRegularPrice ?? compareAtAmount;
  const isCompact = compact || size === "md" || size === "sm";
  const resolvedDimensions = dimensionsCm ?? sizeNote;

  const hasDiscount =
    mode !== "regular" &&
    typeof regularPrice === "number" &&
    regularPrice > salePrice;

  const savings = hasDiscount ? regularPrice - salePrice : 0;
  const savingsPercent =
    hasDiscount && regularPrice > 0
      ? Math.round(((regularPrice - salePrice) / regularPrice) * 100)
      : 0;
  const monthlyPrice = Math.floor(salePrice / installmentMonths);

  return (
    <div
      data-slot="price-block"
      className={cn(
        "rounded-2xl border border-border/80 bg-card p-5 shadow-2xs space-y-3",
        isCompact && "p-4 space-y-2",
        className
      )}
    >
      {(sizeLabel || resolvedDimensions) && (
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>
            {isZh ? "目前計價規格：" : "Selected variation: "}
            {sizeLabel && <strong className="font-semibold text-foreground">{sizeLabel}</strong>}
            {resolvedDimensions ? (sizeLabel ? ` (${resolvedDimensions})` : <strong className="font-semibold text-foreground">{resolvedDimensions}</strong>) : ""}
          </span>
          {mode === "sold-out" ? (
            <Badge variant="destructive">{isZh ? "暫無庫存" : "Sold Out"}</Badge>
          ) : (
            <Badge variant="success">{isZh ? "現貨供應" : "In Stock"}</Badge>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-baseline gap-2.5">
        <span
          className={cn(
            isCompact ? "typo-price-md" : "typo-price-xl",
            "text-primary tracking-tight"
          )}
        >
          {formatPrice(salePrice, currencyCode)}
          {mode === "from" && (
            <span className="ml-1 text-sm font-semibold text-muted-foreground">
              {isZh ? "起" : "+"}
            </span>
          )}
        </span>

        {hasDiscount && (
          <span className="typo-body-sm text-muted-foreground line-through">
            {isZh
              ? `原價 ${formatPrice(regularPrice, currencyCode)}`
              : `Reg. ${formatPrice(regularPrice, currencyCode)}`}
          </span>
        )}

        {hasDiscount && savings > 0 && (
          <Badge variant="sale" className="gap-1">
            <Tag className="size-3" aria-hidden="true" />
            {isZh
              ? `現省 ${formatPrice(savings, currencyCode)} (${savingsPercent}% OFF)`
              : `Save ${formatPrice(savings, currencyCode)} (${savingsPercent}% OFF)`}
          </Badge>
        )}
      </div>

      {installmentMonths > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border/70 bg-muted/40 px-3.5 py-2.5">
          <div className="flex items-center gap-2 typo-body-sm">
            <CreditCard className="size-4 text-primary shrink-0" aria-hidden="true" />
            <span>
              {isZh ? (
                <>
                  月付{" "}
                  <strong className="font-bold text-foreground">
                    {formatPrice(monthlyPrice, currencyCode)}
                  </strong>{" "}
                  × {installmentMonths}期0利率
                </>
              ) : (
                <>
                  <strong className="font-bold text-foreground">
                    {formatPrice(monthlyPrice, currencyCode)}
                  </strong>
                  /mo × {installmentMonths} mos 0% APR
                </>
              )}
            </span>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-auto p-0 typo-caption font-semibold text-primary hover:bg-transparent hover:underline"
              >
                {isZh ? "適用銀行" : "Eligible Banks"}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <p className="font-semibold">
                {isZh ? "合作 0 利率分期銀行：" : "0% Installment Partner Banks:"}
              </p>
              <p className="mt-1 text-muted-foreground">
                {isZh
                  ? "玉山、國泰世華、中國信託、台新、台北富邦、聯邦、星展、永豐銀行信用卡皆享 3 / 6 / 12 期 0 利率。"
                  : "E.SUN, Cathay United, CTBC, Taishin, Taipei Fubon, Union Bank, DBS, and Bank SinoPac support 3/6/12-month 0% APR."}
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      )}

      {!isCompact && (
        <div className="flex items-center gap-1.5 typo-caption text-muted-foreground">
          <ShieldCheck className="size-3.5 text-primary shrink-0" aria-hidden="true" />
          <span>
            {isZh
              ? "價格含 5% 營業稅與台灣本島免運搬上樓定位，由 WooCommerce 即時計算"
              : "Includes 5% VAT and free Taiwan mainland upstairs delivery via WooCommerce"}
          </span>
        </div>
      )}
    </div>
  );
}
