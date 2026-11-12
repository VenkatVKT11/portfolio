import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { work, workflow } from "@/content/site";
import { Reveal } from "./Reveal";

const icons: Record<(typeof workflow.steps)[number]["icon"], ReactNode> = {
  audience: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </>
  ),
  ads: (
    <>
      <path d="M4 10v4h3l7 4V6l-7 4H4z" />
      <path d="M17.5 9.5a4 4 0 010 5" />
    </>
  ),
  landing: (
    <>
      <rect x="3.5" y="4.5" width="17" height="13" rx="2.5" />
      <path d="M3.5 8.5h17M11 12l2 6 1.5-2.5L17 14l-6-2z" />
    </>
  ),
  lead: (
    <>
      <circle cx="10" cy="8.5" r="3.5" />
      <path d="M3.5 19.5c.8-3.6 3.3-5.5 6.5-5.5 1.6 0 3 .5 4.1 1.4M18 13v6M15 16h6" />
    </>
  ),
  automate: <path d="M13 3L5 13.5h6L10 21l8-10.5h-6L13 3z" />,
  watch: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="3" />
      <path d="M10.5 9.5v5l4.2-2.5-4.2-2.5z" />
    </>
  ),
};

/**
 * "What I do": the statement and six-step lead workflow, followed by the four kinds
 * of work as compact cards.
 */
export function Work() {
  return (
    <section id="work" className="relative overflow-hidden border-t border-line px-5 py-20 md:px-10 md:py-32">
      <div className="glow glow-silver left-[10%] top-[38%] h-[22rem] w-[30rem]" aria-hidden="true" />
      <div className="glow glow-blue right-[16%] top-[42%] h-[16rem] w-[22rem]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1280px]">
        <h2 className="h-display">{work.heading}</h2>

        <p className="statement mt-8">
          <span>{workflow.heading[0]}</span>
          <span className="text-mute">{workflow.heading[1]}</span>
        </p>
        <p className="mt-6 max-w-[56ch] text-lg text-ink/80">{workflow.intro}</p>

        <p className="mb-5 mt-12 text-[0.9375rem] text-mute md:mt-16">{workflow.caption}</p>
        <ol className="flow">
          {workflow.steps.map((step, i) => (
            <li key={step.title} className="node glass" style={{ "--i": i } as CSSProperties}>
              <span className="node-icon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {icons[step.icon]}
                </svg>
              </span>
              <span>
                <strong>{step.title}</strong>
                <small>{step.detail}</small>
              </span>
            </li>
          ))}
        </ol>

        <h3 className="mt-16 font-display text-2xl font-semibold tracking-tight md:mt-24 md:text-[1.75rem]">
          {work.intro}
        </h3>

        {/* Compact cards: four across on desktop, two on tablets, a thumbnail row on phones. */}
        <Reveal className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {work.cards.map((card) => (
            <article key={card.title} className="card card-hover group flex gap-4 !rounded-[22px] p-2.5 sm:block">
              <div className="relative aspect-square w-24 flex-none self-start overflow-hidden rounded-[14px] bg-surface sm:aspect-[16/10] sm:w-auto">
                {card.image && (
                  <Image
                    src={card.image}
                    alt={`Illustration for ${card.title}`}
                    fill
                    sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 96px"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                )}
              </div>
              <div className="min-w-0 py-1 pr-2 sm:px-2 sm:pb-2 sm:pt-4">
                <h4 className="font-display text-lg font-semibold leading-tight tracking-tight">{card.title}</h4>
                <p className="mt-1.5 text-[0.9375rem] leading-snug text-ink/80">{card.text}</p>
                <p className="mt-2 text-[0.8125rem] font-semibold leading-snug text-blue">{card.tools}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
