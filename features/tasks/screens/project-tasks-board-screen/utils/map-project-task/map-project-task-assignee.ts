import { getUserInitials } from '@/components/layout/utils/get-user-initials';
import type { ProjectTaskResponse } from '../../api';
import type { ProjectTasksBoardAssignee } from '../../types';
import { getText } from './map-project-task-text';

function getTaskAssigneeName(task: ProjectTaskResponse): string {
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

function getTaskAssigneeAvatarUrl(task: ProjectTaskResponse): string {
  const assignee = typeof task.assignee === 'object' ? task.assignee : null;

  return (
    getText(task.assignee_avatar) ||
    getText(task.assignee_avatar_url) ||
    getText(assignee?.avatar_url)
  );
}

export function getTaskAssignee(
  task: ProjectTaskResponse,
): ProjectTasksBoardAssignee | null {
  const name = getTaskAssigneeName(task);

  if (!name) {
    return null;
  }

  return {
    avatarUrl: getTaskAssigneeAvatarUrl(task) || undefined,
    initials: getUserInitials(name),
    name,
  };
}
