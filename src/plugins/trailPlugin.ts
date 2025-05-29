// import type { CursorPlugin, CursorState, MousePosition } from "../types"

// interface TrailOptions {
//   points: number
//   decay: number
//   // Added customization options
//   color?: string
//   width?: number
//   height?: number
//   opacity?: number
//   shape?: "circle" | "square"
//   borderRadius?: number
//   disabledVariants?: string[] // Variants where trail should be disabled
//   updateInterval?: number // Control update frequency
// }

// export const createTrailPlugin = (
//   options: TrailOptions = {
//     points: 5,
//     decay: 0.1,
//     // Default values for new options
//     color: undefined, // Will use cursor color by default
//     width: undefined, // Will use cursor width by default
//     height: undefined, // Will use cursor height by default
//     opacity: 0.7,
//     shape: "circle",
//     borderRadius: 0,
//     disabledVariants: ["link", "button", "video"], // Disable trail for these variants by default
//     updateInterval: 16, // Update at 60fps by default
//   },
// ): CursorPlugin => {
//   let trail: MousePosition[] = []
//   let lastUpdateTime = 0
//   const updateInterval = options.updateInterval || 16 // Default to 60fps
//   let isActive = true
//   let skipCounter = 0

//   return {
//     name: "trail",
//     init: (opts?: Partial<TrailOptions>) => {
//       options = { ...options, ...opts }
//       trail = Array(options.points).fill({ x: 0, y: 0 })
//     },
//     update: (cursorState: CursorState, mousePosition: MousePosition) => {
//       const now = Date.now()

//       // Check if trail should be disabled for current variant
//       const isDisabled = options.disabledVariants?.includes(cursorState.variant) || false

//       // If disabled for this variant, return empty trail and mark as inactive
//       if (isDisabled) {
//         if (isActive) {
//           isActive = false
//           trail = Array(options.points).fill({ x: 0, y: 0 })
//         }

//         return {
//           points: [],
//           decay: options.decay,
//           color: options.color,
//           width: options.width,
//           height: options.height,
//           opacity: options.opacity,
//           shape: options.shape,
//           borderRadius: options.borderRadius,
//           disabledVariants: options.disabledVariants,
//         }
//       }

//       // Mark as active if it was previously inactive
//       if (!isActive) {
//         isActive = true
//       }

//       // Limit updates to improve performance
//       if (now - lastUpdateTime < updateInterval) {
//         return {
//           points: trail,
//           decay: options.decay,
//           color: options.color,
//           width: options.width,
//           height: options.height,
//           opacity: options.opacity,
//           shape: options.shape,
//           borderRadius: options.borderRadius,
//           disabledVariants: options.disabledVariants,
//         }
//       }

//       lastUpdateTime = now

//       // Skip some updates for better performance
//       skipCounter++
//       if (skipCounter % 2 !== 0) {
//         return {
//           points: trail,
//           decay: options.decay,
//           color: options.color,
//           width: options.width,
//           height: options.height,
//           opacity: options.opacity,
//           shape: options.shape,
//           borderRadius: options.borderRadius,
//           disabledVariants: options.disabledVariants,
//         }
//       }

//       // Only add new position if it's different from the last one
//       const lastPoint = trail[0]
//       if (!lastPoint || Math.abs(lastPoint.x - mousePosition.x) > 1 || Math.abs(lastPoint.y - mousePosition.y) > 1) {
//         // Add current position to the beginning of the trail
//         trail = [mousePosition, ...trail.slice(0, options.points - 1)]
//       }

//       return {
//         points: trail,
//         decay: options.decay,
//         color: options.color,
//         width: options.width,
//         height: options.height,
//         opacity: options.opacity,
//         shape: options.shape,
//         borderRadius: options.borderRadius,
//         disabledVariants: options.disabledVariants,
//       }
//     },
//     cleanup: () => {
//       trail = []
//     },
//   }
// }
