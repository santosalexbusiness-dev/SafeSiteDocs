"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { TextField } from "@/components/forms/fields";
import { TermsCheckbox } from "@/components/forms/TermsCheckbox";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

/**
 * Real signup/login backed by NextAuth credentials.
 * - `?plan=<planId>` resumes Stripe checkout right after auth (pricing flow).
 * - `?next=<path>` returns the user to the protected page they wanted.
 */
export function AuthCard({ planLabel }: { planLabel?: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const plan = params.get("plan");
  const nextPath = params.get("next");

  const [mode, setMode] = useState<"signin" | "signup">(
    planLabel || plan || params.get("mode") === "signup" ? "signup" : "signin"
  );
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [termsError, setTermsError] = useState<string>();
  const [error, setError] = useState<string>();
  const [busy, setBusy] = useState(false);

  /** After a successful sign-in: resume checkout if a plan was chosen. */
  async function continueAfterAuth() {
    if (plan) {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: plan }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.url) {
        window.location.href = data.url as string;
        return;
      }
    }
    router.push(nextPath && nextPath.startsWith("/") ? nextPath : "/dashboard");
    router.refresh();
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(undefined);

    if (mode === "signup" && !terms) {
      setTermsError("Please confirm the acknowledgement to continue.");
      return;
    }

    setBusy(true);
    try {
      if (mode === "signup") {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name, company }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError(data?.error ?? "Could not create account.");
          return;
        }
      }

      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) {
        setError(
          mode === "signin"
            ? "Wrong email or password."
            : "Account created, but sign-in failed — try logging in."
        );
        return;
      }
      await continueAfterAuth();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-6 flex justify-center">
        <Logo />
      </div>

      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
        {planLabel ? (
          <div className="mb-5 rounded-lg bg-safety-50 px-4 py-3 text-sm text-steel-700">
            You&apos;re signing up for the <strong className="text-navy-900">{planLabel}</strong> plan.
            {plan ? " You'll go straight to secure checkout after creating your account." : null}
          </div>
        ) : null}

        {/* Tabs */}
        <div className="mb-6 grid grid-cols-2 rounded-lg bg-navy-50 p-1">
          {(["signin", "signup"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m);
                setError(undefined);
              }}
              aria-pressed={mode === m}
              className={cn(
                "rounded-md py-2 text-sm font-semibold transition-colors",
                mode === m ? "bg-white text-navy-950 shadow-sm" : "text-steel-500 hover:text-navy-900"
              )}
            >
              {m === "signin" ? "Log in" : "Create account"}
            </button>
          ))}
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {mode === "signup" ? (
            <>
              <TextField
                label="Full name"
                required
                placeholder="Jordan Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Company"
                placeholder="Your company name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </>
          ) : null}
          <TextField
            label="Email"
            type="email"
            required
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            hint={mode === "signup" ? "At least 8 characters." : undefined}
          />

          {mode === "signup" ? (
            <TermsCheckbox
              checked={terms}
              onChange={(v) => {
                setTerms(v);
                setTermsError(undefined);
              }}
              error={termsError}
            />
          ) : null}

          {error ? (
            <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
              {error}
            </p>
          ) : null}

          <Button type="submit" variant="primary" size="lg" className="w-full" disabled={busy}>
            {busy ? "One moment…" : mode === "signin" ? "Log in" : "Create account"}
          </Button>
        </form>

        <p className="mt-5 text-center text-xs text-steel-400">
          By continuing you agree to our{" "}
          <Link href="/terms" className="link-underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="link-underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>

      <p className="mt-6 text-center text-sm text-steel-500">
        <Link href="/" className="font-semibold text-navy-700 hover:text-navy-900">
          ← Back to site
        </Link>
      </p>
    </div>
  );
}
