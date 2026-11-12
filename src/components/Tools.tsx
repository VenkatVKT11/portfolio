"use client";

import Image from "next/image";
import { useRef } from "react";
import { toolCategories, tools, type Tool } from "@/content/site";

/** The tool's official logo, or a plain text mark of its initials when no verified logo exists. */
function ToolLogo({ tool, size }: { tool: Tool; size: number }) {
  if (tool.logo) {
    return (
      <Image
        src={tool.logo}
        alt=""
        width={size}
        height={size}
        unoptimized
        loading="eager"
        style={{ width: size, height: size }}
        className={`flex-none ${tool.logo.endsWith(".png") ? "rounded-[22%]" : ""}`}
      />
    );
  }
  const initials = tool.name
    .split(/[\s.]+/)
    .filter((word) => /^[A-Z]/.test(word))
    .map((word) => word[0])
    .slice(0, 2)
    .join("");
  return (
    <span className="tool-mark" style={{ width: size, height: size, fontSize: size * 0.42 }} aria-hidden="true">
      {initials}
    </span>
  );
}

/** Both tracks travel at about the same speed, whatever the length of their names. */
const PIXELS_PER_SECOND = 55;

function Track({ items, reverse = false }: { items: Tool[]; reverse?: boolean }) {
  // Rough width of one copy of the row: chip padding and logo, plus the letters of each name.
  const groupWidth = items.reduce((total, tool) => total + 92 + tool.name.length * 9.3, 0);
  const seconds = Math.round((groupWidth * 2) / PIXELS_PER_SECOND);
  return (
    <div className={`marquee py-2 ${reverse ? "marquee-reverse" : ""}`}>
      <div className="marquee-track" style={{ animationDuration: `${seconds}s` }}>
        {[0, 1, 2, 3].map((copy) => (
          <ul key={copy} className="marquee-group" aria-hidden={copy > 0 ? "true" : undefined}>
            {items.map((tool) => (
              <li key={tool.name} className="tool-chip">
                <ToolLogo tool={tool} size={32} />
                <span className="text-[1.0625rem] font-semibold tracking-tight">{tool.name}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

// Alternate tools between the two tracks so each track mixes every category.
const trackOne = tools.filter((_, i) => i % 2 === 0);
const trackTwo = tools.filter((_, i) => i % 2 === 1);

export function Tools() {
  const dialog = useRef<HTMLDialogElement>(null);

  // Play the exit animation, then close. Skipped when the visitor prefers reduced motion.
  const close = () => {
    const el = dialog.current;
    if (!el?.open) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.close();
      return;
    }
    el.classList.add("is-closing");
    window.setTimeout(() => {
      el.classList.remove("is-closing");
      el.close();
    }, 170);
  };

  return (
    <section id="tools" className="relative bg-[#eaf1ff] py-16 md:py-24">
      <h2 className="text-center text-[0.8125rem] font-semibold uppercase tracking-[0.3em] text-ink/75">Tools I use</h2>

      <div className="mt-10 grid gap-2 md:gap-3">
        <Track items={trackOne} />
        <Track items={trackTwo} reverse />
      </div>

      <div className="mt-10 px-5 text-center">
        <button type="button" className="btn btn-outline" aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}>
          View All Tools
        </button>
      </div>

      <dialog
        ref={dialog}
        aria-labelledby="tools-title"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="m-auto max-h-[90dvh] w-[calc(100%-24px)] max-w-5xl overflow-y-auto rounded-[32px] border border-line bg-white p-0 text-ink shadow-[0_40px_90px_-40px_rgb(60_70_90/0.5)]"
      >
        <div className="p-5 sm:p-9">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h3 id="tools-title" className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Tools I Use
              </h3>
              <p className="mt-2 max-w-[52ch] text-mute">
                {tools.length} tools covering marketing, analytics, creative production, AI and automation.
              </p>
            </div>
            <button type="button" onClick={close} className="btn btn-quiet shrink-0 !min-h-11 !px-5 text-[0.9375rem]">
              Close
            </button>
          </div>

          {toolCategories.map((category) => {
            const group = tools.filter((tool) => tool.category === category);
            return (
              <section key={category} className="mt-9">
                <h4 className="flex items-baseline justify-between gap-4 border-b border-line pb-3 font-display text-xl font-semibold tracking-tight">
                  {category}
                  <span className="font-sans text-[0.9375rem] font-normal tracking-normal text-mute">{group.length}</span>
                </h4>
                <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
                  {group.map((tool) => (
                    <li
                      key={tool.name}
                      className="flex min-w-0 flex-col gap-3 rounded-[20px] border border-line bg-surface p-3.5 transition-colors sm:p-4 duration-300 hover:border-blue/40 hover:bg-white"
                    >
                      <span className="flex items-start justify-between gap-3">
                        <ToolLogo tool={tool} size={40} />
                        <span
                          className={`rounded-full px-2.5 py-1 text-[0.75rem] font-semibold leading-none ${
                            tool.status === "In use" ? "bg-blue/10 text-blue" : "border border-line bg-white text-mute"
                          }`}
                        >
                          {tool.status}
                        </span>
                      </span>
                      <span>
                        <span className="block font-semibold leading-snug tracking-tight">{tool.name}</span>
                        <span className="mt-0.5 block text-[0.8125rem] leading-snug text-mute">{tool.category}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </dialog>
    </section>
  );
}
