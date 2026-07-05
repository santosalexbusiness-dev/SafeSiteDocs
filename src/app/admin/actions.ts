"use server";

import { revalidatePath } from "next/cache";
import { RequestStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

const VALID = Object.values(RequestStatus) as string[];

/**
 * Admin-only: update a binder request's status.
 *
 * The customer's dashboard progress tracker reads this same `status` field, so
 * the change becomes visible to them on their next page load. Guarded here
 * (not just by middleware) because a server action is a callable endpoint.
 */
export async function updateBinderStatus(id: string, status: string) {
  const user = await getSessionUser();
  if (!user || user.role !== "ADMIN") return { ok: false, error: "Not authorized." };
  if (!prisma) return { ok: false, error: "Database unavailable." };
  if (typeof id !== "string" || !id || !VALID.includes(status)) {
    return { ok: false, error: "Invalid request." };
  }

  try {
    await prisma.binderRequest.update({
      where: { id },
      data: { status: status as RequestStatus },
    });
  } catch (err) {
    console.error("[admin] updateBinderStatus error", err);
    return { ok: false, error: "Could not update status." };
  }

  revalidatePath("/admin");
  revalidatePath("/dashboard");
  return { ok: true };
}
