import { getUserInitials } from '@/components/layout/utils/get-user-initials';
import type { ProjectEpicResponse } from '../../shared/types';
import {
  formatDate,
  getAssigneeAvatarUrl,
  getAssigneeName,
  getCreatedByAvatarUrl,
  getCreatedByName,
  getText,
} from '../../shared/utils';
import type { EpicDetailsDisplayData, EpicDetailsPerson } from '../types';

function mapPerson(person: {
  avatarUrl?: string;
  name: string;
}): EpicDetailsPerson {
  return {
    avatarUrl: person.avatarUrl,
    initials: getUserInitials(person.name),
    name: person.name,
  };
}

function getAssigneeId(epic: ProjectEpicResponse): string | null {
  const assignee = typeof epic.assignee === 'object' ? epic.assignee : null;

  return (
    getText(epic.assignee_id) ||
    getText(assignee?.id) ||
    getText(assignee?.user_id) ||
    getText(assignee?.member_id) ||
    getText(assignee?.profile_id) ||
    null
  );
}

export function getEpicDetailsDisplayData(
  epic: ProjectEpicResponse,
): EpicDetailsDisplayData {
  const assigneeName = getAssigneeName(epic);
  const createdByName = getCreatedByName(epic) || 'Unknown';
  const description = getText(epic.description);

  return {
    assignee: assigneeName
      ? mapPerson({
          avatarUrl: getAssigneeAvatarUrl(epic) || undefined,
          name: assigneeName,
        })
      : null,
    assigneeId: getAssigneeId(epic),
    createdAt: formatDate(epic.created_at),
    createdBy: mapPerson({
      avatarUrl: getCreatedByAvatarUrl(epic) || undefined,
      name: createdByName,
    }),
    deadline: formatDate(epic.deadline),
    description: description || 'No description provided',
    descriptionValue: description,
    epicKey: getText(epic.epic_id) || 'EPIC',
    taskCount: 0,
    title: getText(epic.title) || 'Untitled epic',
  };
}
