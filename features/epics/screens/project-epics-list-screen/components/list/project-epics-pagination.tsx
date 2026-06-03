import type { ReactElement } from 'react';
import { ChevronIcon } from '../icons/project-epics-icons';

type ProjectEpicsPaginationProps = {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  visibleCount: number;
};

const pageButtonClasses =
  'border-border flex size-8 items-center justify-center rounded-xs border bg-surface text-[12px] leading-tight font-bold text-text-secondary';

export function ProjectEpicsPagination({
  currentPage,
  pageSize,
  totalCount,
  visibleCount,
}: ProjectEpicsPaginationProps): ReactElement {
  const pageCount = Math.ceil(totalCount / pageSize);

  return (
    <footer className="mt-auto hidden items-center justify-between pt-12 md:flex">
      <p className="text-text-secondary text-[12px] leading-tight font-medium">
        Showing {visibleCount} of {totalCount} epics
      </p>
      <nav aria-label="Epic pages" className="flex gap-2">
        <button
          aria-label="Previous page"
          className={pageButtonClasses}
          disabled={currentPage === 1}
          type="button"
        >
          <ChevronIcon direction="left" />
        </button>
        {Array.from({ length: pageCount }, (_, index) => index + 1)
          .slice(0, 2)
          .map((pageNumber) => (
            <button
              aria-current={pageNumber === currentPage ? 'page' : undefined}
              className={
                pageNumber === currentPage
                  ? `${pageButtonClasses} bg-primary text-text-inverse`
                  : pageButtonClasses
              }
              key={pageNumber}
              type="button"
            >
              {pageNumber}
            </button>
          ))}
        <button
          aria-label="Next page"
          className={pageButtonClasses}
          disabled={currentPage === pageCount}
          type="button"
        >
          <ChevronIcon />
        </button>
      </nav>
    </footer>
  );
}
