"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Shows the final number from the start (so it reads correctly without JavaScript),
 * then counts up from `from` the first time it scrolls into view.
 */
export function CountUp({ to, from = 0, suffix = "", className }: { to: number; from?: number; suffix?: string; className?: string }) {
  const el = useRef<HTMLSpanElement>(null);
  const format = (n: number) => new Intl.NumberFormat("en-IN").format(Math.round(n)) + suffix;

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!el.current) return;
      const state = { n: from };
      el.current.textContent = format(from);
      gsap.to(state, {
        n: to,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el.current, start: "top 88%", once: true },
        onUpdate: () => {
          if (el.current) el.current.textContent = format(state.n);
        },
      });
      return () => {
        if (el.current) el.current.textContent = format(to);
      };
    });
  });

  return (
    <span ref={el} className={className}>
      {format(to)}
    </span>
  );
}
