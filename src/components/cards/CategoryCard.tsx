import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import type { Category } from "@/data/categories";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/library?category=${category.slug}`}
      className="card card-hover group flex flex-col p-5"
    >
      <div className="flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-safety transition-colors group-hover:bg-navy-800">
          <Icon name={category.icon} className="h-6 w-6" strokeWidth={1.8} />
        </span>
        <ArrowUpRight className="h-5 w-5 text-steel-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-safety-700" />
      </div>
      <h3 className="mt-4 text-base font-bold text-navy-950">{category.name}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-steel-600">{category.description}</p>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-steel-400">
        {category.count} documents
      </p>
    </Link>
  );
}
