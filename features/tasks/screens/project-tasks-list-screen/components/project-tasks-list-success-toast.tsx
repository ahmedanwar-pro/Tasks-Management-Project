'use client';

import type { ReactElement } from 'react';

type ProjectTasksListSuccessToastProps = {
  message: string;
  onClose: () => void;
  visible: boolean;
};

export function ProjectTasksListSuccessToast({
  message,
  onClose,
  visible,
}: ProjectTasksListSuccessToastProps): ReactElement {
  return (
    <div
      className={`overflow-hidden transition-[max-height,opacity,margin,transform] duration-300 ease-out ${
        visible
          ? 'mt-2 max-h-14 translate-y-0 opacity-100 lg:mt-2.5'
          : 'pointer-events-none mt-0 max-h-0 -translate-y-1 opacity-0'
      }`}
    >
      <div
        aria-atomic="true"
        aria-hidden={!visible}
        aria-live="polite"
        className="inline-flex h-10 w-full max-w-[20rem] items-center gap-2 rounded-md border border-[#1f9d55]/45 bg-[#f0fdf4] px-3 pr-2 text-[#057a3d] shadow-[0_6px_16px_rgba(15,118,62,0.08)] ring-1 ring-[#86efac]/35 sm:w-[20rem]"
        role="status"
      >
        <SuccessCheckIcon />
        <p className="min-w-0 flex-1 text-[11px] leading-4 font-semibold tracking-[-0.01em] whitespace-nowrap sm:text-xs">
          {message}
        </p>
        <button
          aria-label="Close success message"
          className="inline-flex size-6 shrink-0 items-center justify-center rounded-sm text-[#0f7a42]/70 transition-colors hover:text-[#065f35] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f7a42]"
          onClick={onClose}
          type="button"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

function SuccessCheckIcon(): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className="size-5 shrink-0 text-[#087f47]"
      fill="none"
      viewBox="0 0 20 20"
    >
      <circle cx="10" cy="10" fill="currentColor" r="8.5" />
      <path
        d="m6.6 10.2 2.1 2.1 4.7-5"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
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
