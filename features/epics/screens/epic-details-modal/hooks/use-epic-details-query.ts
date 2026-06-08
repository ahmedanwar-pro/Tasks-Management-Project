'use client';

import { useQuery } from '@tanstack/react-query';
import { shouldRetryEpicQuery } from '../../shared/hooks';
import { getEpicDetails } from '../api';

export function useEpicDetailsQuery(projectId: string, epicId: string) {
  return useQuery({
    queryFn: () => getEpicDetails({ epicId, projectId }),
    queryKey: ['epic-details', projectId, epicId] as const,
    retry: shouldRetryEpicQuery,
  });
}
