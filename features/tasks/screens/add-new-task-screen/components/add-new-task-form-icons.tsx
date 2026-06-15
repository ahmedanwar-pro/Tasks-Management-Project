import type { ReactElement } from 'react';

export function SelectChevron(): ReactElement {
  return (
    <span
      aria-hidden="true"
      className="text-text-tertiary size-icon-md pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
    >
      <svg
        className="size-full"
        fill="none"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m5 7.5 5 5 5-5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    </span>
  );
}

export function CreateTaskIcon(): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className="size-[14px] lg:hidden"
      fill="none"
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 2v10M2 7h10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}
