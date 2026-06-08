'use client';

import type { ReactElement } from 'react';
import { isProjectUnauthorizedError } from '@/features/projects/screens/edit-project-screen/api';
import { useEpicAuthRedirect } from '../shared/hooks';
import { EpicDetailsModalHeader } from './components/header/epic-details-modal-header';
import { EpicDetailsDescription } from './components/meta/epic-details-description';
import { EpicDetailsMetaGrid } from './components/meta/grid/epic-details-meta-grid';
import { EpicDetailsModalShell } from './components/shell/epic-details-modal-shell';
import { EpicDetailsTasksSection } from './components/tasks/epic-details-tasks-section';
import { useEpicDetailsQuery } from './hooks';
import { getEpicDetailsDisplayData } from './utils/epic-details-display-data';

type EpicDetailsModalProps = {
  epicId: string;
  projectId: string;
};

export function EpicDetailsModal({
  epicId,
  projectId,
}: EpicDetailsModalProps): ReactElement {
  const { data: epicResponse, error, isPending } = useEpicDetailsQuery(
    projectId,
    epicId,
  );
  const isUnauthorized = isProjectUnauthorizedError(error);

  useEpicAuthRedirect(isUnauthorized);

  if (isPending || error || !epicResponse) {
    return (
      <EpicDetailsModalShell projectId={projectId}>
        {null}
      </EpicDetailsModalShell>
    );
  }

  const epic = getEpicDetailsDisplayData(epicResponse);

  return (
    <EpicDetailsModalShell projectId={projectId}>
      <EpicDetailsModalHeader epic={epic} projectId={projectId} />
      <div className="min-h-0 w-full flex-1 overflow-y-auto px-6 py-2 md:p-8">
        <div className="flex w-full flex-col gap-5 py-4 md:gap-8 md:py-0">
          <EpicDetailsDescription description={epic.description} />
          <EpicDetailsMetaGrid epic={epic} />
          <EpicDetailsTasksSection taskCount={epic.taskCount} />
        </div>
      </div>
    </EpicDetailsModalShell>
  );
}
