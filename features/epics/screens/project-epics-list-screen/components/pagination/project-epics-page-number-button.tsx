import type { ReactElement } from 'react';
import { pageButtonClasses } from './project-epics-pagination-styles';

type ProjectEpicsPageNumberButtonProps = {
  isCurrentPage: boolean;
  onClick: () => void;
  pageNumber: number;
};

export function ProjectEpicsPageNumberButton({
  isCurrentPage,
  onClick,
  pageNumber,
}: ProjectEpicsPageNumberButtonProps): ReactElement {
  return (
    <button
      aria-current={isCurrentPage ? 'page' : undefined}
      className={`${pageButtonClasses} ${
        isCurrentPage
          ? 'bg-primary text-text-inverse'
          : 'bg-surface text-text-secondary'
      }`}
      onClick={onClick}
      type="button"
    >
      {pageNumber}
    </button>
  );
}
