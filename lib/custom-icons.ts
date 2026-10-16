export interface SanitizeOptions {
  convertToCurrentColor: boolean;
  componentName: string;
  iconMode?: "original" | "stroke" | "fill";
  size?: number;
  strokeWidth?: number;
  locale?: "en" | "zh";
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
  rootAttributes: Record<string, string>;
}

type SvgNode = { tag: string; attributes: Record<string, string>; children: (SvgNode | string)[] };

const SVG_NS = "http://www.w3.org/2000/svg";
const XLINK_NS = "http://www.w3.org/1999/xlink";
const MAX_BYTES = 2 * 1024 * 1024;
const NUMBER = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i;
const LENGTH = /^([+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)(px|%)?$/i;
const LOCAL_URL = /^url\(\s*["']?#([A-Za-z_][\w:.-]*)["']?\s*\)$/;
const LOCAL_HREF = /^#([A-Za-z_][\w:.-]*)$/;
const PRESENTATION = new Set([
  "fill", "stroke", "color", "fill-rule", "clip-rule", "opacity", "fill-opacity", "stroke-opacity",
  "stroke-width", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-dasharray",
  "stroke-dashoffset", "vector-effect", "clip-path", "mask", "display", "visibility", "paint-order",
  "stop-color", "stop-opacity", "color-interpolation", "color-interpolation-filters", "shape-rendering",
]);
const ELEMENT_ATTRIBUTES: Record<string, string[]> = {
  svg: ["viewBox", "width", "height", "preserveAspectRatio"],
  g: [], defs: [], title: [], desc: [],
  path: ["d", "pathLength"],
  circle: ["cx", "cy", "r", "pathLength"],
  ellipse: ["cx", "cy", "rx", "ry", "pathLength"],
  rect: ["x", "y", "width", "height", "rx", "ry", "pathLength"],
  line: ["x1", "y1", "x2", "y2", "pathLength"],
  polyline: ["points", "pathLength"], polygon: ["points", "pathLength"],
  linearGradient: ["x1", "y1", "x2", "y2", "gradientUnits", "gradientTransform", "spreadMethod", "href", "xlink:href"],
  radialGradient: ["cx", "cy", "r", "fx", "fy", "fr", "gradientUnits", "gradientTransform", "spreadMethod", "href", "xlink:href"],
  stop: ["offset"],
  clipPath: ["clipPathUnits"],
  mask: ["x", "y", "width", "height", "maskUnits", "maskContentUnits", "mask-type"],
  symbol: ["viewBox", "preserveAspectRatio"],
  use: ["x", "y", "width", "height", "href", "xlink:href"],
};
const ENUMS: Record<string, string[]> = {
  "fill-rule": ["nonzero", "evenodd", "inherit"], "clip-rule": ["nonzero", "evenodd", "inherit"],
  "stroke-linecap": ["butt", "round", "square", "inherit"],
  "stroke-linejoin": ["miter", "round", "bevel", "inherit"],
  "vector-effect": ["none", "non-scaling-stroke"],
  display: ["none", "inline"], visibility: ["visible", "hidden", "collapse", "inherit"],
  gradientUnits: ["userSpaceOnUse", "objectBoundingBox"],
  clipPathUnits: ["userSpaceOnUse", "objectBoundingBox"],
  maskUnits: ["userSpaceOnUse", "objectBoundingBox"], maskContentUnits: ["userSpaceOnUse", "objectBoundingBox"],
  "mask-type": ["alpha", "luminance"], spreadMethod: ["pad", "reflect", "repeat"],
  "color-interpolation": ["auto", "sRGB", "linearRGB", "inherit"],
  "color-interpolation-filters": ["auto", "sRGB", "linearRGB", "inherit"],
  "shape-rendering": ["auto", "optimizeSpeed", "crispEdges", "geometricPrecision", "inherit"],
};

function numberList(value: string): number[] | null {
  const parts = value.trim().split(/[\s,]+/);
  return parts.length && parts.every(part => NUMBER.test(part) && Number.isFinite(Number(part)))
    ? parts.map(Number) : null;
}

function validAttribute(name: string, value: string): boolean {
  if (name === "id") return /^[A-Za-z_][\w:.-]*$/.test(value);
  if (name === "href" || name === "xlink:href") return LOCAL_HREF.test(value);
  if (["fill", "stroke", "color", "stop-color"].includes(name)) {
    if (LOCAL_URL.test(value)) return name === "fill" || name === "stroke";
    if (["none", "currentColor", "inherit"].includes(value)) return true;
    return /^(?:#[\da-f]{3,8}|[a-z]+|(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color)\([\w\s.,%+/-]+\))$/i.test(value)
      && (typeof CSS === "undefined" || CSS.supports("color", value));
  }
  if (name === "clip-path" || name === "mask") return value === "none" || LOCAL_URL.test(value);
  if (name === "viewBox") {
    const numbers = numberList(value);
    return !!numbers && numbers.length === 4 && numbers[2] > 0 && numbers[3] > 0;
  }
  if (name === "d") return /^[Mm][MmZzLlHhVvCcSsQqTtAa\d\s.,eE+-]*$/.test(value);
  if (name === "points") return !!numberList(value) && numberList(value)!.length % 2 === 0;
  if (name === "transform" || name === "gradientTransform") {
    const transforms = value.match(/(?:matrix|translate|scale|rotate|skewX|skewY)\s*\([^()]+\)/g);
    return !!transforms && value.replace(/(?:matrix|translate|scale|rotate|skewX|skewY)\s*\([^()]+\)/g, "").trim() === ""
      && transforms.every(transform => !!numberList(transform.slice(transform.indexOf("(") + 1, -1)));
  }
  if (name === "preserveAspectRatio") return /^(?:none|x(?:Min|Mid|Max)Y(?:Min|Mid|Max)(?:\s+(?:meet|slice))?)$/.test(value);
  if (name === "paint-order") return /^(?:normal|(?:fill|stroke|markers)(?:\s+(?:fill|stroke|markers)){0,2})$/.test(value);
  if (name === "stroke-dasharray") return value === "none" || value.split(/[\s,]+/).every(part => LENGTH.test(part) && Number.isFinite(Number.parseFloat(part)) && Number.parseFloat(part) >= 0);
  if (ENUMS[name]) return ENUMS[name].includes(value);
  const match = value.match(LENGTH);
  if (!match || !Number.isFinite(Number(match[1]))) return false;
  if (["opacity", "fill-opacity", "stroke-opacity", "stop-opacity", "offset"].includes(name)) {
    return Number(match[1]) >= 0 && Number(match[1]) <= (match[2] === "%" ? 100 : 1);
  }
  return !["width", "height", "r", "rx", "ry", "fr", "stroke-width", "stroke-miterlimit", "pathLength"].includes(name)
    || Number(match[1]) >= 0;
}

function visit(node: SvgNode, callback: (node: SvgNode) => void) {
  callback(node);
  for (const child of node.children) if (typeof child !== "string") visit(child, callback);
}

function escapeXml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function serializeXml(node: SvgNode): string {
  const attributes = Object.entries(node.attributes).map(([name, value]) => ` ${name}="${escapeXml(value)}"`).join("");
  if (!node.children.length) return `<${node.tag}${attributes} />`;
  return `<${node.tag}${attributes}>${node.children.map(child => typeof child === "string" ? escapeXml(child) : serializeXml(child)).join("")}</${node.tag}>`;
}

function rewriteIds(root: SvgNode, prefix: string): Map<string, string> {
  const ids = new Map<string, string>();
  visit(root, node => { if (node.attributes.id) ids.set(node.attributes.id, `${prefix}-${ids.size}`); });
  visit(root, node => {
    for (const [name, value] of Object.entries(node.attributes)) {
      if (name === "id") node.attributes[name] = ids.get(value)!;
      else if ((name === "href" || name === "xlink:href") && LOCAL_HREF.test(value)) {
        node.attributes[name] = `#${ids.get(value.slice(1)) ?? value.slice(1)}`;
      } else {
        const target = value.match(LOCAL_URL)?.[1];
        if (target) node.attributes[name] = `url(#${ids.get(target) ?? target})`;
      }
    }
  });
  return ids;
}

function domTree(element: Element): SvgNode {
  return {
    tag: element.localName,
    attributes: Object.fromEntries(Array.from(element.attributes, attribute => [attribute.name, attribute.value])),
    children: Array.from(element.childNodes).flatMap<SvgNode | string>(child => child.nodeType === 1
      ? [domTree(child as Element)] : child.nodeType === 3 ? [child.textContent ?? ""] : []),
  };
}

export function scopeSvgIds(svg: string, instancePrefix: string): string {
  if (typeof DOMParser === "undefined" || !svg) return "";
  const doc = new DOMParser().parseFromString(svg, "image/svg+xml");
  if (doc.getElementsByTagName("parsererror").length || doc.documentElement.localName !== "svg") return "";
  const root = domTree(doc.documentElement);
  rewriteIds(root, `icon-${Array.from(instancePrefix, character => character.codePointAt(0)!.toString(16)).join("-")}`);
  return serializeXml(root);
}

function jsxName(name: string): string {
  if (name === "xlink:href") return "xlinkHref";
  if (name === "xmlns:xlink") return "xmlnsXlink";
  if (name === "mask-type") return "style";
  return name.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
}

function serializeJsx(root: SvgNode, componentName: string, size: number, strokeWidth: number | undefined): string {
  const ids = new Map<string, number>();
  visit(root, node => { if (node.attributes.id) ids.set(node.attributes.id, ids.size); });
  const expression = (name: string, value: string): string => {
    if (name === "id") return `iconId + "-${ids.get(value)}"`;
    if ((name === "href" || name === "xlink:href") && ids.has(value.slice(1))) return `"#" + iconId + "-${ids.get(value.slice(1))}"`;
    const target = value.match(LOCAL_URL)?.[1];
    if (target && ids.has(target)) return `"url(#" + iconId + "-${ids.get(target)})"`;
    return JSON.stringify(value);
  };
  const render = (node: SvgNode, depth: number): string => {
    const indent = "  ".repeat(depth);
    const attributes = Object.entries(node.attributes).filter(([name]) => name !== "width" && name !== "height" || node !== root)
      .map(([name, value]) => {
        if (name === "mask-type") return `style={{ maskType: ${JSON.stringify(value)} }}`;
        if (name === "stroke-width") return `strokeWidth={strokeWidth ?? ${JSON.stringify(value)}}`;
        return `${jsxName(name)}={${expression(name, value)}}`;
      });
    if (node === root) {
      if (!("stroke-width" in node.attributes)) attributes.push("strokeWidth={strokeWidth}");
      attributes.push("width={size}", "height={size}", 'aria-hidden="true"', "{...props}");
    }
    const opening = `<${node.tag}${attributes.length ? " " + attributes.join(" ") : ""}`;
    if (!node.children.length) return `${indent}${opening} />`;
    return `${indent}${opening}>\n${node.children.map(child => typeof child === "string" ? `${indent}  {${JSON.stringify(child)}}` : render(child, depth + 1)).join("\n")}\n${indent}</${node.tag}>`;
  };
  return `${ids.size ? 'import { useId, type SVGProps } from "react";' : 'import type { SVGProps } from "react";'}

export interface ${componentName}Props extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export function ${componentName}({
  size = ${size},
  strokeWidth${strokeWidth === undefined ? "" : ` = ${strokeWidth}`},
  ...props
}: ${componentName}Props) {
${ids.size ? '  const iconId = useId();\n' : ""}  return (
${render(root, 2)}
  );
}
`;
}

export function sanitizeAndParseSvg(rawInput: string, options: SanitizeOptions): SanitizeResult {
  const zh = options.locale === "zh";
  const message = (en: string, chinese: string) => zh ? chinese : en;
  const rawName = options.componentName.trim().replace(/[^A-Za-z0-9_]/g, "");
  const name = rawName ? (/^[A-Za-z]/.test(rawName) ? rawName : `Icon${rawName}`) : "CustomIcon";
  const componentName = name[0].toUpperCase() + name.slice(1);
  const warnings = new Set<string>();
  const invalid = (error: string): SanitizeResult => ({
    isValid: false, error, warnings: [...warnings], viewBox: "", cleanSvg: "", innerSvg: "", reactJsx: "",
    sanitizedComponentName: componentName, rootAttributes: {},
  });
  if (typeof DOMParser === "undefined") return invalid(message("SVG validation is available after the studio loads.", "工作室載入後即可驗證 SVG。"));
  if (!rawInput.trim()) return invalid(message("Paste SVG markup or upload an .svg file to begin.", "請貼上 SVG 程式碼或上傳 .svg 檔案。"));
  if (rawInput.length > MAX_BYTES || new TextEncoder().encode(rawInput).length > MAX_BYTES) return invalid(message("SVG files must be 2 MiB or smaller.", "SVG 檔案不得超過 2 MiB。"));
  if (/<!DOCTYPE/i.test(rawInput)) return invalid(message("DOCTYPE declarations are not supported. Export a standalone SVG.", "不支援 DOCTYPE 宣告，請匯出獨立 SVG。"));
  const size = options.size ?? 24;
  if (!Number.isFinite(size) || size <= 0 || (options.strokeWidth !== undefined && (!Number.isFinite(options.strokeWidth) || options.strokeWidth < 0))) {
    return invalid(message("Size must be positive and stroke width must be a non-negative finite number.", "尺寸必須大於零，描邊寬度必須為非負有限數值。"));
  }
  const doc = new DOMParser().parseFromString(rawInput, "image/svg+xml");
  if (doc.getElementsByTagName("parsererror").length || doc.documentElement.localName !== "svg" || doc.documentElement.prefix) {
    return invalid(message("Invalid SVG XML. Use one complete <svg> root with matching tags.", "SVG XML 格式無效，請使用完整且標籤配對的單一 <svg> 根節點。"));
  }
  if (doc.documentElement.namespaceURI && doc.documentElement.namespaceURI !== SVG_NS) return invalid(message("The SVG namespace must be http://www.w3.org/2000/svg.", "SVG 命名空間必須為 http://www.w3.org/2000/svg。"));
  let count = 0;
  const ids = new Set<string>();
  try {
    const read = (element: Element, depth: number): SvgNode => {
      if (++count > 10000 || depth > 64) throw new Error(message("SVG is too complex. Simplify it to 10,000 elements and 64 nesting levels.", "SVG 過於複雜，請簡化至 10,000 個元素及 64 層巢狀結構以內。"));
      const tag = element.localName;
      if (!Object.hasOwn(ELEMENT_ATTRIBUTES, tag) || element.prefix || (element.namespaceURI && element.namespaceURI !== SVG_NS) || (tag === "svg" && element !== doc.documentElement)) {
        throw new Error(message(`Unsupported SVG element <${element.tagName}>. Keep vector geometry and local definitions only.`, `不支援 SVG 元素 <${element.tagName}>，請僅保留向量圖形與本機定義。`));
      }
      const attributes: Record<string, string> = {};
      const accept = (attribute: string, value: string) => {
        if (/^on/i.test(attribute) || /(?:url\s*\(|(?:javascript|data|https?|file|vbscript):)/i.test(value) && !LOCAL_URL.test(value)) {
          throw new Error(message("Event handlers and external or executable references are not allowed.", "不允許事件處理器、外部連結或可執行參照。"));
        }
        if (!["id", "transform"].includes(attribute) && !PRESENTATION.has(attribute) && !ELEMENT_ATTRIBUTES[tag].includes(attribute)) {
          warnings.add(message(`Removed unsupported attribute or style “${attribute}”.`, `已移除不支援的屬性或樣式「${attribute}」。`));
          return;
        }
        if (!validAttribute(attribute, value)) throw new Error(message(`Invalid or unsupported value for “${attribute}”.`, `「${attribute}」的值無效或不受支援。`));
        attributes[attribute] = value;
      };
      for (const attribute of Array.from(element.attributes)) {
        if (attribute.name === "xmlns" || attribute.name === "xmlns:xlink") {
          if (attribute.value !== (attribute.name === "xmlns" ? SVG_NS : XLINK_NS)) throw new Error(message("Unexpected SVG namespace declaration.", "SVG 命名空間宣告不符預期。"));
          continue;
        }
        if (attribute.namespaceURI && attribute.namespaceURI !== XLINK_NS) throw new Error(message("Unsupported attribute namespace.", "不支援此屬性命名空間。"));
        if (attribute.name !== "style") accept(attribute.name, attribute.value.trim());
      }
      const style = element.getAttribute("style");
      if (style) {
        for (const declaration of style.split(";")) {
          if (!declaration.trim()) continue;
          const colon = declaration.indexOf(":");
          if (colon < 1) throw new Error(message("Invalid inline SVG style.", "SVG 行內樣式無效。"));
          const property = declaration.slice(0, colon).trim().toLowerCase();
          const value = declaration.slice(colon + 1).trim();
          if (!PRESENTATION.has(property) && property !== "mask-type") {
            warnings.add(message(`Removed unsupported attribute or style “${property}”.`, `已移除不支援的屬性或樣式「${property}」。`));
            continue;
          }
          accept(property, value);
        }
      }
      if (attributes.id) {
        if (ids.has(attributes.id)) throw new Error(message("SVG IDs must be unique within the file.", "SVG 檔案內的 ID 不得重複。"));
        ids.add(attributes.id);
      }
      const children: (SvgNode | string)[] = [];
      for (const child of Array.from(element.childNodes)) {
        if (child.nodeType === 1) children.push(read(child as Element, depth + 1));
        else if ((child.nodeType === 3 || child.nodeType === 4) && child.textContent?.trim()) {
          if (tag !== "title" && tag !== "desc") throw new Error(message("Text is supported only inside <title> and <desc>.", "文字僅支援於 <title> 與 <desc> 元素內。"));
          children.push(child.textContent);
        } else if (child.nodeType !== 3 && child.nodeType !== 8) throw new Error(message("Unsupported XML content in SVG.", "SVG 包含不支援的 XML 內容。"));
      }
      return { tag, attributes, children };
    };
    const root = read(doc.documentElement, 0);
    if (!root.attributes.viewBox) {
      const width = root.attributes.width?.match(LENGTH), height = root.attributes.height?.match(LENGTH);
      if (!width || !height || width[2] === "%" || height[2] === "%" || Number(width[1]) <= 0 || Number(height[1]) <= 0) {
        return invalid(message("Add a valid viewBox, or explicit positive width and height, to define the icon canvas.", "請新增有效 viewBox 或明確的正數寬高以定義圖示畫布。"));
      }
      root.attributes.viewBox = `0 0 ${Number(width[1])} ${Number(height[1])}`;
      warnings.add(message("Created viewBox from the source width and height.", "已依原始寬高建立 viewBox。"));
    }
    visit(root, node => {
      for (const [attribute, value] of Object.entries(node.attributes)) {
        const target = (attribute === "href" || attribute === "xlink:href") ? value.slice(1) : value.match(LOCAL_URL)?.[1];
        if (target && !ids.has(target)) throw new Error(message(`Local reference “#${target}” has no matching ID.`, `本機參照「#${target}」找不到對應 ID。`));
      }
    });
    let recolored = false;
    const transform = (node: SvgNode, protectedPaint: boolean, inheritedPaint: { fill: string; stroke: string; color: string }) => {
      const protectedNode = protectedPaint || ["mask", "clipPath", "linearGradient", "radialGradient"].includes(node.tag);
      const sourcePaint = {
        fill: node.attributes.fill && node.attributes.fill !== "inherit" ? node.attributes.fill : inheritedPaint.fill,
        stroke: node.attributes.stroke && node.attributes.stroke !== "inherit" ? node.attributes.stroke : inheritedPaint.stroke,
        color: node.attributes.color && !["inherit", "currentColor"].includes(node.attributes.color) ? node.attributes.color : inheritedPaint.color,
      };
      if (options.convertToCurrentColor && !protectedPaint && protectedNode) {
        node.attributes.fill = sourcePaint.fill;
        node.attributes.stroke = sourcePaint.stroke;
        node.attributes.color = sourcePaint.color;
      }
      if (options.convertToCurrentColor && !protectedNode) {
        if (node.attributes.color) {
          delete node.attributes.color;
          recolored = true;
        }
        for (const paint of ["fill", "stroke"]) {
          const value = node.attributes[paint];
          if (value && value !== "none" && value !== "currentColor" && !LOCAL_URL.test(value)) {
            node.attributes[paint] = "currentColor";
            recolored = true;
          }
        }
      }
      if (options.strokeWidth !== undefined && (node === root || "stroke-width" in node.attributes)) node.attributes["stroke-width"] = String(options.strokeWidth);
      for (const child of node.children) if (typeof child !== "string") transform(child, protectedNode, sourcePaint);
    };
    transform(root, false, { fill: "black", stroke: "none", color: "currentColor" });
    if (options.convertToCurrentColor && !root.attributes.fill) root.attributes.fill = "currentColor";
    if (recolored) warnings.add(message("Converted solid fill and stroke colors to currentColor. Gradient stops, masks and clip paths keep their source colors.", "已將純色填色與描邊轉為 currentColor，漸層色標、遮罩及裁切路徑保留原始色彩。"));
    if (options.iconMode && options.iconMode !== "original") {
      root.attributes.fill = options.iconMode === "fill" ? "currentColor" : "none";
      root.attributes.stroke = options.iconMode === "stroke" ? "currentColor" : "none";
    }
    root.attributes.xmlns = SVG_NS;
    if (rawInput.includes("xlink:href")) root.attributes["xmlns:xlink"] = XLINK_NS;
    root.attributes.width = String(size);
    root.attributes.height = String(size);
    rewriteIds(root, "lunio-icon");
    return {
      isValid: true, error: null, warnings: [...warnings], viewBox: root.attributes.viewBox,
      cleanSvg: serializeXml(root), innerSvg: root.children.map(child => typeof child === "string" ? escapeXml(child) : serializeXml(child)).join(""),
      reactJsx: serializeJsx(root, componentName, size, options.strokeWidth), sanitizedComponentName: componentName,
      rootAttributes: { ...root.attributes },
    };
  } catch (error) {
    return invalid(error instanceof Error ? error.message : message("Unable to validate SVG.", "無法驗證 SVG。"));
  }
}
