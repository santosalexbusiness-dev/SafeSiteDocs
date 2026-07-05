import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { FileText, Download, CheckCircle2, Circle, CreditCard, FolderCog } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { BillingPortalButton } from "@/components/dashboard/BillingPortalButton";
import { PurchaseConversion } from "@/components/analytics/PurchaseConversion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { pageMetadata } from "@/lib/seo";
import { catalog, catalogCategories, totalDocuments } from "@/data/libraryCatalog";
import { allPlans } from "@/data/pricing";
import { getSessionUser, getAccessTier } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatMonth } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Customer Dashboard",
  description: "Your SafeSite Documents dashboard.",
  path: "/dashboard",
  noindex: true,
});

export const dynamic = "force-dynamic";

const recentlyAdded = [...catalog]
  .sort((a, b) => +new Date(b.lastUpdated) - +new Date(a.lastUpdated))
  .slice(0, 5);

const binderSteps = ["Submitted", "In review", "Building", "Delivered"] as const;
const statusToStep: Record<string, number> = {
  SUBMITTED: 0,
  IN_REVIEW: 1,
  BUILDING: 2,
  DELIVERED: 3,
  ON_HOLD: 1,
};

export default async function DashboardPage() {
  const user = await getSessionUser();
  const tier = await getAccessTier(user);

  const [subscription, binderRequests, orders] = await Promise.all([
    prisma && user
      ? prisma.subscription.findFirst({
          where: { userId: user.id, status: { in: ["ACTIVE", "TRIALING", "PAST_DUE"] } },
          orderBy: { createdAt: "desc" },
        })
      : null,
    prisma && user?.email
      ? prisma.binderRequest.findMany({
          where: { OR: [{ userId: user.id }, { email: user.email }] },
          orderBy: { createdAt: "desc" },
          take: 3,
        })
      : [],
    prisma && user?.email
      ? prisma.order.findMany({
          where: { OR: [{ userId: user.id }, { email: user.email }] },
          orderBy: { createdAt: "desc" },
          take: 5,
        })
      : [],
  ]);

  const plan = subscription ? allPlans.find((p) => p.id === subscription.plan) : null;
  const firstName = user?.name?.split(" ")[0];
  const initials =
    (user?.name ?? user?.email ?? "?")
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";

  return (
    <DashboardShell
      role="customer"
      initials={initials}
      title={firstName ? `Welcome back, ${firstName}` : "Welcome back"}
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
      <Suspense fallback={null}>
        <PurchaseConversion />
      </Suspense>

      {/* Top grid: plan + stats */}
      <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        {/* Active plan */}
        <div className="rounded-2xl border border-navy-100 bg-navy-950 p-6 text-white">
          {subscription && plan ? (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-safety">
                    Active plan
                  </p>
                  <p className="mt-1 font-display text-2xl font-extrabold">{plan.name}</p>
                </div>
                <Badge variant={subscription.status === "PAST_DUE" ? "muted" : "safety"}>
                  {subscription.status === "TRIALING"
                    ? "Trial"
                    : subscription.status === "PAST_DUE"
                      ? "Past due"
                      : "Active"}
                </Badge>
              </div>
              <p className="mt-2 text-sm text-navy-100/70">
                ${plan.price}/month
                {subscription.currentPeriodEnd
                  ? ` · Renews ${formatMonth(subscription.currentPeriodEnd.toISOString())}`
                  : ""}{" "}
                · {tier === "pro" ? "Full library access" : "Starter library access"}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <BillingPortalButton className="btn btn-primary btn-sm" />
                <Button href="/pricing" variant="ghost-light" size="sm">
                  Compare plans
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-xs font-semibold uppercase tracking-wide text-safety">No plan yet</p>
              <p className="mt-1 font-display text-2xl font-extrabold">Unlock the full library</p>
              <p className="mt-2 text-sm text-navy-100/70">
                {totalDocuments}+ editable templates, toolbox talks, checklists, and forms — from
                $49/month. Your free samples stay free forever.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button href="/pricing" variant="primary" size="sm">
                  Choose a plan
                </Button>
                <Button href="/samples" variant="ghost-light" size="sm">
                  Free starter pack
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Templates", value: `${totalDocuments}`, icon: FileText },
            {
              label: "Your access",
              value: tier === "none" ? "Free" : tier === "pro" ? "Pro" : "Starter",
              icon: Download,
            },
            { label: "Binders", value: String(binderRequests.length), icon: FolderCog },
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
                    Updated {formatMonth(doc.lastUpdated)} · {doc.categoryName}
                  </p>
                </div>
                <div className="flex flex-shrink-0 gap-2">
                  <Link href={doc.route} className="btn btn-outline btn-sm">
                    Open
                  </Link>
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
            {catalogCategories.slice(0, 6).map((c) => (
              <Link
                key={c.slug}
                href={`/dashboard/library?category=${c.slug}`}
                className="flex items-center gap-2.5 rounded-xl border border-navy-100 bg-white p-3 hover:border-safety hover:shadow-sm"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-safety/15 text-safety-700">
                  <Icon name="FileText" className="h-4 w-4" />
                </span>
                <span className="text-sm font-semibold text-navy-900">{c.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Binder status */}
        <section id="binder">
          <h2 className="mb-3 text-lg font-bold text-navy-950">Custom binder requests</h2>
          {binderRequests.length ? (
            binderRequests.map((req) => {
              const currentStep = statusToStep[req.status] ?? 0;
              const planName =
                allPlans.find((p) => p.id === req.desiredPackage)?.name ?? req.desiredPackage;
              return (
                <div key={req.id} className="mb-3 rounded-2xl border border-navy-100 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-navy-900">{planName}</p>
                    <Badge variant={req.status === "DELIVERED" ? "safety" : "muted"}>
                      {req.status === "ON_HOLD" ? "On hold" : binderSteps[currentStep] ?? req.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-steel-500">
                    Submitted {formatMonth(req.createdAt.toISOString())}
                  </p>
                  <ol className="mt-5 space-y-3">
                    {binderSteps.map((step, i) => {
                      const done = i < currentStep || req.status === "DELIVERED";
                      const active = i === currentStep && req.status !== "DELIVERED";
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
              );
            })
          ) : (
            <div className="rounded-2xl border border-dashed border-navy-200 bg-white p-6 text-center">
              <FolderCog className="mx-auto h-8 w-8 text-steel-300" />
              <p className="mt-2 text-sm font-semibold text-navy-900">No binder requests yet</p>
              <p className="mx-auto mt-1 max-w-xs text-xs text-steel-500">
                Want a done-for-you safety binder built for your company? Start with the intake form.
              </p>
              <Button href="/intake" variant="primary" size="sm" className="mt-4">
                Start intake
              </Button>
            </div>
          )}
        </section>
      </div>

      {/* Orders */}
      {orders.length ? (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-bold text-navy-950">Your orders</h2>
          <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white">
            <ul className="divide-y divide-navy-100">
              {orders.map((o) => (
                <li key={o.id} className="flex items-center gap-4 p-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-navy-900">
                      {allPlans.find((p) => p.id === o.packageId)?.name ?? o.packageId}
                    </p>
                    <p className="text-xs text-steel-500">
                      {formatMonth(o.createdAt.toISOString())} · ${(o.amount / 100).toFixed(2)}{" "}
                      {o.currency.toUpperCase()}
                    </p>
                  </div>
                  <Badge variant={o.status === "PAID" ? "safety" : "muted"}>{o.status}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Billing + settings */}
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <section id="billing" className="scroll-mt-24 rounded-2xl border border-navy-100 bg-white p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-navy-950">
            <CreditCard className="h-5 w-5 text-safety-700" /> Billing
          </h2>
          {subscription ? (
            <>
              <p className="mt-2 text-sm text-steel-600">
                Manage your card, invoices, or cancel anytime — handled securely by Stripe.
              </p>
              <div className="mt-4">
                <BillingPortalButton />
              </div>
            </>
          ) : (
            <>
              <p className="mt-2 text-sm text-steel-600">
                No subscription yet. Pick a plan to unlock the full library.
              </p>
              <Button href="/pricing" variant="secondary" size="sm" className="mt-4">
                View plans
              </Button>
            </>
          )}
        </section>

        <section id="settings" className="scroll-mt-24 rounded-2xl border border-navy-100 bg-white p-6">
          <h2 className="text-lg font-bold text-navy-950">Account settings</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-steel-500">Name</dt>
              <dd className="font-medium text-navy-900">{user?.name ?? "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-steel-500">Company</dt>
              <dd className="font-medium text-navy-900">{user?.company ?? "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-steel-500">Email</dt>
              <dd className="font-medium text-navy-900">{user?.email ?? "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-steel-500">Plan</dt>
              <dd className="font-medium text-navy-900">{plan?.name ?? "Free"}</dd>
            </div>
          </dl>
        </section>
      </div>
    </DashboardShell>
  );
}
