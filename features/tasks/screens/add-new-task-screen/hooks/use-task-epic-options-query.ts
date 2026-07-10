'use client';

import { useQuery } from '@tanstack/react-query';
import { shouldRetryEpicQuery } from '@/features/epics/screens/shared/hooks';
import { getTaskEpicOptions } from '../api';

export function useTaskEpicOptionsQuery(projectId: string, enabled = true) {
  return useQuery({
    enabled,
    queryFn: () => getTaskEpicOptions(projectId),
    queryKey: ['task-epic-options', projectId] as const,
    retry: shouldRetryEpicQuery,
  });
}
