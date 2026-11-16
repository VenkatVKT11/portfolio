"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Staggers its direct children into view the first time they scroll in.
 *
 * The motion is a CSS animation on the `translate` property (see .reveal-ready in globals.css),
 * so it never fights the hover lift, which animates `transform`. Without JavaScript, or with
 * reduced motion turned on, the children simply show as they are.
 */
export function Reveal({ children, className, role }: { children: ReactNode; className?: string; role?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.classList.add("reveal-ready");
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Reveal once it enters the screen, or straight away if the page opened below it.
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          el.classList.add("is-in");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={root} className={className} role={role}>
      {children}
    </div>
  );
}
