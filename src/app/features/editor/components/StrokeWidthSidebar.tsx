import React from 'react';
import { ActiveTool, Editor, STROKE_DASH_ARRAY, STROKE_WIDTH } from '../types';
import { cn } from '@/lib/utils';
import { ToolbarSidebarHeader } from './ToolbarSidebarHeader';
import { ToolSidebarClose } from '@/components/crevo/ToolsidebarClose';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

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
  const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH;
  const typeValue = editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY;

  const onClose = () => {
    onChangeActiveTool('select');
  };

  const onChangeStroke = (value: number) => {
    editor?.changeStrokeWidth(value);
  };

  const onChangeStrokeDashArray = (value: number[]) => {
    editor?.changeStrokeDashArray(value);
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
            value={[widthValue]}
            onValueChange={(values) => onChangeStroke(values[0])}
          />
        </div>
        <div className="p-4 space-y-4 border-b">
          <Label className="text-sm">Stroke Type</Label>
          <Button
            variant="secondary"
            onClick={() => onChangeStrokeDashArray([])}
            size={'lg'}
            className={cn(
              'w-full h-16 justify-start text-left',
              JSON.stringify(typeValue) === `[]` && 'border border-gray-600'
            )}
            style={{
              padding: '8px 16px',
            }}
          >
            <div className="w-full border-black rounded-full border-4" />
          </Button>
          <Button
            variant="secondary"
            onClick={() => onChangeStrokeDashArray([5, 5])}
            size={'lg'}
            className={cn(
              'w-full h-16 justify-start text-left',
              JSON.stringify(typeValue) === `[5,5]` && 'border border-gray-600'
            )}
            style={{
              padding: '8px 16px',
            }}
          >
            <div className="w-full border-black rounded-full border-4 border-dashed" />
          </Button>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default StrokeWidthSidebar;
