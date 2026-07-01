import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/**
 * Audit record for an online sign-off (names + timestamps, not the signature
 * images). Persists to Supabase when connected.
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (!data?.docId) {
      return NextResponse.json({ ok: false, error: "Missing docId." }, { status: 400 });
    }

    if (prisma) {
      await prisma.signOff
        .create({
          data: {
            documentId: data.docId,
            documentTitle: data.title ?? null,
            signers: Array.isArray(data.signers) ? data.signers : [],
            completedAt: data.completedAt ? new Date(data.completedAt) : new Date(),
          },
        })
        .catch((e) => console.error("[signoff] db error", e));
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}
