import type { UseQueryResult } from '@tanstack/react-query';
import type {
  GetProjectTasksByStatusPageResponse,
  ProjectTaskResponse,
} from '../api';
import type {
  ProjectTasksBoardColumnData,
  ProjectTasksBoardQueryDefinition,
} from '../types';
import { getPaginationOffset } from '@/features/shared/utils/pagination';
import { mapProjectTask } from './map-project-task';
import { mergeProjectTaskResponses } from './merge-project-task-responses';
import {
  createProjectTasksStatusRecord,
  projectTasksBoardPageSize,
} from './project-tasks-board-pagination';
import { projectTasksBoardStatuses } from './project-tasks-board-config';

type ProjectTasksBoardQueryResult = UseQueryResult<
  GetProjectTasksByStatusPageResponse,
  Error
>;

type ProjectTasksBoardQueryData = {
  columns: ProjectTasksBoardColumnData[];
  currentPageResults: ProjectTasksBoardQueryResult[];
  hasNextPage: boolean;
  initialError: Error | null;
  isFetchingNextPage: boolean;
  loadMoreError: Error | null;
};

export function getProjectTasksBoardQueryData(
  currentPage: number,
  queryDefinitions: ProjectTasksBoardQueryDefinition[],
  queryResults: ProjectTasksBoardQueryResult[],
): ProjectTasksBoardQueryData {
  const taskResponsesByStatus = createProjectTasksStatusRecord<
    ProjectTaskResponse[]
  >(() => []);
  const totalCountByStatus = createProjectTasksStatusRecord<number>(() => 0);

  queryDefinitions.forEach((definition, index) => {
    if (!definition.enabled) {
      return;
    }

    const pageData = queryResults[index]?.data;

    if (!pageData) {
      return;
    }

    taskResponsesByStatus[definition.status] = mergeProjectTaskResponses(
      taskResponsesByStatus[definition.status],
      pageData.tasks,
    );
    totalCountByStatus[definition.status] = pageData.totalCount;
  });

  const currentPageResults = queryResults.filter(
    (_result, index) =>
      queryDefinitions[index]?.enabled &&
      queryDefinitions[index]?.page === currentPage,
  );
  const firstPageResults = queryResults.filter(
    (_result, index) => queryDefinitions[index]?.page === 1,
  );
  const isFetchingNextPage =
    currentPage > 1 &&
    currentPageResults.some((result) => result.isFetching || result.isPending);
  const loadMoreError =
    currentPage > 1 && !isFetchingNextPage
      ? (currentPageResults.find((result) => result.error)?.error ?? null)
      : null;
  const initialError =
    firstPageResults.find((result) => result.error)?.error ?? null;
  const nextPageOffset = getPaginationOffset(
    currentPage + 1,
    projectTasksBoardPageSize,
  );
  const hasNextPage = currentPageResults.some(
    (result) =>
      !result.error &&
      Boolean(result.data) &&
      nextPageOffset < (result.data?.totalCount ?? 0),
  );
  const columns = projectTasksBoardStatuses.map((config) => {
    const firstPageIndex = queryDefinitions.findIndex(
      (definition) =>
        definition.page === 1 && definition.status === config.status,
    );
    const firstPageResult = queryResults[firstPageIndex];

    return {
      config,
      error: firstPageResult?.error ?? null,
      isPending: Boolean(firstPageResult?.isPending),
      onRetry: () => {
        void firstPageResult?.refetch();
      },
      tasks: taskResponsesByStatus[config.status].map((task) =>
        mapProjectTask(task, config.status),
      ),
      totalCount: totalCountByStatus[config.status],
    };
  });

  return {
    columns,
    currentPageResults,
    hasNextPage,
    initialError,
    isFetchingNextPage,
    loadMoreError,
  };
}
