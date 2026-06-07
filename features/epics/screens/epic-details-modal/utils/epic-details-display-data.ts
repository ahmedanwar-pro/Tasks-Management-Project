import { getUserInitials } from '@/components/layout/utils/get-user-initials';
import { formatDisplayDate } from '@/features/shared/utils/date-format';
import type { EpicDetailsDisplayData, EpicDetailsPerson } from '../types';

type EpicDetailsPreviewData = {
  assignee?: {
    avatarUrl?: string;
    name?: string;
  } | null;
  createdAt: string;
  createdBy: {
    avatarUrl?: string;
    name: string;
  };
  deadline: string;
  description?: string | null;
  epicKey: string;
  title: string;
};

const previewEpicDetails: EpicDetailsPreviewData = {
  assignee: null,
  createdAt: '2025-12-01',
  createdBy: {
    name: 'Elena Lopez',
  },
  deadline: '2025-12-01',
  description: '',
  epicKey: 'EPIC-201',
  title: 'Infrastructure epic',
};

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

export function getEpicDetailsDisplayData(): EpicDetailsDisplayData {
  const assigneeName = previewEpicDetails.assignee?.name?.trim();

  return {
    assignee: assigneeName
      ? mapPerson({
          avatarUrl: previewEpicDetails.assignee?.avatarUrl,
          name: assigneeName,
        })
      : null,
    createdAt: formatDisplayDate(
      previewEpicDetails.createdAt,
      previewEpicDetails.createdAt,
    ),
    createdBy: mapPerson(previewEpicDetails.createdBy),
    deadline: formatDisplayDate(previewEpicDetails.deadline, previewEpicDetails.deadline),
    description: previewEpicDetails.description?.trim() || 'No description provided',
    epicKey: previewEpicDetails.epicKey,
    taskCount: 0,
    title: previewEpicDetails.title,
  };
}
