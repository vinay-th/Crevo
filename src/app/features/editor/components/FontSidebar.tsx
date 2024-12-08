import React from 'react';
import { ActiveTool, Editor, fonts } from '../types';
import { cn } from '@/lib/utils';
import { ToolbarSidebarHeader } from './ToolbarSidebarHeader';
import { ToolSidebarClose } from '@/components/crevo/ToolsidebarClose';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

interface FontSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const FontSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: FontSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool('select');
  };

  const loadedFonts: Record<string, boolean> = {};

  const loadGoogleFont = async (fontName: string) => {
    if (loadedFonts[fontName]) {
      return;
    }
    // "Open Sans" -> "Open+Sans")
    const formattedFontName = fontName.replaceAll(' ', '+');

    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${formattedFontName}`;
    link.rel = 'stylesheet';

    document.head.appendChild(link);

    await document.fonts.load(`1rem "${fontName}"`);

    loadedFonts[fontName] = true;
  };

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-[49] w-[360px] h-full flex flex-col',
        activeTool === 'font' ? 'visible' : 'hidden'
      )}
    >
      <ToolbarSidebarHeader
        title="Font"
        description="Change the font of text"
      />
      <ScrollArea>
        <div className="p-4 space-y-1 border-b">
          {fonts.map((font) => (
            <Button
              key={font}
              variant={'secondary'}
              size={'lg'}
              className={cn(
                'w-full h-16 justify-start text-left',
                font === editor?.getActiveFontFamily() &&
                  'border border-gray-600'
              )}
              style={{
                fontFamily: font,
                fontSize: '16px',
                padding: '8px 16px',
              }}
              onClick={() => {
                editor?.changeFontFamily(font);
              }}
            >
              {font}
            </Button>
          ))}
          <Button
            variant={'link'}
            size={'lg'}
            className={cn(
              'w-full h-16 justify-start text-left',
              !fonts.includes(`${editor?.getActiveFontFamily()}`) &&
                'border border-gray-600'
            )}
            style={{
              fontSize: '16px',
              padding: '8px 16px',
            }}
            onClick={async () => {
              const customFont = prompt(
                'Enter a custom font from Google Fonts (e.g., "Fira Code")'
              );
              if (customFont) {
                try {
                  await loadGoogleFont(customFont);

                  editor?.changeFontFamily(customFont);
                } catch (error) {
                  alert(
                    `Failed to load the font "${customFont}". Please try again.`
                  );
                  console.error(error);
                }
              }
            }}
          >
            Custom Font
          </Button>
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default FontSidebar;
