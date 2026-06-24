import type { ReactElement } from 'react';
import { EpicDetailsModalErrorIcon } from '@/features/epics/screens/epic-details-modal/components/error/epic-details-modal-error-icon';
import { EpicDetailsModalErrorRetry } from '@/features/epics/screens/epic-details-modal/components/error/epic-details-modal-error-retry';

type TaskDetailsErrorContentProps = {
  onRetry: () => void;
};

export function TaskDetailsErrorContent({
  onRetry,
}: TaskDetailsErrorContentProps): ReactElement {
  return (
    <div className="flex max-w-[320px] flex-col items-center text-center">
      <EpicDetailsModalErrorIcon />
      <h2 className="text-title-lg text-text-primary mt-5 font-semibold">
        Something went wrong
      </h2>
      <p className="text-body-sm text-text-secondary leading-base mt-2">
        We&apos;re having trouble retrieving this task right now. Please try
        again in a moment.
      </p>
      <EpicDetailsModalErrorRetry onRetry={onRetry} />
    </div>
  );
}
