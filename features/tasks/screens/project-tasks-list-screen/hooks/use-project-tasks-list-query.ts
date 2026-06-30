'use client';

import {
  type InfiniteData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { getPaginationOffset } from '@/features/shared/utils/pagination';
import { shouldRetryProjectTasksQuery } from '../../project-tasks-board-screen/hooks';
import { getProjectTasks, type GetProjectTasksResponse } from '../api';

export function useProjectTasksListQuery(
  projectId: string,
  currentPage: number,
  limit: number,
  searchTerm: string,
  enabled = true,
) {
  return useQuery({
    enabled,
    queryFn: () =>
      getProjectTasks({
        limit,
        offset: getPaginationOffset(currentPage, limit),
        projectId,
        searchTerm,
      }),
    queryKey: [
      'project-tasks',
      projectId,
      'list',
      searchTerm,
      currentPage,
      limit,
    ] as const,
    retry: shouldRetryProjectTasksQuery,
  });
}

export function useMoreProjectTasksListQuery(
  projectId: string,
  limit: number,
  searchTerm: string,
  enabled: boolean,
) {
  return useInfiniteQuery<
    GetProjectTasksResponse,
    Error,
    InfiniteData<GetProjectTasksResponse, number>,
    readonly [
      'project-tasks',
      string,
      'list',
      'mobile-infinite',
      string,
      number,
    ],
    number
  >({
    enabled,
    getNextPageParam: (lastPage, _pages, lastPageParam) =>
      lastPageParam * limit < lastPage.totalCount
        ? lastPageParam + 1
        : undefined,
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getProjectTasks({
        limit,
        offset: getPaginationOffset(pageParam, limit),
        projectId,
        searchTerm,
      }),
    queryKey: [
      'project-tasks',
      projectId,
      'list',
      'mobile-infinite',
      searchTerm,
      limit,
    ] as const,
    retry: shouldRetryProjectTasksQuery,
  });
}
