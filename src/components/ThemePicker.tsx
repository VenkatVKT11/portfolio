"use client";

import { useState, useSyncExternalStore } from "react";
import { site } from "@/content/site";

const themes = [
  { id: "midnight", name: "Midnight Blue", note: "Royal blue on deep navy: tech, trustworthy", a: "#3d68ff", b: "#070b18" },
  { id: "aurora", name: "Aurora Teal", note: "Teal and sky on deep green-black: AI, modern", a: "#2dd4bf", b: "#04110f" },
  { id: "violet", name: "Royal Violet", note: "Violet and pink on plum-black: creative, brand", a: "#9277ff", b: "#0c0817" },
  { id: "gold", name: "Graphite Gold", note: "Gold on charcoal: executive, premium", a: "#e8b964", b: "#0c0c0e" },
  { id: "light", name: "Classic Light", note: "The original white and blue design: clean, bright", a: "#1447ff", b: "#ffffff" },
] as const;

const KEY = "vg-theme";

/** Theme switcher: lets visitors pick a theme; their choice is remembered. Hidden when themePicker is false (admin, Theme tab). */
// The active theme lives on <html data-theme>; this reads it and re-renders when it changes.
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
};
const readTheme = () => document.documentElement.dataset.theme ?? site.theme;

export function ThemePicker() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => site.theme);
  const [open, setOpen] = useState(false);

  const choose = (id: string) => {
    document.documentElement.setAttribute("data-theme", id);
    try {
      localStorage.setItem(KEY, id);
    } catch {}
  };

  if (!site.themePicker) return null;
  const current = themes.find((t) => t.id === theme) ?? themes[0];

  return (
    <div className="theme-picker no-print">
      {open && (
        <div className="glass mb-2 w-64 rounded-[22px] p-3" role="group" aria-label="Colour theme">
          <p className="px-1 text-[0.8125rem] font-semibold uppercase tracking-[0.18em] text-mute">Choose a theme</p>
          <ul className="mt-2 grid gap-1">
            {themes.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => choose(t.id)}
                  aria-pressed={theme === t.id}
                  className={`flex w-full items-center gap-3 rounded-2xl px-2 py-2 text-left transition-colors hover:bg-white/[0.06] ${
                    theme === t.id ? "bg-white/[0.08]" : ""
                  }`}
                >
                  <span
                    className="theme-swatch flex-none"
                    aria-pressed={theme === t.id}
                    style={{ background: `linear-gradient(135deg, ${t.a} 0 50%, ${t.b} 50% 100%)` }}
                  />
                  <span className="min-w-0">
                    <span className="block text-[0.9375rem] font-semibold leading-tight">{t.name}</span>
                    <span className="block text-[0.75rem] leading-snug text-mute">{t.note}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="glass ml-auto flex items-center gap-2 rounded-full py-2 pl-2 pr-4 text-[0.9375rem] font-semibold"
      >
        <span
          className="theme-swatch"
          style={{ background: `linear-gradient(135deg, ${current.a} 0 50%, ${current.b} 50% 100%)` }}
        />
        Theme
      </button>
    </div>
  );
}
