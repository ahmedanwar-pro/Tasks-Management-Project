'use client';

import { useQuery } from '@tanstack/react-query';
import { getProject, isProjectUnauthorizedError } from '../api';

const defaultClientRetryCount = 3;

export function useProjectQuery(projectId: string) {
  return useQuery({
    queryFn: () => getProject(projectId),
    queryKey: ['project', projectId] as const,
    retry: (failureCount, error) =>
      !isProjectUnauthorizedError(error) &&
      failureCount < defaultClientRetryCount,
  });
}
