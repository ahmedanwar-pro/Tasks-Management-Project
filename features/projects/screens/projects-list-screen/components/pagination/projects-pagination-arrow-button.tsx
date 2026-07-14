import type { ReactElement } from 'react';

type ProjectsPaginationArrowButtonProps = {
  ariaLabel: string;
  disabled: boolean;
  direction: 'left' | 'right';
  onClick: () => void;
};

function PaginationChevron({
  direction,
}: Pick<ProjectsPaginationArrowButtonProps, 'direction'>): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className={direction === 'left' ? 'size-3.5 rotate-180' : 'size-3.5'}
      fill="none"
      focusable="false"
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 3L7.5 6L4.5 9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
    </svg>
  );
}

export function ProjectsPaginationArrowButton({
  ariaLabel,
  disabled,
  direction,
  onClick,
}: ProjectsPaginationArrowButtonProps): ReactElement {
  return (
    <button
      aria-label={ariaLabel}
      className="text-text-secondary focus-visible:outline-primary flex size-5 items-center justify-center rounded-[2px] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-text-muted disabled:opacity-45"
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <PaginationChevron direction={direction} />
    </button>
  );
}
