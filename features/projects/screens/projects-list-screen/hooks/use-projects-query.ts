'use client';

import {
  type InfiniteData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import {
  getProjects,
  type GetProjectsResponse,
  isProjectsUnauthorizedError,
} from '../api/get-projects';
import { getPaginationOffset } from '@/features/shared/utils/pagination';

const defaultClientRetryCount = 3;

function shouldRetryProjectsQuery(failureCount: number, error: Error) {
  return (
    !isProjectsUnauthorizedError(error) && failureCount < defaultClientRetryCount
  );
}

export function useProjectsQuery(currentPage: number, limit: number) {
  const offset = getPaginationOffset(currentPage, limit);

  return useQuery({
    queryFn: () => getProjects({ limit, offset }),
    queryKey: ['projects', currentPage, limit] as const,
    retry: shouldRetryProjectsQuery,
  });
}

export function useMoreProjectsQuery(limit: number) {
  return useInfiniteQuery<
    GetProjectsResponse,
    Error,
    InfiniteData<GetProjectsResponse, number>,
    readonly ['projects', 'mobile-infinite', number],
    number
  >({
    enabled: false,
    getNextPageParam: (lastPage, _pages, lastPageParam) =>
      lastPageParam * limit < lastPage.totalCount
        ? lastPageParam + 1
        : undefined,
    initialPageParam: 2,
    queryFn: ({ pageParam }) =>
      getProjects({
        limit,
        offset: getPaginationOffset(pageParam, limit),
      }),
    queryKey: ['projects', 'mobile-infinite', limit] as const,
    retry: shouldRetryProjectsQuery,
  });
}
