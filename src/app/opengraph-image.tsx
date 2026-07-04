import { ImageResponse } from "next/og";

// Site-wide default social preview image (Open Graph + Twitter).
// Generated as a real 1200×630 PNG so it renders on Facebook, LinkedIn, X, iMessage,
// etc. — unlike an SVG, which most platforms refuse to display.
export const runtime = "edge";
export const alt = "SafeSite Documents — Safety Templates & Custom Binders for Contractors";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B1A30",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ width: "18px", height: "70px", background: "#FFC400", borderRadius: "4px" }} />
          <div style={{ display: "flex", fontSize: "42px", fontWeight: 800 }}>
            <span style={{ color: "#ffffff" }}>SafeSite&nbsp;</span>
            <span style={{ color: "#FFC400" }}>Docs</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ fontSize: "66px", fontWeight: 800, color: "#ffffff", lineHeight: 1.08 }}>
            Safety paperwork for contractors
          </div>
          <div style={{ fontSize: "30px", color: "#9fb0c9" }}>
            Editable templates, toolbox talks &amp; custom safety binders.
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          {["OSHA-style forms", "Toolbox talks", "JHAs", "Custom binders"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                fontSize: "22px",
                fontWeight: 700,
                color: "#0B1A30",
                background: "#FFC400",
                padding: "8px 18px",
                borderRadius: "999px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
