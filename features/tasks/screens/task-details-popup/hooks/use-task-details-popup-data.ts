'use client';

import type {
  RefetchOptions,
  QueryObserverResult,
} from '@tanstack/react-query';
import { isProjectUnauthorizedError } from '@/features/projects/screens/edit-project-screen/api';
import { useEpicAuthRedirect } from '@/features/epics/screens/shared/hooks';
import type { TaskDetailsResponse } from '../api';
import { useTaskDetailsQuery } from './use-task-details-query';

type UseTaskDetailsPopupDataResult = {
  data: TaskDetailsResponse[] | undefined;
  error: Error | null;
  isPending: boolean;
  isUnauthorized: boolean;
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<TaskDetailsResponse[], Error>>;
};

export function useTaskDetailsPopupData(
  projectId: string,
  taskId: string,
): UseTaskDetailsPopupDataResult {
  const { data, error, isPending, refetch } = useTaskDetailsQuery(
    projectId,
    taskId,
  );
  const isUnauthorized = isProjectUnauthorizedError(error);

  useEpicAuthRedirect(isUnauthorized);

  return {
    data,
    error,
    isPending,
    isUnauthorized,
    refetch,
  };
}
