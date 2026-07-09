import Link from "next/link";
import { Lock, CheckCircle2 } from "lucide-react";

/**
 * Shown under a gated template's preview. Server-rendered; links only.
 * - Signed out → sign up / log in.
 * - Signed in without the right plan → upgrade on /pricing.
 */
export function Paywall({
  docTitle,
  requiredLevel,
  signedIn,
  docRoute,
}: {
  docTitle: string;
  requiredLevel: string;
  signedIn: boolean;
  docRoute: string;
}) {
  // A Starter doc is unlocked by either plan (entry price $20); a Pro doc needs
  // the Pro plan specifically ($50). Keep the CTA price honest per tier so a
  // buyer never subscribes at $20 expecting a Pro template they can't open.
  const isStarterDoc = requiredLevel === "Starter";
  const planLine = isStarterDoc
    ? "Included in Library Starter ($20/mo) and Library Pro ($50/mo)."
    : "Included in Library Pro ($50/mo) — full access to all 350+ templates.";
  const ctaLabel = signedIn
    ? "Upgrade your plan"
    : isStarterDoc
      ? "Get access — from $20/mo"
      : "Get Pro access — $50/mo";

  return (
    <div className="relative" data-no-print>
      {/* Fade over the preview above */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-white"
      />
      <div className="rounded-2xl border-2 border-safety bg-white p-6 text-center shadow-card sm:p-8">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 text-safety">
          <Lock className="h-5 w-5" />
        </span>
        <h2 className="mt-4 font-display text-xl font-extrabold text-navy-950">
          You&apos;re previewing “{docTitle}”
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-steel-600">{planLine}</p>

        <ul className="mx-auto mt-4 max-w-sm space-y-1.5 text-left text-sm text-steel-700">
          {[
            "Read, print, and save every template as PDF",
            "New and updated documents every month",
            "Online sign-off with timestamped signatures",
          ].map((line) => (
            <li key={line} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-safety-700" />
              {line}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
          <Link href="/pricing" className="btn btn-primary btn-lg">
            {ctaLabel}
          </Link>
          {!signedIn ? (
            <Link
              href={`/login?next=${encodeURIComponent(docRoute)}`}
              className="btn btn-outline btn-lg"
            >
              Already a member? Log in
            </Link>
          ) : null}
        </div>
        <p className="mt-4 text-xs text-steel-400">
          Or grab the <Link href="/samples" className="link-underline">free starter pack</Link> for
          your trade — 10 full templates, no card required.
        </p>
      </div>
    </div>
  );
}
