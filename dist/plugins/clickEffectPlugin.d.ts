import type { CursorPlugin } from "../types";
interface ClickEffectOptions {
    size: number;
    duration: number;
    color?: string;
    opacity?: number;
    borderWidth?: number;
    maxEffects?: number;
}
export declare const createClickEffectPlugin: (options?: ClickEffectOptions) => CursorPlugin;
export {};
