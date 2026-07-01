"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, RotateCcw, ChevronDown, Radio } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DroneScene } from "./DroneScene";
import { DashboardPreview } from "./DashboardPreview";
import { HazardCallout } from "./HazardCallout";
import { violations } from "@/data/violations";
import { PENALTY_DISCLAIMER } from "@/data/site";

type Phase = "scan" | "reveal";

const STEP_MS = 880;
const START_MS = 650;
const DWELL_MS = 1300;

export function CinematicHero() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("scan");
  const [activeStep, setActiveStep] = useState(violations.length);
  const [altitude, setAltitude] = useState(420);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const altTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (altTimer.current) clearInterval(altTimer.current);
  }, []);

  const runTimeline = useCallback(() => {
    clearTimers();
    setActiveStep(0);
    setAltitude(420);
    setPhase("scan");

    violations.forEach((v) => {
      timers.current.push(
        setTimeout(() => setActiveStep(v.step), START_MS + v.step * STEP_MS)
      );
    });
    const total = START_MS + violations.length * STEP_MS + DWELL_MS;
    timers.current.push(setTimeout(() => setPhase("reveal"), total));

    // Altitude readout ticks down during the descent.
    altTimer.current = setInterval(() => {
      setAltitude((a) => (a > 70 ? a - 6 : a));
    }, total / 64);
  }, [clearTimers]);

  useEffect(() => {
    if (reduce) {
      // Reduced motion: skip the descent, show all callouts + reveal the options.
      setActiveStep(violations.length);
      setPhase("reveal");
      return;
    }
    runTimeline();
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  const skip = () => {
    clearTimers();
    setPhase("reveal");
  };

  const visibleCallouts = violations.filter((v) => v.step <= activeStep);

  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-blueprint opacity-60" aria-hidden />
      <div
        className="absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-navy-600/30 blur-[120px]"
        aria-hidden
      />
      <div className="hazard-bar absolute inset-x-0 top-0 opacity-90" aria-hidden />

      <div className="container relative grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-20">
        {/* ---------- Copy ---------- */}
        <div className="max-w-xl">
          <p className="eyebrow-light mb-4">
            <Radio className="h-3.5 w-3.5" />
            Jobsite hazards → organized paperwork
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            Safety paperwork for contractors —{" "}
            <span className="text-safety">organized, editable,</span> and ready when you need it.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-navy-100/80">
            Get access to a growing library of safety templates, toolbox talks, checklists, and
            forms — or have a custom safety binder built for your company.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/library" variant="primary" size="lg">
              Get the Safety Library
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button href="/custom-binder" variant="ghost-light" size="lg">
              Build My Safety Binder
            </Button>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-navy-100/70">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-safety" /> Editable Word + clean PDF
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-safety" /> Updated regularly
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-safety" /> Built by an EHS pro
            </span>
          </div>

          <p className="mt-6 max-w-md text-xs leading-relaxed text-navy-100/45">
            {PENALTY_DISCLAIMER}
          </p>
        </div>

        {/* ---------- Drone monitor ---------- */}
        <div className="relative">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-navy-900 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] ring-1 ring-inset ring-white/5">
            {/* The scene (descends during scan, then dashboard takes over) */}
            <AnimatePresence>
              {phase === "scan" && (
                <motion.div
                  key="scene"
                  className="absolute inset-0"
                  exit={{ opacity: 0, scale: 1.05, filter: "blur(6px)" }}
                  transition={{ duration: 0.7, ease: "easeIn" }}
                >
                  <motion.div
                    className="absolute inset-0"
                    initial={reduce ? false : { scale: 1.18, y: "-3%" }}
                    animate={{ scale: 1, y: "0%" }}
                    transition={{ duration: 9, ease: [0.33, 0, 0.2, 1] }}
                  >
                    <DroneScene className="h-full w-full" />
                  </motion.div>

                  {/* Callouts */}
                  <AnimatePresence>
                    {visibleCallouts.map((v, i) => (
                      <HazardCallout key={v.id} violation={v} index={i} />
                    ))}
                  </AnimatePresence>

                  {/* HUD overlay */}
                  <HeroHud altitude={altitude} reduce={!!reduce} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dashboard reveal */}
            <AnimatePresence>{phase === "reveal" && <DashboardPreview key="dash" />}</AnimatePresence>
          </div>

          {/* Replay control under the monitor */}
          <div className="mt-3 flex items-center justify-between px-1">
            <p className="text-xs text-navy-100/50">
              {phase === "scan" ? "Live safety scan in progress…" : "Your safety binder, organized."}
            </p>
            {!reduce && (
              <button
                type="button"
                onClick={phase === "scan" ? skip : runTimeline}
                className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold text-safety hover:bg-white/5"
              >
                {phase === "scan" ? (
                  <>
                    Skip intro <ArrowRight className="h-3.5 w-3.5" />
                  </>
                ) : (
                  <>
                    <RotateCcw className="h-3.5 w-3.5" /> Replay scan
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="relative flex justify-center pb-8" aria-hidden>
        <ChevronDown className="h-5 w-5 animate-bounce text-navy-100/40" />
      </div>
    </section>
  );
}

/** Tactical drone-cam HUD overlay (corner brackets, REC dot, altitude, scan line). */
function HeroHud({ altitude, reduce }: { altitude: number; reduce: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Corner brackets */}
      <span className="absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-safety/70" />
      <span className="absolute right-3 top-3 h-5 w-5 border-r-2 border-t-2 border-safety/70" />
      <span className="absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-safety/70" />
      <span className="absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-safety/70" />

      {/* Top status row */}
      <div className="absolute inset-x-4 top-4 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-widest text-safety/90">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 motion-safe:animate-pulse" /> Rec · Safety Scan
        </span>
        <span>ALT {Math.round(altitude)} ft ▼</span>
      </div>

      {/* Center crosshair */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40">
        <div className="h-10 w-px bg-safety/60" />
        <div className="absolute left-1/2 top-1/2 h-px w-10 -translate-x-1/2 -translate-y-1/2 bg-safety/60" />
      </div>

      {/* Scan line */}
      {!reduce && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="h-10 w-full bg-gradient-to-b from-transparent via-safety/20 to-transparent animate-scan-line" />
        </div>
      )}
    </div>
  );
}
