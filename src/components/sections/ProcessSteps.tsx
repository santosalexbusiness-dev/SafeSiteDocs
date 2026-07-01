import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { binderProcess } from "@/data/content";

export function ProcessSteps({ withCta = true }: { withCta?: boolean }) {
  return (
    <Section tone="dark" id="process">
      <SectionHeader
        tone="dark"
        eyebrow="Custom safety binder process"
        title="Built for your company in four steps"
        intro="No guesswork and no templates you have to figure out alone. Tell us about your work and we handle the assembly."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {binderProcess.map((step, i) => (
          <Reveal key={step.step} delay={i * 0.1}>
            <div className="relative h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-safety text-navy-950">
                  <Icon name={step.icon} className="h-6 w-6" strokeWidth={1.9} />
                </span>
                <span className="font-display text-5xl font-extrabold text-white/10">
                  {String(step.step).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 text-base font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-100/70">{step.description}</p>

              {i < binderProcess.length - 1 ? (
                <span
                  className="absolute -right-3 top-12 hidden h-px w-6 bg-safety/40 lg:block"
                  aria-hidden
                />
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>

      {withCta ? (
        <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button href="/intake" variant="primary" size="lg">
            Start My Intake Form
          </Button>
          <Button href="/custom-binder" variant="ghost-light" size="lg">
            Learn how it works
          </Button>
        </div>
      ) : null}
    </Section>
  );
}
