"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Send } from "lucide-react";
import { TextField, TextAreaField, SelectField } from "./fields";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  company: z.string().optional(),
  topic: z.string().min(1, "Pick a topic"),
  message: z.string().min(10, "Tell us a little more (10+ characters)"),
  botField: z.string().optional(),
});

type ContactValues = z.infer<typeof schema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({ resolver: zodResolver(schema), defaultValues: { topic: "" } });

  async function onSubmit(values: ContactValues) {
    setSubmitError(undefined);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        setSubmitError(
          data?.error || "Something went wrong. Please email us directly at contact@safesitedocs.org."
        );
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitError("Network error. Please email us directly at contact@safesitedocs.org.");
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
        <h3 className="mt-4 text-xl font-bold text-navy-950">Message sent</h3>
        <p className="mt-2 text-steel-600">
          Thanks for reaching out. We&apos;ll get back to you by email within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Honeypot — hidden from real users; bots that fill it are silently dropped. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Company website
          <input type="text" tabIndex={-1} autoComplete="off" {...register("botField")} />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Name" required error={errors.name?.message} {...register("name")} />
        <TextField
          label="Email"
          type="email"
          required
          error={errors.email?.message}
          {...register("email")}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Company" error={errors.company?.message} {...register("company")} />
        <SelectField
          label="What's this about?"
          required
          error={errors.topic?.message}
          {...register("topic")}
          options={[
            { value: "", label: "Select a topic…" },
            { value: "library", label: "Document Library" },
            { value: "custom-binder", label: "Custom Safety Binder" },
            { value: "billing", label: "Billing / account" },
            { value: "other", label: "Something else" },
          ]}
        />
      </div>
      <TextAreaField
        label="Message"
        required
        rows={5}
        error={errors.message?.message}
        {...register("message")}
      />
      {submitError ? (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {submitError}
        </p>
      ) : null}
      <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send message"} <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
