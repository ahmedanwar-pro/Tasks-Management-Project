import type { ReactElement } from 'react';
import { Button } from '@/components/ui';
import { MembersErrorIcon } from './project-members-icons';

type ProjectMembersErrorStateProps = {
  onRetry?: () => void;
};

export function ProjectMembersErrorState({
  onRetry,
}: ProjectMembersErrorStateProps): ReactElement {
  return (
    <section
      aria-labelledby="project-members-error-title"
      className="flex min-h-[calc(100dvh-8rem)] w-full items-center justify-center px-6 py-12"
      role="status"
    >
      <div className="flex max-w-[320px] flex-col items-center text-center">
        <div className="bg-danger-container text-danger flex size-16 items-center justify-center rounded-lg">
          <MembersErrorIcon />
        </div>
        <h1
          className="text-text-primary mt-6 text-title-lg font-semibold"
          id="project-members-error-title"
        >
          Something went wrong
        </h1>
        <p className="text-text-secondary mt-2 text-body-md leading-relaxed">
          We&apos;re having trouble retrieving your project members right now.
          Please try again in a moment.
        </p>
        <Button className="mt-6 rounded-xs px-6" onClick={onRetry} type="button">
          Retry Connection
        </Button>
      </div>
    </section>
  );
}
