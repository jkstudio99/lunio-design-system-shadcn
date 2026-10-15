import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/**
 * Display-only contract. Data comes from WooCommerce, never from brand tokens.
 * Give full product details and actual variation prices to the storefront PDP.
 */
export type CommerceProductSummary = {
  name: string;
  imageUrl?: string;
  imageAlt?: string;
  description?: string;
  priceLabel: string;
  regularPriceLabel?: string;
  badge?: string;
  soldOut?: boolean;
};

export function ProductCard({product,children,className}: {product:CommerceProductSummary;children?:React.ReactNode;className?:string}){
 return <Card className={cn("gap-0 overflow-hidden py-0",className)}>
   <div className="relative flex aspect-[4/3] items-center justify-center bg-muted/60 dark:bg-[#151D2C] border-b border-border/50">
    {product.imageUrl ? <img alt={product.imageAlt||product.name} src={product.imageUrl} loading="lazy" className="size-full object-cover" /> : <div aria-label="Product image pending" role="img" className="text-center typo-body-sm text-muted-foreground">產品圖片</div>}
    {product.badge&&<Badge className="absolute left-4 top-4">{product.badge}</Badge>}
   </div>
   <CardContent className="space-y-2 p-5">
    <h3 className="typo-h4 break-words">{product.name}</h3>
    {product.description&&<p className="typo-body-sm text-muted-foreground">{product.description}</p>}
    <p className="typo-price-md text-primary">{product.priceLabel}</p>
    {product.regularPriceLabel&&<p className="typo-caption text-muted-foreground line-through">{product.regularPriceLabel}</p>}
    {product.soldOut&&<Badge variant="destructive">已售完</Badge>}
    {children}
   </CardContent>
 </Card>;
}

export function ProductCardSkeleton({className}: {className?: string}) {
  return (
    <Card className={cn("gap-0 overflow-hidden py-0", className)} aria-busy="true" aria-label="產品資料載入中">
      <div className="relative flex aspect-[4/3] items-center justify-center bg-muted/50 border-b border-border/50">
        <Skeleton className="size-full rounded-none" />
      </div>
      <CardContent className="space-y-3 p-5">
        <Skeleton className="h-6 w-3/4 rounded-md" />
        <Skeleton className="h-4 w-1/2 rounded-md" />
        <div className="flex items-center justify-between pt-1">
          <Skeleton className="h-5 w-24 rounded-md" />
          <Skeleton className="h-9 w-20 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}

