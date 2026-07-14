'use client';

import { useCallback } from 'react';
import { useMobileLoadMore } from '@/features/shared/hooks/use-mobile-load-more';
import type { ProjectsListScreenData } from '../types';
import { isProjectsUnauthorizedError } from '../api/get-projects';
import { mapProject } from '../utils/map-project';
import { mobileProjectsViewportQuery } from '../utils/projects-pagination';
import { useProjectsAuthRedirect } from './list-screen-data/use-projects-auth-redirect';
import { useProjectsListScreenPagination } from './list-screen-data/use-projects-list-screen-pagination';
import { useMoreProjectsQuery, useProjectsQuery } from './use-projects-query';

export function useProjectsListScreenData(
  initialPage: number,
): ProjectsListScreenData {
  const { currentPage, isMobileViewport, limit, setCurrentPage } =
    useProjectsListScreenPagination(initialPage);
  const { data, error, isPending, refetch } = useProjectsQuery(
    currentPage,
    limit,
  );
  const {
    data: moreProjectsData,
    error: moreProjectsError,
    fetchNextPage,
    isFetchingNextPage,
  } = useMoreProjectsQuery(limit);
  const firstPageProjects = data?.projects ?? [];
  const additionalMobileProjects =
    moreProjectsData?.pages.flatMap((page) => page.projects) ?? [];
  const displayedProjectResponses = isMobileViewport
    ? [...firstPageProjects, ...additionalMobileProjects]
    : firstPageProjects;
  const hasMoreMobileProjects =
    isMobileViewport &&
    data !== undefined &&
    displayedProjectResponses.length < data.totalCount;
  const visibleError =
    error ?? (isMobileViewport ? moreProjectsError : undefined);
  const isUnauthorized =
    isProjectsUnauthorizedError(error) ||
    isProjectsUnauthorizedError(moreProjectsError);
  const fetchMoreProjects = useCallback(() => {
    void fetchNextPage();
  }, [fetchNextPage]);
  const loadMoreRef = useMobileLoadMore({
    hasMore: hasMoreMobileProjects,
    isFetchingNextPage,
    mediaQuery: mobileProjectsViewportQuery,
    onLoadMore: fetchMoreProjects,
    visibleError,
  });

  useProjectsAuthRedirect(isUnauthorized);

  const retryProjects = error ? refetch : fetchNextPage;
  const projects = displayedProjectResponses.map(mapProject);

  return {
    currentPage,
    hasMoreMobileProjects,
    isFetchingNextPage,
    isLoading: isPending || isUnauthorized || (!data && !visibleError),
    loadMoreRef,
    onPageChange: setCurrentPage,
    onRetry: () => void retryProjects(),
    pageSize: limit,
    projects,
    totalCount: data?.totalCount ?? 0,
    visibleError,
  };
}
