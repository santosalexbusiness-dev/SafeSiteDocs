/**
 * Stylized "drone POV" construction site rendered as a single SVG so it stays
 * razor-sharp at any size and ships zero image weight. The parent <CinematicHero>
 * animates this group (descent + parallax). Hazard hotspots are layered on top
 * as positioned <HazardCallout> cards, not inside this SVG.
 */
export function DroneScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1000 640"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Aerial drone view of an active construction site"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a1526" />
          <stop offset="0.55" stopColor="#0f2138" />
          <stop offset="1" stopColor="#15304f" />
        </linearGradient>
        <radialGradient id="glow" cx="0.5" cy="0.2" r="0.8">
          <stop offset="0" stopColor="#1d4068" stopOpacity="0.9" />
          <stop offset="1" stopColor="#0a1526" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#13243d" />
          <stop offset="1" stopColor="#0b1830" />
        </linearGradient>
        <linearGradient id="steel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5b6c84" />
          <stop offset="1" stopColor="#39465b" />
        </linearGradient>
      </defs>

      {/* Sky + horizon glow */}
      <rect width="1000" height="640" fill="url(#sky)" />
      <rect width="1000" height="380" fill="url(#glow)" />

      {/* Blueprint dot grid */}
      <g fill="#9fb4d6" opacity="0.10">
        {Array.from({ length: 21 }).map((_, r) =>
          Array.from({ length: 33 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={c * 31} cy={r * 31} r="1.1" />
          ))
        )}
      </g>

      {/* Ground plane */}
      <path d="M0 300 L1000 300 L1000 640 L0 640 Z" fill="url(#ground)" />
      <path d="M0 300 L1000 300 L1000 312 L0 312 Z" fill="#1d4068" opacity="0.5" />

      {/* Perspective site lines */}
      <g stroke="#27466e" strokeWidth="1.4" opacity="0.55">
        <path d="M500 300 L120 640" />
        <path d="M500 300 L360 640" />
        <path d="M500 300 L640 640" />
        <path d="M500 300 L880 640" />
        <path d="M40 380 L960 380" opacity="0.6" />
        <path d="M-20 470 L1020 470" opacity="0.5" />
        <path d="M-40 560 L1040 560" opacity="0.4" />
      </g>

      {/* Perimeter fencing (back) */}
      <g stroke="#3a4a63" strokeWidth="2" opacity="0.7">
        <path d="M70 296 L70 318 M120 294 L120 316 M170 293 L170 314 M820 293 L820 314 M870 294 L870 316 M920 296 L920 318" />
        <path d="M60 305 L180 300 M810 300 L930 305" />
      </g>

      {/* ===== Building under construction (left-center) ===== */}
      <g>
        {/* right (shaded) face */}
        <path d="M250 250 L360 230 L360 470 L250 500 Z" fill="#22344f" />
        {/* front face */}
        <path d="M90 280 L250 250 L250 500 L90 540 Z" fill="#2b3f5c" />
        {/* top slab (open edge → fall hazard) */}
        <path d="M90 280 L250 250 L360 230 L200 258 Z" fill="#37506f" />
        {/* floor lines */}
        <g stroke="#5b6c84" strokeWidth="2" opacity="0.8">
          <path d="M90 340 L250 312 M250 312 L360 292" />
          <path d="M90 400 L250 374 M250 374 L360 354" />
          <path d="M90 460 L250 436 M250 436 L360 416" />
        </g>
        {/* columns */}
        <g stroke="#475873" strokeWidth="3" opacity="0.7">
          <path d="M150 270 L150 522 M210 260 L210 510 M250 250 L250 500 M305 240 L305 485" />
        </g>
        {/* worker near unprotected top edge */}
        <g transform="translate(150 232)">
          <circle cx="0" cy="0" r="6" fill="#ffc400" />
          <rect x="-4" y="5" width="8" height="16" rx="3" fill="#d4dded" />
        </g>
        {/* guardrail gap marker */}
        <path d="M118 268 L186 258" stroke="#ffc400" strokeWidth="2" strokeDasharray="5 5" opacity="0.8" />
      </g>

      {/* ===== Tower crane (center-right) ===== */}
      <g stroke="#6a7c96" strokeWidth="3" fill="none" opacity="0.92">
        <path d="M560 560 L560 150" />
        <path d="M548 560 L572 560" strokeWidth="5" />
        {/* lattice */}
        <path d="M560 540 L572 520 L560 500 L572 480 L560 460 L572 440 L560 420 L572 400 L560 380 L572 360 L560 340 L572 320 L560 300 L572 280 L560 260 L572 240 L560 220 L572 200 L560 180" stroke="#52637d" strokeWidth="2" />
        {/* jib */}
        <path d="M560 168 L860 196" strokeWidth="3" />
        <path d="M560 150 L760 184" strokeWidth="2" />
        <path d="M560 150 L560 168 M620 156 L626 178 M680 162 L690 183 M740 168 L752 188 M800 174 L812 192" stroke="#52637d" strokeWidth="2" />
        {/* counter jib */}
        <path d="M560 168 L470 180" strokeWidth="3" />
        <rect x="446" y="172" width="26" height="18" rx="2" fill="#39465b" stroke="none" />
        {/* hook line + load */}
        <path d="M720 188 L720 250" strokeWidth="2" stroke="#8593a8" />
        <rect x="706" y="250" width="28" height="18" rx="2" fill="#ffc400" stroke="none" />
      </g>

      {/* ===== Elevated slab / formwork (upper middle → repeat-violation zone) ===== */}
      <g>
        <path d="M520 170 L640 156 L640 196 L520 210 Z" fill="#2b3f5c" />
        <path d="M520 170 L640 156 L600 150 L484 164 Z" fill="#37506f" />
        <g stroke="#5b6c84" strokeWidth="1.5" opacity="0.7">
          <path d="M540 168 L540 206 M566 165 L566 203 M592 162 L592 200 M618 159 L618 197" />
        </g>
      </g>

      {/* ===== Scaffold (center → failure-to-abate zone) ===== */}
      <g transform="translate(330 360)">
        <g stroke="#7d8ca3" strokeWidth="2.5" fill="none" opacity="0.9">
          <path d="M0 0 L0 150 M50 0 L50 150 M100 -6 L100 144 M150 -6 L150 144" />
          <path d="M0 0 L150 -6 M0 50 L150 44 M0 100 L150 94 M0 150 L150 144" />
          <path d="M0 0 L50 50 M50 0 L0 50 M50 0 L100 44 M100 -6 L50 50" stroke="#52637d" strokeWidth="1.5" />
        </g>
        {/* planks */}
        <path d="M-4 48 L156 42 L156 50 L-4 56 Z" fill="#a9742e" opacity="0.85" />
        <path d="M-4 98 L156 92 L156 100 L-4 106 Z" fill="#a9742e" opacity="0.7" />
      </g>

      {/* ===== Workers (center-lower → PPE zone) ===== */}
      <g>
        {[ [430, 470], [468, 486], [500, 462] ].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <ellipse cx="0" cy="26" rx="12" ry="4" fill="#000" opacity="0.25" />
            <circle cx="0" cy="0" r="7" fill="#ffc400" />
            <rect x="-5" y="6" width="10" height="20" rx="4" fill={i === 1 ? "#d4dded" : "#9fb4d6"} />
          </g>
        ))}
      </g>

      {/* ===== Ladder (right → ladder zone) ===== */}
      <g transform="translate(690 360) rotate(8)" stroke="#c9a14a" strokeWidth="3" opacity="0.95">
        <path d="M0 0 L-8 150 M22 0 L14 150" />
        <path d="M1 24 L20 24 M-1 56 L18 56 M-3 88 L16 88 M-5 120 L14 120" strokeWidth="2.5" />
      </g>
      {/* wall the ladder leans on */}
      <path d="M715 360 L815 348 L815 540 L715 552 Z" fill="#243a59" opacity="0.9" />

      {/* ===== Electrical panel (lower-left → LOTO zone) ===== */}
      <g transform="translate(110 470)">
        <rect x="0" y="0" width="46" height="64" rx="3" fill="#39465b" />
        <rect x="5" y="6" width="36" height="52" rx="2" fill="#2b3647" />
        <path d="M23 6 L23 58" stroke="#1c2533" strokeWidth="2" />
        <rect x="30" y="28" width="9" height="5" rx="1" fill="#8593a8" />
        {/* warning bolt */}
        <path d="M20 18 L14 32 L20 32 L16 44 L28 28 L21 28 L26 18 Z" fill="#ffc400" />
      </g>

      {/* ===== Chemical drums (lower-right → HazCom zone) ===== */}
      <g transform="translate(800 500)">
        {[0, 34, 17].map((dx, i) => (
          <g key={i} transform={`translate(${dx} ${i === 2 ? -26 : 0})`}>
            <rect x="0" y="0" width="28" height="40" rx="5" fill={i === 2 ? "#c9532e" : "#3a4a63"} />
            <ellipse cx="14" cy="2" rx="14" ry="4" fill={i === 2 ? "#e0633a" : "#4a5d79"} />
            <rect x="6" y="12" width="16" height="14" rx="1" fill="#0b1830" opacity="0.5" />
            {/* unlabeled / question */}
            <text x="14" y="24" textAnchor="middle" fontSize="11" fill="#ffc400" fontFamily="monospace">?</text>
          </g>
        ))}
      </g>

      {/* ===== Material stacks + pickup ===== */}
      <g opacity="0.9">
        <rect x="600" y="520" width="120" height="16" rx="2" fill="#4a5d79" />
        <rect x="608" y="506" width="104" height="16" rx="2" fill="#39465b" />
        <rect x="616" y="492" width="88" height="16" rx="2" fill="#2b3647" />
      </g>
      <g transform="translate(250 560)">
        <rect x="0" y="-18" width="70" height="22" rx="4" fill="#1d4068" />
        <rect x="48" y="-30" width="40" height="16" rx="3" fill="#274d80" />
        <circle cx="18" cy="6" r="9" fill="#0b1830" stroke="#5b6c84" strokeWidth="2" />
        <circle cx="74" cy="6" r="9" fill="#0b1830" stroke="#5b6c84" strokeWidth="2" />
      </g>
    </svg>
  );
}
