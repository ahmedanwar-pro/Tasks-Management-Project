'use client';

import type { ReactElement } from 'react';
import { ProjectsListScreenContent } from './components';
import { useProjectsListScreenData } from './hooks';

export function ProjectsListScreen(): ReactElement {
  const {
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
  } = useProjectsListScreenData();

  return (
    <ProjectsListScreenContent
      currentPage={currentPage}
      hasMoreMobileProjects={hasMoreMobileProjects}
      isFetchingNextPage={isFetchingNextPage}
      isLoading={isLoading}
      loadMoreRef={loadMoreRef}
      onPageChange={onPageChange}
      onRetry={onRetry}
      pageSize={pageSize}
      projects={projects}
      totalCount={totalCount}
      visibleError={visibleError}
    />
  );
}
