import type { ReactElement } from 'react';
import { EpicDetailsModalErrorClose } from './epic-details-modal-error-close';
import { EpicDetailsModalErrorContent } from './epic-details-modal-error-content';

type EpicDetailsModalErrorStateProps = {
  onRetry: () => void;
  projectId: string;
};

export function EpicDetailsModalErrorState({
  onRetry,
  projectId,
}: EpicDetailsModalErrorStateProps): ReactElement {
  return (
    <section
      aria-labelledby="epic-details-error-title"
      aria-live="assertive"
      className="relative flex min-h-80 w-full flex-1 items-center justify-center px-6 py-10"
      role="alert"
    >
      <EpicDetailsModalErrorClose projectId={projectId} />
      <EpicDetailsModalErrorContent onRetry={onRetry} />
    </section>
  );
}
