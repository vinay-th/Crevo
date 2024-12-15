'use client';
import { useGetProject } from '@/app/features/projects/api/use-get-projects';
import Editor from '@/app/features/editor/components/editor';
import { Loader, TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface EditorPageProps {
  params: {
    project: string;
  };
}

const EditorPage = ({ params }: EditorPageProps) => {
  const { data, isLoading, isError } = useGetProject(params.project);
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
  return <Editor />;
};

export default EditorPage;
