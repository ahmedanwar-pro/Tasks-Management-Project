import { getUserInitials } from '@/components/layout/utils/get-user-initials';
import type { ProjectMemberResponse } from '@/features/members/screens/project-members-list-screen/api';
import type { ProjectTaskResponse } from '../../api';
import type { EpicDetailsTaskAssignee } from '../../types';
import { getMemberAssignee } from './member-assignee';
import {
  getTaskAssigneeAvatarUrl,
  getTaskAssigneeId,
  getTaskAssigneeName,
} from './task-assignee';

export function getTaskAssignee(
  task: ProjectTaskResponse,
  members: ProjectMemberResponse[],
): EpicDetailsTaskAssignee | null {
  const assigneeId = getTaskAssigneeId(task);
  const memberAssignee = assigneeId
    ? getMemberAssignee(assigneeId, members)
    : null;

  if (memberAssignee) {
    return memberAssignee;
  }

  const assigneeName = getTaskAssigneeName(task);
  const assigneeAvatarUrl = getTaskAssigneeAvatarUrl(task);

  if (!assigneeName) {
    return null;
  }

  return {
    avatarUrl: assigneeAvatarUrl || undefined,
    initials: getUserInitials(assigneeName),
    name: assigneeName,
  };
}
