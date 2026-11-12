/** Circular rotating "scroll down" ring at the bottom of the hero. */
export function ScrollCue() {
  return (
    <a href="#tools" className="scroll-cue no-print" aria-label="Scroll down to the tools I use">
      <svg viewBox="0 0 124 124" className="scroll-cue-ring" aria-hidden="true">
        <defs>
          <path id="scroll-cue-path" d="M62 62 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" />
        </defs>
        <text>
          <textPath href="#scroll-cue-path" textLength="286" lengthAdjust="spacing">
            SCROLL DOWN • SCROLL DOWN • SCROLL DOWN •
          </textPath>
        </text>
      </svg>
      <svg
        className="scroll-cue-arrow"
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 4v15M5.5 12.5L12 19l6.5-6.5" />
      </svg>
    </a>
  );
}
