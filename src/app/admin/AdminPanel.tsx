"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { ImageSource, Project } from "@/content/site";

/*
 * Local admin panel. Loads src/content/editable.json through /api/admin, edits it in the browser,
 * and saves it back. Under `npm run dev` the site reloads with the changes straight away.
 * Nothing here is imported from editable.json directly, so saving never resets this page.
 */

type Fact = { label: string; value: string };
type Editable = {
  theme: string;
  themePicker: boolean;
  resume: string;
  about: { heading: string; statement: string; paragraphs: string[]; facts: Fact[] };
  projectsIntro: string;
  projects: Project[];
};

const themes = [
  { id: "midnight", name: "Midnight Blue", note: "Royal blue on deep navy", a: "#3d68ff", b: "#070b18" },
  { id: "aurora", name: "Aurora Teal", note: "Teal and sky on green-black", a: "#2dd4bf", b: "#04110f" },
  { id: "violet", name: "Royal Violet", note: "Violet and pink on plum-black", a: "#9277ff", b: "#0c0817" },
  { id: "gold", name: "Graphite Gold", note: "Gold on charcoal", a: "#e8b964", b: "#0c0c0e" },
  { id: "light", name: "Classic Light", note: "The original white and blue design", a: "#1447ff", b: "#ffffff" },
];

const tabs = ["Projects", "About", "Theme", "Resume"] as const;
type Tab = (typeof tabs)[number];

// Lists are edited one item per line; label/value pairs as "Label | Value".
const toLines = (items: string[]) => items.join("\n");
const fromLines = (text: string) => text.split("\n").map((l) => l.trim()).filter(Boolean);
const toPairs = (items: { label: string; value: string }[]) => items.map((i) => `${i.label} | ${i.value}`).join("\n");
const fromPairs = (text: string) =>
  fromLines(text).map((line) => {
    const [label, ...rest] = line.split("|");
    return { label: label.trim(), value: rest.join("|").trim() };
  });

const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "project";

const input =
  "w-full rounded-xl border border-line bg-white/[0.04] px-3.5 py-2.5 text-[0.9375rem] text-ink outline-none transition-colors placeholder:text-mute/70 focus:border-blue/60 focus:bg-white/[0.07]";

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-mute">{label}</span>
      {children}
      {hint && <span className="text-[0.8125rem] text-mute">{hint}</span>}
    </label>
  );
}

/** Textarea whose text stays as typed while focused, so blank lines don't vanish mid-edit. */
function ListArea({
  value,
  onChange,
  rows = 4,
  placeholder,
}: {
  value: string;
  onChange: (text: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState(value);
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      className={`${input} resize-y leading-relaxed`}
      rows={rows}
      placeholder={placeholder}
      value={focused ? draft : value}
      onFocus={() => {
        setDraft(value);
        setFocused(true);
      }}
      onBlur={() => setFocused(false)}
      onChange={(e) => {
        setDraft(e.target.value);
        onChange(e.target.value);
      }}
    />
  );
}

export function AdminPanel() {
  const [data, setData] = useState<Editable | null>(null);
  const [saved, setSaved] = useState<string>("");
  const [status, setStatus] = useState<{ tone: "ok" | "error" | "info"; text: string } | null>(null);
  const [tab, setTab] = useState<Tab>("Projects");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string>("");
  const [saving, setSaving] = useState(false);

  const dirty = data !== null && JSON.stringify(data) !== saved;

  useEffect(() => {
    fetch("/api/admin")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((d: Editable) => {
        setData(d);
        setSaved(JSON.stringify(d));
        setSelected(d.projects[0]?.slug ?? "");
      })
      .catch(() => setStatus({ tone: "error", text: "Could not load the content. Is `npm run dev` running?" }));
  }, []);

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const save = async () => {
    if (!data) return;
    setSaving(true);
    setStatus({ tone: "info", text: "Saving…" });
    try {
      const r = await fetch("/api/admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(body.error ?? `HTTP ${r.status}`);
      setSaved(JSON.stringify(data));
      setStatus({ tone: "ok", text: "Saved. The site has been updated." });
    } catch (e) {
      setStatus({ tone: "error", text: `Not saved: ${(e as Error).message}` });
    } finally {
      setSaving(false);
    }
  };

  // Ctrl/Cmd + S saves.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (dirty && !saving) save();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!data) {
    return (
      <main className="grid min-h-[100svh] place-items-center px-5 text-center">
        <p className={status?.tone === "error" ? "text-[#ff8a8a]" : "text-mute"}>{status?.text ?? "Loading…"}</p>
      </main>
    );
  }

  const update = (patch: Partial<Editable>) => setData({ ...data, ...patch });

  return (
    <main className="mx-auto max-w-[1280px] px-4 pb-24 pt-6 md:px-8">
      <header className="glass sticky top-3 z-20 flex flex-wrap items-center justify-between gap-3 rounded-[24px] px-4 py-3 md:px-6">
        <div>
          <p className="font-display text-lg font-semibold tracking-tight">Portfolio admin</p>
          <p className="text-[0.8125rem] text-mute">Local only: works under npm run dev, hidden on the live site.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {status && (
            <span
              role="status"
              className={`text-[0.875rem] ${
                status.tone === "error" ? "text-[#ff8a8a]" : status.tone === "ok" ? "text-[#7ee2a8]" : "text-mute"
              }`}
            >
              {status.text}
            </span>
          )}
          {dirty && <span className="rounded-full bg-white/[0.08] px-2.5 py-1 text-[0.75rem] font-semibold">Unsaved changes</span>}
          <a href="/" target="_blank" rel="noopener noreferrer" className="btn btn-quiet !min-h-10 !px-4 text-[0.9375rem]">
            Open site
          </a>
          <button
            type="button"
            onClick={save}
            disabled={!dirty || saving}
            className="btn btn-primary !min-h-10 !px-5 text-[0.9375rem] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </header>

      <nav aria-label="Admin sections" className="mt-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            aria-current={tab === t ? "page" : undefined}
            className={`rounded-full px-4 py-2 text-[0.9375rem] font-semibold transition-colors ${
              tab === t ? "nav-active" : "text-ink/70 hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </nav>

      <div className="mt-6">
        {tab === "Projects" && (
          <ProjectsTab
            data={data}
            update={update}
            query={query}
            setQuery={setQuery}
            selected={selected}
            setSelected={setSelected}
          />
        )}
        {tab === "About" && <AboutTab data={data} update={update} />}
        {tab === "Theme" && <ThemeTab data={data} update={update} />}
        {tab === "Resume" && <ResumeTab resume={data.resume} setStatus={setStatus} />}
      </div>
    </main>
  );
}

/* ------------------------------ Projects ------------------------------ */

function ProjectsTab({
  data,
  update,
  query,
  setQuery,
  selected,
  setSelected,
}: {
  data: Editable;
  update: (patch: Partial<Editable>) => void;
  query: string;
  setQuery: (q: string) => void;
  selected: string;
  setSelected: (slug: string) => void;
}) {
  const projects = data.projects;
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter((p) =>
      [p.title, p.overview, ...p.categories, ...p.tools].join(" ").toLowerCase().includes(q),
    );
  }, [projects, query]);

  const index = projects.findIndex((p) => p.slug === selected);
  const project = projects[index];

  const setProject = (patch: Partial<Project>) => {
    const next = projects.slice();
    next[index] = { ...project, ...patch };
    update({ projects: next });
  };

  const move = (dir: -1 | 1) => {
    const to = index + dir;
    if (to < 0 || to >= projects.length) return;
    const next = projects.slice();
    [next[index], next[to]] = [next[to], next[index]];
    update({ projects: next });
  };

  const add = () => {
    let slug = "new-project";
    for (let n = 2; projects.some((p) => p.slug === slug); n++) slug = `new-project-${n}`;
    const blank: Project = {
      slug,
      featured: false,
      title: "New project",
      categories: [],
      image: "",
      imageSource: "mockup",
      overview: "",
      objectives: [],
      contributions: [],
      process: [],
      tools: [],
      deliverables: [],
      metrics: [],
      metricsNote: "",
      gallery: [],
      link: "",
    };
    update({ projects: [...projects, blank] });
    setSelected(slug);
    setQuery("");
  };

  const remove = () => {
    if (!project || projects.length <= 1) return;
    if (!window.confirm(`Remove "${project.title}" from the portfolio? You can undo this by not saving.`)) return;
    const next = projects.filter((p) => p.slug !== project.slug);
    update({ projects: next });
    setSelected(next[Math.max(0, index - 1)]?.slug ?? "");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
      <aside className="card self-start p-4 lg:sticky lg:top-28">
        <input
          type="search"
          className={input}
          placeholder="Search projects, tools, categories…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search projects"
        />
        <p className="mt-3 px-1 text-[0.8125rem] text-mute">
          {filtered.length} of {projects.length} projects · {projects.filter((p) => p.featured).length} shown first
        </p>
        <ul className="mt-2 grid gap-1">
          {filtered.map((p) => (
            <li key={p.slug}>
              <button
                type="button"
                onClick={() => setSelected(p.slug)}
                className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors hover:bg-white/[0.06] ${
                  p.slug === selected ? "bg-white/[0.09] shadow-[0_0_0_1px_rgb(255_255_255/0.12)]" : ""
                }`}
              >
                <span className="relative h-10 w-14 flex-none overflow-hidden rounded-lg bg-white/[0.06]">
                  {/* Plain img: a tiny local thumbnail, no optimisation needed. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {p.image && <img src={p.image} alt="" className="h-full w-full object-cover object-top" />}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[0.9375rem] font-semibold">{p.title}</span>
                  <span className="block truncate text-[0.75rem] text-mute">
                    {p.featured ? "Shown first" : "Under View more"} · {p.imageSource}
                  </span>
                </span>
              </button>
            </li>
          ))}
          {filtered.length === 0 && <li className="px-3 py-6 text-center text-mute">No project matches “{query}”.</li>}
        </ul>
        <button type="button" onClick={add} className="btn btn-quiet mt-3 w-full !min-h-10 text-[0.9375rem]">
          + Add project
        </button>
      </aside>

      {project ? (
        <section className="card grid gap-5 p-5 md:p-7" aria-label={`Edit ${project.title}`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-2xl font-semibold tracking-tight">{project.title || "Untitled"}</h2>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => move(-1)} disabled={index === 0} className="btn btn-quiet !min-h-9 !px-3.5 text-[0.875rem] disabled:opacity-40">
                ↑ Move up
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                disabled={index === projects.length - 1}
                className="btn btn-quiet !min-h-9 !px-3.5 text-[0.875rem] disabled:opacity-40"
              >
                ↓ Move down
              </button>
              <a href={`/#project-${project.slug}`} target="_blank" rel="noopener noreferrer" className="btn btn-quiet !min-h-9 !px-3.5 text-[0.875rem]">
                View on site
              </a>
              <button type="button" onClick={remove} className="btn btn-quiet !min-h-9 !px-3.5 text-[0.875rem] !text-[#ff8a8a]">
                Remove
              </button>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Title">
              <input className={input} value={project.title} onChange={(e) => setProject({ title: e.target.value })} />
            </Field>
            <Field label="Categories" hint="Separate with commas.">
              <input
                className={input}
                value={project.categories.join(", ")}
                onChange={(e) => setProject({ categories: e.target.value.split(",").map((c) => c.trim()).filter(Boolean) })}
              />
            </Field>
          </div>

          <Field label="Overview">
            <ListArea value={project.overview} onChange={(text) => setProject({ overview: text })} rows={3} />
          </Field>

          <div className="grid gap-5 md:grid-cols-3">
            <label className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.03] px-3.5 py-3">
              <input
                type="checkbox"
                className="h-5 w-5 accent-[var(--acc)]"
                checked={project.featured}
                onChange={(e) => setProject({ featured: e.target.checked })}
              />
              <span>
                <span className="block font-semibold">Show first</span>
                <span className="block text-[0.8125rem] text-mute">Off = under “View more”</span>
              </span>
            </label>
            <Field label="Picture source">
              <select
                className={input}
                value={project.imageSource}
                onChange={(e) => setProject({ imageSource: e.target.value as ImageSource })}
              >
                <option value="screenshot">Real screenshot</option>
                <option value="rebuilt">Built from project data</option>
                <option value="mockup">Mockup</option>
              </select>
            </Field>
            <Field label="Card picture" hint="Path inside /public, e.g. /projects/x.jpg">
              <input className={input} value={project.image} onChange={(e) => setProject({ image: e.target.value })} />
            </Field>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Link" hint="Live site or GitHub. Leave empty to hide the button.">
              <input className={input} value={project.link} onChange={(e) => setProject({ link: e.target.value })} placeholder="https://" />
            </Field>
            <Field label="Link button text">
              <input
                className={input}
                value={project.linkLabel ?? ""}
                placeholder="Open live project"
                onChange={(e) => setProject({ linkLabel: e.target.value || undefined })}
              />
            </Field>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Business objective" hint="One per line.">
              <ListArea value={toLines(project.objectives)} onChange={(t) => setProject({ objectives: fromLines(t) })} rows={5} />
            </Field>
            <Field label="My role" hint="One per line.">
              <ListArea value={toLines(project.contributions)} onChange={(t) => setProject({ contributions: fromLines(t) })} rows={5} />
            </Field>
            <Field label="Execution" hint="One step per line. Leave empty to hide.">
              <ListArea value={toLines(project.process)} onChange={(t) => setProject({ process: fromLines(t) })} rows={4} />
            </Field>
            <Field label="Key deliverables" hint="One per line.">
              <ListArea value={toLines(project.deliverables)} onChange={(t) => setProject({ deliverables: fromLines(t) })} rows={4} />
            </Field>
            <Field label="Tools" hint="One per line.">
              <ListArea value={toLines(project.tools)} onChange={(t) => setProject({ tools: fromLines(t) })} rows={4} />
            </Field>
            <Field label="Results" hint="One per line: Label | Value. Only figures you can verify.">
              <ListArea
                value={toPairs(project.metrics)}
                onChange={(t) => setProject({ metrics: fromPairs(t) })}
                rows={4}
                placeholder="Leads generated | 100+"
              />
            </Field>
          </div>

          <Field label="Note under results">
            <input className={input} value={project.metricsNote} onChange={(e) => setProject({ metricsNote: e.target.value })} />
          </Field>

          <Field label="Gallery" hint="One per line: /path/in/public.jpg | Caption">
            <ListArea
              value={project.gallery.map((g) => `${g.src} | ${g.caption}`).join("\n")}
              onChange={(t) => setProject({ gallery: fromPairs(t).map((p) => ({ src: p.label, caption: p.value })) })}
              rows={3}
            />
          </Field>

          <Field label="Project id" hint="Used in share links (#project-id). Change only if you need to.">
            <input
              className={input}
              value={project.slug}
              onChange={(e) => {
                const slug = slugify(e.target.value);
                setProject({ slug });
                setSelected(slug);
              }}
            />
          </Field>
        </section>
      ) : (
        <p className="text-mute">Pick a project to edit.</p>
      )}

      <section className="card grid gap-3 p-5 md:p-7 lg:col-start-2">
        <Field label="Projects section intro">
          <ListArea value={data.projectsIntro} onChange={(t) => update({ projectsIntro: t })} rows={2} />
        </Field>
      </section>
    </div>
  );
}

/* ------------------------------ About ------------------------------ */

function AboutTab({ data, update }: { data: Editable; update: (patch: Partial<Editable>) => void }) {
  const about = data.about;
  const set = (patch: Partial<Editable["about"]>) => update({ about: { ...about, ...patch } });
  return (
    <section className="card grid max-w-4xl gap-5 p-5 md:p-7">
      <h2 className="font-display text-2xl font-semibold tracking-tight">About section</h2>
      <Field label="Heading">
        <input className={input} value={about.heading} onChange={(e) => set({ heading: e.target.value })} />
      </Field>
      <Field label="Statement" hint="The large line under the heading.">
        <ListArea value={about.statement} onChange={(t) => set({ statement: t })} rows={2} />
      </Field>
      <Field label="Paragraphs" hint="Leave a blank line between paragraphs.">
        <ListArea
          value={about.paragraphs.join("\n\n")}
          onChange={(t) => set({ paragraphs: t.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) })}
          rows={9}
        />
      </Field>
      <Field label="Facts" hint="One per line: Label | Value (e.g. Based in | Chennai, Tamil Nadu, India).">
        <ListArea value={toPairs(about.facts)} onChange={(t) => set({ facts: fromPairs(t) })} rows={5} />
      </Field>
    </section>
  );
}

/* ------------------------------ Theme ------------------------------ */

function ThemeTab({ data, update }: { data: Editable; update: (patch: Partial<Editable>) => void }) {
  // Preview here too, so the admin page shows the chosen colours before saving.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", data.theme);
  }, [data.theme]);

  return (
    <section className="card grid max-w-4xl gap-5 p-5 md:p-7">
      <h2 className="font-display text-2xl font-semibold tracking-tight">Theme</h2>
      <p className="text-mute">The default colours every visitor sees. Save to apply it to the site.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {themes.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => update({ theme: t.id })}
            aria-pressed={data.theme === t.id}
            className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition-colors ${
              data.theme === t.id ? "border-blue/60 bg-white/[0.07]" : "border-line hover:bg-white/[0.04]"
            }`}
          >
            <span
              className="h-12 w-12 flex-none rounded-full shadow-[inset_0_0_0_2px_rgb(255_255_255/0.2)]"
              style={{ background: `linear-gradient(135deg, ${t.a} 0 50%, ${t.b} 50% 100%)` }}
            />
            <span>
              <span className="block font-semibold">{t.name}</span>
              <span className="block text-[0.875rem] text-mute">{t.note}</span>
            </span>
            {data.theme === t.id && <span className="ml-auto text-[0.8125rem] font-semibold text-blue">Selected</span>}
          </button>
        ))}
      </div>
      <label className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.03] px-4 py-3">
        <input
          type="checkbox"
          className="h-5 w-5 accent-[var(--acc)]"
          checked={data.themePicker}
          onChange={(e) => update({ themePicker: e.target.checked })}
        />
        <span>
          <span className="block font-semibold">Show the Theme button on the site</span>
          <span className="block text-[0.8125rem] text-mute">Turn off when you have chosen, so visitors see one finished design.</span>
        </span>
      </label>
    </section>
  );
}

/* ------------------------------ Resume ------------------------------ */

function ResumeTab({
  resume,
  setStatus,
}: {
  resume: string;
  setStatus: (s: { tone: "ok" | "error" | "info"; text: string } | null) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [version, setVersion] = useState(0);

  const upload = async () => {
    if (!file) return;
    setBusy(true);
    setStatus({ tone: "info", text: "Uploading resume…" });
    try {
      const form = new FormData();
      form.append("resume", file);
      const r = await fetch("/api/admin", { method: "POST", body: form });
      const body = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(body.error ?? `HTTP ${r.status}`);
      setStatus({ tone: "ok", text: `Resume replaced (${Math.round(body.size / 1024)} KB). The old one is in _old/resume-backups.` });
      setFile(null);
      setVersion((v) => v + 1);
    } catch (e) {
      setStatus({ tone: "error", text: `Not uploaded: ${(e as Error).message}` });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="card grid max-w-4xl gap-5 p-5 md:p-7">
      <h2 className="font-display text-2xl font-semibold tracking-tight">Resume</h2>
      <p className="text-mute">
        Visitors download <code className="rounded bg-white/[0.08] px-1.5 py-0.5 text-ink">{resume}</code> from the Resume link and
        the Download Resume button. Upload a new PDF to replace it; the current one is backed up first.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <a href={`${resume}?v=${version}`} target="_blank" rel="noopener noreferrer" className="btn btn-quiet !min-h-10 text-[0.9375rem]">
          Open current resume
        </a>
        <label className="btn btn-quiet !min-h-10 cursor-pointer text-[0.9375rem]">
          {file ? file.name : "Choose PDF…"}
          <input type="file" accept="application/pdf" className="sr-only" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </label>
        <button
          type="button"
          onClick={upload}
          disabled={!file || busy}
          className="btn btn-primary !min-h-10 text-[0.9375rem] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy ? "Uploading…" : "Replace resume"}
        </button>
      </div>
      <iframe
        key={version}
        title="Current resume"
        src={`${resume}?v=${version}#view=FitH`}
        className="h-[70vh] w-full rounded-2xl border border-line bg-white"
      />
    </section>
  );
}
