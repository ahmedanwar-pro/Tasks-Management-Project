'use client';

import { useRef, useState } from 'react';
import {
  useMutation,
  useQueryClient,
  type QueryKey,
} from '@tanstack/react-query';
import type { TaskStatus } from '../../../../add-new-task-screen/add-new-task-form-schema';
import type { ProjectTaskResponse } from '../../../../project-tasks-board-screen/api';
import {
  getTaskUpdateField,
  updateTask,
  type TaskDetailsResponse,
  type TaskUpdateField,
  type UpdateTaskRequest,
} from '../../../api';
import { isTaskStatus } from '../../../utils';
import {
  getOptimisticProjectTaskPatch,
  getProjectTaskFieldPatch,
  moveProjectTaskInBoardQueries,
  patchProjectTaskQueries,
} from './update-project-tasks-cache';
import {
  getOptimisticTaskPatch,
  getTaskFieldSnapshot,
  patchTaskDetailsCache,
  type TaskFieldSnapshot,
} from './update-task-details-cache';

type UpdateTaskMutationContext = {
  field: TaskUpdateField;
  initializedBoardQueryKeys: QueryKey[];
  previousField: TaskFieldSnapshot;
  previousProjectTaskField: Partial<ProjectTaskResponse>;
  sourceStatus: TaskStatus | null;
  targetStatus: TaskStatus | null;
};

export function useUpdateTaskMutation(projectId: string, taskId: string) {
  const queryClient = useQueryClient();
  const pendingFieldsRef = useRef(new Set<TaskUpdateField>());
  const [pendingFields, setPendingFields] = useState<Set<TaskUpdateField>>(
    () => new Set(),
  );
  const taskDetailsQueryKey = ['task-details', projectId, taskId] as const;

  function setFieldPending(field: TaskUpdateField, pending: boolean) {
    if (pending) {
      pendingFieldsRef.current.add(field);
    } else {
      pendingFieldsRef.current.delete(field);
    }

    setPendingFields(new Set(pendingFieldsRef.current));
  }

  const mutation = useMutation<
    TaskDetailsResponse[],
    Error,
    UpdateTaskRequest,
    UpdateTaskMutationContext
  >({
    mutationFn: updateTask,
    onMutate: async (request) => {
      const field = getTaskUpdateField(request.updates);

      await queryClient.cancelQueries({
        exact: true,
        queryKey: taskDetailsQueryKey,
      });
      await queryClient.cancelQueries({
        queryKey: ['project-tasks', projectId],
      });

      const current =
        queryClient.getQueryData<TaskDetailsResponse[]>(taskDetailsQueryKey);
      const previousField = getTaskFieldSnapshot(current?.[0], field);
      const previousProjectTaskField = getProjectTaskFieldPatch(
        current?.[0],
        field,
      );
      const sourceStatus = isTaskStatus(current?.[0]?.status)
        ? current[0].status
        : null;
      const targetStatus =
        field === 'status' && isTaskStatus(request.updates.status)
          ? request.updates.status
          : null;

      queryClient.setQueryData<TaskDetailsResponse[]>(
        taskDetailsQueryKey,
        (latest) =>
          patchTaskDetailsCache(latest, getOptimisticTaskPatch(request, field)),
      );

      let initializedBoardQueryKeys: QueryKey[] = [];

      if (sourceStatus && targetStatus && sourceStatus !== targetStatus) {
        initializedBoardQueryKeys = moveProjectTaskInBoardQueries({
          projectId,
          queryClient,
          sourceStatus,
          targetStatus,
          taskId,
        });
      }

      patchProjectTaskQueries({
        includeBoard: field !== 'status',
        patch: getOptimisticProjectTaskPatch(request, field),
        projectId,
        queryClient,
        taskId,
      });

      return {
        field,
        initializedBoardQueryKeys,
        previousField,
        previousProjectTaskField,
        sourceStatus,
        targetStatus,
      };
    },
    onError: (_error, _request, context) => {
      if (!context) {
        return;
      }

      queryClient.setQueryData<TaskDetailsResponse[]>(
        taskDetailsQueryKey,
        (latest) => patchTaskDetailsCache(latest, context.previousField),
      );

      if (
        context.sourceStatus &&
        context.targetStatus &&
        context.sourceStatus !== context.targetStatus
      ) {
        moveProjectTaskInBoardQueries({
          projectId,
          queryClient,
          sourceStatus: context.targetStatus,
          targetStatus: context.sourceStatus,
          taskId,
        });

        context.initializedBoardQueryKeys.forEach((queryKey) => {
          void queryClient.resetQueries({ exact: true, queryKey });
        });
      }

      patchProjectTaskQueries({
        includeBoard: context.field !== 'status',
        patch: context.previousProjectTaskField,
        projectId,
        queryClient,
        taskId,
      });
    },
    onSuccess: (response, _request, context) => {
      const refreshedTask = response[0];

      if (refreshedTask && context) {
        queryClient.setQueryData<TaskDetailsResponse[]>(
          taskDetailsQueryKey,
          (latest) =>
            patchTaskDetailsCache(
              latest,
              getTaskFieldSnapshot(refreshedTask, context.field),
            ),
        );

        patchProjectTaskQueries({
          includeBoard: context.field !== 'status',
          patch: getProjectTaskFieldPatch(refreshedTask, context.field),
          projectId,
          queryClient,
          taskId,
        });
      }
    },
  });

  async function mutateTask(request: UpdateTaskRequest): Promise<void> {
    const field = getTaskUpdateField(request.updates);

    if (pendingFieldsRef.current.has(field)) {
      return;
    }

    setFieldPending(field, true);

    try {
      await mutation.mutateAsync(request);
    } finally {
      setFieldPending(field, false);

      if (pendingFieldsRef.current.size === 0) {
        void queryClient.invalidateQueries({
          exact: true,
          queryKey: taskDetailsQueryKey,
        });
        void queryClient.invalidateQueries({
          queryKey: ['project-tasks', projectId],
        });
      }
    }
  }

  return {
    isFieldPending: (field: TaskUpdateField) => pendingFields.has(field),
    mutateTask,
  };
}
