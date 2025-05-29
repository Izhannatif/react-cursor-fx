import type { CursorPlugin } from "../types";
interface TrailOptions {
    points: number;
    decay: number;
    color?: string;
    width?: number;
    height?: number;
    opacity?: number;
    shape?: "circle" | "square";
    borderRadius?: number;
    disabledVariants?: string[];
    updateInterval?: number;
}
export declare const createTrailPlugin: (options?: TrailOptions) => CursorPlugin;
export {};
