import React from 'react';
import { ActiveTool } from '../types';
import { cn } from '@/lib/utils';
import { ToolbarSidebarHeader } from './ToolbarSidebarHeader';
import { ToolsidebarClose } from '@/components/crevo/ToolsidebarClose';

interface ShapeSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const ShapeSidebar = ({
  activeTool,
  onChangeActiveTool,
}: ShapeSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool('select');
  };

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-[49] w-[360px] h-full flex flex-col',
        activeTool === 'shapes' ? 'visible' : 'hidden'
      )}
    >
      <ToolbarSidebarHeader title="Shapes" description="Shapes" />
      <ToolsidebarClose onClick={onClose} />
    </aside>
  );
};

export default ShapeSidebar;
