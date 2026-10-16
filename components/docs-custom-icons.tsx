"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Upload, Download, Copy, Check, FileCode2, Eye, AlertCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { sanitizeAndParseSvg, scopeSvgIds, type SanitizeResult } from "@/lib/custom-icons";
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
    labelZh: "Lunio Bedding 印章範例",
    labelEn: "Lunio Bedding seal example",
    descZh: "寢具風格的印章圖示範例，僅供圖示工作室操作與版面示範。",
    descEn: "A bedding-inspired seal for exploring icon styling and placement.",
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
    labelZh: "人體曲線範例",
    labelEn: "Body contour example",
    descZh: "以人體曲線示範圓角線條、路徑與小尺寸圖示的呈現。",
    descEn: "A body contour study for rounded strokes and small-size legibility.",
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
    labelZh: "植物水滴範例",
    labelEn: "Botanical droplet example",
    descZh: "植物水滴圖示範例，結合描邊與實心細節以檢查匯出結果。",
    descEn: "A botanical droplet that combines outline paths and a filled detail.",
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
    labelZh: "五區結構範例",
    labelEn: "Five-zone structure example",
    descZh: "五區線條結構範例，供比較對稱性、線寬與視覺重心。",
    descEn: "A five-zone line study for symmetry, stroke weight and optical balance.",
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
    labelZh: "床與月亮範例",
    labelEn: "Bed and moon example",
    descZh: "床架與月亮圖示範例，僅供介面情境展示，不代表實際試睡政策。",
    descEn: "A bed and moon illustration for interface examples, with no trial-policy claim.",
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

type IconSource = { raw: string; componentName: string; exampleId: string | null };
type FileState = { status: "idle" } | { status: "loading"; name: string } | { status: "error"; message: string };
type Feedback = { tone: "success" | "error"; message: string } | null;
type ColorRole = "primary" | "foreground" | "muted" | "success";
type Backdrop = "grid" | "canvas" | "contrast";

const iconSizes = [16, 20, 24, 32, 48];
const colorRoles: Record<ColorRole, string> = {
  primary: "text-[var(--interactive-text)]",
  foreground: "text-foreground",
  muted: "text-muted-foreground",
  success: "text-[var(--status-success-ink)]",
};

function nameFromFilename(filename: string) {
  const name = filename.replace(/\.svg$/i, "").split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("");
  return name || "CustomIcon";
}

export function CustomIconsStudio() {
  const { isZh } = useLanguage();
  const locale = isZh ? "zh" : "en";
  const id = useId();
  const fileInput = useRef<HTMLInputElement>(null);
  const readOperation = useRef(0);
  const [source, setSource] = useState<IconSource>({
    raw: PRELOADED_LUNIO_ICONS[0].svg,
    componentName: PRELOADED_LUNIO_ICONS[0].name,
    exampleId: PRELOADED_LUNIO_ICONS[0].id,
  });
  const [size, setSize] = useState(24);
  const [strokeWidth, setStrokeWidth] = useState<number | undefined>();
  const [convertToCurrentColor, setConvertToCurrentColor] = useState(false);
  const [zoom, setZoom] = useState(2);
  const [colorRole, setColorRole] = useState<ColorRole>("primary");
  const [backdrop, setBackdrop] = useState<Backdrop>("grid");
  const [dragging, setDragging] = useState(false);
  const [fileState, setFileState] = useState<FileState>({ status: "idle" });
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [copiedAction, setCopiedAction] = useState<string | null>(null);
  const [snapshot, setSnapshot] = useState<{ key: string; result: SanitizeResult } | null>(null);
  const parseKey = JSON.stringify([source.raw, source.componentName, size, strokeWidth, convertToCurrentColor, locale]);
  const parsed = snapshot?.key === parseKey && fileState.status === "idle" ? snapshot.result : null;
  const valid = parsed?.isValid === true;

  useEffect(() => {
    setSnapshot({
      key: parseKey,
      result: sanitizeAndParseSvg(source.raw, {
        componentName: source.componentName, size, strokeWidth, convertToCurrentColor, locale,
      }),
    });
  }, [parseKey, source.raw, source.componentName, size, strokeWidth, convertToCurrentColor, locale]);

  useEffect(() => () => { readOperation.current += 1; }, []);

  function updateSource(next: IconSource) {
    readOperation.current += 1;
    setFileState({ status: "idle" });
    setSource(next);
    setFeedback(null);
    setCopiedAction(null);
  }

  function loadExample(icon: PreloadedIcon) {
    updateSource({ raw: icon.svg, componentName: icon.name, exampleId: icon.id });
    setSize(24);
    setStrokeWidth(undefined);
    setConvertToCurrentColor(false);
  }

  async function loadFile(file: File) {
    const operation = ++readOperation.current;
    setFeedback(null);
    setCopiedAction(null);
    setSource({ raw: "", componentName: nameFromFilename(file.name), exampleId: null });
    if (!/\.svg$/i.test(file.name)) {
      setFileState({ status: "error", message: isZh ? "請選擇副檔名為 .svg 的檔案。" : "Choose a file with the .svg extension." });
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setFileState({ status: "error", message: isZh ? "SVG 檔案不得超過 2 MiB。" : "The SVG file must be 2 MiB or smaller." });
      return;
    }
    setFileState({ status: "loading", name: file.name });
    try {
      const raw = await file.text();
      if (operation !== readOperation.current) return;
      setSource({ raw, componentName: nameFromFilename(file.name), exampleId: null });
      setFileState({ status: "idle" });
    } catch {
      if (operation !== readOperation.current) return;
      setFileState({ status: "error", message: isZh ? "無法讀取檔案，請重新選擇或貼上 SVG。" : "The file could not be read. Choose it again or paste the SVG." });
    }
  }

  async function copy(text: string, action: string) {
    setCopiedAction(null);
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAction(action);
      setFeedback({ tone: "success", message: isZh ? "已複製至剪貼簿。" : "Copied to clipboard." });
    } catch {
      setFeedback({ tone: "error", message: isZh ? "無法存取剪貼簿，請從下方程式碼手動複製。" : "Clipboard access failed. Select and copy the code below manually." });
    }
  }

  async function quickCopy(icon: PreloadedIcon) {
    const result = sanitizeAndParseSvg(icon.svg, { componentName: icon.name, convertToCurrentColor: false, locale });
    if (result.isValid) await copy(result.reactJsx, icon.id);
    else setFeedback({ tone: "error", message: result.error || (isZh ? "無法匯出此範例。" : "This example could not be exported.") });
  }

  function download() {
    if (!valid || !parsed) return;
    const url = URL.createObjectURL(new Blob([parsed.cleanSvg], { type: "image/svg+xml;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${parsed.sanitizedComponentName}.svg`;
    link.click();
    URL.revokeObjectURL(url);
    setFeedback({ tone: "success", message: isZh ? "已建立 SVG 下載檔案。" : "SVG download created." });
  }

  function preview(surface: string, pixels: number) {
    if (!valid || !parsed) return null;
    return <span aria-hidden="true" className="inline-flex shrink-0 [&>svg]:block [&>svg]:size-full"
      style={{ width: pixels, height: pixels }}
      dangerouslySetInnerHTML={{ __html: scopeSvgIds(parsed.cleanSvg, `${id}-${surface}`) }} />;
  }

  return (
    <div className="@container min-w-0 space-y-10">
      <section aria-labelledby={`${id}-examples`} className="space-y-4">
        <div className="space-y-2">
          <p className="typo-caption text-muted-foreground">{isZh ? "5 組可載入範例" : "5 editable examples"}</p>
          <h2 id={`${id}-examples`} className="typo-h3">{isZh ? "從範例開始" : "Start with an example"}</h2>
          <p className="typo-body-sm text-muted-foreground">{isZh
            ? "這些圖示僅供操作與版面示範，不代表官方認證、產品功效或服務承諾。載入以調整，或直接複製原始外觀的 JSX。"
            : "These illustrative icons do not establish certification, product benefits or service promises. Load one to edit, or copy its original-appearance JSX."}</p>
        </div>
        <div className="grid min-w-0 grid-cols-1 gap-3 @[36rem]:grid-cols-2 @[58rem]:grid-cols-3">
          {PRELOADED_LUNIO_ICONS.map((icon) => {
            const selected = source.exampleId === icon.id;
            return (
              <Card key={icon.id} className={cn("min-w-0 gap-4 py-4 shadow-none", selected && "border-[var(--interactive-text)] bg-[var(--brand-surface)]")}>
                <CardContent className="flex min-w-0 flex-1 flex-col gap-3 px-4">
                  <div className="flex items-start gap-3">
                    <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-muted text-[var(--interactive-text)] [&>svg]:size-6"
                      dangerouslySetInnerHTML={{ __html: icon.svg }} />
                    <div className="min-w-0 space-y-1">
                      <h3 className="typo-label wrap-anywhere">{icon.name}</h3>
                      <p className="typo-caption text-muted-foreground">{isZh ? icon.labelZh : icon.labelEn}</p>
                    </div>
                  </div>
                  <p className="typo-body-sm text-muted-foreground">{isZh ? icon.descZh : icon.descEn}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-1">
                    <Button variant={selected ? "secondary" : "outline"} className="min-h-11 flex-1 px-3 typo-body-sm"
                      aria-pressed={selected} aria-label={`${isZh ? "載入" : "Load"} ${icon.name}`}
                      onClick={() => loadExample(icon)}>
                      {selected && <Check aria-hidden="true" className="size-4" />}{selected ? (isZh ? "已載入" : "Loaded") : (isZh ? "載入" : "Load")}
                    </Button>
                    <Button variant="ghost" className="min-h-11 flex-1 px-3 typo-body-sm" aria-label={`${isZh ? "複製" : "Copy"} ${icon.name} JSX`}
                      onClick={() => quickCopy(icon)}>
                      {copiedAction === icon.id ? <Check aria-hidden="true" className="size-4" /> : <Copy aria-hidden="true" className="size-4" />} JSX
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section aria-labelledby={`${id}-studio`} className="min-w-0 space-y-5">
        <div className="space-y-2 border-t border-border pt-8">
          <h2 id={`${id}-studio`} className="typo-h3">{isZh ? "SVG 圖示工作室" : "SVG icon studio"}</h2>
          <p className="typo-body-sm text-muted-foreground">{isZh ? "上傳或貼上 SVG，檢查外觀，再匯出。所有處理均在此瀏覽器內完成。" : "Upload or paste an SVG, check its appearance, then export. Processing stays in your browser."}</p>
        </div>
        <div role="status" aria-live="polite" aria-atomic="true" className={cn("typo-body-sm", feedback?.tone === "error" ? "text-destructive" : "text-[var(--status-success-ink)]")}>
          {feedback?.message}
        </div>
        <div className="grid min-w-0 grid-cols-1 items-start gap-5 @[58rem]:grid-cols-2">
          <Card className="min-w-0 gap-5 shadow-none">
            <CardHeader className="px-4 sm:px-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="typo-h4">{isZh ? "1. SVG 來源" : "1. SVG source"}</h3>
                <Button variant="ghost" className="min-h-11 px-3 typo-body-sm" disabled={!source.raw && fileState.status === "idle"}
                  onClick={() => { updateSource({ raw: "", componentName: "CustomIcon", exampleId: null }); if (fileInput.current) fileInput.current.value = ""; }}>
                  <Trash2 aria-hidden="true" className="size-4" />{isZh ? "清除" : "Clear"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="min-w-0 space-y-5 px-4 sm:px-6">
              <div className={cn("space-y-3 rounded-lg border border-dashed border-border p-4 text-center", dragging && "border-[var(--interactive-text)] bg-[var(--brand-surface)]")}
                onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
                onDragLeave={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDragging(false); }}
                onDrop={(event) => { event.preventDefault(); setDragging(false); const file = event.dataTransfer.files[0]; if (file) void loadFile(file); }}>
                <Upload aria-hidden="true" className="mx-auto size-6 text-[var(--interactive-text)]" />
                <Button variant="outline" className="max-w-full min-h-11 whitespace-normal px-4" onClick={() => fileInput.current?.click()}>
                  {isZh ? "選擇 SVG 檔案" : "Choose SVG file"}
                </Button>
                <input ref={fileInput} type="file" accept=".svg,image/svg+xml" className="hidden" aria-label={isZh ? "選擇 SVG 檔案" : "Choose SVG file"}
                  onChange={(event) => { const file = event.currentTarget.files?.[0]; event.currentTarget.value = ""; if (file) void loadFile(file); }} />
                <p className="typo-body-sm text-muted-foreground">{isZh ? "也可拖曳檔案至此。僅限 SVG，最大 2 MiB。" : "Or drop a file here. SVG only, up to 2 MiB."}</p>
              </div>
              {fileState.status === "loading" && <p role="status" className="typo-body-sm wrap-anywhere text-muted-foreground">{isZh ? "正在讀取" : "Reading"} {fileState.name}…</p>}
              {fileState.status === "error" && <p role="alert" className="typo-body-sm text-destructive">{fileState.message}</p>}
              <div className="space-y-2">
                <Label htmlFor={`${id}-source`}>{isZh ? "SVG 程式碼" : "SVG markup"}</Label>
                <p id={`${id}-source-hint`} className="typo-body-sm text-muted-foreground">{isZh ? "貼上 Figma 或向量編輯器匯出的完整 <svg>。" : "Paste the complete <svg> exported by Figma or your vector editor."}</p>
                <Textarea id={`${id}-source`} value={source.raw} spellCheck={false} className="min-h-64 resize-y typo-body-sm"
                  aria-describedby={`${id}-source-hint${source.raw.trim() && parsed && !valid ? ` ${id}-parse-error` : ""}`}
                  aria-invalid={!!source.raw.trim() && !!parsed && !valid}
                  onChange={(event) => updateSource({ ...source, raw: event.target.value, exampleId: null })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-name`}>{isZh ? "React 元件名稱" : "React component name"}</Label>
                <Input id={`${id}-name`} value={source.componentName} spellCheck={false} className="min-h-11"
                  aria-describedby={`${id}-name-hint`}
                  onChange={(event) => { setSource({ ...source, componentName: event.target.value }); setFeedback(null); setCopiedAction(null); }} />
                <p id={`${id}-name-hint`} className="typo-caption wrap-anywhere text-muted-foreground">{valid && parsed ? `${isZh ? "匯出名稱" : "Export name"}: ${parsed.sanitizedComponentName}` : (isZh ? "匯出時會轉為有效的元件名稱。" : "The export uses a valid component identifier.")}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="min-w-0 gap-5 shadow-none">
            <CardHeader className="px-4 sm:px-6">
              <h3 className="typo-h4">{isZh ? "2. 外觀與預覽" : "2. Appearance & preview"}</h3>
              <p className="typo-body-sm text-muted-foreground">{isZh ? "預設保留原始填色與描邊。尺寸、線寬與色彩轉換會套用至匯出檔。" : "Source fills and strokes are preserved by default. Size, stroke and color conversion apply to exports."}</p>
            </CardHeader>
            <CardContent className="min-w-0 space-y-5 px-4 sm:px-6">
              <fieldset className="min-w-0 space-y-2">
                <legend className="typo-label">{isZh ? "匯出尺寸" : "Export size"}</legend>
                <div className="flex flex-wrap gap-2 pt-2">
                  {iconSizes.map((value) => <Button key={value} variant={size === value ? "secondary" : "ghost"} className="min-h-11 min-w-11 px-3 typo-body-sm"
                    aria-pressed={size === value} onClick={() => { setSize(value); setCopiedAction(null); }}>{value}px</Button>)}
                </div>
              </fieldset>
              <div className="space-y-2">
                <Label htmlFor={`${id}-stroke`}>{isZh ? "匯出線寬" : "Export stroke"}</Label>
                <Select value={strokeWidth === undefined ? "original" : String(strokeWidth)} onValueChange={(value) => { setStrokeWidth(value === "original" ? undefined : Number(value)); setCopiedAction(null); }}>
                  <SelectTrigger id={`${id}-stroke`} className="min-h-11"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="original">{isZh ? "原始線寬" : "Original stroke"}</SelectItem>
                    {[1.5, 2, 2.5].map((value) => <SelectItem key={value} value={String(value)}>{value}px</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Button variant={convertToCurrentColor ? "secondary" : "outline"} className="min-h-11 w-full justify-between whitespace-normal px-3 text-left typo-body-sm"
                  aria-pressed={convertToCurrentColor} onClick={() => { setConvertToCurrentColor(!convertToCurrentColor); setCopiedAction(null); }}>
                  <span>{isZh ? "將純色轉為 currentColor" : "Convert solid colors to currentColor"}</span>
                  <span className="shrink-0">{convertToCurrentColor ? (isZh ? "開" : "On") : (isZh ? "關" : "Off")}</span>
                </Button>
                <p className="typo-caption text-muted-foreground">{isZh ? "啟用後可繼承文字色彩。保留透明填色與漸層。" : "Enable to inherit text color. Transparent fills and gradients stay intact."}</p>
              </div>
              <div className="space-y-4 border-t border-border pt-4">
                <p className="typo-caption text-muted-foreground">{isZh ? "以下設定僅影響預覽，不影響匯出。" : "The settings below affect preview only."}</p>
                <fieldset className="min-w-0 space-y-2">
                  <legend className="typo-label">{isZh ? "預覽色彩" : "Preview color"}</legend>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {(["primary", "foreground", "muted", "success"] as ColorRole[]).map((role) => <Button key={role} variant={colorRole === role ? "secondary" : "ghost"}
                      className="min-h-11 px-3 typo-body-sm" aria-pressed={colorRole === role} onClick={() => setColorRole(role)}>
                      <span aria-hidden="true" className={cn("size-2 rounded-full bg-current", colorRoles[role])} />
                      {({ primary: isZh ? "品牌" : "Brand", foreground: isZh ? "文字" : "Text", muted: isZh ? "次要" : "Muted", success: isZh ? "成功" : "Success" })[role]}
                    </Button>)}
                  </div>
                  <p className="typo-caption text-muted-foreground">{isZh ? "僅影響使用 currentColor 的區域。" : "Applies only to areas using currentColor."}</p>
                </fieldset>
                <div className="grid min-w-0 grid-cols-1 gap-4 @[26rem]:grid-cols-2 @[58rem]:grid-cols-1 @[72rem]:grid-cols-2">
                  <fieldset className="min-w-0 space-y-2">
                    <legend className="typo-label">{isZh ? "縮放" : "Zoom"}</legend>
                    <div className="flex flex-wrap gap-1 pt-2">{[1, 2, 4].map((value) => <Button key={value} variant={zoom === value ? "secondary" : "ghost"}
                      className="min-h-11 min-w-11 px-3 typo-body-sm" aria-pressed={zoom === value} onClick={() => setZoom(value)}>{value}×</Button>)}</div>
                  </fieldset>
                  <div className="space-y-2">
                    <Label htmlFor={`${id}-backdrop`}>{isZh ? "背景" : "Backdrop"}</Label>
                    <Select value={backdrop} onValueChange={(value) => setBackdrop(value as Backdrop)}>
                      <SelectTrigger id={`${id}-backdrop`} className="min-h-11"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grid">{isZh ? "格線" : "Grid"}</SelectItem>
                        <SelectItem value="canvas">{isZh ? "頁面底色" : "Canvas"}</SelectItem>
                        <SelectItem value="contrast">{isZh ? "反差底色" : "Contrast"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div role="img" aria-label={isZh ? "SVG 即時預覽" : "Live SVG preview"}
                className={cn("flex min-h-64 min-w-0 items-center justify-center overflow-hidden rounded-lg border border-border", backdrop === "contrast" ? "bg-foreground" : "bg-background", colorRoles[colorRole])}
                style={backdrop === "grid" ? { backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)", backgroundSize: "16px 16px" } : undefined}>
                {valid ? preview("main", size * zoom) : <div className="max-w-full space-y-2 bg-background p-5 text-center text-muted-foreground">
                  <Eye aria-hidden="true" className="mx-auto size-6" /><p className="typo-body-sm">{fileState.status === "loading" ? (isZh ? "正在讀取 SVG…" : "Reading SVG…") : source.raw.trim() ? (parsed ? (isZh ? "修正 SVG 以顯示預覽。" : "Fix the SVG to see its preview.") : (isZh ? "正在檢查 SVG…" : "Checking SVG…")) : (isZh ? "載入範例或加入 SVG 以開始。" : "Load an example or add an SVG to begin.")}</p>
                </div>}
              </div>
              <p className="typo-caption wrap-anywhere text-muted-foreground">{valid && parsed ? `viewBox ${parsed.viewBox} · ${size}px × ${zoom} = ${size * zoom}px ${isZh ? "預覽" : "preview"}` : (isZh ? "有效的 SVG 會在此顯示。" : "A valid SVG appears here.")}</p>
              {valid && <div className="space-y-3 rounded-lg border border-border p-3">
                <p className="typo-caption text-muted-foreground">{isZh ? "實際尺寸比較，僅供預覽" : "Actual-size comparison, preview only"}</p>
                <div className={cn("flex min-w-0 flex-wrap items-end justify-between gap-3", colorRoles[colorRole])}>{iconSizes.map((value) => <div key={value} className="flex min-w-11 flex-col items-center gap-2">
                  {preview(`size-${value}`, value)}<span className="typo-caption text-muted-foreground">{value}px</span>
                </div>)}</div>
              </div>}
              {valid && <div className="space-y-3 border-t border-border pt-4">
                <p className="typo-caption text-muted-foreground">{isZh ? "介面情境範例" : "Illustrative UI context"}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 typo-label text-primary-foreground">{preview("context-action", 16)}{isZh ? "繼續" : "Continue"}</span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 typo-body-sm text-foreground">{preview("context-badge", 16)}{isZh ? "範例標籤" : "Example badge"}</span>
                </div>
              </div>}
            </CardContent>
          </Card>
        </div>
        {source.raw.trim() && parsed && !valid && <div id={`${id}-parse-error`} role="alert" className="flex items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-destructive">
          <AlertCircle aria-hidden="true" className="mt-1 size-5 shrink-0" /><p className="typo-body-sm wrap-anywhere">{parsed.error}</p>
        </div>}
        {valid && parsed.warnings.length > 0 && <div role="status" className="space-y-2 rounded-lg border border-border bg-muted/40 p-4">
          <p className="typo-label">{isZh ? "匯出前請檢查" : "Review before export"}</p>
          <ul className="list-disc space-y-1 pl-5 typo-body-sm text-muted-foreground">{parsed.warnings.map((warning, index) => <li key={index} className="wrap-anywhere">{warning}</li>)}</ul>
        </div>}
        <Card className="min-w-0 gap-4 shadow-none">
          <CardHeader className="px-4 sm:px-6">
            <h3 className="typo-h4">{isZh ? "3. 匯出" : "3. Export"}</h3>
            <p className="typo-body-sm text-muted-foreground">{isZh ? "SVG 與 JSX 使用相同的外觀設定。使用前請檢查清理提示與實際呈現。" : "SVG and JSX share the same appearance settings. Review sanitization notes and rendering before use."}</p>
          </CardHeader>
          <CardContent className="min-w-0 px-4 sm:px-6">
            <Tabs defaultValue="jsx" className="min-w-0 gap-4">
              <div className="flex min-w-0 flex-wrap items-center justify-between gap-3">
                <TabsList className="h-auto min-h-12 max-w-full"><TabsTrigger value="jsx" className="min-h-11 px-3">React JSX</TabsTrigger><TabsTrigger value="svg" className="min-h-11 px-3">SVG</TabsTrigger></TabsList>
                <div className="flex min-w-0 flex-wrap gap-2">
                  <Button variant="outline" className="min-h-11 px-3 typo-body-sm" disabled={!valid} onClick={() => parsed && copy(parsed.reactJsx, "jsx")}>
                    {copiedAction === "jsx" ? <Check aria-hidden="true" className="size-4" /> : <Copy aria-hidden="true" className="size-4" />}{isZh ? "複製 JSX" : "Copy JSX"}
                  </Button>
                  <Button variant="outline" className="min-h-11 px-3 typo-body-sm" disabled={!valid} onClick={() => parsed && copy(parsed.cleanSvg, "svg")}>
                    {copiedAction === "svg" ? <Check aria-hidden="true" className="size-4" /> : <Copy aria-hidden="true" className="size-4" />}{isZh ? "複製 SVG" : "Copy SVG"}
                  </Button>
                  <Button className="min-h-11 px-3 typo-body-sm" disabled={!valid} onClick={download}><Download aria-hidden="true" className="size-4" />{isZh ? "下載 SVG" : "Download SVG"}</Button>
                </div>
              </div>
              {(["jsx", "svg"] as const).map((format) => <TabsContent key={format} value={format} className="min-w-0">
                {valid && parsed ? <pre tabIndex={0} aria-label={format === "jsx" ? (isZh ? "React JSX 匯出程式碼" : "React JSX export code") : (isZh ? "SVG 匯出程式碼" : "SVG export code")}
                  className="max-h-96 min-w-0 max-w-full overflow-auto rounded-lg border border-border bg-background p-4 typo-body-sm focus-visible:outline-2 focus-visible:outline-ring"><code>{format === "jsx" ? parsed.reactJsx : parsed.cleanSvg}</code></pre>
                  : <div className="space-y-3 rounded-lg border border-dashed border-border p-6 text-center text-muted-foreground"><FileCode2 aria-hidden="true" className="mx-auto size-6" /><p className="typo-body-sm">{isZh ? "加入有效的 SVG 後即可複製或下載。" : "Add a valid SVG to copy or download your icon."}</p></div>}
              </TabsContent>)}
            </Tabs>
          </CardContent>
        </Card>
      </section>

      <section aria-labelledby={`${id}-guidelines`} className="space-y-4 border-t border-border pt-8">
        <h2 id={`${id}-guidelines`} className="typo-h3">{isZh ? "設計與交付規範" : "Design & handoff guidance"}</h2>
        <div className="grid min-w-0 gap-5 @[44rem]:grid-cols-3">
          {[
            { title: isZh ? "24 × 24 畫布" : "24 × 24 canvas", body: isZh ? "新圖示以 24 × 24 viewBox 與約 2px 視覺留白為起點。匯入時保留原始 viewBox，避免裁切。" : "Start new icons with a 24 × 24 viewBox and roughly 2px optical padding. Imports keep their viewBox to avoid cropping." },
            { title: isZh ? "一致的線條" : "Consistent strokes", body: isZh ? "新描邊圖示以 2px 線寬、圓角端點與轉角為起點。在 16 至 48px 尺寸檢查清晰度。" : "Start new outline icons with 2px strokes, round caps and joins. Check legibility at sizes from 16 to 48px." },
            { title: isZh ? "語意色彩與無障礙" : "Semantic color & accessibility", body: isZh ? "需要主題適配時使用 currentColor。裝飾圖示應隱藏於輔助科技，圖示按鈕須有可讀名稱及至少 44px 操作區。" : "Use currentColor when icons should follow theme tokens. Hide decorative icons from assistive technology. Give icon buttons a readable name and at least a 44px target." },
          ].map((item) => <div key={item.title} className="min-w-0 space-y-2 rounded-lg border border-border p-4"><h3 className="typo-label">{item.title}</h3><p className="typo-body-sm text-muted-foreground">{item.body}</p></div>)}
        </div>
      </section>
    </div>
  );
}
