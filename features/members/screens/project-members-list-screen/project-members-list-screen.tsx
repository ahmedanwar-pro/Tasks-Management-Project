'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { ReactElement } from 'react';
import {
  ProjectMembersErrorState,
  ProjectMembersFloatingInviteButton,
  ProjectMembersHeader,
  ProjectMembersLoadingState,
  ProjectMembersMobileList,
  ProjectMembersTable,
} from './components';
import { isProjectMembersUnauthorizedError } from './api';
import {
  useProjectMembersBreadcrumbVisibility,
  useProjectMembersQuery,
  useProjectNameQuery,
} from './hooks';
import { mapProjectMember } from './utils';
import { isProjectUnauthorizedError } from '@/features/projects/screens/edit-project-screen/api';

type ProjectMembersListScreenProps = {
  projectId: string;
};

export function ProjectMembersListScreen({
  projectId,
}: ProjectMembersListScreenProps): ReactElement {
  const router = useRouter();
  const isBreadcrumbVisible = useProjectMembersBreadcrumbVisibility();
  const {
    data: membersData,
    error: membersError,
    isPending: isMembersPending,
    refetch: refetchMembers,
  } = useProjectMembersQuery(projectId);
  const {
    data: project,
    error: projectError,
    refetch: refetchProjectName,
  } = useProjectNameQuery(projectId, isBreadcrumbVisible);
  const isUnauthorized =
    isProjectMembersUnauthorizedError(membersError) ||
    isProjectUnauthorizedError(projectError);
  const members = (membersData?.members ?? []).map(mapProjectMember);
  const projectName = project?.name ?? 'Project';

  useEffect(() => {
    if (isUnauthorized) {
      router.replace('/login');
    }
  }, [isUnauthorized, router]);

  function handleRetry(): void {
    void refetchMembers();

    if (isBreadcrumbVisible) {
      void refetchProjectName();
    }
  }

  if (isMembersPending || isUnauthorized) {
    return <ProjectMembersLoadingState projectId={projectId} />;
  }

  if (membersError) {
    return <ProjectMembersErrorState onRetry={handleRetry} />;
  }

  return (
    <section
      aria-labelledby="project-members-title"
      className="relative mx-auto flex w-full max-w-7xl flex-col px-4 py-8 md:px-8 lg:min-h-[calc(100dvh-4rem)] lg:pt-8"
    >
      <ProjectMembersHeader projectId={projectId} projectName={projectName} />

      <div className="mt-5 lg:mt-16.75 lg:flex lg:justify-center">
        <ProjectMembersMobileList members={members} />
        <ProjectMembersTable members={members} />
      </div>

      <ProjectMembersFloatingInviteButton projectId={projectId} />
    </section>
  );
}
