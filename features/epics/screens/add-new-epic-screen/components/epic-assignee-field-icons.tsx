import type { ReactElement } from 'react';
import { Spinner } from '@/components/ui';

export function SelectChevron(): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className="size-icon-md text-text-tertiary pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m5 7.5 5 5 5-5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

export function LoadingSpinner(): ReactElement {
  return (
    <Spinner
      className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-text-tertiary"
      size="md"
    />
  );
}
