'use client';

import { useQueries, useQueryClient } from '@tanstack/react-query';
import { getPaginationOffset } from '@/features/shared/utils/pagination';
import type { TaskStatus } from '../../../add-new-task-screen/add-new-task-form-schema';
import {
  getProjectTasksByStatus,
  type GetProjectTasksByStatusPageResponse,
} from '../../api';
import type { ProjectTasksBoardQueryDefinition } from '../../types';
import {
  projectTasksBoardPageSize,
  projectTasksBoardStatuses,
} from '../../utils';
import { shouldRetryProjectTasksQuery } from './use-project-tasks-by-status-query';

type UseProjectTasksBoardQueriesOptions = {
  currentPage: number;
  projectId: string;
  queryScopeKey: string;
  searchTerm: string;
};

export function getProjectTasksBoardQueryKey(
  projectId: string,
  status: TaskStatus,
  queryScopeKey: string,
  searchTerm: string,
  page: number,
) {
  return [
    'project-tasks',
    projectId,
    status,
    'board-infinite',
    queryScopeKey,
    searchTerm,
    page,
    projectTasksBoardPageSize,
  ] as const;
}

export function useProjectTasksBoardQueries({
  currentPage,
  projectId,
  queryScopeKey,
  searchTerm,
}: UseProjectTasksBoardQueriesOptions) {
  const queryClient = useQueryClient();
  const queryDefinitions: ProjectTasksBoardQueryDefinition[] = [];
  const latestTotalCountByStatus = new Map<TaskStatus, number>();

  for (let page = 1; page <= currentPage; page += 1) {
    projectTasksBoardStatuses.forEach(({ status }) => {
      const offset = getPaginationOffset(page, projectTasksBoardPageSize);
      const enabled =
        page === 1 || offset < (latestTotalCountByStatus.get(status) ?? 0);
      const pageData =
        queryClient.getQueryData<GetProjectTasksByStatusPageResponse>(
          getProjectTasksBoardQueryKey(
            projectId,
            status,
            queryScopeKey,
            searchTerm,
            page,
          ),
        );

      queryDefinitions.push({ enabled, page, status });

      if (enabled && pageData) {
        latestTotalCountByStatus.set(status, pageData.totalCount);
      }
    });
  }

  const queryResults = useQueries({
    queries: queryDefinitions.map(({ enabled, page, status }) => ({
      enabled,
      queryFn: () =>
        getProjectTasksByStatus({
          limit: projectTasksBoardPageSize,
          offset: getPaginationOffset(page, projectTasksBoardPageSize),
          projectId,
          searchTerm,
          status,
        }),
      queryKey: getProjectTasksBoardQueryKey(
        projectId,
        status,
        queryScopeKey,
        searchTerm,
        page,
      ),
      retry: shouldRetryProjectTasksQuery,
    })),
  });

  return { queryDefinitions, queryResults };
}
