"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

interface ParticleAvatarProps {
  imageSrc: string;
  className?: string;
  particleSize?: number;
  resolution?: number; // Lower = more particles
}

export function ParticleAvatar({
  imageSrc,
  className,
  particleSize = 2.5,
  resolution = 6,
}: ParticleAvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    // Set canvas dimensions
    let width = canvas.parentElement?.clientWidth || 400;
    let height = canvas.parentElement?.clientHeight || 400;
    if (width === 0) width = 400;
    if (height === 0) height = 400;
    canvas.width = width;
    canvas.height = height;

    const mouse = {
      x: -9999,
      y: -9999,
      radius: 90,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    };

    const handleLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
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
      color: string;
      vx: number;
      vy: number;
      ease: number;
      friction: number;
      dx: number;
      dy: number;
      distance: number;
      force: number;
      angle: number;

      constructor(x: number, y: number, color: string) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.originX = x;
        this.originY = y;
        this.color = color;
        this.vx = 0;
        this.vy = 0;
        this.ease = 0.05 + Math.random() * 0.05;
        this.friction = 0.85;
        this.dx = 0;
        this.dy = 0;
        this.distance = 0;
        this.force = 0;
        this.angle = 0;
      }

      update() {
        this.dx = mouse.x - this.x;
        this.dy = mouse.y - this.y;
        this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        this.force = -mouse.radius / this.distance;

        if (this.distance < mouse.radius) {
          this.angle = Math.atan2(this.dy, this.dx);
          this.vx += this.force * Math.cos(this.angle);
          this.vy += this.force * Math.sin(this.angle);
        }

        this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
        this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
      }

      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, particleSize / 2, 0, Math.PI * 2);
        context.fill();
      }
    }

    const init = (img: HTMLImageElement) => {
      // Calculate scaled dimensions to fit inside canvas
      const scale = Math.min(width / img.width, height / img.height) * 0.8;
      const imgWidth = img.width * scale;
      const imgHeight = img.height * scale;
      const offsetX = (width - imgWidth) / 2;
      const offsetY = (height - imgHeight) / 2;

      // Draw to offscreen canvas to sample pixels
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
          if (alpha > 128) {
            const red = imageData[index];
            const green = imageData[index + 1];
            const blue = imageData[index + 2];
            // Tint slightly cyan/blue for a more holographic look, or use exact pixels
            const color = `rgba(${red}, ${Math.max(green, 150)}, ${Math.max(blue, 200)}, 1)`;
            particles.push(new Particle(x, y, color));
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
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

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleLeave);
      canvas.removeEventListener("touchstart", handleTouchMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleLeave);
    };
  }, [imageSrc, particleSize, resolution]);

  return (
    <div className={cn("relative h-full w-full", className)}>
      <canvas
        ref={canvasRef}
        className="block h-full w-full object-contain cursor-crosshair"
      />
    </div>
  );
}
