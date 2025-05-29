// import type { CursorPlugin, CursorState, MousePosition } from "../types"

// interface MagneticOptions {
//   strength: number
//   distance: number
//   targets: string[]
//   maxSpeed?: number // Maximum speed for smoother movement
//   easeFactor?: number // Easing factor for smoother transitions
// }

// export const createMagneticPlugin = (
//   options: MagneticOptions = {
//     strength: 0.3,
//     distance: 100,
//     targets: [".magnetic"],
//     maxSpeed: 5, // Maximum pixels to move per frame
//     easeFactor: 0.2, // Easing factor (0-1)
//   },
// ): CursorPlugin => {
//   let activeElement: Element | null = null
//   let targetOffsetX = 0
//   let targetOffsetY = 0
//   let currentOffsetX = 0
//   let currentOffsetY = 0
//   let lastUpdateTime = 0
//   const updateInterval = 8 // Update more frequently for smoother magnetic effect

//   const findMagneticElements = () => {
//     return options.targets.flatMap((selector) => Array.from(document.querySelectorAll(selector)))
//   }

//   const calculateDistance = (x1: number, y1: number, x2: number, y2: number) => {
//     return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
//   }

//   const calculateMagneticEffect = (mousePosition: MousePosition) => {
//     const now = Date.now()

//     // Limit updates to improve performance
//     if (now - lastUpdateTime < updateInterval) {
//       return activeElement !== null
//     }

//     lastUpdateTime = now

//     const elements = findMagneticElements()
//     let foundMagneticElement = false

//     for (const element of elements) {
//       const rect = element.getBoundingClientRect()
//       const elementCenterX = rect.left + rect.width / 2
//       const elementCenterY = rect.top + rect.height / 2

//       const distance = calculateDistance(mousePosition.x, mousePosition.y, elementCenterX, elementCenterY)

//       if (distance < options.distance) {
//         activeElement = element
//         foundMagneticElement = true

//         // Calculate magnetic pull (stronger when closer)
//         const pull = ((options.distance - distance) / options.distance) * options.strength

//         // Calculate target offset direction
//         targetOffsetX = (elementCenterX - mousePosition.x) * pull
//         targetOffsetY = (elementCenterY - mousePosition.y) * pull

//         // Apply easing to make movement smoother
//         const dx = targetOffsetX - currentOffsetX
//         const dy = targetOffsetY - currentOffsetY

//         // Limit speed for smoother movement
//         const maxSpeed = options.maxSpeed || 5
//         const easeFactor = options.easeFactor || 0.2

//         currentOffsetX += Math.min(Math.max(dx * easeFactor, -maxSpeed), maxSpeed)
//         currentOffsetY += Math.min(Math.max(dy * easeFactor, -maxSpeed), maxSpeed)

//         break
//       }
//     }

//     // Reset if no element is in range
//     if (!foundMagneticElement && activeElement) {
//       activeElement = null
//       targetOffsetX = 0
//       targetOffsetY = 0

//       // Smoothly return to zero
//       currentOffsetX *= 0.8
//       currentOffsetY *= 0.8

//       // If very close to zero, just set to zero
//       if (Math.abs(currentOffsetX) < 0.1) currentOffsetX = 0
//       if (Math.abs(currentOffsetY) < 0.1) currentOffsetY = 0
//     }

//     return foundMagneticElement
//   }

//   return {
//     name: "magnetic",
//     init: (opts?: Partial<MagneticOptions>) => {
//       options = { ...options, ...opts }
//     },
//     update: (cursorState: CursorState, mousePosition: MousePosition) => {
//       calculateMagneticEffect(mousePosition)

//       return {
//         active: !!activeElement,
//         offsetX: currentOffsetX,
//         offsetY: currentOffsetY,
//         element: activeElement,
//       }
//     },
//     cleanup: () => {
//       activeElement = null
//       targetOffsetX = 0
//       targetOffsetY = 0
//       currentOffsetX = 0
//       currentOffsetY = 0
//     },
//   }
// }
