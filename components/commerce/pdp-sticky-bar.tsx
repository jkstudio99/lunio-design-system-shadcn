import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
type PDPStickyBarProps={sizeLabel?:string;priceLabel:string;inStock:boolean;ready:boolean;onAdd?:()=>void;className?:string;demo?:boolean};
/** Demo mode intentionally doesn't execute a purchase; production must validate WooCommerce cart state. */
export function PDPStickyBar({sizeLabel,priceLabel,inStock,ready,onAdd,className,demo=false}:PDPStickyBarProps){return <div className={cn("flex flex-wrap items-center justify-between gap-4 border border-border bg-background p-4 shadow-lg",className)}>
  <div><p className="typo-caption text-muted-foreground">已選擇：{sizeLabel||'請選擇商品規格'}</p><p className="typo-price-md mt-1 text-primary">{priceLabel}</p></div>
  <Button type="button" disabled={!ready||!inStock||demo||!onAdd} onClick={onAdd}>{!inStock?'已售完':!ready?'請選擇商品規格':'加入購物車'}</Button>
 </div>}
