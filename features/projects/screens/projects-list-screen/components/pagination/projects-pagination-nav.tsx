import type { ReactElement } from 'react';
import { ProjectsPageNumberButton } from './projects-page-number-button';
import { ProjectsPaginationArrowButton } from './projects-pagination-arrow-button';

type ProjectsPaginationNavProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  pageNumbers: number[];
  totalPages: number;
};

export function ProjectsPaginationNav({
  currentPage,
  onPageChange,
  pageNumbers,
  totalPages,
}: ProjectsPaginationNavProps): ReactElement {
  return (
    <nav aria-label="Project pages" className="flex gap-2">
      <ProjectsPaginationArrowButton
        ariaLabel="Previous page"
        disabled={currentPage === 1}
        direction="left"
        onClick={() => onPageChange(currentPage - 1)}
      />
      {pageNumbers.map((pageNumber) => {
        const isCurrentPage = pageNumber === currentPage;

        return (
          <ProjectsPageNumberButton
            isCurrentPage={isCurrentPage}
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            pageNumber={pageNumber}
          />
        );
      })}
      <ProjectsPaginationArrowButton
        ariaLabel="Next page"
        disabled={currentPage === totalPages}
        direction="right"
        onClick={() => onPageChange(currentPage + 1)}
      />
    </nav>
  );
}
