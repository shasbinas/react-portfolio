"use client"

import { useRef } from "react"
import useFluidCursor from "../../hooks/useFluidCursor"

interface FluidCursorCanvasProps {
  className?: string
}

const FluidCursorCanvas = ({ className = "" }: FluidCursorCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useFluidCursor(canvasRef)

  return (
    <div className={`pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}

export default FluidCursorCanvas
