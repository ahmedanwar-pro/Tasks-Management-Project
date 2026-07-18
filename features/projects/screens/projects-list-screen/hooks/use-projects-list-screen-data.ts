'use client';

import { useCallback, useRef, useState } from 'react';
import { useMobileLoadMore } from '@/features/shared/hooks/use-mobile-load-more';
import type { ProjectsListScreenData } from '../types';
import { isProjectsUnauthorizedError } from '../api/get-projects';
import { mapProject } from '../utils/map-project';
import { mobileProjectsViewportQuery } from '../utils/projects-pagination';
import { useProjectsAuthRedirect } from './list-screen-data/use-projects-auth-redirect';
import { useProjectsListScreenPagination } from './list-screen-data/use-projects-list-screen-pagination';
import { useProjectsSearch } from './use-projects-search';
import { useMoreProjectsQuery, useProjectsQuery } from './use-projects-query';

export function useProjectsListScreenData(
  initialPage: number,
  initialSearchTerm: string,
): ProjectsListScreenData {
  const {
    currentPage,
    isMobileViewport,
    limit,
    resetToFirstPage,
    setCurrentPage,
  } = useProjectsListScreenPagination(initialPage);
  const pageBeforeSearchRef = useRef(currentPage);
  const handleDebouncedSearchChange = useCallback(
    (nextSearchTerm: string, previousSearchTerm: string) => {
      const isStartingSearch =
        previousSearchTerm.length === 0 && nextSearchTerm.length > 0;
      const isClearingSearch =
        previousSearchTerm.length > 0 && nextSearchTerm.length === 0;

      if (isStartingSearch) {
        pageBeforeSearchRef.current = currentPage;
        resetToFirstPage(nextSearchTerm);
        return;
      }

      if (isClearingSearch) {
        setCurrentPage(pageBeforeSearchRef.current, nextSearchTerm);
        return;
      }

      resetToFirstPage(nextSearchTerm);
    },
    [currentPage, resetToFirstPage, setCurrentPage],
  );
  const {
    debouncedSearchTerm,
    hasSearchInteracted,
    onSearchTermChange,
    searchTerm,
  } = useProjectsSearch(initialSearchTerm, handleDebouncedSearchChange);
  const { data, error, isPending, refetch } = useProjectsQuery(
    currentPage,
    limit,
    debouncedSearchTerm,
  );
  const {
    data: moreProjectsData,
    error: moreProjectsError,
    fetchNextPage,
    isFetchingNextPage,
  } = useMoreProjectsQuery(limit, debouncedSearchTerm);
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
  const [pendingPaginationState, setPendingPaginationState] = useState<{
    projectCount: number;
    totalCount: number;
  } | null>(null);
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
  const isInitialLoading = isPending || isUnauthorized || (!data && !visibleError);
  const isPageChangeLoading =
    pendingPaginationState !== null && isInitialLoading;
  const isLoading = isInitialLoading;
  const isSearchInputDisabled =
    isInitialLoading && debouncedSearchTerm.length === 0 && !hasSearchInteracted;
  const paginationProjectCount = isPageChangeLoading
    ? pendingPaginationState.projectCount
    : projects.length;
  const paginationTotalCount = isPageChangeLoading
    ? pendingPaginationState.totalCount
    : data?.totalCount ?? 0;
  const handlePageChange = useCallback(
    (page: number) => {
      setPendingPaginationState({
        projectCount: projects.length,
        totalCount: data?.totalCount ?? 0,
      });
      setCurrentPage(page);
    },
    [data?.totalCount, projects.length, setCurrentPage],
  );
  const handleSearchTermChange = useCallback(
    (value: string) => {
      setPendingPaginationState(null);
      onSearchTermChange(value);
    },
    [onSearchTermChange],
  );

  return {
    currentPage,
    hasMoreMobileProjects,
    isFetchingNextPage,
    isLoading,
    isPaginationInteractionDisabled: isPageChangeLoading,
    isPaginationLoading: isPageChangeLoading,
    isSearchInputDisabled,
    isSearchActive: debouncedSearchTerm.length > 0,
    loadMoreRef,
    paginationProjectCount,
    paginationTotalCount,
    onPageChange: handlePageChange,
    onRetry: () => void retryProjects(),
    onSearchTermChange: handleSearchTermChange,
    pageSize: limit,
    projects,
    searchTerm,
    totalCount: data?.totalCount ?? 0,
    visibleError,
  };
}
