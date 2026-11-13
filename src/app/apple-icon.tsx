import { ImageResponse } from "next/og";
import { iconGlyphs } from "@/components/brand/logo-paths";
import { colors } from "@/styles/tokens";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon "H." rendered from the generated logo paths. */
export default function AppleIcon() {
  const { bounds } = iconGlyphs;
  const pad = 26;
  const side = Math.max(bounds.width, bounds.height) + pad * 2;
  const tx = (side - bounds.width) / 2 - bounds.x;
  const ty = (side - bounds.height) / 2 - bounds.y;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: colors.base }}>
        <svg width="180" height="180" viewBox={`0 0 ${side} ${side}`}>
          <g transform={`translate(${tx} ${ty})`}>
            {iconGlyphs.parts.map((p, i) => (
              <path key={i} d={p.d} fill={p.role === "accent" ? colors.accent : "#FFFFFF"} />
            ))}
          </g>
        </svg>
      </div>
    ),
    size,
  );
}
