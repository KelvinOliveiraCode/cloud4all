// Campo de partículas: reage ao mouse no desktop e ao toque no celular.
// Puro canvas, sem biblioteca. Respeita movimento reduzido e aba oculta.

import { clamp } from "../core/format.js";

export function startField(canvas) {
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return () => {};

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let width = 0;
  let height = 0;
  let dpr = 1;
  let particles = [];
  let frame = 0;
  let last = 0;
  let running = true;
  let pulse = null;
  let colorDot = "rgba(21,22,15,0.4)";
  let colorLine = "rgba(21,22,15,0.12)";
  let colorAccent = "rgba(46,91,69,0.7)";

  const pointer = { x: -999, y: -999, active: false };

  function readColors() {
    const styles = getComputedStyle(document.documentElement);
    const ink = styles.getPropertyValue("--ink-3").trim() || "#6d7061";
    const accent = styles.getPropertyValue("--accent").trim() || "#2e5b45";
    colorDot = hexToRgba(ink, 0.55);
    colorLine = hexToRgba(ink, 0.13);
    colorAccent = hexToRgba(accent, 0.75);
  }

  function resize() {
    dpr = clamp(window.devicePixelRatio || 1, 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
    if (reduced.matches) draw(0);
  }

  function seed() {
    const target = clamp(Math.round((width * height) / 24000), 18, 84);
    const count = width < 720 ? Math.round(target * 0.62) : target;
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.26,
      vy: (Math.random() - 0.5) * 0.26,
      r: 0.7 + Math.random() * 1.2,
      accent: Math.random() < 0.16,
    }));
  }

  function step(dt) {
    const maxDist = width < 720 ? 88 : 118;
    for (const particle of particles) {
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;

      if (particle.x < -20) particle.x = width + 20;
      if (particle.x > width + 20) particle.x = -20;
      if (particle.y < -20) particle.y = height + 20;
      if (particle.y > height + 20) particle.y = -20;

      if (pointer.active) {
        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 130 && dist > 0.5) {
          const force = ((130 - dist) / 130) * 0.55;
          particle.vx += (dx / dist) * force;
          particle.vy += (dy / dist) * force;
        }
      }

      if (pulse) {
        const dx = particle.x - pulse.x;
        const dy = particle.y - pulse.y;
        const dist = Math.hypot(dx, dy);
        const age = (performance.now() - pulse.at) / 700;
        if (dist < 190 && dist > 1 && age < 1) {
          const force = ((190 - dist) / 190) * 2.4 * (1 - age);
          particle.vx += (dx / dist) * force;
          particle.vy += (dy / dist) * force;
        }
      }

      const speed = Math.hypot(particle.vx, particle.vy);
      const maxSpeed = 0.75;
      if (speed > maxSpeed) {
        particle.vx = (particle.vx / speed) * maxSpeed;
        particle.vy = (particle.vy / speed) * maxSpeed;
      }

      particle.vx *= 0.992;
      particle.vy *= 0.992;
      if (Math.abs(particle.vx) < 0.02) particle.vx += (Math.random() - 0.5) * 0.02;
      if (Math.abs(particle.vy) < 0.02) particle.vy += (Math.random() - 0.5) * 0.02;
    }

    if (pulse && performance.now() - pulse.at > 900) pulse = null;
  }

  function draw(dt) {
    ctx.clearRect(0, 0, width, height);
    const maxDist = width < 720 ? 88 : 118;

    ctx.lineWidth = 0.7;
    for (let i = 0; i < particles.length; i += 1) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j += 1) {
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < maxDist) {
          ctx.globalAlpha = (1 - dist / maxDist) * 0.55;
          ctx.strokeStyle = colorLine;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1;
    for (const particle of particles) {
      ctx.fillStyle = particle.accent ? colorAccent : colorDot;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
      ctx.fill();
    }

    if (pointer.active) {
      ctx.strokeStyle = colorAccent;
      ctx.globalAlpha = 0.28;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, 26, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }

  function loop(now) {
    if (!running) return;
    const dt = last ? Math.min((now - last) / 16.67, 2.4) : 1;
    last = now;
    step(dt);
    draw(dt);
    frame = requestAnimationFrame(loop);
  }

  function start() {
    if (frame) cancelAnimationFrame(frame);
    last = 0;
    if (reduced.matches) {
      draw(0);
      return;
    }
    frame = requestAnimationFrame(loop);
  }

  function stop() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  }

  function onPointerMove(event) {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.active = true;
  }

  function onPointerLeave() {
    pointer.active = false;
  }

  function onPointerDown(event) {
    pulse = { x: event.clientX, y: event.clientY, at: performance.now() };
  }

  function onVisibility() {
    if (document.hidden) {
      running = false;
      stop();
    } else {
      running = true;
      start();
    }
  }

  function onMotionChange() {
    stop();
    start();
  }

  readColors();
  resize();
  start();

  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerdown", onPointerDown, { passive: true });
  document.addEventListener("pointerleave", onPointerLeave);
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("c4a:theme", readColors);
  reduced.addEventListener?.("change", onMotionChange);

  return () => {
    stop();
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerdown", onPointerDown);
    document.removeEventListener("pointerleave", onPointerLeave);
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("c4a:theme", readColors);
    reduced.removeEventListener?.("change", onMotionChange);
  };
}

function hexToRgba(value, alpha) {
  const hex = value.replace("#", "").trim();
  if (hex.length === 3) {
    const [r, g, b] = hex.split("").map((part) => parseInt(part + part, 16));
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  if (hex.length === 6) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return `rgba(21, 22, 15, ${alpha})`;
}
