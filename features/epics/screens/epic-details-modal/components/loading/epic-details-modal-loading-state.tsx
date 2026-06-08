import type { ReactElement } from 'react';

export function EpicDetailsModalLoadingState(): ReactElement {
  return (
    <div
      aria-label="Loading epic details"
      className="flex min-h-60 w-full flex-1 items-center justify-center p-8"
      role="status"
    >
      <span className="text-primary size-8 animate-spin rounded-full border-2 border-current border-r-transparent" />
    </div>
  );
}
