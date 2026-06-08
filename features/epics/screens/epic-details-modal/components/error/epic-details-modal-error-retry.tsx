import type { ReactElement } from 'react';
import { Button } from '@/components/ui';

type EpicDetailsModalErrorRetryProps = {
  onRetry: () => void;
};

export function EpicDetailsModalErrorRetry({
  onRetry,
}: EpicDetailsModalErrorRetryProps): ReactElement {
  return (
    <Button className="mt-6 rounded-xs px-6" onClick={onRetry} type="button">
      Retry Connection
    </Button>
  );
}
