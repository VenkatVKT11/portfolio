"use client";

import { useEffect, useRef } from "react";

type Dot = { hx: number; hy: number; x: number; y: number; vx: number; vy: number };

/**
 * The name drawn as a field of halftone dots across the top of the hero.
 * Dots scatter away from the pointer and spring back. Plain 2D canvas: no WebGL, no 3D.
 */
export function NameParticles({ text }: { text: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -9999, y: -9999 };
    let dots: Dot[] = [];
    let radius = 2;
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;
    let visible = true;
    let disposed = false;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#171717";
      ctx.beginPath();
      for (const d of dots) {
        ctx.moveTo(d.x + radius, d.y);
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
      }
      ctx.fill();
    };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.round(rect.width);
      height = Math.round(rect.height);
      if (width === 0 || height === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Size the name to span most of the width. It sits in its own band just under the nav.
      // These numbers are mirrored by --name-top and --name-cap in globals.css.
      const family = getComputedStyle(canvas).fontFamily;
      const wide = width >= 768;
      let fontSize = 200;
      ctx.font = `700 ${fontSize}px ${family}`;
      // Leave a clear margin on both sides so no letter is clipped at the screen edge.
      const target = Math.min(width * 0.88, 1400);
      fontSize = Math.min((fontSize * target) / ctx.measureText(text).width, 230);
      // On short screens keep the letters modest so the photo and card still fit below.
      if (wide) fontSize = Math.min(fontSize, (window.innerHeight * 0.14) / 0.73);
      const capHeight = fontSize * 0.73;
      const top = wide ? 92 : 78;

      // Draw the name off-screen, then keep one dot for every grid point that lands on a letter.
      const step = wide ? Math.max(5, Math.round(fontSize / 26)) : 3;
      radius = step * 0.4;
      const off = document.createElement("canvas");
      off.width = width;
      off.height = height;
      const octx = off.getContext("2d");
      if (!octx) return;
      octx.font = `700 ${fontSize}px ${family}`;
      octx.textAlign = "center";
      octx.textBaseline = "alphabetic";
      octx.fillStyle = "#000";
      octx.fillText(text, width / 2, top + capHeight);
      const data = octx.getImageData(0, 0, width, height).data;

      dots = [];
      for (let y = Math.floor(step / 2); y < height; y += step) {
        for (let x = Math.floor(step / 2); x < width; x += step) {
          if (data[(y * width + x) * 4 + 3] > 140) dots.push({ hx: x, hy: y, x, y, vx: 0, vy: 0 });
        }
      }
      draw();
    };

    const tick = () => {
      frame = 0;
      if (disposed || !visible) {
        running = false;
        return;
      }
      const reach = Math.max(90, Math.min(150, width * 0.11));
      let moving = false;
      for (const d of dots) {
        const dx = d.x - pointer.x;
        const dy = d.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < reach) {
          const push = ((reach - dist) / reach) * 6;
          const angle = Math.atan2(dy, dx);
          d.vx += Math.cos(angle) * push;
          d.vy += Math.sin(angle) * push;
        }
        d.vx += (d.hx - d.x) * 0.045;
        d.vy += (d.hy - d.y) * 0.045;
        d.vx *= 0.84;
        d.vy *= 0.84;
        d.x += d.vx;
        d.y += d.vy;
        if (Math.abs(d.vx) > 0.02 || Math.abs(d.vy) > 0.02 || Math.abs(d.hx - d.x) > 0.1 || Math.abs(d.hy - d.y) > 0.1) {
          moving = true;
        }
      }
      draw();
      if (moving) {
        frame = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const start = () => {
      if (running || reduceMotion || !visible) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      if (pointer.y > -160 && pointer.y < rect.height + 160) start();
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const resizeObserver = new ResizeObserver(() => build());
    resizeObserver.observe(canvas);
    const viewObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    viewObserver.observe(canvas);

    document.fonts.ready.then(() => {
      if (!disposed) build();
    });
    // Rebuild on real size changes only. On phones the height changes constantly while
    // scrolling (the address bar hides and shows), and the name does not depend on it there.
    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;
    const onResize = () => {
      const widthChanged = window.innerWidth !== lastWidth;
      const heightMatters = window.innerWidth >= 768 && window.innerHeight !== lastHeight;
      lastWidth = window.innerWidth;
      lastHeight = window.innerHeight;
      if (widthChanged || heightMatters) build();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      viewObserver.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [text]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-[26rem] w-full font-display"
    />
  );
}
