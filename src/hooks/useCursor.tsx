import type React from "react"
import { useEffect, useRef } from "react"
import { useCursorContext } from "../components/CursorProvider"

interface UseCursorOptions {
  variant: string
  onEnter?: () => void
  onLeave?: () => void
}

export const useCursor = ({ variant, onEnter, onLeave }: UseCursorOptions) => {
  const { setCursorVariant, resetCursorToDefault } = useCursorContext()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isHoveringRef = useRef(false)

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleMouseEnter = () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    isHoveringRef.current = true
    setCursorVariant(variant, "push")
    onEnter?.()
  }

  const handleMouseLeave = (e: React.MouseEvent) => {
    isHoveringRef.current = false
    const relatedTarget = e.relatedTarget as HTMLElement | null

    // Improved check for cursor targets
    const isMovingToAnotherTarget =
      relatedTarget &&
      (relatedTarget.hasAttribute?.("data-cursor-target") || relatedTarget.closest?.("[data-cursor-target]"))

    if (!isMovingToAnotherTarget) {
      setCursorVariant("", "pop")
    }

    // Set a fallback timeout to ensure cursor resets
    timeoutRef.current = setTimeout(() => {
      if (!isHoveringRef.current) {
        resetCursorToDefault()
      }
    }, 0) // 100ms fallback

    onLeave?.()
  }

  const handleFocus = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    isHoveringRef.current = true
    setCursorVariant(variant, "push")
    onEnter?.()
  }

  const handleBlur = () => {
    isHoveringRef.current = false
    setCursorVariant("", "pop")

    // Set fallback timeout
    timeoutRef.current = setTimeout(() => {
      if (!isHoveringRef.current) {
        resetCursorToDefault()
      }
    }, 0)

    onLeave?.()
  }

  return {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleFocus,
    onBlur: handleBlur,
    "data-cursor-target": true,
  }
}
