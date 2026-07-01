"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const baseControl =
  "w-full rounded-lg border bg-white px-3.5 text-sm text-navy-900 placeholder:text-steel-400 transition-colors focus-visible:ring-2 focus-visible:ring-safety disabled:opacity-60";

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-navy-900">
      {children}
      {required ? <span className="text-hazard"> *</span> : null}
    </label>
  );
}

function ErrorText({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-red-600">
      {children}
    </p>
  );
}

type FieldBase = { label: string; error?: string; hint?: string; required?: boolean };

export const TextField = forwardRef<
  HTMLInputElement,
  FieldBase & React.InputHTMLAttributes<HTMLInputElement>
>(function TextField({ label, error, hint, required, id, className, ...props }, ref) {
  const fieldId = id || props.name || label;
  return (
    <div>
      <Label htmlFor={fieldId} required={required}>
        {label}
      </Label>
      <input
        id={fieldId}
        ref={ref}
        aria-invalid={!!error}
        aria-describedby={error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
        className={cn(baseControl, "h-11", error ? "border-red-400" : "border-navy-200", className)}
        {...props}
      />
      {hint && !error ? (
        <p id={`${fieldId}-hint`} className="mt-1.5 text-xs text-steel-500">
          {hint}
        </p>
      ) : null}
      <ErrorText id={`${fieldId}-error`}>{error}</ErrorText>
    </div>
  );
});

export const TextAreaField = forwardRef<
  HTMLTextAreaElement,
  FieldBase & React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function TextAreaField({ label, error, hint, required, id, className, ...props }, ref) {
  const fieldId = id || props.name || label;
  return (
    <div>
      <Label htmlFor={fieldId} required={required}>
        {label}
      </Label>
      <textarea
        id={fieldId}
        ref={ref}
        rows={4}
        aria-invalid={!!error}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={cn(baseControl, "py-2.5", error ? "border-red-400" : "border-navy-200", className)}
        {...props}
      />
      {hint && !error ? <p className="mt-1.5 text-xs text-steel-500">{hint}</p> : null}
      <ErrorText id={`${fieldId}-error`}>{error}</ErrorText>
    </div>
  );
});

export const SelectField = forwardRef<
  HTMLSelectElement,
  FieldBase & React.SelectHTMLAttributes<HTMLSelectElement> & { options: { value: string; label: string }[] }
>(function SelectField({ label, error, required, id, options, className, ...props }, ref) {
  const fieldId = id || props.name || label;
  return (
    <div>
      <Label htmlFor={fieldId} required={required}>
        {label}
      </Label>
      <select
        id={fieldId}
        ref={ref}
        aria-invalid={!!error}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={cn(baseControl, "h-11", error ? "border-red-400" : "border-navy-200", className)}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ErrorText id={`${fieldId}-error`}>{error}</ErrorText>
    </div>
  );
});

/** Yes/No toggle used heavily in the intake form's hazard questions. */
export function YesNo({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: boolean | null;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-navy-100 bg-white px-4 py-3">
      <span className="text-sm font-medium text-navy-800">{label}</span>
      <div className="flex flex-shrink-0 overflow-hidden rounded-lg border border-navy-200" role="group" aria-label={label}>
        {[
          { v: true, t: "Yes" },
          { v: false, t: "No" },
        ].map((opt) => {
          const active = value === opt.v;
          return (
            <button
              key={opt.t}
              type="button"
              name={name}
              aria-pressed={active}
              onClick={() => onChange(opt.v)}
              className={cn(
                "px-4 py-1.5 text-sm font-semibold transition-colors",
                active
                  ? opt.v
                    ? "bg-navy-900 text-safety"
                    : "bg-steel-200 text-navy-900"
                  : "bg-white text-steel-500 hover:bg-navy-50"
              )}
            >
              {opt.t}
            </button>
          );
        })}
      </div>
    </div>
  );
}
