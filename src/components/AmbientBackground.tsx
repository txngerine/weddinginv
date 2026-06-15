"use client";

import { useEffect, useRef } from "react";

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle structure
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;
      baseOpacity: number;
    }

    const particles: Particle[] = [];
    const maxParticles = 65;

    const createParticle = (yOffset = 0): Particle => {
      const size = Math.random() * 2.5 + 0.8;
      const baseOpacity = Math.random() * 0.4 + 0.15;
      return {
        x: Math.random() * width,
        y: yOffset ? yOffset : Math.random() * height,
        size,
        speedX: Math.random() * 0.4 - 0.2,
        speedY: -(Math.random() * 0.5 + 0.1), // Float upwards
        opacity: baseOpacity,
        fadeSpeed: Math.random() * 0.005 + 0.002,
        baseOpacity,
      };
    };

    // Pre-populate particles across the screen
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle());
    }

    // Handle mouse tracking for interactivity
    const mouse = { x: -1000, y: -1000, radius: 100 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Update CSS glow circle position
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${e.clientX - 250}px, ${e.clientY - 250}px, 0)`;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Color definitions
    // Dark mode: gold
    const pColor = "219, 174, 130";

    // Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;

        // Wrap around screen edges
        if (p.y < 0) {
          particles[i] = createParticle(height + 10);
          continue;
        }
        if (p.x < 0 || p.x > width) {
          p.speedX *= -1;
        }

        // Mouse interaction: push particles away slightly
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * force * 2;
          p.y += Math.sin(angle) * force * 2;
        }

        // Draw particle with glowing aura
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, `rgba(${pColor}, ${p.opacity})`);
        gradient.addColorStop(0.5, `rgba(${pColor}, ${p.opacity * 0.4})`);
        gradient.addColorStop(1, `rgba(${pColor}, 0)`);
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Background radial glow that follows mouse */}
      <div
        ref={glowRef}
        className="fixed w-[500px] h-[500px] rounded-full blur-[100px] transition-opacity duration-1000 ease-out pointer-events-none opacity-40 z-0 bg-gradient-to-r from-emerald-light/10 to-gold-400/5"
        style={{
          transform: "translate3d(-1000px, -1000px, 0)",
          willChange: "transform",
        }}
      />
      {/* Canvas for particles */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full opacity-60" />
    </div>
  );
}
