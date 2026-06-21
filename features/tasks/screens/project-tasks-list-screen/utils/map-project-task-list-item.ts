import type { ProjectTaskResponse } from '../../project-tasks-board-screen/api';
import { mapProjectTask } from '../../project-tasks-board-screen/utils';
import type { BoardStatusConfig } from '../../project-tasks-board-screen/types';
import type { ProjectTasksListItem } from '../types';

function getTaskId(task: ProjectTaskResponse): string {
  return task.task_id?.trim() || task.id;
}

export function mapProjectTaskListItem(
  task: ProjectTaskResponse,
  config: BoardStatusConfig,
): ProjectTasksListItem {
  return {
    ...mapProjectTask(task, config.status),
    statusBadgeClassName: config.badgeClassName,
    statusLabel: config.label,
    taskId: getTaskId(task),
  };
}
