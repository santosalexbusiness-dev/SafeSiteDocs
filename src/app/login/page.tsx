import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthCard } from "@/components/auth/AuthCard";
import { pageMetadata } from "@/lib/seo";
import { allPlans } from "@/data/pricing";

export const metadata: Metadata = pageMetadata({
  title: "Log In or Create Your Account",
  description: "Log in to access your SafeSite Documents safety library and custom binder requests.",
  path: "/login",
  noindex: true,
});

export default function LoginPage({ searchParams }: { searchParams: { plan?: string } }) {
  const plan = allPlans.find((p) => p.id === searchParams.plan);

  return (
    <section className="relative flex min-h-[calc(100dvh-4.5rem)] items-center justify-center overflow-hidden bg-steel-50 px-5 py-16">
      <div className="absolute inset-0 bg-grid opacity-[0.5]" aria-hidden />
      <div className="relative">
        <Suspense fallback={null}>
          <AuthCard planLabel={plan?.name} />
        </Suspense>
      </div>
    </section>
  );
}
