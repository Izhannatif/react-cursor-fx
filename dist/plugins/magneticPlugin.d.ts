import type { CursorPlugin } from "../types";
interface MagneticOptions {
    strength: number;
    distance: number;
    targets: string[];
    maxSpeed?: number;
    easeFactor?: number;
}
export declare const createMagneticPlugin: (options?: MagneticOptions) => CursorPlugin;
export {};
