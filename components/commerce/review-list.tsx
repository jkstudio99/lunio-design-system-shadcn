"use client";

import * as React from "react";
import { Camera, CheckCircle2, Star, ThumbsUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";

export type CustomerReviewItem = {
  id: string;
  authorZh: string;
  authorEn: string;
  cityZh: string;
  cityEn: string;
  rating: number;
  date: string;
  sizeId: "5.0" | "6.0" | "3.5";
  sizeLabelZh: string;
  sizeLabelEn: string;
  titleZh: string;
  titleEn: string;
  contentZh: string;
  contentEn: string;
  hasPhoto?: boolean;
  photoCaptionZh?: string;
  photoCaptionEn?: string;
  photoGradient?: string;
  helpfulCount: number;
};

const DEFAULT_REVIEWS: CustomerReviewItem[] = [
  {
    id: "rev-1",
    authorZh: "林先生",
    authorEn: "Mr. Lin",
    cityZh: "台北市大安區",
    cityEn: "Da'an Dist., Taipei",
    rating: 5,
    date: "2026-10-12",
    sizeId: "5.0",
    sizeLabelZh: "標準雙人 5 尺 (150×188 cm)",
    sizeLabelEn: "Standard Double 5 ft (150×188 cm)",
    titleZh: "困擾多年的晨起腰酸徹底消失，石墨烯散熱非常有感！",
    titleEn: "Morning lower back pain completely gone; graphene cooling is noticeable!",
    contentZh:
      "以前睡傳統獨立筒常覺得腰部懸空，換了 Lunio Gen 4 之後，泰國天然乳膠把腰椎穩穩托住，而且台灣夏天開 27 度冷氣就非常涼爽，司機大哥免費幫我們搬上 4 樓還順便把舊床搬下樓，服務滿分。",
    contentEn:
      "Used to wake up with lumbar stiffness on traditional spring beds. Lunio Gen 4 contours to my lower back effortlessly, stays cool at 27°C AC, and the delivery team carried it up to 4F and moved our old bed downstairs for free.",
    hasPhoto: true,
    photoCaptionZh: "臥室實拍 · 標準雙人 5 尺搭配天絲防蟎保潔墊",
    photoCaptionEn: "Bedroom photo · Standard Double 5 ft with Tencel protector",
    photoGradient: "from-[#1C46B4]/25 via-[#2E62ED]/10 to-slate-100 dark:to-slate-800",
    helpfulCount: 48,
  },
  {
    id: "rev-2",
    authorZh: "陳小姐",
    authorEn: "Ms. Chen",
    cityZh: "台中市西屯區",
    cityEn: "Xitun Dist., Taichung",
    rating: 5,
    date: "2026-10-09",
    sizeId: "6.0",
    sizeLabelZh: "雙人加大 6 尺 Queen (180×188 cm)",
    sizeLabelEn: "Queen Size 6 ft (180×188 cm)",
    titleZh: "淺眠伴侶救星！先生半夜起床我完全沒感覺",
    titleEn: "Lifesaver for light sleepers! Zero motion transfer when partner gets up",
    contentZh:
      "我們夫妻作息不同，以前先生翻身整張床都在晃。升級 6 尺 Queen 尺寸後不僅空間超大，抗干擾表現真的讓人驚艷，100 晚試睡讓我們買得很放心。",
    contentEn:
      "My husband and I have different schedules. Upgrading to the 6 ft Queen gave us huge space and near-zero motion transfer. The 100-night trial gave us total confidence.",
    hasPhoto: true,
    photoCaptionZh: "主臥開箱實拍 · 雙人加大 6 尺 Queen",
    photoCaptionEn: "Master bedroom unboxing · 6 ft Queen",
    photoGradient: "from-[#7347AE]/25 via-[#9786F3]/10 to-slate-100 dark:to-slate-800",
    helpfulCount: 35,
  },
  {
    id: "rev-3",
    authorZh: "張醫師",
    authorEn: "Dr. Chang",
    cityZh: "高雄市左營區",
    cityEn: "Zuoying Dist., Kaohsiung",
    rating: 5,
    date: "2026-10-04",
    sizeId: "5.0",
    sizeLabelZh: "標準雙人 5 尺 (150×188 cm)",
    sizeLabelEn: "Standard Double 5 ft (150×188 cm)",
    titleZh: "支撐度與包覆感平衡得恰到好處",
    titleEn: "Ideal balance between orthopedic support and surface comfort",
    contentZh:
      "值班後最需要深度睡眠，這張床墊不會像傳統硬床壓迫肩膀，也不會像記憶床越睡越悶熱，侧睡與仰睡都很舒服。",
    contentEn:
      "After long hospital shifts I need restorative sleep. It relieves shoulder pressure when side-sleeping without trapping heat like old memory foam.",
    hasPhoto: false,
    helpfulCount: 22,
  },
];

export function ReviewCard({
  review,
  className,
}: {
  review: CustomerReviewItem;
  className?: string;
}) {
  const { isZh } = useLanguage();
  const [helpful, setHelpful] = React.useState(false);

  return (
    <Card data-slot="review-card" className={cn("gap-0 py-0", className)}>
      <CardContent className="p-5 space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="typo-label font-bold text-foreground">
              {isZh ? review.authorZh : review.authorEn}
            </span>
            <span className="typo-caption text-muted-foreground">
              · {isZh ? review.cityZh : review.cityEn}
            </span>
            <Badge variant="success" className="gap-1 px-2 py-0 text-[10px]">
              <CheckCircle2 className="size-3" aria-hidden="true" />
              {isZh ? "已驗證購買" : "Verified Buyer"}
            </Badge>
          </div>
          <span className="font-mono text-xs text-muted-foreground">{review.date}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div
            className="flex items-center gap-0.5 text-amber-500"
            aria-label={`${review.rating} out of 5 stars`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "size-4",
                  i < review.rating ? "fill-current text-current" : "text-muted-foreground/30"
                )}
                aria-hidden="true"
              />
            ))}
          </div>
          <Badge variant="outline" className="text-[11px] font-normal py-0">
            {isZh ? review.sizeLabelZh : review.sizeLabelEn}
          </Badge>
          {review.hasPhoto && (
            <Badge variant="secondary" className="gap-1 text-[11px] py-0">
              <Camera className="size-3 text-primary" aria-hidden="true" />
              {isZh ? "附圖實拍" : "Photo Review"}
            </Badge>
          )}
        </div>

        <div>
          <h4 className="typo-h4 text-foreground">
            {isZh ? review.titleZh : review.titleEn}
          </h4>
          <p className="mt-1.5 typo-body-md text-muted-foreground">
            {isZh ? review.contentZh : review.contentEn}
          </p>
        </div>

        {review.hasPhoto && (
          <div
            className={cn(
              "flex items-center justify-between rounded-xl border border-border/70 bg-gradient-to-r p-3.5",
              review.photoGradient
            )}
          >
            <div className="flex items-center gap-2.5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-background/90 text-primary shadow-2xs">
                <Camera className="size-5" aria-hidden="true" />
              </div>
              <div>
                <div className="text-xs font-bold text-foreground">
                  {isZh ? "買家臥室開箱實拍照片" : "Verified Buyer Bedroom Photo"}
                </div>
                <div className="typo-caption text-muted-foreground">
                  {isZh ? review.photoCaptionZh : review.photoCaptionEn}
                </div>
              </div>
            </div>
            <Badge variant="outline" className="bg-background/90 text-[10px]">
              1080p HD
            </Badge>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-border/60 pt-3">
          <span className="typo-caption text-muted-foreground">
            {isZh ? "這則評價對您有幫助嗎？" : "Was this review helpful?"}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setHelpful((prev) => !prev)}
            aria-pressed={helpful}
            className={cn(
              "h-8 gap-1.5 px-2.5 text-xs",
              helpful && "text-primary font-semibold bg-primary/10"
            )}
          >
            <ThumbsUp className="size-3.5" aria-hidden="true" />
            <span>
              {isZh ? "有幫助" : "Helpful"} ({review.helpfulCount + (helpful ? 1 : 0)})
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Backlog 013 — ReviewList & ReviewCard
 * Full customer review list with total count, interactive filter pills, and photo reviews.
 */
export function ReviewList({
  reviews = DEFAULT_REVIEWS,
  totalCount = 12850,
  photoCount = 3420,
  averageScore = 4.9,
  className,
}: {
  reviews?: CustomerReviewItem[];
  totalCount?: number;
  photoCount?: number;
  averageScore?: number;
  className?: string;
}) {
  const { isZh } = useLanguage();
  const [filter, setFilter] = React.useState<"all" | "photo" | "5.0" | "6.0">("all");

  const filteredReviews = reviews.filter((r) => {
    if (filter === "photo") return Boolean(r.hasPhoto);
    if (filter === "5.0") return r.sizeId === "5.0";
    if (filter === "6.0") return r.sizeId === "6.0";
    return true;
  });

  const filters: Array<{ id: typeof filter; labelZh: string; labelEn: string }> = [
    {
      id: "all",
      labelZh: `全部評價 (${totalCount.toLocaleString()})`,
      labelEn: `All Reviews (${totalCount.toLocaleString()})`,
    },
    {
      id: "photo",
      labelZh: `附圖實拍 (${photoCount.toLocaleString()})`,
      labelEn: `With Photos (${photoCount.toLocaleString()})`,
    },
    {
      id: "5.0",
      labelZh: "標準雙人 5 尺",
      labelEn: "Double 5 ft",
    },
    {
      id: "6.0",
      labelZh: "雙人加大 6 尺",
      labelEn: "Queen 6 ft",
    },
  ];

  return (
    <div data-slot="review-list" className={cn("space-y-4", className)}>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/80 bg-card p-5 shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-3xl font-extrabold text-primary">{averageScore.toFixed(1)}</div>
            <div className="flex items-center justify-center gap-0.5 text-amber-500 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" aria-hidden="true" />
              ))}
            </div>
          </div>
          <div className="border-l border-border pl-4">
            <div className="typo-h4 text-foreground">
              {isZh
                ? `累積 ${totalCount.toLocaleString()} 則台灣買家真實評價`
                : `${totalCount.toLocaleString()} Verified Taiwan Customer Reviews`}
            </div>
            <p className="typo-body-sm text-muted-foreground">
              {isZh
                ? `98.6% 買家推薦 · 含 ${photoCount.toLocaleString()} 則臥室開箱實拍照片`
                : `98.6% buyer recommendation · ${photoCount.toLocaleString()} bedroom photo reviews`}
            </p>
          </div>
        </div>

        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label={isZh ? "篩選顧客評價" : "Filter customer reviews"}
        >
          {filters.map((f) => {
            const active = filter === f.id;
            return (
              <Button
                key={f.id}
                type="button"
                variant={active ? "default" : "outline"}
                size="sm"
                aria-pressed={active}
                onClick={() => setFilter(f.id)}
                className="h-9 text-xs"
              >
                {isZh ? f.labelZh : f.labelEn}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
