import type { ReactElement } from 'react';
import { ProjectsPaginationArrowButton } from './projects-pagination-arrow-button';

type ProjectsPaginationNavProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
};

export function ProjectsPaginationNav({
  currentPage,
  onPageChange,
  totalPages,
}: ProjectsPaginationNavProps): ReactElement {
  return (
    <nav aria-label="Project pages" className="flex items-center gap-4.5">
      <ProjectsPaginationArrowButton
        ariaLabel="Previous page"
        disabled={currentPage === 1}
        direction="left"
        onClick={() => onPageChange(currentPage - 1)}
      />
      <span
        aria-atomic="true"
        aria-live="polite"
        className="text-text-secondary text-[12px] leading-4 font-medium tracking-normal"
      >
        Page {currentPage} of {totalPages}
      </span>
      <ProjectsPaginationArrowButton
        ariaLabel="Next page"
        disabled={currentPage === totalPages}
        direction="right"
        onClick={() => onPageChange(currentPage + 1)}
      />
    </nav>
  );
}
