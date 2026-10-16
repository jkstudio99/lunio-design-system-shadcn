"use client";

import * as React from "react";
import { Building2, CheckCircle2, CreditCard, Smartphone, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLanguage } from "@/components/language-provider";
import { formatPrice } from "@/lib/design-system";
import { cn } from "@/lib/utils";

export type PaymentMethodId =
  | "installment"
  | "line-pay"
  | "apple-pay"
  | "credit-card"
  | "atm";

/**
 * Backlog 008 — PaymentMethodSelector
 * Supports Credit Card 0% installments (3/6/12 months), LINE Pay, Apple Pay,
 * one-time Credit Card, and ATM transfer with canonical NT formatting.
 */
export function PaymentMethodSelector({
  totalAmount = 21990,
  currencyCode = "TWD",
  className,
}: {
  totalAmount?: number;
  currencyCode?: string;
  className?: string;
}) {
  const { isZh } = useLanguage();
  const [method, setMethod] = React.useState<PaymentMethodId>("installment");
  const [months, setMonths] = React.useState<3 | 6 | 12>(12);

  const monthlyAmount = Math.floor(totalAmount / months);

  const methods: Array<{
    id: PaymentMethodId;
    titleZh: string;
    titleEn: string;
    descZh: string;
    descEn: string;
    badgeZh: string;
    badgeEn: string;
    badgeVariant?: "default" | "success" | "secondary" | "outline";
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    {
      id: "installment",
      titleZh: "信用卡分期付款 (最高 12 期 0 利率)",
      titleEn: "Credit Card 0% APR Installments (Up to 12 Mos)",
      descZh: `月付 ${formatPrice(monthlyAmount, currencyCode)} × ${months}期0利率 · 支援玉山、國泰、中信、台新、富邦等 8 大銀行`,
      descEn: `${formatPrice(monthlyAmount, currencyCode)}/mo × ${months} mos 0% APR · E.SUN, Cathay, CTBC, Taishin, Fubon`,
      badgeZh: "0 利率首選",
      badgeEn: "0% APR",
      badgeVariant: "default",
      icon: CreditCard,
    },
    {
      id: "line-pay",
      titleZh: "LINE Pay (支援 LINE POINTS 折抵)",
      titleEn: "LINE Pay (LINE POINTS Supported)",
      descZh: "跳轉 LINE Pay 授權快速付款，可使用帳戶內 LINE POINTS 全額或部分折抵",
      descEn: "Instant checkout via LINE Pay app with LINE POINTS redemption support",
      badgeZh: "台灣熱門",
      badgeEn: "POPULAR",
      badgeVariant: "success",
      icon: Wallet,
    },
    {
      id: "apple-pay",
      titleZh: "Apple Pay (Face ID / Touch ID 極速結帳)",
      titleEn: "Apple Pay (Face ID / Touch ID Express)",
      descZh: "透過 iPhone、iPad 或 Mac Safari 免輸入卡號一鍵安全完成付款",
      descEn: "One-tap biometric checkout on iPhone, iPad, or Mac without typing card numbers",
      badgeZh: "極速安全",
      badgeEn: "EXPRESS",
      badgeVariant: "secondary",
      icon: Smartphone,
    },
    {
      id: "credit-card",
      titleZh: "信用卡一次付清 (VISA / MasterCard / JCB)",
      titleEn: "Credit Card One-Time Payment",
      descZh: `一次付清 ${formatPrice(totalAmount, currencyCode)} · 支援國內外發卡機構與高現金回饋卡`,
      descEn: `Pay ${formatPrice(totalAmount, currencyCode)} in full · Supports VISA, MasterCard, and JCB`,
      badgeZh: "3D 驗證",
      badgeEn: "3DS SECURE",
      badgeVariant: "outline",
      icon: CheckCircle2,
    },
    {
      id: "atm",
      titleZh: "ATM 虛擬帳號匯款 / 網路銀行轉帳",
      titleEn: "ATM Virtual Account / Bank Transfer",
      descZh: "系統自動產生專屬匯款帳號，轉帳入帳後系統即時發送簡訊通知安排出貨",
      descEn: "Generates a dedicated virtual bank account with instant SMS confirmation upon transfer",
      badgeZh: "免手續費",
      badgeEn: "BANK TRANSFER",
      badgeVariant: "outline",
      icon: Building2,
    },
  ];

  return (
    <div
      data-slot="payment-method-selector"
      className={cn(
        "rounded-2xl border border-border/80 bg-card p-6 shadow-2xs space-y-5",
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-4">
        <div>
          <h3 className="typo-h4 text-foreground">
            {isZh ? "選擇付款方式 (Payment Method)" : "Select Payment Method"}
          </h3>
          <p className="typo-body-sm text-muted-foreground">
            {isZh
              ? `應付總額：${formatPrice(totalAmount, currencyCode)} (含稅與全台免運搬上樓)`
              : `Order Total: ${formatPrice(totalAmount, currencyCode)} (Includes VAT & free delivery)`}
          </p>
        </div>
        <Badge variant="outline" className="font-mono text-xs">
          SSL 256-bit
        </Badge>
      </div>

      <RadioGroup
        value={method}
        onValueChange={(v) => setMethod(v as PaymentMethodId)}
        className="space-y-3"
        aria-label={isZh ? "結帳付款方式" : "Checkout payment methods"}
      >
        {methods.map((item) => {
          const isSelected = method === item.id;
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={cn(
                "rounded-xl border transition-all",
                isSelected
                  ? "border-primary ring-1 ring-primary bg-primary/[0.04] dark:bg-primary/[0.1]"
                  : "border-border/80 bg-background hover:border-primary/40"
              )}
            >
              <Label
                htmlFor={`pay-${item.id}`}
                className="flex cursor-pointer items-start gap-3.5 p-4"
              >
                <RadioGroupItem
                  value={item.id}
                  id={`pay-${item.id}`}
                  className="mt-1"
                />
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-4" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="typo-label font-bold text-foreground">
                      {isZh ? item.titleZh : item.titleEn}
                    </span>
                    <Badge variant={item.badgeVariant || "outline"} className="text-[10px]">
                      {isZh ? item.badgeZh : item.badgeEn}
                    </Badge>
                  </div>
                  <p className="typo-body-sm text-muted-foreground">
                    {isZh ? item.descZh : item.descEn}
                  </p>
                </div>
              </Label>

              {item.id === "installment" && isSelected && (
                <div className="border-t border-border/60 px-4 py-3 bg-muted/30 flex flex-wrap items-center justify-between gap-3">
                  <span className="typo-caption font-semibold text-foreground">
                    {isZh ? "選擇分期期數 (0 利率)：" : "Choose 0% APR term:"}
                  </span>
                  <div className="flex items-center gap-2">
                    {([3, 6, 12] as const).map((term) => {
                      const activeTerm = months === term;
                      const perMonth = Math.floor(totalAmount / term);
                      return (
                        <Button
                          key={term}
                          type="button"
                          size="sm"
                          variant={activeTerm ? "default" : "outline"}
                          onClick={() => setMonths(term)}
                          aria-pressed={activeTerm}
                          className="h-8 text-xs px-3"
                        >
                          {isZh
                            ? `${term}期 · ${formatPrice(perMonth, currencyCode)}/月`
                            : `${term}m · ${formatPrice(perMonth, currencyCode)}/mo`}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}
