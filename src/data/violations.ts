/**
 * Hero "drone scan" callouts. These are marketing/educational examples,
 * NOT legal guarantees. Penalty figures reflect current Federal OSHA
 * maximums and are surfaced with the PENALTY_DISCLAIMER in the hero.
 *
 * `x`/`y` are percentage positions over the construction scene so callouts
 * pin to the right hazard as the drone "descends".
 */
export type Violation = {
  id: string;
  hazard: string;
  title: string;
  penalty: string;
  /** Position of the hotspot over the scene, in %. */
  x: number;
  y: number;
  /** Order the callout appears during the cinematic timeline. */
  step: number;
};

export const violations: Violation[] = [
  {
    id: "fall",
    hazard: "Unprotected leading edge",
    title: "Fall Protection Risk",
    penalty: "up to $16,550 per serious violation",
    x: 24,
    y: 30,
    step: 1,
  },
  {
    id: "ladder",
    hazard: "Improper ladder setup",
    title: "Ladder Safety Risk",
    penalty: "up to $16,550 per serious violation",
    x: 70,
    y: 52,
    step: 2,
  },
  {
    id: "ppe",
    hazard: "Missing eye & face protection",
    title: "PPE Protection Risk",
    penalty: "up to $16,550 per serious violation",
    x: 46,
    y: 64,
    step: 3,
  },
  {
    id: "hazcom",
    hazard: "Unlabeled chemical container",
    title: "Hazard Communication Risk",
    penalty: "up to $16,550 per serious violation",
    x: 84,
    y: 72,
    step: 4,
  },
  {
    id: "loto",
    hazard: "Energized panel, no LOTO control",
    title: "Lockout / Tagout Risk",
    penalty: "up to $16,550 per serious violation",
    x: 14,
    y: 70,
    step: 5,
  },
  {
    id: "willful",
    hazard: "Repeat / willful exposure",
    title: "Willful or Repeated Violations",
    penalty: "up to $165,514 per violation",
    x: 58,
    y: 24,
    step: 6,
  },
  {
    id: "abate",
    hazard: "Hazard left uncorrected",
    title: "Failure to Abate",
    penalty: "up to $16,550 per day",
    x: 38,
    y: 44,
    step: 7,
  },
];
