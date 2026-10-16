"use client";

import * as React from "react";
import { Check, MapPin, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";

export type TaiwanDistrictOption = {
  nameZh: string;
  nameEn: string;
  zip: string;
};

export type TaiwanCityOption = {
  id: string;
  nameZh: string;
  nameEn: string;
  districts: TaiwanDistrictOption[];
};

export const TAIWAN_CITIES: TaiwanCityOption[] = [
  {
    id: "taipei",
    nameZh: "台北市",
    nameEn: "Taipei City",
    districts: [
      { nameZh: "大安區", nameEn: "Da'an Dist.", zip: "106" },
      { nameZh: "信義區", nameEn: "Xinyi Dist.", zip: "110" },
      { nameZh: "中山區", nameEn: "Zhongshan Dist.", zip: "104" },
      { nameZh: "內湖區", nameEn: "Neihu Dist.", zip: "114" },
      { nameZh: "士林區", nameEn: "Shilin Dist.", zip: "111" },
    ],
  },
  {
    id: "new-taipei",
    nameZh: "新北市",
    nameEn: "New Taipei City",
    districts: [
      { nameZh: "板橋區", nameEn: "Banqiao Dist.", zip: "220" },
      { nameZh: "新店區", nameEn: "Xindian Dist.", zip: "231" },
      { nameZh: "中和區", nameEn: "Zhonghe Dist.", zip: "235" },
      { nameZh: "林口區", nameEn: "Linkou Dist.", zip: "244" },
    ],
  },
  {
    id: "taoyuan",
    nameZh: "桃園市",
    nameEn: "Taoyuan City",
    districts: [
      { nameZh: "桃園區", nameEn: "Taoyuan Dist.", zip: "330" },
      { nameZh: "中壢區", nameEn: "Zhongli Dist.", zip: "320" },
      { nameZh: "竹北市 (大新竹生活圈)", nameEn: "Zhubei / Hsinchu", zip: "302" },
    ],
  },
  {
    id: "taichung",
    nameZh: "台中市",
    nameEn: "Taichung City",
    districts: [
      { nameZh: "西屯區", nameEn: "Xitun Dist.", zip: "407" },
      { nameZh: "南屯區", nameEn: "Nantun Dist.", zip: "408" },
      { nameZh: "北屯區", nameEn: "Beitun Dist.", zip: "406" },
    ],
  },
  {
    id: "tainan",
    nameZh: "台南市",
    nameEn: "Tainan City",
    districts: [
      { nameZh: "東區", nameEn: "East Dist.", zip: "701" },
      { nameZh: "永康區", nameEn: "Yongkang Dist.", zip: "710" },
      { nameZh: "安平區", nameEn: "Anping Dist.", zip: "708" },
    ],
  },
  {
    id: "kaohsiung",
    nameZh: "高雄市",
    nameEn: "Kaohsiung City",
    districts: [
      { nameZh: "左營區", nameEn: "Zuoying Dist.", zip: "813" },
      { nameZh: "鼓山區", nameEn: "Gushan Dist.", zip: "804" },
      { nameZh: "三民區", nameEn: "Sanmin Dist.", zip: "807" },
    ],
  },
];

export function CheckoutStepper({
  currentStep = 2,
  onStepChange,
  className,
}: {
  currentStep?: 1 | 2 | 3;
  onStepChange?: (step: 1 | 2 | 3) => void;
  className?: string;
}) {
  const { isZh } = useLanguage();
  const steps: Array<{ step: 1 | 2 | 3; titleZh: string; titleEn: string; descZh: string; descEn: string }> = [
    {
      step: 1,
      titleZh: "購物車與加價購",
      titleEn: "Cart & Add-Ons",
      descZh: "確認床墊尺寸與隨貨贈品",
      descEn: "Verify mattress SKU & gifts",
    },
    {
      step: 2,
      titleZh: "台灣配送地址與樓層",
      titleEn: "Taiwan Delivery & Floor",
      descZh: "縣市區郵遞區號與搬上樓設定",
      descEn: "City, district, zip & floor setup",
    },
    {
      step: 3,
      titleZh: "付款方式與訂單完成",
      titleEn: "Payment & Confirmation",
      descZh: "12期0利率 / LINE Pay / Apple Pay",
      descEn: "0% APR / LINE Pay / Apple Pay",
    },
  ];

  return (
    <nav
      data-slot="checkout-stepper"
      aria-label={isZh ? "結帳進度步驟" : "Checkout progress steps"}
      className={cn("grid gap-3 sm:grid-cols-3", className)}
    >
      {steps.map((item) => {
        const isCompleted = item.step < currentStep;
        const isActive = item.step === currentStep;
        return (
          <Button
            key={item.step}
            type="button"
            variant="outline"
            onClick={() => onStepChange?.(item.step)}
            aria-current={isActive ? "step" : undefined}
            className={cn(
              "h-auto items-start justify-start gap-3 rounded-xl border p-3.5 text-left transition-all",
              isActive
                ? "border-primary ring-1 ring-primary bg-primary/5 dark:bg-primary/15"
                : isCompleted
                ? "border-emerald-500/40 bg-emerald-500/5"
                : "border-border/80 bg-card"
            )}
          >
            <span
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : isCompleted
                  ? "bg-emerald-600 text-white"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {isCompleted ? <Check className="size-3.5" aria-hidden="true" /> : item.step}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-foreground truncate">
                {isZh ? item.titleZh : item.titleEn}
              </div>
              <div className="typo-caption text-muted-foreground truncate mt-0.5">
                {isZh ? item.descZh : item.descEn}
              </div>
            </div>
          </Button>
        );
      })}
    </nav>
  );
}

/**
 * Backlog 007 — TaiwanAddressForm & CheckoutStepper
 * Taiwan cascading address selector (縣市, 區, 郵遞區號 auto-fill) + checkout progress stepper.
 */
export function TaiwanAddressForm({ className }: { className?: string }) {
  const { isZh } = useLanguage();
  const [step, setStep] = React.useState<1 | 2 | 3>(2);
  const [cityId, setCityId] = React.useState("taipei");
  const currentCity =
    TAIWAN_CITIES.find((c) => c.id === cityId) || TAIWAN_CITIES[0];
  const [districtZip, setDistrictZip] = React.useState(
    currentCity.districts[0].zip
  );
  const [street, setStreet] = React.useState("仁愛路四段 112 巷 8 號 4 樓");
  const [hasElevator, setHasElevator] = React.useState(true);
  const [needOldBedRemoval, setNeedOldBedRemoval] = React.useState(true);

  const handleCityChange = (nextCityId: string) => {
    setCityId(nextCityId);
    const nextCity = TAIWAN_CITIES.find((c) => c.id === nextCityId);
    if (nextCity && nextCity.districts[0]) {
      setDistrictZip(nextCity.districts[0].zip);
    }
  };

  const selectedDistrict =
    currentCity.districts.find((d) => d.zip === districtZip) ||
    currentCity.districts[0];

  return (
    <div
      data-slot="taiwan-address-form"
      className={cn("space-y-5", className)}
    >
      <CheckoutStepper currentStep={step} onStepChange={setStep} />

      <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-2xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-4">
          <div className="flex items-center gap-2">
            <MapPin className="size-4 text-primary" aria-hidden="true" />
            <h3 className="typo-h4 text-foreground">
              {isZh ? "台灣本島專人配送收件地址" : "Taiwan Delivery Address & Floor Details"}
            </h3>
          </div>
          <Badge variant="success" className="gap-1">
            <Truck className="size-3" aria-hidden="true" />
            {isZh ? "郵遞區號自動帶入" : "Auto Postal Code"}
          </Badge>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <Label htmlFor="tw-city-select">
              {isZh ? "縣市 (City / County)" : "City / County"}
            </Label>
            <Select value={cityId} onValueChange={handleCityChange}>
              <SelectTrigger id="tw-city-select" className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper">
                {TAIWAN_CITIES.map((city) => (
                  <SelectItem key={city.id} value={city.id}>
                    {isZh ? city.nameZh : city.nameEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="tw-district-select">
              {isZh ? "鄉鎮市區 (District)" : "District"}
            </Label>
            <Select value={districtZip} onValueChange={setDistrictZip}>
              <SelectTrigger id="tw-district-select" className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper">
                {currentCity.districts.map((dist) => (
                  <SelectItem key={dist.zip} value={dist.zip}>
                    {isZh ? dist.nameZh : dist.nameEn} ({dist.zip})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="tw-postal-code">
              {isZh ? "郵遞區號 (自動帶入)" : "Postal Code (Auto-filled)"}
            </Label>
            <Input
              id="tw-postal-code"
              value={selectedDistrict.zip}
              readOnly
              aria-readonly="true"
              className="mt-2 font-mono font-bold bg-muted/50 text-primary"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="tw-street-address">
            {isZh ? "詳細街道巷弄與門牌樓層" : "Street Address & Floor"}
          </Label>
          <Input
            id="tw-street-address"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder={isZh ? "請輸入路街、段、巷弄、號、樓層" : "Road, Section, Lane, Number, Floor"}
            className="mt-2"
          />
          <p className="mt-1.5 typo-caption text-muted-foreground" aria-live="polite">
            {isZh
              ? `完整配送地址預覽：${selectedDistrict.zip} ${currentCity.nameZh}${selectedDistrict.nameZh}${street}`
              : `Full shipping address: ${selectedDistrict.zip} ${selectedDistrict.nameEn}, ${currentCity.nameEn} — ${street}`}
          </p>
        </div>

        <div className="grid gap-3 pt-1 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-xl border border-border/70 bg-muted/30 p-3.5">
            <Checkbox
              id="tw-has-elevator"
              checked={hasElevator}
              onCheckedChange={(v) => setHasElevator(v === true)}
            />
            <Label htmlFor="tw-has-elevator" className="cursor-pointer leading-5">
              <span className="font-semibold text-foreground block">
                {isZh ? "配送地址具備電梯 (免樓層搬運費)" : "Building has Elevator (Free upstairs delivery)"}
              </span>
              <span className="typo-caption text-muted-foreground">
                {isZh
                  ? "無電梯公寓 1–5 樓亦享免費人工搬運上樓定位"
                  : "1–5F walk-up apartments also receive free manual carry"}
              </span>
            </Label>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-border/70 bg-muted/30 p-3.5">
            <Checkbox
              id="tw-old-bed-removal"
              checked={needOldBedRemoval}
              onCheckedChange={(v) => setNeedOldBedRemoval(v === true)}
            />
            <Label htmlFor="tw-old-bed-removal" className="cursor-pointer leading-5">
              <span className="font-semibold text-foreground block">
                {isZh ? "需要免費協助將同尺寸舊床搬至一樓" : "Request free old mattress ground-floor removal"}
              </span>
              <span className="typo-caption text-muted-foreground">
                {isZh
                  ? "司機配送新床時同步協助搬運下樓"
                  : "Driver moves your old mattress to 1F upon delivery"}
              </span>
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}
