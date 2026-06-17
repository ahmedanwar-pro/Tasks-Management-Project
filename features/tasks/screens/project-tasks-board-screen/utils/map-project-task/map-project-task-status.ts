import type { TaskStatus } from '../../../add-new-task-screen/add-new-task-form-schema';
import { isBoardStatus } from '../project-tasks-board-config';
import { getText } from './map-project-task-text';

export function getStatus(
  status: TaskStatus,
  taskStatus?: string | null,
): TaskStatus {
  const responseStatus = getText(taskStatus);

  return isBoardStatus(responseStatus) ? responseStatus : status;
}
