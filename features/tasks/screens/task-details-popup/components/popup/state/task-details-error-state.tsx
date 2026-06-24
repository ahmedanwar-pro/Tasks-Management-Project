import type { ReactElement } from 'react';
import { TaskDetailsErrorContent } from './task-details-error-content';

type TaskDetailsErrorStateProps = {
  onRetry: () => void;
};

export function TaskDetailsErrorState({
  onRetry,
}: TaskDetailsErrorStateProps): ReactElement {
  return (
    <section
      aria-live="assertive"
      className="relative flex min-h-80 w-full flex-1 items-center justify-center px-6 py-10"
      role="alert"
    >
      <TaskDetailsErrorContent onRetry={onRetry} />
    </section>
  );
}
