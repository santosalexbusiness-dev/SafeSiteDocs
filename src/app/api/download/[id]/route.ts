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
export const runtime = "nodejs";
export const maxDuration = 60; // headless-Chrome PDF generation needs headroom

const safeName = (s: string) => s.replace(/[^a-z0-9-_]+/gi, "-").slice(0, 80) || "document";

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

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

/** Print-styled, brand-consistent HTML used to render the PDF. */
function pdfHtml(title: string, bodyHtml: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${escapeHtml(title)}</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif; font-size: 11pt; color: #111827; line-height: 1.5; margin: 0; }
  .bar { height: 6px; background: #FFC400; }
  .doc { padding: 4px 0 0; }
  h1 { font-size: 21pt; color: #0B1A30; margin: 10pt 0 6pt; }
  h2 { font-size: 14pt; color: #0B1A30; margin: 16pt 0 4pt; border-bottom: 1px solid #e5e7eb; padding-bottom: 3pt; }
  h3 { font-size: 12pt; color: #0B1A30; margin: 12pt 0 4pt; }
  p, li { font-size: 10.5pt; }
  table { border-collapse: collapse; width: 100%; margin: 8pt 0; page-break-inside: avoid; }
  td, th { border: 1px solid #9aa5b1; padding: 5pt 7pt; vertical-align: top; font-size: 10pt; }
  th { background: #f1f4f8; text-align: left; color: #0B1A30; }
  blockquote { border-left: 3px solid #FFC400; margin: 8pt 0; padding: 4pt 12pt; color: #374151; background: #fffdf5; }
  hr { border: none; border-top: 1px solid #d1d5db; margin: 14pt 0; }
  sub { font-size: 8pt; color: #6b7280; }
  h1, h2, h3 { page-break-after: avoid; }
</style>
</head>
<body>
  <div class="bar"></div>
  <div class="doc">${bodyHtml}</div>
</body>
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

  if (format === "pdf") {
    try {
      const chromium = (await import("@sparticuz/chromium")).default;
      const puppeteer = (await import("puppeteer-core")).default;
      const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: true,
      });
      try {
        const page = await browser.newPage();
        await page.setContent(pdfHtml(doc.title, bodyHtml), { waitUntil: "networkidle0" });
        const footer = `<div style="width:100%;font-size:8px;color:#94a3b8;padding:0 0.6in;font-family:Arial;display:flex;justify-content:space-between;"><span>${escapeHtml(
          doc.title
        )}</span><span>safesitedocs.com &middot; Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>`;
        const pdf = await page.pdf({
          format: "letter",
          printBackground: true,
          margin: { top: "0.6in", bottom: "0.7in", left: "0.6in", right: "0.6in" },
          displayHeaderFooter: true,
          headerTemplate: "<div></div>",
          footerTemplate: footer,
        });
        return new NextResponse(Buffer.from(pdf), {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="${safeName(doc.id)}.pdf"`,
            "Cache-Control": "no-store",
          },
        });
      } finally {
        await browser.close();
      }
    } catch (err) {
      console.error("[download] pdf generation failed", err);
      return new NextResponse("Could not generate PDF. Try the Word download or Print → Save as PDF.", {
        status: 500,
      });
    }
  }

  return new NextResponse("Unsupported format. Use ?format=doc or ?format=pdf.", { status: 400 });
}
