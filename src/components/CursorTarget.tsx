"use client"

import type React from "react"
import type { ReactNode } from "react"
import { useCursor } from "../hooks/useCursor"

interface CursorTargetProps {
  children: ReactNode
  variant: string
  onEnter?: () => void
  onLeave?: () => void
}

export const CursorTarget: React.FC<CursorTargetProps> = ({ children, variant, onEnter, onLeave }) => {
  const cursorHandlers = useCursor({
    variant,
    onEnter,
    onLeave,
  })

  return (
    <div {...cursorHandlers} data-cursor-variant={variant} data-cursor-target>
      {children}
    </div>
  )
}
