import type { QueryClient, QueryKey } from '@tanstack/react-query';
import type { TaskStatus } from '../../../../add-new-task-screen/add-new-task-form-schema';
import type { ProjectTaskResponse } from '../../../../project-tasks-board-screen/api';
import {
  findProjectTaskInBoardSnapshot,
  getOptimisticProjectTasksBoardPage,
  type ProjectTasksBoardCacheSnapshot,
} from '../../../../project-tasks-board-screen/utils';
import type {
  TaskDetailsResponse,
  TaskUpdateField,
  UpdateTaskRequest,
} from '../../../api';
import {
  getProjectTasksBoardScopeKey,
  isProjectTasksBoardPageQueryKeyForProject,
  isProjectTasksQueryKey,
  patchProjectTaskCacheData,
  type ProjectTasksCachePage,
} from '../../../utils';

export function getProjectTaskFieldPatch(
  task: TaskDetailsResponse | undefined,
  field: TaskUpdateField,
): Partial<ProjectTaskResponse> {
  if (!task) {
    return {};
  }

  if (field === 'assignee_id') {
    return {
      assignee: task.assignee,
      assignee_display_name: task.assignee_display_name,
      assignee_email: task.assignee_email,
      assignee_full_name: task.assignee_full_name,
      assignee_id: task.assignee_id,
      assignee_name: task.assignee_name,
    };
  }

  if (field === 'description') {
    return {};
  }

  return { [field]: task[field] } as Partial<ProjectTaskResponse>;
}

export function getOptimisticProjectTaskPatch(
  request: UpdateTaskRequest,
  field: TaskUpdateField,
): Partial<ProjectTaskResponse> {
  const value = request.updates[field];

  if (field === 'description') {
    return {};
  }

  if (field === 'assignee_id') {
    return {
      assignee: null,
      assignee_display_name: null,
      assignee_email: null,
      assignee_full_name: null,
      assignee_id: value as string | null,
      assignee_name: null,
    };
  }

  return { [field]: value } as Partial<ProjectTaskResponse>;
}

export function patchProjectTaskQueries({
  includeBoard,
  patch,
  projectId,
  queryClient,
  taskId,
}: {
  includeBoard: boolean;
  patch: Partial<ProjectTaskResponse>;
  projectId: string;
  queryClient: QueryClient;
  taskId: string;
}) {
  if (Object.keys(patch).length === 0) {
    return;
  }

  queryClient.setQueriesData(
    {
      predicate: ({ queryKey }) =>
        isProjectTasksQueryKey(queryKey, projectId) &&
        (includeBoard ||
          !isProjectTasksBoardPageQueryKeyForProject(queryKey, projectId)),
    },
    (data) => patchProjectTaskCacheData(data, taskId, patch),
  );
}

export function moveProjectTaskInBoardQueries({
  projectId,
  queryClient,
  sourceStatus,
  targetStatus,
  taskId,
}: {
  projectId: string;
  queryClient: QueryClient;
  sourceStatus: TaskStatus;
  targetStatus: TaskStatus;
  taskId: string;
}): QueryKey[] {
  const boardSnapshot = queryClient.getQueriesData<ProjectTasksCachePage>({
    predicate: ({ queryKey }) =>
      isProjectTasksBoardPageQueryKeyForProject(queryKey, projectId),
  });
  const snapshotsByScope = new Map<string, ProjectTasksBoardCacheSnapshot>();

  boardSnapshot.forEach(([queryKey, page]) => {
    if (!isProjectTasksBoardPageQueryKeyForProject(queryKey, projectId)) {
      return;
    }

    const scopeKey = getProjectTasksBoardScopeKey(queryKey);
    const scopeSnapshot = snapshotsByScope.get(scopeKey) ?? [];
    scopeSnapshot.push([queryKey, page]);
    snapshotsByScope.set(scopeKey, scopeSnapshot);
  });

  const initializedBoardQueryKeys: QueryKey[] = [];

  snapshotsByScope.forEach((snapshot) => {
    const task = findProjectTaskInBoardSnapshot(snapshot, taskId);

    if (!task) {
      return;
    }

    snapshot.forEach(([queryKey, page]) => {
      if (!isProjectTasksBoardPageQueryKeyForProject(queryKey, projectId)) {
        return;
      }

      if (!page) {
        if (queryKey[2] === targetStatus && queryKey[6] === 1) {
          initializedBoardQueryKeys.push(queryKey);
          queryClient.setQueryData<ProjectTasksCachePage>(queryKey, {
            tasks: [{ ...task, status: targetStatus }],
            totalCount: 1,
          });
        }

        return;
      }

      queryClient.setQueryData<ProjectTasksCachePage>(
        queryKey,
        getOptimisticProjectTasksBoardPage({
          page,
          pageNumber: queryKey[6],
          sourceStatus,
          status: queryKey[2],
          targetStatus,
          task,
        }),
      );
    });
  });

  return initializedBoardQueryKeys;
}
