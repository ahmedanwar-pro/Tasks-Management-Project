import type { QueryClient } from '@tanstack/react-query';
import type { TaskDetailsResponse } from '../../../api';

export function clearStaleTaskEpicCache({
  projectId,
  queryClient,
  taskId,
}: {
  projectId: string;
  queryClient: QueryClient;
  taskId: string;
}) {
  queryClient.setQueryData<TaskDetailsResponse[]>(
    ['task-details', projectId, taskId],
    (current) => {
      const task = current?.[0];

      if (
        !task ||
        (task.epic_id == null &&
          task.epic == null &&
          task.epic_key == null &&
          task.epic_label == null &&
          task.epic_title == null)
      ) {
        return current;
      }

      return [
        {
          ...task,
          epic: null,
          epic_id: null,
          epic_key: null,
          epic_label: null,
          epic_title: null,
        },
        ...current.slice(1),
      ];
    },
  );
}
