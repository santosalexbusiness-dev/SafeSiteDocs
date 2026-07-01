"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, FileX2 } from "lucide-react";
import { DocumentCard } from "@/components/cards/DocumentCard";
import { documents } from "@/data/documents";
import { categories } from "@/data/categories";
import { industries } from "@/data/industries";

const ALL = "all";

// Hazard filter options derived from the document set.
const hazardOptions = Array.from(new Set(documents.flatMap((d) => d.hazards)))
  .filter((h) => h !== "general")
  .sort();

const typeOptions = Array.from(new Set(documents.map((d) => d.documentType))).sort();

const hazardLabel: Record<string, string> = {
  falls: "Fall Protection",
  ladders: "Ladders",
  ppe: "PPE",
  loto: "Lockout/Tagout",
  electrical: "Electrical",
  chemicals: "Chemicals / HazCom",
  heat: "Heat",
};

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

export function LibraryBrowser({ unlocked = false }: { unlocked?: boolean }) {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [category, setCategory] = useState(params.get("category") ?? ALL);
  const [industry, setIndustry] = useState(params.get("industry") ?? ALL);
  const [hazard, setHazard] = useState(ALL);
  const [docType, setDocType] = useState(ALL);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return documents.filter((d) => {
      if (category !== ALL && d.category !== category) return false;
      if (industry !== ALL && !d.industries.includes(industry) && !d.industries.includes("all"))
        return false;
      if (hazard !== ALL && !d.hazards.includes(hazard)) return false;
      if (docType !== ALL && d.documentType !== docType) return false;
      if (query) {
        const haystack = `${d.title} ${d.description} ${d.documentType}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });
  }, [q, category, industry, hazard, docType]);

  const activeFilters = [category, industry, hazard, docType].filter((v) => v !== ALL).length + (q ? 1 : 0);

  const reset = () => {
    setQ("");
    setCategory(ALL);
    setIndustry(ALL);
    setHazard(ALL);
    setDocType(ALL);
  };

  return (
    <div>
      {/* Search + filters */}
      <div className="rounded-2xl border border-navy-100 bg-white p-4 shadow-card sm:p-6">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-steel-400" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search documents — e.g. ladder, JHA, incident report…"
            aria-label="Search documents"
            className="h-12 w-full rounded-xl border border-navy-200 bg-white pl-11 pr-4 text-sm font-medium text-navy-900 placeholder:text-steel-400 focus-visible:ring-2 focus-visible:ring-safety"
          />
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Select
            label="Category"
            value={category}
            onChange={setCategory}
            options={[
              { value: ALL, label: "All categories" },
              ...categories.map((c) => ({ value: c.slug, label: c.name })),
            ]}
          />
          <Select
            label="Industry"
            value={industry}
            onChange={setIndustry}
            options={[
              { value: ALL, label: "All industries" },
              ...industries.map((i) => ({ value: i.slug, label: i.name })),
            ]}
          />
          <Select
            label="Hazard"
            value={hazard}
            onChange={setHazard}
            options={[
              { value: ALL, label: "All hazards" },
              ...hazardOptions.map((h) => ({ value: h, label: hazardLabel[h] ?? h })),
            ]}
          />
          <Select
            label="Document type"
            value={docType}
            onChange={setDocType}
            options={[
              { value: ALL, label: "All types" },
              ...typeOptions.map((t) => ({ value: t, label: t })),
            ]}
          />
        </div>
      </div>

      {/* Result bar */}
      <div className="mt-6 flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm text-steel-600">
          <SlidersHorizontal className="h-4 w-4 text-steel-400" />
          <span className="font-semibold text-navy-900">{filtered.length}</span> document
          {filtered.length === 1 ? "" : "s"}
          {activeFilters > 0 ? ` · ${activeFilters} filter${activeFilters === 1 ? "" : "s"} active` : ""}
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

      {/* Results — public preview: free samples are downloadable, others locked. */}
      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} locked={!unlocked} />
          ))}
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center justify-center rounded-2xl border border-dashed border-navy-200 bg-navy-50 py-16 text-center">
          <FileX2 className="h-10 w-10 text-steel-300" />
          <p className="mt-3 font-semibold text-navy-900">No documents match those filters</p>
          <p className="mt-1 text-sm text-steel-500">Try clearing a filter or searching a broader term.</p>
          <button type="button" onClick={reset} className="mt-4 btn btn-outline btn-sm">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
