import { useCallback, useState, useMemo, useEffect } from 'react';
import { fabric } from 'fabric';
import {
  BuildEditorProps,
  CIRCLE_OPT,
  Editor,
  SOFT_RECT_OPT,
  RECT_OPT,
  TRIANGLE_OPT,
  DIAMOND_OPT,
  FILL_COLOR,
  STROKE_COLOR,
  STROKE_WIDTH,
  EditorHookProps,
  STROKE_DASH_ARRAY,
  OPACITY,
  TEXT_OPT,
  FONT_FAMILY,
} from '../types';

import { useAutoResize } from './use-auto-resize';
import { useCanvasEvents } from './use-canvas-events';
import { createFilter, isTextType } from '../utils';
import { useClipboard } from './use-clipboard';

const buildEditor = ({
  autoZoom,
  canvas,
  copy,
  paste,
  setFillColor,
  setStrokeColor,
  setStrokeWidth,
  setStrokeDashArray,
  setFontFamily,
  fontFamily,
  fillColor,
  strokeColor,
  strokeWidth,
  strokeDashArray,
  selectedObjects,
}: BuildEditorProps): Editor => {
  const getWorkspace = () => {
    return (
      canvas?.getObjects().find((object) => object.name === 'clip') || null
    );
  };

  const center = (object: fabric.Object) => {
    const workspace = getWorkspace();
    const center = workspace?.getCenterPoint();

    if (!center) return;

    // @ts-expect-error meri marzi bhai
    canvas?._centerObject(object, center);
  };

  const addToCanvas = (object: fabric.Object) => {
    center(object);
    canvas?.add(object);
    canvas?.setActiveObject(object);
  };

  return {
    getWorkspace,
    autoZoom,

    zoomIn: () => {
      if (canvas) {
        let zoomRatio = canvas?.getZoom();
        zoomRatio += 0.05;
        const center = canvas?.getCenter();
        canvas?.zoomToPoint(
          new fabric.Point(center.left, center.top),
          zoomRatio
        );
      }
    },
    zoomOut: () => {
      if (canvas) {
        let zoomRatio = canvas?.getZoom();
        zoomRatio -= 0.05;
        const center = canvas?.getCenter();
        canvas?.zoomToPoint(
          new fabric.Point(center.left, center.top),
          zoomRatio < 0.2 ? 0.2 : zoomRatio
        );
      }
    },

    changeSize: (size: { width: number; height: number }) => {
      const workspace = getWorkspace();
      workspace?.set(size);
      autoZoom();
      // TODO: Save
    },

    changeBackground: (value: string) => {
      const workspace = getWorkspace();
      workspace?.set({ fill: value });
      canvas?.renderAll();
      // TODO: Save
    },

    enableDrawingMode: () => {
      canvas?.discardActiveObject();
      canvas?.renderAll();
      if (canvas) {
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush.width = STROKE_WIDTH;
        canvas.freeDrawingBrush.color = STROKE_COLOR;
      }
    },

    disableDrawingMode: () => {
      if (canvas) {
        canvas.isDrawingMode = false;
      }
    },

    onCopy: () => copy(),
    onPaste: () => paste(),

    addImage: (url: string) => {
      fabric.Image.fromURL(
        url,
        (image) => {
          const workspace = getWorkspace();
          image.scaleToWidth(workspace?.width || 0);
          image.scaleToHeight(workspace?.height || 0);

          addToCanvas(image);
        },
        {
          crossOrigin: 'anonymous',
        }
      );
    },

    delete: () => {
      canvas?.getActiveObjects().forEach((object) => {
        canvas?.remove(object);
        canvas?.discardActiveObject();
        canvas?.renderAll();
      });
    },

    addText: (value, options) => {
      const object = new fabric.Textbox(value, {
        ...TEXT_OPT,
        fill: fillColor,
        ...options,
      });
      addToCanvas(object);
    },

    bringForward: () => {
      canvas?.getActiveObjects().forEach((object) => {
        canvas?.bringForward(object);
      });

      canvas?.renderAll();

      const workspace = getWorkspace();
      workspace?.sendToBack();
    },
    sendBackward: () => {
      canvas?.getActiveObjects().forEach((object) => {
        canvas?.sendBackwards(object);
      });

      const workspace = getWorkspace();
      workspace?.sendToBack();
      canvas?.renderAll();
    },

    changeOpacity: (value: number) => {
      canvas?.getActiveObjects().forEach((object) => {
        object.set({ opacity: value });
      });
      canvas?.renderAll();
    },
    changeFontWeight: (value: number) => {
      canvas?.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          // @ts-expect-error meri marzi bhai
          object.set({ fontWeight: value });
          return;
        }
      });
      canvas?.renderAll();
    },
    changeFillColor: (value: string) => {
      setFillColor(value);
      canvas?.getActiveObjects().forEach((object) => {
        object.set({ fill: value });
      });
      canvas?.renderAll();
    },
    changeStrokeColor: (value: string) => {
      setStrokeColor(value);
      canvas?.getActiveObjects().forEach((object) => {
        // text type objects have no stroke
        if (isTextType(object.type)) {
          object.set({ fill: value });
          return;
        }
        object.set({ stroke: value });
      });
      if (canvas) {
        canvas.freeDrawingBrush.color = value;
      }
      canvas?.renderAll();
    },
    changeStrokeWidth: (value: number) => {
      setStrokeWidth(value);
      canvas?.getActiveObjects().forEach((object) => {
        object.set({ strokeWidth: value });
      });
      if (canvas) {
        canvas.freeDrawingBrush.width = value;
      }
      canvas?.renderAll();
    },
    changeStrokeDashArray: (value: number[]) => {
      setStrokeDashArray(value);
      canvas?.getActiveObjects().forEach((object) => {
        object.set({ strokeDashArray: value });
      });
      canvas?.renderAll();
    },

    changeFontFamily: (value: string) => {
      setFontFamily(value);
      canvas?.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object._set('fontFamily', value);
          return;
        }
      });
      canvas?.renderAll();
    },
    changeFontStyle: (value: string) => {
      setFontFamily(value);
      canvas?.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object._set('fontStyle', value);
          return;
        }
      });
      canvas?.renderAll();
    },
    changeFontLineThrough: (value: boolean) => {
      canvas?.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object._set('linethrough', value);
          return;
        }
      });
      canvas?.renderAll();
    },
    changeFontUnderline: (value: boolean) => {
      canvas?.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object._set('underline', value);
          return;
        }
      });
      canvas?.renderAll();
    },
    changeTextAlign: (value: string) => {
      canvas?.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object._set('textAlign', value);
          return;
        }
      });
      canvas?.renderAll();
    },
    changeFontSize: (value: number) => {
      canvas?.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          // @ts-expect-error meri marzi bhai
          object.set({ fontSize: value });
        }
      });
      canvas?.renderAll();
    },

    changeFilter: (value: string) => {
      const objects = canvas?.getActiveObjects();
      objects?.forEach((object) => {
        if (object.type === 'image') {
          const imageObj = object as fabric.Image;

          const effect = createFilter(value);

          imageObj.filters = effect ? [effect] : [];
          imageObj.applyFilters();
          canvas?.renderAll();
        }
      });
    },

    addCircle: () => {
      const object = new fabric.Circle({
        ...CIRCLE_OPT,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      });
      addToCanvas(object);
    },
    addSoftRect: () => {
      const object = new fabric.Rect({
        ...SOFT_RECT_OPT,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        rx: 30,
        ry: 30,
      });
      addToCanvas(object);
    },
    addRect: () => {
      const object = new fabric.Rect({
        ...RECT_OPT,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      });
      addToCanvas(object);
    },
    addTriangle: () => {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPT,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      });
      addToCanvas(object);
    },
    addInverseTriangle: () => {
      const HEIGHT = 400;
      const WIDTH = 400;
      const object = new fabric.Polygon(
        [
          { x: 0, y: 0 },
          { x: WIDTH, y: 0 },
          { x: WIDTH / 2, y: HEIGHT },
        ],
        {
          ...TRIANGLE_OPT,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
        }
      );
      addToCanvas(object);
    },
    addDiamond: () => {
      const HEIGHT = DIAMOND_OPT.height;
      const WIDTH = DIAMOND_OPT.width;
      const object = new fabric.Polygon(
        [
          { x: WIDTH / 2, y: 0 },
          { x: WIDTH, y: HEIGHT / 2 },
          { x: WIDTH / 2, y: HEIGHT },
          { x: 0, y: HEIGHT / 2 },
        ],
        {
          ...DIAMOND_OPT,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
        }
      );
      addToCanvas(object);
    },
    canvas,
    getActiveFillColor: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return fillColor;

      const value = selectedObject.get('fill') || fillColor;

      // currently gradient and pattern is not supported
      return value;
    },
    getActiveStrokeColor: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return strokeColor;

      const value = selectedObject.get('stroke') || strokeColor;

      // currently gradient and pattern is not supported
      return value;
    },
    getActiveStrokeWidth: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return strokeWidth;

      const value = selectedObject.get('strokeWidth') || strokeWidth;

      return value;
    },
    getActiveStrokeDashArray: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return strokeDashArray;

      const value = selectedObject.get('strokeDashArray') || strokeDashArray;

      return value;
    },
    getActiveOpacity: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return OPACITY;

      const value = selectedObject.get('opacity') || OPACITY;

      return value;
    },
    getActiveFontFamily: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return fontFamily;

      // @ts-expect-error hota hai yrr
      const value = selectedObject.get('fontFamily') || fontFamily;

      return value;
    },
    getActiveFontWeight: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return 400;

      // @ts-expect-error hota hai yrr
      const value = selectedObject.get('fontWeight') || 400;

      return value;
    },
    getActiveFontStyle: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return 'normal';

      // @ts-expect-error hota hai yrr
      const value = selectedObject.get('fontStyle') || 'normal';

      return value;
    },
    getActiveFontLineThrough: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return false;

      // @ts-expect-error hota hai yrr
      const value = selectedObject.get('linethrough') || false;

      return value;
    },
    getActiveFontUnderline: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return false;

      // @ts-expect-error hota hai yrr
      const value = selectedObject.get('underline') || false;

      return value;
    },
    getActiveTextAlign: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return 'left';

      // @ts-expect-error hota hai yrr
      const value = selectedObject.get('textAlign') || 'left';

      return value;
    },
    getActiveFontSize: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return 60;
      }

      // @ts-expect-error hota hai yrr
      const value = selectedObject.get('fontSize') || 60;

      return value;
    },

    removeBg: async () => {
      const object = selectedObjects[0];
      if (!object) return;

      if (object.type === 'image') {
        // @ts-expect-error hota hai yrr
        const base64data = object.toDataURL('image/png');
        const data = base64data.replace(/^.*;base64,/, '');

        try {
          const response = await fetch(
            'http://localhost:3000/api/images/upload-to-imgg',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ imageBase64: data }),
            }
          );
          if (!response.ok) {
            throw new Error('Failed to upload image');
          }

          const result = await response.json();
          canvas?.remove(object);
          canvas?.renderAll();
          const url = result.data.data.url;

          const removeBgResponse = await fetch(
            'http://localhost:3000/api/images/remove-bg',
            {
              method: 'POST',
              headers: new Headers({
                'Content-Type': 'application/json',
              }),
              body: JSON.stringify({
                image: url,
              }),
            }
          );

          const responseData = await removeBgResponse.json();
          const bgRemovedUrl = responseData.data.result_url;

          fabric.Image.fromURL(
            bgRemovedUrl,
            (image) => {
              const workspace = getWorkspace();
              image.scaleToWidth(workspace?.width || 0);
              image.scaleToHeight(workspace?.height || 0);

              addToCanvas(image);
            },
            {
              crossOrigin: 'anonymous',
            }
          );
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }
    },

    selectedObjects,
  };
};

export const useEditor = ({ clearSelectionCallback }: EditorHookProps) => {
  const [canvas, setCanvas] = useState<null | fabric.Canvas>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);

  const [fontFamily, setFontFamily] = useState(FONT_FAMILY);

  const [fillColor, setFillColor] = useState(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);

  const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);
  const [strokeDashArray, setStrokeDashArray] =
    useState<number[]>(STROKE_DASH_ARRAY);

  const { copy, paste } = useClipboard({ canvas });

  const { autoZoom } = useAutoResize({
    canvas,
    container,
  });

  useCanvasEvents({
    canvas,
    container,
    setSelectedObjects,
    clearSelectionCallback,
  });

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        autoZoom,
        canvas,
        copy,
        paste,
        setFillColor,
        setStrokeColor,
        setStrokeWidth,
        setStrokeDashArray,
        setFontFamily,
        strokeDashArray,
        fillColor,
        strokeColor,
        strokeWidth,
        selectedObjects,
        fontFamily,
      });
    }
  }, [
    autoZoom,
    canvas,
    copy,
    paste,
    setFillColor,
    setStrokeColor,
    setStrokeWidth,
    setStrokeDashArray,
    setFontFamily,
    fontFamily,
    fillColor,
    strokeColor,
    strokeWidth,
    strokeDashArray,
    selectedObjects,
  ]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete') {
        editor?.delete();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [editor]);

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
        hoverCursor: 'default',
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
    },
    []
  );

  return { inti, editor };
};
