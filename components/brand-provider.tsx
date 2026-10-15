"use client";
import {createContext,useCallback,useContext,useEffect,useState,type ReactNode} from "react";
import type {BrandId} from "@/lib/design-system";
const BrandContext=createContext<{brand:BrandId;setBrand:(next:BrandId)=>void}|null>(null);
export function BrandProvider({children}:{children:ReactNode}){
 const [brand,setBrand]=useState<BrandId>("lunio");
 const update=useCallback((value:BrandId)=>setBrand(value),[]);
 useEffect(()=>{document.documentElement.dataset.brand=brand;return()=>{delete document.documentElement.dataset.brand;}},[brand]);
 return <BrandContext.Provider value={{brand,setBrand:update}}><div data-brand={brand} className="min-h-screen">{children}</div></BrandContext.Provider>;
}
export function useBrand(){const c=useContext(BrandContext);if(!c)throw new Error("useBrand must be inside BrandProvider");return c}
