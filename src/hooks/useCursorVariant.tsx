import { useCallback } from 'react';
import { useCursorContext } from '../components/CursorProvider';

export const useCursorVariant = () => {
  const { setCursorVariant, resetCursorToDefault, setGlobalCursorVariant, clearGlobalCursorVariant } = useCursorContext();

  const setVariant = useCallback((variant: string) => {
    setCursorVariant(variant, 'push');
  }, [setCursorVariant]);

  const resetVariant = useCallback(() => {
    resetCursorToDefault();
  }, [resetCursorToDefault]);
  
  const setGlobalVariant = useCallback((variant: string) => {
    setGlobalCursorVariant?.(variant);
  }, [setGlobalCursorVariant]);

  const clearGlobalVariant = useCallback(() => {
    clearGlobalCursorVariant?.();
  }, [clearGlobalCursorVariant]);

  return {
    setVariant,
    resetVariant,
    setGlobalVariant,
    clearGlobalVariant,
  };
};