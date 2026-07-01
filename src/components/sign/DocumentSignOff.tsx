"use client";

import { useState } from "react";
import { Plus, Trash2, Printer, RotateCcw, FileSignature, Info } from "lucide-react";
import { SignaturePad, type SigData } from "./SignaturePad";
import { TextField } from "@/components/forms/fields";
import type { SignConfig } from "@/lib/signing";

type Row = { label: string; name: string; sig: SigData | null };
type Attendee = { id: string; name: string; sig: SigData | null };

const rid = () => Math.random().toString(36).slice(2, 9);
const SCRIPT_FONT = '"Segoe Script","Bradley Hand","Snell Roundhand",cursive';

function esc(s: string) {
  return (s || "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );
}
const fmt = (iso: string) => new Date(iso).toLocaleString();

function sigCell(sig: SigData | null) {
  if (!sig) return "—";
  return sig.kind === "draw"
    ? `<img src="${sig.data}" alt="signature" style="height:34px" />`
    : `<span style="font-family:${SCRIPT_FONT};font-size:20px">${esc(sig.data)}</span>`;
}

/** Builds a standalone printable "completed & signed" sheet and prints it. */
function printSignedSheet(opts: {
  title: string;
  header: { label: string; value: string }[];
  rows: Row[];
  rosterMode: boolean;
}) {
  const headerHtml = opts.header
    .filter((h) => h.value)
    .map((h) => `<div><strong>${esc(h.label)}:</strong> ${esc(h.value)}</div>`)
    .join("");

  const bodyRows = opts.rows
    .filter((r) => r.name || r.sig)
    .map((r, i) => {
      const first = opts.rosterMode ? `${i + 1}` : esc(r.label);
      return `<tr>
        <td>${first}</td>
        <td>${esc(r.name) || "&nbsp;"}</td>
        <td>${sigCell(r.sig)}</td>
        <td>${r.sig ? esc(fmt(r.sig.signedAt)) : "&nbsp;"}</td>
      </tr>`;
    })
    .join("");

  const html = `<!doctype html><html><head><meta charset="utf-8" />
  <title>${esc(opts.title)} — Signed</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: Arial, Helvetica, sans-serif; color:#0B1A30; margin:32px; }
    h1 { font-size:20px; margin:0 0 4px; }
    .meta { color:#65748b; font-size:12px; margin-bottom:16px; }
    .header { display:flex; flex-wrap:wrap; gap:6px 24px; font-size:13px; margin:12px 0 18px; }
    table { width:100%; border-collapse:collapse; font-size:13px; }
    th,td { border:1px solid #0B1A30; padding:8px 10px; text-align:left; vertical-align:middle; }
    th { background:#eef; }
    .foot { margin-top:20px; font-size:10px; color:#65748b; line-height:1.5; }
    @page { margin: 0.6in; }
  </style></head>
  <body>
    <h1>${esc(opts.title)} — Completed &amp; Signed</h1>
    <div class="meta">Digitally completed via SafeSite Documents. Signature timestamps shown in local time.</div>
    <div class="header">${headerHtml || ""}</div>
    <table>
      <thead><tr>
        <th style="width:36px">${opts.rosterMode ? "#" : "Role"}</th>
        <th>Print Name</th><th>Signature</th><th style="width:170px">Signed (timestamp)</th>
      </tr></thead>
      <tbody>${bodyRows || `<tr><td colspan="4">No signatures captured.</td></tr>`}</tbody>
    </table>
    <p class="foot">
      Template / educational resource — not legal advice and not a guarantee of compliance.
      This sheet records digitally captured signatures and timestamps for internal recordkeeping.
      Verify your own recordkeeping requirements. To collect handwritten signatures instead, print
      the blank document and sign on paper.
    </p>
    <script>window.onload = function(){ setTimeout(function(){ window.print(); }, 250); };</script>
  </body></html>`;

  const w = window.open("", "_blank", "width=860,height=1000");
  if (!w) {
    alert("Please allow pop-ups to print the signed copy.");
    return;
  }
  w.document.write(html);
  w.document.close();
}

export function DocumentSignOff({
  docId,
  title,
  config,
}: {
  docId: string;
  title: string;
  config: SignConfig;
}) {
  const [header, setHeader] = useState<Record<string, string>>(
    Object.fromEntries(config.header.map((h) => [h.id, h.default ?? ""]))
  );
  const [attendees, setAttendees] = useState<Attendee[]>([{ id: rid(), name: "", sig: null }]);
  const [blocks, setBlocks] = useState<Record<string, { name: string; sig: SigData | null }>>(
    Object.fromEntries((config.blocks ?? []).map((b) => [b, { name: "", sig: null }]))
  );

  const roster = config.kind === "roster";
  const signedCount = roster
    ? attendees.filter((a) => a.sig).length
    : Object.values(blocks).filter((b) => b.sig).length;

  const handlePrint = () => {
    const rows: Row[] = roster
      ? attendees.map((a) => ({ label: "", name: a.name, sig: a.sig }))
      : (config.blocks ?? []).map((b) => ({ label: b, name: blocks[b].name, sig: blocks[b].sig }));

    printSignedSheet({
      title,
      rosterMode: roster,
      header: config.header.map((h) => ({ label: h.label, value: header[h.id] ?? "" })),
      rows,
    });

    // Optional audit record (no signature images) — see /api/signoff.
    fetch("/api/signoff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        docId,
        title,
        completedAt: new Date().toISOString(),
        signers: rows
          .filter((r) => r.sig)
          .map((r) => ({ name: r.name, role: r.label || "attendee", signedAt: r.sig!.signedAt })),
      }),
    }).catch(() => {});
  };

  const reset = () => {
    setHeader(Object.fromEntries(config.header.map((h) => [h.id, h.default ?? ""])));
    setAttendees([{ id: rid(), name: "", sig: null }]);
    setBlocks(Object.fromEntries((config.blocks ?? []).map((b) => [b, { name: "", sig: null }])));
  };

  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-navy-900 text-safety">
          <FileSignature className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-xl font-display font-extrabold text-navy-950">Complete &amp; sign online</h2>
          <p className="mt-1 text-sm text-steel-600">
            Fill this out and collect signatures right here — each one is timestamped automatically.
            Prefer paper? Use <span className="font-semibold">Print / Save as PDF</span> above; the
            printed copy has blank signature lines to sign by hand.
          </p>
        </div>
      </div>

      {/* Header fields */}
      {config.header.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {config.header.map((h) => (
            <TextField
              key={h.id}
              label={h.label}
              value={header[h.id] ?? ""}
              onChange={(e) => setHeader((prev) => ({ ...prev, [h.id]: e.target.value }))}
            />
          ))}
        </div>
      ) : null}

      {/* Roster */}
      {roster ? (
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-navy-900">{config.rosterLabel ?? "Signatures"}</p>
            <span className="text-xs text-steel-500">{signedCount} signed</span>
          </div>
          <ul className="mt-3 space-y-4">
            {attendees.map((a, i) => (
              <li key={a.id} className="rounded-xl border border-navy-100 bg-steel-50 p-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-steel-400">{i + 1}</span>
                  <input
                    value={a.name}
                    onChange={(e) =>
                      setAttendees((prev) =>
                        prev.map((x) => (x.id === a.id ? { ...x, name: e.target.value } : x))
                      )
                    }
                    placeholder="Print name"
                    className="h-10 flex-1 rounded-lg border border-navy-200 bg-white px-3 text-sm focus-visible:ring-2 focus-visible:ring-safety"
                  />
                  {attendees.length > 1 ? (
                    <button
                      type="button"
                      aria-label="Remove person"
                      onClick={() => setAttendees((prev) => prev.filter((x) => x.id !== a.id))}
                      className="rounded-lg p-2 text-steel-400 hover:bg-white hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  ) : null}
                </div>
                <div className="mt-3">
                  <SignaturePad
                    signed={a.sig}
                    onSign={(s) =>
                      setAttendees((prev) => prev.map((x) => (x.id === a.id ? { ...x, sig: s } : x)))
                    }
                    onClear={() =>
                      setAttendees((prev) => prev.map((x) => (x.id === a.id ? { ...x, sig: null } : x)))
                    }
                  />
                </div>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setAttendees((prev) => [...prev, { id: rid(), name: "", sig: null }])}
            className="mt-4 btn btn-outline btn-sm"
          >
            <Plus className="h-4 w-4" /> Add person
          </button>
        </div>
      ) : (
        // Named signature blocks
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {(config.blocks ?? []).map((b) => (
            <div key={b} className="rounded-xl border border-navy-100 bg-steel-50 p-4">
              <p className="text-sm font-semibold text-navy-900">{b}</p>
              <input
                value={blocks[b].name}
                onChange={(e) =>
                  setBlocks((prev) => ({ ...prev, [b]: { ...prev[b], name: e.target.value } }))
                }
                placeholder="Print name"
                className="mt-2 h-10 w-full rounded-lg border border-navy-200 bg-white px-3 text-sm focus-visible:ring-2 focus-visible:ring-safety"
              />
              <div className="mt-3">
                <SignaturePad
                  signed={blocks[b].sig}
                  onSign={(s) => setBlocks((prev) => ({ ...prev, [b]: { ...prev[b], sig: s } }))}
                  onClear={() => setBlocks((prev) => ({ ...prev, [b]: { ...prev[b], sig: null } }))}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={handlePrint}
          disabled={signedCount === 0}
          className="btn btn-primary btn-md"
        >
          <Printer className="h-4 w-4" /> Print / save signed copy
        </button>
        <button type="button" onClick={reset} className="btn btn-outline btn-md">
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
        <p className="flex items-center gap-1.5 text-xs text-steel-500">
          <Info className="h-3.5 w-3.5" />
          Captured for internal recordkeeping with automatic timestamps.
        </p>
      </div>
    </div>
  );
}
