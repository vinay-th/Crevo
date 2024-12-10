import React from 'react';
import { ActiveTool, Editor, filters, fonts } from '../types';
import { cn } from '@/lib/utils';
import { ToolbarSidebarHeader } from './ToolbarSidebarHeader';
import { ToolSidebarClose } from '@/components/crevo/ToolsidebarClose';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

interface FilterSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const FilterSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: FilterSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool('select');
  };

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-[49] w-[360px] h-full flex flex-col',
        activeTool === 'filter' ? 'visible' : 'hidden'
      )}
    >
      <ToolbarSidebarHeader
        title="Filter"
        description="Add filter to your image"
      />
      <ScrollArea>
        <div className="p-4 space-y-1 border-b">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={'secondary'}
              size={'lg'}
              className={cn('w-full h-16 justify-start text-left')}
              style={{
                fontSize: '16px',
                padding: '8px 16px',
              }}
              onClick={() => {
                editor?.changeFilter(filter);
              }}
            >
              <span className="capitalize">{filter}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default FilterSidebar;
