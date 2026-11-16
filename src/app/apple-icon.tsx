import { ImageResponse } from "next/og";

// Home-screen and bookmark icon for iPhones and iPads: the same "VG" mark as the favicon.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #3d68ff, #1447ff)",
        }}
      >
        <svg width="132" height="132" viewBox="0 0 64 64">
          <path d="M10.5 20l8 24 8-24" fill="none" stroke="#fff" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M53.5 25a11 11 0 1 0 0 14v-6h-8" fill="none" stroke="#fff" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
    size,
  );
}
