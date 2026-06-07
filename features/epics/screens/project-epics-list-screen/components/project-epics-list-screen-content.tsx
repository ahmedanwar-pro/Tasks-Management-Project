import type { ReactElement } from 'react';
import type { ProjectEpicsListScreenContentProps } from '../types';
import { ProjectEpicsEmptyState } from './empty-state';
import { ProjectEpicsErrorState } from './error/project-epics-error-state';
import { ProjectEpicsHeader } from './header/project-epics-header';
import { ProjectEpicsFloatingAddButton } from './list/project-epics-floating-add-button';
import { ProjectEpicsListSection } from './list/project-epics-list-section';

export function ProjectEpicsListScreenContent({
  currentPage,
  epics,
  hasMoreMobileEpics,
  isFetchingNextPage,
  isError,
  isLoading,
  isMobileViewport,
  loadMoreRef,
  onPageChange,
  onRetry,
  pageSize,
  projectId,
  projectName,
  totalCount,
}: ProjectEpicsListScreenContentProps): ReactElement {
  if (isError) {
    return <ProjectEpicsErrorState onRetry={onRetry} />;
  }

  if (!isLoading && totalCount === 0) {
    return <ProjectEpicsEmptyState projectId={projectId} />;
  }

  return (
    <section
      aria-labelledby="project-epics-title"
      className="relative mx-auto flex w-full max-w-7xl flex-col px-6 pt-6 pb-32 md:px-8 lg:min-h-[calc(100dvh-4rem)] lg:px-8 lg:pt-8 lg:pb-8"
    >
      <ProjectEpicsHeader projectId={projectId} projectName={projectName} />
      <ProjectEpicsListSection
        currentPage={currentPage}
        epics={epics}
        hasMoreMobileEpics={hasMoreMobileEpics}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
        isMobileViewport={isMobileViewport}
        loadMoreRef={loadMoreRef}
        onPageChange={onPageChange}
        pageSize={pageSize}
        projectId={projectId}
        totalCount={totalCount}
      />
      <ProjectEpicsFloatingAddButton projectId={projectId} />
    </section>
  );
}
