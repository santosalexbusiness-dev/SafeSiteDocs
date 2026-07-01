"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, Building2 } from "lucide-react";
import { TextField } from "@/components/forms/fields";
import { TermsCheckbox } from "@/components/forms/TermsCheckbox";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

export function AuthCard({ planLabel }: { planLabel?: string }) {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">(planLabel ? "signup" : "signin");
  const [terms, setTerms] = useState(false);
  const [termsError, setTermsError] = useState<string>();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (mode === "signup" && !terms) {
      setTermsError("Please confirm the acknowledgement to continue.");
      return;
    }
    // TODO: replace with NextAuth signIn()/registration call.
    // import { signIn } from "next-auth/react"; await signIn("credentials", {...})
    router.push("/dashboard");
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
          </div>
        ) : null}

        {/* Tabs */}
        <div className="mb-6 grid grid-cols-2 rounded-lg bg-navy-50 p-1">
          {(["signin", "signup"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
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
              <TextField label="Full name" required placeholder="Jordan Smith" />
              <TextField label="Company" placeholder="Apex Electric" />
            </>
          ) : null}
          <TextField label="Email" type="email" required placeholder="you@company.com" />
          <TextField
            label="Password"
            type="password"
            required
            placeholder="••••••••"
            hint={mode === "signup" ? "At least 8 characters." : undefined}
          />

          {mode === "signin" ? (
            <div className="flex justify-end">
              <Link href="#reset" className="text-sm font-semibold text-navy-700 hover:text-navy-900">
                Forgot password?
              </Link>
            </div>
          ) : (
            <TermsCheckbox
              checked={terms}
              onChange={(v) => {
                setTerms(v);
                setTermsError(undefined);
              }}
              error={termsError}
            />
          )}

          <Button type="submit" variant="primary" size="lg" className="w-full">
            {mode === "signin" ? "Log in" : "Create account"}
          </Button>
        </form>

        {/* OAuth */}
        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-navy-100" />
          <span className="text-xs font-medium uppercase tracking-wide text-steel-400">or</span>
          <span className="h-px flex-1 bg-navy-100" />
        </div>
        <button
          type="button"
          // TODO: wire to NextAuth Google provider — signIn("google")
          onClick={() => router.push("/dashboard")}
          className="btn btn-outline btn-lg w-full"
        >
          <GoogleMark /> Continue with Google
        </button>

        <p className="mt-5 text-center text-xs text-steel-400">
          Protected by reCAPTCHA-ready architecture. By continuing you agree to our{" "}
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

function GoogleMark() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
      />
    </svg>
  );
}
