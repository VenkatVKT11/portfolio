"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

const links = [
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Work", id: "work" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Results", id: "results" },
];

const linkStyle =
  "relative block rounded-full px-3.5 py-2 text-[0.9375rem] font-medium transition-colors duration-300";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // Mark the section that is crossing the middle of the screen.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ["top", ...links.map((link) => link.id), "contact"]) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <header className="no-print fixed inset-x-0 top-3 z-50 px-3 md:top-5 md:px-6">
      <nav
        aria-label="Main"
        className="glass mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-3 rounded-[28px] py-2 pl-5 pr-2.5 max-[400px]:gap-x-2 max-[400px]:pl-4 max-[400px]:pr-2"
      >
        <Link href="/#top" className="font-display text-lg font-semibold tracking-tight max-[400px]:text-[0.9375rem]">
          {site.name}
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {links.map((link) => {
            const current = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={current ? "true" : undefined}
                  className={`${linkStyle} ${
                    current ? "bg-white text-blue shadow-[0_0_0_1px_rgb(196_202_214/0.6)]" : "text-ink/70 hover:text-ink"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
          {site.resume && (
            <li>
              <a
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkStyle} text-ink/70 hover:text-ink`}
              >
                Resume
              </a>
            </li>
          )}
        </ul>

        <div className="flex items-center gap-1">
          {/* Leads to "Get in touch", where LinkedIn, GitHub and email are listed. */}
          <a
            href="#contact"
            aria-current={active === "contact" ? "true" : undefined}
            className="btn btn-primary !min-h-10 !px-5 text-[0.9375rem] max-[400px]:!px-3.5 max-[400px]:!text-sm"
          >
            Contact Me
          </a>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full max-[400px]:w-9 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
              <path
                d={open ? "M5 5l12 12M17 5L5 17" : "M3 7h16M3 15h16"}
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </button>
        </div>

        {open && (
          <ul id="mobile-menu" className="w-full pb-2 pt-1 lg:hidden">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === link.id ? "true" : undefined}
                  className={`block rounded-2xl px-3 py-3 text-lg font-medium ${active === link.id ? "text-blue" : ""}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            {site.resume && (
              <li>
                <a
                  href={site.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-3 py-3 text-lg font-medium"
                >
                  Resume
                </a>
              </li>
            )}
          </ul>
        )}
      </nav>
    </header>
  );
}
