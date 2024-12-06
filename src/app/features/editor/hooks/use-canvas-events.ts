import { fabric } from 'fabric';
import { useEffect } from 'react';
interface useCanvasEventsProps {
  canvas: fabric.Canvas | null;
  container: HTMLDivElement | null;
  setSelectedObjects: (object: fabric.Object[]) => void;
}

export const useCanvasEvents = ({
  canvas,
  container,
  setSelectedObjects,
}: useCanvasEventsProps) => {
  useEffect(() => {
    if (canvas) {
      canvas.on('selection:created', (e) => {
        console.log('created', e);
        setSelectedObjects(e.selected || []);
      });
      canvas.on('selection:updated', (e) => {
        console.log('updated', e);
        setSelectedObjects(e.selected || []);
      });
      canvas.on('selection:cleared', () => {
        console.log('cleared');
        setSelectedObjects([]);
      });
    }
    return () => {
      if (canvas) {
        canvas.off('selection:created');
        canvas.off('selection:updated');
        canvas.off('selection:cleared');
      }
    };
  }, [canvas, setSelectedObjects]);
};
