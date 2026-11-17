/**
 * Every colour theme, in the order the admin panel shows them.
 * The colours themselves live in globals.css under [data-theme="…"]; `colors` here are only
 * the swatches shown in the admin panel (the palette's exact colours).
 */
export const themes = [
  // Built from the five supplied palettes. Each has a light and a dark mode.
  {
    id: "pastel",
    name: "Powder Pastel",
    note: "Powder blue, lavender white, sunset peach: soft and friendly",
    group: "Palettes",
    colors: ["#8DB9F0", "#E9E8F8", "#F5B69E"],
  },
  {
    id: "noir",
    name: "Noir Gold",
    note: "Pure white, midnight black, golden yellow: bold and confident",
    group: "Palettes",
    colors: ["#F5F3EF", "#080908", "#FFC900"],
  },
  {
    id: "ivory",
    name: "Ivory Neon",
    note: "Soft ivory, midnight black, neon lime: fresh and modern",
    group: "Palettes",
    colors: ["#FAF8F3", "#080908", "#CDF22B"],
  },
  {
    id: "crimson",
    name: "Obsidian Crimson",
    note: "Chrome silver, obsidian black, laser red: sharp and premium",
    group: "Palettes",
    colors: ["#CDCBCA", "#080808", "#D41514"],
  },
  {
    id: "coral",
    name: "Charcoal Coral",
    note: "Steel grey, midnight charcoal, coral orange: warm and energetic",
    group: "Palettes",
    colors: ["#929DA7", "#17191C", "#FF4B32"],
  },
  // The original design.
  { id: "light", name: "Classic Blue", note: "The original blue design: white in light mode, deep navy in dark", group: "Earlier", colors: ["#ffffff", "#171717", "#1447ff"] },
] as const;

export type ThemeId = (typeof themes)[number]["id"];

/** Every theme has a light and a dark version. */
export const modes = ["light", "dark"] as const;
export type Mode = (typeof modes)[number];
export const themeIds = themes.map((t) => t.id) as ThemeId[];

/** A swatch background showing a theme's three colours as stripes. */
export const swatch = (colors: readonly string[]) =>
  `linear-gradient(135deg, ${colors[0]} 0 38%, ${colors[1]} 38% 66%, ${colors[2]} 66% 100%)`;
