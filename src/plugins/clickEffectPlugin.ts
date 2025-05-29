// import type { CursorPlugin, CursorState, MousePosition } from "../types"

// interface ClickEffectOptions {
//   size: number
//   duration: number
//   color?: string
//   opacity?: number
//   borderWidth?: number
//   maxEffects?: number // Limit concurrent effects
// }

// export const createClickEffectPlugin = (
//   options: ClickEffectOptions = {
//     size: 30,
//     duration: 0.5,
//     opacity: 0.7,
//     borderWidth: 2,
//     maxEffects: 3, // Limit to 3 concurrent effects
//   },
// ): CursorPlugin => {
//   let clickEffects: Array<{
//     position: MousePosition
//     timestamp: number
//     id: number
//   }> = []
//   let nextId = 0
//   let lastClickTime = 0
//   const clickCooldown = 50 // Reduced cooldown for more responsive clicks

//   const handleClick = (e: MouseEvent) => {
//     const now = Date.now()

//     // Prevent rapid-fire click effects
//     if (now - lastClickTime < clickCooldown) {
//       return
//     }

//     lastClickTime = now

//     // Add new click effect
//     const newEffect = {
//       position: { x: e.clientX, y: e.clientY },
//       timestamp: now,
//       id: nextId++,
//     }

//     // Add to effects array, limiting to maxEffects
//     clickEffects = [newEffect, ...clickEffects.slice(0, (options.maxEffects || 3) - 1)]
//   }

//   return {
//     name: "clickEffect",
//     init: (opts?: Partial<ClickEffectOptions>) => {
//       options = { ...options, ...opts }
//       window.addEventListener("click", handleClick)
//     },
//     update: (cursorState: CursorState, mousePosition: MousePosition) => {
//       const now = Date.now()

//       // Filter out expired effects
//       clickEffects = clickEffects.filter((effect) => now - effect.timestamp < options.duration * 1000)

//       return {
//         effects: clickEffects.map((effect) => ({
//           id: effect.id,
//           x: effect.position.x,
//           y: effect.position.y,
//           progress: Math.min((now - effect.timestamp) / (options.duration * 1000), 1),
//           size: options.size,
//           color: options.color || cursorState.color,
//           opacity: options.opacity,
//           borderWidth: options.borderWidth,
//         })),
//       }
//     },
//     cleanup: () => {
//       window.removeEventListener("click", handleClick)
//       clickEffects = []
//     },
//   }
// }
