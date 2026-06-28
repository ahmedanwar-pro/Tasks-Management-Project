'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useMobileLoadMore } from '@/features/shared/hooks/use-mobile-load-more';
import { getTotalPages } from '@/features/shared/utils/pagination';
import type { ProjectTasksListScreenData } from '../types';
import {
  getProjectTasksListDisplayData,
  getProjectTasksListErrorState,
  initialProjectTasksListPage,
  mapProjectTaskListItem,
  mobileProjectTasksListViewportQuery,
} from '../utils';
import { useProjectTasksListPagination } from './use-project-tasks-list-pagination';
import {
  useMoreProjectTasksListQuery,
  useProjectTasksListQuery,
} from './use-project-tasks-list-query';

export function useProjectTasksListScreenData(
  projectId: string,
): ProjectTasksListScreenData {
  const {
    currentPage,
    isMobileViewport,
    isViewportResolved,
    limit,
    setCurrentPage,
  } = useProjectTasksListPagination(projectId);
  const {
    data: tasksData,
    error: tasksError,
    isFetching: areTasksFetching,
    isPending: areTasksPending,
    refetch: refetchTasks,
  } = useProjectTasksListQuery(
    projectId,
    currentPage,
    limit,
    isViewportResolved && !isMobileViewport,
  );
  const {
    data: moreTasksData,
    error: moreTasksError,
    fetchNextPage,
    isFetchNextPageError,
    isFetching: areMoreTasksFetching,
    isFetchingNextPage,
    isPending: areMoreTasksPending,
    refetch: refetchMoreTasks,
  } = useMoreProjectTasksListQuery(
    projectId,
    limit,
    isViewportResolved && isMobileViewport,
  );
  const { displayedTaskResponses, hasMoreMobileTasks, totalCount } =
    getProjectTasksListDisplayData({
      isMobileViewport,
      moreTasksData,
      tasksData,
    });
  const { hasPartialError, isError, isUnauthorized, visibleError } =
    getProjectTasksListErrorState({
      hasMobileTasks: displayedTaskResponses.length > 0,
      isMobileViewport,
      moreTasksError,
      tasksError,
    });
  const tasks = displayedTaskResponses.map(mapProjectTaskListItem);
  const isRetrying = isMobileViewport
    ? Boolean(moreTasksError) && areMoreTasksFetching
    : Boolean(tasksError) && areTasksFetching;
  const totalPages = getTotalPages(totalCount, limit);
  const isPageOutOfRange =
    isViewportResolved &&
    !isMobileViewport &&
    totalCount > 0 &&
    currentPage > totalPages;
  const retryInFlightRef = useRef(false);
  const fetchMoreTasks = useCallback(() => {
    void fetchNextPage();
  }, [fetchNextPage]);
  const loadMoreRef = useMobileLoadMore({
    hasMore: hasMoreMobileTasks,
    isFetchingNextPage,
    mediaQuery: mobileProjectTasksListViewportQuery,
    onLoadMore: fetchMoreTasks,
    visibleError,
  });

  useEffect(() => {
    if (!isPageOutOfRange) {
      return;
    }

    const animationFrame = window.requestAnimationFrame(() => {
      setCurrentPage(Math.max(initialProjectTasksListPage, totalPages));
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [isPageOutOfRange, setCurrentPage, totalPages]);

  return {
    currentPage,
    hasMoreMobileTasks,
    hasPartialError,
    isError,
    isFetchingNextPage,
    isLoading:
      !isViewportResolved ||
      (isMobileViewport ? areMoreTasksPending : areTasksPending) ||
      isPageOutOfRange ||
      isUnauthorized,
    isRetrying,
    isUnauthorized,
    loadMoreRef,
    onPageChange: setCurrentPage,
    onRetry: () => {
      if (retryInFlightRef.current || isRetrying) {
        return;
      }

      retryInFlightRef.current = true;

      if (isMobileViewport) {
        const retryRequest = isFetchNextPageError
          ? fetchNextPage()
          : refetchMoreTasks();

        void retryRequest.finally(() => {
          retryInFlightRef.current = false;
        });
        return;
      }

      void refetchTasks().finally(() => {
        retryInFlightRef.current = false;
      });
    },
    pageSize: limit,
    tasks,
    totalCount,
  };
}
