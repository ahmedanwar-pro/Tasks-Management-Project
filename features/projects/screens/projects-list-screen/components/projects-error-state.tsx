import type { ReactElement } from 'react';
import { Button } from '@/components/ui';

type ProjectsErrorStateProps = {
  onRetry: () => void;
};

function ConnectionErrorIcon(): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className="size-7"
      fill="none"
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 6 22 22M8.5 12.5A6 6 0 0 1 20 15a6 6 0 0 1-.24 1.69M6.5 17A4.5 4.5 0 0 0 11 21h8.5M4.75 13.75A8 8 0 0 1 15 6.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function ProjectsErrorState({
  onRetry,
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
          Something went wrong
        </h1>
        <p className="text-body-md text-text-secondary mt-2">
          We&apos;re having trouble retrieving your projects right now. Please
          try again in a moment.
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
