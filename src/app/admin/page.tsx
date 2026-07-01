import type { Metadata } from "next";
import {
  Upload,
  Plus,
  Pencil,
  DollarSign,
  Users,
  Inbox,
  FileText,
  Megaphone,
  TrendingUp,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";
import { documents } from "@/data/documents";
import { categories } from "@/data/categories";
import { formatMonth } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Admin Dashboard",
  description: "Manage documents, binder requests, customers, and subscriptions.",
  path: "/admin",
  noindex: true,
});

const requests = [
  { company: "Apex Electric", pkg: "Contractor Pro", date: "2026-06-20", status: "In review" },
  { company: "Summit Roofing", pkg: "Premium System", date: "2026-06-18", status: "Building" },
  { company: "BlueLine Plumbing", pkg: "Custom Binder", date: "2026-06-15", status: "Submitted" },
  { company: "Crestview HVAC", pkg: "Contractor Pro", date: "2026-06-09", status: "Delivered" },
];
const statusOptions = ["Submitted", "In review", "Building", "Delivered", "On hold"];

const customers = [
  { company: "Apex Electric", email: "owner@apexelectric.com", plan: "Library Pro", joined: "2026-02-11" },
  { company: "Summit Roofing", email: "ops@summitroofing.com", plan: "Custom Binder", joined: "2026-03-02" },
  { company: "BlueLine Plumbing", email: "admin@blueline.com", plan: "Library Starter", joined: "2026-05-19" },
  { company: "Crestview HVAC", email: "safety@crestviewhvac.com", plan: "Premium System", joined: "2026-01-27" },
];

const announcements = [
  { date: "2026-06-25", note: "Added 8 new toolbox talks (silica, trenching, heat) to the library." },
  { date: "2026-06-01", note: "Refreshed the Company Safety Program Manual for 2026." },
];

export default function AdminPage() {
  return (
    <DashboardShell
      role="admin"
      title="Admin"
      subtitle="Manage documents, requests, customers, and announcements."
      actions={
        <Button href="#documents" variant="primary" size="sm">
          <Upload className="h-4 w-4" /> Upload document
        </Button>
      }
    >
      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "MRR", value: "$8,420", icon: DollarSign, note: "+12% MoM" },
          { label: "Active subscriptions", value: "63", icon: TrendingUp, note: "41 Pro · 22 Starter" },
          { label: "Open binder requests", value: "9", icon: Inbox, note: "3 awaiting review" },
          { label: "Documents", value: String(documents.length * 20), icon: FileText, note: `${categories.length} categories` },
        ].map((kpi) => {
          const KpiIcon = kpi.icon;
          return (
            <div key={kpi.label} className="rounded-2xl border border-navy-100 bg-white p-5">
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-900 text-safety">
                  <KpiIcon className="h-4 w-4" />
                </span>
                <span className="text-xs font-medium text-emerald-600">{kpi.note}</span>
              </div>
              <p className="mt-3 font-display text-2xl font-extrabold text-navy-950">{kpi.value}</p>
              <p className="text-xs font-medium uppercase tracking-wide text-steel-500">{kpi.label}</p>
            </div>
          );
        })}
      </div>

      {/* Documents management */}
      <section id="documents" className="mt-8 scroll-mt-24">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy-950">Documents</h2>
          <Button href="#upload" variant="secondary" size="sm">
            <Plus className="h-4 w-4" /> New document
          </Button>
        </div>

        {/* Upload form (wire to storage + DB insert) */}
        <div id="upload" className="mb-5 rounded-2xl border border-dashed border-navy-200 bg-white p-5">
          <p className="text-sm font-semibold text-navy-900">Upload a new document</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <input placeholder="Title" className="h-10 rounded-lg border border-navy-200 px-3 text-sm" />
            <select className="h-10 rounded-lg border border-navy-200 px-3 text-sm" defaultValue="">
              <option value="" disabled>
                Category
              </option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
            <select className="h-10 rounded-lg border border-navy-200 px-3 text-sm" defaultValue="starter">
              <option value="free-sample">Free sample</option>
              <option value="starter">Starter access</option>
              <option value="pro">Pro access</option>
            </select>
            <input placeholder="Tags (comma-separated)" className="h-10 rounded-lg border border-navy-200 px-3 text-sm" />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button type="button" className="btn btn-outline btn-sm">
              <Upload className="h-4 w-4" /> Choose files (DOCX, PDF, XLSX)
            </button>
            <button type="button" className="btn btn-primary btn-sm">
              Publish document
            </button>
            <span className="text-xs text-steel-400">
              {/* Hook: POST to /api/admin/documents → store file + insert row */}
              Files upload to storage; metadata saved to the documents table.
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-navy-100 bg-white">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="bg-navy-50 text-xs uppercase tracking-wide text-steel-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Access</th>
                <th className="px-4 py-3 font-semibold">Updated</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {documents.slice(0, 8).map((doc) => (
                <tr key={doc.id} className="hover:bg-navy-50">
                  <td className="px-4 py-3 font-medium text-navy-900">{doc.title}</td>
                  <td className="px-4 py-3 text-steel-600">
                    {categories.find((c) => c.slug === doc.category)?.name}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      defaultValue={doc.access}
                      className="rounded-md border border-navy-200 px-2 py-1 text-xs font-semibold"
                      aria-label={`Access tier for ${doc.title}`}
                    >
                      <option value="free-sample">Free sample</option>
                      <option value="starter">Starter</option>
                      <option value="pro">Pro</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-steel-500">{formatMonth(doc.lastUpdated)}</td>
                  <td className="px-4 py-3">
                    <button className="inline-flex items-center gap-1 text-xs font-semibold text-navy-700 hover:text-navy-900">
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Binder requests */}
      <section id="requests" className="mt-8 scroll-mt-24">
        <h2 className="mb-3 text-lg font-bold text-navy-950">Custom binder requests</h2>
        <div className="overflow-x-auto rounded-2xl border border-navy-100 bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-navy-50 text-xs uppercase tracking-wide text-steel-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Company</th>
                <th className="px-4 py-3 font-semibold">Package</th>
                <th className="px-4 py-3 font-semibold">Submitted</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {requests.map((r) => (
                <tr key={r.company} className="hover:bg-navy-50">
                  <td className="px-4 py-3 font-medium text-navy-900">{r.company}</td>
                  <td className="px-4 py-3 text-steel-600">{r.pkg}</td>
                  <td className="px-4 py-3 text-steel-500">{formatMonth(r.date)}</td>
                  <td className="px-4 py-3">
                    <select
                      defaultValue={r.status}
                      aria-label={`Status for ${r.company}`}
                      className="rounded-md border border-navy-200 px-2 py-1 text-xs font-semibold"
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-xs font-semibold text-navy-700 hover:text-navy-900">
                      View intake
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Customers + subscriptions */}
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <section id="customers" className="scroll-mt-24">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-navy-950">
            <Users className="h-5 w-5 text-safety-700" /> Customers
          </h2>
          <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white">
            <ul className="divide-y divide-navy-100">
              {customers.map((c) => (
                <li key={c.email} className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm font-semibold text-navy-900">{c.company}</p>
                    <p className="text-xs text-steel-500">{c.email}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="muted">{c.plan}</Badge>
                    <p className="mt-1 text-xs text-steel-400">Joined {formatMonth(c.joined)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="subscriptions" className="scroll-mt-24">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-navy-950">
            <TrendingUp className="h-5 w-5 text-safety-700" /> Subscriptions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Active", value: "63" },
              { label: "Trialing", value: "5" },
              { label: "Past due", value: "2" },
              { label: "Canceled (30d)", value: "3" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-navy-100 bg-white p-4">
                <p className="font-display text-2xl font-extrabold text-navy-950">{s.value}</p>
                <p className="text-xs font-medium uppercase tracking-wide text-steel-500">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-steel-400">
            {/* Source from Stripe: list subscriptions, reconcile to the subscriptions table via webhooks. */}
            Synced from Stripe via webhooks.
          </p>
        </section>
      </div>

      {/* Announcements + monthly notes */}
      <section id="announcements" className="mt-8 scroll-mt-24">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-navy-950">
          <Megaphone className="h-5 w-5 text-safety-700" /> Announcements & monthly update notes
        </h2>
        <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-2xl border border-navy-100 bg-white p-5">
            <p className="text-sm font-semibold text-navy-900">Post an update</p>
            <textarea
              rows={4}
              placeholder="e.g. Added 10 new electrical safety toolbox talks…"
              className="mt-3 w-full rounded-lg border border-navy-200 p-3 text-sm"
            />
            <button type="button" className="btn btn-primary btn-sm mt-3">
              Publish announcement
            </button>
          </div>
          <div className="rounded-2xl border border-navy-100 bg-white p-5">
            <p className="text-sm font-semibold text-navy-900">Recent notes</p>
            <ul className="mt-3 space-y-3">
              {announcements.map((a) => (
                <li key={a.date} className="border-l-2 border-safety pl-3">
                  <p className="text-xs font-semibold text-steel-400">{formatMonth(a.date)}</p>
                  <p className="text-sm text-navy-800">{a.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing copy editor */}
      <section className="mt-8">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-navy-950">
          <Pencil className="h-5 w-5 text-safety-700" /> Pricing copy
        </h2>
        <div className="rounded-2xl border border-navy-100 bg-white p-5">
          <p className="text-sm text-steel-600">
            Edit plan names, prices, and feature copy. Changes here would update the pricing data
            ({" "}
            <code className="rounded bg-navy-50 px-1.5 py-0.5 text-xs">src/data/pricing.ts</code> or
            the DB-backed equivalent) and flow to the marketing site.
          </p>
          <Button href="/pricing" variant="outline" size="sm" className="mt-4">
            Preview pricing page
          </Button>
        </div>
      </section>
    </DashboardShell>
  );
}
