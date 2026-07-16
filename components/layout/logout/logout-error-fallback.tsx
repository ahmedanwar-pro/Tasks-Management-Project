'use client';

import type { ReactElement } from 'react';
import { joinClasses } from '@/components/ui/utils';
import { ProjectFeedbackToast } from '@/features/projects/components/project-feedback-toast';
import { logoutRetryErrorMessage, useLogoutFlow } from './logout-flow-context';

type LogoutErrorFallbackProps = {
  sidebarCollapsed?: boolean;
};

export function LogoutErrorFallback({
  sidebarCollapsed = false,
}: LogoutErrorFallbackProps): ReactElement | null {
  const { resetLogoutError, shouldShowFallbackLogoutError } = useLogoutFlow();

  if (!shouldShowFallbackLogoutError) {
    return null;
  }

  return (
    <div
      className={joinClasses(
        'pointer-events-none fixed top-0 right-0 left-0 z-[90] flex h-16 items-center justify-center px-4',
        sidebarCollapsed ? 'lg:left-20' : 'lg:left-64',
      )}
    >
      <div className="pointer-events-auto w-full max-w-[18rem] 2xl:max-w-[20rem]">
        <ProjectFeedbackToast
          ariaLive="assertive"
          closeAriaLabel="Close error message"
          closeButtonClassName="text-danger-text hover:opacity-75 focus-visible:outline-current"
          icon={<ErrorIcon />}
          message={logoutRetryErrorMessage}
          onClose={resetLogoutError}
          role="alert"
          surfaceClassName="border-border-danger bg-danger-container text-danger-text"
          visible
        />
      </div>
    </div>
  );
}

function ErrorIcon(): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className="size-4 shrink-0"
      fill="none"
      viewBox="0 0 16 16"
    >
      <circle className="text-danger" cx="8" cy="8" fill="currentColor" r="7" />
      <path
        d="m5.75 5.75 4.5 4.5m0-4.5-4.5 4.5"
        stroke="white"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}
