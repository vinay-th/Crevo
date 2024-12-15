import { fabric } from 'fabric';
import { useEffect } from 'react';
interface useCanvasEventsProps {
  save: () => void;
  canvas: fabric.Canvas | null;
  container: HTMLDivElement | null;
  clearSelectionCallback?: () => void;
  setSelectedObjects: (object: fabric.Object[]) => void;
}

export const useCanvasEvents = ({
  save,
  canvas,
  container,
  setSelectedObjects,
  clearSelectionCallback,
}: useCanvasEventsProps) => {
  useEffect(() => {
    if (canvas) {
      canvas.on('object:added', (e) => {
        save();
      });
      canvas.on('object:removed', (e) => {
        save();
      });
      canvas.on('object:modified', (e) => {
        save();
      });
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
  }, [save, canvas, setSelectedObjects, clearSelectionCallback]);
};
