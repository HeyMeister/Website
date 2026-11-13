import { ImageResponse } from "next/og";
import { icon } from "@/components/brand/logo-paths";
import { colors } from "@/styles/tokens";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon (icon-navy). iOS applies its own corner mask, so the tile is square. */
export default function AppleIcon() {
  const [tx, ty] = icon.translate;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: colors.base }}>
        <svg width="180" height="180" viewBox={`0 0 ${icon.side} ${icon.side}`}>
          <g transform={`translate(${tx} ${ty})`}>
            {icon.parts.map((p, i) => (
              <path key={i} d={p.d} fill={p.role === "accent" ? colors.accent : "#FFFFFF"} />
            ))}
          </g>
        </svg>
      </div>
    ),
    size,
  );
}
