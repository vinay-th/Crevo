import React from 'react';
import { ActiveTool, Editor, filters, fonts } from '../types';
import { cn } from '@/lib/utils';
import { ToolbarSidebarHeader } from './ToolbarSidebarHeader';
import { ToolSidebarClose } from '@/components/crevo/ToolsidebarClose';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

interface AiBgRemoveSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const AiBgRemoveSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: AiBgRemoveSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool('select');
  };

  const handleClick = () => {
    editor?.removeBg();
  };

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-[49] w-[360px] h-full flex flex-col',
        activeTool === 'remove-bg' ? 'visible' : 'hidden'
      )}
    >
      <ToolbarSidebarHeader
        title="Ai Background Remove"
        description="Remove background from image using AI"
      />
      <ScrollArea>
        <div className="p-4 space-y-1 border-b">
          <Button className="w-full h-12" onClick={handleClick}>
            <span className="capitalize text-center">Remove Background</span>
          </Button>
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default AiBgRemoveSidebar;
