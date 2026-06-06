import { getUserInitials } from '@/components/layout/utils/get-user-initials';
import type { ProjectEpicResponse } from '../../api';
import type { ProjectEpicListItem } from '../../types';
import { formatDate, getDateTime } from './project-epic-date-utils';
import {
  getAssigneeAvatarUrl,
  getAssigneeName,
  getCreatedByName,
} from './project-epic-response-utils';
import { getText } from './project-epic-person-utils';

export function mapProjectEpic(epic: ProjectEpicResponse): ProjectEpicListItem {
  const assigneeName = getAssigneeName(epic) || 'Unassigned';
  const createdByName = getCreatedByName(epic) || 'Unknown';

  return {
    assignee: {
      avatarUrl: getAssigneeAvatarUrl(epic) || undefined,
      initials: getUserInitials(assigneeName),
      name: assigneeName,
    },
    createdBy: {
      name: createdByName,
    },
    createdDate: formatDate(epic.created_at),
    createdDateTime: getDateTime(epic.created_at),
    deadline: formatDate(epic.deadline),
    epic_id: getText(epic.epic_id) || 'EPIC',
    id: epic.id,
    title: getText(epic.title) || 'Untitled epic',
  };
}
