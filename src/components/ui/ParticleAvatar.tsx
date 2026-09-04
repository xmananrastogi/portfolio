"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { Sparkles, Terminal } from "lucide-react";

interface ParticleAvatarProps {
  imageSrc: string;
  className?: string;
  particleSize?: number;
  resolution?: number; // Lower = more detailed particles
}

export function ParticleAvatar({
  imageSrc,
  className,
  particleSize = 2.2,
  resolution = 3,
}: ParticleAvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let scanlineY = 0;
    let scanlineSpeed = 1.2;
    let time = 0;

    // Responsive Canvas dimensions matching container
    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = Math.max(rect.width || 360, 280);
      const displayHeight = Math.max(rect.height || 420, 320);

      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      ctx.scale(dpr, dpr);

      return { width: displayWidth, height: displayHeight, dpr };
    };

    let { width, height } = updateDimensions();

    const mouse = {
      x: -9999,
      y: -9999,
      radius: 75,
      isDown: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      setIsHovered(true);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
        setIsHovered(true);
      }
    };

    const handleLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      setIsHovered(false);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleLeave);
    canvas.addEventListener("touchstart", handleTouchMove, { passive: true });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("touchend", handleLeave, { passive: true });

    class Particle {
      x: number;
      y: number;
      originX: number;
      originY: number;
      baseColor: string;
      glowColor: string;
      radius: number;
      vx: number;
      vy: number;
      ease: number;
      friction: number;
      dx: number;
      dy: number;
      distance: number;
      force: number;
      angle: number;
      phase: number;
      luminance: number;

      constructor(x: number, y: number, r: number, g: number, b: number, lum: number) {
        this.x = x + (Math.random() - 0.5) * 60;
        this.y = y + (Math.random() - 0.5) * 60;
        this.originX = x;
        this.originY = y;
        this.luminance = lum;

        // Enhanced contrast and vibrant skin/feature colors
        // Highlights receive an electric cyan-white shimmer
        const boostedR = Math.min(255, Math.floor(r * 1.25));
        const boostedG = Math.min(255, Math.floor(g * 1.25));
        const boostedB = Math.min(255, Math.floor(b * 1.25 + lum * 45));

        this.baseColor = `rgba(${boostedR}, ${boostedG}, ${boostedB}, ${0.85 + lum * 0.15})`;
        this.glowColor = `rgba(${Math.min(255, boostedR + 40)}, ${Math.min(255, boostedG + 60)}, 255, 1)`;

        // Detail scaling: Brighter features (eyes, skin, highlights) have sharper presence
        this.radius = (particleSize * 0.65) + (lum * particleSize * 0.85);

        this.vx = 0;
        this.vy = 0;
        this.ease = 0.06 + Math.random() * 0.04;
        this.friction = 0.86;
        this.dx = 0;
        this.dy = 0;
        this.distance = 0;
        this.force = 0;
        this.angle = 0;
        this.phase = Math.random() * Math.PI * 2;
      }

      update(scanY: number, t: number) {
        // Subtle cyber breathing motion when idle
        const idleWave = Math.sin(t * 1.5 + this.phase) * 0.6;
        const targetX = this.originX;
        const targetY = this.originY + idleWave;

        this.dx = mouse.x - this.x;
        this.dy = mouse.y - this.y;
        this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);

        // Repulsive magnetic force when mouse gets close
        if (this.distance < mouse.radius && this.distance > 0) {
          this.force = -mouse.radius / this.distance;
          this.angle = Math.atan2(this.dy, this.dx);
          this.vx += this.force * Math.cos(this.angle) * 1.8;
          this.vy += this.force * Math.sin(this.angle) * 1.8;
        }

        // Scanline excitation: particles glow/shift slightly as scanline sweeps
        const distToScan = Math.abs(this.y - scanY);
        let scanExcitation = 0;
        if (distToScan < 12) {
          scanExcitation = (12 - distToScan) / 12;
          this.vx += (Math.random() - 0.5) * scanExcitation * 0.8;
        }

        this.x += (this.vx *= this.friction) + (targetX - this.x) * this.ease;
        this.y += (this.vy *= this.friction) + (targetY - this.y) * this.ease;

        return scanExcitation;
      }

      draw(context: CanvasRenderingContext2D, scanGlow: number) {
        context.beginPath();
        if (scanGlow > 0.3) {
          context.fillStyle = this.glowColor;
          context.arc(this.x, this.y, this.radius * (1 + scanGlow * 0.4), 0, Math.PI * 2);
        } else {
          context.fillStyle = this.baseColor;
          context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        }
        context.fill();
      }
    }

    const init = (img: HTMLImageElement) => {
      const dimensions = updateDimensions();
      width = dimensions.width;
      height = dimensions.height;

      // Calculate scaled aspect ratio centered in canvas
      const padding = 20;
      const availableW = width - padding * 2;
      const availableH = height - padding * 2;
      const scale = Math.min(availableW / img.width, availableH / img.height);
      const imgWidth = img.width * scale;
      const imgHeight = img.height * scale;
      const offsetX = (width - imgWidth) / 2;
      const offsetY = (height - imgHeight) / 2;

      // Sample on an offscreen canvas
      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      offCtx.drawImage(img, offsetX, offsetY, imgWidth, imgHeight);
      const imageData = offCtx.getImageData(0, 0, width, height).data;

      particles = [];

      for (let y = 0; y < height; y += resolution) {
        for (let x = 0; x < width; x += resolution) {
          const index = (y * width + x) * 4;
          const alpha = imageData[index + 3];
          const red = imageData[index];
          const green = imageData[index + 1];
          const blue = imageData[index + 2];

          // Filter out transparent pixels AND bright background wall (neutral high brightness)
          const isWhiteBg = red > 175 && green > 175 && blue > 175 && Math.abs(red - green) < 18 && Math.abs(green - blue) < 18;
          if (alpha < 60 || isWhiteBg) {
            continue;
          }

          // Compute normalized luminance
          const lum = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

          particles.push(new Particle(x, y, red, green, blue, lum));
        }
      }
    };

    const animate = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Advance scanline
      scanlineY += scanlineSpeed;
      if (scanlineY > height + 20) {
        scanlineY = -20;
      }

      // Draw subtle holographic scanline beam
      if (scanlineY >= 0 && scanlineY <= height) {
        const grad = ctx.createLinearGradient(0, scanlineY - 6, 0, scanlineY + 6);
        grad.addColorStop(0, "rgba(56, 189, 248, 0)");
        grad.addColorStop(0.5, "rgba(56, 189, 248, 0.25)");
        grad.addColorStop(1, "rgba(56, 189, 248, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, scanlineY - 6, width, 12);
      }

      // Update & render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const scanGlow = p.update(scanlineY, time);
        p.draw(ctx, scanGlow);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const img = new Image();
    img.src = imageSrc;
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      init(img);
      animate();
    };

    const handleResize = () => {
      if (img.complete && img.naturalWidth > 0) {
        init(img);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleLeave);
      canvas.removeEventListener("touchstart", handleTouchMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleLeave);
    };
  }, [imageSrc, particleSize, resolution]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative flex items-center justify-center rounded-2xl border border-cyan-500/20 bg-zinc-950/40 p-2 backdrop-blur-sm transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
        className
      )}
    >
      {/* Sci-Fi HUD Corner Brackets */}
      <div className="pointer-events-none absolute -left-1 -top-1 size-3 border-l-2 border-t-2 border-cyan-400/70" />
      <div className="pointer-events-none absolute -right-1 -top-1 size-3 border-r-2 border-t-2 border-cyan-400/70" />
      <div className="pointer-events-none absolute -bottom-1 -left-1 size-3 border-b-2 border-l-2 border-cyan-400/70" />
      <div className="pointer-events-none absolute -bottom-1 -right-1 size-3 border-b-2 border-r-2 border-cyan-400/70" />

      {/* Futuristic Telemetry Badges */}

      <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-2 py-0.5 text-[10px] font-mono tracking-wider text-zinc-400 backdrop-blur-md">
        <Terminal className="size-3 text-cyan-400" />
        <span>{isHovered ? "INTERACTIVE // ACTIVE" : "CURSOR_DISPERSE"}</span>
      </div>

      {/* Main Canvas */}
      <canvas
        ref={canvasRef}
        className="block h-full w-full object-contain cursor-crosshair"
      />
    </div>
  );
}
