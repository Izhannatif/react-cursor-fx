import type React from "react";
import type { ReactNode } from "react";
interface CursorTargetProps {
    children: ReactNode;
    variant: string;
    onEnter?: () => void;
    onLeave?: () => void;
}
export declare const CursorTarget: React.FC<CursorTargetProps>;
export {};
