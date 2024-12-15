'use client';

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useGetProjects } from '../features/projects/api/use-get-projects';
import {
  AlertTriangle,
  CopyIcon,
  FileIcon,
  Loader,
  MoreHorizontal,
  Search,
  Trash,
} from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useDuplicateProject } from '../features/projects/api/use-duplicate-project';

export default function ProjectsSection() {
  const duplicateMutation = useDuplicateProject();
  const router = useRouter();
  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetProjects();

  const onCopy = (id: string) => {
    duplicateMutation.mutate({ id });
  };

  if (status === 'error') {
    return (
      <div className="space-y-4">
        <p className="text-lg font-semibold">Recent Projects</p>
        <div className="flex h-32 flex-col items-center justify-center">
          <AlertTriangle className="size-6 text-muted-foreground" />
          <p className="text-md text-muted-foreground">
            Failed to load projects 🥺
          </p>
        </div>
      </div>
    );
  }

  if (status === 'pending') {
    return (
      <div className="space-y-4">
        <p className="text-lg font-semibold">Recent Projects</p>
        <div className="flex h-32 flex-col items-center justify-center">
          <Loader className="size-6 text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!data.pages.length) {
    return (
      <div className="space-y-4">
        <p className="text-lg font-semibold">Recent Projects</p>
        <div className="flex h-32 flex-col items-center justify-center">
          <Search className="size-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            No projects found. Create a new project to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-lg font-semibold">Recent Projects</p>
      <Table>
        <TableBody>
          {data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map((project) => (
                <TableRow key={project.id}>
                  <TableCell
                    className="font-medium flex items-center gap-x-2 cursor-pointer"
                    onClick={() => router.push(`/editor/${project.id}`)}
                  >
                    <FileIcon className="size-6" />
                    <p className="text-sm font-medium">{project.name}</p>
                  </TableCell>
                  <TableCell
                    className="hidden md:table-cell cursor-pointer"
                    onClick={() => router.push(`/editor/${project.id}`)}
                  >
                    {project.width} x {project.height}
                  </TableCell>
                  <TableCell
                    className="hidden md:table-cell cursor-pointer"
                    onClick={() => router.push(`/editor/${project.id}`)}
                  >
                    {formatDistanceToNow(project.updatedAt, {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell className="flex flex-item-center justify-end">
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size={'icon'}
                          variant={'ghost'}
                          disabled={false}
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="min-w-60">
                        <DropdownMenuItem
                          className="h-10 cursor-pointer"
                          disabled={false}
                          onClick={() => {
                            onCopy(project.id);
                          }}
                        >
                          <CopyIcon className="size-4 mr-2" />
                          <p>Make a Copy</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="h-10 cursor-pointer"
                          disabled={false}
                          onClick={() => {}}
                        >
                          <Trash className="size-4 mr-2" />
                          <p>Delete</p>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      {hasNextPage && (
        <div className="w-full flex items-center justify-center pt-4">
          <Button
            variant="ghost"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
}
