'use client';

import type { ReactElement } from 'react';
import { isProjectUnauthorizedError } from '@/features/projects/screens/edit-project-screen/api';
import { useEpicAuthRedirect } from '../shared/hooks';
import { EpicDetailsModalContent } from './components/epic-details-modal-content';
import { EpicDetailsModalLoading } from './components/epic-details-modal-loading';
import { EpicDetailsModalUnavailable } from './components/epic-details-modal-error';
import { EpicDetailsModalShell } from './components/shell/epic-details-modal-shell';
import { useEpicDetailsQuery, useUpdateEpicMutation } from './hooks';
import { getEpicDetailsDisplayData } from './utils/epic-details-display-data';

type EpicDetailsModalProps = {
  epicId: string;
  projectId: string;
};

export function EpicDetailsModal({
  epicId,
  projectId,
}: EpicDetailsModalProps): ReactElement {
  const {
    data: epicResponse,
    error,
    isPending,
    refetch,
  } = useEpicDetailsQuery(projectId, epicId);
  const { isPending: isSaving, mutateAsync: updateEpic } =
    useUpdateEpicMutation(projectId, epicId);
  const isUnauthorized = isProjectUnauthorizedError(error);

  useEpicAuthRedirect(isUnauthorized);

  if (isPending) {
    return <EpicDetailsModalLoading projectId={projectId} />;
  }

  if (error || !epicResponse) {
    return (
      <EpicDetailsModalUnavailable
        onRetry={() => {
          void refetch();
        }}
        projectId={projectId}
      />
    );
  }

  const epic = getEpicDetailsDisplayData(epicResponse);

  return (
    <EpicDetailsModalShell projectId={projectId}>
      <EpicDetailsModalContent
        epic={epic}
        epicId={epicId}
        isSaving={isSaving}
        projectId={projectId}
        updateEpic={updateEpic}
      />
    </EpicDetailsModalShell>
  );
}
