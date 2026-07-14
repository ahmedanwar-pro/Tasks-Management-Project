'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProject } from '../api/create-project';

export function useCreateProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}
