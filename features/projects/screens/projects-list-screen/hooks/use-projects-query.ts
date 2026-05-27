'use client';

import { useQuery } from '@tanstack/react-query';
import { getProjects, isProjectsUnauthorizedError } from '../api/get-projects';

const projectsQueryKey = ['projects'] as const;
const defaultClientRetryCount = 3;

export function useProjectsQuery() {
  return useQuery({
    queryFn: () => getProjects(),
    queryKey: projectsQueryKey,
    retry: (failureCount, error) =>
      !isProjectsUnauthorizedError(error) &&
      failureCount < defaultClientRetryCount,
  });
}
