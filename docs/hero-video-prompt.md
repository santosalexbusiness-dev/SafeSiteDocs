# Cinematic Hero — Drone POV Construction Scan

The site ships with a **code‑based cinematic hero** (no video file needed): a layered SVG
"drone monitor" that descends over a construction site, surfaces OSHA‑style hazard callouts, then
resolves into a clean dashboard. It's reduced‑motion aware and weighs nothing.

This doc gives you (1) a ready‑to‑paste **video‑generation prompt** for a real drone clip, and
(2) the **asset workflow** to drop that clip behind the existing callouts/HUD if you want footage.

> A video‑generation connector (Higgsfield‑style `generate_video`, plus image/upscale/reframe tools)
> is available in this workspace. Generating media spends credits, so it isn't done automatically —
> paste the prompt below when you're ready.

---

## 1) Master prompt (image‑to‑video or text‑to‑video)

**Primary prompt**

> Cinematic aerial drone POV slowly descending toward an active but professional construction site
> at golden hour. The camera starts high above a multi‑story steel‑frame building under construction,
> then glides forward and downward. Below: a tower crane, scaffolding, stacked materials, a few
> workers in hard hats and hi‑vis vests, a parked pickup truck, and safety fencing around the
> perimeter. Realistic dust haze, soft volumetric light, long shadows. Smooth, stabilized,
> high‑altitude‑to‑low gimbal move. Muted teal‑navy grade with warm highlights. Photoreal, 8k,
> shallow atmospheric depth, no text, no logos. 6–8 seconds, subtle forward parallax, seamless and
> calm (not frantic).

**Camera / motion**

> Single continuous shot. Begin ~120 ft altitude, end ~40 ft. Constant slow forward dolly + gentle
> descent. No whip pans, no cuts. Keep horizon stable. Gentle ease‑in, ease‑out.

**Negative prompt**

> text, captions, watermark, logo, brand names, distorted faces, missing limbs, warped equipment,
> flickering, jitter, oversaturation, lens flare spam, people without PPE looking unsafe in a graphic
> way, blood, injury, crane collapse, fire.

**Specs**

| Field | Value |
| --- | --- |
| Aspect ratio | `4:3` (matches the hero monitor frame) — or `16:9` and crop |
| Duration | 6–8 s, designed to **loop** |
| Resolution | 1920×1440 (or 1080×1440 cropped), then upscale to 2K/4K |
| FPS | 24–30 |
| Mood | Professional, calm, premium — not chaotic |

**Optional alternate grades** (generate variants and A/B test):
- *Blueprint/tactical*: cool navy, faint grid overlay, "recon" feel (closest to the current SVG).
- *Dawn*: cooler, bluish, fewer shadows.
- *Overcast*: flat, neutral, documentary.

---

## 2) Asset workflow

```
generate  →  trim/loop  →  optimize  →  place behind callouts  →  ship
```

1. **Generate** the clip with the prompt above (image‑to‑video gives the most control — start from a
   still of the desired framing). Make a 4:3 version to match the monitor.
2. **Edit**: trim to a seamless 6–8 s loop; stabilize if needed; color‑match to the brand
   (navy `#0B1A30` shadows, safety `#FFC400` only in the UI layer, not the footage).
3. **Optimize** for the web:
   ```bash
   # MP4 (H.264) — broad support
   ffmpeg -i drone.mov -vf "scale=1280:-2" -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -an public/hero/drone.mp4
   # WebM (VP9) — smaller
   ffmpeg -i drone.mov -vf "scale=1280:-2" -c:v libvpx-vp9 -crf 34 -b:v 0 -an public/hero/drone.webm
   # Poster frame (first frame, for LCP + reduced motion)
   ffmpeg -i drone.mov -vframes 1 public/hero/drone-poster.jpg
   ```
   Target < ~1.5 MB. Keep it **muted** and **autoplay/loop/playsInline**.
4. **Integrate** — the hero is built so the footage is a drop‑in *background layer*. In
   `src/components/hero/CinematicHero.tsx`, replace `<DroneScene />` inside the scan phase with:

   ```tsx
   <video
     className="h-full w-full object-cover"
     autoPlay
     muted
     loop
     playsInline
     poster="/hero/drone-poster.jpg"
   >
     <source src="/hero/drone.webm" type="video/webm" />
     <source src="/hero/drone.mp4" type="video/mp4" />
   </video>
   ```

   The HUD overlay, the seven `HazardCallout`s, and the `DashboardPreview` reveal all sit **on top**
   and keep working unchanged. For reduced motion, render the poster image instead of the `<video>`
   (check `useReducedMotion()` — already imported in the hero).

5. **Keep the callouts in code**, not burned into the video — they're accessible text, easy to edit,
   and stay crisp at any size. (They also carry the educational penalty figures + disclaimer.)

---

## 3) Why the default is code, not video

- **Performance**: the SVG scene adds ~0 KB of media and renders instantly (great LCP).
- **Accessibility**: real text callouts, full `prefers-reduced-motion` handling, skip/replay control.
- **Editability**: hazards, positions, and penalty copy live in `src/data/violations.ts`.
- **No dependencies / no credits** required to look impressive on day one.

Swap in footage when you want extra realism; the architecture already supports it.
