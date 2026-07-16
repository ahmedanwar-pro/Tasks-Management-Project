import { useEffect, useState, type ReactElement, type ReactNode } from 'react';
import { joinClasses } from '@/components/ui/utils';

type ProjectFeedbackToastProps = {
  ariaLive: 'assertive' | 'polite';
  closeAriaLabel: string;
  closeButtonClassName: string;
  icon: ReactNode;
  message: ReactNode;
  role: 'alert' | 'status';
  surfaceClassName: string;
  visible: boolean;
  onClose: () => void;
};

export function ProjectFeedbackToast({
  ariaLive,
  closeAriaLabel,
  closeButtonClassName,
  icon,
  message,
  role,
  surfaceClassName,
  visible,
  onClose,
}: ProjectFeedbackToastProps): ReactElement {
  const [shouldRender, setShouldRender] = useState(visible);

  useEffect(() => {
    if (visible) {
      const timeoutId = window.setTimeout(() => {
        setShouldRender(true);
      }, 0);

      return () => {
        window.clearTimeout(timeoutId);
      };
    }

    const timeoutId = window.setTimeout(() => {
      setShouldRender(false);
    }, 220);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [visible]);

  if (!visible && !shouldRender) {
    return <></>;
  }

  return (
    <div
      className={`mt-2 transition-[opacity,transform] duration-[220ms] ease-out lg:mt-0 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none -translate-y-2 opacity-0'
      }`}
    >
      <div
        aria-atomic="true"
        aria-hidden={!visible}
        aria-live={ariaLive}
        className={joinClasses(
          'inline-flex min-h-9 w-full max-w-full items-center gap-1.5 rounded-md border px-2.5 py-2 pr-1.5 shadow-[0_6px_16px_rgba(15,118,62,0.08)] sm:min-h-10 sm:gap-2 sm:px-3 sm:pr-2',
          surfaceClassName,
        )}
        role={role}
      >
        {icon}
        <p className="min-w-0 flex-1 text-[10px] leading-[14px] font-semibold tracking-[-0.01em] whitespace-normal sm:text-[11px] sm:leading-4 xl:text-xs">
          {message}
        </p>
        <button
          aria-label={closeAriaLabel}
          className={joinClasses(
            'inline-flex size-6 shrink-0 items-center justify-center rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
            closeButtonClassName,
          )}
          onClick={onClose}
          type="button"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

function CloseIcon(): ReactElement {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 16 16">
      <path
        d="m4.5 4.5 7 7m0-7-7 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}
