import type React from "react";
import { type ReactNode } from "react";
import type { CursorContextType, CursorConfig } from "../types";
export declare const defaultCursorConfig: CursorConfig;
export declare const useCursorContext: () => CursorContextType;
interface CursorProviderProps {
    children: ReactNode;
    config?: CursorConfig;
    hideNativeCursor?: boolean;
}
export declare const CursorProvider: React.FC<CursorProviderProps>;
export {};
