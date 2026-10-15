"use client";

import { useState, useMemo, useRef, type ChangeEvent, type DragEvent } from "react";
import {
  Upload, Download, Copy, Check, Sparkles, RefreshCw, FileCode2,
  Eye, CheckCircle2, AlertCircle, Trash2, ArrowUpRight, Palette,
  Maximize2, ShieldCheck, HelpCircle, Layers, SlidersHorizontal, ZoomIn
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/language-provider";

export interface PreloadedIcon {
  id: string;
  name: string;
  labelZh: string;
  labelEn: string;
  descZh: string;
  descEn: string;
  category: string;
  svg: string;
}

export const PRELOADED_LUNIO_ICONS: PreloadedIcon[] = [
  {
    id: "lunio-bedding-seal",
    name: "LunioBeddingSeal",
    labelZh: "Lunio Bedding 官方認證印章",
    labelEn: "Lunio Bedding Official Seal",
    descZh: "官方寢具真品防偽標章，象徵台灣官方正品與嚴苛品保檢驗合格。",
    descEn: "Authentic seal mark for Lunio bedding certifications, genuine warranty cards and premium product tags.",
    category: "Brand Trust",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="9" r="7" />
  <path d="M10.5 6.5v5h3" />
  <path d="m8.5 15.5-3.5 6.5 7-2.5 7 2.5-3.5-6.5" />
  <path d="m14 7.5 1.5 1.5" />
</svg>`
  },
  {
    id: "zero-gravity-contour",
    name: "ZeroGravityContour",
    labelZh: "零重力釋壓人體曲線圖",
    labelEn: "Zero-Gravity Pressure Relief Contour",
    descZh: "描繪人體平躺時頸部、腰部與臀部的零重力服貼曲度，應用於釋壓科技介紹。",
    descEn: "Ergonomic body contour curve showing spine alignment, floating sensation, and pressure distribution vectors.",
    category: "Sleep Ergonomics",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 19h20" />
  <path d="M3 15c2.5-3 5-3.5 8-1s5.5 2 9-2" />
  <circle cx="5" cy="7" r="2" />
  <path d="M7 9c2-1 3.5 0 5 2s3 1.5 6-1" />
  <path d="M8 19v-2M12 19v-3M16 19v-2" />
</svg>`
  },
  {
    id: "natural-latex-drop",
    name: "NaturalLatexDrop",
    labelZh: "泰國特級天然乳膠認證標章",
    labelEn: "Premium Thai Natural Latex Droplet",
    descZh: "泰國高純度天然橡膠樹液萃取純度標記，應用於防蟎抗菌乳膠層解說。",
    descEn: "Botanical latex droplet symbol denoting 100% natural Thai rubber sap purity and hypo-allergenic properties.",
    category: "Material Certification",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2.5C8 7.5 5 11 5 15a7 7 0 0 0 14 0c0-4-3-7.5-7-12.5z" />
  <path d="M12 11c0 3-1.5 5-4 5" />
  <path d="M12 13c1.5 1.5 3 1.5 4 0" />
  <circle cx="12" cy="18" r="1" fill="currentColor" />
</svg>`
  },
  {
    id: "five-zone-spine",
    name: "FiveZoneSpine",
    labelZh: "五段式人體脊椎護腰分區",
    labelEn: "5-Zone Ergonomic Spine Alignment",
    descZh: "頭頸、肩背、腰椎、骨盆、腿部五段獨立分區支撐標章，強調人體工學護腰減壓。",
    descEn: "Orthopedic five-zone mattress core representation for targeted spinal posture support.",
    category: "Spine Support",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2v20" />
  <path d="M8 4h8" />
  <path d="M6 8h12" />
  <path d="M5 12h14" />
  <path d="M6 16h12" />
  <path d="M8 20h8" />
  <circle cx="12" cy="12" r="2" />
</svg>`
  },
  {
    id: "hundred-night-bed",
    name: "HundredNightBed",
    labelZh: "100晚安心試睡官方床墊專屬標誌",
    labelEn: "100-Night Risk-Free Sleep Guarantee",
    descZh: "官方 100 晚安心試睡計畫，不滿意專人免費清運退款之專屬信任圖騰。",
    descEn: "Official 100-night in-home trial trust mark combining bedroom bedframe and night moon reassurance.",
    category: "Commerce Trust",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 19h20" />
  <path d="M4 19v-4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
  <path d="M4 11V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
  <path d="M18 3.5a4 4 0 1 0 3 5.5 3.5 3.5 0 0 1-3-5.5z" />
  <path d="M7 10h2" />
</svg>`
  }
];

export interface SanitizeOptions {
  convertToCurrentColor: boolean;
  componentName: string;
  iconMode?: "stroke" | "fill";
}

export interface SanitizeResult {
  isValid: boolean;
  error: string | null;
  warnings: string[];
  viewBox: string;
  cleanSvg: string;
  innerSvg: string;
  reactJsx: string;
  sanitizedComponentName: string;
}

/**
 * Client-Side SVG Parser & Sanitizer
 * - Strips dangerous tags: <script>, <style>, <foreignObject>, <iframe>, <object>, <embed>, <applet>, <meta>, <link>, <base>
 * - Strips inline event handlers (onclick, onload, etc.)
 * - Strips javascript:, vbscript: and dangerous data: protocol URLs
 * - Converts inline CSS styles (style="fill:...; stroke:...") to valid SVG attributes so React JSX does not crash
 * - Converts kebab-case SVG attributes to React camelCase (stroke-width -> strokeWidth, vector-effect -> vectorEffect, etc.)
 * - Converts hardcoded color values to 'currentColor' for token cascading
 * - Ensures componentName is a valid TypeScript/JavaScript identifier (prefixes leading digits with 'Icon')
 * - Normalizes viewBox to 0 0 24 24 when appropriate
 */
export function sanitizeAndParseSvg(rawInput: string, options: SanitizeOptions): SanitizeResult {
  const warnings: string[] = [];
  const trimmed = rawInput.trim();

  if (!trimmed) {
    return {
      isValid: false,
      error: "請輸入或上傳 SVG 代碼",
      warnings: [],
      viewBox: "0 0 24 24",
      cleanSvg: "",
      innerSvg: "",
      reactJsx: "",
      sanitizedComponentName: "CustomIcon"
    };
  }

  if (!trimmed.includes("<svg") && !trimmed.includes("<SVG")) {
    return {
      isValid: false,
      error: "輸入內容未包含 <svg> 根節點標籤",
      warnings: [],
      viewBox: "0 0 24 24",
      cleanSvg: "",
      innerSvg: "",
      reactJsx: "",
      sanitizedComponentName: "CustomIcon"
    };
  }

  let working = trimmed;

  // 1. Strip XML declaration, DOCTYPE and comments
  working = working.replace(/<\?xml[\s\S]*?\?>/gi, "");
  working = working.replace(/<!DOCTYPE[\s\S]*?>/gi, "");
  working = working.replace(/<!--[\s\S]*?-->/g, "");

  // 2. Strip dangerous tags
  const dangerousTags = ["script", "style", "foreignObject", "iframe", "object", "embed", "applet", "meta", "link", "base"];
  for (const tag of dangerousTags) {
    const tagRegex = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>|<${tag}\\b[^>]*\\/?>`, "gi");
    if (tagRegex.test(working)) {
      warnings.push(`已移除潛在不安全標籤 <${tag}>`);
      working = working.replace(tagRegex, "");
    }
  }

  // 3. Strip event handlers (on* attributes)
  const eventRegex = /\s*on[a-zA-Z]+\s*=\s*(?:["'][^"']*["']|[^\s>]+)/gi;
  if (eventRegex.test(working)) {
    warnings.push("已移除內嵌 JavaScript 事件處理器 (如 onclick, onload)");
    working = working.replace(eventRegex, "");
  }

  // 4. Strip javascript:, vbscript: and dangerous data: protocol URLs
  const dangerousHrefRegex = /\s*(?:href|xlink:href)\s*=\s*(?:["']\s*(?:javascript|vbscript|data):[^"']*["']|[^\s>]*(?:javascript|vbscript|data):[^\s>]*)/gi;
  if (dangerousHrefRegex.test(working)) {
    warnings.push("已移除含有 javascript: 或 data: 協定之超連結");
    working = working.replace(dangerousHrefRegex, "");
  }

  // 5. Convert inline CSS style attributes (e.g. style="fill: #1C46B4; stroke: #333") into SVG attributes
  // This prevents React runtime errors where string styles crash JSX execution
  const styleAttrRegex = /\bstyle\s*=\s*["']([^"']+)["']/gi;
  if (styleAttrRegex.test(working)) {
    warnings.push("已將 inline CSS 樣式轉換為標準 SVG 標籤屬性");
    working = working.replace(styleAttrRegex, (match, styleContent: string) => {
      const rules = styleContent.split(";");
      const attrs: string[] = [];
      for (const rule of rules) {
        const parts = rule.split(":");
        if (parts.length === 2) {
          const prop = parts[0].trim().toLowerCase();
          const val = parts[1].trim();
          if (["fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin", "opacity", "fill-opacity", "stroke-opacity", "fill-rule"].includes(prop)) {
            attrs.push(`${prop}="${val}"`);
          }
        }
      }
      return attrs.length > 0 ? attrs.join(" ") : "";
    });
  }

  // 6. Extract viewBox or synthesize from width/height
  let viewBox = "0 0 24 24";
  const viewBoxMatch = working.match(/viewBox\s*=\s*["']([^"']+)["']/i);
  if (viewBoxMatch && viewBoxMatch[1]) {
    viewBox = viewBoxMatch[1].trim();
  } else {
    const widthMatch = working.match(/width\s*=\s*["'](\d+)["']/i);
    const heightMatch = working.match(/height\s*=\s*["'](\d+)["']/i);
    if (widthMatch && heightMatch) {
      viewBox = `0 0 ${widthMatch[1]} ${heightMatch[1]}`;
      warnings.push(`未偵測到 viewBox，已自動依寬高轉換為 viewBox="${viewBox}"`);
    } else {
      warnings.push("未偵測到 viewBox，已自動套用預設 0 0 24 24");
    }
  }

  // 7. Extract inner content between <svg ...> and </svg>
  const openTagMatch = working.match(/<svg\b([^>]*)>/i);
  if (!openTagMatch) {
    return {
      isValid: false,
      error: "無法解析 <svg> 起始標籤",
      warnings,
      viewBox,
      cleanSvg: "",
      innerSvg: "",
      reactJsx: "",
      sanitizedComponentName: "CustomIcon"
    };
  }

  let inner = working
    .replace(/<svg\b[^>]*>/i, "")
    .replace(/<\/svg\s*>/i, "")
    .trim();

  // 8. Hardcoded color conversion to currentColor if enabled
  if (options.convertToCurrentColor) {
    const initialInner = inner;
    // Replace hex, rgb, hsl, or named colors in stroke and fill attributes (preserving "none" and "currentColor")
    inner = inner.replace(/stroke\s*=\s*["'](?!none\b|currentColor\b)[^"']+["']/gi, 'stroke="currentColor"');
    inner = inner.replace(/fill\s*=\s*["'](?!none\b|currentColor\b)[^"']+["']/gi, 'fill="currentColor"');
    if (initialInner !== inner) {
      warnings.push("已將寫死色碼 (hex/rgb) 轉換為 currentColor 以支援 Tailwind 語意色彩");
    }
  }

  // Determine icon mode (stroke vs solid fill)
  const isSolidFill = options.iconMode === "fill";
  const rootFill = isSolidFill ? "currentColor" : "none";
  const rootStroke = isSolidFill ? "none" : "currentColor";
  const rootStrokeWidth = isSolidFill ? "0" : "2";

  // Clean raw SVG code
  const cleanSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="${viewBox}" fill="${rootFill}" stroke="${rootStroke}" stroke-width="${rootStrokeWidth}" stroke-linecap="round" stroke-linejoin="round">\n  ${inner}\n</svg>`;

  // 9. Convert attributes to React JSX conventions
  const jsxAttrMap: Record<string, string> = {
    "stroke-width": "strokeWidth",
    "stroke-linecap": "strokeLinecap",
    "stroke-linejoin": "strokeLinejoin",
    "stroke-miterlimit": "strokeMiterlimit",
    "stroke-dasharray": "strokeDasharray",
    "stroke-dashoffset": "strokeDashoffset",
    "stroke-opacity": "strokeOpacity",
    "fill-opacity": "fillOpacity",
    "fill-rule": "fillRule",
    "clip-path": "clipPath",
    "clip-rule": "clipRule",
    "vector-effect": "vectorEffect",
    "class": "className",
    "xmlns:xlink": "xmlnsXlink",
    "xlink:href": "xlinkHref",
    "color-interpolation": "colorInterpolation",
    "stop-color": "stopColor",
    "stop-opacity": "stopOpacity",
    "font-size": "fontSize",
    "font-family": "fontFamily",
    "font-weight": "fontWeight",
    "letter-spacing": "letterSpacing",
    "text-anchor": "textAnchor",
    "dominant-baseline": "dominantBaseline",
    "alignment-baseline": "alignmentBaseline",
    "shape-rendering": "shapeRendering",
    "image-rendering": "imageRendering"
  };

  let reactInner = inner;
  for (const [kebab, camel] of Object.entries(jsxAttrMap)) {
    const attrRegex = new RegExp(`\\b${kebab}=`, "g");
    reactInner = reactInner.replace(attrRegex, `${camel}=`);
  }

  // Indent react inner lines for pristine code generation
  const formattedReactInner = reactInner
    .split("\n")
    .map((line) => (line.trim() ? `      ${line.trim()}` : ""))
    .join("\n");

  // 10. Sanitize Component Name into a strictly valid TypeScript / JavaScript identifier
  let rawName = options.componentName.trim().replace(/[^a-zA-Z0-9]/g, "");
  if (!rawName) {
    rawName = "CustomIcon";
  } else if (/^[0-9]/.test(rawName)) {
    rawName = `Icon${rawName}`;
  }
  const componentName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

  const reactJsx = `import type { SVGProps } from "react";

export interface ${componentName}Props extends SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

/**
 * ${componentName} — Lunio Brand Custom Vector Icon
 * Bounding box: ${viewBox} · Default stroke: ${isSolidFill ? "0" : "2"}px · Responsive currentColor
 */
export function ${componentName}({
  size = 24,
  strokeWidth = ${isSolidFill ? "0" : "2"},
  className,
  ...props
}: ${componentName}Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="${viewBox}"
      fill="${rootFill}"
      stroke="${rootStroke}"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
${formattedReactInner}
    </svg>
  );
}
`;

  return {
    isValid: true,
    error: null,
    warnings,
    viewBox,
    cleanSvg,
    innerSvg: inner,
    reactJsx,
    sanitizedComponentName: componentName
  };
}

export function CustomIconsStudio() {
  const { isZh } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Studio states
  const [activePreloadId, setActivePreloadId] = useState<string>("lunio-bedding-seal");
  const [componentName, setComponentName] = useState<string>("LunioBeddingSeal");
  const [rawSvg, setRawSvg] = useState<string>(PRELOADED_LUNIO_ICONS[0].svg);
  const [size, setSize] = useState<number>(24);
  const [zoom, setZoom] = useState<1 | 2 | 4>(2);
  const [strokeWidth, setStrokeWidth] = useState<number>(2);
  const [colorRole, setColorRole] = useState<string>("primary");
  const [backdrop, setBackdrop] = useState<"checker" | "light" | "dark">("checker");
  const [iconMode, setIconMode] = useState<"stroke" | "fill">("stroke");
  const [convertToCurrentColor, setConvertToCurrentColor] = useState<boolean>(true);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [copiedType, setCopiedType] = useState<"jsx" | "svg" | null>(null);
  const [preloadCopiedId, setPreloadCopiedId] = useState<string | null>(null);

  // Parse result derived memo
  const parsed = useMemo(() => {
    return sanitizeAndParseSvg(rawSvg, {
      convertToCurrentColor,
      componentName,
      iconMode
    });
  }, [rawSvg, convertToCurrentColor, componentName, iconMode]);

  // Color mappings
  const colorClasses: Record<string, string> = {
    primary: "text-primary",
    foreground: "text-foreground",
    muted: "text-muted-foreground",
    amber: "text-amber-500",
    emerald: "text-emerald-500"
  };

  const currentColorClass = colorClasses[colorRole] || "text-primary";

  // Handle preloaded icon selection
  function handleSelectPreloaded(icon: PreloadedIcon) {
    setActivePreloadId(icon.id);
    setComponentName(icon.name);
    setRawSvg(icon.svg);
  }

  // Quick copy preloaded icon JSX
  async function handleQuickCopyPreloaded(icon: PreloadedIcon) {
    const res = sanitizeAndParseSvg(icon.svg, {
      convertToCurrentColor: true,
      componentName: icon.name,
      iconMode: "stroke"
    });
    try {
      await navigator.clipboard.writeText(res.reactJsx);
      setPreloadCopiedId(icon.id);
      setTimeout(() => setPreloadCopiedId(null), 1800);
    } catch {
      setPreloadCopiedId(null);
    }
  }

  // Convert uploaded filename to clean PascalCase component name
  function nameFromFilename(fileName: string): string {
    const baseName = fileName.replace(/\.svg$/i, "");
    let pascal = baseName
      .split(/[-_\s]+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join("");
    if (!pascal) return "CustomIcon";
    if (/^[0-9]/.test(pascal)) pascal = `Icon${pascal}`;
    return pascal;
  }

  // Handle file drop
  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith(".svg") || file.type.includes("svg")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          if (content) {
            setRawSvg(content);
            setComponentName(nameFromFilename(file.name));
            setActivePreloadId("");
          }
        };
        reader.readAsText(file);
      }
    }
  }

  // Handle file input
  function handleFileInput(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          setRawSvg(content);
          setComponentName(nameFromFilename(file.name));
          setActivePreloadId("");
        }
      };
      reader.readAsText(file);
    }
  }

  // Copy helper
  async function copyToClipboard(text: string, type: "jsx" | "svg") {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 1800);
    } catch {
      setCopiedType(null);
    }
  }

  // Download .svg file
  function handleDownloadSvg() {
    if (!parsed.cleanSvg) return;
    const blob = new Blob([parsed.cleanSvg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${parsed.sanitizedComponentName.toLowerCase().replace(/[^a-z0-9]/g, "-") || "lunio-custom-icon"}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-12">
      {/* Preloaded Lunio Brand Icons Showcase */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-wider text-primary border-primary/30 bg-primary/10">
                {isZh ? "官方品牌圖騰" : "PROPRIETARY BRAND MARKS"}
              </Badge>
              <span className="text-xs text-muted-foreground font-mono">5 Custom SVGs</span>
            </div>
            <h2 className="text-lg font-bold text-foreground mt-1">
              {isZh ? "Lunio 台灣專屬客製向量標章" : "Lunio Taiwan Proprietary Custom Icons"}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {isZh
                ? "非標準 Lucide 圖庫之專利床墊結構、天然乳膠檢驗標章與安心試睡官方標誌，點擊卡片即可載入工作室，亦可直接一鍵複製語法。"
                : "Brand-proprietary marks not available in Lucide React: bedding certification seal, ergonomic curves, latex purity, and guarantee badges."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {PRELOADED_LUNIO_ICONS.map((icon) => {
            const isSelected = activePreloadId === icon.id;
            const isCopied = preloadCopiedId === icon.id;
            return (
              <Card
                key={icon.id}
                onClick={() => handleSelectPreloaded(icon)}
                className={cn(
                  "cursor-pointer transition-all hover:border-primary/60 hover:shadow-sm text-left group relative flex flex-col justify-between",
                  isSelected ? "border-primary ring-1 ring-primary/40 bg-primary/5" : "bg-card"
                )}
              >
                <CardContent className="p-3.5 space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="size-10 rounded-xl bg-muted/50 group-hover:bg-primary/15 transition-colors flex items-center justify-center text-primary">
                      <div
                        className="size-6 transition-transform group-hover:scale-110 duration-200"
                        dangerouslySetInnerHTML={{
                          __html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full">${icon.svg.replace(/<svg\b[^>]*>/i, "").replace(/<\/svg\s*>/i, "")}</svg>`
                        }}
                      />
                    </div>
                    {isSelected ? (
                      <Badge variant="default" className="text-[10px] h-5 px-1.5 font-sans bg-primary">
                        {isZh ? "已載入" : "Active"}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-[9px] h-4 px-1 text-muted-foreground border-border/70 font-mono">
                        {icon.category}
                      </Badge>
                    )}
                  </div>

                  <div>
                    <div className="font-mono text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
                      {icon.name}
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                      {isZh ? icon.labelZh : icon.labelEn}
                    </div>
                  </div>

                  <p className="text-[10px] text-muted-foreground/80 line-clamp-2 leading-relaxed">
                    {isZh ? icon.descZh : icon.descEn}
                  </p>
                </CardContent>

                {/* Card Quick Action Bar */}
                <div className="p-2.5 pt-0 border-t border-border/40 mt-1 flex items-center justify-between gap-1">
                  <span className="text-[10px] font-mono text-muted-foreground/70">
                    24×24px
                  </span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={isCopied ? "default" : "outline"}
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuickCopyPreloaded(icon);
                        }}
                        className={cn(
                          "h-6 px-2 text-[10px] font-mono gap-1 transition-all",
                          isCopied ? "bg-emerald-600 hover:bg-emerald-700 text-white border-transparent" : "text-muted-foreground hover:text-foreground"
                        )}
                        aria-label={`Copy JSX for ${icon.name}`}
                      >
                        {isCopied ? <Check className="size-2.5" /> : <Copy className="size-2.5" />}
                        <span>{isCopied ? (isZh ? "已複製" : "Copied") : "JSX"}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs">
                      {isZh ? `立即複製 ${icon.name} React JSX` : `Quick copy ${icon.name} JSX`}
                    </TooltipContent>
                  </Tooltip>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Main Studio Interactive Workspace */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="size-5 text-primary" />
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              {isZh ? "向量圖示解析與預覽工作室" : "Interactive SVG Studio & Parser"}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="font-mono text-xs">
              viewBox: {parsed.viewBox}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Upload / Paste & Options */}
          <div className="lg:col-span-6 space-y-4">
            <Card className="border-border">
              <CardHeader className="p-4 pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                    <Upload className="size-4 text-primary" />
                    <span>{isZh ? "檔案上傳與原始碼" : "Upload or Paste SVG"}</span>
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setRawSvg("");
                      setActivePreloadId("");
                      setComponentName("CustomIcon");
                    }}
                    className="h-7 px-2 text-xs text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-3.5 mr-1" />
                    {isZh ? "清空" : "Clear"}
                  </Button>
                </div>
                <CardDescription className="text-xs">
                  {isZh
                    ? "支援拖曳 .svg 檔案或直接貼上 <svg>...</svg> 向量原始碼。"
                    : "Drag and drop .svg files or paste raw XML markup from Figma."}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-4 pt-0 space-y-4">
                {/* Drag and Drop Zone */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    "border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2",
                    isDragOver ? "border-primary bg-primary/10" : "border-border hover:border-primary/50 hover:bg-muted/30"
                  )}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".svg,image/svg+xml"
                    onChange={handleFileInput}
                    className="hidden"
                    aria-label="Upload SVG File"
                  />
                  <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Upload className="size-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-foreground">
                      {isZh ? "點擊選擇或拖曳 SVG 檔案至此" : "Click to browse or drop SVG file here"}
                    </span>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {isZh ? "支援標準 SVG 1.1 / 2.0，最大 2MB" : "Supports SVG 1.1 / 2.0 vector exports"}
                    </p>
                  </div>
                </div>

                {/* Direct SVG Code Input */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground">
                      {isZh ? "SVG 向量代碼" : "SVG Code Markup"}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {rawSvg.length} {isZh ? "字元" : "chars"}
                    </span>
                  </div>
                  <Textarea
                    value={rawSvg}
                    onChange={(e) => {
                      setRawSvg(e.target.value);
                      setActivePreloadId("");
                    }}
                    placeholder='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">...</svg>'
                    rows={6}
                    className="font-mono text-xs resize-y bg-slate-950 text-slate-200 border-border"
                    aria-label="SVG Raw Code"
                  />
                </div>

                {/* Component Name & Formatting Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-muted-foreground">
                      {isZh ? "React 元件名稱" : "React Component Name"}
                    </span>
                    <Input
                      value={componentName}
                      onChange={(e) => setComponentName(e.target.value)}
                      placeholder="MyCustomIcon"
                      className="font-mono text-xs h-9 bg-background"
                      aria-label="Component Name"
                    />
                    <span className="text-[10px] font-mono text-muted-foreground block">
                      export: {parsed.sanitizedComponentName}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {/* currentColor switch */}
                    <div className="flex items-center justify-between border border-border rounded-xl p-2 bg-muted/20">
                      <div className="space-y-0.5 pr-2">
                        <span className="text-xs font-semibold text-foreground block">
                          {isZh ? "轉為 currentColor" : "Use currentColor"}
                        </span>
                        <span className="text-[10px] text-muted-foreground block">
                          {isZh ? "相容 Tailwind text-*" : "Cascade text-* tokens"}
                        </span>
                      </div>
                      <Button
                        variant={convertToCurrentColor ? "default" : "outline"}
                        size="sm"
                        onClick={() => setConvertToCurrentColor(!convertToCurrentColor)}
                        className="h-7 text-xs font-mono"
                      >
                        {convertToCurrentColor ? (isZh ? "已啟用" : "ON") : (isZh ? "原始色" : "OFF")}
                      </Button>
                    </div>

                    {/* Stroke vs Solid mode */}
                    <div className="flex items-center justify-between border border-border rounded-xl p-2 bg-muted/20">
                      <div className="space-y-0.5 pr-2">
                        <span className="text-xs font-semibold text-foreground block">
                          {isZh ? "圖示型態" : "Render Mode"}
                        </span>
                        <span className="text-[10px] text-muted-foreground block">
                          {iconMode === "stroke" ? (isZh ? "線條 (Lucide 標準)" : "Stroke outline") : (isZh ? "填色 (實心印章)" : "Solid fill")}
                        </span>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setIconMode(iconMode === "stroke" ? "fill" : "stroke")}
                        className="h-7 text-xs font-mono"
                      >
                        {iconMode === "stroke" ? "Stroke" : "Solid"}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Sanitizer Feedback / Warnings */}
                {parsed.error ? (
                  <div className="flex items-start gap-2 p-3 rounded-xl border border-destructive/40 bg-destructive/10 text-destructive text-xs">
                    <AlertCircle className="size-4 shrink-0 mt-0.5" />
                    <span>{parsed.error}</span>
                  </div>
                ) : (
                  parsed.warnings.length > 0 && (
                    <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs space-y-1">
                      <div className="font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="size-3.5 text-amber-500" />
                        <span>{isZh ? "安全清理與最佳化紀錄" : "Sanitizer Optimizations Applied"}</span>
                      </div>
                      <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                        {parsed.warnings.map((w, idx) => (
                          <li key={idx}>{w}</li>
                        ))}
                      </ul>
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Live Interactive Preview & Export */}
          <div className="lg:col-span-6 space-y-4">
            <Card className="border-border">
              <CardHeader className="p-4 pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                    <Eye className="size-4 text-primary" />
                    <span>{isZh ? "即時預覽與 Token 調整" : "Live Preview & Token Studio"}</span>
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono text-[10px]">
                      {size}px · {strokeWidth}px stroke
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-4 pt-0 space-y-4">
                {/* Control Toolbars: Color, Size, Stroke, Zoom, Backdrop */}
                <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-xl border border-border/80 bg-muted/20">
                  {/* Color Selector */}
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-semibold text-muted-foreground mr-1">
                      {isZh ? "色彩" : "Color"}:
                    </span>
                    {[
                      { id: "primary", label: "Primary", bg: "bg-primary" },
                      { id: "foreground", label: "Ink", bg: "bg-foreground" },
                      { id: "muted", label: "Muted", bg: "bg-muted-foreground" },
                      { id: "amber", label: "Amber", bg: "bg-amber-500" },
                      { id: "emerald", label: "Emerald", bg: "bg-emerald-500" },
                    ].map((c) => (
                      <Button
                        key={c.id}
                        variant={colorRole === c.id ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setColorRole(c.id)}
                        className={cn("h-7 px-2 text-xs gap-1.5", colorRole === c.id ? "shadow-xs" : "")}
                      >
                        <span className={cn("size-2 rounded-full", c.bg)} />
                        <span>{c.label}</span>
                      </Button>
                    ))}
                  </div>

                  <Separator orientation="vertical" className="h-5" />

                  {/* Size Selector */}
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-semibold text-muted-foreground mr-1">
                      {isZh ? "尺寸" : "Size"}:
                    </span>
                    {[16, 20, 24, 32, 48].map((s) => (
                      <Button
                        key={s}
                        variant={size === s ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setSize(s)}
                        className={cn("h-7 px-2 text-xs font-mono", size === s ? "shadow-xs" : "")}
                      >
                        {s}px
                      </Button>
                    ))}
                  </div>

                  <Separator orientation="vertical" className="h-5" />

                  {/* Stroke Selector */}
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-semibold text-muted-foreground mr-1">
                      {isZh ? "線條" : "Stroke"}:
                    </span>
                    {[1.5, 2.0, 2.5].map((w) => (
                      <Button
                        key={w}
                        variant={strokeWidth === w ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setStrokeWidth(w)}
                        className={cn("h-7 px-2 text-xs font-mono", strokeWidth === w ? "shadow-xs" : "")}
                      >
                        {w}px
                      </Button>
                    ))}
                  </div>

                  <Separator orientation="vertical" className="h-5" />

                  {/* Zoom Multiplier Selector */}
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-semibold text-muted-foreground mr-1">
                      {isZh ? "檢視" : "Zoom"}:
                    </span>
                    {[
                      { value: 1, label: "1x" },
                      { value: 2, label: "2x" },
                      { value: 4, label: "4x" },
                    ].map((z) => (
                      <Button
                        key={z.value}
                        variant={zoom === z.value ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setZoom(z.value as 1 | 2 | 4)}
                        className={cn("h-7 px-2 text-xs font-mono", zoom === z.value ? "shadow-xs" : "")}
                      >
                        {z.label}
                      </Button>
                    ))}
                  </div>

                  <Separator orientation="vertical" className="h-5" />

                  {/* Backdrop Selector */}
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-semibold text-muted-foreground mr-1">
                      {isZh ? "底色" : "Backdrop"}:
                    </span>
                    {[
                      { id: "checker", label: "Grid" },
                      { id: "light", label: "Light" },
                      { id: "dark", label: "Dark" },
                    ].map((b) => (
                      <Button
                        key={b.id}
                        variant={backdrop === b.id ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setBackdrop(b.id as any)}
                        className="h-7 px-2 text-xs font-mono"
                      >
                        {b.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Interactive Preview Canvas with Scoped Theme Contrast */}
                <div
                  className={cn(
                    "relative h-56 rounded-2xl border flex flex-col items-center justify-center p-6 transition-all overflow-hidden",
                    backdrop === "checker" && "bg-[conic-gradient(#e2e8f0_90deg,#f8fafc_90deg_180deg,#e2e8f0_180deg_270deg,#f8fafc_270deg)] [background-size:16px_16px] dark:bg-[conic-gradient(#1e293b_90deg,#0f172a_90deg_180deg,#1e293b_180deg_270deg,#0f172a_270deg)] border-border",
                    backdrop === "light" && "bg-white border-slate-200 text-slate-900 [--foreground:#1A1829] [--muted-foreground:#647086]",
                    backdrop === "dark" && "dark bg-slate-950 border-slate-800 text-slate-100 [--foreground:#F1F5F9] [--muted-foreground:#94A3B8]"
                  )}
                >
                  {parsed.isValid ? (
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div
                        className={cn("transition-all duration-150 flex items-center justify-center", currentColorClass)}
                        style={{ width: `${size * zoom}px`, height: `${size * zoom}px` }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox={parsed.viewBox}
                          fill={iconMode === "fill" ? "currentColor" : "none"}
                          stroke={iconMode === "fill" ? "none" : "currentColor"}
                          strokeWidth={iconMode === "fill" ? 0 : strokeWidth}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-full h-full"
                          aria-hidden="true"
                          dangerouslySetInnerHTML={{ __html: parsed.innerSvg }}
                        />
                      </div>
                      <Badge variant="outline" className="font-mono text-[10px] bg-background/80 backdrop-blur-xs">
                        {size}px {zoom > 1 ? `(${zoom}x view: ${size * zoom}px)` : "(1:1 scale)"} · {iconMode === "fill" ? "solid fill" : `${strokeWidth}px stroke`}
                      </Badge>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground text-xs">
                      {isZh ? "請輸入有效的 SVG 以預覽" : "Enter valid SVG markup to preview"}
                    </div>
                  )}
                </div>

                {/* Multi-Size Optical Check Row (at 1:1 true scale) */}
                <div className="rounded-xl border border-border/80 bg-muted/20 p-3 space-y-2">
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                    {isZh ? "光學尺寸對比 (16px, 20px, 24px, 32px, 48px · 1:1 真實比例)" : "Optical Scale Inspection (1:1 True Pixel Scale)"}
                  </span>
                  <div className="flex items-end justify-around py-2 border-t border-border/50">
                    {[16, 20, 24, 32, 48].map((s) => (
                      <div key={s} className="flex flex-col items-center gap-1.5">
                        <div
                          className={cn("flex items-center justify-center", currentColorClass)}
                          style={{ width: `${s}px`, height: `${s}px` }}
                        >
                          {parsed.isValid && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox={parsed.viewBox}
                              fill={iconMode === "fill" ? "currentColor" : "none"}
                              stroke={iconMode === "fill" ? "none" : "currentColor"}
                              strokeWidth={iconMode === "fill" ? 0 : strokeWidth}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-full h-full"
                              aria-hidden="true"
                              dangerouslySetInnerHTML={{ __html: parsed.innerSvg }}
                            />
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-muted-foreground">{s}px</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* In-Context UI Mockup Preview */}
                <div className="rounded-xl border border-border/80 bg-muted/20 p-3 space-y-2">
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                    {isZh ? "台灣電商真實介面情境模擬" : "Real-World Storefront Context Preview"}
                  </span>
                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    {/* Primary Button */}
                    <Button size="sm" className="gap-2 text-xs">
                      {parsed.isValid && (
                        <div
                          className="size-4 shrink-0"
                          dangerouslySetInnerHTML={{
                            __html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${parsed.viewBox}" fill="${iconMode === "fill" ? "currentColor" : "none"}" stroke="${iconMode === "fill" ? "none" : "currentColor"}" stroke-width="${iconMode === "fill" ? 0 : 2}" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full">${parsed.innerSvg}</svg>`
                          }}
                        />
                      )}
                      <span>{isZh ? "立即前往結帳" : "Checkout Now"}</span>
                    </Button>

                    {/* Secondary Badge */}
                    <Badge variant="outline" className="gap-1.5 py-1 text-xs border-primary/30 text-primary bg-primary/5">
                      {parsed.isValid && (
                        <div
                          className="size-3.5 shrink-0"
                          dangerouslySetInnerHTML={{
                            __html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${parsed.viewBox}" fill="${iconMode === "fill" ? "currentColor" : "none"}" stroke="${iconMode === "fill" ? "none" : "currentColor"}" stroke-width="${iconMode === "fill" ? 0 : 2}" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full">${parsed.innerSvg}</svg>`
                          }}
                        />
                      )}
                      <span>{isZh ? "100 晚安心試睡" : "100-Night Trial"}</span>
                    </Badge>

                    {/* Compact Chip */}
                    <div className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground">
                      {parsed.isValid && (
                        <div
                          className="size-3.5 shrink-0 text-emerald-600"
                          dangerouslySetInnerHTML={{
                            __html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${parsed.viewBox}" fill="${iconMode === "fill" ? "currentColor" : "none"}" stroke="${iconMode === "fill" ? "none" : "currentColor"}" stroke-width="${iconMode === "fill" ? 0 : 2}" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full">${parsed.innerSvg}</svg>`
                          }}
                        />
                      )}
                      <span>{isZh ? "原廠正品防偽" : "Authentic Guarantee"}</span>
                    </div>
                  </div>
                </div>

                {/* Export & Code Output Tabs */}
                <div className="space-y-2 pt-2">
                  <Tabs defaultValue="jsx" className="w-full">
                    <div className="flex items-center justify-between pb-2">
                      <TabsList className="h-8">
                        <TabsTrigger value="jsx" className="text-xs font-mono">React JSX</TabsTrigger>
                        <TabsTrigger value="svg" className="text-xs font-mono">Clean SVG</TabsTrigger>
                      </TabsList>

                      <div className="flex items-center gap-1.5">
                        {/* One-Click Copy JSX Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(parsed.reactJsx, "jsx")}
                          className="h-8 px-2.5 text-xs gap-1.5"
                          disabled={!parsed.isValid}
                          aria-label="Copy React JSX component code"
                        >
                          {copiedType === "jsx" ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                          <span>{copiedType === "jsx" ? (isZh ? "已複製 JSX" : "Copied JSX!") : "Copy JSX"}</span>
                        </Button>

                        {/* One-Click Copy Clean SVG Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(parsed.cleanSvg, "svg")}
                          className="h-8 px-2.5 text-xs gap-1.5"
                          disabled={!parsed.isValid}
                          aria-label="Copy sanitized SVG markup"
                        >
                          {copiedType === "svg" ? <Check className="size-3.5 text-emerald-500" /> : <FileCode2 className="size-3.5" />}
                          <span>{copiedType === "svg" ? (isZh ? "已複製 SVG" : "Copied SVG!") : "Copy SVG"}</span>
                        </Button>

                        {/* One-Click Download SVG Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleDownloadSvg}
                          className="h-8 px-2.5 text-xs gap-1.5"
                          disabled={!parsed.isValid}
                          aria-label="Download sanitized SVG file"
                        >
                          <Download className="size-3.5" />
                          <span>{isZh ? "下載 .svg" : "Download SVG"}</span>
                        </Button>
                      </div>
                    </div>

                    <TabsContent value="jsx" className="mt-0">
                      <div className="relative rounded-xl border border-border bg-slate-950 p-3.5 overflow-hidden">
                        <pre className="text-xs font-mono text-slate-200 overflow-x-auto max-h-56 leading-relaxed">
                          {parsed.reactJsx}
                        </pre>
                      </div>
                    </TabsContent>

                    <TabsContent value="svg" className="mt-0">
                      <div className="relative rounded-xl border border-border bg-slate-950 p-3.5 overflow-hidden">
                        <pre className="text-xs font-mono text-slate-200 overflow-x-auto max-h-56 leading-relaxed">
                          {parsed.cleanSvg}
                        </pre>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Figma & Designer Guidelines */}
      <section className="space-y-4 pt-6 border-t border-border">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground border-border">
              DESIGN SPECIFICATIONS
            </Badge>
          </div>
          <h2 className="text-lg font-bold text-foreground mt-1">
            {isZh ? "Figma 設計師向量圖示繪製規範" : "Figma & Designer Vector Specifications"}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {isZh
              ? "確保自訂圖示與全站 Lucide React 官方圖示體系保持一致的視覺重力、線條端點與色彩語意相容性。"
              : "Technical rules to guarantee seamless optical harmony and code cleanliness alongside Lucide React icons."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4 space-y-2">
              <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold">
                24
              </div>
              <h3 className="text-sm font-bold text-foreground">
                {isZh ? "24×24px 畫布與安全邊距" : "24×24px Frame & Live Area"}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isZh
                  ? "建立 24×24px 畫布，保留周圍 2px 光學內縮安全邊距（主要繪製區域為 20×20px），確保與文字對齊時不會裁切。"
                  : "All icons must be designed on a 24×24px frame with a 2px inner optical margin (20×20px active area) to ensure perfect optical balance."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4 space-y-2">
              <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold">
                2.0
              </div>
              <h3 className="text-sm font-bold text-foreground">
                {isZh ? "2px 圓角線條 (Round Stroke)" : "2px Consistent Stroke Weight"}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isZh
                  ? "標準筆畫粗細為 2px，端點設為 Round Cap，轉角設為 Round Join。精密場景可支援 1.5px，粗體場景支援 2.5px。"
                  : "Default stroke weight is 2px with round caps and round joins. Consistent geometric terminals create visual unity across components."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4 space-y-2">
              <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold">
                CSS
              </div>
              <h3 className="text-sm font-bold text-foreground">
                {isZh ? "使用 currentColor 動態賦色" : "Colorless / currentColor"}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isZh
                  ? "匯出時請將 fill 設為 none，stroke 移除寫死色碼。圖示將自動承接 Tailwind text-primary 或 text-foreground 語意變數。"
                  : "Export vectors without fixed color fills or hardcoded hex. currentColor allows icons to dynamically adapt to themes, brands, and hover states."}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
