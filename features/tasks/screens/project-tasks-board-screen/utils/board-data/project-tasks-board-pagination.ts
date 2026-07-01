import type { TaskStatus } from '../../../add-new-task-screen/add-new-task-form-schema';
import { projectTasksBoardStatuses } from '../project-tasks-board-config';

export const projectTasksBoardPageSize = 5;

export function createProjectTasksStatusRecord<T>(
  createValue: (status: TaskStatus) => T,
): Record<TaskStatus, T> {
  return Object.fromEntries(
    projectTasksBoardStatuses.map(({ status }) => [
      status,
      createValue(status),
    ]),
  ) as Record<TaskStatus, T>;
}
