import { getUserInitials } from '@/components/layout/utils/get-user-initials';
import type { ProjectEpicResponse } from '../../shared/types';
import {
  formatDate,
  getAssigneeAvatarUrl,
  getAssigneeName,
  getCreatedByName,
  getDateTime,
  getText,
} from '../../shared/utils';
import type { ProjectEpicListItem } from '../types';

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
