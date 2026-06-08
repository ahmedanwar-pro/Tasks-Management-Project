import type { ProjectEpicResponse } from '../../types';
import {
  getPersonAvatarUrl,
  getPersonName,
  getText,
} from './project-epic-person-utils';

export function getAssigneeName(epic: ProjectEpicResponse): string {
  const assignee = typeof epic.assignee === 'object' ? epic.assignee : null;
  const assigneeText =
    typeof epic.assignee === 'string' ? epic.assignee : undefined;

  return (
    getPersonName(assignee) ||
    getText(assigneeText) ||
    getText(epic.assignee_name) ||
    getText(epic.assignee_full_name) ||
    getText(epic.assignee_display_name) ||
    getText(epic.assignee_email)
  );
}

export function getAssigneeAvatarUrl(epic: ProjectEpicResponse): string {
  const assignee = typeof epic.assignee === 'object' ? epic.assignee : null;

  return getText(epic.assignee_avatar_url) || getPersonAvatarUrl(assignee);
}

export function getCreatedByName(epic: ProjectEpicResponse): string {
  const createdBy = typeof epic.created_by === 'object' ? epic.created_by : null;
  const createdByText =
    typeof epic.created_by === 'string' ? epic.created_by : undefined;
  const creator = typeof epic.creator === 'object' ? epic.creator : null;
  const creatorText = typeof epic.creator === 'string' ? epic.creator : undefined;

  return (
    getPersonName(createdBy) ||
    getText(createdByText) ||
    getText(epic.created_by_name) ||
    getText(epic.created_by_full_name) ||
    getText(epic.created_by_display_name) ||
    getText(epic.created_by_email) ||
    getPersonName(creator) ||
    getText(creatorText) ||
    getText(epic.creator_name) ||
    getText(epic.creator_full_name) ||
    getText(epic.creator_display_name) ||
    getText(epic.creator_email)
  );
}

export function getCreatedByAvatarUrl(epic: ProjectEpicResponse): string {
  const createdBy = typeof epic.created_by === 'object' ? epic.created_by : null;
  const creator = typeof epic.creator === 'object' ? epic.creator : null;

  return (
    getText(epic.created_by_avatar_url) ||
    getPersonAvatarUrl(createdBy) ||
    getText(epic.creator_avatar_url) ||
    getPersonAvatarUrl(creator)
  );
}
