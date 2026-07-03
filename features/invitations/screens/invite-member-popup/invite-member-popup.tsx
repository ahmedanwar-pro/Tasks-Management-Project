'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { ReactElement } from 'react';
import { useProjectNameQuery } from '@/features/members/screens/project-members-list-screen/hooks';
import { isProjectUnauthorizedError } from '@/features/projects/screens/edit-project-screen/api';
import {
  InviteMemberDialog,
  InviteMemberProjectError,
  InviteMemberProjectLoading,
} from './components';

type InviteMemberPopupProps = {
  projectId: string;
};

export function InviteMemberPopup({
  projectId,
}: InviteMemberPopupProps): ReactElement {
  const router = useRouter();
  const membersHref = `/projects/${projectId}/members`;
  const {
    data: project,
    error: projectError,
    isPending: isProjectPending,
    refetch: refetchProject,
  } = useProjectNameQuery(projectId);
  const isProjectUnauthorized = isProjectUnauthorizedError(projectError);
  const projectName = project?.name ?? '';

  useEffect(() => {
    if (isProjectUnauthorized) {
      router.replace('/login');
    }
  }, [isProjectUnauthorized, router]);

  function closePopup(): void {
    router.replace(membersHref);
  }

  if (isProjectPending || isProjectUnauthorized) {
    return <InviteMemberProjectLoading onClose={closePopup} />;
  }

  if (projectError || !project) {
    return (
      <InviteMemberProjectError
        onClose={closePopup}
        onRetry={() => {
          void refetchProject();
        }}
      />
    );
  }

  return (
    <InviteMemberDialog
      onClose={closePopup}
      projectId={projectId}
      projectName={projectName}
    />
  );
}
