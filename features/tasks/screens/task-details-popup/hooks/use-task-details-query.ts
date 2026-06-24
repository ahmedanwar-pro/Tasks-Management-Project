'use client';

import { useQuery } from '@tanstack/react-query';
import { getTaskDetails } from '../api';
import { shouldRetryProjectTasksQuery } from '../../project-tasks-board-screen/hooks';

export function useTaskDetailsQuery(projectId: string, taskId: string) {
  return useQuery({
    enabled: Boolean(projectId && taskId),
    queryFn: () => getTaskDetails({ projectId, taskId }),
    queryKey: ['task-details', projectId, taskId] as const,
    retry: shouldRetryProjectTasksQuery,
  });
}
