import type { ReactElement } from 'react';
import { EpicDetailsModalErrorCopy } from './epic-details-modal-error-copy';
import { EpicDetailsModalErrorIcon } from './epic-details-modal-error-icon';
import { EpicDetailsModalErrorRetry } from './epic-details-modal-error-retry';

type EpicDetailsModalErrorContentProps = {
  onRetry: () => void;
};

export function EpicDetailsModalErrorContent({
  onRetry,
}: EpicDetailsModalErrorContentProps): ReactElement {
  return (
    <div className="flex max-w-[320px] flex-col items-center text-center">
      <EpicDetailsModalErrorIcon />
      <EpicDetailsModalErrorCopy />
      <EpicDetailsModalErrorRetry onRetry={onRetry} />
    </div>
  );
}
