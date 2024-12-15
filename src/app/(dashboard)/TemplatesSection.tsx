'use client';

import { Loader, TriangleAlert } from 'lucide-react';
import {
  ResponseType,
  useGetTemplates,
} from '../features/projects/api/use-get-templates';
import { TemplateCard } from './TemplateCard';
import { useCreateProjects } from '../features/projects/api/use-create-projects';
import { useRouter } from 'next/navigation';

const TemplatesSection = () => {
  const router = useRouter();
  const mutation = useCreateProjects();

  const onClick = (template: ResponseType['data'][0]) => {
    // TODO: Check if pro
    mutation.mutate(
      {
        name: `${template.name} project`,
        json: template.json,
        height: template.height,
        width: template.width,
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/editor/${data.id}`);
        },
      }
    );
  };
  const { data, isLoading, isError } = useGetTemplates({
    page: '1',
    limit: '5',
  });
  if (isLoading) {
    return (
      <div>
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        <TriangleAlert className="size-10 text-muted-foreground " />
        <p className="text-md text-muted-foreground">
          Failed to load templates 🥺
        </p>
      </div>
    );
  }
  return (
    <div>
      <h3 className="text-lg font-semibold">Start from a template</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 mt-4 gap-4">
        {data?.map((template) => (
          <TemplateCard
            key={template.id}
            title={template.name}
            imageSrc={template.thumbnailUrl || ''}
            onClick={() => onClick(template)}
            disabled={mutation.isPending}
            description={`${template.width} x ${template.height} px`}
            width={template.width}
            height={template.height}
            isPro={template.isPro}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplatesSection;
