import type { TaskDetailsResponse } from '../api';
import type { TaskDetailsPopupDetails } from '../task-details-popup.types';
import {
  getDisplayDate,
  getEpicLabel,
  getText,
  mapPerson,
} from './task-details-mapper';

export function mapTaskDetails(
  task: TaskDetailsResponse,
): TaskDetailsPopupDetails {
  const reporter =
    task.reporter ??
    task.created_by ??
    task.reporter_name ??
    task.created_by_name;

  return {
    assignee: mapPerson({
      fallbackName:
        getText(task.assignee_name) ||
        getText(task.assignee_full_name) ||
        getText(task.assignee_display_name) ||
        getText(task.assignee_email),
      person: task.assignee,
      role: 'Assignee',
    }),
    createdAt: getDisplayDate(task.created_at, 'Unknown'),
    description: getText(task.description) || 'No description provided.',
    dueDate: getDisplayDate(task.due_date),
    epicLabel: getEpicLabel(task),
    reporter: mapPerson({
      fallbackName:
        getText(task.reporter_name) ||
        getText(task.reporter_full_name) ||
        getText(task.reporter_display_name) ||
        getText(task.reporter_email) ||
        getText(task.created_by_name) ||
        getText(task.created_by_full_name) ||
        getText(task.created_by_display_name) ||
        getText(task.created_by_email),
      person: reporter,
      role: 'Reporter',
    }),
    status: getText(task.status) || 'UNKNOWN',
    taskKey: getText(task.task_id) || getText(task.id),
    title: getText(task.title) || 'Untitled task',
  };
}
