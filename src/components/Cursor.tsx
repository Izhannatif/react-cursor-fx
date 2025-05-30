import type React from "react"
import { useEffect, useState, useRef } from "react"
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion"
import { useCursorContext } from "./CursorProvider"
import type { MousePosition } from "../types"

interface CursorProps {
  size?: number
  zIndex?: number
  showOnTouch?: boolean
  trailLength?: number
}

export const Cursor: React.FC<CursorProps> = ({ size = 24, zIndex = 9999, showOnTouch = false, trailLength = 10 }) => {
  const { cursorState, mousePosition } = useCursorContext()
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  // Store position history for trailing effect
  const positionHistoryRef = useRef<MousePosition[]>([])

  // Use motion values for better performance
  const x = useMotionValue(mousePosition.x)
  const y = useMotionValue(mousePosition.y)

  // Spring configuration
  const springConfig = {
    damping: cursorState.transition?.damping || 30,
    stiffness: cursorState.transition?.stiffness || 300,
    mass: cursorState.transition?.mass || 1,
  }

  // Create springs for smooth movement
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  // Update position when mouse moves and store history
  useEffect(() => {
    // Add current position to history
    positionHistoryRef.current = [mousePosition, ...positionHistoryRef.current.slice(0, trailLength - 1)]

    x.set(mousePosition.x)
    y.set(mousePosition.y)
  }, [mousePosition, x, y, trailLength])

  // Check if it's a touch device and handle visibility
  useEffect(() => {
    const checkTouch = () => {
      const isTouchCapable =
        "ontouchstart" in window || navigator.maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0

      setIsTouchDevice(isTouchCapable)
    }

    checkTouch()

    // Show cursor after a short delay to prevent flash on page load
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 50)

    return () => clearTimeout(timer)
  }, [])

  // Don't render cursor on touch devices unless explicitly enabled
  if (isTouchDevice && !showOnTouch) {
    return null
  }

  // Calculate scale based on cursor state
  const getScale = () => {
    return cursorState.scale !== undefined ? cursorState.scale : 1
  }

  return (
    <motion.div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        x: springX,
        y: springY,
        zIndex,
        pointerEvents: "none",
        opacity: isVisible ? 1 : 0,
        willChange: "transform",
        mixBlendMode: cursorState.mixBlendMode || "normal",
      }}
    >
      <motion.div
        style={{
          borderStyle: cursorState.borderStyle || "solid",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: "translate(-50%, -50%)",
          willChange: "transform, width, height, background-color",
        }}
        animate={{
          width: cursorState.width || size,
          height: cursorState.height || size,
          borderRadius:
            cursorState.shape === "circle" ? "50%" : cursorState.shape === "square" ? cursorState.borderRadius || 0 : 0,
          backgroundColor:
            cursorState.shape === "custom" ? "rgba(0, 0, 0, 0)" : cursorState.color || "rgba(255, 255, 255, 0.8)",
          opacity: cursorState.opacity || 1,
          borderColor: cursorState.borderColor || "rgba(0, 0, 0, 0)",
          borderWidth: cursorState.borderWidth || 0,
          scale: getScale(),
        }}
        transition={{
          type: "spring",
          ...springConfig,
        }}
      >
        {/* Custom element if shape is custom */}
        {cursorState.shape === "custom" && cursorState.customElement}

        {/* Label with customizable font properties */}
        <AnimatePresence mode="wait">
          {cursorState.label && (
            <motion.div
              key={typeof cursorState.label === "string" ? cursorState.label : "label"}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              style={{
                fontSize: cursorState.fontSize || "12px",
                fontWeight: cursorState.fontWeight || "bold",
                color: cursorState.labelColor || "#000",
                textAlign: "center",
                userSelect: "none",
                whiteSpace: "nowrap",
              }}
            >
              {cursorState.label}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Inner elements with their own animation properties */}
        {cursorState.innerElements?.map((item, index) => {
          const innerTransition = item.transition || {
            stiffness: 100,
            damping: 15,
            mass: 3,
          }

          // Get a delayed position from history for trailing effect
          const delayedPosition =
            positionHistoryRef.current[Math.min(index + 1, positionHistoryRef.current.length - 1)] || mousePosition

          // Calculate offset from current position for trailing effect
          const offsetX = delayedPosition ? mousePosition.x - delayedPosition.x : 0
          const offsetY = delayedPosition ? mousePosition.y - delayedPosition.y : 0

          return (
            <motion.div
              key={`inner-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: -offsetX * 0.5,
                y: -offsetY * 0.5,
              }}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
              transition={{
                type: "spring",
                damping: innerTransition.damping || 15,
                stiffness: innerTransition.stiffness || 100,
                mass: innerTransition.mass || 3,
              }}
            >
              {item.element}
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}
