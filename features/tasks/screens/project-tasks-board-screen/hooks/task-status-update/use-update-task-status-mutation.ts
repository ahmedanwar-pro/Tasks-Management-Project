'use client';

import {
  useMutation,
  useQueryClient,
  type QueryKey,
} from '@tanstack/react-query';
import type { TaskStatus } from '../../../add-new-task-screen/add-new-task-form-schema';
import {
  type GetProjectTasksByStatusPageResponse,
  updateTaskStatus,
} from '../../api';
import {
  findProjectTaskInBoardSnapshot,
  getOptimisticProjectTasksBoardPage,
  isBoardStatus,
  isProjectTasksBoardPageQueryKey,
  type ProjectTasksBoardCacheSnapshot,
  type ProjectTasksBoardCacheScope,
} from '../../utils';

export type UpdateProjectTaskStatusVariables = {
  sourceStatus: TaskStatus;
  targetStatus: TaskStatus;
  taskId: string;
};

type UseUpdateTaskStatusMutationOptions = ProjectTasksBoardCacheScope;

type UpdateProjectTaskStatusContext = {
  initializedTargetQueryKey: QueryKey | null;
  snapshot: ProjectTasksBoardCacheSnapshot;
};

export function useUpdateTaskStatusMutation({
  projectId,
  queryScopeKey,
  searchTerm,
}: UseUpdateTaskStatusMutationOptions) {
  const queryClient = useQueryClient();
  const scope = { projectId, queryScopeKey, searchTerm };
  const matchesBoardScope = (queryKey: readonly unknown[]): boolean =>
    isProjectTasksBoardPageQueryKey(queryKey, scope);

  return useMutation<
    null,
    Error,
    UpdateProjectTaskStatusVariables,
    UpdateProjectTaskStatusContext
  >({
    mutationFn: ({ targetStatus, taskId }) =>
      updateTaskStatus({ status: targetStatus, taskId }),
    onMutate: async ({ sourceStatus, targetStatus, taskId }) => {
      const normalizedTaskId = taskId.trim();

      if (
        !normalizedTaskId ||
        sourceStatus === targetStatus ||
        !isBoardStatus(sourceStatus) ||
        !isBoardStatus(targetStatus)
      ) {
        throw new Error('Invalid task status update');
      }

      await queryClient.cancelQueries({
        predicate: ({ queryKey }) => matchesBoardScope(queryKey),
      });

      const snapshot =
        queryClient.getQueriesData<GetProjectTasksByStatusPageResponse>({
          predicate: ({ queryKey }) => matchesBoardScope(queryKey),
        });
      const task = findProjectTaskInBoardSnapshot(snapshot, normalizedTaskId);

      if (!task) {
        throw new Error('Task is missing from the board cache');
      }

      let initializedTargetQueryKey: QueryKey | null = null;

      snapshot.forEach(([queryKey, page]) => {
        if (!isProjectTasksBoardPageQueryKey(queryKey, scope)) {
          return;
        }

        if (!page) {
          if (queryKey[2] === targetStatus && queryKey[6] === 1) {
            initializedTargetQueryKey = queryKey;
            queryClient.setQueryData<GetProjectTasksByStatusPageResponse>(
              queryKey,
              {
                tasks: [{ ...task, status: targetStatus }],
                totalCount: 1,
              },
            );
          }

          return;
        }

        queryClient.setQueryData<GetProjectTasksByStatusPageResponse>(
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

      return { initializedTargetQueryKey, snapshot };
    },
    onError: (_error, _variables, context) => {
      context?.snapshot.forEach(([queryKey, page]) => {
        if (page === undefined) {
          if (queryKey === context.initializedTargetQueryKey) {
            void queryClient.resetQueries({ exact: true, queryKey });
          }

          return;
        }

        queryClient.setQueryData(queryKey, page);
      });
    },
    onSuccess: (_response, { sourceStatus, targetStatus }) => {
      void queryClient.invalidateQueries({
        predicate: ({ queryKey }) =>
          isProjectTasksBoardPageQueryKey(queryKey, scope) &&
          (queryKey[2] === sourceStatus || queryKey[2] === targetStatus),
      });
    },
  });
}
