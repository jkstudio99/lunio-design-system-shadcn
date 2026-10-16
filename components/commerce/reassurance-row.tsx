"use client";

import * as React from "react";
import {
  ArrowUpFromLine,
  Info,
  Moon,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";

export type ReassuranceItem = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  titleZh: string;
  titleEn: string;
  descZh: string;
  descEn: string;
  badgeZh?: string;
  badgeEn?: string;
};

const DEFAULT_REASSURANCE_ITEMS: ReassuranceItem[] = [
  {
    id: "delivery-days",
    icon: Truck,
    titleZh: "3–5 個工作天專車配送到府",
    titleEn: "3–5 Business Days Dedicated Delivery",
    descZh: "台灣本島免運費，出貨前專人致電預約配送時段。",
    descEn: "Free Taiwan main island shipping with scheduled pre-delivery call.",
    badgeZh: "本島免運",
    badgeEn: "FREE SHIPPING",
  },
  {
    id: "upstairs-install",
    icon: ArrowUpFromLine,
    titleZh: "免費搬上樓安裝定位 + 舊床搬運協助",
    titleEn: "Free Upstairs Installation & Old Bed Assistance",
    descZh: "電梯大樓與公寓 1–5 樓皆享免收樓層費搬運至臥室定位，並免費協助將同尺寸舊床搬至一樓。",
    descEn: "Zero floor surcharge for 1–5F walk-ups, bedroom setup, and ground-floor old mattress removal.",
    badgeZh: "免樓層費",
    badgeEn: "NO FLOOR FEE",
  },
  {
    id: "warranty",
    icon: ShieldCheck,
    titleZh: "10 年原廠結構保固",
    titleEn: "10-Year Official Structural Warranty",
    descZh: "針對正常使用下超過 2.5 cm 之永久性結構凹陷，提供原廠保固維修或更換服務。",
    descEn: "Covers permanent body impressions exceeding 2.5 cm under normal household use.",
  },
  {
    id: "trial-returns",
    icon: Moon,
    titleZh: "100 晚臥室安心試睡 · 不合適免費收回",
    titleEn: "100-Night Home Trial · Free Return Pickup",
    descZh: "簽收次日起算 100 晚試睡期；若不適應由專車免費到府收回並全額退費。",
    descEn: "100 nights starting after delivery; complimentary courier pickup and full refund if unsatisfied.",
  },
];

export type ReassuranceRowProps = {
  items?: ReassuranceItem[];
  showDisclaimer?: boolean;
  compact?: boolean;
  className?: string;
};

/**
 * Backlog 020 — ServiceList / ReassuranceRow
 * Placed directly under the PDP Buy CTA button to address top Taiwan buyer objections:
 * delivery days, 搬上樓安裝, warranty, returns, and readable delivery disclaimer.
 */
export function ReassuranceRow({
  items = DEFAULT_REASSURANCE_ITEMS,
  showDisclaimer = true,
  compact = false,
  className,
}: ReassuranceRowProps) {
  const { isZh } = useLanguage();

  if (compact) {
    return (
      <div
        data-slot="reassurance-row-compact"
        className={cn(
          "grid grid-cols-2 gap-2.5 rounded-xl border border-border/80 bg-card p-3 sm:grid-cols-4",
          className
        )}
      >
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="flex items-center gap-2 rounded-lg bg-muted/40 p-2"
            >
              <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Icon className="size-3.5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-foreground">
                  {isZh ? item.titleZh : item.titleEn}
                </p>
                {(item.badgeZh || item.badgeEn) && (
                  <span className="block text-[10px] text-muted-foreground">
                    {isZh ? item.badgeZh : item.badgeEn}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      data-slot="reassurance-row"
      className={cn(
        "rounded-2xl border border-border/80 bg-card p-5 shadow-2xs space-y-4",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="typo-label font-bold text-foreground">
          {isZh ? "Lunio 台灣官方四大安心承諾" : "Lunio Taiwan Official Service Guarantees"}
        </span>
        <Badge variant="outline" className="text-[11px]">
          {isZh ? "隨單附保固卡" : "Official Warranty"}
        </Badge>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 p-3.5"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <h4 className="typo-body-sm font-bold text-foreground">
                    {isZh ? item.titleZh : item.titleEn}
                  </h4>
                  {(item.badgeZh || item.badgeEn) && (
                    <Badge variant="success" className="px-2 py-0 text-[10px]">
                      {isZh ? item.badgeZh : item.badgeEn}
                    </Badge>
                  )}
                </div>
                <p className="typo-body-sm text-muted-foreground">
                  {isZh ? item.descZh : item.descEn}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {showDisclaimer && (
        <Accordion type="single" collapsible className="border-t border-border/60 pt-1">
          <AccordionItem value="delivery-disclaimer" className="border-b-0">
            <AccordionTrigger className="py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground">
              <span className="flex items-center gap-1.5">
                <Info className="size-3.5 text-primary shrink-0" aria-hidden="true" />
                {isZh
                  ? "偏遠地區、山區、離島與特殊樓層配送免責說明"
                  : "Remote Areas, Offshore Islands & Special Floor Delivery Disclaimer"}
              </span>
            </AccordionTrigger>
            <AccordionContent className="typo-body-sm text-muted-foreground space-y-1.5 pb-1">
              <p>
                {isZh
                  ? "1. 台灣本島一般市區皆享免運費與 1–5 樓免費人工搬運上樓；6 樓（含）以上無電梯或樓梯間寬度不足需使用吊車者，費用由買家實報實銷。"
                  : "1. Standard urban areas on Taiwan main island receive free shipping and 1–5F stair carry. Walk-ups 6F+ or narrow staircases requiring crane hoisting are billed at cost."}
              </p>
              <p>
                {isZh
                  ? "2. 花東縱谷偏遠鄉鎮、山區及離島（金門、馬祖、澎湖）將由客服人員於訂單成立後主動聯繫確認車趟與加價運費明細。舊床回收僅限將一對一同尺寸床墊搬至一樓指定位置，不含清運規費。"
                  : "2. Remote mountain townships and offshore islands require scheduled freight confirmation. Old mattress assistance covers moving one same-size mattress to the ground floor."}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}
