'use client';

import { useQuery } from '@tanstack/react-query';
import { isProjectUnauthorizedError } from '@/features/projects/screens/edit-project-screen/api/project-api-errors';
import type { TaskStatus } from '../../../add-new-task-screen/add-new-task-form-schema';
import { getProjectTasksByStatus } from '../../api';

const defaultClientRetryCount = 3;

export function shouldRetryProjectTasksQuery(
  failureCount: number,
  error: Error,
) {
  return (
    !isProjectUnauthorizedError(error) && failureCount < defaultClientRetryCount
  );
}

export function useProjectTasksByStatusQuery(
  projectId: string,
  status: TaskStatus,
) {
  return useQuery({
    queryFn: () => getProjectTasksByStatus({ projectId, status }),
    queryKey: ['project-tasks', projectId, status] as const,
    retry: shouldRetryProjectTasksQuery,
  });
}
