import { useCallback, useState, useMemo } from 'react';
import { fabric } from 'fabric';
import { BuildEditorProps, CIRCLE_OPT, Editor } from '../types';

import { useAutoResize } from './use-auto-resize';

const buildEditor = ({ canvas }: BuildEditorProps): Editor => {
  const getWorkspace = () => {
    return (
      canvas?.getObjects().find((object) => object.name === 'clip') || null
    );
  };

  const center = (object: fabric.Object) => {
    const workspace = getWorkspace();
    const center = workspace?.getCenterPoint();

    canvas?._centerObject(object, center);
  };

  return {
    addCircle: () => {
      const object = new fabric.Circle({
        ...CIRCLE_OPT,
      });
      canvas?.add(object);
      center(object);
      canvas?.setActiveObject(object);
    },
  };
};

export const useEditor = () => {
  const [canvas, setCanvas] = useState<null | fabric.Canvas>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  useAutoResize({
    canvas,
    container,
  });

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({ canvas });
    }
  }, [canvas]);

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

  return { inti, editor };
};
