'use client';
import React, { useEffect, useRef } from 'react';
import { useEditor } from '@/app/features/editor/hooks/use-editor';
import { fabric } from 'fabric';

const Editor = () => {
  const { inti } = useEditor();

  const canvasRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current!, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    inti({
      initialCanvas: canvas,
      initialContainer: containerRef.current!,
    });
  }, [inti]);
  return (
    <div className="h-full flex flex-col">
      <div className="h-full flex-1 bg-muted" ref={containerRef}>
        <canvas className="my-canvas" ref={canvasRef} />
      </div>
    </div>
  );
};

export default Editor;
