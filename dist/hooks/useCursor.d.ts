import type React from "react";
interface UseCursorOptions {
    variant: string;
    onEnter?: () => void;
    onLeave?: () => void;
}
export declare const useCursor: ({ variant, onEnter, onLeave }: UseCursorOptions) => {
    onMouseEnter: () => void;
    onMouseLeave: (e: React.MouseEvent) => void;
    onFocus: () => void;
    onBlur: () => void;
    "data-cursor-target": boolean;
};
export {};
