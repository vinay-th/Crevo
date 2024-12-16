'use client';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useCreateProjects } from '../features/projects/api/use-create-projects';
import { useRouter } from 'next/navigation';

export const Banner = () => {
  const router = useRouter();
  const mutation = useCreateProjects();
  const onClick = () => {
    mutation.mutate(
      {
        name: 'Untitled',
        json: '',
        height: 1200,
        width: 900,
      },
      {
        onSuccess: ({ data }: any) => {
          router.push(`/editor/${data.id}`);
        },
      }
    );
  };
  return (
    <div className="aspect-[5/1] min-h-[248px] flex gap-x-6 p-6 items-center rounded-xl bg-gradient-to-r from-[#030038] via-[#090979] to-[#9e00ff]">
      <div className="rounded-full size-28 md:flex items-center justify-center bg-white/50 hidden">
        <div className="rounded-full size-20 flex items-center justify-center bg-white">
          <Sparkles className="h-20 text-[#090979] fill-[#090979]" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <h1 className="text-3xl font-semibold text-white">
          Bringing ideas to life, one feature at a time!
        </h1>
        <p className="text-sm text-white/50 w-[500px]">
          Turn inspiration into reality with our intuitive and user-friendly
          design system. Experience the power of Crevo and unlock your creative
          potential with AI.
        </p>
        <Button
          variant={'secondary'}
          className="w-[160px] mt-2"
          onClick={onClick}
        >
          Start Creating
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Banner;
