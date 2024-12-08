import React from 'react';
import { ActiveTool, Editor } from '../types';
import { Hint } from '@/components/crevo/Hint';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BsBorderWidth } from 'react-icons/bs';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { RxTransparencyGrid } from 'react-icons/rx';
import { on } from 'events';
import { isTextType } from '../utils';
interface ToolbarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const Toolbar = ({ editor, activeTool, onChangeActiveTool }: ToolbarProps) => {
  const fillColor = editor?.getActiveFillColor();
  const strokeColor = editor?.getActiveStrokeColor();

  const selectedObjectType = editor?.selectedObjects[0]?.type;
  const isText = isTextType(selectedObjectType);

  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto p-2 gap-x-2" />
    );
  }

  return (
    <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto p-2 gap-x-2">
      <div className="flex items-center h-full justify-center">
        <Hint label="Color" side="bottom" sideOffset={5}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onChangeActiveTool('fill')}
            className={cn(activeTool === 'fill' && 'bg-gray-100')}
          >
            <div
              className="rounded-sm size-4 border"
              style={{
                backgroundColor: `${fillColor}`,
              }}
            />
          </Button>
        </Hint>
      </div>
      {!isText && (
        <>
          <div className="flex items-center h-full justify-center">
            <Hint label="Stroke color" side="bottom" sideOffset={5}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onChangeActiveTool('stroke-color')}
                className={cn(activeTool === 'stroke-color' && 'bg-gray-100')}
              >
                <div
                  className="rounded-sm size-4 border-2 bg-white"
                  style={{
                    borderColor: `${strokeColor}`,
                  }}
                />
              </Button>
            </Hint>
          </div>
          <div className="flex items-center h-full justify-center">
            <Hint label="Stroke width" side="bottom" sideOffset={5}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onChangeActiveTool('stroke-width')}
                className={cn(activeTool === 'stroke-width' && 'bg-gray-100')}
              >
                <BsBorderWidth className="size-4" />
              </Button>
            </Hint>
          </div>
        </>
      )}
      <div className="flex items-center h-full justify-center">
        <Hint label="Bring to front" side="bottom" sideOffset={5}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor?.bringForward()}
          >
            <ArrowUp className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label="Send to back" side="bottom" sideOffset={5}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor?.sendBackward()}
          >
            <ArrowDown className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label="Opacity" side="bottom" sideOffset={5}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onChangeActiveTool('opacity')}
            className={cn(activeTool === 'opacity' && 'bg-gray-100')}
          >
            <RxTransparencyGrid className="size-4" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};

export default Toolbar;
