import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isEmailConfigured, sendEmail, intakeReceivedHtml, internalNotifyHtml } from "@/lib/email";

/**
 * Custom binder intake submissions.
 * - Persists a BinderRequest (Supabase, if connected).
 * - Emails the customer a confirmation + notifies your sales inbox (Resend).
 * File uploads: wire the client to upload to storage and send the keys here.
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (!data?.companyName || !data?.email) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }

    if (prisma) {
      await prisma.binderRequest
        .create({
          data: {
            companyName: data.companyName,
            contactName: data.contactName ?? "",
            email: data.email,
            phone: data.phone ?? null,
            website: data.website ?? null,
            states: data.states ?? "",
            industry: data.industry ?? "",
            employees: data.employees ?? "",
            workPerformed: data.workPerformed ?? "",
            // Fold prequalification answers in with the hazards JSON.
            hazards: { ...(data.hazards ?? {}), prequal: data.prequal ?? [], requiredBy: data.requiredBy ?? "" },
            currentDocs: data.currentDocs ?? "",
            concerns: data.concerns ?? null,
            desiredPackage: data.desiredPackage ?? "",
            attachments: data.attachments ?? null,
          },
        })
        .catch((e) => console.error("[intake] db error", e));
    }

    if (isEmailConfigured()) {
      await sendEmail({
        to: data.email,
        subject: "We received your custom binder intake",
        html: intakeReceivedHtml({ contactName: data.contactName, company: data.companyName }),
      });
      if (process.env.SALES_INBOX) {
        await sendEmail({
          to: process.env.SALES_INBOX,
          subject: `New binder intake: ${data.companyName}`,
          html: internalNotifyHtml("New custom binder intake", [
            `<strong>Company:</strong> ${data.companyName}`,
            `<strong>Contact:</strong> ${data.contactName ?? "—"} (${data.email})`,
            `<strong>Industry:</strong> ${data.industry ?? "—"} · <strong>Employees:</strong> ${data.employees ?? "—"}`,
            `<strong>Package:</strong> ${data.desiredPackage ?? "—"}`,
            `<strong>Prequalification:</strong> ${(data.prequal ?? []).join(", ") || "—"}`,
          ]),
        });
      }
    }

    return NextResponse.json({ ok: true, message: "Intake received." });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}
