import type { ReactElement } from 'react';
import type { ProjectsListScreenContentProps } from '../types';
import { ProjectsEmptyState } from './empty-state/projects-empty-state';
import { ProjectsErrorState } from './error/projects-error-state';
import { ProjectsListHeader } from './header/projects-list-header';
import { MobileCreateProjectButton } from './list/mobile-create-project-button';
import { ProjectsList } from './list/projects-list';
import { ProjectsMobileLoadMore } from './list/projects-mobile-load-more';
import { ProjectsLoadingState } from './loading/projects-loading-state';
import { ProjectsPagination } from './pagination/projects-pagination';

export function ProjectsListScreenContent({
  currentPage,
  hasMoreMobileProjects,
  isFetchingNextPage,
  isLoading,
  loadMoreRef,
  onPageChange,
  onRetry,
  pageSize,
  projects,
  totalCount,
  visibleError,
}: ProjectsListScreenContentProps): ReactElement {
  if (isLoading) {
    return <ProjectsLoadingState />;
  }

  if (visibleError) {
    return <ProjectsErrorState onRetry={onRetry} />;
  }

  if (projects.length === 0) {
    return <ProjectsEmptyState />;
  }

  return (
    <section
      aria-labelledby="projects-title"
      className="relative mx-auto flex w-full max-w-7xl flex-col px-6 pt-9 pb-8 lg:h-[calc(100dvh-4rem)] lg:px-8 lg:pt-8"
    >
      <ProjectsListHeader />
      <ProjectsList projects={projects} />

      {hasMoreMobileProjects && (
        <ProjectsMobileLoadMore
          isFetchingNextPage={isFetchingNextPage}
          loadMoreRef={loadMoreRef}
        />
      )}

      <ProjectsPagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        pageSize={pageSize}
        projectCount={projects.length}
        totalCount={totalCount}
      />
      <MobileCreateProjectButton />
    </section>
  );
}
