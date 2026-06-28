import type { ReactElement } from 'react';

type ProjectTasksListErrorProps = {
  isPartial?: boolean;
  isRetrying: boolean;
  onRetry: () => void;
};

export function ProjectTasksListError({
  isPartial = false,
  isRetrying,
  onRetry,
}: ProjectTasksListErrorProps): ReactElement {
  const title = isPartial
    ? 'Some tasks could not load'
    : 'Failed to load tasks';

  return (
    <section
      aria-label={title}
      className="border-danger/20 bg-danger/5 mt-6 flex w-full flex-col items-start gap-3 rounded-md border px-4 py-4 md:mt-8"
      role="status"
    >
      <p className="text-danger text-body-sm leading-base font-medium">
        {title}
      </p>
      <button
        className="text-primary hover:text-primary/80 focus-visible:ring-primary/40 text-label-md rounded-xs font-semibold focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isRetrying}
        onClick={onRetry}
        type="button"
      >
        {isRetrying ? 'Retrying...' : 'Retry'}
      </button>
    </section>
  );
}
