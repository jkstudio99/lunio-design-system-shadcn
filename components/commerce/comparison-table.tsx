"use client";

import * as React from "react";
import { ArrowRight, CheckCircle2, Eye, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/components/language-provider";
import { formatPrice } from "@/lib/design-system";
import { cn } from "@/lib/utils";

export type CompareModelSpec = {
  id: string;
  brand: string;
  nameZh: string;
  nameEn: string;
  taglineZh: string;
  taglineEn: string;
  price: number;
  regularPrice: number;
  currencyCode?: string;
  thicknessCm: number;
  coreZh: string;
  coreEn: string;
  trialNights: number;
  warrantyYears: number;
  scores: {
    support: number;
    pressureRelief: number;
    cooling: number;
    motionIsolation: number;
    durability: number;
  };
};

export const COMPARE_MODELS: CompareModelSpec[] = [
  {
    id: "gen4",
    brand: "Lunio Taiwan",
    nameZh: "Lunio Gen 4 石墨烯乳膠床墊",
    nameEn: "Lunio Gen 4 Graphene Latex",
    taglineZh: "旗艦五層無簧結構 · 航太石墨烯恆溫散熱",
    taglineEn: "Flagship 5-layer hybrid core · Graphene cooling",
    price: 21990,
    regularPrice: 28990,
    currencyCode: "TWD",
    thicknessCm: 25,
    coreZh: "泰國原產天然乳膠 + 石墨烯高導熱減壓棉",
    coreEn: "Thai Natural Latex + Graphene Thermal Foam",
    trialNights: 100,
    warrantyYears: 10,
    scores: {
      support: 5,
      pressureRelief: 5,
      cooling: 5,
      motionIsolation: 5,
      durability: 5,
    },
  },
  {
    id: "quantum-max",
    brand: "Lunio Taiwan",
    nameZh: "Lunio Quantum Max 獨立筒乳膠床墊",
    nameEn: "Lunio Quantum Max Hybrid",
    taglineZh: "高碳錳鋼獨立筒 + 天然乳膠雙重支撐",
    taglineEn: "High-carbon pocket coils + Thai natural latex",
    price: 16990,
    regularPrice: 22990,
    currencyCode: "TWD",
    thicknessCm: 24,
    coreZh: "五區段獨立筒彈簧 + 泰國天然乳膠層",
    coreEn: "5-Zone Pocket Springs + Natural Latex Layer",
    trialNights: 100,
    warrantyYears: 10,
    scores: {
      support: 5,
      pressureRelief: 4,
      cooling: 4,
      motionIsolation: 4,
      durability: 5,
    },
  },
  {
    id: "nooz-helix",
    brand: "Nooz Helix",
    nameZh: "Nooz Helix 五星飯店級獨立筒床墊",
    nameEn: "Nooz Helix Hotel Pocket Spring",
    taglineZh: "歐式奢華立體表布 · 強化護邊獨立筒",
    taglineEn: "Euro-top quilted pillow top · Edge-reinforced coils",
    price: 9900,
    regularPrice: 14900,
    currencyCode: "TWD",
    thicknessCm: 24,
    coreZh: "高密度釋壓棉 + 飯店級靜音獨立筒",
    coreEn: "High-density comfort foam + Quiet Pocket Coils",
    trialNights: 100,
    warrantyYears: 10,
    scores: {
      support: 4,
      pressureRelief: 4,
      cooling: 4,
      motionIsolation: 4,
      durability: 4,
    },
  },
  {
    id: "nooz-sunset",
    brand: "Nooz Sunset",
    nameZh: "Nooz Sunset Pro 乳膠獨立筒床墊",
    nameEn: "Nooz Sunset Pro Latex Hybrid",
    taglineZh: "護脊硬挺支撐 · 專為台灣人腰背設計",
    taglineEn: "Orthopedic firm lumbar support for Taiwan sleepers",
    price: 7590,
    regularPrice: 11900,
    currencyCode: "TWD",
    thicknessCm: 24,
    coreZh: "天然乳膠微孔透氣層 + 護脊強化獨立筒",
    coreEn: "Micro-perforated Latex + Orthopedic Coils",
    trialNights: 100,
    warrantyYears: 10,
    scores: {
      support: 5,
      pressureRelief: 4,
      cooling: 4,
      motionIsolation: 4,
      durability: 4,
    },
  },
];

function ScoreBar({
  score,
  label,
  highlight = false,
}: {
  score: number;
  label: string;
  highlight?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-muted-foreground">{label}</span>
        <span className="font-mono font-bold text-foreground">{score} / 5</span>
      </div>
      <div
        role="meter"
        aria-label={label}
        aria-valuenow={score}
        aria-valuemin={1}
        aria-valuemax={5}
        className="grid grid-cols-5 gap-1.5"
      >
        {[1, 2, 3, 4, 5].map((step) => (
          <span
            key={step}
            className={cn(
              "h-2 rounded-full transition-colors",
              step <= score
                ? highlight
                  ? "bg-primary"
                  : "bg-primary/70"
                : "bg-muted-foreground/20"
            )}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Backlog 016 — Series ComparisonTable
 * Side-by-side 2-model comparison with 1–5 score bars, "目前瀏覽" active state,
 * standardized NT pricing, and per-column CTAs.
 */
export function ComparisonTable({
  currentModelId = "gen4",
  initialCompareId = "quantum-max",
  onSelectModel,
  className,
}: {
  currentModelId?: string;
  initialCompareId?: string;
  onSelectModel?: (modelId: string) => void;
  className?: string;
}) {
  const { isZh } = useLanguage();
  const [compareId, setCompareId] = React.useState(initialCompareId);

  const currentModel =
    COMPARE_MODELS.find((m) => m.id === currentModelId) || COMPARE_MODELS[0];
  const compareModel =
    COMPARE_MODELS.find((m) => m.id === compareId && m.id !== currentModel.id) ||
    COMPARE_MODELS[1];

  const columns = [
    { model: currentModel, isCurrent: true },
    { model: compareModel, isCurrent: false },
  ];

  const scoreLabels = [
    { key: "support" as const, zh: "脊椎支撐力", en: "Spinal Support" },
    { key: "pressureRelief" as const, zh: "包覆減壓感", en: "Pressure Relief" },
    { key: "cooling" as const, zh: "透氣散熱表現", en: "Cooling Airflow" },
    { key: "motionIsolation" as const, zh: "翻身抗干擾", en: "Motion Isolation" },
    { key: "durability" as const, zh: "抗下陷耐用度", en: "Anti-Sag Durability" },
  ];

  return (
    <div
      data-slot="comparison-table"
      className={cn("space-y-4", className)}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Sparkles className="size-3 text-primary" aria-hidden="true" />
            {isZh ? "系列規格與睡感比較 (標準雙人 5 尺)" : "Series Comparison (Standard Double 5 ft)"}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="typo-caption text-muted-foreground">
            {isZh ? "切換對比款式：" : "Compare with:"}
          </span>
          <Select value={compareModel.id} onValueChange={setCompareId}>
            <SelectTrigger
              aria-label={isZh ? "選擇欲對比的床墊款式" : "Select mattress model to compare"}
              className="h-9 min-w-[210px] text-xs font-semibold"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
              {COMPARE_MODELS.filter((m) => m.id !== currentModel.id).map((m) => (
                <SelectItem key={m.id} value={m.id} className="text-xs">
                  {isZh ? m.nameZh : m.nameEn}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {columns.map(({ model, isCurrent }) => {
          const currency = model.currencyCode || "TWD";
          const savings = model.regularPrice - model.price;
          const monthly = Math.floor(model.price / 12);

          return (
            <div
              key={model.id}
              data-current={isCurrent}
              className={cn(
                "flex flex-col justify-between rounded-2xl border p-5 transition-all",
                isCurrent
                  ? "border-primary ring-1 ring-primary bg-primary/[0.03] dark:bg-primary/[0.07] shadow-sm"
                  : "border-border/80 bg-card shadow-2xs"
              )}
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {model.brand}
                  </span>
                  {isCurrent ? (
                    <Badge className="gap-1">
                      <Eye className="size-3" aria-hidden="true" />
                      {isZh ? "目前瀏覽" : "Currently Viewing"}
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      {isZh ? "比較款式" : "Compared Model"}
                    </Badge>
                  )}
                </div>

                <div>
                  <h3 className="typo-h4 text-foreground">
                    {isZh ? model.nameZh : model.nameEn}
                  </h3>
                  <p className="mt-1 typo-body-sm text-muted-foreground">
                    {isZh ? model.taglineZh : model.taglineEn}
                  </p>
                </div>

                {/* Price Block inside column */}
                <div className="rounded-xl border border-border/70 bg-background/80 p-3.5 space-y-1.5">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="typo-price-md text-primary">
                      {formatPrice(model.price, currency)}
                    </span>
                    <span className="typo-caption text-muted-foreground line-through">
                      {formatPrice(model.regularPrice, currency)}
                    </span>
                    {savings > 0 && (
                      <Badge variant="sale" className="px-2 py-0.5 text-[10px]">
                        {isZh
                          ? `現省 ${formatPrice(savings, currency)}`
                          : `Save ${formatPrice(savings, currency)}`}
                      </Badge>
                    )}
                  </div>
                  <p className="typo-caption text-muted-foreground">
                    {isZh
                      ? `月付 ${formatPrice(monthly, currency)} × 12期0利率`
                      : `${formatPrice(monthly, currency)}/mo × 12 mos 0% APR`}
                  </p>
                </div>

                {/* 1-5 Score Bars */}
                <div className="space-y-3 pt-1">
                  <div className="text-xs font-bold text-foreground">
                    {isZh ? "五大睡感指標評分 (1–5 分)" : "5-Point Sleep Performance Scores (1–5)"}
                  </div>
                  {scoreLabels.map((item) => (
                    <ScoreBar
                      key={item.key}
                      score={model.scores[item.key]}
                      label={isZh ? item.zh : item.en}
                      highlight={isCurrent}
                    />
                  ))}
                </div>

                {/* Spec Comparison Rows */}
                <div className="space-y-2 border-t border-border/70 pt-3.5 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-muted-foreground">{isZh ? "核心結構：" : "Core Anatomy:"}</span>
                    <span className="font-semibold text-right text-foreground">
                      {isZh ? model.coreZh : model.coreEn}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-muted-foreground">{isZh ? "床墊總厚度：" : "Total Height:"}</span>
                    <span className="font-mono font-semibold text-foreground">
                      {model.thicknessCm} cm (±2 cm)
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-muted-foreground">{isZh ? "試睡與保固：" : "Trial & Warranty:"}</span>
                    <span className="font-semibold text-foreground">
                      {isZh
                        ? `${model.trialNights} 晚試睡 · ${model.warrantyYears} 年保固`
                        : `${model.trialNights}-Night Trial · ${model.warrantyYears}-Yr Warranty`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-border/60">
                {isCurrent ? (
                  <Button
                    type="button"
                    className="w-full gap-1.5"
                    onClick={() => onSelectModel?.(model.id)}
                  >
                    <CheckCircle2 className="size-4" aria-hidden="true" />
                    {isZh ? "目前瀏覽款式 · 立即選購" : "Currently Viewing · Buy Now"}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full gap-1.5"
                    onClick={() => onSelectModel?.(model.id)}
                  >
                    {isZh
                      ? `切換瀏覽 ${model.nameZh.split(" ")[1] || model.nameZh}`
                      : `View ${model.nameEn}`}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
