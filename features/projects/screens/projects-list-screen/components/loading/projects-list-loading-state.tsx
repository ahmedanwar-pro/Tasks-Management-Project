import type { ReactElement } from 'react';
import { ProjectsLoadingList } from './projects-loading-list';
import { ProjectsLoadingPagination } from './projects-loading-pagination';

type ProjectsListLoadingStateProps = {
  isPaginationLoading: boolean;
  pagination?: ReactElement;
};

export function ProjectsListLoadingState({
  isPaginationLoading,
  pagination,
}: ProjectsListLoadingStateProps): ReactElement {
  return (
    <>
      <ProjectsLoadingList />
      {isPaginationLoading && pagination ? (
        pagination
      ) : (
        <ProjectsLoadingPagination />
      )}
    </>
  );
}
