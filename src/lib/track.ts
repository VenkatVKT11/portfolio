/** Sends a Google Analytics 4 event. Does nothing until a GA4 ID is set in site.ts. */
type Gtag = (command: "event", name: string, params?: Record<string, string | number>) => void;

export function track(name: string, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") gtag("event", name, params);
}
