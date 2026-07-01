import Link from "next/link";
import { Mail, Phone, ShieldAlert } from "lucide-react";
import { Logo } from "./Logo";
import { footerNav, site, MASTER_DISCLAIMER } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-navy-100">
      <div className="hazard-bar opacity-90" />

      {/* Prominent disclaimer block near the footer (per spec). */}
      <div className="border-b border-white/10 bg-navy-900/60">
        <div className="container py-8">
          <div className="flex flex-col gap-3 rounded-2xl border border-safety/20 bg-navy-950/60 p-5 sm:flex-row sm:gap-4 sm:p-6">
            <ShieldAlert className="h-6 w-6 flex-shrink-0 text-safety" aria-hidden />
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-safety">
                Important Disclaimer
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-navy-100/80">
                {MASTER_DISCLAIMER}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container grid gap-10 py-14 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="max-w-xs">
          <Logo tone="light" />
          <p className="mt-4 text-sm leading-relaxed text-navy-100/70">
            Editable safety templates, toolbox talks, and done-for-you safety binders built for
            small contractors.
          </p>
          <div className="mt-5 space-y-2 text-sm">
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2 text-navy-100/80 hover:text-white"
            >
              <Mail className="h-4 w-4 text-safety" /> {site.email}
            </a>
            <a
              href={site.phoneHref}
              className="flex items-center gap-2 text-navy-100/80 hover:text-white"
            >
              <Phone className="h-4 w-4 text-safety" /> {site.phone}
            </a>
          </div>
        </div>

        {footerNav.map((group) => (
          <nav key={group.heading} aria-label={group.heading}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {group.heading}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-100/70 transition-colors hover:text-safety"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-3 py-6 text-xs text-navy-100/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved. Not affiliated with or endorsed by OSHA.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <Link href="/terms" className="hover:text-white">
              Terms of Use
            </Link>
            <Link href="/disclaimer" className="hover:text-white">
              Disclaimer
            </Link>
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
