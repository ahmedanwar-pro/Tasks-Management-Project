import type { ReactElement } from 'react';
import { getPageNumbers, getTotalPages } from '../utils/projects-pagination';
import { ChevronIcon } from './projects-list-icons';

const pageButtonClasses =
  'border-border flex size-8 items-center justify-center rounded-xs border text-[12px] leading-tight font-bold';
const secondaryPageButtonClasses = `${pageButtonClasses} text-text-secondary`;
const disabledPageButtonClasses = 'disabled:cursor-not-allowed disabled:opacity-50';

type ProjectsPaginationProps = {
  currentPage: number;
  pageSize: number;
  projectCount: number;
  totalCount: number;
  onPageChange: (page: number) => void;
};

type PageNumberButtonProps = {
  isCurrentPage: boolean;
  onClick: () => void;
  pageNumber: number;
};

function PageNumberButton({
  isCurrentPage,
  onClick,
  pageNumber,
}: PageNumberButtonProps): ReactElement {
  return (
    <button
      aria-current={isCurrentPage ? 'page' : undefined}
      className={`${pageButtonClasses} ${
        isCurrentPage ? 'bg-primary text-text-inverse' : 'text-text-secondary'
      }`}
      onClick={onClick}
      type="button"
    >
      {pageNumber}
    </button>
  );
}

export function ProjectsPagination({
  currentPage,
  pageSize,
  projectCount,
  totalCount,
  onPageChange,
}: ProjectsPaginationProps): ReactElement {
  const totalPages = getTotalPages(totalCount, pageSize);
  const pageNumbers = getPageNumbers(totalPages);

  return (
    <footer className="mt-auto hidden items-center justify-between pt-12 md:flex">
      <p className="text-text-secondary text-[12px] leading-tight font-medium">
        Showing {projectCount} of {totalCount} active projects
      </p>
      <nav aria-label="Project pages" className="flex gap-2">
        <button
          aria-label="Previous page"
          className={`${secondaryPageButtonClasses} ${disabledPageButtonClasses}`}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          type="button"
        >
          <ChevronIcon direction="left" />
        </button>
        {pageNumbers.map((pageNumber) => {
          const isCurrentPage = pageNumber === currentPage;

          return (
            <PageNumberButton
              isCurrentPage={isCurrentPage}
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              pageNumber={pageNumber}
            />
          );
        })}
        <button
          aria-label="Next page"
          className={`${secondaryPageButtonClasses} ${disabledPageButtonClasses}`}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          type="button"
        >
          <ChevronIcon direction="right" />
        </button>
      </nav>
    </footer>
  );
}
