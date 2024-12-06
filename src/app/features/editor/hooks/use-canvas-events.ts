import { fabric } from 'fabric';
import { useEffect } from 'react';
interface useCanvasEventsProps {
  canvas: fabric.Canvas | null;
  container: HTMLDivElement | null;
  clearSelectionCallback?: () => void;
  setSelectedObjects: (object: fabric.Object[]) => void;
}

export const useCanvasEvents = ({
  canvas,
  container,
  setSelectedObjects,
  clearSelectionCallback,
}: useCanvasEventsProps) => {
  useEffect(() => {
    if (canvas) {
      canvas.on('selection:created', (e) => {
        setSelectedObjects(e.selected || []);
      });
      canvas.on('selection:updated', (e) => {
        setSelectedObjects(e.selected || []);
      });
      canvas.on('selection:cleared', () => {
        setSelectedObjects([]);
        clearSelectionCallback?.();
      });
    }
    return () => {
      if (canvas) {
        canvas.off('selection:created');
        canvas.off('selection:updated');
        canvas.off('selection:cleared');
      }
    };
  }, [canvas, setSelectedObjects, clearSelectionCallback]);
};
