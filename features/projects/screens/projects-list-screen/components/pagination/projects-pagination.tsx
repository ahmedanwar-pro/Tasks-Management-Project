import type { ReactElement } from 'react';
import {
  getPageNumbers,
  getTotalPages,
} from '@/features/shared/utils/pagination';
import { ProjectsPaginationNav } from './projects-pagination-nav';
import { ProjectsPaginationSummary } from './projects-pagination-summary';

type ProjectsPaginationProps = {
  currentPage: number;
  pageSize: number;
  projectCount: number;
  totalCount: number;
  onPageChange: (page: number) => void;
};

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
    <footer className="mt-6 hidden items-center justify-between md:flex lg:mt-8">
      <ProjectsPaginationSummary
        projectCount={projectCount}
        totalCount={totalCount}
      />
      <ProjectsPaginationNav
        currentPage={currentPage}
        onPageChange={onPageChange}
        pageNumbers={pageNumbers}
        totalPages={totalPages}
      />
    </footer>
  );
}
