'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactElement,
  type ReactNode,
} from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { TaskUpdateField, TaskUpdatePayload } from '../../../api';
import { useUpdateTaskMutation } from '../../../hooks';
import { useTaskDetailsEditingFeedback } from '../hooks/use-task-details-editing-feedback';
import { clearStaleTaskEpicCache } from '../utils/clear-stale-task-epic-cache';

type TaskDetailsEditingContextValue = {
  clearStaleEpic: () => void;
  error: string | null;
  isFieldPending: (field: TaskUpdateField) => boolean;
  projectId: string;
  reportInvalid: () => void;
  saveField: (updates: TaskUpdatePayload) => Promise<void>;
  success: string | null;
};

const TaskDetailsEditingContext =
  createContext<TaskDetailsEditingContextValue | null>(null);

type TaskDetailsEditingProviderProps = {
  children: ReactNode;
  projectId: string;
  taskId: string;
};

export function TaskDetailsEditingProvider({
  children,
  projectId,
  taskId,
}: TaskDetailsEditingProviderProps): ReactElement {
  const queryClient = useQueryClient();
  const {
    clearFeedback,
    error,
    reportInvalid,
    reportSaveError,
    reportSaveSuccess,
    success,
  } = useTaskDetailsEditingFeedback();
  const { isFieldPending, mutateTask } = useUpdateTaskMutation(
    projectId,
    taskId,
  );

  const clearStaleEpic = useCallback(() => {
    clearStaleTaskEpicCache({ projectId, queryClient, taskId });
  }, [projectId, queryClient, taskId]);

  const saveField = useCallback(
    async (updates: TaskUpdatePayload) => {
      clearFeedback();

      try {
        await mutateTask({ projectId, taskId, updates });
        reportSaveSuccess();
      } catch (saveError) {
        reportSaveError();
        throw saveError;
      }
    },
    [
      clearFeedback,
      mutateTask,
      projectId,
      reportSaveError,
      reportSaveSuccess,
      taskId,
    ],
  );

  const value = useMemo<TaskDetailsEditingContextValue>(
    () => ({
      clearStaleEpic,
      error,
      isFieldPending,
      projectId,
      reportInvalid,
      saveField,
      success,
    }),
    [
      clearStaleEpic,
      error,
      isFieldPending,
      projectId,
      reportInvalid,
      saveField,
      success,
    ],
  );

  return (
    <TaskDetailsEditingContext.Provider value={value}>
      {children}
    </TaskDetailsEditingContext.Provider>
  );
}

export function useTaskDetailsEditing(): TaskDetailsEditingContextValue {
  const context = useContext(TaskDetailsEditingContext);

  if (!context) {
    throw new Error(
      'Task details editable fields require an editing provider.',
    );
  }

  return context;
}
