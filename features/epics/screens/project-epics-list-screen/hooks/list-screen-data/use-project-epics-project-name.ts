'use client';

import {
  useProjectMembersBreadcrumbVisibility,
  useProjectNameQuery,
} from '@/features/members/screens/project-members-list-screen/hooks';

export function useProjectEpicsProjectName(projectId: string): string {
  const isBreadcrumbVisible = useProjectMembersBreadcrumbVisibility();
  const { data: project } = useProjectNameQuery(
    projectId,
    isBreadcrumbVisible,
  );

  return project?.name ?? 'Project';
}
