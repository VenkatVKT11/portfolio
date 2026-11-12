import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = "Venkatesan G, Digital Marketing, AI and Data";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          background: "linear-gradient(135deg, #ffffff 55%, #dfe7ff 100%)",
          color: "#171717",
        }}
      >
        <div style={{ fontSize: 116, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>{site.name}</div>
        <div style={{ fontSize: 44, marginTop: 28, color: "#1447ff" }}>{site.tagline}</div>
        <div style={{ fontSize: 30, marginTop: 16, color: "#666b73" }}>{site.location}</div>
      </div>
    ),
    size,
  );
}
