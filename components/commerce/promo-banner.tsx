"use client";

import * as React from "react";
import { Check, Clock, Copy, Flame, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { formatPrice } from "@/lib/design-system";
import { cn } from "@/lib/utils";

export type PromoBannerProps = {
  campaignTitleZh?: string;
  campaignTitleEn?: string;
  subtitleZh?: string;
  subtitleEn?: string;
  discountPercent?: number;
  maxSavingsAmount?: number;
  currencyCode?: string;
  promoCode?: string;
  endDate?: string;
  className?: string;
};

function computeTimeLeft(endDateIso: string) {
  const endMs = Date.parse(endDateIso);
  if (Number.isNaN(endMs)) {
    return { days: 12, hours: 8, minutes: 45, seconds: 30, expired: false };
  }
  const diff = Math.max(0, endMs - Date.now());
  if (diff === 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, expired: false };
}

/**
 * Backlog 015 / 024 — PromoBanner / CountdownBanner
 * Real end-date campaign banner + discount Badge (`variant="sale"` using `#E53935`).
 */
export function PromoBanner({
  campaignTitleZh = "11.11 雙 11 睡眠狂歡節 · 全館床墊限時特惠",
  campaignTitleEn = "11.11 Double 11 Sleep Festival · Limited-Time Mattress Sale",
  subtitleZh = "買床墊送天絲防蟎保潔墊 + 享 12 期 0 利率與全台免運搬上樓",
  subtitleEn = "Free Tencel protector with mattress purchase + 12-mo 0% APR & free upstairs delivery",
  discountPercent = 24,
  maxSavingsAmount = 7000,
  currencyCode = "TWD",
  promoCode = "LUNIO1111",
  endDate = "2026-11-11T23:59:59+08:00",
  className,
}: PromoBannerProps) {
  const { isZh } = useLanguage();
  const [copied, setCopied] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(() => computeTimeLeft(endDate));

  React.useEffect(() => {
    setTimeLeft(computeTimeLeft(endDate));
    const timer = setInterval(() => {
      setTimeLeft(computeTimeLeft(endDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [endDate]);

  const formattedEndDate = React.useMemo(() => {
    const d = new Date(endDate);
    if (Number.isNaN(d.getTime())) return endDate;
    return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(
      d.getDate()
    ).padStart(2, "0")} 23:59`;
  }, [endDate]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(promoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      data-slot="promo-banner"
      className={cn(
        "rounded-2xl border border-border/80 bg-[var(--brand-surface)] dark:bg-[#161D2E] p-5 shadow-xs",
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="sale" className="gap-1">
              <Flame className="size-3" aria-hidden="true" />
              {isZh ? `現省 ${discountPercent}%` : `SAVE ${discountPercent}%`}
            </Badge>
            <Badge variant="discount">
              {isZh
                ? `最高現折 ${formatPrice(maxSavingsAmount, currencyCode)}`
                : `Up to ${formatPrice(maxSavingsAmount, currencyCode)} OFF`}
            </Badge>
            <span className="typo-caption text-muted-foreground flex items-center gap-1">
              <Clock className="size-3 text-primary" aria-hidden="true" />
              {isZh ? `活動截止：${formattedEndDate}` : `Ends: ${formattedEndDate}`}
            </span>
          </div>

          <h3 className="typo-h3 text-foreground">
            {isZh ? campaignTitleZh : campaignTitleEn}
          </h3>
          <p className="typo-body-sm text-muted-foreground">
            {isZh ? subtitleZh : subtitleEn}
          </p>
        </div>

        <div className="flex flex-col sm:items-end gap-3">
          {/* Countdown blocks */}
          <div
            className="flex items-center gap-1.5"
            aria-label={isZh ? "活動倒數計時" : "Promotion countdown timer"}
          >
            {[
              { value: timeLeft.days, label: isZh ? "天" : "D" },
              { value: timeLeft.hours, label: isZh ? "時" : "H" },
              { value: timeLeft.minutes, label: isZh ? "分" : "M" },
              { value: timeLeft.seconds, label: isZh ? "秒" : "S" },
            ].map((unit) => (
              <div
                key={unit.label}
                className="flex min-w-[52px] flex-col items-center justify-center rounded-lg border border-border bg-card px-2.5 py-1.5 shadow-2xs"
              >
                <span className="font-mono text-base font-extrabold text-primary">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="text-[10px] font-medium text-muted-foreground">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          {/* Promo code copy */}
          <div className="flex items-center gap-2">
            <span className="typo-caption text-muted-foreground">
              {isZh ? "折扣碼：" : "Code:"}
            </span>
            <code className="rounded-md border border-border bg-card px-2.5 py-1 font-mono text-xs font-bold text-primary">
              {promoCode}
            </code>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopyCode}
              className="h-8 gap-1.5 px-2.5 text-xs"
            >
              {copied ? (
                <>
                  <Check className="size-3.5 text-emerald-500" aria-hidden="true" />
                  {isZh ? "已複製" : "Copied"}
                </>
              ) : (
                <>
                  <Copy className="size-3.5" aria-hidden="true" />
                  {isZh ? "複製折扣碼" : "Copy Code"}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
