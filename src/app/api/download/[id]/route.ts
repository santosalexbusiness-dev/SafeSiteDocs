import { NextResponse } from "next/server";
import { getDoc } from "@/data/libraryCatalog";
import { renderDocHtml } from "@/lib/docContent";
import { getSessionUser, getAccessTier, canViewDoc } from "@/lib/auth";

/**
 * Document download endpoint.
 *   GET /api/download/[id]?format=doc  → editable Word (.doc)
 *   GET /api/download/[id]?format=pdf  → one-click PDF (see below)
 *
 * Gated exactly like the on-page viewer: free samples download for anyone,
 * gated templates require the matching plan. Not entitled → bounced to the
 * document page (which shows the paywall).
 */
export const dynamic = "force-dynamic";

const safeName = (s: string) => s.replace(/[^a-z0-9-_]+/gi, "-").slice(0, 80) || "document";

/** Wrap rendered document HTML in a Word-openable, editable HTML document. */
function wordHtml(title: string, bodyHtml: string): string {
  return `<!doctype html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<title>${title}</title>
<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml><![endif]-->
<style>
  @page { size: Letter; margin: 0.75in; }
  body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; color: #111827; line-height: 1.45; }
  h1 { font-size: 20pt; color: #0B1A30; margin: 0 0 6pt; }
  h2 { font-size: 14pt; color: #0B1A30; margin: 14pt 0 4pt; }
  h3 { font-size: 12pt; color: #0B1A30; margin: 12pt 0 4pt; }
  p, li { font-size: 11pt; }
  table { border-collapse: collapse; width: 100%; margin: 8pt 0; }
  td, th { border: 1px solid #9aa5b1; padding: 5pt 7pt; vertical-align: top; font-size: 10.5pt; }
  th { background: #f1f4f8; text-align: left; }
  blockquote { border-left: 3px solid #FFC400; margin: 8pt 0; padding: 2pt 12pt; color: #374151; }
  hr { border: none; border-top: 1px solid #d1d5db; margin: 12pt 0; }
  sub { font-size: 8pt; color: #6b7280; }
</style>
</head>
<body>${bodyHtml}</body>
</html>`;
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const doc = getDoc(params.id);
  if (!doc) return new NextResponse("Not found", { status: 404 });

  const user = await getSessionUser();
  const tier = await getAccessTier(user);
  if (!canViewDoc(doc, tier)) {
    // Not entitled → send them to the document page, which renders the paywall.
    return NextResponse.redirect(new URL(`/library/${doc.id}`, request.url));
  }

  const format = (new URL(request.url).searchParams.get("format") ?? "doc").toLowerCase();
  const bodyHtml = renderDocHtml(doc.filePath);

  if (format === "doc" || format === "word") {
    return new NextResponse(wordHtml(doc.title, bodyHtml), {
      headers: {
        "Content-Type": "application/msword",
        "Content-Disposition": `attachment; filename="${safeName(doc.id)}.doc"`,
        "Cache-Control": "no-store",
      },
    });
  }

  return new NextResponse("Unsupported format. Use ?format=doc or ?format=pdf.", { status: 400 });
}
