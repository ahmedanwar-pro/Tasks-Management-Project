import type { ReactElement } from 'react';
import { getTotalPages } from '@/features/shared/utils/pagination';
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

  return (
    <footer className="-mx-6 mt-5 hidden h-10 items-center justify-between border-t border-[#dce4f5] bg-[#f8faff] px-6 md:flex">
      <ProjectsPaginationSummary
        projectCount={projectCount}
        totalCount={totalCount}
      />
      <ProjectsPaginationNav
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={totalPages}
      />
    </footer>
  );
}
