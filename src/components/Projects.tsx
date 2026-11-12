"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { projectGalleryNote, projectImageLabel, projects, projectsIntro, type Project } from "@/content/site";
import { Reveal } from "./Reveal";

/** Small tag on every generated picture so nobody mistakes it for a real screenshot. */
function MockupTag() {
  if (!projectImageLabel) return null;
  return (
    <span className="glass absolute bottom-3 left-3 rounded-full px-3 py-1 text-[0.75rem] font-semibold leading-none text-ink">
      {projectImageLabel}
    </span>
  );
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
            alt={`Illustrative mockup for ${project.title}`}
            fill
            sizes={large ? "(min-width: 768px) 800px, 100vw" : "(min-width: 768px) 600px, 100vw"}
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <MockupTag />
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

export function Projects() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<Project | null>(null);

  const open = (project: Project) => {
    setActive(project);
    if (!dialog.current?.open) dialog.current?.showModal();
    dialog.current?.scrollTo(0, 0);
  };

  // Links such as "#project-<slug>" in the hero, skills and results open that project here.
  useEffect(() => {
    const show = (slug: string) => {
      const project = projects.find((p) => p.slug === slug);
      if (!project) return false;
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
          {projects.map((project) => (
            <article key={project.slug} className="glass card-hover group flex flex-col rounded-[28px] p-3">
              <Preview project={project} />
              <div className="flex flex-1 flex-col gap-3 px-3 pb-3 pt-6 md:px-4">
                <p className="text-[0.9375rem] font-semibold text-blue">{project.categories.join(", ")}</p>
                <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight">{project.title}</h3>
                <p className="text-ink/80">{project.overview}</p>
                <div className="mt-auto pt-3">
                  <button
                    type="button"
                    onClick={() => open(project)}
                    aria-haspopup="dialog"
                    aria-label={`View details of ${project.title}`}
                    className="btn btn-quiet"
                  >
                    View details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </Reveal>
      </div>

      <dialog
        ref={dialog}
        aria-labelledby="project-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        className="m-auto max-h-[90dvh] w-[calc(100%-24px)] max-w-4xl overflow-y-auto rounded-[32px] border border-line bg-white p-0 text-ink shadow-[0_40px_90px_-40px_rgb(60_70_90/0.5)]"
      >
        {active && (
          <div className="p-4 sm:p-6">
            <Preview project={active} large />

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

              {active.gallery.length > 0 && (
                <Block title="Project gallery">
                  <div className={`grid gap-3 ${active.gallery.length > 1 ? "sm:grid-cols-2" : ""}`}>
                    {active.gallery.map((src, i) => (
                      <div
                        key={src}
                        className="relative aspect-[16/9] overflow-hidden rounded-[16px] border border-line bg-surface"
                      >
                        <Image
                          src={src}
                          alt={`${active.title}, illustrative mockup ${i + 1}`}
                          fill
                          sizes="(min-width: 640px) 640px, 100vw"
                          className="object-cover object-top"
                        />
                        <MockupTag />
                      </div>
                    ))}
                  </div>
                  {projectGalleryNote && <p className="mt-3 text-[0.9375rem] text-mute">{projectGalleryNote}</p>}
                </Block>
              )}

              {active.link && (
                <a href={active.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-2">
                  Open live project
                </a>
              )}
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
