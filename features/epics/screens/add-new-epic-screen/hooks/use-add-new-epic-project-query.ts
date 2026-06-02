'use client';

import { useQuery } from '@tanstack/react-query';
import {
  getProject,
  isProjectUnauthorizedError,
} from '@/features/projects/screens/edit-project-screen/api';

const defaultClientRetryCount = 3;

export function useAddNewEpicProjectQuery(
  projectId: string,
  enabled = true,
) {
  return useQuery({
    enabled,
    queryFn: () => getProject(projectId),
    queryKey: ['project', projectId] as const,
    retry: (failureCount, error) =>
      !isProjectUnauthorizedError(error) &&
      failureCount < defaultClientRetryCount,
  });
}
