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
  enabled = true,
) {
  return useQuery({
    enabled,
    queryFn: () =>
      getProjectTasks({
        limit,
        offset: getPaginationOffset(currentPage, limit),
        projectId,
      }),
    queryKey: ['project-tasks', projectId, 'list', currentPage, limit] as const,
    retry: shouldRetryProjectTasksQuery,
  });
}

export function useMoreProjectTasksListQuery(
  projectId: string,
  limit: number,
  enabled: boolean,
) {
  return useInfiniteQuery<
    GetProjectTasksResponse,
    Error,
    InfiniteData<GetProjectTasksResponse, number>,
    readonly ['project-tasks', string, 'list', 'mobile-infinite', number],
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
      }),
    queryKey: [
      'project-tasks',
      projectId,
      'list',
      'mobile-infinite',
      limit,
    ] as const,
    retry: shouldRetryProjectTasksQuery,
  });
}
