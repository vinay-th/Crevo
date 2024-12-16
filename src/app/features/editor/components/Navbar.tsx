'use client';
import React from 'react';
import { Logo } from './Logo';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ChevronDown,
  Download,
  Loader,
  MousePointerClick,
  Redo2,
  Undo2,
} from 'lucide-react';
import { CiFileOn } from 'react-icons/ci';
import { Separator } from '@/components/ui/separator';
import { Hint } from '@/components/crevo/Hint';
import {
  BsCloudCheck,
  BsCloudSlash,
  BsFiletypeJpg,
  BsFiletypeJson,
  BsFiletypePng,
  BsFiletypeSvg,
} from 'react-icons/bs';
import { ActiveTool } from '../types';
import { cn } from '@/lib/utils';
import { Editor } from '../types';
import { useFilePicker } from 'use-file-picker';
import { UserButton } from '../../auth/components/UserButton';
import { useMutationState } from '@tanstack/react-query';

interface NavbarProps {
  id: string;
  activeTool: ActiveTool;
  editor?: Editor | undefined;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const Navbar = ({
  id,
  activeTool,
  onChangeActiveTool,
  editor,
}: NavbarProps) => {
  const data = useMutationState({
    filters: {
      mutationKey: ['project', { id: id }],
      exact: true,
    },
    select: (mutation) => mutation.state.status,
  });
  const currentSate = data[data.length - 1];

  const isError = currentSate === 'error';
  const isPending = currentSate === 'pending';

  const { openFilePicker } = useFilePicker({
    accept: '.json',
    onFilesSuccessfullySelected: ({ plainFiles }: any) => {
      if (plainFiles && plainFiles.length > 0) {
        const file = plainFiles[0];
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = () => {
          editor?.loadJson(reader.result as string);
        };
      }
    },
  });
  return (
    <nav className="w-full flex items-center p-4 h-[64px] gap-x-8 border-b lg:pl-[34px]">
      <Logo />
      <div className="flex w-full items-center gap-x-1 h-full">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
              File
              <ChevronDown className="size-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-60">
            <DropdownMenuItem
              onClick={() => openFilePicker()}
              className="flex flex-row items-center gap-x-2"
            >
              <CiFileOn style={{ width: '1.5rem', height: '1.5rem' }} />
              <div>
                <p>Open</p>
                <p className="text-xs text-muted-foreground">
                  Open a JSON file
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation="vertical" className="mx-2" />
        <Hint label="Select" side="bottom" sideOffset={10}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onChangeActiveTool('select')}
            className={cn(activeTool === 'select' && 'bg-gray-100')}
          >
            <MousePointerClick className="size-4" />
          </Button>
        </Hint>
        <Hint label="Undo" side="bottom" sideOffset={10}>
          <Button
            disabled={!editor?.canUndo()}
            variant="ghost"
            size="icon"
            onClick={() => editor?.onUndo()}
          >
            <Undo2 className="size-4" />
          </Button>
        </Hint>
        <Hint label="Redo" side="bottom" sideOffset={10}>
          <Button
            disabled={!editor?.canRedo()}
            variant="ghost"
            size="icon"
            onClick={() => editor?.onRedo()}
          >
            <Redo2 className="size-4" />
          </Button>
        </Hint>
        <Separator orientation="vertical" className="mx-2" />
        {!isPending && !isError && (
          <div className="flex items-center gap-x-2">
            <BsCloudCheck className="size-[20px] text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Saved</p>
          </div>
        )}
        {!isPending && isError && (
          <div className="flex items-center gap-x-2">
            <BsCloudSlash className="size-[20px] text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Failed to save</p>
          </div>
        )}
        {isPending && (
          <div className="flex items-center gap-x-2">
            <Loader className="size-4 animate-spin text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Saving...</p>
          </div>
        )}
        <div
          className="ml-auto flex items-center gap-x-4"
          style={{ marginLeft: 'auto' }}
        >
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button size={'sm'} variant="ghost">
                Export
                <Download className="size-4 ml-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-60">
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => {
                  editor?.saveJson();
                }}
              >
                <BsFiletypeJson style={{ width: '1.5rem', height: '1.5rem' }} />
                <div>
                  <p>JSON</p>
                  <p className="text-xs text-muted-foreground">
                    Save for later editing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => {
                  editor?.savePng();
                }}
              >
                <BsFiletypePng style={{ width: '1.5rem', height: '1.5rem' }} />
                <div>
                  <p>PNG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for sharing on the web
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => {
                  editor?.saveJpg();
                }}
              >
                <BsFiletypeJpg style={{ width: '1.5rem', height: '1.5rem' }} />
                <div>
                  <p>JPG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for printing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => {
                  editor?.saveSvg();
                }}
              >
                <BsFiletypeSvg style={{ width: '1.5rem', height: '1.5rem' }} />
                <div>
                  <p>SVG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for editing in vector software
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
