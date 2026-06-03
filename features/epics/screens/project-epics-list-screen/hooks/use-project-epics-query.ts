'use client';

import { useQuery } from '@tanstack/react-query';
import { isProjectUnauthorizedError } from '@/features/projects/screens/edit-project-screen/api';
import { getProjectEpics } from '../api';

const defaultClientRetryCount = 3;

export function useProjectEpicsQuery(
  projectId: string,
  currentPage: number,
  pageSize: number,
) {
  return useQuery({
    queryFn: () =>
      getProjectEpics({
        limit: pageSize,
        offset: (currentPage - 1) * pageSize,
        projectId,
      }),
    queryKey: ['project-epics', projectId, currentPage, pageSize] as const,
    retry: (failureCount, error) =>
      !isProjectUnauthorizedError(error) &&
      failureCount < defaultClientRetryCount,
  });
}
