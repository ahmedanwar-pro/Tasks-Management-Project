'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '../api';

export function useCreateTaskMutation(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['project-tasks', projectId],
      });
      void queryClient.invalidateQueries({
        queryKey: ['project-epics', projectId],
      });
    },
  });
}
