import type { ReactElement } from 'react';
import { EpicDetailsModalErrorClose } from './epic-details-modal-error-close';
import { EpicDetailsModalErrorContent } from './epic-details-modal-error-content';

type EpicDetailsModalErrorStateProps = {
  currentPage: number;
  onRetry: () => void;
  projectId: string;
  shouldUseHistoryBack?: boolean;
};

export function EpicDetailsModalErrorState({
  currentPage,
  onRetry,
  projectId,
  shouldUseHistoryBack = false,
}: EpicDetailsModalErrorStateProps): ReactElement {
  return (
    <section
      aria-labelledby="epic-details-error-title"
      aria-live="assertive"
      className="relative flex min-h-80 w-full flex-1 items-center justify-center px-6 py-10"
      role="alert"
    >
      <EpicDetailsModalErrorClose
        currentPage={currentPage}
        projectId={projectId}
        shouldUseHistoryBack={shouldUseHistoryBack}
      />
      <EpicDetailsModalErrorContent onRetry={onRetry} />
    </section>
  );
}
