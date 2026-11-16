import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

export const alt = "Venkatesan G, Digital Marketing Manager: digital marketing, AI and data";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// A PNG copy of public/profile.webp: the share-image renderer reads PNG reliably, not WebP.
const photo = `data:image/png;base64,${await readFile(join(process.cwd(), "assets/og-photo.png"), "base64")}`;

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
            "radial-gradient(900px 620px at 92% 0%, rgba(20,71,255,0.45), transparent 60%), radial-gradient(700px 500px at 0% 100%, rgba(111,139,255,0.22), transparent 60%), #070b18",
          color: "#f3f5fb",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 0 0 80px", width: 720 }}>
          <div style={{ fontSize: 26, color: "#9db0ff", letterSpacing: 6, textTransform: "uppercase" }}>Portfolio</div>
          <div style={{ fontSize: 78, fontWeight: 700, letterSpacing: -2, lineHeight: 1, marginTop: 22, whiteSpace: "nowrap" }}>
            {site.name}
          </div>
          <div style={{ fontSize: 40, marginTop: 26, color: "#ffffff" }}>Digital Marketing Manager</div>
          <div style={{ fontSize: 30, marginTop: 14, color: "#9db0ff" }}>{site.tagline}</div>
          <div style={{ fontSize: 24, marginTop: 34, color: "#9ba4b8" }}>{site.location}</div>
        </div>
        <img src={photo} width={540} height={540} style={{ position: "absolute", right: 30, bottom: 0 }} alt="" />
      </div>
    ),
    size,
  );
}
