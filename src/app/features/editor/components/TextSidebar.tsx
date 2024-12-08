import { useEffect, useMemo, useState } from 'react';
import React from 'react';
import { ActiveTool, Editor } from '../types';
import { cn } from '@/lib/utils';
import { ToolbarSidebarHeader } from './ToolbarSidebarHeader';
import { ToolSidebarClose } from '@/components/crevo/ToolsidebarClose';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

interface TextSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const TextSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: TextSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool('select');
  };

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-[49] w-[360px] h-full flex flex-col',
        activeTool === 'text' ? 'visible' : 'hidden'
      )}
    >
      <ToolbarSidebarHeader title="Text" description="Add text to the canvas" />
      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Button
            className="w-full"
            onClick={() => {
              editor?.addText('Text');
            }}
          >
            Add Text
          </Button>
          <Button
            className="w-full h-16"
            variant={'secondary'}
            size={'lg'}
            onClick={() => {
              editor?.addText('Heading', {
                fontSize: 120,
                fontWeight: 700,
              });
            }}
          >
            <span className="text-2xl font-bold">Add Heading</span>
          </Button>
          <Button
            className="w-full h-16"
            variant={'secondary'}
            size={'lg'}
            onClick={() => {
              editor?.addText('Sub-Heading', {
                fontSize: 80,
                fontWeight: 500,
              });
            }}
          >
            <span className="text-xl font-bold">Add Sub-Heading</span>
          </Button>
          <Button
            className="w-full h-16"
            variant={'secondary'}
            size={'lg'}
            onClick={() => {
              editor?.addText('Paragraph', {
                fontSize: 60,
              });
            }}
          >
            <span className="text-lg ">Add paragraph</span>
          </Button>
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default TextSidebar;
