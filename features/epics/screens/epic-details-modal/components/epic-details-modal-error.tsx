import type { ReactElement } from 'react';
import { EpicDetailsModalErrorState } from './error';
import { EpicDetailsModalShell } from './shell/epic-details-modal-shell';

type EpicDetailsModalUnavailableProps = {
  onRetry: () => void;
  projectId: string;
};

export function EpicDetailsModalUnavailable({
  onRetry,
  projectId,
}: EpicDetailsModalUnavailableProps): ReactElement {
  return (
    <EpicDetailsModalShell label="Epic details unavailable" projectId={projectId}>
      <EpicDetailsModalErrorState onRetry={onRetry} projectId={projectId} />
    </EpicDetailsModalShell>
  );
}
