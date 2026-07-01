import { Button } from "@/components/ui/Button";
import { TriangleAlert } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-navy-950 px-5 py-20 text-center text-white">
      <div className="absolute inset-0 bg-blueprint opacity-50" aria-hidden />
      <div className="relative">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-safety/15 ring-1 ring-safety/40">
          <TriangleAlert className="h-8 w-8 text-safety" />
        </span>
        <p className="mt-6 font-display text-6xl font-extrabold text-safety">404</p>
        <h1 className="mt-2 font-display text-2xl font-extrabold">This page isn&apos;t on the jobsite</h1>
        <p className="mx-auto mt-3 max-w-md text-navy-100/70">
          The page you&apos;re looking for moved or never existed. Let&apos;s get you back to safety.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/" variant="primary" size="lg">
            Back to home
          </Button>
          <Button href="/library" variant="ghost-light" size="lg">
            Browse the library
          </Button>
        </div>
      </div>
    </section>
  );
}
