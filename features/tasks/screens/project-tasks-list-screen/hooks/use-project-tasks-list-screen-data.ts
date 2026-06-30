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
import { useProjectTasksListSearch } from './use-project-tasks-list-search';
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
    resetToFirstPage,
    setCurrentPage,
  } = useProjectTasksListPagination(projectId);
  const { debouncedSearchTerm, onSearchTermChange, searchTerm } =
    useProjectTasksListSearch(resetToFirstPage);
  const {
    data: tasksData,
    error: tasksError,
    isFetching: areTasksFetching,
    refetch: refetchTasks,
  } = useProjectTasksListQuery(
    projectId,
    currentPage,
    limit,
    debouncedSearchTerm,
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
    debouncedSearchTerm,
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
      (isMobileViewport ? areMoreTasksPending : areTasksFetching) ||
      isPageOutOfRange ||
      isUnauthorized,
    isRetrying,
    isSearchActive: debouncedSearchTerm.length > 0,
    isUnauthorized,
    loadMoreRef,
    onPageChange: setCurrentPage,
    onSearchTermChange,
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
    searchTerm,
    tasks,
    totalCount,
  };
}
