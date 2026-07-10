import type { TaskDetailsResponse } from '../api';
import type { TaskDetailsPopupDetails } from '../task-details-popup.types';
import { getTaskStatusLabel } from '../../add-new-task-screen/utils';
import {
  getDisplayDate,
  getEpicLabel,
  getRecordText,
  getText,
  mapPerson,
} from './task-details-mapper';
import { isTaskStatus } from './task-update-validation';

export function mapTaskDetails(
  task: TaskDetailsResponse,
): TaskDetailsPopupDetails {
  const status = isTaskStatus(task.status) ? task.status : null;
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
      fallbackJobTitle:
        getText(task.assignee_job_title) ||
        getText(task.assignee_jobTitle) ||
        getText(task.assignee_department) ||
        getText(task.assignee_position),
      person: task.assignee,
      role: 'Assignee',
    }),
    assigneeId:
      getText(task.assignee_id) ||
      getRecordText(task.assignee, [
        'id',
        'member_id',
        'user_id',
        'profile_id',
      ]) ||
      null,
    createdAt: getDisplayDate(task.created_at, 'Unknown'),
    description: getText(task.description) || 'No description provided.',
    descriptionValue: getText(task.description),
    dueDate: getDisplayDate(task.due_date),
    dueDateValue: getText(task.due_date),
    epicId: getText(task.epic_id) || getRecordText(task.epic, ['id']) || null,
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
      fallbackJobTitle:
        getText(task.reporter_job_title) ||
        getText(task.reporter_jobTitle) ||
        getText(task.reporter_department) ||
        getText(task.reporter_position) ||
        getText(task.created_by_job_title) ||
        getText(task.created_by_jobTitle) ||
        getText(task.created_by_department) ||
        getText(task.created_by_position),
      person: reporter,
      role: 'Reporter',
    }),
    status,
    statusLabel: status
      ? getTaskStatusLabel(status)
      : getText(task.status) || 'Unknown status',
    taskKey: getText(task.task_id) || getText(task.id),
    title: getText(task.title) || 'Untitled task',
  };
}
