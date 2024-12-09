import React, { useState } from 'react';
import { ActiveTool, Editor } from '../types';
import { cn } from '@/lib/utils';
import { ToolbarSidebarHeader } from './ToolbarSidebarHeader';
import { ToolSidebarClose } from '@/components/crevo/ToolsidebarClose';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

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

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-[49] w-[360px] h-full flex flex-col',
        activeTool === 'ai' ? 'visible' : 'hidden'
      )}
    >
      <ToolbarSidebarHeader
        title="Ai"
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
          <div className="mt-4">
            {imageSrc && (
              <img
                src={imageSrc}
                alt="Generated image"
                width={860}
                height={860}
                className="object-contain"
              />
            )}
          </div>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default AiSidebar;
