"use client";

import { useEffect, useRef } from "react";

interface AnimatedMeshBackgroundProps {
  variant?: "default" | "orange" | "purple" | "cyan" | "pink" | "green";
}

export default function AnimatedMeshBackground({ variant = "default" }: AnimatedMeshBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;
    let time = 0;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Color schemes based on variant
    const colorSchemes = {
      default: [
        { r: 6, g: 182, b: 212 },     // cyan
        { r: 168, g: 85, b: 247 },    // purple
        { r: 236, g: 72, b: 153 },    // pink
        { r: 59, g: 130, b: 246 },    // blue
      ],
      orange: [
        { r: 249, g: 115, b: 22 },    // orange
        { r: 251, g: 146, b: 60 },    // lighter orange
        { r: 239, g: 68, b: 68 },     // red
        { r: 236, g: 72, b: 153 },    // pink
      ],
      purple: [
        { r: 168, g: 85, b: 247 },    // purple
        { r: 139, g: 92, b: 246 },    // violet
        { r: 99, g: 102, b: 241 },    // indigo
        { r: 59, g: 130, b: 246 },    // blue
      ],
      cyan: [
        { r: 6, g: 182, b: 212 },     // cyan
        { r: 14, g: 165, b: 233 },    // sky
        { r: 59, g: 130, b: 246 },    // blue
        { r: 99, g: 102, b: 241 },    // indigo
      ],
      pink: [
        { r: 236, g: 72, b: 153 },    // pink
        { r: 219, g: 39, b: 119 },    // rose
        { r: 249, g: 115, b: 22 },    // orange
        { r: 251, g: 146, b: 60 },    // lighter orange
      ],
      green: [
        { r: 16, g: 185, b: 129 },    // emerald
        { r: 20, g: 184, b: 166 },    // teal
        { r: 6, g: 182, b: 212 },     // cyan
        { r: 34, g: 197, b: 94 },     // green
      ],
    };

    const colors = colorSchemes[variant];

    // Create gradient mesh
    const createMeshGradient = () => {
      const gridSize = 4;
      const cellWidth = canvas.width / gridSize;
      const cellHeight = canvas.height / gridSize;

      // Clear canvas
      ctx.fillStyle = "rgba(15, 23, 42, 1)"; // slate-950
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create animated gradient mesh
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          const x = i * cellWidth;
          const y = j * cellHeight;

          // Calculate wave effect
          const waveX = Math.sin(time * 0.001 + i * 0.5) * 30;
          const waveY = Math.cos(time * 0.001 + j * 0.5) * 30;

          // Mouse interaction
          const dx = mouseX - (x + cellWidth / 2);
          const dy = mouseY - (y + cellHeight / 2);
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 300;
          const influence = Math.max(0, 1 - distance / maxDistance);

          const offsetX = x + waveX + dx * influence * 0.1;
          const offsetY = y + waveY + dy * influence * 0.1;

          // Create radial gradient for each cell
          const gradient = ctx.createRadialGradient(
            offsetX + cellWidth / 2,
            offsetY + cellHeight / 2,
            0,
            offsetX + cellWidth / 2,
            offsetY + cellHeight / 2,
            cellWidth * 1.5
          );

          // Select color based on position and time
          const colorIndex = (i + j + Math.floor(time * 0.0005)) % colors.length;
          const color = colors[colorIndex];
          const nextColor = colors[(colorIndex + 1) % colors.length];

          // Animate between colors
          const colorMix = (Math.sin(time * 0.001 + i + j) + 1) / 2;
          const r = Math.floor(color.r * (1 - colorMix) + nextColor.r * colorMix);
          const g = Math.floor(color.g * (1 - colorMix) + nextColor.g * colorMix);
          const b = Math.floor(color.b * (1 - colorMix) + nextColor.b * colorMix);

          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.4)`);
          gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.2)`);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

          ctx.fillStyle = gradient;
          ctx.fillRect(offsetX, offsetY, cellWidth * 2, cellHeight * 2);
        }
      }

      // Add overlay noise texture
      ctx.globalCompositeOperation = "overlay";
      ctx.fillStyle = `rgba(255, 255, 255, 0.02)`;
      for (let i = 0; i < 1000; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 2;
        ctx.fillRect(x, y, size, size);
      }
      ctx.globalCompositeOperation = "source-over";

      // Add scanline effect
      ctx.strokeStyle = "rgba(6, 182, 212, 0.03)";
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.height; i += 4) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }
    };

    // Animation loop
    const animate = () => {
      time += 16; // ~60fps
      createMeshGradient();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}
