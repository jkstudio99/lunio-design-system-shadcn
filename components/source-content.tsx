"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";

export function SourceContent({ doc }: { doc: string }) {
  const { isZh } = useLanguage();

  return (
    <article className="docs-article">
      <Link
        href="/docs/getting-started"
        className="mb-7 inline-flex items-center gap-2 text-[12px] text-primary hover:underline"
      >
        <ArrowLeft size={15} /> {isZh ? "返回全部文檔" : "All documentation"}
      </Link>
      <div className="eyebrow text-primary">
        {isZh ? "單一信任來源" : "SOURCE SPECIFICATION"}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="typo-h1">DESIGN.md</h1>
        <Button asChild variant="outline" size="sm" className="gap-2">
          <a href="/DESIGN.md" download>
            <Download size={15} /> {isZh ? "下載手冊" : "Download"}
          </a>
        </Button>
      </div>
      <p className="mt-4 max-w-2xl text-[14px] leading-7 text-muted-foreground">
        {isZh
          ? "來自專案根目錄之完整原始手冊。涵蓋 Lunio 核心規範、審核通過之 v1.4 規範標準、設計治理與工程落地指南。"
          : "Verbatim source from the project root. Contains the original Lunio specification, reviewed v1.4 specifications, design governance and implementation notes."}
      </p>
      <div className="docs-block mt-9">
        <div className="mb-6 flex items-center gap-2 border-b border-border pb-5 text-[13px] font-bold text-primary">
          <FileText size={17} /> {isZh ? "專案根目錄 / DESIGN.md · Markdown 規格" : "Root / DESIGN.md · Markdown"}
        </div>
        <div className="markdown-doc">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{doc}</ReactMarkdown>
        </div>
      </div>

      <nav aria-label={isZh ? "章節分頁導覽" : "Documentation pagination"} className="mt-12 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
        <Link href="/docs/changelog" className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-5 transition hover:border-primary hover:shadow-xs">
          <ArrowLeft size={20} className="shrink-0 text-primary transition-transform group-hover:-translate-x-1" />
          <div className="min-w-0 flex-1 text-right sm:text-left">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
              {isZh ? "上一節" : "PREVIOUS"} · 12
            </span>
            <div className="mt-1.5 truncate text-[15px] font-bold text-foreground transition-colors group-hover:text-primary">
              {isZh ? "更新日誌與版本" : "Changelog & versions"}
            </div>
          </div>
        </Link>
      </nav>
    </article>
  );
}
