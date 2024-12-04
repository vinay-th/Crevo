'use client';
import React, { useEffect, useRef } from 'react';
import { useEditor } from '@/app/features/editor/hooks/use-editor';
import { fabric } from 'fabric';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import Footer from './Footer';

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
      <Navbar />
      <div className="absolute h-[calc(100vh-68px)] w-full top-[64px] flex">
        <Sidebar />
        <main className="bg-muted flex-1 overflow-auto relative flex flex-col">
          <Toolbar />
          <div
            className="h-[calc(100%-124px)] flex-1 bg-muted"
            ref={containerRef}
          >
            <canvas className="my-canvas" ref={canvasRef} />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Editor;
