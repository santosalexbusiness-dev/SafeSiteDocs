import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PricingCard } from "@/components/cards/PricingCard";
import { DisclaimerBlock } from "@/components/ui/DisclaimerBlock";
import { subscriptionPlans, oneTimePlans } from "@/data/pricing";

export function PricingSection({
  showDisclaimer = false,
  tone = "muted",
}: {
  showDisclaimer?: boolean;
  tone?: "light" | "muted";
}) {
  return (
    <Section tone={tone} id="pricing">
      <SectionHeader
        eyebrow="Pricing"
        title="Simple plans for every contractor"
        intro="Subscribe to the library month-to-month, or get a one-time custom binder built for your company. No long-term contracts."
      />

      {/* Subscriptions */}
      <div className="mt-12">
        <p className="mb-5 text-center text-sm font-semibold uppercase tracking-widest text-steel-500">
          Monthly Document Library
        </p>
        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
          {subscriptionPlans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.08}>
              <PricingCard plan={plan} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* One-time packages */}
      <div className="mt-16">
        <p className="mb-5 text-center text-sm font-semibold uppercase tracking-widest text-steel-500">
          One-Time Custom Binder Packages
        </p>
        <div className="grid gap-6 lg:grid-cols-3">
          {oneTimePlans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.08}>
              <PricingCard plan={plan} />
            </Reveal>
          ))}
        </div>
      </div>

      {showDisclaimer ? <DisclaimerBlock className="mx-auto mt-10 max-w-4xl" /> : null}
    </Section>
  );
}
