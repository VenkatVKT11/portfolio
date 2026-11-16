"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { imageSourceLabel, imageSourceNote, projects, projectsIntro, site, type Project } from "@/content/site";
import { track } from "@/lib/track";
import { Reveal } from "./Reveal";

/** Tag on every picture that says where it came from: a real screenshot, a rebuild from data, or a mockup. */
function SourceTag({ project }: { project: Project }) {
  return (
    <span className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-[rgb(7_11_24/0.78)] px-3 py-1 text-[0.75rem] font-semibold leading-none text-white backdrop-blur-md">
      {imageSourceLabel[project.imageSource]}
    </span>
  );
}

function altFor(project: Project, caption: string) {
  if (project.imageSource === "mockup") return `${project.title}, illustrative mockup: ${caption}`;
  return `${project.title}: ${caption}`;
}

function Preview({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <div
      className={`relative aspect-[16/9] overflow-hidden bg-surface ${large ? "rounded-[20px]" : "rounded-[18px]"}`}
    >
      {project.image ? (
        <>
          <Image
            src={project.image}
            alt={altFor(project, project.imageCaption ?? "preview")}
            fill
            sizes={large ? "(min-width: 768px) 800px, 100vw" : "(min-width: 768px) 600px, 100vw"}
            className="img-soft object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <SourceTag project={project} />
        </>
      ) : (
        <>
          <div className="glow glow-blue -right-10 -top-16 h-44 w-44 !blur-3xl" />
          <div className="glow glow-silver -bottom-16 -left-8 h-44 w-44 !blur-3xl" />
          <div className="absolute inset-0 flex items-center justify-center px-5 text-center text-[0.9375rem] text-mute">
            Add a project screenshot here
          </div>
        </>
      )}
    </div>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-3 border-t border-line py-6 sm:grid-cols-[170px_1fr] sm:gap-8">
      <h4 className="font-display text-lg font-semibold tracking-tight">{title}</h4>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  if (items.length === 0) return <p className="placeholder">To be added</p>;
  return (
    <ul className="grid gap-2">
      {items.map((item) => (
        <li key={item} className="relative pl-5 text-ink/80">
          <span className="absolute left-0 top-[0.65em] h-1.5 w-1.5 rounded-full bg-blue" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Shares a link that opens this project directly: the phone's share sheet, or a copied link on desktop. */
function ShareButton({ project }: { project: Project }) {
  const [copied, setCopied] = useState(false);
  const url = `${site.url}/#project-${project.slug}`;

  const share = async () => {
    track("project_share", { project: project.slug });
    if (navigator.share && window.matchMedia("(pointer: coarse)").matches) {
      try {
        await navigator.share({ title: `${project.title} | ${site.name}`, url });
        return;
      } catch {
        // Cancelled or unavailable: fall back to copying.
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt("Copy this link", url);
    }
  };

  return (
    <button type="button" onClick={share} className="btn btn-quiet gap-2">
      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {copied ? <path d="M4 10.5l4 4 8-9" /> : <path d="M8.5 11.5a3.5 3.5 0 005 0l3-3a3.5 3.5 0 00-5-5l-1 1M11.5 8.5a3.5 3.5 0 00-5 0l-3 3a3.5 3.5 0 005 5l1-1" />}
      </svg>
      <span aria-live="polite">{copied ? "Link copied" : "Share project"}</span>
    </button>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  return (
    <article className="glass card-hover spotlight shimmer group flex w-full flex-col rounded-[28px] p-3">
      <Preview project={project} />
      <div className="flex flex-1 flex-col gap-3 px-3 pb-3 pt-6 md:px-4">
        <p className="text-[0.9375rem] font-semibold text-blue">{project.categories.join(", ")}</p>
        <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight">{project.title}</h3>
        <p className="text-ink/80">{project.overview}</p>
        <div className="mt-auto pt-3">
          <button
            type="button"
            onClick={() => onOpen(project)}
            aria-haspopup="dialog"
            aria-label={`View details of ${project.title}`}
            className="btn btn-quiet"
          >
            View details
          </button>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  const open = (project: Project) => {
    track("project_view", { project: project.slug });
    setActive(project);
    if (!dialog.current?.open) dialog.current?.showModal();
    dialog.current?.scrollTo(0, 0);
  };

  // Links such as "#project-<slug>" in the hero, skills and results open that project here.
  useEffect(() => {
    const show = (slug: string) => {
      const project = projects.find((p) => p.slug === slug);
      if (!project) return false;
      track("project_view", { project: project.slug });
      setActive(project);
      if (!dialog.current?.open) dialog.current?.showModal();
      dialog.current?.scrollTo(0, 0);
      return true;
    };
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href^="#project-"]');
      if (!link) return;
      const slug = (link.getAttribute("href") ?? "").slice("#project-".length);
      if (show(slug)) e.preventDefault();
    };
    // A shared link that already ends in #project-<slug> opens that project on arrival.
    const first = window.setTimeout(() => {
      if (window.location.hash.startsWith("#project-")) show(window.location.hash.slice("#project-".length));
    }, 0);
    document.addEventListener("click", onClick);
    return () => {
      window.clearTimeout(first);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <section id="projects" className="relative overflow-hidden border-t border-line px-5 py-20 md:px-10 md:py-32">
      <div className="glow glow-blue right-[6%] top-56 h-[26rem] w-[26rem]" aria-hidden="true" />
      <div className="glow glow-silver bottom-24 left-[4%] h-[26rem] w-[30rem]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1280px]">
        <h2 className="h-display">Featured projects</h2>
        <p className="mt-4 max-w-[62ch] text-mute">{projectsIntro}</p>

        <Reveal className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} onOpen={open} />
          ))}
        </Reveal>

        {more.length > 0 && (
          <>
            <div
              id="more-projects"
              hidden={!showAll}
              className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              {showAll &&
                more.map((project, i) => (
                  <div
                    key={project.slug}
                    className={`rise flex ${
                      // A lone last card is centred under the pair above it.
                      i === more.length - 1 && more.length % 2 === 1
                        ? "md:col-span-2 md:w-[calc(50%-0.75rem)] md:justify-self-center"
                        : ""
                    }`}
                    style={{ "--d": i * 90 } as CSSProperties}
                  >
                    <ProjectCard project={project} onOpen={open} />
                  </div>
                ))}
            </div>

            <div className="mt-12 flex justify-center md:mt-14">
              <button
                ref={toggle}
                type="button"
                aria-expanded={showAll}
                aria-controls="more-projects"
                onClick={() => {
                  if (showAll) {
                    setShowAll(false);
                    // Bring the button back into view after the extra cards collapse.
                    requestAnimationFrame(() => toggle.current?.scrollIntoView({ block: "center" }));
                  } else {
                    setShowAll(true);
                    track("view_more_projects", { count: more.length });
                  }
                }}
                className="btn btn-outline gap-2"
              >
                {showAll ? "Show fewer projects" : `View more projects (${more.length})`}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className={`h-4 w-4 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 8l5 5 5-5" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>

      <dialog
        ref={dialog}
        aria-labelledby="project-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        className="m-auto max-h-[90dvh] w-[calc(100%-24px)] max-w-4xl overflow-y-auto rounded-[32px] border border-line bg-[var(--raise)] p-0 text-ink shadow-[0_40px_90px_-40px_rgb(60_70_90/0.5)]"
      >
        {active && (
          <div className="p-4 sm:p-6">
            <Preview project={active} large />
            {active.imageCaption && (
              <p className="px-2 pt-3 text-[0.9375rem] text-mute sm:px-4">{active.imageCaption}</p>
            )}

            <div className="px-2 pb-2 pt-7 sm:px-4">
              <div className="flex items-start justify-between gap-6 pb-7">
                <div>
                  <p className="text-[0.9375rem] font-semibold text-blue">{active.categories.join(", ")}</p>
                  <h3
                    id="project-title"
                    className="mt-1.5 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
                  >
                    {active.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => dialog.current?.close()}
                  className="btn btn-quiet sticky top-4 shrink-0 !min-h-11 !px-5 text-[0.9375rem]"
                >
                  Close
                </button>
              </div>

              <Block title="Project overview">
                <p className="text-ink/80">{active.overview}</p>
              </Block>
              <Block title="Business objective">
                <List items={active.objectives} />
              </Block>
              <Block title="My role">
                <List items={active.contributions} />
              </Block>
              {active.process.length > 0 && (
                <Block title="Execution">
                  <List items={active.process} />
                </Block>
              )}
              <Block title="Tools and technologies">
                <ul className="flex flex-wrap gap-2">
                  {active.tools.map((tool) => (
                    <li key={tool} className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-[0.9375rem] font-medium">
                      {tool}
                    </li>
                  ))}
                </ul>
              </Block>
              <Block title="Key deliverables">
                <List items={active.deliverables} />
              </Block>

              {active.metrics.length > 0 && (
                <Block title="Results and metrics">
                  <dl className="grid gap-4 sm:grid-cols-2">
                    {active.metrics.map((metric) => (
                      <div key={metric.label} className="rounded-[20px] bg-surface p-5">
                        <dt className="text-[0.9375rem] text-mute">{metric.label}</dt>
                        <dd className="mt-1 font-display text-3xl font-semibold tracking-tight">{metric.value}</dd>
                      </div>
                    ))}
                  </dl>
                  {active.metricsNote && <p className="mt-3 text-[0.9375rem] text-mute">{active.metricsNote}</p>}
                </Block>
              )}

              {active.video && (
                <Block title="Demo video">
                  <video
                    key={active.video.src}
                    src={active.video.src}
                    poster={active.video.poster}
                    controls
                    muted
                    playsInline
                    preload="none"
                    className="aspect-[16/9] w-full rounded-[16px] border border-line bg-surface object-contain"
                  />
                  <p className="mt-3 text-[0.9375rem] text-mute">{active.video.caption}</p>
                </Block>
              )}

              {active.gallery.length > 0 && (
                <Block title="Project gallery">
                  <div className={`grid gap-x-3 gap-y-5 ${active.gallery.length > 1 ? "sm:grid-cols-2" : ""}`}>
                    {active.gallery.map((item) => (
                      <figure key={item.src}>
                        <div className="relative aspect-[16/9] overflow-hidden rounded-[16px] border border-line bg-surface">
                          <Image
                            src={item.src}
                            alt={altFor(active, item.caption)}
                            fill
                            sizes="(min-width: 640px) 640px, 100vw"
                            className="object-cover object-top"
                          />
                          <SourceTag project={active} />
                        </div>
                        <figcaption className="mt-2 text-[0.9375rem] text-mute">{item.caption}</figcaption>
                      </figure>
                    ))}
                  </div>
                  <p className="mt-4 text-[0.9375rem] text-mute">{imageSourceNote[active.imageSource]}</p>
                </Block>
              )}

              <div className="mt-2 flex flex-wrap gap-3">
                {active.link && (
                  <a
                    href={active.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    data-track="project_link_click"
                    data-track-project={active.slug}
                  >
                    {active.linkLabel ?? "Open live project"}
                  </a>
                )}
                <ShareButton project={active} />
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
