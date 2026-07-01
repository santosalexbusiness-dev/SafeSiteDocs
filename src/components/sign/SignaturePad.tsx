"use client";

import { useEffect, useRef, useState } from "react";
import { Eraser, Check, PenLine, Type as TypeIcon, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export type SigData = { kind: "draw" | "type"; data: string; signedAt: string };

const SCRIPT_FONT = '"Segoe Script", "Bradley Hand", "Snell Roundhand", cursive';

/**
 * Captures a signature by drawing (canvas) or typing, and stamps the moment it
 * was applied (`signedAt`). Intended for internal recordkeeping — for legally
 * binding e-signatures add identity verification, consent, and a tamper-evident
 * audit trail (or use a dedicated e-sign provider).
 */
export function SignaturePad({
  signed,
  onSign,
  onClear,
}: {
  signed: SigData | null;
  onSign: (s: SigData) => void;
  onClear: () => void;
}) {
  const [mode, setMode] = useState<"draw" | "type">("draw");
  const [typed, setTyped] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const dirty = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || signed || mode !== "draw") return;
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(ratio, ratio);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#0B1A30";
    dirty.current = false;
  }, [signed, mode]);

  const point = (e: React.PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };
  const onDown = (e: React.PointerEvent) => {
    e.preventDefault();
    drawing.current = true;
    const ctx = canvasRef.current!.getContext("2d")!;
    const { x, y } = point(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    const { x, y } = point(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    dirty.current = true;
  };
  const onUp = () => {
    drawing.current = false;
  };

  const clearCanvas = () => {
    const c = canvasRef.current;
    if (!c) return;
    c.getContext("2d")!.clearRect(0, 0, c.width, c.height);
    dirty.current = false;
  };

  const apply = () => {
    const signedAt = new Date().toISOString();
    if (mode === "draw") {
      if (!dirty.current) return;
      onSign({ kind: "draw", data: canvasRef.current!.toDataURL("image/png"), signedAt });
    } else {
      if (!typed.trim()) return;
      onSign({ kind: "type", data: typed.trim(), signedAt });
    }
  };

  if (signed) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2">
        <div className="min-w-0">
          {signed.kind === "draw" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={signed.data} alt="signature" className="h-9" />
          ) : (
            <span className="text-xl leading-none text-navy-900" style={{ fontFamily: SCRIPT_FONT }}>
              {signed.data}
            </span>
          )}
          <span className="mt-1 block text-[0.65rem] text-steel-500">
            Signed {new Date(signed.signedAt).toLocaleString()}
          </span>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="inline-flex flex-shrink-0 items-center gap-1 text-xs font-semibold text-steel-500 hover:text-navy-900"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Re-sign
        </button>
      </div>
    );
  }

  const tab = (active: boolean) =>
    cn(
      "inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold",
      active ? "bg-navy-900 text-safety" : "text-steel-500 hover:bg-navy-50"
    );

  return (
    <div className="rounded-lg border border-navy-200 bg-white p-2">
      <div className="mb-2 flex gap-1">
        <button type="button" onClick={() => setMode("draw")} className={tab(mode === "draw")}>
          <PenLine className="h-3.5 w-3.5" /> Draw
        </button>
        <button type="button" onClick={() => setMode("type")} className={tab(mode === "type")}>
          <TypeIcon className="h-3.5 w-3.5" /> Type
        </button>
      </div>

      {mode === "draw" ? (
        <canvas
          ref={canvasRef}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerLeave={onUp}
          className="h-24 w-full touch-none rounded-md border border-dashed border-navy-300 bg-steel-50"
          aria-label="Signature drawing area"
        />
      ) : (
        <input
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          placeholder="Type your full name"
          aria-label="Type your signature"
          className="h-16 w-full rounded-md border border-navy-200 px-3 text-2xl text-navy-900"
          style={{ fontFamily: SCRIPT_FONT }}
        />
      )}

      <div className="mt-2 flex items-center justify-between">
        <button
          type="button"
          onClick={mode === "draw" ? clearCanvas : () => setTyped("")}
          className="inline-flex items-center gap-1 text-xs font-medium text-steel-500 hover:text-navy-900"
        >
          <Eraser className="h-3.5 w-3.5" /> Clear
        </button>
        <button type="button" onClick={apply} className="btn btn-primary btn-sm">
          <Check className="h-3.5 w-3.5" /> Apply signature
        </button>
      </div>
    </div>
  );
}
