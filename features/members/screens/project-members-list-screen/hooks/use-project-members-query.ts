'use client';

import { useQuery } from '@tanstack/react-query';
import {
  getProjectMembers,
  isProjectMembersUnauthorizedError,
} from '../api';

const defaultClientRetryCount = 3;

export function useProjectMembersQuery(projectId: string) {
  return useQuery({
    queryFn: () => getProjectMembers(projectId),
    queryKey: ['project-members', projectId] as const,
    retry: (failureCount, error) =>
      !isProjectMembersUnauthorizedError(error) &&
      failureCount < defaultClientRetryCount,
  });
}
