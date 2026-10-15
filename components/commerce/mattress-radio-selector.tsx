"use client";

import * as React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { HelpCircle, Info, TableProperties } from "lucide-react";
import { cn } from "@/lib/utils";

export type TaiwanMattressSize = {
  id: string;
  name: string;
  chi: string;
  cm: string;
  popular?: boolean;
};

export const TAIWAN_SIZES: TaiwanMattressSize[] = [
  { id: "3.0", name: "標準單人", chi: "3 尺", cm: "90 × 188 cm" },
  { id: "3.5", name: "單人加大", chi: "3.5 尺", cm: "105 × 188 cm" },
  { id: "5.0", name: "標準雙人", chi: "5 尺", cm: "150 × 188 cm", popular: true },
  { id: "6.0", name: "雙人加大 Queen", chi: "6 尺", cm: "180 × 188 cm" },
  { id: "7.0", name: "雙人特大 King", chi: "7 尺", cm: "180 × 210 cm" },
];

export type MattressRadioSelectorProps = {
  selectedSize: string;
  onSelectSize: (id: string) => void;
  selectedFeel?: string;
  onSelectFeel?: (feel: string) => void;
  className?: string;
};

export function MattressRadioSelector({
  selectedSize,
  onSelectSize,
  selectedFeel = "medium-firm",
  onSelectFeel,
  className,
}: MattressRadioSelectorProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="typo-label font-bold text-foreground">
            床墊尺寸選擇 (Taiwan Size Standards)
          </Label>
          <div className="flex items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 typo-caption font-normal text-primary hover:bg-transparent hover:underline outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="查看台灣床墊尺與公分換算尺寸指南"
                >
                  <HelpCircle className="size-3.5 mr-1" />
                  尺寸指南
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <p className="font-semibold">台灣傳統台尺換算小撇步：</p>
                <p className="mt-1 text-muted-foreground">
                  1 尺約 30.3 cm。台灣規格與歐美/日規 IKEA 尺寸不同，選購前請丈量床架內徑。
                </p>
              </TooltipContent>
            </Tooltip>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 px-2 text-[11px] font-medium"
                >
                  <TableProperties className="size-3 mr-1" />
                  完整對照表
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[min(94vw,420px)] p-6 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>台灣床墊標準尺寸對照表</SheetTitle>
                  <SheetDescription>
                    台灣傳統台尺 (尺) 與公分 (cm) 規格對照及適用空間指南
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {TAIWAN_SIZES.map((s) => (
                    <div key={s.id} className="rounded-xl border border-border/80 bg-muted/40 p-4 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="typo-label font-bold text-foreground">{s.name} ({s.chi})</span>
                        {s.popular && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">熱銷推薦</span>}
                      </div>
                      <p className="font-mono text-xs text-primary font-semibold">{s.cm}</p>
                      <p className="typo-caption text-muted-foreground pt-1">
                        {s.id === "3.0" && "適用兒童房、青年宿舍、單人雅房 (3 坪以內)"}
                        {s.id === "3.5" && "成年單人最舒適尺寸，翻身無拘束 (3-4 坪)"}
                        {s.id === "5.0" && "台灣雙人最熱銷規格，夫妻、伴侶標準首選 (4-6 坪)"}
                        {s.id === "6.0" && "雙人寬敞無干擾，可容納小孩同睡 (6 坪以上)"}
                        {s.id === "7.0" && "旗艦特大尺寸，享受極致奢華寬敞睡眠空間 (7 坪以上)"}
                      </p>
                    </div>
                  ))}
                  <div className="rounded-lg border border-border/60 bg-muted/20 p-3 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">💡 丈量叮嚀：</span>
                    購買前請務必丈量床架內徑。歐規床墊（如 IKEA）長度通常為 200 cm，與台灣標準 188 cm 不同。
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <RadioGroup
          value={selectedSize}
          onValueChange={onSelectSize}
          className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="台灣床墊規格尺寸"
        >
          {TAIWAN_SIZES.map((size) => {
            const isSelected = selectedSize === size.id;
            return (
              <Label
                key={size.id}
                htmlFor={`size-${size.id}`}
                className={cn(
                  "flex cursor-pointer items-center justify-between rounded-xl border p-3.5 transition-all outline-none",
                  isSelected
                    ? "border-primary ring-1 ring-primary bg-primary/5 dark:bg-primary/10 shadow-xs"
                    : "border-border/80 bg-card hover:border-primary/40 hover:bg-muted/40"
                )}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value={size.id} id={`size-${size.id}`} />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="typo-label font-semibold text-foreground">
                        {size.name}
                      </span>
                      {size.popular && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                          熱銷推薦
                        </span>
                      )}
                    </div>
                    <div className="typo-caption text-muted-foreground mt-0.5">
                      {size.chi} · {size.cm}
                    </div>
                  </div>
                </div>
              </Label>
            );
          })}
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="typo-label font-bold text-foreground">
            睡感偏好與支撐度 (Feel & Firmness)
          </Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 typo-caption font-normal text-muted-foreground hover:bg-transparent hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="睡感說明提示"
              >
                <Info className="size-3.5 mr-1" />
                睡感說明
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <p>Lunio Gen 4 具備人體工學黃金比例，能吸收震動並給予脊椎最適支撐。</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <RadioGroup
          value={selectedFeel}
          onValueChange={onSelectFeel}
          className="grid gap-2.5 sm:grid-cols-2"
          aria-label="床墊睡感軟硬度"
        >
          {[
            {
              id: "medium-firm",
              title: "適中微挺 (Medium-Firm)",
              desc: "人體工學黃金比例，90% 台灣睡眠者首選。",
            },
            {
              id: "firm-support",
              title: "深度強化支撐 (Firm Support)",
              desc: "針對高體重或偏好硬床者，護脊減壓不腰酸。",
            },
          ].map((feel) => {
            const isSelected = selectedFeel === feel.id;
            return (
              <Label
                key={feel.id}
                htmlFor={`feel-${feel.id}`}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-all outline-none",
                  isSelected
                    ? "border-primary ring-1 ring-primary bg-primary/5 dark:bg-primary/10 shadow-xs"
                    : "border-border/80 bg-card hover:border-primary/40 hover:bg-muted/40"
                )}
              >
                <RadioGroupItem
                  value={feel.id}
                  id={`feel-${feel.id}`}
                  className="mt-0.5"
                />
                <div>
                  <div className="typo-label font-semibold text-foreground">
                    {feel.title}
                  </div>
                  <div className="typo-caption text-muted-foreground mt-0.5">
                    {feel.desc}
                  </div>
                </div>
              </Label>
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
}
