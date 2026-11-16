"use client";

import { Fragment, useState, useSyncExternalStore } from "react";
import { site } from "@/content/site";
import { swatch, themes } from "@/content/themes";

const KEY = "vg-theme";
const MODE_KEY = "vg-mode";

// The active theme lives on <html data-theme>; this reads it and re-renders when it changes.
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "data-mode"] });
  return () => observer.disconnect();
};
const readTheme = () => document.documentElement.dataset.theme ?? site.theme;
const readMode = () => document.documentElement.dataset.mode ?? site.mode;

/** Theme switcher: lets visitors pick a theme; their choice is remembered. Hidden when themePicker is false (admin, Theme tab). */
export function ThemePicker() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => site.theme);
  const mode = useSyncExternalStore(subscribe, readMode, () => site.mode);
  const [open, setOpen] = useState(false);

  const choose = (id: string) => {
    document.documentElement.setAttribute("data-theme", id);
    try {
      localStorage.setItem(KEY, id);
    } catch {}
  };

  const chooseMode = (m: "light" | "dark") => {
    document.documentElement.setAttribute("data-mode", m);
    try {
      localStorage.setItem(MODE_KEY, m);
    } catch {}
  };

  if (!site.themePicker) return null;
  const current = themes.find((t) => t.id === theme) ?? themes[0];

  return (
    <div className="theme-picker no-print">
      {open && (
        <div
          className="glass mb-2 max-h-[min(70svh,560px)] w-[17.5rem] overflow-y-auto rounded-[22px] p-3"
          role="group"
          aria-label="Colour theme"
        >
          <div className="mb-2 grid grid-cols-2 gap-1 rounded-full border border-line p-1" role="radiogroup" aria-label="Light or dark">
            {(["light", "dark"] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="radio"
                aria-checked={mode === m}
                onClick={() => chooseMode(m)}
                className={`rounded-full py-1.5 text-[0.875rem] font-semibold ${mode === m ? "nav-active" : "text-mute"}`}
              >
                {m === "light" ? "☀︎ Light" : "☾ Dark"}
              </button>
            ))}
          </div>
          <ul className="grid gap-1">
            {themes.map((t, i) => (
              <Fragment key={t.id}>
                {(i === 0 || themes[i - 1].group !== t.group) && (
                  <li className="px-1 pb-1 pt-2 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-mute">
                    {t.group === "Palettes" ? "Palettes" : "Original"}
                  </li>
                )}
                <li>
                  <button
                    type="button"
                    onClick={() => choose(t.id)}
                    aria-pressed={theme === t.id}
                    className={`flex w-full items-center gap-3 rounded-2xl px-2 py-2 text-left transition-colors hover:bg-[var(--surface)] ${
                      theme === t.id ? "bg-[var(--surface)] shadow-[0_0_0_1px_var(--line)]" : ""
                    }`}
                  >
                    <span className="theme-swatch flex-none" aria-pressed={theme === t.id} style={{ background: swatch(t.colors) }} />
                    <span className="min-w-0">
                      <span className="block text-[0.9375rem] font-semibold leading-tight">{t.name}</span>
                      <span className="block text-[0.75rem] leading-snug text-mute">{t.note}</span>
                    </span>
                  </button>
                </li>
              </Fragment>
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
        <span className="theme-swatch" style={{ background: swatch(current.colors) }} />
        Theme
      </button>
    </div>
  );
}
