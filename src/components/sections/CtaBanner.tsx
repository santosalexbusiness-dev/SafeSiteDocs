import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBanner({
  title = "Get your safety paperwork organized today",
  subtitle = "Start with the library or have a custom binder built for your company. Either way, you'll look more prepared by next week.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-16 sm:py-20">
      <div className="absolute inset-0 bg-blueprint opacity-50" aria-hidden />
      <div
        className="absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-safety/10 blur-[100px]"
        aria-hidden
      />
      <div className="container relative">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-navy-100/80">{subtitle}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/library" variant="primary" size="lg">
                Get the Safety Library <ArrowRight className="h-5 w-5" />
              </Button>
              <Button href="/custom-binder" variant="ghost-light" size="lg">
                Build My Safety Binder
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
