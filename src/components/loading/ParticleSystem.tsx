import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  friction: number;
  ease: number;
}

interface ParticleSystemProps {
  isAssembling: boolean;
  onAssembled?: () => void;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({ isAssembling, onAssembled }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrame = useRef<number | null>(null);
  const textCoordinates = useRef<{ x: number; y: number }[]>([]);

  const COLORS = ['#06b6d4', '#8b5cf6', '#3b82f6', '#22d3ee'];

  const initParticles = (width: number, height: number) => {
    const count = 180;
    const p: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      p.push({
        x,
        y,
        originX: x,
        originY: y,
        targetX: x,
        targetY: y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 2 + 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        friction: 0.95,
        ease: 0.05 + Math.random() * 0.05,
      });
    }
    particles.current = p;
  };

  const getTextCoordinates = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    const fontSize = Math.min(width / 8, 80);
    ctx.font = `bold ${fontSize}px Inter, system-ui, sans-serif`;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SHASBIN AS', width / 2, height / 2);

    const imageData = ctx.getImageData(0, 0, width, height).data;
    const coords: { x: number; y: number }[] = [];
    const step = 4; // Sample every 4th pixel

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const index = (y * width + x) * 4;
        if (imageData[index + 3] > 128) {
          coords.push({ x, y });
        }
      }
    }
    return coords;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
      textCoordinates.current = getTextCoordinates(ctx, canvas.width, canvas.height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.15)'; // Trail effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let assembledCount = 0;

      particles.current.forEach((p, i) => {
        if (isAssembling && textCoordinates.current.length > 0) {
          const target = textCoordinates.current[i % textCoordinates.current.length];
          const dx = target.x - p.x;
          const dy = target.y - p.y;
          
          p.vx += dx * p.ease;
          p.vy += dy * p.ease;
          p.vx *= p.friction;
          p.vy *= p.friction;
          
          p.x += p.vx;
          p.y += p.vy;

          if (Math.abs(dx) < 1 && Math.abs(dy) < 1) assembledCount++;
        } else {
          // Ambient movement
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      if (isAssembling && assembledCount > particles.current.length * 0.8) {
        onAssembled?.();
      }

      animationFrame.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, [isAssembling, onAssembled]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ filter: 'blur(0.5px) contrast(1.2)' }}
    />
  );
};
