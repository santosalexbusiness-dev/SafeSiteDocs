import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { isAdminEmail } from "@/lib/auth";

/**
 * Account creation. Hashes the password (bcrypt) and stores the user.
 * The client signs in with next-auth credentials right after.
 */
export async function POST(request: Request) {
  try {
    if (!prisma) {
      return NextResponse.json(
        { ok: false, error: "Accounts are temporarily unavailable." },
        { status: 503 }
      );
    }

    const { email, password, name, company } = await request.json();
    const cleanEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

    if (!cleanEmail || !/.+@.+\..+/.test(cleanEmail)) {
      return NextResponse.json({ ok: false, error: "Enter a valid email." }, { status: 400 });
    }
    if (typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { ok: false, error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email: cleanEmail } });
    if (existing) {
      return NextResponse.json(
        { ok: false, error: "An account with this email already exists. Log in instead." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: {
        email: cleanEmail,
        name: typeof name === "string" && name.trim() ? name.trim() : null,
        company: typeof company === "string" && company.trim() ? company.trim() : null,
        passwordHash,
        role: isAdminEmail(cleanEmail) ? "ADMIN" : "CUSTOMER",
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[signup] error", err);
    return NextResponse.json({ ok: false, error: "Could not create account." }, { status: 500 });
  }
}
