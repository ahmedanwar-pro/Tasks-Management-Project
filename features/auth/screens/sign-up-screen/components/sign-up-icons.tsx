import type { ReactElement } from 'react';

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
