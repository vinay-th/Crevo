import { Hint } from '@/components/crevo/Hint';
import { Button } from '@/components/ui/button';
import { Minimize, ZoomIn, ZoomOut } from 'lucide-react';
import React from 'react';
import { Editor } from '../types';

interface FooterProps {
  editor: Editor | undefined;
}

const Footer = ({ editor }: FooterProps) => {
  return (
    <footer className="h--[52px] bg-white w-full flex items-center overflow-x-auto p-2 gap-x-1 shrink-0 px-4 flex-row-reverse">
      <Hint label="Zoom in" side="bottom" sideOffset={10}>
        <Button
          onClick={() => {
            editor?.zoomIn();
          }}
          size={'icon'}
          className="h-full"
          variant="ghost"
        >
          <ZoomIn className="size-4" />
        </Button>
      </Hint>
      <Hint label="Zoom out" side="bottom" sideOffset={10}>
        <Button
          onClick={() => {
            editor?.zoomOut();
          }}
          size={'icon'}
          className="h-full"
          variant="ghost"
        >
          <ZoomOut className="size-4" />
        </Button>
      </Hint>
      <Hint label="Reset" side="bottom" sideOffset={10}>
        <Button
          onClick={() => {
            editor?.autoZoom();
          }}
          size={'icon'}
          className="h-full"
          variant="ghost"
        >
          <Minimize className="size-4" />
        </Button>
      </Hint>
    </footer>
  );
};

export default Footer;
