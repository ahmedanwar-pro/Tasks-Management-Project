'use client';

import type { ReactElement } from 'react';
import { ProjectEpicsListScreenContent } from './components';
import { useProjectEpicsListScreenData } from './hooks';

type ProjectEpicsListScreenProps = {
  projectId: string;
};

export function ProjectEpicsListScreen({
  projectId,
}: ProjectEpicsListScreenProps): ReactElement {
  const {
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
    projectName,
    totalCount,
  } = useProjectEpicsListScreenData(projectId);

  return (
    <ProjectEpicsListScreenContent
      currentPage={currentPage}
      epics={epics}
      hasMoreMobileEpics={hasMoreMobileEpics}
      isFetchingNextPage={isFetchingNextPage}
      isError={isError}
      isLoading={isLoading}
      isMobileViewport={isMobileViewport}
      loadMoreRef={loadMoreRef}
      onPageChange={onPageChange}
      onRetry={onRetry}
      pageSize={pageSize}
      projectId={projectId}
      projectName={projectName}
      totalCount={totalCount}
    />
  );
}
