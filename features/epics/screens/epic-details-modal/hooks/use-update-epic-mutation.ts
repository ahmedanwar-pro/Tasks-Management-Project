'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateEpic } from '../api';

export function useUpdateEpicMutation(projectId: string, epicId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEpic,
    onSuccess: (epic) => {
      queryClient.setQueryData(['epic-details', projectId, epicId], epic);
      void queryClient.invalidateQueries({
        queryKey: ['project-epics', projectId],
      });
    },
  });
}
