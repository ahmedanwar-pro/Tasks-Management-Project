import type { ReactElement } from 'react';

export function SearchIcon({
  className = 'size-[13.5px] shrink-0',
}: {
  className?: string;
}): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 13.5 13.5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.45 13.5L7.725 8.775C7.35 9.075 6.91875 9.3125 6.43125 9.4875C5.94375 9.6625 5.425 9.75 4.875 9.75C3.5125 9.75 2.35938 9.27813 1.41562 8.33438C0.471875 7.39063 0 6.2375 0 4.875C0 3.5125 0.471875 2.35938 1.41562 1.41562C2.35938 0.471875 3.5125 0 4.875 0C6.2375 0 7.39063 0.471875 8.33438 1.41562C9.27813 2.35938 9.75 3.5125 9.75 4.875C9.75 5.425 9.6625 5.94375 9.4875 6.43125C9.3125 6.91875 9.075 7.35 8.775 7.725L13.5 12.45L12.45 13.5ZM4.875 8.25C5.8125 8.25 6.60938 7.92188 7.26562 7.26562C7.92188 6.60938 8.25 5.8125 8.25 4.875C8.25 3.9375 7.92188 3.14062 7.26562 2.48438C6.60938 1.82812 5.8125 1.5 4.875 1.5C3.9375 1.5 3.14062 1.82812 2.48438 2.48438C1.82812 3.14062 1.5 3.9375 1.5 4.875C1.5 5.8125 1.82812 6.60938 2.48438 7.26562C3.14062 7.92188 3.9375 8.25 4.875 8.25Z" />
    </svg>
  );
}

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

export function EditIcon({
  className = 'h-4 w-4',
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
        d="m9.75 3.25 3 3M3.5 12.5l3.2-.62 6.18-6.18a1.41 1.41 0 0 0-2-2L4.7 9.88 3.5 12.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
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
