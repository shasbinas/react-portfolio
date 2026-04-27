"use client"

import { useEffect, useRef, useCallback } from "react"

interface FlowingPatternProps {
  backgroundColor?: string
  lineColor?: string
  particleColor?: string
  animationSpeed?: number
  className?: string
}

const FlowingDots = ({
  backgroundColor = "transparent",
  lineColor = "80, 80, 80",
  particleColor = "80, 80, 80",
  animationSpeed = 0.005,
  className = "fixed inset-0 z-[1]",
}: FlowingPatternProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const timeRef = useRef<number>(0)
  const animationFrameId = useRef<number | null>(null)
  const mouseRef = useRef({ x: 0, y: 0, isDown: false })
  const flowPointsRef = useRef<
    Array<{
      x: number
      y: number
      vx: number
      vy: number
      angle: number
      phase: number
      noiseOffset: number
      originalX: number
      originalY: number
    }>
  >([])

  const noise = (x: number, y: number, t: number): number => {
    const sin1 = Math.sin(x * 0.01 + t)
    const sin2 = Math.sin(y * 0.01 + t * 0.8)
    const sin3 = Math.sin((x + y) * 0.005 + t * 1.2)
    return (sin1 + sin2 + sin3) / 3
  }

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
  
    const dpr = window.devicePixelRatio || 1;
  
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;
  
    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
  
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;
  
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
  
    const gridSize = 24; // Increased grid size for better performance and look
    flowPointsRef.current = [];
  
    for (let x = gridSize / 2; x < displayWidth; x += gridSize) {
      for (let y = gridSize / 2; y < displayHeight; y += gridSize) {
        flowPointsRef.current.push({
          x,
          y,
          vx: 0,
          vy: 0,
          angle: Math.random() * Math.PI * 2,
          phase: Math.random() * Math.PI * 2,
          noiseOffset: Math.random() * 1000,
          originalX: x,
          originalY: y,
        });
      }
    }
  }, []);
  

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current.x = e.clientX
    mouseRef.current.y = e.clientY
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    timeRef.current += animationSpeed

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    flowPointsRef.current.forEach((point) => {
      const noiseValue = noise(point.x, point.y, timeRef.current)
      const angle = noiseValue * Math.PI * 4

      const dx = mouseRef.current.x - point.x
      const dy = mouseRef.current.y - point.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 150) {
        const pushFactor = (1 - dist / 150) * 0.5
        point.vx += (dx / dist) * pushFactor
        point.vy += (dy / dist) * pushFactor
      }

      point.vx += Math.cos(angle) * 0.1
      point.vy += Math.sin(angle) * 0.1

      point.vx *= 0.95
      point.vy *= 0.95

      const nextX = point.x + point.vx
      const nextY = point.y + point.vy

      const speed = Math.sqrt(point.vx * point.vx + point.vy * point.vy)
      const alpha = Math.min(0.5, speed * 5 + 0.1)

      ctx.beginPath()
      ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${particleColor}, ${alpha})`
      ctx.fill()

      point.x = nextX
      point.y = nextY

      const returnForce = 0.02
      point.vx += (point.originalX - point.x) * returnForce
      point.vy += (point.originalY - point.y) * returnForce
    })

    animationFrameId.current = requestAnimationFrame(animate)
  }, [particleColor, animationSpeed])

  useEffect(() => {
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current)
    }
  }, [animate, resizeCanvas, handleMouseMove])

  return (
    <div className={`pointer-events-none ${className}`} style={{ backgroundColor }}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}

export default FlowingDots
