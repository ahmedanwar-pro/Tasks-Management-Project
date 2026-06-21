import type { ReactElement } from 'react';
import { getTotalPages } from '@/features/shared/utils/pagination';

type PaginationChevronProps = {
  direction: 'next' | 'previous';
};

type ProjectTasksListPaginationProps = {
  pageSize?: number;
  totalCount: number;
};

function PaginationChevron({
  direction,
}: PaginationChevronProps): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className={direction === 'previous' ? 'size-3 rotate-180' : 'size-3'}
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

export function ProjectTasksListPagination({
  pageSize = 5,
  totalCount,
}: ProjectTasksListPaginationProps): ReactElement | null {
  const totalPages = getTotalPages(totalCount, pageSize);

  if (totalPages === 0) {
    return null;
  }

  const visibleCount = Math.min(pageSize, totalCount);

  return (
    <footer className="bg-surface-high/20 hidden h-12 items-center justify-between px-6 md:flex">
      <p className="text-text-secondary text-[12px] leading-4 font-medium">
        Showing {visibleCount} of {totalCount} tasks
      </p>
      <nav aria-label="Task pages" className="flex items-center gap-4">
        <button
          aria-disabled="true"
          className="text-text-secondary focus-visible:outline-primary flex size-3 cursor-default items-center justify-center rounded-[2px] focus-visible:outline-2 focus-visible:outline-offset-2"
          type="button"
        >
          <PaginationChevron direction="previous" />
          <span className="sr-only">Previous page</span>
        </button>
        <span className="text-text-secondary text-[12px] leading-4 font-medium">
          Page 1 of {totalPages}
        </span>
        <button
          aria-disabled="true"
          className="text-text-secondary focus-visible:outline-primary flex size-3 cursor-default items-center justify-center rounded-[2px] focus-visible:outline-2 focus-visible:outline-offset-2"
          type="button"
        >
          <PaginationChevron direction="next" />
          <span className="sr-only">Next page</span>
        </button>
      </nav>
    </footer>
  );
}
