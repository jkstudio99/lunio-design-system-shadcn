"use client";

import { useState, useMemo, type ElementType } from "react";
import Link from "next/link";
import {
  Menu, Search, X, ChevronRight, ChevronDown, ChevronLeft, ChevronUp,
  ArrowRight, ArrowLeft, ArrowUpRight, Check, CheckCircle2, Copy,
  SlidersHorizontal, Eye, ExternalLink, Home, Settings, Filter, MoreHorizontal,
  Bed, BedDouble, BedSingle, Moon, Sun, Sparkles, Wind, Droplets,
  Cloud, Feather, Thermometer, Waves, Shield, Zap, Flame,
  ShoppingBag, ShoppingCart, CreditCard, Tag, Percent, Gift, Package,
  RotateCcw, ShieldCheck, Truck, Clock, Award, Star, Heart, BadgeCheck,
  DollarSign, Receipt, Box, RefreshCw, CheckCheck,
  Phone, Mail, MessageCircle, HelpCircle, Info, MapPin, Map, Store,
  ThumbsUp, UserCheck, Headphones, Calendar, Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/language-provider";

/**
 * Generate official Lucide React documentation URL for an icon.
 * Format: https://lucide.dev/icons/${kebab-case-name}
 */
export function getLucideOfficialUrl(iconName: string): string {
  const slug = iconName
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .replace(/([a-zA-Z])([0-9])/g, "$1-$2")
    .replace(/([0-9])([a-zA-Z])/g, "$1-$2")
    .toLowerCase();
  return `https://lucide.dev/icons/${slug}`;
}

export type IconCategory = "all" | "nav" | "sleep" | "commerce" | "support";

export interface CuratedIcon {
  name: string;
  icon: ElementType;
  category: "nav" | "sleep" | "commerce" | "support";
  labelZh: string;
  labelEn: string;
  keywords: string[];
  contextZh: string;
  contextEn: string;
}

export const curatedIcons: CuratedIcon[] = [
  // Navigation & Core Controls
  {
    name: "Menu",
    icon: Menu,
    category: "nav",
    labelZh: "漢堡導覽選單",
    labelEn: "Mobile Menu Drawer",
    keywords: ["menu", "hamburger", "nav", "選單", "導覽", "漢堡"],
    contextZh: "手機版頂部導覽列，點擊展開全站商品目錄與品牌切換抽屜。",
    contextEn: "Mobile top header bar to trigger the full-screen category mega menu.",
  },
  {
    name: "Search",
    icon: Search,
    category: "nav",
    labelZh: "站內搜尋",
    labelEn: "Search Products",
    keywords: ["search", "find", "搜尋", "尋找", "查詢", "放大鏡"],
    contextZh: "頂部導覽列商品即時搜尋、Cmd+K 快捷彈窗與搜尋建議。",
    contextEn: "Global top search bar, Cmd+K modal, and auto-complete results.",
  },
  {
    name: "X",
    icon: X,
    category: "nav",
    labelZh: "關閉 / 清除",
    labelEn: "Close / Dismiss",
    keywords: ["close", "x", "cancel", "關閉", "取消", "清除"],
    contextZh: "彈出視窗、全螢幕抽屜、搜尋列清除與促銷橫幅關閉按鈕。",
    contextEn: "Modal dialog close button, drawer dismissal, and search clearing.",
  },
  {
    name: "ChevronRight",
    icon: ChevronRight,
    category: "nav",
    labelZh: "次層級 / 前進",
    labelEn: "Chevron Right",
    keywords: ["chevron", "right", "arrow", "箭頭", "右", "下一層"],
    contextZh: "麵包屑次層級分隔、清單項日前進導引與商品詳情卡。",
    contextEn: "Breadcrumb navigation item delimiter and list row forward indicator.",
  },
  {
    name: "ChevronDown",
    icon: ChevronDown,
    category: "nav",
    labelZh: "下拉展開",
    labelEn: "Chevron Down",
    keywords: ["chevron", "down", "dropdown", "下拉", "展開", "選單"],
    contextZh: "品牌切換選單、床墊規格手風琴展開與幣別/語言選擇器。",
    contextEn: "Select trigger indicator, FAQ accordion disclosure, and language dropdown.",
  },
  {
    name: "ChevronLeft",
    icon: ChevronLeft,
    category: "nav",
    labelZh: "上一頁 / 輪播往左",
    labelEn: "Chevron Left",
    keywords: ["chevron", "left", "back", "箭頭", "左", "返回"],
    contextZh: "行動版返回上一層選單、商品圖輪播上一張控制鈕。",
    contextEn: "Mobile back button and product image carousel previous control.",
  },
  {
    name: "ChevronUp",
    icon: ChevronUp,
    category: "nav",
    labelZh: "收合內容",
    labelEn: "Chevron Up",
    keywords: ["chevron", "up", "collapse", "收合", "上", "摺疊"],
    contextZh: "床墊核心材料層結構收合、回到頁首按鈕 (Back to Top)。",
    contextEn: "Accordion collapse indicator and scroll back-to-top button.",
  },
  {
    name: "ArrowRight",
    icon: ArrowRight,
    category: "nav",
    labelZh: "前往結帳 / 下一步",
    labelEn: "Arrow Right / Action",
    keywords: ["arrow", "next", "checkout", "結帳", "下一步", "箭頭"],
    contextZh: "CTA 立即結帳按鈕、購物車結帳流程步驟指引與促銷橫幅按鈕。",
    contextEn: "Primary checkout CTA buttons and multistep order advancement.",
  },
  {
    name: "ArrowLeft",
    icon: ArrowLeft,
    category: "nav",
    labelZh: "返回前一步",
    labelEn: "Arrow Left / Back",
    keywords: ["arrow", "left", "back", "返回", "上一步"],
    contextZh: "購物車修改規格、填寫配送資料返回購物車明細。",
    contextEn: "Multi-step checkout back button and cart step navigation.",
  },
  {
    name: "ArrowUpRight",
    icon: ArrowUpRight,
    category: "nav",
    labelZh: "外部連結 / 認證手冊",
    labelEn: "External Link / Spec",
    keywords: ["external", "link", "spec", "外連", "檢驗", "手冊"],
    contextZh: "開立 SGS / OEKO-TEX 官方檢驗報告 PDF、外部評測文章連結。",
    contextEn: "External SGS certification PDF links and third-party review articles.",
  },
  {
    name: "Check",
    icon: Check,
    category: "nav",
    labelZh: "已勾選 / 選取完成",
    labelEn: "Check / Selected",
    keywords: ["check", "done", "tick", "勾選", "已選", "完成"],
    contextZh: "床墊尺寸單選方塊、配送加購服務勾選（舊床清運、加價安裝）。",
    contextEn: "Mattress size radio check mark and delivery add-on options.",
  },
  {
    name: "CheckCircle2",
    icon: CheckCircle2,
    category: "nav",
    labelZh: "成功確認 / 完成",
    labelEn: "Success Confirmation",
    keywords: ["check", "circle", "success", "成功", "確認", "完成"],
    contextZh: "加入購物車成功提示 Toast、訂單付款完成與信用認證合格標章。",
    contextEn: "Added-to-cart toast notification and order payment success screen.",
  },
  {
    name: "Copy",
    icon: Copy,
    category: "nav",
    labelZh: "一鍵複製",
    labelEn: "Copy to Clipboard",
    keywords: ["copy", "clipboard", "複製", "剪貼簿", "代碼"],
    contextZh: "複製專屬促銷折扣碼 (Promo code)、ATM 轉帳虛擬帳號與商品貨號。",
    contextEn: "Copy promo codes, ATM transfer virtual account numbers, and SKUs.",
  },
  {
    name: "SlidersHorizontal",
    icon: SlidersHorizontal,
    category: "nav",
    labelZh: "規格篩選器",
    labelEn: "Filter Specs",
    keywords: ["filter", "slider", "篩選", "過濾", "調節"],
    contextZh: "商品列表篩選面板：依台灣台尺尺寸、躺感軟硬度、高度與價位過濾。",
    contextEn: "Filter drawer for mattress sizes, firmness ratings, and budget ranges.",
  },
  {
    name: "Eye",
    icon: Eye,
    category: "nav",
    labelZh: "結構透視 / 預覽",
    labelEn: "Preview Layers",
    keywords: ["eye", "preview", "預覽", "透視", "查看"],
    contextZh: "床墊專利 5 層結構透視剖面圖互動預覽與無毒防蟎檢測報告檢視。",
    contextEn: "Interactive mattress layer cross-section inspector and gallery zoom.",
  },
  {
    name: "ExternalLink",
    icon: ExternalLink,
    category: "nav",
    labelZh: "另開新分頁",
    labelEn: "Open in New Tab",
    keywords: ["external", "tab", "link", "新分頁", "外連"],
    contextZh: "前往 Google 地圖門市路線、LINE 官方帳號加好友與部落客真實開箱。",
    contextEn: "Open Google Maps directions, official LINE account, and influencer reviews.",
  },
  {
    name: "Home",
    icon: Home,
    category: "nav",
    labelZh: "官方旗艦首頁",
    labelEn: "Storefront Home",
    keywords: ["home", "main", "首頁", "主頁", "首頁導覽"],
    contextZh: "麵包屑最前端首頁連結與行動版底部導覽列首頁捷徑。",
    contextEn: "Breadcrumb home root item and bottom mobile sticky dock.",
  },
  {
    name: "Filter",
    icon: Filter,
    category: "nav",
    labelZh: "條件過濾",
    labelEn: "Filter Criteria",
    keywords: ["filter", "funnel", "漏斗", "過濾", "篩選"],
    contextZh: "部落格睡眠專欄分類標籤過濾與顧客真實評論星等篩選。",
    contextEn: "Customer reviews star-rating filter and blog category tags.",
  },
  {
    name: "MoreHorizontal",
    icon: MoreHorizontal,
    category: "nav",
    labelZh: "更多選項",
    labelEn: "More Options",
    keywords: ["more", "dots", "options", "更多", "選單"],
    contextZh: "商品卡片分享面板、評論按讚與折疊麵包屑省略標記。",
    contextEn: "Product card share actions, review actions, and breadcrumb ellipsis.",
  },

  // Bedding & Sleep Technology
  {
    name: "Bed",
    icon: Bed,
    category: "sleep",
    labelZh: "床墊 / 寢具規格",
    labelEn: "Mattress & Bedding",
    keywords: ["bed", "mattress", "床", "床墊", "標準床", "寢具"],
    contextZh: "台灣標準規格床墊選單、床架搭配建議與寢具主分類標籤。",
    contextEn: "Taiwan standard mattress selector, bed frames, and bedding categories.",
  },
  {
    name: "BedDouble",
    icon: BedDouble,
    category: "sleep",
    labelZh: "雙人加大 / 特大規格",
    labelEn: "Queen & King Sizes",
    keywords: ["bed", "double", "queen", "king", "雙人床", "雙人加大", "特大"],
    contextZh: "台灣標準雙人 (5×6.2尺)、雙人加大 Queen (6×6.2尺) 與特大 King (6×7尺) 標記。",
    contextEn: "Taiwan standard double (5x6.2 ft), Queen (6x6.2 ft), and King (6x7 ft).",
  },
  {
    name: "BedSingle",
    icon: BedSingle,
    category: "sleep",
    labelZh: "單人 / 單人加大規格",
    labelEn: "Single & Twin Sizes",
    keywords: ["bed", "single", "twin", "單人床", "單人加大"],
    contextZh: "台灣標準單人 (3×6.2尺) 與單人加大 (3.5×6.2尺) 規格切換標籤。",
    contextEn: "Taiwan standard single (3x6.2 ft) and single large (3.5x6.2 ft) selectors.",
  },
  {
    name: "Moon",
    icon: Moon,
    category: "sleep",
    labelZh: "100 晚安心試睡",
    labelEn: "100-Night Sleep Trial",
    keywords: ["moon", "night", "trial", "sleep", "試睡", "夜晚", "月亮", "安心"],
    contextZh: "Lunio 招牌「100 晚安心試睡」保障標章，讓顧客在家真實適應好眠。",
    contextEn: "Lunio signature 100-Night Sleep Trial guarantee badge on PDP & checkout.",
  },
  {
    name: "Sun",
    icon: Sun,
    category: "sleep",
    labelZh: "晨起清爽 / 日間透氣",
    labelEn: "Morning Energy & Airflow",
    keywords: ["sun", "day", "light", "太陽", "早晨", "清爽", "透氣"],
    contextZh: "深層睡眠喚醒活力、排濕散熱測試數據與外觀淺色模式圖示。",
    contextEn: "Deep sleep rejuvenation benefits and daytime theme toggle.",
  },
  {
    name: "Sparkles",
    icon: Sparkles,
    category: "sleep",
    labelZh: "天然乳膠 / 防蟎抑菌",
    labelEn: "Antibacterial Latex",
    keywords: ["sparkles", "latex", "clean", "防蟎", "抑菌", "乳膠", "亮點", "專利"],
    contextZh: "泰國特級天然乳膠層、99% 抗菌防蟎科技表布與專利技術特色標示。",
    contextEn: "Thai premium natural latex, hypoallergenic treatment, and premium finishes.",
  },
  {
    name: "Wind",
    icon: Wind,
    category: "sleep",
    labelZh: "3D 高透氣對流技術",
    labelEn: "3D Breathable Airflow",
    keywords: ["wind", "breathable", "airflow", "透氣", "對流", "風", "散熱"],
    contextZh: "AirCool 3D 透氣網布、專利透氣通道與夏天不悶熱特點說明。",
    contextEn: "AirCool breathable 3D spacer mesh and active heat dissipation channels.",
  },
  {
    name: "Droplets",
    icon: Droplets,
    category: "sleep",
    labelZh: "吸濕排汗 / 防水保潔",
    labelEn: "Moisture-Wicking & Waterproof",
    keywords: ["droplets", "water", "moisture", "防水", "排汗", "保潔墊", "吸濕"],
    contextZh: "物理防蟎科技保潔墊、極致吸濕排汗天絲纖維表布標示。",
    contextEn: "Waterproof mattress protector specs and moisture-wicking Tencel fabric.",
  },
  {
    name: "Cloud",
    icon: Cloud,
    category: "sleep",
    labelZh: "慢回彈零重力記憶棉",
    labelEn: "Zero-Gravity Memory Foam",
    keywords: ["cloud", "soft", "memory", "foam", "記憶棉", "雲端", "慢回彈", "包覆"],
    contextZh: "NASA 研發航太等級慢回彈釋壓棉層，如躺在雲端般的服貼包覆感。",
    contextEn: "NASA-inspired pressure relief memory foam with weightless contouring.",
  },
  {
    name: "Feather",
    icon: Feather,
    category: "sleep",
    labelZh: "微型羽絲釋壓枕 / 輕柔",
    labelEn: "Ergonomic Feather Comfort",
    keywords: ["feather", "light", "pillow", "羽毛", "輕柔", "蓬鬆", "枕頭"],
    contextZh: "微型羽絲釋壓枕、天絲羽絲被與極致親膚輕柔觸感標籤。",
    contextEn: "Down-alternative ergonomic pillows and lightweight duvet covers.",
  },
  {
    name: "Thermometer",
    icon: Thermometer,
    category: "sleep",
    labelZh: "涼感溫控科技 / 四季恆溫",
    labelEn: "Cooling Temperature Regulation",
    keywords: ["thermometer", "cool", "temperature", "涼感", "恆溫", "降溫", "溫度"],
    contextZh: "KIKU 涼感紗降溫 2~3°C 檢測報告、四季智能恆溫調節層。",
    contextEn: "Instant cool-touch yarn (-2~3°C skin cooling) and thermoregulating foam.",
  },
  {
    name: "Waves",
    icon: Waves,
    category: "sleep",
    labelZh: "人體工學獨立筒五區支撐",
    labelEn: "Ergonomic 5-Zone Pocket Springs",
    keywords: ["waves", "spring", "support", "獨立筒", "彈簧", "人體工學", "支撐"],
    contextZh: "高錳鋼獨立筒彈簧、頭肩腰臀腿五段式分區脊椎減壓支撐。",
    contextEn: "5-zone ergonomic pocket coil system with targeted spinal alignment.",
  },
  {
    name: "Shield",
    icon: Shield,
    category: "sleep",
    labelZh: "SGS / OEKO-TEX 安全認證",
    labelEn: "SGS & OEKO-TEX Certified",
    keywords: ["shield", "cert", "safe", "安全", "認證", "無毒", "盾牌"],
    contextZh: "國際紡織 OEKO-TEX Standard 100 認證、無甲醛、無致癌物 SGS 檢測合格。",
    contextEn: "OEKO-TEX Standard 100 certified non-toxic fabrics and child-safe materials.",
  },
  {
    name: "Zap",
    icon: Zap,
    category: "sleep",
    labelZh: "高回彈動能 / 翻身省力",
    labelEn: "Dynamic Rebound Ergonomics",
    keywords: ["zap", "rebound", "energy", "回彈", "動能", "翻身", "閃電"],
    contextZh: "高彈性乳膠動能回饋，夜間翻身省力 40%，不干擾伴侶睡眠。",
    contextEn: "High-resilience responsive rebound that reduces motion transfer by 40%.",
  },
  {
    name: "Flame",
    icon: Flame,
    category: "sleep",
    labelZh: "阻燃防火標準 / 耐用耐磨",
    labelEn: "Flame Retardant Safety",
    keywords: ["flame", "fire", "safety", "防火", "阻燃", "耐磨", "安全"],
    contextZh: "通過國家級標準耐燃測試，居家寢具使用極致安心。",
    contextEn: "Meets international fire-retardant safety and durability benchmarks.",
  },

  // Commerce, Warranty & Delivery
  {
    name: "ShoppingBag",
    icon: ShoppingBag,
    category: "commerce",
    labelZh: "購物袋 / 購物清單",
    labelEn: "Shopping Bag / Cart Dock",
    keywords: ["bag", "cart", "shop", "購物袋", "購物車", "購買"],
    contextZh: "常駐購買列 (PDPStickyBar) 即時加入購物車按鈕與側邊購物袋抽屜。",
    contextEn: "Sticky bottom purchase bar button and slide-over mini-cart drawer.",
  },
  {
    name: "ShoppingCart",
    icon: ShoppingCart,
    category: "commerce",
    labelZh: "購物車頁面",
    labelEn: "Shopping Cart View",
    keywords: ["cart", "shopping", "checkout", "購物車", "結帳明細"],
    contextZh: "全站頂部購物車圖示（帶未結品項數字角標）與購物明細結帳頁。",
    contextEn: "Global header cart button with badge count and order checkout review.",
  },
  {
    name: "CreditCard",
    icon: CreditCard,
    category: "commerce",
    labelZh: "信用卡分期 (0 利率)",
    labelEn: "Credit Card Installments",
    keywords: ["card", "credit", "pay", "信用卡", "分期", "零利率", "付款"],
    contextZh: "支援台灣各大銀行 3/6/12 期 0 利率分期付款說明標示。",
    contextEn: "Taiwan bank 3/6/12-month zero-interest installment badges.",
  },
  {
    name: "Tag",
    icon: Tag,
    category: "commerce",
    labelZh: "促銷標籤 / 現折優惠",
    labelEn: "Promo Tag / Discount",
    keywords: ["tag", "promo", "discount", "標籤", "促銷", "現折", "特價"],
    contextZh: "商品卡片促銷標籤（滿萬折千、新品上市限時優惠）。",
    contextEn: "Product card promotional badges (e.g. NT$1,000 OFF, New Release).",
  },
  {
    name: "Percent",
    icon: Percent,
    category: "commerce",
    labelZh: "檔期折扣百分比",
    labelEn: "Discount Percentage",
    keywords: ["percent", "sale", "off", "折扣", "折數", "百分比", "特惠"],
    contextZh: "周年慶、雙 11 與新年檔期全館 85 折等促銷徽章。",
    contextEn: "Holiday campaign sale badge (e.g. 15% OFF, Double 11 Campaign).",
  },
  {
    name: "Gift",
    icon: Gift,
    category: "commerce",
    labelZh: "滿額贈品 / 隨床好禮",
    labelEn: "Complimentary Gifts",
    keywords: ["gift", "present", "free", "贈品", "好禮", "禮物", "滿額贈"],
    contextZh: "買床墊送專用原廠防蟎防水保潔墊與天絲舒眠枕兩顆贈品標示。",
    contextEn: "Bonus gift indicators: free waterproof protector and ergonomic pillows.",
  },
  {
    name: "Package",
    icon: Package,
    category: "commerce",
    labelZh: "真空壓縮捲包配送",
    labelEn: "Bed-in-a-Box Packaging",
    keywords: ["package", "box", "delivery", "包裹", "紙箱", "捲包", "包裝"],
    contextZh: "專利微米真空壓縮技術，輕鬆搬入公寓電梯與窄梯窄門。",
    contextEn: "Vacuum-compressed bed-in-a-box for easy transport through tight elevators.",
  },
  {
    name: "RotateCcw",
    icon: RotateCcw,
    category: "commerce",
    labelZh: "免費舊床回收清運",
    labelEn: "Free Mattress Recycling",
    keywords: ["recycle", "disposal", "return", "回收", "舊床", "清運", "退換貨"],
    contextZh: "專車司機免費協助將舊床搬運下樓或配合環保局指定地點回收服務。",
    contextEn: "Free removal and recycling of existing mattress upon delivery.",
  },
  {
    name: "ShieldCheck",
    icon: ShieldCheck,
    category: "commerce",
    labelZh: "10 年原廠核心保固",
    labelEn: "10-Year Factory Warranty",
    keywords: ["warranty", "guarantee", "shield", "保固", "安心", "原廠", "十年"],
    contextZh: "Lunio 全系列床墊享有 10 年原廠核心結構抗下陷品質保固承諾。",
    contextEn: "Official 10-year structural anti-sag warranty badge on every PDP.",
  },
  {
    name: "Truck",
    icon: Truck,
    category: "commerce",
    labelZh: "全台免運專車送到府",
    labelEn: "Free Nationwide Delivery",
    keywords: ["truck", "shipping", "free", "貨運", "免運", "送貨", "物流", "專車"],
    contextZh: "全台灣本島專車配送免運費到府、樓層費全免專屬承諾標籤。",
    contextEn: "Free specialized white-glove doorstep delivery across Taiwan.",
  },
  {
    name: "Clock",
    icon: Clock,
    category: "commerce",
    labelZh: "24H 快速出貨",
    labelEn: "Fast 24H Dispatch",
    keywords: ["clock", "fast", "time", "快速", "出貨", "時間", "現貨"],
    contextZh: "現貨在庫平日下單 24 小時內安排出貨與排定配送時間。",
    contextEn: "In-stock items scheduled for dispatch within 24 business hours.",
  },
  {
    name: "Award",
    icon: Award,
    category: "commerce",
    labelZh: "國際睡眠大獎認證",
    labelEn: "International Award Winner",
    keywords: ["award", "prize", "best", "大獎", "認證", "金牌", "獎牌"],
    contextZh: "榮獲國際設計大獎、泰國第一品牌獎與破百位名人推薦標章。",
    contextEn: "Prestigious design awards and Thailand's #1 mattress brand endorsement.",
  },
  {
    name: "Star",
    icon: Star,
    category: "commerce",
    labelZh: "4.9 顆星破萬評價",
    labelEn: "4.9-Star Verified Reviews",
    keywords: ["star", "rating", "review", "評價", "好評", "星星", "滿意度"],
    contextZh: "商品星等評分元件 (ProductRating)、顧客評語列表星號展示。",
    contextEn: "Star rating widget and verified buyer review aggregations.",
  },
  {
    name: "Heart",
    icon: Heart,
    category: "commerce",
    labelZh: "加入我的最愛 / 收藏",
    labelEn: "Wishlist / Save to Favorites",
    keywords: ["heart", "favorite", "like", "愛心", "收藏", "我的最愛", "喜愛"],
    contextZh: "商品卡片與詳情頁右上角加入願望清單按鈕。",
    contextEn: "Product card quick-save icon and user account wishlist drawer.",
  },
  {
    name: "BadgeCheck",
    icon: BadgeCheck,
    category: "commerce",
    labelZh: "官方直營正品保證",
    labelEn: "Official Authentic Guarantee",
    keywords: ["badge", "authentic", "official", "官方", "正品", "直營", "旗艦"],
    contextZh: "台灣唯一官方授權總代理、杜絕水貨與山寨品防偽標章。",
    contextEn: "Official direct-to-consumer store badge guaranteeing authentic imports.",
  },
  {
    name: "DollarSign",
    icon: DollarSign,
    category: "commerce",
    labelZh: "透明價格 / 無隱藏費用",
    labelEn: "Transparent Pricing",
    keywords: ["price", "money", "dollar", "價格", "金額", "透明", "無隱藏"],
    contextZh: "標價即為含稅含運含安裝實收金額，絕無樓層費或夜間加價。",
    contextEn: "All-inclusive pricing with zero hidden fees or stairs surcharges.",
  },
  {
    name: "Receipt",
    icon: Receipt,
    category: "commerce",
    labelZh: "電子發票 / 載具歸戶",
    labelEn: "E-Invoice / Receipt",
    keywords: ["invoice", "receipt", "發票", "收據", "載具", "統編"],
    contextZh: "結帳支援財政部手機條碼載具、自然人憑證與公司三聯式統一編號。",
    contextEn: "Taiwan Ministry of Finance electronic invoice and business tax ID support.",
  },
  {
    name: "Box",
    icon: Box,
    category: "commerce",
    labelZh: "原廠彩盒包裝",
    labelEn: "Gift & Product Box",
    keywords: ["box", "package", "紙盒", "包裝", "禮盒"],
    contextZh: "原廠枕頭獨立精美彩盒、保潔墊禮盒包裝與隨附贈品開箱標示。",
    contextEn: "Retail packaging box for pillows, mattress pads, and bed accessories.",
  },
  {
    name: "RefreshCw",
    icon: RefreshCw,
    category: "commerce",
    labelZh: "換貨支援 / 試睡換款",
    labelEn: "Exchange & Size Adjustment",
    keywords: ["refresh", "swap", "換貨", "調整", "試睡換款", "旋轉"],
    contextZh: "試睡期間若軟硬度或尺寸不符，提供專人一對一換款調整支援。",
    contextEn: "Trial period firmness exchange and seamless size upgrade support.",
  },
  {
    name: "CheckCheck",
    icon: CheckCheck,
    category: "commerce",
    labelZh: "訂單確認 / 專人排約",
    labelEn: "Order Confirmed & Scheduled",
    keywords: ["check", "double", "confirmed", "確認", "排約", "專人"],
    contextZh: "訂單完成後專人於 24 小時內去電確認送貨地址與預約時段。",
    contextEn: "White-glove delivery scheduling confirmation with dedicated agent.",
  },

  // Stores & Customer Support
  {
    name: "Phone",
    icon: Phone,
    category: "support",
    labelZh: "客服專線電話諮詢",
    labelEn: "Phone Consultation",
    keywords: ["phone", "call", "電話", "客服", "專線", "撥打"],
    contextZh: "官方免付費客服專線 (平日 10:00 - 19:00) 點擊直接撥打。",
    contextEn: "Direct phone support hotline for orders, logistics and warranty.",
  },
  {
    name: "Mail",
    icon: Mail,
    category: "support",
    labelZh: "售後服務信箱",
    labelEn: "Email Support",
    keywords: ["mail", "email", "信箱", "電子郵件", "聯絡"],
    contextZh: "保固申請、企業大量採購 (B2B) 與售後支援官方信箱。",
    contextEn: "Warranty claims, enterprise B2B inquiries, and contact form.",
  },
  {
    name: "MessageCircle",
    icon: MessageCircle,
    category: "support",
    labelZh: "LINE 官方即時諮詢",
    labelEn: "Official LINE Support",
    keywords: ["line", "chat", "message", "客服", "即時", "對話", "諮詢"],
    contextZh: "台灣顧客最常用 LINE@ 官方帳號，一對一專屬睡眠顧問線上即時諮詢。",
    contextEn: "Taiwan's most popular messaging channel (LINE@) for 1-on-1 advice.",
  },
  {
    name: "HelpCircle",
    icon: HelpCircle,
    category: "support",
    labelZh: "常見問答 (FAQ)",
    labelEn: "Frequently Asked Questions",
    keywords: ["faq", "help", "question", "問答", "常見問題", "幫助"],
    contextZh: "試睡條款、保固細節、清潔保養與各尺寸床架搭配指南 FAQ。",
    contextEn: "Knowledge base covering trial policies, cleaning, and bed frame sizing.",
  },
  {
    name: "Info",
    icon: Info,
    category: "support",
    labelZh: "重要注意事項 / 規格提示",
    labelEn: "Important Notice & Care",
    keywords: ["info", "notice", "notice", "資訊", "提示", "注意事項"],
    contextZh: "床墊拆箱回彈建議時間（需靜置 24-48 小時）與保養提醒標籤。",
    contextEn: "Unboxing guidelines (allow 24-48 hours full expansion) and safety tips.",
  },
  {
    name: "MapPin",
    icon: MapPin,
    category: "support",
    labelZh: "實體門市體驗據點",
    labelEn: "Showroom Locations",
    keywords: ["map", "pin", "location", "門市", "據點", "地址", "體驗館"],
    contextZh: "台北旗艦店、台中概念館、高雄體驗據點地址與地圖標記。",
    contextEn: "Taipei flagship, Taichung concept store, and Kaohsiung showroom pins.",
  },
  {
    name: "Map",
    icon: Map,
    category: "support",
    labelZh: "交通與停車導引",
    labelEn: "Store Map & Parking",
    keywords: ["map", "directions", "parking", "地圖", "導航", "停車", "交通"],
    contextZh: "門市專屬特約停車場指引與捷運站步行路線圖示。",
    contextEn: "Store parking directions and nearest MRT transit station walk guide.",
  },
  {
    name: "Store",
    icon: Store,
    category: "support",
    labelZh: "門市預約現場試躺",
    labelEn: "Book Showroom Trial",
    keywords: ["store", "showroom", "trial", "門市", "體驗", "試躺", "預約"],
    contextZh: "線上預約專屬門市試躺時段，享有專業睡眠顧問一對一導覽服務。",
    contextEn: "Schedule a personalized 1-on-1 showroom trial with a sleep expert.",
  },
  {
    name: "ThumbsUp",
    icon: ThumbsUp,
    category: "support",
    labelZh: "98% 高滿意度推薦",
    labelEn: "98% Customer Satisfaction",
    keywords: ["thumbs", "recommend", "like", "推薦", "讚", "滿意度", "好評"],
    contextZh: "超過 50,000 名台灣家庭滿意推薦信任標章。",
    contextEn: "Trust guarantee reflecting over 50,000 verified happy sleepers.",
  },
  {
    name: "UserCheck",
    icon: UserCheck,
    category: "support",
    labelZh: "物理治療師專業推薦",
    labelEn: "Physiotherapist Endorsed",
    keywords: ["expert", "doctor", "physio", "物理治療師", "專家", "醫生", "推薦"],
    contextZh: "台灣執業物理治療師專屬背書推薦（脊椎護腰釋壓結構認證）。",
    contextEn: "Endorsed by licensed physiotherapists for spinal ergonomics.",
  },
  {
    name: "Headphones",
    icon: Headphones,
    category: "support",
    labelZh: "真人線上客戶服務",
    labelEn: "Live Customer Service",
    keywords: ["support", "agent", "service", "真人", "客服", "耳機", "諮詢"],
    contextZh: "非機器人，由專業受訓之 Lunio 睡眠顧問提供真人親切解答。",
    contextEn: "Dedicated human support team for personalized sleep consultations.",
  },
  {
    name: "Calendar",
    icon: Calendar,
    category: "support",
    labelZh: "線上預約體驗時段",
    labelEn: "Schedule Appointment",
    keywords: ["calendar", "date", "booking", "預約", "日曆", "時間", "排程"],
    contextZh: "線上預約系統：挑選門市、日期與時段，享受免排隊 VIP 試躺服務。",
    contextEn: "Showroom calendar appointment picker for VIP private sleep trial.",
  },
  {
    name: "Globe",
    icon: Globe,
    category: "support",
    labelZh: "跨國多品牌旗艦商城",
    labelEn: "Global Multi-Brand Network",
    keywords: ["globe", "world", "taiwan", "全球", "國際", "台灣", "地球"],
    contextZh: "Lunio 跨足台灣、泰國等亞太市場，頂級寢具指標品牌。",
    contextEn: "International sleep wellness brand trusted across Taiwan and Southeast Asia.",
  },
];

export function IconsGallery() {
  const { isZh } = useLanguage();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<IconCategory>("all");
  const [size, setSize] = useState<number>(24);
  const [strokeWidth, setStrokeWidth] = useState<number>(2);
  const [colorClass, setColorClass] = useState<string>("text-primary");
  const [activeIcon, setActiveIcon] = useState<CuratedIcon | null>(null);
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const categories: Array<{ id: IconCategory; labelZh: string; labelEn: string; count: number }> = useMemo(() => {
    return [
      { id: "all", labelZh: "全部圖示", labelEn: "All Icons", count: curatedIcons.length },
      { id: "nav", labelZh: "導覽與核心控制", labelEn: "Navigation & UI", count: curatedIcons.filter((i) => i.category === "nav").length },
      { id: "sleep", labelZh: "睡眠科技與床墊", labelEn: "Sleep & Bedding", count: curatedIcons.filter((i) => i.category === "sleep").length },
      { id: "commerce", labelZh: "電商交易與保固", labelEn: "Commerce & Warranty", count: curatedIcons.filter((i) => i.category === "commerce").length },
      { id: "support", labelZh: "門市導引與客服", labelEn: "Stores & Support", count: curatedIcons.filter((i) => i.category === "support").length },
    ];
  }, []);

  const filteredIcons = useMemo(() => {
    const q = search.trim().toLowerCase();
    return curatedIcons.filter((item) => {
      const matchCat = category === "all" || item.category === category;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.labelZh.toLowerCase().includes(q) ||
        item.labelEn.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.toLowerCase().includes(q))
      );
    });
  }, [search, category]);

  async function copySnippet(text: string, iconName: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedName(iconName);
      setTimeout(() => setCopiedName(null), 1800);
    } catch {
      setCopiedName(null);
    }
  }

  return (
    <div className="space-y-8">
      {/* Banner linking to Custom Icons Studio */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl border border-primary/20 bg-primary/5">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[10px] uppercase font-semibold text-primary border-primary/30 bg-primary/10">
              {isZh ? "Lunio 品牌專屬" : "Lunio Brand Exclusive"}
            </Badge>
            <span className="text-sm font-semibold text-foreground">
              {isZh ? "需要自訂品牌圖示或標準庫以外的標章？" : "Need custom brand icons not in standard Lucide?"}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {isZh
              ? "前往「自訂圖示工作室」：支援 SVG 拖曳上傳清理、Token 著色即時預覽與 React JSX 元件匯出。"
              : "Visit the Custom Icons Studio: upload raw SVGs, auto-sanitize to currentColor, preview across tokens, and export JSX."}
          </p>
        </div>
        <Button asChild size="sm" className="h-8 shrink-0 gap-1.5 shadow-xs">
          <Link href="/docs/custom-icons">
            <span>{isZh ? "自訂圖示工作室" : "Custom Icons Studio"}</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </Button>
      </div>

      {/* Search & Customization Control Bar */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isZh ? "搜尋圖示名稱、中文說明或關鍵字（例：Bed, 購物車, 試睡, 保固, 運送）…" : "Search icons by name, keyword or concept (e.g. Bed, cart, sleep, warranty)…"}
              className="pl-10 pr-9 h-11 text-sm bg-background border-border/80 rounded-xl"
              aria-label={isZh ? "搜尋圖示" : "Search icons"}
            />
            {search && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearch("")}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 size-7 p-0 rounded-lg text-muted-foreground hover:text-foreground"
                aria-label={isZh ? "清除搜尋" : "Clear search"}
              >
                <X className="size-3.5" />
              </Button>
            )}
          </div>

          {/* Size Pills */}
          <div className="flex items-center gap-1.5 border border-border/70 rounded-xl p-1 bg-muted/30">
            <span className="px-2 text-[11px] font-semibold text-muted-foreground">
              {isZh ? "尺寸" : "Size"}
            </span>
            {[16, 20, 24, 32].map((s) => (
              <Button
                key={s}
                variant={size === s ? "default" : "ghost"}
                size="sm"
                onClick={() => setSize(s)}
                className={cn("h-7 px-2.5 text-xs font-mono rounded-lg", size === s ? "shadow-xs" : "")}
              >
                {s}px
              </Button>
            ))}
          </div>

          {/* Stroke Width */}
          <div className="flex items-center gap-1.5 border border-border/70 rounded-xl p-1 bg-muted/30">
            <span className="px-2 text-[11px] font-semibold text-muted-foreground">
              {isZh ? "線條" : "Stroke"}
            </span>
            {[1.5, 2, 2.5].map((w) => (
              <Button
                key={w}
                variant={strokeWidth === w ? "default" : "ghost"}
                size="sm"
                onClick={() => setStrokeWidth(w)}
                className={cn("h-7 px-2.5 text-xs font-mono rounded-lg", strokeWidth === w ? "shadow-xs" : "")}
              >
                {w}px
              </Button>
            ))}
          </div>
        </div>

        {/* Categories & Results Count */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/60">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((c) => (
              <Button
                key={c.id}
                variant={category === c.id ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setCategory(c.id)}
                className={cn(
                  "h-8 px-3 text-xs rounded-lg transition-all",
                  category === c.id && "bg-primary/10 text-primary font-semibold hover:bg-primary/15"
                )}
              >
                {isZh ? c.labelZh : c.labelEn}
                <Badge variant="outline" className="ml-1.5 text-[10px] px-1 py-0 h-4 border-border/60">
                  {c.count}
                </Badge>
              </Button>
            ))}
          </div>

          <div className="text-xs text-muted-foreground font-mono">
            {isZh ? `顯示 ${filteredIcons.length} / ${curatedIcons.length} 組圖示` : `Showing ${filteredIcons.length} of ${curatedIcons.length} icons`}
          </div>
        </div>
      </div>

      {/* Grid of Icons */}
      {filteredIcons.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-card">
          <Search className="size-10 mx-auto text-muted-foreground/60 mb-3" />
          <h3 className="text-base font-semibold text-foreground">
            {isZh ? "未找到相符的圖示" : "No matching icons found"}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
            {isZh ? "請嘗試其他關鍵字，或切換至「全部圖示」分類。" : "Try searching for a different keyword or switch to 'All Icons'."}
          </p>
          <Button variant="outline" size="sm" onClick={() => { setSearch(""); setCategory("all"); }} className="mt-4">
            {isZh ? "重設所有搜尋條件" : "Reset search filters"}
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {filteredIcons.map((item) => {
            const IconComponent = item.icon;
            const isCopied = copiedName === item.name;
            const snippet = `<${item.name} className="size-${size === 16 ? "4" : size === 20 ? "5" : size === 24 ? "6" : "8"}" />`;

            return (
              <div
                key={item.name}
                className="group relative flex flex-col items-center justify-between rounded-xl border border-border/80 bg-card p-4 transition-all hover:border-primary/60 hover:shadow-md hover:bg-card/90"
              >
                {/* Clickable Card Body to View Details */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveIcon(item)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActiveIcon(item); } }}
                  className="w-full flex flex-col items-center cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg py-2"
                  aria-label={`${item.name} - ${isZh ? item.labelZh : item.labelEn}`}
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-muted/40 transition-colors group-hover:bg-primary/10">
                    <IconComponent
                      size={size}
                      strokeWidth={strokeWidth}
                      className={cn(colorClass, "transition-transform group-hover:scale-110 duration-200")}
                      aria-hidden="true"
                    />
                  </div>

                  <span className="mt-3 font-mono text-[13px] font-bold text-foreground tracking-tight text-center truncate max-w-full">
                    {item.name}
                  </span>

                  <span className="mt-0.5 text-[11px] text-muted-foreground text-center line-clamp-1">
                    {isZh ? item.labelZh : item.labelEn}
                  </span>
                </div>

                {/* Bottom Quick Actions: Details & Copy JSX */}
                <div className="w-full mt-2 pt-2 border-t border-border/50 flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveIcon(item)}
                    className="h-6 px-1.5 text-[10px] text-muted-foreground hover:text-foreground"
                  >
                    {isZh ? "詳情" : "Details"}
                  </Button>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={isCopied ? "default" : "outline"}
                        size="sm"
                        onClick={() => copySnippet(snippet, item.name)}
                        className={cn(
                          "h-6 px-2 text-[10px] font-mono gap-1 transition-all",
                          isCopied ? "bg-emerald-600 hover:bg-emerald-600 text-white border-emerald-600" : "text-muted-foreground hover:text-foreground"
                        )}
                        aria-label={isCopied ? (isZh ? "已複製！" : "Copied!") : (isZh ? `複製 <${item.name} />` : `Copy <${item.name} />`)}
                      >
                        {isCopied ? <Check className="size-3" /> : <Copy className="size-3" />}
                        <span>{isCopied ? (isZh ? "已複製" : "Copied") : "JSX"}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs">
                      {isCopied ? (isZh ? "已複製到剪貼簿！" : "Copied to clipboard!") : (isZh ? `點擊複製 ${snippet}` : `Click to copy ${snippet}`)}
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detailed Modal for Active Icon */}
      {activeIcon && (
        <Dialog open={!!activeIcon} onOpenChange={(open) => { if (!open) setActiveIcon(null); }}>
          <DialogContent className="max-w-lg p-6">
            <DialogHeader className="pr-8">
              <div className="flex items-center gap-3.5">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <activeIcon.icon size={28} strokeWidth={strokeWidth} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <DialogTitle className="text-xl font-bold font-mono truncate">
                    {activeIcon.name}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground mt-0.5">
                    {isZh ? activeIcon.labelZh : activeIcon.labelEn}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-4 my-2">
              {/* Context in Lunio Storefront */}
              <div className="rounded-xl border border-border/80 bg-muted/30 p-3.5 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                  {isZh ? "lunio.com.tw 實務應用情境" : "Application in lunio.com.tw"}
                </span>
                <p className="text-xs leading-relaxed text-foreground">
                  {isZh ? activeIcon.contextZh : activeIcon.contextEn}
                </p>
              </div>

              {/* Import Statement */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-muted-foreground">
                  {isZh ? "React / Next.js 引用語法" : "React / Next.js Import"}
                </span>
                <div className="flex items-center justify-between rounded-lg border border-border bg-slate-950 p-2.5 text-xs font-mono text-slate-200">
                  <span>{`import { ${activeIcon.name} } from "lucide-react";`}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copySnippet(`import { ${activeIcon.name} } from "lucide-react";`, `${activeIcon.name}-import`)}
                    className="h-6 px-2 text-[10px] text-slate-300 hover:text-white"
                  >
                    {copiedName === `${activeIcon.name}-import` ? <Check className="size-3 text-emerald-400 mr-1" /> : <Copy className="size-3 mr-1" />}
                    {copiedName === `${activeIcon.name}-import` ? (isZh ? "已複製" : "Copied") : (isZh ? "複製" : "Copy")}
                  </Button>
                </div>
              </div>

              {/* JSX Usage */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-muted-foreground">
                  {isZh ? "標準 JSX 語法 (含無障礙屬性)" : "JSX Usage (with accessibility attribute)"}
                </span>
                <div className="flex items-center justify-between rounded-lg border border-border bg-slate-950 p-2.5 text-xs font-mono text-slate-200">
                  <span>{`<${activeIcon.name} className="size-${size === 16 ? "4" : size === 20 ? "5" : size === 24 ? "6" : "8"} text-primary" aria-hidden="true" />`}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copySnippet(`<${activeIcon.name} className="size-${size === 16 ? "4" : size === 20 ? "5" : size === 24 ? "6" : "8"} text-primary" aria-hidden="true" />`, `${activeIcon.name}-jsx`)}
                    className="h-6 px-2 text-[10px] text-slate-300 hover:text-white"
                  >
                    {copiedName === `${activeIcon.name}-jsx` ? <Check className="size-3 text-emerald-400 mr-1" /> : <Copy className="size-3 mr-1" />}
                    {copiedName === `${activeIcon.name}-jsx` ? (isZh ? "已複製" : "Copied") : (isZh ? "複製" : "Copy")}
                  </Button>
                </div>
              </div>

              {/* Keywords */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-muted-foreground">
                  {isZh ? "關鍵字標籤" : "Keywords"}
                </span>
                <div className="flex flex-wrap gap-1">
                  {activeIcon.keywords.map((k) => (
                    <Badge key={k} variant="secondary" className="text-[10px] px-2 py-0.5">
                      #{k}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border/60">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              >
                <a
                  href={getLucideOfficialUrl(activeIcon.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={isZh ? `在 Lucide 官方查看 ${activeIcon.name} 規範與原始 SVG` : `View ${activeIcon.name} official spec on Lucide`}
                >
                  <ExternalLink className="size-3.5 text-primary" />
                  <span>{isZh ? "查看 Lucide 官方規範" : "View Lucide Official Spec"}</span>
                </a>
              </Button>

              <Button
                variant="default"
                size="sm"
                onClick={() => setActiveIcon(null)}
                className="h-8 px-4 text-xs"
              >
                {isZh ? "完成關閉" : "Close"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
