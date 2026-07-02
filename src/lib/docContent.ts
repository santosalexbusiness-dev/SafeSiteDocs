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

/**
 * A teaser for gated templates: the first ~1,200 characters of the source,
 * cut at a paragraph boundary so no table/list is left broken. Subscribers
 * get renderDocHtml() instead.
 */
export function renderDocPreviewHtml(filePath: string, maxChars = 1200): string {
  const abs = path.join(process.cwd(), filePath);
  const md = fs.readFileSync(abs, "utf8");
  if (md.length <= maxChars) return marked.parse(md) as string;

  const cut = md.lastIndexOf("\n\n", maxChars);
  const preview = md.slice(0, cut > 400 ? cut : maxChars);
  return marked.parse(preview) as string;
}
