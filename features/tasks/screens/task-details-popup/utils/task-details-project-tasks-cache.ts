import type { InfiniteData, QueryKey } from '@tanstack/react-query';
import type { TaskStatus } from '../../add-new-task-screen/add-new-task-form-schema';
import type { ProjectTaskResponse } from '../../project-tasks-board-screen/api';
import { isBoardStatus } from '../../project-tasks-board-screen/utils';

export type ProjectTasksCachePage = {
  tasks: ProjectTaskResponse[];
  totalCount: number;
};

export type ProjectTasksBoardPageQueryKey = readonly [
  'project-tasks',
  string,
  TaskStatus,
  'board-infinite',
  string,
  string,
  number,
  number,
];

function isProjectTasksCachePage(
  value: unknown,
): value is ProjectTasksCachePage {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const page = value as Partial<ProjectTasksCachePage>;
  return Array.isArray(page.tasks) && typeof page.totalCount === 'number';
}

function isProjectTasksInfiniteData(
  value: unknown,
): value is InfiniteData<ProjectTasksCachePage, unknown> {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const infiniteData = value as Partial<
    InfiniteData<ProjectTasksCachePage, unknown>
  >;
  return (
    Array.isArray(infiniteData.pages) &&
    infiniteData.pages.every(isProjectTasksCachePage) &&
    Array.isArray(infiniteData.pageParams)
  );
}

function patchTaskInPage(
  page: ProjectTasksCachePage,
  taskId: string,
  patch: Partial<ProjectTaskResponse>,
): ProjectTasksCachePage {
  let changed = false;
  const tasks = page.tasks.map((task) => {
    if (task.id !== taskId) {
      return task;
    }

    changed = true;
    return { ...task, ...patch };
  });

  return changed ? { ...page, tasks } : page;
}

export function patchProjectTaskCacheData(
  data: unknown,
  taskId: string,
  patch: Partial<ProjectTaskResponse>,
): unknown {
  if (isProjectTasksCachePage(data)) {
    return patchTaskInPage(data, taskId, patch);
  }

  if (isProjectTasksInfiniteData(data)) {
    const pages = data.pages.map((page) =>
      patchTaskInPage(page, taskId, patch),
    );

    if (pages.every((page, index) => page === data.pages[index])) {
      return data;
    }

    return { ...data, pages };
  }

  return data;
}

export function isProjectTasksQueryKey(
  queryKey: QueryKey,
  projectId: string,
): boolean {
  return queryKey[0] === 'project-tasks' && queryKey[1] === projectId;
}

export function isProjectTasksBoardPageQueryKeyForProject(
  queryKey: QueryKey,
  projectId: string,
): queryKey is ProjectTasksBoardPageQueryKey {
  return (
    isProjectTasksQueryKey(queryKey, projectId) &&
    typeof queryKey[2] === 'string' &&
    isBoardStatus(queryKey[2]) &&
    queryKey[3] === 'board-infinite' &&
    typeof queryKey[4] === 'string' &&
    typeof queryKey[5] === 'string' &&
    typeof queryKey[6] === 'number' &&
    typeof queryKey[7] === 'number'
  );
}

export function getProjectTasksBoardScopeKey(
  queryKey: ProjectTasksBoardPageQueryKey,
): string {
  return JSON.stringify([queryKey[4], queryKey[5]]);
}
