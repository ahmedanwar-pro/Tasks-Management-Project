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
    isUnauthorized,
    loadMoreRef,
    onPageChange,
    onRetry,
    pageSize,
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
        projectId={projectId}
      />
      {isLoading ? <ProjectTasksListLoading /> : null}
      {!isLoading && isError ? (
        <ProjectTasksListError isRetrying={isRetrying} onRetry={onRetry} />
      ) : null}
      {isEmpty ? <ProjectTasksListEmpty projectId={projectId} /> : null}
      {!isLoading && !isError && tasks.length > 0 ? (
        <>
          {hasPartialError ? (
            <ProjectTasksListError
              isPartial
              isRetrying={isRetrying}
              onRetry={onRetry}
            />
          ) : null}
          <ProjectTasksList
            currentPage={currentPage}
            hasMoreMobileTasks={hasMoreMobileTasks}
            isFetchingNextPage={isFetchingNextPage}
            loadMoreRef={loadMoreRef}
            onPageChange={onPageChange}
            pageSize={pageSize}
            projectId={projectId}
            tasks={tasks}
            totalCount={totalCount}
          />
        </>
      ) : null}
    </section>
  );
}
