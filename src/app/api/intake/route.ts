import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isEmailConfigured, sendEmail, intakeReceivedHtml, internalNotifyHtml, esc } from "@/lib/email";
import { isStorageConfigured, uploadIntakeFile, createSignedUrl, intakePath } from "@/lib/storage";
import { isHoneypotTripped, rateLimit, clientKey } from "@/lib/antispam";

export const runtime = "nodejs";

// Attachment limits (defense against resource abuse on this unauthenticated route).
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB per file
const MAX_FILES = 8;
const ALLOWED_EXT = /\.(docx?|pdf|xlsx?)$/i;

/**
 * Custom binder intake submissions.
 * - Accepts multipart/form-data (fields in `data`, files in `files`) or JSON.
 * - Validates and uploads attachments to the private Supabase Storage bucket.
 * - Persists a BinderRequest (with stored file paths).
 * - Emails the customer a confirmation + notifies your sales inbox, including
 *   signed download links to the uploaded files.
 * Returns a non-OK status when the submission couldn't be captured, so the form
 * never shows a false confirmation for this paid flow.
 */
export async function POST(request: Request) {
  try {
    let data: Record<string, unknown> = {};
    let files: File[] = [];

    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      data = JSON.parse((form.get("data") as string) || "{}");
      files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
    } else {
      data = await request.json();
    }

    // Honeypot: pretend success so bots don't learn they were caught.
    if (isHoneypotTripped(data?.botField)) {
      return NextResponse.json({ ok: true, filesStored: 0 });
    }
    if (!rateLimit(clientKey(request, "intake"), 5, 60_000)) {
      return NextResponse.json(
        { ok: false, error: "Too many submissions — please wait a minute and try again." },
        { status: 429 }
      );
    }

    if (!data?.companyName || !data?.email) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }

    // Only keep attachments that are the right type and within the size cap.
    const validFiles = files
      .filter((f) => f.size <= MAX_FILE_BYTES && ALLOWED_EXT.test(f.name))
      .slice(0, MAX_FILES);

    // Upload valid attachments to the private bucket.
    const stored: { name: string; size: number; path: string }[] = [];
    if (isStorageConfigured()) {
      for (const f of validFiles) {
        const path = intakePath(String(data.companyName), f.name);
        if (await uploadIntakeFile(path, f)) stored.push({ name: f.name, size: f.size, path });
      }
    }
    // Fallback record of filenames if storage isn't available (so nothing is silently lost).
    const attachments =
      stored.length > 0
        ? stored
        : validFiles.length > 0
          ? validFiles.map((f) => ({ name: f.name, size: f.size }))
          : (data.attachments as unknown) ?? null;

    let captured = false;
    if (prisma) {
      try {
        await prisma.binderRequest.create({
          data: {
            companyName: String(data.companyName),
            contactName: (data.contactName as string) ?? "",
            email: String(data.email),
            phone: (data.phone as string) ?? null,
            website: (data.website as string) ?? null,
            states: (data.states as string) ?? "",
            industry: (data.industry as string) ?? "",
            employees: (data.employees as string) ?? "",
            workPerformed: (data.workPerformed as string) ?? "",
            hazards: {
              ...((data.hazards as object) ?? {}),
              prequal: (data.prequal as unknown) ?? [],
              requiredBy: (data.requiredBy as string) ?? "",
            },
            currentDocs: (data.currentDocs as string) ?? "",
            concerns: (data.concerns as string) ?? null,
            desiredPackage: (data.desiredPackage as string) ?? "",
            attachments: attachments as object,
          },
        });
        captured = true;
      } catch (e) {
        console.error("[intake] db error", e);
      }
    }

    let salesNotified = false;
    if (isEmailConfigured()) {
      await sendEmail({
        to: String(data.email),
        subject: "We received your custom binder intake",
        html: intakeReceivedHtml({
          contactName: data.contactName as string,
          company: String(data.companyName),
        }),
      });
      if (process.env.SALES_INBOX) {
        // Signed download links for each uploaded attachment.
        const links = await Promise.all(
          stored.map(async (s) => {
            const url = await createSignedUrl(s.path);
            return url ? `<a href="${url}">${esc(s.name)}</a>` : esc(s.name);
          })
        );
        const attachmentLine =
          stored.length > 0
            ? `<strong>Attachments (${stored.length}):</strong> ${links.join(", ")}`
            : validFiles.length > 0
              ? `<strong>Attachments:</strong> ${validFiles.length} file(s) submitted but not stored — ask the customer to email them.`
              : `<strong>Attachments:</strong> none`;

        const res = await sendEmail({
          to: process.env.SALES_INBOX,
          subject: `New binder intake: ${data.companyName}`,
          html: internalNotifyHtml("New custom binder intake", [
            `<strong>Company:</strong> ${esc(data.companyName)}`,
            `<strong>Contact:</strong> ${esc(data.contactName) || "—"} (${esc(data.email)})`,
            `<strong>Industry:</strong> ${esc(data.industry) || "—"} · <strong>Employees:</strong> ${esc(data.employees) || "—"}`,
            `<strong>Package:</strong> ${esc(data.desiredPackage) || "—"}`,
            `<strong>Prequalification:</strong> ${((data.prequal as string[]) ?? []).map(esc).join(", ") || "—"}`,
            attachmentLine,
          ]),
        });
        salesNotified = "ok" in res;
      }
    }

    // If we neither persisted the request nor notified sales, it wasn't captured.
    if (!captured && !salesNotified) {
      return NextResponse.json(
        { ok: false, error: "We couldn't submit your intake. Please try again, or email us at contact@safesitedocs.org." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, message: "Intake received.", filesStored: stored.length });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}
