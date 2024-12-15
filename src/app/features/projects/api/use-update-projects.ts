import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { client } from '@/lib/hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<
  (typeof client.api.projects)[':id']['$patch'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.projects)[':id']['$patch']
>['json'];

export const useUpdateProjects = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ['project', { id }],
    mutationFn: async (json) => {
      const response = await client.api.projects[':id'].$patch({
        json,
        param: { id },
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      return await response.json();
    },
    onSuccess: () => {
      //   Invalidate "projects" query
      queryClient.invalidateQueries({ queryKey: ['project', { id }] });
    },
    onError: () => {
      toast.error('Failed to update project');
    },
  });

  return mutation;
};
