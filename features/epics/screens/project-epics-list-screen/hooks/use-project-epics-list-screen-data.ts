'use client';

import { useCallback, useRef } from 'react';
import { useMobileLoadMore } from '@/features/shared/hooks/use-mobile-load-more';
import type { ProjectEpicsListScreenData } from '../types';
import { useEpicAuthRedirect } from '../../shared/hooks';
import {
  getProjectEpicsDisplayData,
  getProjectEpicsErrorState,
  mapProjectEpic,
  mobileProjectEpicsViewportQuery,
} from '../utils';
import { useProjectEpicsListScreenPagination } from './use-project-epics-list-screen-pagination';
import { useProjectEpicsProjectName } from './use-project-epics-project-name';
import { useProjectEpicsSearch } from './use-project-epics-search';
import {
  useMoreProjectEpicsQuery,
  useProjectEpicsQuery,
} from './use-project-epics-query';

export function useProjectEpicsListScreenData(
  projectId: string,
  initialPage: number,
): ProjectEpicsListScreenData {
  const {
    currentPage,
    isMobileViewport,
    limit,
    resetToFirstPage,
    setCurrentPage,
  } = useProjectEpicsListScreenPagination(initialPage);
  const { debouncedSearchTerm, onSearchTermChange, searchTerm } =
    useProjectEpicsSearch(resetToFirstPage);
  const projectName = useProjectEpicsProjectName(projectId);
  const {
    data: epicsData,
    error: epicsError,
    isFetching: areEpicsFetching,
    isPending: areEpicsPending,
    refetch: refetchEpics,
  } = useProjectEpicsQuery(projectId, currentPage, limit, debouncedSearchTerm);
  const {
    data: moreEpicsData,
    error: moreEpicsError,
    fetchNextPage,
    isFetching: areMoreEpicsFetching,
    isFetchingNextPage,
  } = useMoreProjectEpicsQuery(projectId, limit, debouncedSearchTerm);
  const { displayedEpicResponses, hasMoreMobileEpics } =
    getProjectEpicsDisplayData({
      epicsData,
      isMobileViewport,
      moreEpicsData,
    });
  const { isError, isUnauthorized, visibleError } = getProjectEpicsErrorState({
    epicsError,
    isMobileViewport,
    moreEpicsError,
  });
  const epics = displayedEpicResponses.map(mapProjectEpic);
  const totalCount = epicsData?.totalCount ?? 0;
  const isRetrying = epicsError
    ? areEpicsFetching
    : Boolean(moreEpicsError) && areMoreEpicsFetching;
  const retryInFlightRef = useRef(false);
  const fetchMoreEpics = useCallback(() => {
    void fetchNextPage();
  }, [fetchNextPage]);
  const loadMoreRef = useMobileLoadMore({
    hasMore: hasMoreMobileEpics,
    isFetchingNextPage,
    mediaQuery: mobileProjectEpicsViewportQuery,
    onLoadMore: fetchMoreEpics,
    visibleError,
  });

  useEpicAuthRedirect(isUnauthorized);

  return {
    currentPage,
    epics,
    hasMoreMobileEpics,
    isFetchingNextPage,
    isError,
    isLoading: areEpicsPending || areEpicsFetching || isUnauthorized,
    isRetrying,
    isSearchActive: debouncedSearchTerm.length > 0,
    loadMoreRef,
    onPageChange: setCurrentPage,
    onRetry: () => {
      if (retryInFlightRef.current || isRetrying) {
        return;
      }

      retryInFlightRef.current = true;
      const retryRequest = epicsError ? refetchEpics() : fetchNextPage();

      void retryRequest.finally(() => {
        retryInFlightRef.current = false;
      });
    },
    onSearchTermChange,
    pageSize: limit,
    projectName,
    searchTerm,
    totalCount,
  };
}
