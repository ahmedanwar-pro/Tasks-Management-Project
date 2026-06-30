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
    isRetrying,
    isSearchActive,
    loadMoreRef,
    onPageChange,
    onRetry,
    onSearchTermChange,
    pageSize,
    projectName,
    searchTerm,
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
      isRetrying={isRetrying}
      isSearchActive={isSearchActive}
      loadMoreRef={loadMoreRef}
      onPageChange={onPageChange}
      onRetry={onRetry}
      onSearchTermChange={onSearchTermChange}
      pageSize={pageSize}
      projectId={projectId}
      projectName={projectName}
      searchTerm={searchTerm}
      totalCount={totalCount}
    />
  );
}
