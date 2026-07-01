"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { primaryNav } from "@/data/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change.
  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-navy-100 bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/75"
          : "bg-transparent"
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-navy-900 focus:px-3 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <div className="container flex h-18 items-center justify-between gap-4 py-3">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-navy-950"
                    : "text-steel-600 hover:bg-navy-50 hover:text-navy-900"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button href="/login" variant="outline" size="sm">
            Log In
          </Button>
          <Button href="/library" variant="primary" size="sm">
            Get the Library
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-navy-900 hover:bg-navy-50 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-x-0 top-18 z-40 origin-top bg-white transition-all duration-200 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0"
        )}
        style={{ height: "calc(100dvh - 4.5rem)" }}
      >
        <nav aria-label="Mobile" className="container flex h-full flex-col gap-1 overflow-y-auto py-6">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between rounded-xl px-4 py-4 text-lg font-semibold text-navy-900 hover:bg-navy-50"
            >
              {item.label}
              <ChevronRight className="h-5 w-5 text-steel-400" />
            </Link>
          ))}
          <div className="mt-4 grid gap-3 border-t border-navy-100 pt-6">
            <Button href="/login" variant="outline" size="lg">
              Log In
            </Button>
            <Button href="/library" variant="primary" size="lg">
              Get the Safety Library
            </Button>
            <Button href="/custom-binder" variant="secondary" size="lg">
              Build My Safety Binder
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
