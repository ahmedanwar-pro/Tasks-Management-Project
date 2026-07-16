import { useEffect, useState, type ReactElement } from 'react';
import { joinClasses } from '@/components/ui/utils';
import { ProjectFeedbackToast } from '@/features/projects/components/project-feedback-toast';

type ProjectFormToastProps = {
  className?: string;
  contentClassName?: string;
  error?: string;
  success?: string;
};

export function ProjectFormToast({
  className,
  contentClassName,
  error,
  success,
}: ProjectFormToastProps): ReactElement | null {
  const [activeError, setActiveError] = useState(error);
  const [isErrorVisible, setIsErrorVisible] = useState(Boolean(error));
  const visibleError = error ?? activeError;
  const showError = Boolean(error) || isErrorVisible;

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (!error) {
        setIsErrorVisible(false);
        return;
      }

      setActiveError(error);
      setIsErrorVisible(true);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [error]);

  useEffect(() => {
    if (error || isErrorVisible || !activeError) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setActiveError(undefined);
    }, 220);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [activeError, error, isErrorVisible]);

  if (visibleError) {
    return (
      <div
        className={joinClasses(
          'pointer-events-none absolute top-8 left-1/2 z-20 w-full max-w-[18rem] -translate-x-1/2 2xl:max-w-[20rem]',
          className,
        )}
      >
        <div className={joinClasses('pointer-events-auto', contentClassName)}>
          <ProjectFeedbackToast
            ariaLive="assertive"
            closeAriaLabel="Close error message"
            closeButtonClassName="text-danger-text hover:opacity-75 focus-visible:outline-current"
            icon={<ErrorIcon />}
            message={visibleError}
            onClose={() => setIsErrorVisible(false)}
            role="alert"
            surfaceClassName="border-border-danger bg-danger-container text-danger-text"
            visible={showError}
          />
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <p
        aria-atomic="true"
        aria-live="polite"
        className="bg-success/20 text-success-icon text-body-sm leading-base mx-auto mb-6 w-full max-w-2xl rounded-sm px-4 py-3 font-sans font-medium tracking-normal shadow-sm lg:mb-4"
        role="status"
      >
        {success}
      </p>
    );
  }

  return null;
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
