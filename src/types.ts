import type { ReactNode } from "react"

export interface CursorVariant {
  // Size and shape properties
  width?: number
  height?: number
  scale?: number
  shape?: "circle" | "square" | "custom"
  borderRadius?: number

  // Appearance properties
  color?: string
  opacity?: number
  borderColor?: string
  borderWidth?: number
  borderStyle?: string
  mixBlendMode?:
    | "normal"
    | "multiply"
    | "screen"
    | "overlay"
    | "darken"
    | "lighten"
    | "color-dodge"
    | "color-burn"
    | "hard-light"
    | "soft-light"
    | "difference"
    | "exclusion"
    | "hue"
    | "saturation"
    | "color"
    | "luminosity"

  // Label properties
  label?: string | ReactNode
  fontSize?: string | number
  fontWeight?: string | number
  labelColor?: string

  // Custom elements
  customElement?: ReactNode
  innerElements?: Array<{
    element: ReactNode
    transition?: {
      stiffness?: number
      damping?: number
      mass?: number
      delay?: number
    }
  }>

  // Animation properties
  transition?: {
    stiffness?: number
    damping?: number
    mass?: number
    delay?: number
  }
}

export interface CursorConfig {
  default: CursorVariant
  [key: string]: CursorVariant
}

export interface CursorState extends CursorVariant {
  variant: string
}

export interface CursorContextType {
  cursorState: CursorState
  setCursorVariant: (variant: string, mode?: "push" | "pop" | "reset") => void
  config: CursorConfig
  resetCursorToDefault: () => void
  mousePosition: MousePosition,
  setGlobalCursorVariant?: (variant: string) => void;
  clearGlobalCursorVariant?: () => void;
}

export interface MousePosition {
  x: number
  y: number
}
