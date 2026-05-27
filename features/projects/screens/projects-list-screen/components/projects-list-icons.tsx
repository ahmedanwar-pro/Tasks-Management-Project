import type { ReactElement } from 'react';

export function PlusIcon({
  className = 'size-4',
}: {
  className?: string;
}): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 3.25v9.5M3.25 8h9.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function MoreIcon(): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className="w-0-75 h-3"
      fill="currentColor"
      viewBox="0 0 3 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="1.5" cy="1.5" r="1.1" />
      <circle cx="1.5" cy="6" r="1.1" />
      <circle cx="1.5" cy="10.5" r="1.1" />
    </svg>
  );
}

export function CalendarIcon(): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className="h-3 w-3"
      fill="none"
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 1.5v2M9 1.5v2M2 4.5h8M2.5 2.5h7a.5.5 0 0 1 .5.5v6.5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronIcon({
  direction,
}: {
  direction: 'left' | 'right';
}): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className={direction === 'right' ? 'h-2 w-1 rotate-180' : 'h-2 w-1'}
      fill="none"
      viewBox="0 0 4 8"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 1 1 4l2 3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
