import type { ReactElement } from 'react';
import { getPageNumbers, getTotalPages } from '@/features/shared/utils/pagination';
import { ProjectEpicsPaginationNav } from './project-epics-pagination-nav';
import { ProjectEpicsPaginationSummary } from './project-epics-pagination-summary';

type ProjectEpicsPaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  totalCount: number;
  visibleCount: number;
};

export function ProjectEpicsPagination({
  currentPage,
  onPageChange,
  pageSize,
  totalCount,
  visibleCount,
}: ProjectEpicsPaginationProps): ReactElement {
  const totalPages = getTotalPages(totalCount, pageSize);
  const pageNumbers = getPageNumbers(totalPages);

  return (
    <footer className="mt-auto hidden items-center justify-between pt-12 md:flex lg:pt-8">
      <ProjectEpicsPaginationSummary
        totalCount={totalCount}
        visibleCount={visibleCount}
      />
      <ProjectEpicsPaginationNav
        currentPage={currentPage}
        onPageChange={onPageChange}
        pageNumbers={pageNumbers}
        totalPages={totalPages}
      />
    </footer>
  );
}
