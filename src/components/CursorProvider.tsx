import type React from "react"
import { createContext, useState, useContext, useEffect, useRef, type ReactNode } from "react"
import type { CursorContextType, CursorConfig, CursorState } from "../types"
import { useMousePosition } from "../hooks/useMousePosition"

export const defaultCursorConfig: CursorConfig = {
  default: {
    width: 24,
    height: 24,
    scale: 1,
    shape: "circle",
    color: "rgba(255, 255, 255, 0.8)",
    opacity: 1,
    borderColor: "rgba(0, 0, 0, 0)",
    borderWidth: 0,
    borderStyle: "solid",
    label: "",
    fontSize: "12px",
    fontWeight: "bold",
    labelColor: "#000",
    transition: {
      stiffness: 300,
      damping: 30,
      mass: 1,
    },
  },
}

const CursorContext = createContext<CursorContextType>({
  cursorState: { ...defaultCursorConfig.default, variant: "default" },
  setCursorVariant: () => {},
  config: defaultCursorConfig,
  mousePosition: { x: 0, y: 0 },
  resetCursorToDefault: () => {},
})

export const useCursorContext = () => useContext(CursorContext)

interface CursorProviderProps {
  children: ReactNode
  config?: CursorConfig
  hideNativeCursor?: boolean
}

export const CursorProvider: React.FC<CursorProviderProps> = ({
  children,
  config = defaultCursorConfig,
  hideNativeCursor = true,
}) => {
  const mousePosition = useMousePosition()
  const [variantStack, setVariantStack] = useState<string[]>(["default"])
  const lastMouseMoveRef = useRef<number>(Date.now())
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const pushVariant = (variant: string) => {
    setVariantStack((prev) => [...prev, variant])
  }

  const popVariant = () => {
    setVariantStack((prev) => {
      const newStack = [...prev]
      newStack.pop()
      return newStack.length ? newStack : ["default"]
    })
  }

  const resetCursorToDefault = () => {
    setVariantStack(["default"])
  }

  const setCursorVariant = (variant: string, mode: "push" | "pop" | "reset" = "push") => {
    // Clear any pending reset
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current)
      resetTimeoutRef.current = null
    }

    if (mode === "reset") {
      setVariantStack(["default"])
    } else if (mode === "push") {
      pushVariant(variant)
    } else {
      popVariant()
    }
  }

  // Global mouse movement detection for fallback reset
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      lastMouseMoveRef.current = Date.now()

      // Clear any existing reset timeout
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current)
        resetTimeoutRef.current = null
      }

      // Check if mouse is over any cursor target
      const elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY)
      const isOverTarget =
        elementUnderMouse &&
        (elementUnderMouse.hasAttribute("data-cursor-target") || elementUnderMouse.closest("[data-cursor-target]"))

      // If not over any target and not on default variant, set a reset timeout
      if (!isOverTarget && variantStack[variantStack.length - 1] !== "default") {
        resetTimeoutRef.current = setTimeout(() => {
          // Double-check that we're still not over a target
          const currentElement = document.elementFromPoint(e.clientX, e.clientY)
          const stillNotOverTarget =
            !currentElement ||
            (!currentElement.hasAttribute("data-cursor-target") && !currentElement.closest("[data-cursor-target]"))

          if (stillNotOverTarget) {
            resetCursorToDefault()
          }
        }, 0) // 150ms delay to allow for quick movements
      }
    }

    document.addEventListener("mousemove", handleGlobalMouseMove, { passive: true })

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove)
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current)
      }
    }
  }, [variantStack])

  const topVariant = variantStack[variantStack.length - 1]
  const currentConfig = config[topVariant] ?? config.default
  const cursorState: CursorState = {
    ...currentConfig,
    variant: topVariant,
  }

  // Hide native cursor
  useEffect(() => {
    if (hideNativeCursor) {
      const style = document.createElement("style")
      style.textContent = `
        body, a, button, [role="button"], * {
          cursor: none !important;
        }
      `
      document.head.appendChild(style)
      return () => {
        document.head.removeChild(style)
      }
    }
  }, [hideNativeCursor])

  return (
    <CursorContext.Provider
      value={{
        cursorState,
        setCursorVariant,
        resetCursorToDefault,
        config,
        mousePosition,
      }}
    >
      {children}
    </CursorContext.Provider>
  )
}