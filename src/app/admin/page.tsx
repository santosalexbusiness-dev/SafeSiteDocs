import type { Metadata } from "next";
import { DollarSign, Users, Inbox, FileSignature } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";
import { allPlans } from "@/data/pricing";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatMonth } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Admin Dashboard",
  description: "Leads, binder requests, orders, and subscriptions.",
  path: "/admin",
  noindex: true,
});

export const dynamic = "force-dynamic";

const planName = (id: string) => allPlans.find((p) => p.id === id)?.name ?? id;

const statusBadge: Record<string, "safety" | "muted" | "navy"> = {
  DELIVERED: "safety",
  PAID: "safety",
  ACTIVE: "safety",
  TRIALING: "navy",
  BUILDING: "navy",
  IN_REVIEW: "navy",
};

export default async function AdminPage() {
  const user = await getSessionUser();
  const initials =
    (user?.name ?? user?.email ?? "A")
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "A";

  // Everything on this page is live data. Middleware already enforces ADMIN.
  const [leads, binderRequests, orders, subscriptions, signOffCount, userCount] =
    await Promise.all([
      prisma ? prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 12 }) : [],
      prisma ? prisma.binderRequest.findMany({ orderBy: { createdAt: "desc" }, take: 12 }) : [],
      prisma ? prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 12 }) : [],
      prisma
        ? prisma.subscription.findMany({
            orderBy: { createdAt: "desc" },
            take: 12,
            include: { user: { select: { email: true, company: true } } },
          })
        : [],
      prisma ? prisma.signOff.count() : 0,
      prisma ? prisma.user.count() : 0,
    ]);

  const paidTotal = orders
    .filter((o) => o.status === "PAID")
    .reduce((sum, o) => sum + o.amount, 0);
  const activeSubs = subscriptions.filter((s) => s.status === "ACTIVE" || s.status === "TRIALING");
  const mrr = activeSubs.reduce(
    (sum, s) => sum + (allPlans.find((p) => p.id === s.plan)?.price ?? 0),
    0
  );

  return (
    <DashboardShell
      role="admin"
      initials={initials}
      title="Admin"
      subtitle="Live leads, binder requests, orders, and subscriptions."
      actions={
        <Button href="/library" variant="outline" size="sm">
          View site
        </Button>
      }
    >
      {/* KPIs */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "One-time revenue", value: `$${(paidTotal / 100).toLocaleString()}`, icon: DollarSign },
          { label: "Monthly recurring", value: `$${mrr.toLocaleString()}/mo`, icon: DollarSign },
          { label: "Accounts", value: String(userCount), icon: Users },
          { label: "Sign-offs recorded", value: String(signOffCount), icon: FileSignature },
        ].map((kpi) => {
          const KpiIcon = kpi.icon;
          return (
            <div key={kpi.label} className="rounded-2xl border border-navy-100 bg-white p-5">
              <KpiIcon className="h-5 w-5 text-safety-700" />
              <p className="mt-2 font-display text-2xl font-extrabold text-navy-950">{kpi.value}</p>
              <p className="text-xs font-medium uppercase tracking-wide text-steel-500">{kpi.label}</p>
            </div>
          );
        })}
      </div>

      {/* Leads */}
      <section id="leads" className="mt-8 scroll-mt-24">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-navy-950">
          <Users className="h-5 w-5 text-safety-700" /> Free-pack leads
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-navy-100 bg-white">
          {leads.length ? (
            <table className="w-full min-w-[36rem] text-sm">
              <thead>
                <tr className="border-b border-navy-100 text-left text-xs uppercase tracking-wide text-steel-500">
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Trade</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-50">
                {leads.map((l) => (
                  <tr key={l.id}>
                    <td className="px-4 py-3 font-medium text-navy-900">{l.email}</td>
                    <td className="px-4 py-3 text-steel-600">{l.firstName ?? "—"}</td>
                    <td className="px-4 py-3 text-steel-600">{l.trade ?? "—"}</td>
                    <td className="px-4 py-3 text-steel-500">
                      {formatMonth(l.createdAt.toISOString())}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="px-4 py-8 text-center text-sm text-steel-500">
              No leads yet — they&apos;ll appear the moment someone requests a free pack.
            </p>
          )}
        </div>
      </section>

      {/* Binder requests */}
      <section id="requests" className="mt-8 scroll-mt-24">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-navy-950">
          <Inbox className="h-5 w-5 text-safety-700" /> Binder requests
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-navy-100 bg-white">
          {binderRequests.length ? (
            <table className="w-full min-w-[40rem] text-sm">
              <thead>
                <tr className="border-b border-navy-100 text-left text-xs uppercase tracking-wide text-steel-500">
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Package</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-50">
                {binderRequests.map((r) => (
                  <tr key={r.id}>
                    <td className="px-4 py-3 font-medium text-navy-900">{r.companyName}</td>
                    <td className="px-4 py-3 text-steel-600">{r.email}</td>
                    <td className="px-4 py-3 text-steel-600">{planName(r.desiredPackage)}</td>
                    <td className="px-4 py-3 text-steel-500">
                      {formatMonth(r.createdAt.toISOString())}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={statusBadge[r.status] ?? "muted"}>
                        {r.status.replace("_", " ")}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="px-4 py-8 text-center text-sm text-steel-500">
              No binder requests yet — intake submissions land here.
            </p>
          )}
        </div>
      </section>

      {/* Orders + subscriptions */}
      <div id="orders" className="mt-8 grid scroll-mt-24 gap-5 lg:grid-cols-2">
        <section>
          <h2 className="mb-3 text-lg font-bold text-navy-950">Recent orders</h2>
          <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white">
            {orders.length ? (
              <ul className="divide-y divide-navy-100">
                {orders.map((o) => (
                  <li key={o.id} className="flex items-center gap-3 p-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-navy-900">{o.email}</p>
                      <p className="text-xs text-steel-500">
                        {planName(o.packageId)} · {formatMonth(o.createdAt.toISOString())}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-navy-900">
                      ${(o.amount / 100).toLocaleString()}
                    </span>
                    <Badge variant={statusBadge[o.status] ?? "muted"}>{o.status}</Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-4 py-8 text-center text-sm text-steel-500">
                No orders yet — paid checkouts are recorded here automatically.
              </p>
            )}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-bold text-navy-950">Subscriptions</h2>
          <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white">
            {subscriptions.length ? (
              <ul className="divide-y divide-navy-100">
                {subscriptions.map((s) => (
                  <li key={s.id} className="flex items-center gap-3 p-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-navy-900">
                        {s.user?.company ?? s.user?.email ?? "—"}
                      </p>
                      <p className="text-xs text-steel-500">
                        {planName(s.plan)}
                        {s.currentPeriodEnd
                          ? ` · renews ${formatMonth(s.currentPeriodEnd.toISOString())}`
                          : ""}
                      </p>
                    </div>
                    <Badge variant={statusBadge[s.status] ?? "muted"}>{s.status}</Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-4 py-8 text-center text-sm text-steel-500">
                No subscriptions yet — library signups appear here after checkout.
              </p>
            )}
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
