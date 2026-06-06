import type { ReactElement } from 'react';

export function ConnectionErrorIcon(): ReactElement {
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
