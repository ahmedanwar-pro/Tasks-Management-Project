import type { ReactElement } from 'react';

export function EyeIcon(): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className="h-3.75 w-5.5"
      fill="none"
      focusable="false"
      viewBox="0 0 22 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.75 7.5S5.1 2.25 11 2.25 20.25 7.5 20.25 7.5 16.9 12.75 11 12.75 1.75 7.5 1.75 7.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M11 9.75a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export function EyeOffIcon(): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className="h-3.75 w-5.5"
      fill="none"
      focusable="false"
      viewBox="0 0 22 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 1.5 20 13.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
      <path
        d="M8.7 2.6A8.3 8.3 0 0 1 11 2.25c5.9 0 9.25 5.25 9.25 5.25a13.2 13.2 0 0 1-2.46 2.86"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M13.25 9.36A2.25 2.25 0 0 1 8.8 7.47"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M6.17 4.14C3.4 5.62 1.75 7.5 1.75 7.5S5.1 12.75 11 12.75a8.4 8.4 0 0 0 4.14-1.05"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export function HintStatusIcon({
  checked = false,
}: {
  checked?: boolean;
}): ReactElement {
  return (
    <span
      aria-hidden="true"
      className="border-text-tertiary text-success-icon inline-flex size-[11.667px] shrink-0 items-center justify-center rounded-full border"
    >
      {checked ? (
        <svg
          className="size-2"
          fill="none"
          focusable="false"
          viewBox="0 0 8 8"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m1.5 4 1.5 1.5 3.5-4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
          />
        </svg>
      ) : null}
    </span>
  );
}
