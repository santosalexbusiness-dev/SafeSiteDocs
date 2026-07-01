"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  LibraryBig,
  Bookmark,
  FolderCog,
  CreditCard,
  Settings,
  Upload,
  Inbox,
  Users,
  Megaphone,
  BarChart3,
  ArrowLeft,
  LogOut,
  Search,
} from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

type NavLink = { label: string; href: string; icon: React.ComponentType<{ className?: string }> };

const customerNav: NavLink[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Document Library", href: "/dashboard/library", icon: LibraryBig },
  { label: "Saved", href: "/dashboard#saved", icon: Bookmark },
  { label: "Custom Binder", href: "/dashboard#binder", icon: FolderCog },
  { label: "Billing", href: "/dashboard#billing", icon: CreditCard },
  { label: "Settings", href: "/dashboard#settings", icon: Settings },
];

const adminNav: NavLink[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Documents", href: "/admin#documents", icon: Upload },
  { label: "Binder Requests", href: "/admin#requests", icon: Inbox },
  { label: "Customers", href: "/admin#customers", icon: Users },
  { label: "Subscriptions", href: "/admin#subscriptions", icon: BarChart3 },
  { label: "Announcements", href: "/admin#announcements", icon: Megaphone },
];

export function DashboardShell({
  role = "customer",
  title,
  subtitle,
  actions,
  children,
}: {
  role?: "customer" | "admin";
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const nav = role === "admin" ? adminNav : customerNav;

  return (
    <div className="min-h-dvh bg-steel-50">
      <div className="mx-auto flex max-w-[100rem] flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="border-b border-navy-100 bg-navy-950 text-white lg:min-h-dvh lg:w-64 lg:border-b-0 lg:border-r lg:border-white/10">
          <div className="flex items-center justify-between px-5 py-4 lg:py-6">
            <Logo tone="light" />
          </div>
          <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:overflow-visible lg:pb-0">
            {nav.map((item) => {
              // pathname never contains the hash, so this highlights only the
              // canonical page link (Overview, Library) — not the in-page anchors.
              const current = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "flex flex-shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors lg:flex-shrink",
                    current
                      ? "bg-white/10 text-safety"
                      : "text-navy-100/70 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto hidden border-t border-white/10 p-3 lg:block">
            <Link
              href="/"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-navy-100/70 hover:bg-white/5 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" /> Back to site
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-navy-100/70 hover:bg-white/5 hover:text-white"
            >
              <LogOut className="h-4 w-4" /> Log out
            </Link>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1">
          {/* Top bar */}
          <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-navy-100 bg-white/90 px-5 py-3.5 backdrop-blur sm:px-8">
            <div className="relative hidden flex-1 sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-steel-400" />
              <input
                type="search"
                placeholder="Search your documents…"
                className="h-10 w-full max-w-md rounded-lg border border-navy-200 bg-steel-50 pl-9 pr-3 text-sm focus-visible:ring-2 focus-visible:ring-safety"
              />
            </div>
            <div className="ml-auto flex items-center gap-3">
              {role === "admin" ? (
                <span className="rounded-full bg-navy-900 px-2.5 py-1 text-xs font-semibold text-safety">
                  Admin
                </span>
              ) : null}
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-safety">
                AE
              </span>
            </div>
          </header>

          <main className="px-5 py-8 sm:px-8 lg:py-10">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="font-display text-2xl font-extrabold text-navy-950 sm:text-3xl">{title}</h1>
                {subtitle ? <p className="mt-1 text-steel-600">{subtitle}</p> : null}
              </div>
              {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
            </div>

            {/* Demo notice — auth/data not yet wired. */}
            <div className="mb-6 rounded-lg border border-safety/30 bg-safety-50 px-4 py-2.5 text-xs text-steel-700">
              Preview dashboard with sample data. Connect auth + database to make it live (see README).
            </div>

            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
