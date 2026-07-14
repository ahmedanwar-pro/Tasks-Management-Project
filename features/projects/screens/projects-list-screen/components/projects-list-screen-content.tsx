import type { ReactElement } from 'react';
import type { ProjectsListScreenContentProps } from '../types';
import { ProjectsEmptyState } from './empty-state/projects-empty-state';
import { ProjectsSearchEmptyState } from './empty-state/projects-search-empty-state';
import { ProjectsErrorState } from './error/projects-error-state';
import { ProjectsListHeader } from './header/projects-list-header';
import { MobileCreateProjectButton } from './list/mobile-create-project-button';
import { ProjectsList } from './list/projects-list';
import { ProjectsMobileLoadMore } from './list/projects-mobile-load-more';
import { ProjectsSearchInput } from './list/projects-search-input';
import { ProjectsLoadingList } from './loading/projects-loading-list';
import { ProjectsLoadingState } from './loading/projects-loading-state';
import { ProjectsPagination } from './pagination/projects-pagination';
import { ProjectsListScreenSuccessToast } from './projects-list-screen-success-toast';

export function ProjectsListScreenContent({
  currentPage,
  hasMoreMobileProjects,
  isFetchingNextPage,
  isLoading,
  isSearchActive,
  loadMoreRef,
  onPageChange,
  onSearchTermChange,
  onSuccessToastClose,
  onRetry,
  pageSize,
  projects,
  searchTerm,
  successMessage,
  showSuccessToast,
  totalCount,
  visibleError,
}: ProjectsListScreenContentProps): ReactElement {
  const errorTitle = isSearchActive
    ? 'Failed to search projects'
    : 'Failed to load projects';

  if (isLoading && !isSearchActive) {
    return <ProjectsLoadingState />;
  }

  if (!visibleError && totalCount === 0 && !isSearchActive) {
    return <ProjectsEmptyState />;
  }

  return (
    <section
      aria-labelledby="projects-title"
      className="relative mx-auto flex w-full max-w-7xl flex-col px-6 pt-8 pb-8 lg:h-[calc(100dvh-4rem)] lg:px-8 lg:pt-7"
    >
      <ProjectsListHeader currentPage={currentPage}>
        {successMessage ? (
          <ProjectsListScreenSuccessToast
            message={successMessage}
            onClose={onSuccessToastClose}
            visible={showSuccessToast}
          />
        ) : null}
      </ProjectsListHeader>
      <div className="md:mt-7 md:rounded-lg md:border md:border-[#dfe7f8] md:bg-[#f8faff] md:p-1 md:shadow-[0px_1px_3px_rgba(45,79,140,0.08)]">
        <div className="md:rounded-md md:bg-[#f8faff] md:px-6 md:pt-5 md:pb-0">
          <ProjectsSearchInput
            onChange={onSearchTermChange}
            value={searchTerm}
          />
          {isLoading ? (
            <ProjectsLoadingList />
          ) : visibleError ? (
            <ProjectsErrorState
              compact
              onRetry={onRetry}
              title={errorTitle}
              titleAs="h2"
            />
          ) : isSearchActive && totalCount === 0 ? (
            <ProjectsSearchEmptyState />
          ) : (
            <>
              <ProjectsList currentPage={currentPage} projects={projects} />
              <ProjectsPagination
                currentPage={currentPage}
                onPageChange={onPageChange}
                pageSize={pageSize}
                projectCount={projects.length}
                totalCount={totalCount}
              />
            </>
          )}
        </div>
      </div>

      {hasMoreMobileProjects && !visibleError && totalCount > 0 && (
        <ProjectsMobileLoadMore
          isFetchingNextPage={isFetchingNextPage}
          loadMoreRef={loadMoreRef}
        />
      )}
      <MobileCreateProjectButton currentPage={currentPage} />
    </section>
  );
}
