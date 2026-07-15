"use client";

import React, { useRef, useEffect } from "react";

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Mouse tracking for parallax
    let targetMouseX = window.innerWidth / 2;
    let targetMouseY = window.innerHeight / 2;
    let currentMouseX = window.innerWidth / 2;
    let currentMouseY = window.innerHeight / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const resize = () => {
      // Use parent container dimensions
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      initParticles();
    };

    class Particle {
      angle: number;
      radius: number;
      speed: number;
      length: number;
      thickness: number;
      opacity: number;
      maxRadius: number;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.angle = Math.random() * Math.PI * 2;
        // Focus particles more towards the center, like a galaxy/sphere
        this.maxRadius = Math.max(canvasWidth, canvasHeight) / 1.2;
        this.radius = Math.pow(Math.random(), 1.5) * this.maxRadius;
        // Speed depends on radius (inner moves faster)
        this.speed = (Math.random() > 0.5 ? 1 : -1) * (0.0005 + Math.random() * 0.001);
        this.length = Math.random() * 5 + 2;
        this.thickness = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.4 + 0.6; // 0.6 to 1.0 opacity
      }

      update() {
        this.angle += this.speed;
      }

      draw(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, canvasWidth: number, canvasHeight: number, mouseOffsetX: number, mouseOffsetY: number) {
        // Calculate parallax based on depth (radius ratio)
        const depth = this.radius / this.maxRadius;
        const parallaxX = mouseOffsetX * depth * 0.5; // deeper particles move more
        const parallaxY = mouseOffsetY * depth * 0.5;

        const x = centerX + Math.cos(this.angle) * this.radius + parallaxX;
        const y = centerY + Math.sin(this.angle) * this.radius + parallaxY;
        
        // Color mapping to match the antigravity screenshot (Orange/Red left -> Blue/Purple right)
        const normalizedX = Math.max(0, Math.min(1, x / canvasWidth));
        const normalizedY = Math.max(0, Math.min(1, y / canvasHeight));
        
        // Hue mapping: 
        // Top-left: Yellow/Orange (40)
        // Bottom-left: Red (0)
        // Top-right: Light Blue (200)
        // Bottom-right: Deep Blue/Purple (240)
        const hueX = 20 + normalizedX * 200; // 20 to 220
        const hueY = normalizedY * 40 - 20; // -20 to 20
        let finalHue = hueX + hueY;
        if (finalHue < 0) finalHue += 360;

        ctx.save();
        ctx.translate(x, y);
        // Orient tangentially (like a swirling galaxy of dashes)
        ctx.rotate(this.angle + Math.PI / 2 + 0.2); // slight offset from perfect tangent
        
        ctx.fillStyle = `hsla(${finalHue}, 85%, 55%, ${this.opacity})`;
        ctx.beginPath();
        ctx.roundRect(-this.thickness / 2, -this.length / 2, this.thickness, this.length, this.thickness);
        ctx.fill();
        ctx.restore();
      }
    }

    const initParticles = () => {
      particles = [];
      // Scale particle count based on screen size
      const numParticles = Math.floor((canvas.width * canvas.height) / 3000); 
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Smooth interpolation for mouse movement
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Calculate offset from center, inverted for natural parallax
      const mouseOffsetX = (centerX - currentMouseX) * 0.2;
      const mouseOffsetY = (centerY - currentMouseY) * 0.2;

      particles.forEach((p) => {
        p.update();
        p.draw(ctx, centerX, centerY, canvas.width, canvas.height, mouseOffsetX, mouseOffsetY);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}
