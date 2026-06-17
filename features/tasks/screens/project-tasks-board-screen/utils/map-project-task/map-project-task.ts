import type { TaskStatus } from '../../../add-new-task-screen/add-new-task-form-schema';
import type { ProjectTaskResponse } from '../../api';
import type { ProjectTasksBoardTask } from '../../types';
import { getTaskAssignee } from './map-project-task-assignee';
import {
  getTaskDueDate,
  getTaskDueDateTime,
  isTaskOverdue,
} from './map-project-task-due-date';
import { getStatus } from './map-project-task-status';
import { getText } from './map-project-task-text';

export function mapProjectTask(
  task: ProjectTaskResponse,
  status: TaskStatus,
): ProjectTasksBoardTask {
  const taskStatus = getStatus(status, task.status);

  return {
    assignee: getTaskAssignee(task),
    dueDate: getTaskDueDate(task.due_date),
    dueDateTime: getTaskDueDateTime(task.due_date),
    id: task.id,
    isDone: taskStatus === 'DONE',
    isOverdue: isTaskOverdue(task.due_date),
    status: taskStatus,
    title: getText(task.title) || 'Untitled task',
  };
}
