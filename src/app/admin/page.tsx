import type { Metadata } from "next";
import { DollarSign, Users, Inbox, FileSignature, Paperclip, ExternalLink } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";
import { allPlans } from "@/data/pricing";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatMonth } from "@/lib/utils";
import { createSignedUrl } from "@/lib/storage";
import {
  hazardQuestions,
  employeeRanges,
  packageOptions,
  currentDocsOptions,
  prequalOptions,
} from "@/data/intake";
import { industries } from "@/data/industries";
import { BinderStatusControl } from "@/components/dashboard/BinderStatusControl";

export const metadata: Metadata = pageMetadata({
  title: "Admin Dashboard",
  description: "Leads, binder requests, orders, and subscriptions.",
  path: "/admin",
  noindex: true,
});

export const dynamic = "force-dynamic";

const planName = (id: string) => allPlans.find((p) => p.id === id)?.name ?? id;

const packageLabel = (id: string) =>
  packageOptions.find((p) => p.value === id)?.label ?? allPlans.find((p) => p.id === id)?.name ?? id;
const employeesLabel = (v: string) => employeeRanges.find((e) => e.value === v)?.label ?? (v || "—");
const currentDocsLabel = (v: string) => currentDocsOptions.find((o) => o.value === v)?.label ?? (v || "—");
const industryLabel = (v: string) => industries.find((i) => i.slug === v)?.name ?? (v || "—");
const prequalLabel = (id: string) => prequalOptions.find((o) => o.id === id)?.label ?? id;
const fileSize = (bytes: number) =>
  bytes >= 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;

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

  // Mint fresh signed URLs so uploaded intake files open directly from the
  // dashboard (the links inside the notification email expire after 7 days).
  const requestsDetailed = await Promise.all(
    binderRequests.map(async (r) => {
      const atts = Array.isArray(r.attachments)
        ? (r.attachments as Array<Record<string, unknown>>)
        : [];
      const files = await Promise.all(
        atts.map(async (a) => ({
          name: String(a?.name ?? "file"),
          size: Number(a?.size ?? 0),
          url: typeof a?.path === "string" ? await createSignedUrl(a.path as string) : null,
        }))
      );
      return { ...r, files };
    })
  );

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

      {/* Binder requests — expand any row for the full submission + files */}
      <section id="requests" className="mt-8 scroll-mt-24">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-navy-950">
          <Inbox className="h-5 w-5 text-safety-700" /> Binder requests
        </h2>
        {requestsDetailed.length ? (
          <div className="space-y-3">
            {requestsDetailed.map((r) => {
              const hz = (r.hazards ?? {}) as Record<string, unknown>;
              const yesHazards = hazardQuestions.filter((q) => hz[q.id] === true);
              const prequal = Array.isArray(hz.prequal) ? (hz.prequal as string[]) : [];
              const requiredBy = typeof hz.requiredBy === "string" ? hz.requiredBy : "";
              const detailRows: [string, string][] = [
                ["Company", r.companyName],
                ["Contact", r.contactName || "—"],
                ["Email", r.email],
                ["Phone", r.phone || "—"],
                ["Website", r.website || "—"],
                ["State(s)", r.states || "—"],
                ["Industry", industryLabel(r.industry)],
                ["Employees", employeesLabel(r.employees)],
                ["Desired package", packageLabel(r.desiredPackage)],
                ["Current documents", currentDocsLabel(r.currentDocs)],
              ];
              return (
                <details
                  key={r.id}
                  className="group overflow-hidden rounded-2xl border border-navy-100 bg-white"
                >
                  <summary className="flex cursor-pointer list-none items-center gap-3 p-4 hover:bg-navy-50">
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-navy-900">{r.companyName}</p>
                      <p className="truncate text-xs text-steel-500">
                        {r.contactName || "—"} · {r.email} · {formatMonth(r.createdAt.toISOString())}
                      </p>
                    </div>
                    <Badge variant="muted">{planName(r.desiredPackage)}</Badge>
                    <Badge variant={statusBadge[r.status] ?? "muted"}>
                      {r.status.replace("_", " ")}
                    </Badge>
                    <span className="hidden text-xs font-semibold text-steel-500 sm:inline group-open:sm:hidden">
                      View
                    </span>
                  </summary>

                  <div className="border-t border-navy-100 p-5">
                    <div className="mb-5 rounded-xl border border-navy-100 bg-navy-50 p-4">
                      <BinderStatusControl id={r.id} current={r.status} />
                    </div>

                    <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                      {detailRows.map(([label, value]) => (
                        <div key={label}>
                          <dt className="text-xs font-semibold uppercase tracking-wide text-steel-500">
                            {label}
                          </dt>
                          <dd className="mt-0.5 text-sm text-navy-900">{value}</dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-4">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-steel-500">
                        Work performed
                      </dt>
                      <dd className="mt-0.5 whitespace-pre-line text-sm text-navy-900">
                        {r.workPerformed || "—"}
                      </dd>
                    </div>

                    {r.concerns ? (
                      <div className="mt-4">
                        <dt className="text-xs font-semibold uppercase tracking-wide text-steel-500">
                          Main concerns
                        </dt>
                        <dd className="mt-0.5 whitespace-pre-line text-sm text-navy-900">
                          {r.concerns}
                        </dd>
                      </div>
                    ) : null}

                    <div className="mt-4">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-steel-500">
                        Prequalification
                      </dt>
                      <dd className="mt-1 flex flex-wrap items-center gap-1.5">
                        {prequal.length ? (
                          prequal.map((p) => (
                            <span key={p} className="chip">
                              {prequalLabel(p)}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-steel-500">—</span>
                        )}
                        {requiredBy ? (
                          <span className="text-sm text-steel-600">· Required by: {requiredBy}</span>
                        ) : null}
                      </dd>
                    </div>

                    <div className="mt-4">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-steel-500">
                        Hazards ({yesHazards.length})
                      </dt>
                      <dd className="mt-1 flex flex-wrap gap-1.5">
                        {yesHazards.length ? (
                          yesHazards.map((q) => (
                            <span
                              key={q.id}
                              className="rounded-full bg-safety/15 px-2.5 py-0.5 text-xs font-medium text-navy-900"
                            >
                              {q.label.replace(/^Do employees\s*/i, "").replace(/\?$/, "")}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-steel-500">None indicated</span>
                        )}
                      </dd>
                    </div>

                    <div className="mt-4">
                      <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-steel-500">
                        <Paperclip className="h-3.5 w-3.5" /> Attachments ({r.files.length})
                      </dt>
                      <dd className="mt-1.5">
                        {r.files.length ? (
                          <ul className="space-y-1.5">
                            {r.files.map((f, i) => (
                              <li key={`${f.name}-${i}`} className="text-sm">
                                {f.url ? (
                                  <a
                                    href={f.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 font-medium text-navy-700 hover:text-navy-900"
                                  >
                                    <ExternalLink className="h-3.5 w-3.5" /> {f.name}
                                    <span className="text-xs font-normal text-steel-400">
                                      ({fileSize(f.size)})
                                    </span>
                                  </a>
                                ) : (
                                  <span className="text-steel-500">
                                    {f.name}{" "}
                                    <span className="text-xs">
                                      (not stored — ask the customer to email it)
                                    </span>
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-sm text-steel-500">None uploaded</span>
                        )}
                      </dd>
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-navy-100 bg-white">
            <p className="px-4 py-8 text-center text-sm text-steel-500">
              No binder requests yet — intake submissions land here.
            </p>
          </div>
        )}
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
