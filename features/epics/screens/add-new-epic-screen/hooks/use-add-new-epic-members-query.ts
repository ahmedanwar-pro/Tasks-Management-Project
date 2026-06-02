'use client';

import { useQuery } from '@tanstack/react-query';
import {
  getProjectMembers,
  isProjectMembersUnauthorizedError,
} from '@/features/members/screens/project-members-list-screen/api';

const defaultClientRetryCount = 3;

export function useAddNewEpicMembersQuery(projectId: string, enabled = true) {
  return useQuery({
    enabled,
    queryFn: () => getProjectMembers(projectId),
    queryKey: ['project-members', projectId] as const,
    retry: (failureCount, error) =>
      !isProjectMembersUnauthorizedError(error) &&
      failureCount < defaultClientRetryCount,
  });
}
