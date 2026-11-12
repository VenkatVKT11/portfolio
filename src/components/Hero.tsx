import Image from "next/image";
import { Fragment, type CSSProperties } from "react";
import { hero, site } from "@/content/site";
import { NameParticles } from "./NameParticles";
import { ScrollCue } from "./ScrollCue";

const delay = (ms: number) => ({ "--d": ms }) as CSSProperties;

export function Hero() {
  return (
    // Fills the first screen. The dotted name has its own band under the nav; the photo rises
    // in front of it, the card starts just below it, and the scroll ring rests at the bottom.
    // Sizes and offsets live in globals.css under ".hero".
    <section
      id="top"
      className="hero relative flex min-h-[100svh] flex-col overflow-hidden px-5 pb-8 md:px-10 lg:pb-6"
    >
      <NameParticles text={site.name} />
      <div className="glow glow-blue -right-24 top-16 h-[26rem] w-[26rem]" aria-hidden="true" />

      <div className="relative mx-auto flex w-full max-w-[1280px] flex-1 items-start">
        <div className="grid w-full gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
          {/* Photo, left on desktop and first on phones. Its top overlaps the name behind it. */}
          <div className="hero-photo-cell">
          <figure className="hero-photo rise relative mx-auto w-full max-w-[380px]" style={delay(80)}>
            {/* Square frame, the same shape as the photo, so nothing is cropped. */}
            <div
              className={`relative w-full overflow-hidden rounded-[32px] ${
                site.profileImage ? "aspect-square" : "aspect-[4/5] bg-surface"
              }`}
            >
              {site.profileImage ? (
                <Image
                  src={site.profileImage}
                  alt="Portrait of Venkatesan G"
                  fill
                  priority
                  sizes="(min-width: 1024px) 600px, 380px"
                  className="object-contain"
                />
              ) : site.profilePlaceholder ? (
                <Image
                  src={site.profilePlaceholder}
                  alt="Illustration standing in for a profile photo"
                  fill
                  priority
                  sizes="(min-width: 1024px) 520px, 380px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center text-mute">
                  <svg width="72" height="72" viewBox="0 0 56 56" fill="none" aria-hidden="true">
                    <circle cx="28" cy="21" r="9" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M10 48c2-9.5 9-14 18-14s16 4.5 18 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span className="font-medium">Profile photo goes here</span>
                </div>
              )}
            </div>
          </figure>
          </div>

          {/* Introduction card, right on desktop, about as tall as the photo */}
          <div
            className="hero-card rise glass rounded-[32px] p-7 sm:p-10 lg:flex lg:flex-col lg:justify-center lg:p-[clamp(1.75rem,4.5svh,3.5rem)]"
            style={delay(240)}
          >
            <h1 className="hero-title">{hero.headline}</h1>

            <p className="mt-6 font-display text-xl font-semibold tracking-tight text-blue md:text-2xl">
              {hero.pillars.map((pillar, i) => (
                <Fragment key={pillar.name}>
                  {i > 0 && (
                    <span className="mx-2 text-blue/50" aria-hidden="true">
                      ×
                    </span>
                  )}
                  <a
                    href={`#project-${pillar.project}`}
                    className="underline decoration-transparent decoration-2 underline-offset-[6px] transition-colors hover:decoration-blue"
                  >
                    {pillar.name}
                  </a>
                </Fragment>
              ))}
            </p>

            <p className="hero-desc mt-5 max-w-[46ch] text-lg text-ink/80 xl:text-xl xl:leading-relaxed">{hero.description}</p>

            <div className="hero-actions mt-9 flex flex-wrap gap-3">
              <a href={hero.primaryCta.href} className="btn btn-primary">
                {hero.primaryCta.label}
              </a>
              <a href={hero.secondaryCta.href} className="btn btn-outline">
                {hero.secondaryCta.label}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-cue relative mt-10 flex justify-center lg:mt-6">
        <ScrollCue />
      </div>
    </section>
  );
}
