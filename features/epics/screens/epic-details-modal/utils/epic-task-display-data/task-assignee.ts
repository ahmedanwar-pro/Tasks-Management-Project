import type { ProjectTaskResponse } from '../../api';
import { getText } from './text';

export function getTaskAssigneeId(task: ProjectTaskResponse): string {
  const assignee = typeof task.assignee === 'object' ? task.assignee : null;

  return (
    getText(task.assignee_id) ||
    getText(assignee?.id) ||
    getText(assignee?.user_id) ||
    getText(assignee?.member_id) ||
    getText(assignee?.profile_id)
  );
}

export function getTaskAssigneeName(task: ProjectTaskResponse): string {
  const assignee = typeof task.assignee === 'object' ? task.assignee : null;
  const assigneeText =
    typeof task.assignee === 'string' ? task.assignee : undefined;

  return (
    getText(assignee?.name) ||
    getText(assignee?.full_name) ||
    getText(assignee?.display_name) ||
    getText(assignee?.email) ||
    getText(assigneeText) ||
    getText(task.assignee_name) ||
    getText(task.assignee_full_name) ||
    getText(task.assignee_display_name) ||
    getText(task.assignee_email)
  );
}

export function getTaskAssigneeAvatarUrl(task: ProjectTaskResponse): string {
  const assignee = typeof task.assignee === 'object' ? task.assignee : null;

  return (
    getText(task.assignee_avatar) ||
    getText(task.assignee_avatar_url) ||
    getText(assignee?.avatar_url)
  );
}
