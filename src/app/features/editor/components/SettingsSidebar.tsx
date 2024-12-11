import React, { useEffect, useMemo, useState } from 'react';
import { ActiveTool, Editor } from '../types';
import { cn } from '@/lib/utils';
import { ToolbarSidebarHeader } from './ToolbarSidebarHeader';
import { ToolSidebarClose } from '@/components/crevo/ToolsidebarClose';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ColorPicker } from './ColorPicker';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SettingsSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const SettingsSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: SettingsSidebarProps) => {
  const workspace = editor?.getWorkspace();

  const initialWidth = useMemo(() => `${workspace?.width ?? 0}`, [workspace]);
  const initialHeight = useMemo(() => `${workspace?.height ?? 0}`, [workspace]);
  const initialBackground = useMemo(
    () => workspace?.fill ?? '#ffffff',
    [workspace]
  );

  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [background, setBackground] = useState(initialBackground);

  useEffect(() => {
    setWidth(initialWidth);
    setHeight(initialHeight);
    setBackground(initialBackground);
  }, [initialWidth, initialHeight, initialBackground]);

  const onClose = () => {
    onChangeActiveTool('select');
  };

  const changeWidth = (value: string) => {
    setWidth(value);
  };

  const changeHeight = (value: string) => {
    setHeight(value);
  };

  const changeBackground = (value: string) => {
    setBackground(value);
    editor?.changeBackground(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editor?.changeSize({
      width: parseInt(width, 10),
      height: parseInt(height, 10),
    });
  };

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-[49] w-[360px] h-full flex flex-col',
        activeTool === 'settings' ? 'visible' : 'hidden'
      )}
    >
      <ToolbarSidebarHeader
        title="Settings"
        description="Change the look and feel of your workspace"
      />
      <ScrollArea>
        <form className="p-4 space-y-6" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label>Height</Label>
            <Input
              placeholder="Height"
              value={height}
              type="number"
              onChange={(e) => changeHeight(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Width</Label>
            <Input
              placeholder="Width"
              value={width}
              type="number"
              onChange={(e) => changeWidth(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Resize
          </Button>
        </form>
        <div className="p-4">
          <ColorPicker value={`${background}`} onChange={changeBackground} />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default SettingsSidebar;
