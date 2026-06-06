'use client';

import {
  type InfiniteData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { isProjectUnauthorizedError } from '@/features/projects/screens/edit-project-screen/api';
import { getProjectEpics, type GetProjectEpicsResponse } from '../api';
import { getPaginationOffset } from '../utils';

const defaultClientRetryCount = 3;

function shouldRetryProjectEpicsQuery(failureCount: number, error: Error) {
  return (
    !isProjectUnauthorizedError(error) && failureCount < defaultClientRetryCount
  );
}

export function useProjectEpicsQuery(
  projectId: string,
  currentPage: number,
  limit: number,
) {
  const offset = getPaginationOffset(currentPage, limit);

  return useQuery({
    queryFn: () =>
      getProjectEpics({
        limit,
        offset,
        projectId,
      }),
    queryKey: ['project-epics', projectId, currentPage, limit] as const,
    retry: shouldRetryProjectEpicsQuery,
  });
}

export function useMoreProjectEpicsQuery(projectId: string, limit: number) {
  return useInfiniteQuery<
    GetProjectEpicsResponse,
    Error,
    InfiniteData<GetProjectEpicsResponse, number>,
    readonly ['project-epics', string, 'mobile-infinite', number],
    number
  >({
    enabled: false,
    getNextPageParam: (lastPage, _pages, lastPageParam) =>
      lastPageParam * limit < lastPage.totalCount
        ? lastPageParam + 1
        : undefined,
    initialPageParam: 2,
    queryFn: ({ pageParam }) =>
      getProjectEpics({
        limit,
        offset: getPaginationOffset(pageParam, limit),
        projectId,
      }),
    queryKey: ['project-epics', projectId, 'mobile-infinite', limit] as const,
    retry: shouldRetryProjectEpicsQuery,
  });
}
