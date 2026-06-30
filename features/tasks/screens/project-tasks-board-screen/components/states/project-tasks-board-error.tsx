import type { ReactElement } from 'react';

type ProjectTasksBoardErrorProps = {
  id?: string;
  message?: string;
  onRetry: () => void;
};

export function ProjectTasksBoardError({
  id,
  message = 'Failed to load tasks',
  onRetry,
}: ProjectTasksBoardErrorProps): ReactElement {
  return (
    <div
      className="border-danger/20 bg-danger/5 flex w-full flex-col items-start gap-3 rounded-md border px-4 py-4"
      id={id}
      role="alert"
    >
      <p className="text-danger text-body-sm leading-base font-medium">
        {message}
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
