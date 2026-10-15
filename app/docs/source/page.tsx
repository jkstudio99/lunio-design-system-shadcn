import fs from "node:fs";
import path from "node:path";
import { SourceContent } from "@/components/source-content";

export const metadata = { title: "DESIGN.md · Lunio Design System" };

export default function SourcePage() {
  const doc = fs.readFileSync(path.join(process.cwd(), "DESIGN.md"), "utf8");
  return <SourceContent doc={doc} />;
}
