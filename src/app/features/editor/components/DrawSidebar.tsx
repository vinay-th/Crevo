import React from 'react';
import { ActiveTool, Editor, STROKE_COLOR } from '../types';
import { cn } from '@/lib/utils';
import { ToolbarSidebarHeader } from './ToolbarSidebarHeader';
import { ToolSidebarClose } from '@/components/crevo/ToolsidebarClose';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ColorPicker } from './ColorPicker';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface DrawSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const DrawSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: DrawSidebarProps) => {
  const colorValue = editor?.getActiveStrokeColor() || STROKE_COLOR;
  const widthValue = editor?.getActiveStrokeWidth() || 2;

  const onClose = () => {
    editor?.disableDrawingMode();
    onChangeActiveTool('select');
  };

  const onColorChange = (value: string) => {
    editor?.changeStrokeColor(value);
  };

  const onWidthChange = (value: number) => {
    editor?.changeStrokeWidth(value);
  };

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-[40] w-[360px] h-full flex flex-col',
        activeTool === 'draw' ? 'visible' : 'hidden'
      )}
    >
      <ToolbarSidebarHeader
        title="Drawing mode"
        description="Modify brush settings"
      />
      <ScrollArea>
        <div className="p-4 space-y-6">
          <Label className="text-sm">Brush width</Label>
        </div>
        <div className="flex flex-row justify-center items-center p-4 space-x-4">
          <Slider
            value={[widthValue]}
            onValueChange={(values) => onWidthChange(values[0])}
            className="w-full"
            min={1}
            max={30}
            step={1}
          />
          <span>{widthValue}</span>
        </div>
        <div className="p-4 space-y-6">
          <Label className="text-sm">Brush Color</Label>
        </div>
        <div className="p-4 space-y-6">
          <ColorPicker value={`${colorValue}`} onChange={onColorChange} />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default DrawSidebar;
