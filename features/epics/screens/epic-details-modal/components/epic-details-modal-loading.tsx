import type { ReactElement } from 'react';
import { EpicDetailsModalLoadingState } from './loading';
import { EpicDetailsModalShell } from './shell/epic-details-modal-shell';

type EpicDetailsModalLoadingProps = {
  projectId: string;
};

export function EpicDetailsModalLoading({
  projectId,
}: EpicDetailsModalLoadingProps): ReactElement {
  return (
    <EpicDetailsModalShell label="Loading epic details" projectId={projectId}>
      <EpicDetailsModalLoadingState />
    </EpicDetailsModalShell>
  );
}
