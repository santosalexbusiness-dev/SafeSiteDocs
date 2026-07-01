"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileCheck2, Search } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { heroOptions } from "@/data/content";

/**
 * The "clean digital safety binder" the construction scene resolves into at the
 * end of the cinematic intro. Shows the three primary site options.
 */
export function DashboardPreview() {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col bg-gradient-to-b from-white to-steel-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-navy-100 bg-white px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-steel-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-steel-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-steel-300" />
        </span>
        <span className="ml-2 flex items-center gap-1.5 rounded-md bg-steel-100 px-2.5 py-1 text-[0.65rem] font-medium text-steel-500">
          <Search className="h-3 w-3" /> safesitedocs.com/dashboard
        </span>
      </div>

      <div className="flex-1 overflow-hidden p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-safety-700">
              Safety binder ready
            </p>
            <p className="font-display text-lg font-extrabold text-navy-950">Welcome back</p>
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-safety">
            AE
          </span>
        </div>

        <div className="mt-4 grid gap-2.5">
          {heroOptions.map((opt, i) => (
            <motion.div
              key={opt.title}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.12, duration: 0.4 }}
            >
              <Link
                href={opt.href}
                className="group flex items-center gap-3 rounded-xl border border-navy-100 bg-white p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-safety hover:shadow-card"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-navy-900 text-safety">
                  <Icon name={opt.icon} className="h-5 w-5" strokeWidth={1.9} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-navy-950">{opt.title}</span>
                  <span className="block truncate text-xs text-steel-500">{opt.description}</span>
                </span>
                <ArrowRight className="h-4 w-4 flex-shrink-0 text-steel-400 transition-transform group-hover:translate-x-1 group-hover:text-safety-700" />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-lg bg-navy-50 px-3 py-2 text-[0.7rem] text-navy-700">
          <FileCheck2 className="h-3.5 w-3.5 text-safety-700" />
          <span className="font-medium">8 new documents added this month</span>
        </div>
      </div>
    </motion.div>
  );
}
