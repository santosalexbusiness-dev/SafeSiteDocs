import "server-only";
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

// GFM gives us pipe tables and task-list checkboxes, which the templates use heavily.
marked.setOptions({ gfm: true, breaks: false });

/**
 * Reads a document master (Markdown) from /safety-doc-library and renders it to
 * HTML at build time. `filePath` comes from documents.json (relative to the
 * project root), e.g. "safety-doc-library/ladder-safety/ladder-inspection-checklist.md".
 */
export function renderDocHtml(filePath: string): string {
  const abs = path.join(process.cwd(), filePath);
  const md = fs.readFileSync(abs, "utf8");
  return marked.parse(md) as string;
}
