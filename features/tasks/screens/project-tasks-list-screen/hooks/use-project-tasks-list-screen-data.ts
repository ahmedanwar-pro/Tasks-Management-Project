'use client';

import { useQueries } from '@tanstack/react-query';
import { useCallback } from 'react';
import { isProjectUnauthorizedError } from '@/features/projects/screens/edit-project-screen/api';
import { getProjectTasksByStatus } from '../../project-tasks-board-screen/api';
import { shouldRetryProjectTasksQuery } from '../../project-tasks-board-screen/hooks';
import { projectTasksBoardStatuses } from '../../project-tasks-board-screen/utils';
import type { ProjectTasksListScreenData } from '../types';
import { mapProjectTaskListItem } from '../utils';

export function useProjectTasksListScreenData(
  projectId: string,
): ProjectTasksListScreenData {
  const queryResults = useQueries({
    queries: projectTasksBoardStatuses.map((config) => ({
      queryFn: () =>
        getProjectTasksByStatus({ projectId, status: config.status }),
      queryKey: ['project-tasks', projectId, config.status] as const,
      retry: shouldRetryProjectTasksQuery,
    })),
  });
  const tasks = queryResults.flatMap((result, index) => {
    const config = projectTasksBoardStatuses[index];

    return (result.data ?? []).map((task) =>
      mapProjectTaskListItem(task, config),
    );
  });
  const isUnauthorized = queryResults.some((result) =>
    isProjectUnauthorizedError(result.error),
  );
  const hasLoadedTasks = tasks.length > 0;
  const hasPendingQueries = queryResults.some((result) => result.isPending);
  const hasNonUnauthorizedError =
    !isUnauthorized && queryResults.some((result) => Boolean(result.error));
  const isLoading =
    isUnauthorized || (hasPendingQueries && !hasLoadedTasks);
  const isError = hasNonUnauthorizedError && !hasLoadedTasks;
  const hasPartialError = hasNonUnauthorizedError && hasLoadedTasks;
  const onRetry = useCallback(() => {
    queryResults.forEach((result) => {
      if (result.error) {
        void result.refetch();
      }
    });
  }, [queryResults]);

  return {
    hasPartialError,
    isError,
    isLoading,
    isUnauthorized,
    onRetry,
    tasks,
  };
}
