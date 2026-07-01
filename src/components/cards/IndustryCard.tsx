import { Icon } from "@/components/ui/Icon";
import type { Industry } from "@/data/industries";

export function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <div className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:border-safety/40 hover:bg-white/[0.06]">
      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-safety/10 text-safety">
        <Icon name={industry.icon} className="h-5 w-5" strokeWidth={1.9} />
      </span>
      <div className="min-w-0">
        <h3 className="text-sm font-bold text-white">{industry.name}</h3>
        <p className="mt-0.5 truncate text-xs text-navy-100/60">{industry.blurb}</p>
      </div>
    </div>
  );
}
