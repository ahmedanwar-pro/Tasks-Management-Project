'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState, type JSX } from 'react';
import {
  ProjectTasksList,
  ProjectTasksListEmpty,
  ProjectTasksListError,
  ProjectTasksListHeader,
  ProjectTasksListLoading,
  ProjectTasksListSuccessToast,
} from './components';
import { useProjectTasksListScreenData } from './hooks';
import {
  getProjectTasksListSuccessMessage,
  type ProjectTasksListSuccessType,
} from './utils/project-tasks-list-navigation';

const projectTasksListSuccessToastDurationMs = 4000;

type ProjectTasksListScreenProps = {
  projectId: string;
  successType?: ProjectTasksListSuccessType;
};

export function ProjectTasksListScreen({
  projectId,
  successType,
}: ProjectTasksListScreenProps): JSX.Element {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
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
  const [successMessage] = useState(() =>
    successType ? getProjectTasksListSuccessMessage(successType) : undefined,
  );
  const [isSuccessToastVisible, setIsSuccessToastVisible] = useState(
    Boolean(successType),
  );

  const clearProjectTasksListSuccessQuery = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('success');
    const nextUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;

    router.replace(nextUrl, { scroll: false });
  }, [pathname, router, searchParams]);

  useEffect(() => {
    if (isUnauthorized) {
      router.replace('/login');
    }
  }, [isUnauthorized, router]);

  useEffect(() => {
    if (!successType) {
      return;
    }

    clearProjectTasksListSuccessQuery();
  }, [clearProjectTasksListSuccessQuery, successType]);

  useEffect(() => {
    if (!isSuccessToastVisible) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsSuccessToastVisible(false);
    }, projectTasksListSuccessToastDurationMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isSuccessToastVisible]);

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
      >
        {successMessage ? (
          <ProjectTasksListSuccessToast
            message={successMessage}
            onClose={() => setIsSuccessToastVisible(false)}
            visible={isSuccessToastVisible}
          />
        ) : null}
      </ProjectTasksListHeader>
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
