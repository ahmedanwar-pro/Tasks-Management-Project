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

export function getEpicDetailsDisplayData(
  epic: ProjectEpicResponse,
): EpicDetailsDisplayData {
  const assigneeName = getAssigneeName(epic);
  const createdByName = getCreatedByName(epic) || 'Unknown';

  return {
    assignee: assigneeName
      ? mapPerson({
          avatarUrl: getAssigneeAvatarUrl(epic) || undefined,
          name: assigneeName,
        })
      : null,
    createdAt: formatDate(epic.created_at),
    createdBy: mapPerson({
      avatarUrl: getCreatedByAvatarUrl(epic) || undefined,
      name: createdByName,
    }),
    deadline: formatDate(epic.deadline),
    description: getText(epic.description) || 'No description provided',
    epicKey: getText(epic.epic_id) || 'EPIC',
    taskCount: 0,
    title: getText(epic.title) || 'Untitled epic',
  };
}
