"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UploadCloud, FileText, X, ArrowRight, ShieldCheck } from "lucide-react";
import { TextField, TextAreaField, SelectField, YesNo } from "./fields";
import { TermsCheckbox } from "./TermsCheckbox";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  hazardQuestions,
  employeeRanges,
  packageOptions,
  currentDocsOptions,
  prequalOptions,
} from "@/data/intake";
import { industries } from "@/data/industries";

const schema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  contactName: z.string().min(2, "Contact name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  website: z.string().optional(),
  states: z.string().min(2, "Enter at least one state"),
  industry: z.string().min(1, "Select your industry"),
  employees: z.string().min(1, "Select your crew size"),
  workPerformed: z.string().min(10, "Briefly describe the work you perform"),
  currentDocs: z.string().min(1, "Select an option"),
  concerns: z.string().optional(),
  desiredPackage: z.string().min(1, "Select a package"),
  requiredBy: z.string().optional(),
});

type IntakeValues = z.infer<typeof schema>;

function FormSection({
  step,
  title,
  description,
  children,
}: {
  step: number;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
      <div className="mb-6 flex items-start gap-3">
        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-navy-900 text-sm font-bold text-safety">
          {step}
        </span>
        <div>
          <h2 className="text-lg font-display font-extrabold text-navy-950">{title}</h2>
          {description ? <p className="mt-0.5 text-sm text-steel-500">{description}</p> : null}
        </div>
      </div>
      {children}
    </section>
  );
}

export function IntakeForm({ defaultPackage = "" }: { defaultPackage?: string }) {
  const router = useRouter();
  const [hazards, setHazards] = useState<Record<string, boolean | null>>(
    Object.fromEntries(hazardQuestions.map((q) => [q.id, null]))
  );
  const [files, setFiles] = useState<File[]>([]);
  const [prequal, setPrequal] = useState<string[]>([]);
  const [terms, setTerms] = useState(false);
  const [termsError, setTermsError] = useState<string>();

  const togglePrequal = (id: string) =>
    setPrequal((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IntakeValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      desiredPackage: packageOptions.some((p) => p.value === defaultPackage) ? defaultPackage : "",
    },
  });

  function addFiles(list: FileList | null) {
    if (!list) return;
    setFiles((prev) => [...prev, ...Array.from(list)].slice(0, 8));
  }

  async function onSubmit(values: IntakeValues) {
    if (!terms) {
      setTermsError("Please confirm you understand these are templates you remain responsible for.");
      return;
    }
    // Send fields + file bytes as multipart so the API can store attachments.
    const fd = new FormData();
    fd.set("data", JSON.stringify({ ...values, hazards, prequal }));
    for (const f of files) fd.append("files", f);

    try {
      await fetch("/api/intake", { method: "POST", body: fd });
    } catch {
      // Optimistic: still route to confirmation. Add real error handling in prod.
    }
    router.push("/intake/confirmation");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* 1 — Company */}
      <FormSection step={1} title="Tell us about your company" description="The basics so we can brand and scope your binder.">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField label="Company name" required error={errors.companyName?.message} {...register("companyName")} />
          <TextField label="Contact name" required error={errors.contactName?.message} {...register("contactName")} />
          <TextField label="Email" type="email" required error={errors.email?.message} {...register("email")} />
          <TextField label="Phone" type="tel" error={errors.phone?.message} {...register("phone")} />
          <TextField label="Website" placeholder="https://" error={errors.website?.message} {...register("website")} />
          <TextField
            label="State(s) of operation"
            required
            hint="Comma-separated, e.g. TX, OK, AR"
            error={errors.states?.message}
            {...register("states")}
          />
          <SelectField
            label="Industry"
            required
            error={errors.industry?.message}
            {...register("industry")}
            options={[
              { value: "", label: "Select your trade…" },
              ...industries.map((i) => ({ value: i.slug, label: i.name })),
              { value: "other", label: "Other" },
            ]}
          />
          <SelectField
            label="Number of employees"
            required
            error={errors.employees?.message}
            {...register("employees")}
            options={[{ value: "", label: "Select crew size…" }, ...employeeRanges]}
          />
        </div>
        <div className="mt-5">
          <TextAreaField
            label="Type of work performed"
            required
            hint="The main tasks and scopes your crews handle."
            error={errors.workPerformed?.message}
            {...register("workPerformed")}
          />
        </div>
      </FormSection>

      {/* 2 — Hazards */}
      <FormSection
        step={2}
        title="Your work & hazards"
        description="Answer what applies — this drives which forms we include."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {hazardQuestions.map((q) => (
            <YesNo
              key={q.id}
              name={q.id}
              label={q.label}
              value={hazards[q.id]}
              onChange={(v) => setHazards((prev) => ({ ...prev, [q.id]: v }))}
            />
          ))}
        </div>
      </FormSection>

      {/* 3 — Current docs + package */}
      <FormSection step={3} title="Where you're starting from" description="So we don't rebuild what you already have.">
        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField
            label="Current safety documents available?"
            required
            error={errors.currentDocs?.message}
            {...register("currentDocs")}
            options={[{ value: "", label: "Select…" }, ...currentDocsOptions]}
          />
          <SelectField
            label="Desired package"
            required
            error={errors.desiredPackage?.message}
            {...register("desiredPackage")}
            options={[{ value: "", label: "Select a package…" }, ...packageOptions]}
          />
        </div>

        {/* Prequalification / compliance — high-intent buying trigger */}
        <div className="mt-5">
          <p className="mb-1.5 block text-sm font-semibold text-navy-900">
            Do you need to meet a prequalification requirement?{" "}
            <span className="font-normal text-steel-400">(select any that apply)</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {prequalOptions.map((opt) => {
              const active = prequal.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => togglePrequal(opt.id)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                    active
                      ? "border-navy-900 bg-navy-900 text-safety"
                      : "border-navy-200 bg-white text-steel-600 hover:border-navy-300"
                  )}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-5">
          <TextField
            label="Required by (client / GC name)"
            placeholder="e.g., our GC asked for ISNetworld before the next job"
            error={errors.requiredBy?.message}
            {...register("requiredBy")}
          />
        </div>

        <div className="mt-5">
          <TextAreaField
            label="Main concerns"
            hint="What's prompting this? GC requirements, an upcoming job, an audit, getting organized…"
            error={errors.concerns?.message}
            {...register("concerns")}
          />
        </div>

        {/* Upload */}
        <div className="mt-5">
          <p className="mb-1.5 block text-sm font-semibold text-navy-900">
            Upload current documents <span className="font-normal text-steel-400">(optional)</span>
          </p>
          <label
            htmlFor="intake-files"
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-navy-200 bg-navy-50 px-4 py-8 text-center transition-colors hover:border-safety hover:bg-safety-50"
          >
            <UploadCloud className="h-8 w-8 text-steel-400" />
            <span className="mt-2 text-sm font-semibold text-navy-900">
              Click to add files
            </span>
            <span className="mt-0.5 text-xs text-steel-500">
              Word, PDF, or Excel · up to 8 files
            </span>
            <input
              id="intake-files"
              type="file"
              multiple
              accept=".doc,.docx,.pdf,.xls,.xlsx"
              className="sr-only"
              onChange={(e) => addFiles(e.target.files)}
            />
          </label>
          {files.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {files.map((f, i) => (
                <li
                  key={`${f.name}-${i}`}
                  className="flex items-center justify-between rounded-lg border border-navy-100 bg-white px-3 py-2 text-sm"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <FileText className="h-4 w-4 flex-shrink-0 text-safety-700" />
                    <span className="truncate text-navy-800">{f.name}</span>
                  </span>
                  <button
                    type="button"
                    aria-label={`Remove ${f.name}`}
                    onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
                    className="ml-2 flex-shrink-0 rounded p-1 text-steel-400 hover:bg-navy-50 hover:text-navy-900"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </FormSection>

      {/* 4 — Terms + submit */}
      <FormSection step={4} title="Confirm & submit" description="One quick acknowledgement and you're done.">
        <TermsCheckbox checked={terms} onChange={(v) => { setTerms(v); setTermsError(undefined); }} error={termsError} />
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Submitting…" : "Submit intake form"} <ArrowRight className="h-5 w-5" />
          </Button>
          <p className="flex items-center gap-1.5 text-xs text-steel-500">
            <ShieldCheck className="h-4 w-4 text-safety-700" />
            We use your details only to scope and build your binder.
          </p>
        </div>
      </FormSection>
    </form>
  );
}
