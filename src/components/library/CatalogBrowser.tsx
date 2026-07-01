"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, FileX2 } from "lucide-react";
import { CatalogCard } from "@/components/cards/CatalogCard";
import {
  catalog,
  catalogCategories,
  documentTypes,
  industryOptions,
  accessLevels,
  matchesIndustry,
} from "@/data/libraryCatalog";

const ALL = "all";
const PAGE = 60;

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-steel-500">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-lg border border-navy-200 bg-white px-3 text-sm font-medium text-navy-900 focus-visible:ring-2 focus-visible:ring-safety"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function CatalogBrowser() {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [category, setCategory] = useState(params.get("category") ?? ALL);
  const [industry, setIndustry] = useState(params.get("industry") ?? ALL);
  const [docType, setDocType] = useState(params.get("type") ?? ALL);
  const [access, setAccess] = useState(ALL);
  const [visible, setVisible] = useState(PAGE);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return catalog.filter((d) => {
      if (category !== ALL && d.category !== category) return false;
      if (industry !== ALL && !matchesIndustry(d, industry)) return false;
      if (docType !== ALL && d.documentType !== docType) return false;
      if (access !== ALL && d.accessLevel !== access) return false;
      if (query) {
        const hay = `${d.title} ${d.description} ${d.categoryName} ${d.tags.join(" ")}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    });
  }, [q, category, industry, docType, access]);

  const activeFilters =
    [category, industry, docType, access].filter((v) => v !== ALL).length + (q ? 1 : 0);

  const reset = () => {
    setQ("");
    setCategory(ALL);
    setIndustry(ALL);
    setDocType(ALL);
    setAccess(ALL);
    setVisible(PAGE);
  };

  const shown = filtered.slice(0, visible);

  return (
    <div>
      {/* Search + filters */}
      <div className="rounded-2xl border border-navy-100 bg-white p-4 shadow-card sm:p-6">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-steel-400" />
          <input
            type="search"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setVisible(PAGE);
            }}
            placeholder="Search 350+ templates — e.g. ladder, JHA, lockout, heat…"
            aria-label="Search templates"
            className="h-12 w-full rounded-xl border border-navy-200 bg-white pl-11 pr-4 text-sm font-medium text-navy-900 placeholder:text-steel-400 focus-visible:ring-2 focus-visible:ring-safety"
          />
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Select
            label="Category"
            value={category}
            onChange={(v) => {
              setCategory(v);
              setVisible(PAGE);
            }}
            options={[
              { value: ALL, label: "All categories" },
              ...catalogCategories.map((c) => ({ value: c.slug, label: c.name })),
            ]}
          />
          <Select
            label="Industry / trade"
            value={industry}
            onChange={(v) => {
              setIndustry(v);
              setVisible(PAGE);
            }}
            options={[{ value: ALL, label: "All industries" }, ...industryOptions]}
          />
          <Select
            label="Document type"
            value={docType}
            onChange={(v) => {
              setDocType(v);
              setVisible(PAGE);
            }}
            options={[
              { value: ALL, label: "All types" },
              ...documentTypes.map((t) => ({ value: t, label: t })),
            ]}
          />
          <Select
            label="Access level"
            value={access}
            onChange={(v) => {
              setAccess(v);
              setVisible(PAGE);
            }}
            options={[
              { value: ALL, label: "All access levels" },
              ...accessLevels.map((a) => ({ value: a, label: a })),
            ]}
          />
        </div>
      </div>

      {/* Result bar */}
      <div className="mt-6 flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm text-steel-600">
          <SlidersHorizontal className="h-4 w-4 text-steel-400" />
          <span className="font-semibold text-navy-900">{filtered.length}</span> template
          {filtered.length === 1 ? "" : "s"}
          {activeFilters > 0 ? ` · ${activeFilters} filter${activeFilters === 1 ? "" : "s"}` : ""}
        </p>
        {activeFilters > 0 ? (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1 text-sm font-semibold text-navy-700 hover:text-navy-900"
          >
            <X className="h-4 w-4" /> Clear
          </button>
        ) : null}
      </div>

      {filtered.length > 0 ? (
        <>
          <div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {shown.map((doc) => (
              <CatalogCard key={doc.id} doc={doc} />
            ))}
          </div>
          {visible < filtered.length ? (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE)}
                className="btn btn-outline btn-lg"
              >
                Load more ({filtered.length - visible} more)
              </button>
            </div>
          ) : null}
        </>
      ) : (
        <div className="mt-4 flex flex-col items-center justify-center rounded-2xl border border-dashed border-navy-200 bg-navy-50 py-16 text-center">
          <FileX2 className="h-10 w-10 text-steel-300" />
          <p className="mt-3 font-semibold text-navy-900">No templates match those filters</p>
          <p className="mt-1 text-sm text-steel-500">Try a broader search or clear a filter.</p>
          <button type="button" onClick={reset} className="mt-4 btn btn-outline btn-sm">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
