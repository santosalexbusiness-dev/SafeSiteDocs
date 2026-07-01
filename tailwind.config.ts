import type { Config } from "tailwindcss";

/**
 * SafeSite Documents design system.
 * Brand palette: deep construction navy, OSHA-style safety yellow,
 * white, steel gray, and near-black for strong contrast.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      spacing: {
        "18": "4.5rem",
        "13": "3.25rem",
      },
      colors: {
        navy: {
          DEFAULT: "#0B1A30",
          50: "#eef2f8",
          100: "#d4dded",
          200: "#a6b8d6",
          300: "#7591bd",
          400: "#456aa3",
          500: "#274d80",
          600: "#1d4068",
          700: "#15304f",
          800: "#0f2138",
          900: "#0a1526",
          950: "#060d18",
        },
        safety: {
          DEFAULT: "#FFC400",
          50: "#fffbeb",
          100: "#fff4c6",
          200: "#ffe788",
          300: "#ffd23f",
          400: "#ffc400",
          500: "#f2b500",
          600: "#cf8f00",
          700: "#a56700",
          800: "#885200",
          900: "#734400",
        },
        steel: {
          50: "#f6f7f9",
          100: "#eceef2",
          200: "#d5dae2",
          300: "#b0bac8",
          400: "#8593a8",
          500: "#65748b",
          600: "#505d72",
          700: "#424c5d",
          800: "#39414f",
          900: "#333a45",
        },
        hazard: "#FF6B00",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-archivo)", "var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "display-sm": ["2.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "800" }],
        "display": ["3.5rem", { lineHeight: "1.02", letterSpacing: "-0.025em", fontWeight: "800" }],
        "display-lg": ["4.5rem", { lineHeight: "0.98", letterSpacing: "-0.03em", fontWeight: "800" }],
      },
      boxShadow: {
        card: "0 1px 2px rgba(6,13,24,0.06), 0 8px 24px -12px rgba(6,13,24,0.18)",
        "card-hover": "0 1px 2px rgba(6,13,24,0.08), 0 24px 48px -16px rgba(6,13,24,0.28)",
        glow: "0 0 0 1px rgba(255,196,0,0.4), 0 12px 40px -8px rgba(255,196,0,0.35)",
        "inner-top": "inset 0 1px 0 rgba(255,255,255,0.06)",
      },
      backgroundImage: {
        "hazard-stripes":
          "repeating-linear-gradient(45deg, #FFC400 0, #FFC400 14px, #0B1A30 14px, #0B1A30 28px)",
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(900%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "0.7" },
          "70%": { transform: "scale(1.6)", opacity: "0" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        "scan-line": "scan-line 4s linear infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.4,0,0.2,1) infinite",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
