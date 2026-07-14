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
    !isProjectsUnauthorizedError(error) &&
    failureCount < defaultClientRetryCount
  );
}

export function useProjectsQuery(
  currentPage: number,
  limit: number,
  searchTerm: string,
) {
  const offset = getPaginationOffset(currentPage, limit);

  return useQuery({
    queryFn: () => getProjects({ limit, offset, searchTerm }),
    queryKey: ['projects', currentPage, limit, searchTerm] as const,
    retry: shouldRetryProjectsQuery,
  });
}

export function useMoreProjectsQuery(limit: number, searchTerm: string) {
  return useInfiniteQuery<
    GetProjectsResponse,
    Error,
    InfiniteData<GetProjectsResponse, number>,
    readonly ['projects', 'mobile-infinite', number, string],
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
        searchTerm,
      }),
    queryKey: ['projects', 'mobile-infinite', limit, searchTerm] as const,
    retry: shouldRetryProjectsQuery,
  });
}
