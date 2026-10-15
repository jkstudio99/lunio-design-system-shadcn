"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, Layers, Truck, RotateCcw, FileText } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";

export type MattressSpecsAccordionProps = {
  className?: string;
  defaultOpenItem?: string;
};

export function MattressSpecsAccordion({
  className,
  defaultOpenItem = "layers",
}: MattressSpecsAccordionProps) {
  const { isZh } = useLanguage();

  const specsList = isZh
    ? [
        ["產品名稱", "Lunio Gen 4 科技石墨烯乳膠床墊"],
        ["原產地", "泰國原裝製造 (Made in Thailand)"],
        ["床墊總高度", "25 cm (約 10 吋)"],
        ["睡感硬度指數", "6.5 / 10 適中微挺 (Medium-Firm)"],
        ["核心材料", "4D 高彈力天然乳膠 + 航太石墨烯導熱棉 + Wave-Zone 釋壓平衡棉 + Diamond 穩固基底"],
        ["表布材質", "Cool-Silk 涼感天絲瞬涼防蟎親膚表布"],
        ["國際安全認證", "OEKO-TEX Standard 100 / CertiPUR-US 雙認證"],
        ["適用床架", "排骨架、平板床底、內嵌式床架、電動床皆相容"],
        ["試睡條款", "100 晚安心試睡體驗 (滿 30 晚享不滿意全額退費)"],
        ["原廠保固", "10 年原廠結構保固 (下陷 >2.5 cm 免費維修換新)"],
        ["配送與舊床", "全台本島免運專人配送到府定位，免費協助同尺寸舊床清運搬運"],
      ]
    : [
        ["Product Name", "Lunio Gen 4 Graphene Latex Mattress"],
        ["Country of Origin", "Made in Thailand"],
        ["Total Height", "25 cm (Approx. 10 inches)"],
        ["Firmness Rating", "6.5 / 10 Medium-Firm (Balanced Support)"],
        ["Core Materials", "4D Natural Latex + Aerospace Graphene Foam + Wave-Zone Relief Foam + Diamond Base"],
        ["Cover Fabric", "Cool-Silk Hydrophilic Cooling Tencel Fiber (Anti-dustmite)"],
        ["Certifications", "OEKO-TEX Standard 100 & CertiPUR-US Certified"],
        ["Bedframe Compatibility", "Slatted frames, flat platforms, recessed frames, adjustable bases"],
        ["Trial Period", "100-Night In-Home Trial (Full refund after 30-night adaptation)"],
        ["Warranty", "10-Year Structural Warranty (>2.5cm indentation replacement)"],
        ["Delivery & Removal", "Free white-glove doorstep setup in Taiwan + free old mattress disposal removal"],
      ];

  return (
    <div className={cn("w-full space-y-4", className)}>
      <Accordion
        type="single"
        collapsible
        defaultValue={defaultOpenItem}
        className="w-full"
      >
        <AccordionItem value="layers">
          <AccordionTrigger>
            <span className="flex items-center gap-2.5">
              <Layers className="size-5 text-primary" />
              <span>
                {isZh
                  ? "產品核心 5 層結構規格 (5-Layer Core Structure)"
                  : "Product Core 5-Layer Engineering Specs"}
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <p className="leading-relaxed">
                {isZh
                  ? "Lunio Gen 4 採用泰國天然乳膠與專利石墨烯高密度舒壓棉，精準貼合人體脊椎曲線："
                  : "Lunio Gen 4 unites Thai natural latex with aerospace graphene foam to conform to your spinal alignment:"}
              </p>
              <ul className="grid gap-2 sm:grid-cols-2">
                <li className="rounded-lg border border-border/80 bg-muted/40 p-3">
                  <div className="typo-label text-foreground">
                    {isZh ? "第 1 層：涼感天絲纖維表布" : "Layer 1: Cooling Tencel Cover"}
                  </div>
                  <div className="typo-caption text-muted-foreground mt-1">
                    {isZh
                      ? "瞬涼透氣、防蟎抗菌，觸感極致絲滑親膚。"
                      : "Instant-cool silky touch, naturally hypoallergenic and anti-dustmite."}
                  </div>
                </li>
                <li className="rounded-lg border border-border/80 bg-muted/40 p-3">
                  <div className="typo-label text-foreground">
                    {isZh ? "第 2 層：Graphene 航太石墨烯" : "Layer 2: Aerospace Graphene"}
                  </div>
                  <div className="typo-caption text-muted-foreground mt-1">
                    {isZh
                      ? "均勻導熱抗靜電，維持整夜乾爽不悶熱。"
                      : "Rapid heat dispersion and anti-static for all-night moisture-free sleep."}
                  </div>
                </li>
                <li className="rounded-lg border border-border/80 bg-muted/40 p-3">
                  <div className="typo-label text-foreground">
                    {isZh ? "第 3 層：4D 高彈力天然乳膠" : "Layer 3: 4D Natural Latex"}
                  </div>
                  <div className="typo-caption text-muted-foreground mt-1">
                    {isZh
                      ? "泰國原產天然乳膠，提供完美 Q 彈支撐防下陷。"
                      : "Pure Thai natural latex providing resilient push-back support without sagging."}
                  </div>
                </li>
                <li className="rounded-lg border border-border/80 bg-muted/40 p-3">
                  <div className="typo-label text-foreground">
                    {isZh ? "第 4 層：Wave-Zone 減壓平衡棉" : "Layer 4: Wave-Zone Transition Foam"}
                  </div>
                  <div className="typo-caption text-muted-foreground mt-1">
                    {isZh
                      ? "精準分區釋放肩頸、腰椎與臀部重力。"
                      : "Precision-zoned pressure relief tailored for shoulders, lumbar, and hips."}
                  </div>
                </li>
                <li className="rounded-lg border border-border/80 bg-muted/40 p-3 sm:col-span-2">
                  <div className="typo-label text-foreground">
                    {isZh ? "第 5 層：Diamond 穩固高支撐棉基底" : "Layer 5: Diamond High-Density Base"}
                  </div>
                  <div className="typo-caption text-muted-foreground mt-1">
                    {isZh
                      ? "全床高密度穩固吸震，翻身抗干擾，床沿不塌陷。"
                      : "High-density foundation absorbing motion transfer and reinforcing edge firmness."}
                  </div>
                </li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="trial">
          <AccordionTrigger>
            <span className="flex items-center gap-2.5">
              <RotateCcw className="size-5 text-primary" />
              <span>
                {isZh
                  ? "100 晚安心試睡體驗條款 (100-Night Trial)"
                  : "100-Night In-Home Trial Terms"}
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2 leading-relaxed">
              <p>
                {isZh
                  ? "為了讓您在家中臥室完全適應 Lunio 新床墊，自配送簽收日次日起計算 100 天內："
                  : "To let you fully adapt to your new Lunio mattress in the comfort of your home, within 100 days of delivery:"}
              </p>
              <div className="rounded-lg border border-border/80 bg-muted/40 p-3.5 space-y-2">
                <p className="typo-body-sm font-semibold text-foreground">
                  {isZh ? "試睡條款摘要：" : "Key Trial Conditions:"}
                </p>
                <p className="typo-body-sm">
                  {isZh
                    ? "1. 請試睡滿 30 晚以上，使身體骨骼肌肉完全適應人體工學結構。"
                    : "1. Please sleep on the mattress for at least 30 nights for muscular adaptation."}
                </p>
                <p className="typo-body-sm">
                  {isZh
                    ? "2. 試睡期間請使用保潔墊，保持床墊外觀整潔無污損破損。"
                    : "2. Always keep the waterproof protector on during trial to prevent stains."}
                </p>
                <p className="typo-body-sm">
                  {isZh
                    ? "3. 若仍感不適，可申請專人免費到府收回，並辦理全額退費。"
                    : "3. If unsatisfied, request free white-glove doorstep collection with a 100% full refund."}
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="warranty">
          <AccordionTrigger>
            <span className="flex items-center gap-2.5">
              <ShieldCheck className="size-5 text-primary" />
              <span>
                {isZh
                  ? "10 年原廠安心保固說明 (10-Year Warranty)"
                  : "10-Year Structural Warranty"}
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2 leading-relaxed">
              <p>
                {isZh
                  ? "Lunio 嚴選頂級材料與德國耐久度測試認證，提供長達 10 年結構保固："
                  : "Crafted with premium materials tested to German durability standards, backed by a 10-year warranty:"}
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  {isZh
                    ? "正常使用下內部乳膠與泡棉結構下陷超過 2.5 公分即可免費維修或更換。"
                    : "Structural sagging or indentation >2.5 cm under normal use qualifies for free repair/replacement."}
                </li>
                <li>
                  {isZh
                    ? "保固期內享有專人售後檢測評估服務。"
                    : "Dedicated after-sales support and on-site inspection throughout the warranty period."}
                </li>
                <li>
                  {isZh
                    ? "不包含人為割傷、外觀污損、受潮或非正常使用造成之損壞。"
                    : "Excludes damages from spills, cuts, excessive humidity or improper foundation support."}
                </li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="specs-table">
          <AccordionTrigger>
            <span className="flex items-center gap-2.5">
              <FileText className="size-5 text-primary" />
              <span>
                {isZh
                  ? "詳細規格參數表 (Technical Specifications)"
                  : "Detailed Technical Specifications"}
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              <div className="rounded-xl border border-border/80 bg-muted/30 p-4">
                {specsList.map(([label, val], idx, arr) => (
                  <React.Fragment key={label}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 text-xs sm:text-sm">
                      <span className="font-semibold text-foreground shrink-0 sm:w-36">{label}</span>
                      <span className="text-muted-foreground mt-0.5 sm:mt-0 text-left sm:text-right">{val}</span>
                    </div>
                    {idx < arr.length - 1 && <Separator className="bg-border/60" />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="shipping">
          <AccordionTrigger>
            <span className="flex items-center gap-2.5">
              <Truck className="size-5 text-primary" />
              <span>
                {isZh
                  ? "配送、安裝與舊床回收服務 (Delivery & Services)"
                  : "Delivery, White-Glove Setup & Old Mattress Removal"}
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2 leading-relaxed">
              <p>
                {isZh
                  ? "全台本島免費專人配送到府，包含搬運上樓與免費包裝拆除定位服務。"
                  : "Free delivery across Taiwan island, including walk-up stairs, unboxing and in-room positioning."}
              </p>
              <p className="typo-caption text-muted-foreground">
                {isZh
                  ? "※ 舊床墊回收：同尺寸床墊可免費協助搬運至一樓交由環保局大型廢棄物回收，或由專車協助清運回收。"
                  : "※ Old mattress removal: Free assistance carrying your old mattress of equal size down to the ground floor for municipal bulky waste pickup."}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
