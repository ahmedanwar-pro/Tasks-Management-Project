import { getUserInitials } from '@/components/layout/utils/get-user-initials';
import type { ProjectEpicResponse } from '../../shared/types';
import {
  formatDate,
  getDateTime,
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

function getDateInputValue(value?: string | null): string {
  const text = getDateTime(value);

  if (!text) {
    return '';
  }

  const [datePart] = text.split('T');

  if (/^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
    return datePart;
  }

  const date = new Date(text);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
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
    deadlineValue: getDateInputValue(epic.deadline),
    description: description || 'No description provided',
    descriptionValue: description,
    epicKey: getText(epic.epic_id) || 'EPIC',
    taskCount: 0,
    title: getText(epic.title) || 'Untitled epic',
  };
}
