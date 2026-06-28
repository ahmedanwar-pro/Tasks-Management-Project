import type { ProjectTaskResponse } from '../../project-tasks-board-screen/api';
import {
  mapProjectTask,
  projectTasksBoardStatuses,
} from '../../project-tasks-board-screen/utils';
import type { ProjectTasksListItem } from '../types';

function getTaskId(task: ProjectTaskResponse): string {
  return task.task_id?.trim() || task.id;
}

export function mapProjectTaskListItem(
  task: ProjectTaskResponse,
): ProjectTasksListItem {
  const config =
    projectTasksBoardStatuses.find(({ status }) => status === task.status) ??
    projectTasksBoardStatuses[0];

  return {
    ...mapProjectTask(task, config.status),
    statusBadgeClassName: config.badgeClassName,
    statusLabel: config.label,
    taskId: getTaskId(task),
  };
}
