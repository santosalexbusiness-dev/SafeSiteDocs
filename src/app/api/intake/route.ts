import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isEmailConfigured, sendEmail, intakeReceivedHtml, internalNotifyHtml } from "@/lib/email";
import { isStorageConfigured, uploadIntakeFile, createSignedUrl, intakePath } from "@/lib/storage";

export const runtime = "nodejs";

/**
 * Custom binder intake submissions.
 * - Accepts multipart/form-data (fields in `data`, files in `files`) or JSON.
 * - Uploads any attachments to the private Supabase Storage bucket.
 * - Persists a BinderRequest (with stored file paths).
 * - Emails the customer a confirmation + notifies your sales inbox, including
 *   signed download links to the uploaded files.
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

    if (!data?.companyName || !data?.email) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }

    // Upload attachments (max 8) to the private bucket.
    const stored: { name: string; size: number; path: string }[] = [];
    if (isStorageConfigured()) {
      for (const f of files.slice(0, 8)) {
        const path = intakePath(String(data.companyName), f.name);
        if (await uploadIntakeFile(path, f)) stored.push({ name: f.name, size: f.size, path });
      }
    }
    // Fallback record of filenames if storage isn't available (so nothing is silently lost).
    const attachments =
      stored.length > 0
        ? stored
        : files.length > 0
          ? files.map((f) => ({ name: f.name, size: f.size }))
          : (data.attachments as unknown) ?? null;

    if (prisma) {
      await prisma.binderRequest
        .create({
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
        })
        .catch((e) => console.error("[intake] db error", e));
    }

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
            return url ? `<a href="${url}">${s.name}</a>` : s.name;
          })
        );
        const attachmentLine =
          stored.length > 0
            ? `<strong>Attachments (${stored.length}):</strong> ${links.join(", ")}`
            : files.length > 0
              ? `<strong>Attachments:</strong> ${files.length} file(s) submitted but not stored — ask the customer to email them.`
              : `<strong>Attachments:</strong> none`;

        await sendEmail({
          to: process.env.SALES_INBOX,
          subject: `New binder intake: ${data.companyName}`,
          html: internalNotifyHtml("New custom binder intake", [
            `<strong>Company:</strong> ${data.companyName}`,
            `<strong>Contact:</strong> ${data.contactName ?? "—"} (${data.email})`,
            `<strong>Industry:</strong> ${data.industry ?? "—"} · <strong>Employees:</strong> ${data.employees ?? "—"}`,
            `<strong>Package:</strong> ${data.desiredPackage ?? "—"}`,
            `<strong>Prequalification:</strong> ${((data.prequal as string[]) ?? []).join(", ") || "—"}`,
            attachmentLine,
          ]),
        });
      }
    }

    return NextResponse.json({ ok: true, message: "Intake received.", filesStored: stored.length });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}
