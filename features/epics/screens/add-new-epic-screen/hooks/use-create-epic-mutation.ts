'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEpic } from '../api';

export function useCreateEpicMutation(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEpic,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['project-epics', projectId],
      });
    },
  });
}
