/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useRef } from 'react';

interface RainbowCursorProps {
  element?: HTMLElement | null;
  length?: number;
  colors?: string[];
  size?: number;
  trailSpeed?: number;
  colorCycleSpeed?: number;
  blur?: number;
  pulseSpeed?: number;
  pulseMin?: number;
  pulseMax?: number;
  zIndex?: number;
}

const RainbowCursor: React.FC<RainbowCursorProps> = ({
  element,
  length = 20,
  colors = ['#8b5cf6', '#06b6d4', '#3b82f6', '#6366f1', '#a855f7'],
  size = 4,
  trailSpeed = 0.4,
  colorCycleSpeed = 0.002,
  blur = 4,
  pulseSpeed = 0.01,
  pulseMin = 0.8,
  pulseMax = 1.2,
  zIndex = 0
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const cursorRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Array<{ position: { x: number; y: number } }>>(
    []
  );
  const animationFrameRef = useRef<number | undefined>(undefined);
  const cursorsInittedRef = useRef(false);
  const timeRef = useRef(0);

  class Particle {
    position: { x: number; y: number };

    constructor(x: number, y: number) {
      this.position = { x, y };
    }
  }

  // Helper function to interpolate between colors
  const interpolateColors = (
    color1: string,
    color2: string,
    factor: number
  ) => {
    const r1 = parseInt(color1.substr(1, 2), 16);
    const g1 = parseInt(color1.substr(3, 2), 16);
    const b1 = parseInt(color1.substr(5, 2), 16);

    const r2 = parseInt(color2.substr(1, 2), 16);
    const g2 = parseInt(color2.substr(3, 2), 16);
    const b2 = parseInt(color2.substr(5, 2), 16);

    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);

    return `rgb(${r}, ${g}, ${b})`;
  };

  const getPulseSize = (baseSize: number, time: number) => {
    const pulse = Math.sin(time * pulseSpeed);
    const scaleFactor = pulseMin + ((pulse + 1) * (pulseMax - pulseMin)) / 2;
    return baseSize * scaleFactor;
  };

  useEffect(() => {
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    if (prefersReducedMotion.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    contextRef.current = context;

    canvas.style.top = '0px';
    canvas.style.left = '0px';
    canvas.style.pointerEvents = 'none';
    canvas.style.position = 'absolute';
    canvas.style.zIndex = zIndex.toString();

    canvas.width = element.clientWidth;
    canvas.height = element.clientHeight;

    const onMouseMove = (e: MouseEvent) => {
      const boundingRect = element.getBoundingClientRect();
      
      // Only update if inside
      if (e.clientX < boundingRect.left || e.clientX > boundingRect.right || 
          e.clientY < boundingRect.top || e.clientY > boundingRect.bottom) {
        return;
      }

      cursorRef.current.x = e.clientX - boundingRect.left;
      cursorRef.current.y = e.clientY - boundingRect.top;

      if (!cursorsInittedRef.current) {
        cursorsInittedRef.current = true;
        for (let i = 0; i < length; i++) {
          particlesRef.current.push(
            new Particle(cursorRef.current.x, cursorRef.current.y)
          );
        }
      }
    };

    const onWindowResize = () => {
      canvas.width = element.clientWidth;
      canvas.height = element.clientHeight;
    };

    const updateParticles = () => {
      if (!contextRef.current || !canvasRef.current) return;

      const ctx = contextRef.current;
      const cvs = canvasRef.current;

      ctx.clearRect(0, 0, cvs.width, cvs.height);
      ctx.lineJoin = 'round';

      if (blur > 0) {
        ctx.filter = `blur(${blur}px)`;
      }

      const particleSets: {x: number, y: number}[] = [];
      let x = cursorRef.current.x;
      let y = cursorRef.current.y;

      particlesRef.current.forEach((particle, index) => {
        const nextParticle =
          particlesRef.current[index + 1] || particlesRef.current[0];

        particle.position.x = x;
        particle.position.y = y;

        particleSets.push({ x, y });

        x += (nextParticle.position.x - particle.position.x) * trailSpeed;
        y += (nextParticle.position.y - particle.position.y) * trailSpeed;
      });

      timeRef.current += colorCycleSpeed;
      const colorOffset = timeRef.current % 1;
      const currentSize = getPulseSize(size, timeRef.current);

      colors.forEach((color, index) => {
        const nextColor = colors[(index + 1) % colors.length];

        ctx.beginPath();
        ctx.strokeStyle = interpolateColors(
          color,
          nextColor,
          (index + colorOffset) / colors.length
        );

        if (particleSets.length) {
          ctx.moveTo(
            particleSets[0].x,
            particleSets[0].y + index * (currentSize - 1)
          );
        }

        particleSets.forEach((set, particleIndex) => {
          if (particleIndex !== 0) {
            ctx.lineTo(set.x, set.y + index * currentSize);
          }
        });

        ctx.lineWidth = currentSize;
        ctx.lineCap = 'round';
        ctx.stroke();
      });
    };

    const loop = () => {
      updateParticles();
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onWindowResize);
    loop();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
    };
  }, [
    element,
    length,
    colors,
    size,
    trailSpeed,
    colorCycleSpeed,
    blur,
    pulseSpeed,
    pulseMin,
    pulseMax,
    zIndex
  ]);

  return <canvas ref={canvasRef} className="pointer-events-none" />;
};
export default RainbowCursor;
