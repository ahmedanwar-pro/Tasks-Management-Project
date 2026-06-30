import type { ReactElement } from 'react';
import { Button } from '@/components/ui';
import { ConnectionErrorIcon } from './projects-error-icon';

type ProjectsErrorStateProps = {
  compact?: boolean;
  description?: string;
  isRetrying?: boolean;
  onRetry: () => void;
  title?: string;
  titleAs?: 'h1' | 'h2';
};

export function ProjectsErrorState({
  compact = false,
  description = "We're having trouble retrieving your projects right now. Please try again in a moment.",
  isRetrying = false,
  onRetry,
  title = 'Something went wrong',
  titleAs: Title = 'h1',
}: ProjectsErrorStateProps): ReactElement {
  return (
    <section
      aria-live="assertive"
      className={
        compact
          ? 'flex flex-1 items-center justify-center py-12'
          : 'flex min-h-[calc(100dvh-8rem)] items-center justify-center px-6 py-12 lg:min-h-[calc(100dvh-4rem)]'
      }
      role="alert"
    >
      <div className="flex max-w-xs flex-col items-center text-center">
        <div className="bg-danger-container text-danger flex size-16 items-center justify-center rounded-lg">
          <ConnectionErrorIcon />
        </div>
        <Title className="text-title-lg text-text-primary mt-6 font-semibold">
          {title}
        </Title>
        <p className="text-body-md text-text-secondary mt-2">{description}</p>
        <Button
          className="mt-6 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
          isLoading={isRetrying}
          loadingText="Retrying..."
          onClick={onRetry}
          type="button"
        >
          Retry Connection
        </Button>
      </div>
    </section>
  );
}
