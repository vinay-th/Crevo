import { useCallback, useState } from 'react';
import { fabric } from 'fabric';

import { useAutoResize } from './use-auto-resize';

export const useEditor = () => {
  const [canvas, setCanvas] = useState<null | fabric.Canvas>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  useAutoResize({
    canvas,
    container,
  });

  const inti = useCallback(
    ({
      initialCanvas,
      initialContainer,
    }: {
      initialCanvas: fabric.Canvas;
      initialContainer: HTMLDivElement;
    }) => {
      fabric.Object.prototype.set({
        cornerColor: '#fff',
        cornerStyle: 'circle',
        borderColor: '#3b82f6',
        borderScaleFactor: 1.5,
        transparentCorners: false,
        borderOpacityWhenMoving: 1,
        cornerStrokeColor: '#3b82f6',
      });

      const initialWorkspace = new fabric.Rect({
        width: 900,
        height: 1200,
        name: 'clip',
        hasControls: false,
        selectable: false,
        fill: 'white',
        shadow: new fabric.Shadow({
          color: 'rgba(0, 0, 0, 0.8)',
          blur: 5,
        }),
      });

      initialCanvas.setWidth(initialContainer.offsetWidth);
      initialCanvas.setHeight(initialContainer.offsetHeight);

      initialCanvas.add(initialWorkspace);
      initialCanvas.centerObject(initialWorkspace);
      initialCanvas.clipPath = initialWorkspace;

      setCanvas(initialCanvas);
      setContainer(initialContainer);

      const test = new fabric.Rect({
        width: 100,
        height: 100,
        name: 'test',
        fill: 'salmon',
        shadow: new fabric.Shadow({
          color: 'rgba(0, 0, 0, 0.8)',
          blur: 5,
        }),
      });

      initialCanvas.add(test);
      initialCanvas.centerObject(test);
    },
    []
  );

  return { inti };
};
