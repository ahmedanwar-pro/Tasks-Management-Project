'use client';

import { useCallback } from 'react';
import type { ProjectEpicsListScreenData } from '../types';
import {
  getProjectEpicsDisplayData,
  getProjectEpicsErrorState,
  getTotalPages,
  mapProjectEpic,
} from '../utils';
import { useProjectEpicsAuthRedirect } from './list-screen-data/use-project-epics-auth-redirect';
import { useProjectEpicsListScreenPagination } from './list-screen-data/use-project-epics-list-screen-pagination';
import { useProjectEpicsProjectName } from './list-screen-data/use-project-epics-project-name';
import { useMobileProjectEpicsLoadMore } from './mobile-pagination/use-mobile-project-epics-load-more';
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
  const loadMoreRef = useMobileProjectEpicsLoadMore({
    hasMoreEpics: hasMoreMobileEpics,
    isFetchingNextPage,
    onFetchNextPage: fetchMoreEpics,
    visibleError,
  });

  useProjectEpicsAuthRedirect(isUnauthorized);

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
