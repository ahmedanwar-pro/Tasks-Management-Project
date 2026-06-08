'use client';

import { useCallback } from 'react';
import { useMobileLoadMore } from '@/features/shared/hooks/use-mobile-load-more';
import type { ProjectEpicsListScreenData } from '../types';
import { getTotalPages } from '@/features/shared/utils/pagination';
import { useEpicAuthRedirect } from '../../shared/hooks';
import {
  getProjectEpicsDisplayData,
  getProjectEpicsErrorState,
  mapProjectEpic,
  mobileProjectEpicsViewportQuery,
} from '../utils';
import { useProjectEpicsListScreenPagination } from './use-project-epics-list-screen-pagination';
import { useProjectEpicsProjectName } from './use-project-epics-project-name';
import {
  useMoreProjectEpicsQuery,
  useProjectEpicsQuery,
} from './use-project-epics-query';

export function useProjectEpicsListScreenData(
  projectId: string,
): ProjectEpicsListScreenData {
  const { currentPage, isMobileViewport, limit, setCurrentPage } =
    useProjectEpicsListScreenPagination();
  const projectName = useProjectEpicsProjectName(projectId);
  const {
    data: epicsData,
    error: epicsError,
    isPending: areEpicsPending,
    refetch: refetchEpics,
  } = useProjectEpicsQuery(projectId, currentPage, limit);
  const {
    data: moreEpicsData,
    error: moreEpicsError,
    fetchNextPage,
    isFetchingNextPage,
  } = useMoreProjectEpicsQuery(projectId, limit);
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
  const totalPages = getTotalPages(totalCount, limit);
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
    isLoading: areEpicsPending || isUnauthorized,
    isMobileViewport,
    loadMoreRef,
    onPageChange: setCurrentPage,
    onRetry: () => {
      void (epicsError ? refetchEpics() : fetchNextPage());
    },
    pageSize: limit,
    projectName,
    totalCount,
    totalPages,
  };
}
