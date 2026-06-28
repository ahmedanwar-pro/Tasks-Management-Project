import type { ReactElement } from 'react';
import { getTotalPages } from '@/features/shared/utils/pagination';
import { ProjectTasksListPaginationNav } from './project-tasks-list-pagination-nav';
import { ProjectTasksListPaginationSummary } from './project-tasks-list-pagination-summary';

type ProjectTasksListPaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  totalCount: number;
  visibleCount: number;
};

export function ProjectTasksListPagination({
  currentPage,
  onPageChange,
  pageSize,
  totalCount,
  visibleCount,
}: ProjectTasksListPaginationProps): ReactElement | null {
  const totalPages = getTotalPages(totalCount, pageSize);

  if (totalPages === 0) {
    return null;
  }

  return (
    <footer className="bg-surface-high/20 hidden h-12 items-center justify-between px-6 md:flex">
      <ProjectTasksListPaginationSummary
        totalCount={totalCount}
        visibleCount={visibleCount}
      />
      <ProjectTasksListPaginationNav
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={totalPages}
      />
    </footer>
  );
}
