'use client';

import { useRouter } from 'next/navigation';
import { useEffect, type JSX } from 'react';
import {
  ProjectTasksList,
  ProjectTasksListEmpty,
  ProjectTasksListError,
  ProjectTasksListHeader,
  ProjectTasksListLoading,
} from './components';
import { useProjectTasksListScreenData } from './hooks';

type ProjectTasksListScreenProps = {
  projectId: string;
};

export function ProjectTasksListScreen({
  projectId,
}: ProjectTasksListScreenProps): JSX.Element {
  const router = useRouter();
  const {
    currentPage,
    hasMoreMobileTasks,
    hasPartialError,
    isError,
    isFetchingNextPage,
    isLoading,
    isRetrying,
    isSearchActive,
    isUnauthorized,
    loadMoreRef,
    onPageChange,
    onRetry,
    onSearchTermChange,
    pageSize,
    searchTerm,
    tasks,
    totalCount,
  } = useProjectTasksListScreenData(projectId);

  useEffect(() => {
    if (isUnauthorized) {
      router.replace('/login');
    }
  }, [isUnauthorized, router]);

  const isEmpty = !isLoading && !isError && totalCount === 0;

  return (
    <section
      aria-labelledby="project-tasks-list-title"
      className="mx-auto flex w-full max-w-7xl flex-col px-4 py-8 md:min-h-[calc(100dvh-4rem)] md:px-8"
    >
      <ProjectTasksListHeader
        isAddTaskVisible={!isEmpty}
        onSearchTermChange={onSearchTermChange}
        projectId={projectId}
        searchTerm={searchTerm}
      />
      {isLoading ? <ProjectTasksListLoading /> : null}
      {!isLoading && isError ? (
        <ProjectTasksListError
          isRetrying={isRetrying}
          isSearchError={isSearchActive}
          onRetry={onRetry}
        />
      ) : null}
      {isEmpty ? (
        <ProjectTasksListEmpty
          isSearchActive={isSearchActive}
          projectId={projectId}
        />
      ) : null}
      {!isLoading && !isError && tasks.length > 0 ? (
        <ProjectTasksList
          currentPage={currentPage}
          hasMoreMobileTasks={hasMoreMobileTasks}
          hasPartialError={hasPartialError}
          isFetchingNextPage={isFetchingNextPage}
          isRetrying={isRetrying}
          isSearchActive={isSearchActive}
          loadMoreRef={loadMoreRef}
          onPageChange={onPageChange}
          onRetry={onRetry}
          pageSize={pageSize}
          projectId={projectId}
          tasks={tasks}
          totalCount={totalCount}
        />
      ) : null}
    </section>
  );
}
