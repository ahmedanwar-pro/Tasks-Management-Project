'use client';

import type { ReactElement } from 'react';
import { isProjectUnauthorizedError } from '@/features/projects/screens/edit-project-screen/api';
import { useEpicAuthRedirect } from '../shared/hooks';
import { EpicDetailsModalErrorState } from './components/error';
import { EpicDetailsModalHeader } from './components/header/epic-details-modal-header';
import { EpicDetailsModalLoadingState } from './components/loading';
import { EpicDetailsDescription } from './components/meta/epic-details-description';
import { EpicDetailsMetaGrid } from './components/meta/grid/epic-details-meta-grid';
import { EpicDetailsModalShell } from './components/shell/epic-details-modal-shell';
import { EpicDetailsTasksSection } from './components/tasks/epic-details-tasks-section';
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
    return (
      <EpicDetailsModalShell label="Loading epic details" projectId={projectId}>
        <EpicDetailsModalLoadingState />
      </EpicDetailsModalShell>
    );
  }

  if (error || !epicResponse) {
    return (
      <EpicDetailsModalShell label="Epic details unavailable" projectId={projectId}>
        <EpicDetailsModalErrorState
          onRetry={() => {
            void refetch();
          }}
          projectId={projectId}
        />
      </EpicDetailsModalShell>
    );
  }

  const epic = getEpicDetailsDisplayData(epicResponse);

  return (
    <EpicDetailsModalShell projectId={projectId}>
      <EpicDetailsModalHeader
        disabled={isSaving}
        epic={epic}
        onTitleSave={(title) =>
          updateEpic({
            epicId,
            projectId,
            title,
          }).then(() => undefined)
        }
        projectId={projectId}
      />
      <div className="min-h-0 w-full flex-1 overflow-y-auto px-6 py-2 md:p-8">
        <div className="flex w-full flex-col gap-5 py-4 md:gap-8 md:py-0">
          <EpicDetailsDescription
            description={epic.description}
            descriptionValue={epic.descriptionValue}
            disabled={isSaving}
            key={epic.descriptionValue}
            onSave={(description) =>
              updateEpic({
                description: description || null,
                epicId,
                projectId,
              }).then(() => undefined)
            }
          />
          <EpicDetailsMetaGrid
            disabled={isSaving}
            epic={epic}
            onAssigneeSave={(assigneeId) =>
              updateEpic({
                assigneeId,
                epicId,
                projectId,
              }).then(() => undefined)
            }
            projectId={projectId}
          />
          <EpicDetailsTasksSection taskCount={epic.taskCount} />
        </div>
      </div>
    </EpicDetailsModalShell>
  );
}
