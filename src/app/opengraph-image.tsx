import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { site } from "@/content/site";

export const alt = "Venkatesan G, Digital Marketing Manager: digital marketing, AI and data";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// A PNG copy of public/profile.webp: the share-image renderer reads PNG reliably, not WebP.
// Read synchronously: with Cache Components on, an awaited read here is treated as uncached
// data and blocks metadata on other routes (it showed up as an error on /admin in dev).
const photo = `data:image/png;base64,${readFileSync(join(process.cwd(), "assets/og-photo.png"), "base64")}`;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background:
            "radial-gradient(900px 620px at 92% 0%, rgba(141,185,240,0.75), transparent 60%), radial-gradient(700px 500px at 0% 100%, rgba(245,182,158,0.6), transparent 60%), #e9e8f8",
          color: "#1f2440",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 0 0 80px", width: 720 }}>
          <div style={{ fontSize: 26, color: "#2f5fa8", letterSpacing: 6, textTransform: "uppercase" }}>Portfolio</div>
          <div style={{ fontSize: 78, fontWeight: 700, letterSpacing: -2, lineHeight: 1, marginTop: 22, whiteSpace: "nowrap" }}>
            {site.name}
          </div>
          <div style={{ fontSize: 40, marginTop: 26, color: "#1f2440" }}>Digital Marketing Manager</div>
          <div style={{ fontSize: 30, marginTop: 14, color: "#2f5fa8" }}>{site.tagline}</div>
          <div style={{ fontSize: 24, marginTop: 34, color: "#5b6080" }}>{site.location}</div>
        </div>
        <img src={photo} width={540} height={540} style={{ position: "absolute", right: 30, bottom: 0 }} alt="" />
      </div>
    ),
    size,
  );
}
