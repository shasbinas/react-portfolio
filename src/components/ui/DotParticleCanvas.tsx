"use client"

import { useEffect, useRef, useCallback } from "react"

interface DotParticleCanvasProps {
  backgroundColor?: string
  particleColor?: string
  animationSpeed?: number
}

// ✅ Fixed: Extracted Particle interface to fix TypeScript errors
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  angle: number
  speed: number
  color: string
}

const DotParticleCanvas = ({
  backgroundColor = "transparent",
  particleColor = "139, 92, 246",
}: DotParticleCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestIdRef = useRef<number | null>(null)
  const timeRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0, isDown: false })
  const particles = useRef<Particle[]>([]) // ✅ Fixed: proper type

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1
    const displayWidth = window.innerWidth
    const displayHeight = window.innerHeight

    canvas.width = displayWidth * dpr
    canvas.height = displayHeight * dpr
    canvas.style.width = displayWidth + "px"
    canvas.style.height = displayHeight + "px"

    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.scale(dpr, dpr)
    }
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    mouseRef.current.x = e.clientX - rect.left
    mouseRef.current.y = e.clientY - rect.top
  }, [])

  const handleMouseDown = useCallback((e: MouseEvent) => {
    mouseRef.current.isDown = true
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const numParticles = 30 + Math.random() * 20
    // ✅ Fixed: Fire theme colors + properly typed as string[]
    const colors: string[] = [
      "255, 215, 0",  // Gold
      "255, 140, 0",  // Orange
      "220, 38, 38",  // Red
    ]

    for (let i = 0; i < numParticles; i++) {
      const angle = (Math.PI * 2 * i) / numParticles + (Math.random() - 0.5) * 0.5
      const speed = 2 + Math.random() * 5
      const size = 1 + Math.random() * 2.5
      const color = colors[Math.floor(Math.random() * colors.length)]

      particles.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 1000 + Math.random() * 1500,
        size,
        angle,
        speed,
        color,
      })
    }
  }, [])

  const handleMouseUp = useCallback(() => {
    mouseRef.current.isDown = false
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    timeRef.current += 0.01

    const width = canvas.clientWidth
    const height = canvas.clientHeight

    ctx.clearRect(0, 0, width, height)

    particles.current = particles.current.filter((particle: Particle) => {
      particle.life += 16
      particle.x += particle.vx
      particle.y += particle.vy

      particle.vy += 0.05
      particle.vx *= 0.98
      particle.vy *= 0.98

      const organicX = Math.sin(timeRef.current + particle.angle) * 0.2
      particle.x += organicX

      const lifeProgress = particle.life / particle.maxLife
      const alpha = Math.max(0, (1 - lifeProgress) * 0.6)
      const currentSize = particle.size * (1 - lifeProgress * 0.5)

      if (alpha > 0) {
        ctx.fillStyle = `rgba(${particle.color}, ${alpha})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, currentSize, 0, 2 * Math.PI)
        ctx.fill()
      }

      return (
        particle.life < particle.maxLife &&
        particle.x > -50 &&
        particle.x < width + 50 &&
        particle.y > -50 &&
        particle.y < height + 50
      )
    })

    requestIdRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      if (requestIdRef.current) cancelAnimationFrame(requestIdRef.current)
    }
  }, [animate, resizeCanvas, handleMouseMove, handleMouseDown, handleMouseUp])

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-[100]"
      style={{ backgroundColor }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}

export default DotParticleCanvas