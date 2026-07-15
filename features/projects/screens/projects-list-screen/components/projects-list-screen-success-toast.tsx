'use client';

import type { ReactElement } from 'react';
import { ProjectFeedbackToast } from '@/features/projects/components/project-feedback-toast';

type ProjectsListScreenSuccessToastProps = {
  message: string;
  onClose: () => void;
  visible: boolean;
};

export function ProjectsListScreenSuccessToast({
  message,
  onClose,
  visible,
}: ProjectsListScreenSuccessToastProps): ReactElement {
  return (
    <ProjectFeedbackToast
      ariaLive="polite"
      closeAriaLabel="Close success message"
      closeButtonClassName="text-[#0f7a42]/70 hover:text-[#065f35] focus-visible:outline-[#0f7a42]"
      icon={<SuccessCheckIcon />}
      message={message}
      onClose={onClose}
      role="status"
      surfaceClassName="border-[#1f9d55]/45 bg-[#f0fdf4] text-[#057a3d] ring-1 ring-[#86efac]/35"
      visible={visible}
    />
  );
}

function SuccessCheckIcon(): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className="size-4 shrink-0 text-[#087f47] sm:size-5"
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
