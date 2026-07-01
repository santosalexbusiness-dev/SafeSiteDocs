import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  Download,
  Bookmark,
  CheckCircle2,
  Circle,
  CreditCard,
  ArrowRight,
  Star,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { pageMetadata } from "@/lib/seo";
import { documents } from "@/data/documents";
import { categories } from "@/data/categories";
import { formatMonth } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Customer Dashboard",
  description: "Your SafeSite Documents dashboard.",
  path: "/dashboard",
  noindex: true,
});

const recentlyAdded = [...documents]
  .sort((a, b) => +new Date(b.lastUpdated) - +new Date(a.lastUpdated))
  .slice(0, 5);

const saved = documents.slice(2, 5);

const binderSteps = ["Submitted", "In review", "Building", "Delivered"];
const currentStep = 1;

export default function DashboardPage() {
  return (
    <DashboardShell
      role="customer"
      title="Welcome back, Apex Electric"
      subtitle="Here's what's new and where things stand."
      actions={
        <>
          <Button href="/dashboard/library" variant="secondary" size="sm">
            Open library
          </Button>
          <Button href="/intake" variant="primary" size="sm">
            New binder request
          </Button>
        </>
      }
    >
      {/* Top grid: plan + stats */}
      <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        {/* Active plan */}
        <div className="rounded-2xl border border-navy-100 bg-navy-950 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-safety">Active plan</p>
              <p className="mt-1 font-display text-2xl font-extrabold">Safety Library Pro</p>
            </div>
            <Badge variant="safety">Active</Badge>
          </div>
          <p className="mt-2 text-sm text-navy-100/70">
            $99/month · Renews {formatMonth("2026-07-15")} · Full library access with priority updates
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button href="/dashboard#billing" variant="primary" size="sm">
              Manage billing
            </Button>
            <Button href="/pricing" variant="ghost-light" size="sm">
              Compare plans
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Available", value: "300+", icon: FileText },
            { label: "Downloads", value: "37", icon: Download },
            { label: "Saved", value: String(saved.length), icon: Bookmark },
          ].map((s) => {
            const StatIcon = s.icon;
            return (
              <div key={s.label} className="rounded-2xl border border-navy-100 bg-white p-4 text-center">
                <StatIcon className="mx-auto h-5 w-5 text-safety-700" />
                <p className="mt-2 font-display text-2xl font-extrabold text-navy-950">{s.value}</p>
                <p className="text-xs font-medium uppercase tracking-wide text-steel-500">{s.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recently added */}
      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy-950">Recently added documents</h2>
          <Link href="/dashboard/library" className="text-sm font-semibold text-navy-700 hover:text-navy-900">
            View all
          </Link>
        </div>
        <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white">
          <ul className="divide-y divide-navy-100">
            {recentlyAdded.map((doc) => (
              <li key={doc.id} className="flex items-center gap-4 p-4 hover:bg-navy-50">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-navy-900 text-safety">
                  <FileText className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-navy-900">{doc.title}</p>
                  <p className="text-xs text-steel-500">
                    Updated {formatMonth(doc.lastUpdated)} · {doc.formats.join(" · ")}
                  </p>
                </div>
                <div className="flex flex-shrink-0 gap-2">
                  <button className="btn btn-outline btn-sm" aria-label={`Download ${doc.title}`}>
                    <Download className="h-4 w-4" /> <span className="hidden sm:inline">Download</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Two-column: categories + binder status */}
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {/* Categories */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-navy-950">Jump to a category</h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.slice(0, 6).map((c) => (
              <Link
                key={c.slug}
                href={`/dashboard/library?category=${c.slug}`}
                className="flex items-center gap-2.5 rounded-xl border border-navy-100 bg-white p-3 hover:border-safety hover:shadow-sm"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-safety/15 text-safety-700">
                  <Icon name={c.icon} className="h-4 w-4" />
                </span>
                <span className="text-sm font-semibold text-navy-900">{c.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Binder status */}
        <section id="binder">
          <h2 className="mb-3 text-lg font-bold text-navy-950">Custom binder request</h2>
          <div className="rounded-2xl border border-navy-100 bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-navy-900">Contractor Safety Pro Package</p>
              <Badge variant="muted">In review</Badge>
            </div>
            <p className="mt-1 text-xs text-steel-500">Submitted {formatMonth("2026-06-20")}</p>
            <ol className="mt-5 space-y-3">
              {binderSteps.map((step, i) => {
                const done = i < currentStep;
                const active = i === currentStep;
                return (
                  <li key={step} className="flex items-center gap-3">
                    {done ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    ) : active ? (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-safety">
                        <span className="h-2 w-2 rounded-full bg-navy-950" />
                      </span>
                    ) : (
                      <Circle className="h-5 w-5 text-steel-300" />
                    )}
                    <span
                      className={
                        active ? "text-sm font-semibold text-navy-900" : "text-sm text-steel-500"
                      }
                    >
                      {step}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      </div>

      {/* Saved */}
      <section id="saved" className="mt-8 scroll-mt-24">
        <h2 className="mb-3 text-lg font-bold text-navy-950">Saved documents</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {saved.map((doc) => (
            <div key={doc.id} className="rounded-2xl border border-navy-100 bg-white p-4">
              <div className="flex items-center justify-between">
                <FileText className="h-5 w-5 text-safety-700" />
                <Star className="h-4 w-4 fill-safety text-safety" />
              </div>
              <p className="mt-2 text-sm font-semibold text-navy-900">{doc.title}</p>
              <button className="mt-3 btn btn-outline btn-sm w-full">
                <Download className="h-4 w-4" /> Download
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Billing + settings */}
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <section id="billing" className="scroll-mt-24 rounded-2xl border border-navy-100 bg-white p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-navy-950">
            <CreditCard className="h-5 w-5 text-safety-700" /> Billing
          </h2>
          <p className="mt-2 text-sm text-steel-600">
            Visa ending 4242 · Next charge {formatMonth("2026-07-15")}
          </p>
          {/* Wire to Stripe Billing Portal: create a portal session server-side. */}
          <Button href="#stripe-portal" variant="secondary" size="sm" className="mt-4">
            Open billing portal <ArrowRight className="h-4 w-4" />
          </Button>
        </section>

        <section id="settings" className="scroll-mt-24 rounded-2xl border border-navy-100 bg-white p-6">
          <h2 className="text-lg font-bold text-navy-950">Account settings</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-steel-500">Company</dt>
              <dd className="font-medium text-navy-900">Apex Electric</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-steel-500">Email</dt>
              <dd className="font-medium text-navy-900">owner@apexelectric.com</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-steel-500">Plan</dt>
              <dd className="font-medium text-navy-900">Library Pro</dd>
            </div>
          </dl>
          <Button href="#edit-profile" variant="outline" size="sm" className="mt-4">
            Edit profile
          </Button>
        </section>
      </div>
    </DashboardShell>
  );
}
