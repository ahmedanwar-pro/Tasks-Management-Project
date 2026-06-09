'use client';

import { mapAssigneeOption } from '@/features/epics/screens/add-new-epic-screen/utils';
import { useProjectMembersQuery } from '@/features/members/screens/project-members-list-screen/hooks';

type UseAssigneeMemberOptionsParams = {
  isEditing: boolean;
  projectId: string;
};

export function useAssigneeMemberOptions({
  isEditing,
  projectId,
}: UseAssigneeMemberOptionsParams) {
  const { data, error, isPending } = useProjectMembersQuery(projectId, isEditing);
  const members = (data?.members ?? []).map(mapAssigneeOption);

  return {
    hasError: Boolean(error),
    isLoading: isEditing && isPending,
    members,
  };
}
