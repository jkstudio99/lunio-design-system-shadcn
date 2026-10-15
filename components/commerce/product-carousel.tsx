"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";

export type ProductPhotoSlide = {
  title: string;
  tag: string;
  desc: string;
  gradient: string;
};

const SLIDES_ZH: ProductPhotoSlide[] = [
  {
    title: "Lunio Gen 4 全新第四代石墨烯乳膠床墊",
    tag: "外觀全景",
    desc: "極致親膚涼感天絲表布，科技石墨烯調溫",
    gradient: "from-[#1C46B4]/20 via-[#4465BF]/10 to-transparent",
  },
  {
    title: "5 層人體工學黃金減壓結構剖面",
    tag: "核心技術",
    desc: "4D 泰國原產天然乳膠 + 航太級石墨烯高導熱棉",
    gradient: "from-[#7347AE]/20 via-[#8C64C4]/10 to-transparent",
  },
  {
    title: "Wave-Zone 精準分區腰椎減壓",
    tag: "支撐實測",
    desc: "完美服貼人體 7 大重點區域，翻身零干擾",
    gradient: "from-[#F28131]/20 via-[#F6A364]/10 to-transparent",
  },
  {
    title: "100 晚臥室安心試睡保證",
    tag: "原廠服務",
    desc: "全台免運配送到府定位，不合適專人免費收回",
    gradient: "from-[#10B981]/20 via-[#34D399]/10 to-transparent",
  },
];

const SLIDES_EN: ProductPhotoSlide[] = [
  {
    title: "Lunio Gen 4 Graphene Latex Mattress",
    tag: "Overview",
    desc: "Silky cooling Tencel cover with aerospace Graphene thermoregulation",
    gradient: "from-[#1C46B4]/20 via-[#4465BF]/10 to-transparent",
  },
  {
    title: "5-Layer Ergonomic Pressure-Relief Core",
    tag: "Technology",
    desc: "4D Thai Natural Latex + Graphene thermal dissipation foam",
    gradient: "from-[#7347AE]/20 via-[#8C64C4]/10 to-transparent",
  },
  {
    title: "Wave-Zone Targeted Lumbar Alignment",
    tag: "Ergonomics",
    desc: "Contours precisely to 7 body zones with zero motion transfer",
    gradient: "from-[#F28131]/20 via-[#F6A364]/10 to-transparent",
  },
  {
    title: "100-Night In-Home Trial Guarantee",
    tag: "Services",
    desc: "Free white-glove doorstep delivery with complimentary returns",
    gradient: "from-[#10B981]/20 via-[#34D399]/10 to-transparent",
  },
];

export function ProductCarousel({
  slides,
  className,
}: {
  slides?: ProductPhotoSlide[];
  className?: string;
}) {
  const { isZh } = useLanguage();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const activeSlides = slides || (isZh ? SLIDES_ZH : SLIDES_EN);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <div className={cn("relative w-full px-4 sm:px-12", className)}>
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {activeSlides.map((slide, index) => (
            <CarouselItem key={index} className="md:basis-1/2">
              <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-xs">
                <div
                  className={cn(
                    "flex h-48 w-full flex-col justify-between rounded-xl bg-gradient-to-br p-5",
                    slide.gradient
                  )}
                >
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="font-semibold text-xs">
                      {slide.tag}
                    </Badge>
                    <span className="font-mono text-xs text-muted-foreground">
                      0{index + 1} / 0{activeSlides.length}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="typo-h4 font-bold text-foreground">{slide.title}</h4>
                    <p className="typo-body-sm text-muted-foreground">{slide.desc}</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>

      {/* Slide indicator dots */}
      <div className="mt-4 flex items-center justify-center gap-1.5">
        {activeSlides.map((_, i) => (
          <Button
            key={i}
            variant="ghost"
            size="icon"
            onClick={() => api?.scrollTo(i)}
            className={cn(
              "size-2 p-0 rounded-full transition-all",
              current === i
                ? "bg-primary w-6"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
            )}
            aria-label={isZh ? `跳至第 {i + 1} 張投影片` : `Go to slide {i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
