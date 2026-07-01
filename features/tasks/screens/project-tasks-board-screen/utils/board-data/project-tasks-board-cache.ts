import type { QueryKey } from '@tanstack/react-query';
import type { TaskStatus } from '../../../add-new-task-screen/add-new-task-form-schema';
import type {
  GetProjectTasksByStatusPageResponse,
  ProjectTaskResponse,
} from '../../api';
import { isBoardStatus } from '../project-tasks-board-config';

export type ProjectTasksBoardCacheScope = {
  projectId: string;
  queryScopeKey: string;
  searchTerm: string;
};

export type ProjectTasksBoardCacheSnapshot = Array<
  [QueryKey, GetProjectTasksByStatusPageResponse | undefined]
>;

type ProjectTasksBoardPageQueryKey = readonly [
  'project-tasks',
  string,
  TaskStatus,
  'board-infinite',
  string,
  string,
  number,
  number,
];

export function isProjectTasksBoardPageQueryKey(
  queryKey: QueryKey,
  scope: ProjectTasksBoardCacheScope,
): queryKey is ProjectTasksBoardPageQueryKey {
  return (
    queryKey[0] === 'project-tasks' &&
    queryKey[1] === scope.projectId &&
    typeof queryKey[2] === 'string' &&
    isBoardStatus(queryKey[2]) &&
    queryKey[3] === 'board-infinite' &&
    queryKey[4] === scope.queryScopeKey &&
    queryKey[5] === scope.searchTerm &&
    typeof queryKey[6] === 'number' &&
    typeof queryKey[7] === 'number'
  );
}

export function findProjectTaskInBoardSnapshot(
  snapshot: ProjectTasksBoardCacheSnapshot,
  taskId: string,
): ProjectTaskResponse | null {
  for (const [, page] of snapshot) {
    const task = page?.tasks.find((candidate) => candidate.id === taskId);

    if (task) {
      return task;
    }
  }

  return null;
}

type GetOptimisticProjectTasksBoardPageOptions = {
  page: GetProjectTasksByStatusPageResponse;
  pageNumber: number;
  sourceStatus: TaskStatus;
  status: TaskStatus;
  targetStatus: TaskStatus;
  task: ProjectTaskResponse;
};

export function getOptimisticProjectTasksBoardPage({
  page,
  pageNumber,
  sourceStatus,
  status,
  targetStatus,
  task,
}: GetOptimisticProjectTasksBoardPageOptions): GetProjectTasksByStatusPageResponse {
  if (status !== sourceStatus && status !== targetStatus) {
    return page;
  }

  const tasksWithoutMovedTask = page.tasks.filter(
    (candidate) => candidate.id !== task.id,
  );

  if (status === sourceStatus) {
    return {
      tasks: tasksWithoutMovedTask,
      totalCount: Math.max(0, page.totalCount - 1),
    };
  }

  const optimisticTask: ProjectTaskResponse = {
    ...task,
    status: targetStatus,
  };

  return {
    tasks:
      pageNumber === 1
        ? [optimisticTask, ...tasksWithoutMovedTask]
        : tasksWithoutMovedTask,
    totalCount: page.totalCount + 1,
  };
}
