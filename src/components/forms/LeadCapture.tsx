"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Mail, ArrowRight, Printer } from "lucide-react";
import { TextField, SelectField } from "./fields";
import { Button } from "@/components/ui/Button";
import { industries } from "@/data/industries";
import type { ResolvedPack } from "@/data/freePacks";

const schema = z.object({
  firstName: z.string().min(1, "Enter your first name"),
  email: z.string().email("Enter a valid email"),
  trade: z.string().min(1, "Select your trade so we can tailor your pack"),
});
type Values = z.infer<typeof schema>;

const tradeOptions = [
  { value: "", label: "Select your trade…" },
  ...industries.map((i) => ({ value: i.slug, label: i.name })),
  { value: "default", label: "Other trade / general contractor" },
];

export function LeadCapture({
  packs,
  defaultTrade = "",
  source = "free-starter-pack",
}: {
  packs: Record<string, ResolvedPack>;
  defaultTrade?: string;
  source?: string;
}) {
  const [chosen, setChosen] = useState<ResolvedPack | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { trade: packs[defaultTrade] ? defaultTrade : "" },
  });

  async function onSubmit(values: Values) {
    const pack = packs[values.trade] ?? packs.default;
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, pack: pack.slug, source }),
      });
    } catch {
      /* optimistic */
    }
    setChosen(pack);
  }

  if (chosen) {
    const browseHref = chosen.slug === "default" ? "/library" : `/library?industry=${chosen.slug}`;
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-7 w-7 flex-shrink-0 text-emerald-600" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
              Your free pack is ready
            </p>
            <h3 className="mt-1 font-display text-xl font-extrabold text-navy-950">
              {chosen.headline}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-steel-600">{chosen.intro}</p>
          </div>
        </div>

        <ul className="mt-5 space-y-2.5">
          {chosen.items.map((item, i) => (
            <li key={item.id}>
              <Link
                href={item.route}
                className="group flex items-start gap-3 rounded-xl border border-navy-100 bg-white p-3 transition-all hover:border-safety hover:shadow-sm"
              >
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-navy-900 text-sm font-bold text-safety">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-sm font-bold text-navy-950">{item.title}</span>
                    <span className="flex-shrink-0 rounded-full bg-navy-50 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-steel-500">
                      {item.type}
                    </span>
                  </span>
                  <span className="mt-0.5 block text-xs leading-snug text-steel-500">{item.why}</span>
                </span>
                <Printer className="mt-1 h-4 w-4 flex-shrink-0 text-steel-400 group-hover:text-safety-700" />
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-4 flex items-center gap-2 text-xs text-steel-500">
          <Printer className="h-4 w-4" /> Open any template to read it in full and print it or save it
          as a PDF. We&apos;ve emailed you a copy of these links.
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Button href={browseHref} variant="secondary" size="md">
            Browse your trade&apos;s full library
          </Button>
          <Button href="/pricing" variant="outline" size="md">
            See plans
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
      <p className="eyebrow mb-2">
        <Mail className="h-3.5 w-3.5" /> Free download · no credit card
      </p>
      <h2 className="text-2xl font-display font-extrabold text-navy-950">
        Get your free trade-specific safety pack
      </h2>
      <p className="mt-2 text-steel-600">
        Tell us your trade and we&apos;ll build you a professional starter pack — a written safety
        program, JHAs, checklists, and forms picked for your work. Preview them instantly, free samples included.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="First name" required error={errors.firstName?.message} {...register("firstName")} />
          <TextField label="Work email" type="email" required error={errors.email?.message} {...register("email")} />
        </div>
        <SelectField
          label="What's your trade?"
          required
          error={errors.trade?.message}
          {...register("trade")}
          options={tradeOptions}
        />
        <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Building your pack…" : "Send me my free pack"} <ArrowRight className="h-5 w-5" />
        </Button>
        <p className="text-center text-xs text-steel-400">
          We&apos;ll email occasional safety templates and updates. Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
}
