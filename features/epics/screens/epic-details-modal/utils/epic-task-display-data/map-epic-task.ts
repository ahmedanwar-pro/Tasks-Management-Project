import type { ProjectMemberResponse } from '@/features/members/screens/project-members-list-screen/api';
import type { ProjectTaskResponse } from '../../api';
import type { EpicDetailsTask } from '../../types';
import { getTaskAssignee } from './assignee';
import { getTaskDueDate, getTaskDueDateTime, isTaskOverdue } from './due-date';
import { getText } from './text';

export function mapEpicTask(
  task: ProjectTaskResponse,
  members: ProjectMemberResponse[] = [],
): EpicDetailsTask {
  return {
    assignee: getTaskAssignee(task, members),
    dueDate: getTaskDueDate(task.due_date),
    dueDateTime: getTaskDueDateTime(task.due_date),
    id: task.id,
    isOverdue: isTaskOverdue(task.due_date),
    title: getText(task.title) || 'Untitled task',
  };
}
