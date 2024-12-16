'use client';
import { useGetProject } from '@/app/features/projects/api/use-get-project';
import Editor from '@/app/features/editor/components/editor';
import { Loader, TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { use } from 'react';

const EditorPage = ({ params }: { params: Promise<{ project: string }> }) => {
  const resolvedParams = use(params);
  const { project } = resolvedParams;

  const { data, isLoading, isError } = useGetProject(project);
  if (isLoading || !data) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <TriangleAlert className="size-6 animate-spin text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Failed to load project</p>
        <Button asChild variant={'secondary'}>
          <Link href={'/'}>Go Back</Link>
        </Button>
      </div>
    );
  }
  return <Editor initialData={data} />;
};

export default EditorPage;
