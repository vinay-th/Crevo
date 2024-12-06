import { useEffect, useMemo, useState } from 'react';
import React from 'react';
import { ActiveTool, Editor, OPACITY } from '../types';
import { cn } from '@/lib/utils';
import { ToolbarSidebarHeader } from './ToolbarSidebarHeader';
import { ToolSidebarClose } from '@/components/crevo/ToolsidebarClose';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

interface OpacitySidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const OpacitySidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: OpacitySidebarProps) => {
  const initialValue = editor?.getActiveOpacity() || OPACITY;
  const selectedObject = useMemo(
    () => editor?.selectedObjects[0],
    [editor?.selectedObjects]
  );

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (selectedObject) {
      setValue(selectedObject.get('opacity') || OPACITY);
    }
  }, [selectedObject]);

  const onClose = () => {
    onChangeActiveTool('select');
  };

  const onChange = (value: number) => {
    editor?.changeOpacity(value);
    setValue(value);
  };

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-[49] w-[360px] h-full flex flex-col',
        activeTool === 'opacity' ? 'visible' : 'hidden'
      )}
    >
      <ToolbarSidebarHeader
        title="Opacity"
        description="Change the opacity of the selected element"
      />
      <ScrollArea>
        <div className="flex flex-row justify-center items-center p-4 space-x-4">
          {/* Slider */}
          <Slider
            value={[value]}
            onValueChange={(values) =>
              onChange(Math.min(1, Math.max(0, values[0])))
            }
            max={1}
            min={0}
            step={0.01}
          />

          <span>{value.toFixed(2)}</span>
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default OpacitySidebar;
