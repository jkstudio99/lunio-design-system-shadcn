import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {ArrowLeft,Download,FileText} from "lucide-react";
export const metadata={title:"Original DESIGN.md"};
export default function SourcePage(){const doc=fs.readFileSync(path.join(process.cwd(),"DESIGN.md"),"utf8");return <article className="docs-article"><Link href="/docs/getting-started" className="mb-7 inline-flex items-center gap-2 text-[12px] text-primary"><ArrowLeft size={15}/> All documentation</Link><div className="eyebrow text-primary">SOURCE SPECIFICATION</div><div className="mt-4 flex flex-wrap items-center justify-between gap-3"><h1 className="typo-h1">DESIGN.md</h1><a href="/DESIGN.md" download className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-semibold"><Download size={17}/> Download</a></div><p className="mt-4 max-w-2xl text-[14px] leading-7 text-[#75839a]">Verbatim source from the project root. Contains the original Lunio specification, reviewed v1.2 findings, design governance and implementation notes.</p><div className="docs-block mt-9"><div className="mb-6 flex items-center gap-2 border-b border-border pb-5 text-[13px] font-bold text-primary"><FileText size={17}/> Root / DESIGN.md · Markdown</div><div className="markdown-doc"><ReactMarkdown remarkPlugins={[remarkGfm]}>{doc}</ReactMarkdown></div></div></article>}
