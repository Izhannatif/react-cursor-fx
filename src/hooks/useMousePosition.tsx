"use client"

import { useState, useEffect, useRef } from "react"
import type { MousePosition } from "../types"

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isClient, setIsClient] = useState(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    setIsClient(true)

    const updateMousePosition = (e: MouseEvent) => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          setMousePosition({ x: e.clientX -15, y: e.clientY -15 })
          rafRef.current = null
        })
      }
    }

    window.addEventListener("mousemove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return isClient ? mousePosition : { x: 0, y: 0 }
}
