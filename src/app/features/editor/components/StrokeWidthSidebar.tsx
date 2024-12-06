import React from 'react';
import { ActiveTool, Editor, STROKE_WIDTH } from '../types';
import { cn } from '@/lib/utils';
import { ToolbarSidebarHeader } from './ToolbarSidebarHeader';
import { ToolSidebarClose } from '@/components/crevo/ToolsidebarClose';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface StrokeWidthSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const StrokeWidthSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: StrokeWidthSidebarProps) => {
  const value = editor?.getActiveStrokeWidth() || STROKE_WIDTH;

  const onClose = () => {
    onChangeActiveTool('select');
  };

  const onChange = (value: number) => {
    editor?.changeStrokeWidth(value);
  };

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-[49] w-[360px] h-full flex flex-col',
        activeTool === 'stroke-width' ? 'visible' : 'hidden'
      )}
    >
      <ToolbarSidebarHeader
        title="Stroke Width"
        description="Modify the stroke width to your element"
      />
      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Label className="text-sm">Stroke Options</Label>
          <Slider
            value={[value]}
            onValueChange={(values) => onChange(values[0])}
          />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default StrokeWidthSidebar;
