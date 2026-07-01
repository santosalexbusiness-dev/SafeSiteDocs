import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { pageMetadata } from "@/lib/seo";
import { categories } from "@/data/categories";

export const metadata: Metadata = pageMetadata({
  title: "Document Categories — Safety Forms by Topic",
  description:
    "Browse contractor safety documents by category: safety manuals, toolbox talks, PPE forms, JHA/JSA, training logs, inspection checklists, incident reports, LOTO, fall protection, and more.",
  path: "/categories",
});

export default function CategoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Document categories"
        title="Browse safety documents by category"
        intro={`All ${categories.length} categories in the library — from full written programs to single-page checklists. Pick a category to jump straight into matching templates.`}
        crumbs={[{ label: "Categories" }]}
        primaryCta={{ label: "Open the library", href: "/library" }}
      />

      <CategoriesSection />

      <CtaBanner />
    </>
  );
}
