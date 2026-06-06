import type { ReactElement } from 'react';
import { ProjectEpicsPageNumberButton } from './project-epics-page-number-button';
import { ProjectEpicsPaginationArrowButton } from './project-epics-pagination-arrow-button';

type ProjectEpicsPaginationNavProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  pageNumbers: number[];
  totalPages: number;
};

export function ProjectEpicsPaginationNav({
  currentPage,
  onPageChange,
  pageNumbers,
  totalPages,
}: ProjectEpicsPaginationNavProps): ReactElement {
  return (
    <nav aria-label="Epic pages" className="flex gap-2">
      <ProjectEpicsPaginationArrowButton
        ariaLabel="Previous page"
        direction="left"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />
      {pageNumbers.map((pageNumber) => {
        const isCurrentPage = pageNumber === currentPage;

        return (
          <ProjectEpicsPageNumberButton
            isCurrentPage={isCurrentPage}
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            pageNumber={pageNumber}
          />
        );
      })}
      <ProjectEpicsPaginationArrowButton
        ariaLabel="Next page"
        direction="right"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </nav>
  );
}
