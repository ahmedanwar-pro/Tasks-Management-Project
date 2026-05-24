import type { ReactElement } from 'react';

export function CompletedRequirementIcon(): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className="text-success-icon size-3.75 shrink-0"
      fill="none"
      focusable="false"
      viewBox="0 0 15 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="7.5" cy="7.5" fill="currentColor" r="7" />
      <path
        d="m4.25 7.65 2.05 2.05 4.4-4.55"
        stroke="var(--color-text-inverse)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.3"
      />
    </svg>
  );
}

export function PendingRequirementIcon(): ReactElement {
  return (
    <span
      aria-hidden="true"
      className="border-text-subtle inline-flex size-3.75 shrink-0 rounded-full border"
    />
  );
}
