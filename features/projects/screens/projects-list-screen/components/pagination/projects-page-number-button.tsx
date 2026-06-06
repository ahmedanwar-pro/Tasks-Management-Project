import type { ReactElement } from 'react';
import { pageButtonClasses } from './projects-pagination-styles';

type ProjectsPageNumberButtonProps = {
  isCurrentPage: boolean;
  onClick: () => void;
  pageNumber: number;
};

export function ProjectsPageNumberButton({
  isCurrentPage,
  onClick,
  pageNumber,
}: ProjectsPageNumberButtonProps): ReactElement {
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
