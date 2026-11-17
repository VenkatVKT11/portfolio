import { copyFile, mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";
import type { NextRequest } from "next/server";
import { themeIds } from "@/content/themes";

/**
 * Local admin API. Reads and writes src/content/editable.json and replaces the resume PDF.
 * It answers only under `npm run dev` and only to requests addressed to this computer
 * (localhost); everywhere else, including the live site, it returns 404.
 */

const root = process.cwd();
const dataFile = join(root, "src/content/editable.json");
const themes: string[] = themeIds;
const notFound = () => new Response("Not found", { status: 404 });

function allowed(request: NextRequest) {
  if (process.env.NODE_ENV === "production") return false;
  const host = (request.headers.get("host") ?? "").replace(/:\d+$/, "").replace(/^\[|\]$/g, "");
  return host === "localhost" || host === "127.0.0.1" || host === "::1";
}

async function readData() {
  return JSON.parse(await readFile(dataFile, "utf8"));
}

/** Rejects anything that would break the site: wrong theme, missing titles, bad shapes. */
function validate(data: Record<string, unknown>): string | null {
  if (!themes.includes(String(data.theme))) return "Unknown theme.";
  if (data.mode !== "light" && data.mode !== "dark") return "Mode must be light or dark.";
  const about = data.about as Record<string, unknown> | undefined;
  if (!about || typeof about.heading !== "string" || typeof about.statement !== "string") return "About needs a heading and a statement.";
  if (!Array.isArray(about.paragraphs) || !Array.isArray(about.facts)) return "About paragraphs and facts must be lists.";
  if (!Array.isArray(data.projects) || data.projects.length === 0) return "There must be at least one project.";
  const slugs = new Set<string>();
  for (const p of data.projects as Record<string, unknown>[]) {
    if (typeof p.slug !== "string" || !p.slug || typeof p.title !== "string" || !p.title.trim()) return "Every project needs a title.";
    if (slugs.has(p.slug)) return `Two projects share the id "${p.slug}".`;
    slugs.add(p.slug);
    for (const key of ["categories", "objectives", "contributions", "process", "tools", "deliverables", "metrics", "gallery"]) {
      if (!Array.isArray(p[key])) return `"${p.title}": ${key} must be a list.`;
    }
  }
  return null;
}

export async function GET(request: NextRequest) {
  if (!allowed(request)) return notFound();
  return Response.json(await readData());
}

/** Save everything the admin edits. Writes to a temporary file first so a crash never leaves half a file. */
export async function PUT(request: NextRequest) {
  if (!allowed(request)) return notFound();
  let incoming: Record<string, unknown>;
  try {
    incoming = await request.json();
  } catch {
    return Response.json({ error: "The data could not be read." }, { status: 400 });
  }
  const current = await readData();
  const next = {
    ...current,
    theme: incoming.theme,
    mode: incoming.mode ?? current.mode ?? "light",
    about: incoming.about,
    projectsIntro: typeof incoming.projectsIntro === "string" ? incoming.projectsIntro : current.projectsIntro,
    projects: incoming.projects,
  };
  delete (next as Record<string, unknown>).themePicker; // visitor theme switching was removed
  const problem = validate(next);
  if (problem) return Response.json({ error: problem }, { status: 400 });
  const temp = `${dataFile}.tmp`;
  await writeFile(temp, JSON.stringify(next, null, 2) + "\n");
  await rename(temp, dataFile);
  return Response.json({ ok: true });
}

/** Replace the resume PDF. The old one is copied to _old/resume-backups first. */
export async function POST(request: NextRequest) {
  if (!allowed(request)) return notFound();
  const form = await request.formData();
  const file = form.get("resume");
  if (!(file instanceof File)) return Response.json({ error: "Choose a PDF file." }, { status: 400 });
  const bytes = Buffer.from(await file.arrayBuffer());
  if (bytes.length > 10 * 1024 * 1024) return Response.json({ error: "The PDF must be under 10 MB." }, { status: 400 });
  if (bytes.subarray(0, 5).toString("latin1") !== "%PDF-") return Response.json({ error: "That file is not a PDF." }, { status: 400 });

  const { resume } = await readData();
  const target = join(root, "public", basename(String(resume || "/resume.pdf")));
  const backups = join(root, "_old/resume-backups");
  await mkdir(backups, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  try {
    await copyFile(target, join(backups, `${stamp}-${basename(target)}`));
  } catch {
    // No previous resume to back up.
  }
  await writeFile(target, bytes);
  return Response.json({ ok: true, size: bytes.length, path: `/${basename(target)}` });
}
