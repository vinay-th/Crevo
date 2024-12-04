'use client';
import React, { useEffect, useRef } from 'react';
import { useEditor } from '@/app/features/editor/hooks/use-editor';

const Editor = () => {
  const { inti } = useEditor();

  const canvasRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inti({
      initialCanvas: '',
      initialContainer: containerRef.current!,
    });
  }, [inti]);
  return (
    <div ref={containerRef}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Editor;
