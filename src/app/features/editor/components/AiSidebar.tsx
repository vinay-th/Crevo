import React, { useState } from 'react';
import { ActiveTool, Editor } from '../types';
import { cn } from '@/lib/utils';
import { ToolbarSidebarHeader } from './ToolbarSidebarHeader';
import { ToolSidebarClose } from '@/components/crevo/ToolsidebarClose';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles, Plus } from 'lucide-react';
import { fabric } from 'fabric';

interface AiSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const AiSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: AiSidebarProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [text, setText] = useState<string>('');

  const onClose = () => {
    onChangeActiveTool('select');
  };

  const handleClick = () => {
    setImageSrc(
      `https://crevo.vinaythakor-5025.workers.dev/?prompt=${encodeURIComponent(
        text
      )}`
    );
  };

  const addToWorkspace = () => {
    const imgElement = document.querySelector<HTMLImageElement>(
      'img[alt="Generated image"]'
    );

    if (!imgElement) {
      console.error('Rendered image not found');
      return;
    }
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Failed to get canvas context');
      return;
    }

    // Set canvas dimensions to match the image
    canvas.width = imgElement.naturalWidth;
    canvas.height = imgElement.naturalHeight;

    // Draw the image onto the canvas
    ctx.drawImage(imgElement, 0, 0);

    // Convert the canvas content to a Data URL
    const base64data = canvas.toDataURL('image/png');

    // Add the image to the Fabric.js canvas
    fabric.Image.fromURL(base64data, (img) => {
      if (editor) {
        const fabricCanvas = editor.canvas;
        fabricCanvas?.add(img);
        fabricCanvas?.renderAll();
      }
    });
  };

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-[49] w-[360px] h-full flex flex-col',
        activeTool === 'ai' ? 'visible' : 'hidden'
      )}
    >
      <ToolbarSidebarHeader
        title="AI"
        description="Generate an image using AI"
      />
      <ScrollArea>
        <div className="p-4 space-y-6">
          <Textarea
            placeholder="Enter your imagination here"
            cols={30}
            rows={10}
            minLength={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={handleClick} className="w-full">
            Generate
            <Sparkles className="ml-2" />
          </Button>
          <div className="mt-4 relative">
            {imageSrc && (
              <div className="relative group">
                <img
                  src={imageSrc}
                  alt="Generated image"
                  width={860}
                  height={860}
                  className="object-contain"
                  crossOrigin="anonymous"
                />
                <Button
                  onClick={addToWorkspace}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Plus className="mr-2" /> Add to Workspace
                </Button>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default AiSidebar;
