import {
  about,
  careerTransition,
  certifications,
  education,
  experience,
  metrics,
  projects,
  skills,
} from "@/content/site";
import { Reveal } from "./Reveal";

const section = "px-5 py-20 md:px-10 md:py-32";
const wrap = "mx-auto max-w-[1280px]";
const textLink =
  "font-medium underline decoration-line decoration-2 underline-offset-[5px] transition-colors hover:text-blue hover:decoration-blue";

const projectTitle = (slug: string) => projects.find((p) => p.slug === slug)?.title ?? slug;

export function About() {
  return (
    <section id="about" className={`relative overflow-hidden border-t border-line ${section}`}>
      <div className="glow glow-blue -right-10 top-1/3 h-72 w-72" aria-hidden="true" />
      <div className={`relative grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-24 ${wrap}`}>
        <div className="grid content-start gap-5">
          <h2 className="h-display">{about.heading}</h2>
          <p className="max-w-[26ch] font-display text-2xl font-semibold leading-tight tracking-tight md:text-[2.125rem]">
            {about.statement}
          </p>
          {about.paragraphs.map((text) => (
            <p key={text} className="max-w-[62ch] text-ink/80">
              {text}
            </p>
          ))}
        </div>

        <dl className="glass self-start rounded-[28px] px-6 py-2 md:px-7">
          {about.facts.map((fact) => (
            <div
              key={fact.label}
              className="grid grid-cols-[100px_1fr] gap-4 border-b border-line py-4 last:border-b-0"
            >
              <dt className="text-[0.9375rem] text-mute">{fact.label}</dt>
              <dd className="font-medium">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className={`bg-surface ${section}`}>
      <div className={wrap}>
        <h2 className="h-display">{skills.heading}</h2>
        <p className="mt-4 max-w-[62ch] text-mute">{skills.intro}</p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {skills.groups.map((group) => (
            <div key={group.name} className="card flex flex-col p-6 md:p-8">
              <h3 className="flex items-baseline justify-between gap-4 border-b border-line pb-4 font-display text-2xl font-semibold tracking-tight">
                {group.name}
                <span className="font-sans text-[0.9375rem] font-normal tracking-normal text-mute">
                  {group.skills.length} skills
                </span>
              </h3>

              <ul className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className={`rounded-full border px-3.5 py-1.5 text-[0.9375rem] font-medium ${
                      group.accent ? "border-blue/25 bg-blue/[0.07] text-blue" : "border-line bg-surface"
                    }`}
                  >
                    {skill}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-7">
                <p className="text-[0.9375rem] text-mute">Used in</p>
                <ul className="mt-1.5 grid gap-1">
                  {group.evidence.map((slug) => (
                    <li key={slug}>
                      <a href={`#project-${slug}`} className={`inline-block py-1 ${textLink}`}>
                        {projectTitle(slug)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Points({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 grid gap-1.5">
      {items.map((item) => (
        <li key={item} className="relative pl-5 text-ink/80">
          <span className="absolute left-0 top-[0.65em] h-1.5 w-1.5 rounded-full bg-blue" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Experience() {
  return (
    <section id="experience" className={`border-t border-line ${section}`}>
      <div className={wrap}>
        <h2 className="h-display">Experience</h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-14">
          {/* Formal roles, newest first */}
          <ol className="ml-2 border-l border-line">
            {experience.map((stop) => (
              <li key={stop.title} className="relative pb-6 pl-7 last:pb-0 md:pl-10">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[6px] top-9 h-[11px] w-[11px] rounded-full ${
                    stop.current ? "bg-blue shadow-[0_0_0_5px_rgb(20_71_255/0.16)]" : "border-2 border-blue bg-white"
                  }`}
                />
                <div className="card p-6 md:p-8">
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.9375rem] font-medium text-mute">
                    {stop.period}
                    {stop.current && (
                      <span className="rounded-full bg-blue/10 px-2.5 py-0.5 text-[0.8125rem] font-semibold text-blue">
                        Current role
                      </span>
                    )}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold leading-tight tracking-tight">{stop.title}</h3>
                  <p className="mt-1 font-semibold text-blue">{stop.place}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {stop.meta.map((item) => (
                      <li key={item} className="rounded-full border border-line bg-surface px-3 py-1 text-[0.8125rem] font-medium">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Points items={stop.points} />
                </div>
              </li>
            ))}
          </ol>

          {/* Kept apart from the roles: a learning period, then education and certificates */}
          <div className="grid content-start gap-6">
            <div className="rounded-[28px] border border-dashed border-ink/25 bg-surface p-6 md:p-8">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.9375rem] font-medium text-mute">
                {careerTransition.period}
                <span className="rounded-full border border-line bg-white px-2.5 py-0.5 text-[0.8125rem] font-semibold text-ink">
                  {careerTransition.label}
                </span>
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold leading-tight tracking-tight">
                {careerTransition.title}
              </h3>
              <Points items={careerTransition.points} />
            </div>

            <div className="card p-6 md:p-8">
              <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight">Education</h3>
              <ul className="mt-4 grid gap-5">
                {education.map((item) => (
                  <li key={item.title}>
                    <p className="text-[0.9375rem] font-medium text-mute">{item.period}</p>
                    <p className="mt-1 font-semibold leading-snug">{item.title}</p>
                    <p className="mt-0.5 font-semibold text-blue">{item.place}</p>
                  </li>
                ))}
              </ul>
            </div>

            {certifications.length > 0 && (
              <div className="card p-6 md:p-8">
                <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight">Certifications</h3>
                <ul className="mt-4 grid gap-4">
                  {certifications.map((item) => (
                    <li key={item.name} className="border-t border-line pt-4 first:border-t-0 first:pt-0">
                      <p className="font-semibold leading-snug">
                        {item.link ? (
                          <a href={item.link} target="_blank" rel="noopener noreferrer" className={textLink}>
                            {item.name}
                          </a>
                        ) : (
                          item.name
                        )}
                      </p>
                      <p className="mt-0.5 text-[0.9375rem] text-mute">
                        {[item.issuer, item.year].filter(Boolean).join(", ")}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const number = new Intl.NumberFormat("en-IN");

export function Results() {
  const { followers, leads } = metrics;
  return (
    <section id="results" className={`relative overflow-hidden bg-surface ${section}`}>
      <div className="glow glow-blue left-[8%] top-44 h-80 w-80" aria-hidden="true" />
      <div className="glow glow-silver bottom-10 right-[10%] h-96 w-96" aria-hidden="true" />

      <div className={`relative ${wrap}`}>
        <h2 className="h-display">Campaign results</h2>
        <p className="mt-4 max-w-[62ch] text-mute">
          {metrics.note}{" "}
          <a href={`#project-${metrics.projectSlug}`} className={`inline-block py-2 text-ink ${textLink}`}>
            See the project
          </a>
        </p>

        <Reveal className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="glass rounded-[28px] p-7 md:col-span-2 md:p-9">
            <p className="text-mute">{followers.label}</p>
            <div className="mt-6 flex items-end justify-between gap-4">
              <p className="font-display text-4xl font-semibold leading-none tracking-tight text-mute sm:text-6xl">
                {number.format(followers.from)}
              </p>
              <svg
                viewBox="0 0 300 90"
                className="h-16 w-0 min-w-0 flex-1 sm:h-20"
                fill="none"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                <path d="M4 78 C 110 78, 170 16, 296 12 V 90 H 4 Z" fill="url(#rise-fill)" />
                <path
                  d="M4 78 C 110 78, 170 16, 296 12"
                  stroke="#1447ff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
                <defs>
                  <linearGradient id="rise-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop stopColor="#1447ff" stopOpacity="0.18" />
                    <stop offset="1" stopColor="#1447ff" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              <p className="font-display text-4xl font-semibold leading-none tracking-tight sm:text-7xl">
                {number.format(followers.to)}
              </p>
            </div>
            <p className="mt-6 font-semibold text-blue">+{number.format(followers.to - followers.from)} followers</p>
          </div>

          <div className="glass flex flex-col justify-between rounded-[28px] p-7 md:p-9">
            <p className="text-mute">{leads.label}</p>
            <p className="mt-6 font-display text-7xl font-semibold leading-none tracking-tight md:text-8xl">{leads.value}</p>
          </div>

          <div className="glass rounded-[28px] p-7 md:p-9">
            <h3 className="text-mute">Campaign types</h3>
            <ul className="mt-4 space-y-1.5 text-xl font-medium">
              {metrics.campaignTypes.map((type) => (
                <li key={type}>{type}</li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-[28px] p-7 md:col-span-2 md:p-9">
            <h3 className="text-mute">Campaign themes</h3>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {metrics.campaignThemes.map((theme) => (
                <li key={theme} className="rounded-full border border-line bg-white px-4 py-2 font-medium">
                  {theme}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
