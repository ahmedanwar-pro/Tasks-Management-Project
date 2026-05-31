'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProject } from '../api';

export function useUpdateProjectMutation(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProject,
    onSuccess: (project) => {
      queryClient.setQueryData(['project', projectId], project);
      void queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}
