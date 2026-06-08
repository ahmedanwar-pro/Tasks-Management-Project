'use client';

import {
  type InfiniteData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { getPaginationOffset } from '@/features/shared/utils/pagination';
import { shouldRetryEpicQuery } from '../../shared/hooks';
import { getProjectEpics, type GetProjectEpicsResponse } from '../api';

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
    retry: shouldRetryEpicQuery,
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
    retry: shouldRetryEpicQuery,
  });
}
