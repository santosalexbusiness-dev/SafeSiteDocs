"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import type { Violation } from "@/data/violations";
import { cn } from "@/lib/utils";

/**
 * A floating OSHA-style callout pinned over a hazard hotspot in the drone scene.
 * Marketing/educational examples only — see PENALTY_DISCLAIMER in the hero.
 */
export function HazardCallout({ violation, index }: { violation: Violation; index: number }) {
  const placeLeft = violation.x > 56;
  const placeUp = violation.y > 60;

  return (
    <motion.div
      key={violation.id}
      className="pointer-events-none absolute z-20"
      style={{ left: `${violation.x}%`, top: `${violation.y}%` }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Pulsing hotspot marker */}
      <span className="absolute -left-2 -top-2 flex h-4 w-4">
        <span className="absolute inline-flex h-full w-full rounded-full bg-safety/70 motion-safe:animate-pulse-ring" />
        <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-safety bg-safety/30" />
      </span>

      {/* Connector + card */}
      <div
        className={cn(
          "absolute w-[min(15rem,52vw)]",
          placeLeft ? "right-1 sm:right-2" : "left-1 sm:left-2",
          placeUp ? "bottom-3" : "top-3"
        )}
      >
        <div className="rounded-lg border border-safety/40 bg-navy-950/85 p-2.5 shadow-glow backdrop-blur-sm">
          <div className="flex items-start gap-2">
            <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-safety/15">
              <AlertTriangle className="h-3.5 w-3.5 text-safety" />
            </span>
            <div className="min-w-0">
              <p className="text-[0.7rem] font-bold uppercase tracking-wide text-white">
                {violation.title}
              </p>
              <p className="mt-0.5 text-[0.65rem] leading-snug text-navy-100/70">
                {violation.hazard}
              </p>
              <p className="mt-1 text-[0.7rem] font-semibold text-safety">
                {violation.penalty}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
