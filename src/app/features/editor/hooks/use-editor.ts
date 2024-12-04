import { useCallback } from 'react';
import { fabric } from 'fabric';

export const useEditor = () => {
  const inti = useCallback(
    ({
      initialCanvas,
      initialContainer,
    }: {
      initialCanvas: fabric.Canvas;
      initialContainer: HTMLDivElement;
    }) => {
      initialCanvas.setWidth(initialContainer.offsetWidth);
      initialCanvas.setHeight(initialContainer.offsetHeight);
    },
    []
  );

  return { inti };
};
