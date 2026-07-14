import type { ReactElement } from 'react';
import { EpicDetailsModalErrorState } from './error';
import { EpicDetailsModalShell } from './shell/epic-details-modal-shell';

type EpicDetailsModalUnavailableProps = {
  currentPage: number;
  onRetry: () => void;
  projectId: string;
  shouldUseHistoryBack?: boolean;
};

export function EpicDetailsModalUnavailable({
  currentPage,
  onRetry,
  projectId,
  shouldUseHistoryBack = false,
}: EpicDetailsModalUnavailableProps): ReactElement {
  return (
    <EpicDetailsModalShell
      currentPage={currentPage}
      label="Epic details unavailable"
      projectId={projectId}
      shouldUseHistoryBack={shouldUseHistoryBack}
    >
      <EpicDetailsModalErrorState
        currentPage={currentPage}
        onRetry={onRetry}
        projectId={projectId}
        shouldUseHistoryBack={shouldUseHistoryBack}
      />
    </EpicDetailsModalShell>
  );
}
