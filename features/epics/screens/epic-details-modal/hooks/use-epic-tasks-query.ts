'use client';

import { useQuery } from '@tanstack/react-query';
import { shouldRetryEpicQuery } from '../../shared/hooks';
import { getEpicTasks } from '../api';

export function useEpicTasksQuery(projectId: string, epicId: string) {
  return useQuery({
    queryFn: () => getEpicTasks({ epicId, projectId }),
    queryKey: ['epic-details-tasks', projectId, epicId] as const,
    retry: shouldRetryEpicQuery,
  });
}
