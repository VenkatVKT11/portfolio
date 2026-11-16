"use client";

import Script from "next/script";
import { useEffect } from "react";
import { site } from "@/content/site";
import { track } from "@/lib/track";

/**
 * Loads Google Analytics 4 once an ID is set in site.ts, and reports clicks on any element
 * marked data-track="event_name". Extra data-track-* attributes become event parameters,
 * e.g. data-track-method="linkedin" sends { method: "linkedin" }.
 */
export function Analytics() {
  const id = site.ga4Id;

  useEffect(() => {
    if (!id) return;
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("[data-track]");
      if (!(el instanceof HTMLElement)) return;
      const params: Record<string, string> = {};
      for (const [key, value] of Object.entries(el.dataset)) {
        if (key.startsWith("track") && key !== "track" && value) {
          params[key.slice(5).replace(/^./, (c) => c.toLowerCase())] = value;
        }
      }
      track(el.dataset.track ?? "click", params);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [id]);

  if (!id) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(id)});`}
      </Script>
    </>
  );
}
