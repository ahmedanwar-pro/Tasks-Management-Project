import type { ReactElement } from 'react';

type EpicDetailsTasksErrorProps = {
  onRetry: () => void;
};

export function EpicDetailsTasksError({
  onRetry,
}: EpicDetailsTasksErrorProps): ReactElement {
  return (
    <div className="border-danger/20 bg-danger/5 flex w-full flex-col items-start gap-3 rounded-md border px-4 py-4 md:flex-row md:items-center md:justify-between">
      <p className="text-danger text-body-sm leading-base font-medium">
        Failed to load tasks
      </p>
      <button
        className="text-primary hover:text-primary/80 focus-visible:ring-primary/40 text-label-md rounded-xs font-semibold focus-visible:ring-2 focus-visible:outline-none"
        onClick={onRetry}
        type="button"
      >
        Retry
      </button>
    </div>
  );
}
