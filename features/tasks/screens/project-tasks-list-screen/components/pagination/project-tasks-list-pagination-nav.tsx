import type { ReactElement } from 'react';
import { ProjectTasksListPaginationArrowButton } from './project-tasks-list-pagination-arrow-button';

type ProjectTasksListPaginationNavProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
};

export function ProjectTasksListPaginationNav({
  currentPage,
  onPageChange,
  totalPages,
}: ProjectTasksListPaginationNavProps): ReactElement {
  return (
    <nav aria-label="Task pages" className="flex items-center gap-4">
      <ProjectTasksListPaginationArrowButton
        ariaLabel="Previous page"
        direction="previous"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />
      <span
        aria-atomic="true"
        aria-live="polite"
        className="text-text-secondary text-[12px] leading-4 font-medium"
      >
        Page {currentPage} of {totalPages}
      </span>
      <ProjectTasksListPaginationArrowButton
        ariaLabel="Next page"
        direction="next"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </nav>
  );
}
