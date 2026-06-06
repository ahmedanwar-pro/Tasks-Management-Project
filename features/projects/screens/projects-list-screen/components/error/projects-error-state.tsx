import type { ReactElement } from 'react';
import { Button } from '@/components/ui';
import { ConnectionErrorIcon } from './projects-error-icon';

type ProjectsErrorStateProps = {
  description?: string;
  onRetry: () => void;
  title?: string;
};

export function ProjectsErrorState({
  description = "We're having trouble retrieving your projects right now. Please try again in a moment.",
  onRetry,
  title = 'Something went wrong',
}: ProjectsErrorStateProps): ReactElement {
  return (
    <section
      aria-live="assertive"
      className="flex min-h-[calc(100dvh-8rem)] items-center justify-center px-6 py-12 lg:min-h-[calc(100dvh-4rem)]"
      role="alert"
    >
      <div className="flex max-w-xs flex-col items-center text-center">
        <div className="bg-danger-container text-danger flex size-16 items-center justify-center rounded-lg">
          <ConnectionErrorIcon />
        </div>
        <h1 className="text-title-lg text-text-primary mt-6 font-semibold">
          {title}
        </h1>
        <p className="text-body-md text-text-secondary mt-2">
          {description}
        </p>
        <Button
          className="mt-6 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
          onClick={onRetry}
          type="button"
        >
          Retry Connection
        </Button>
      </div>
    </section>
  );
}
