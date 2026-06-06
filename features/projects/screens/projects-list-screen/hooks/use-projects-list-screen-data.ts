'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { isProjectsUnauthorizedError } from '../api/get-projects';
import { mapProject } from '../utils/map-project';
import {
  initialProjectsPage,
  projectsPerPage,
} from '../utils/projects-pagination';
import {
  useMobileProjectsLoadMore,
  useMobileProjectsViewport,
} from './use-mobile-projects-pagination';
import {
  useMoreProjectsQuery,
  useProjectsQuery,
} from './use-projects-query';

export function useProjectsListScreenData() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(initialProjectsPage);
  const resetToFirstPage = useCallback(() => {
    setCurrentPage(initialProjectsPage);
  }, []);
  const isMobileViewport = useMobileProjectsViewport(resetToFirstPage);
  const { data, error, isPending, refetch } = useProjectsQuery(
    currentPage,
    projectsPerPage,
  );
  const {
    data: moreProjectsData,
    error: moreProjectsError,
    fetchNextPage,
    isFetchingNextPage,
  } = useMoreProjectsQuery(projectsPerPage);
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
  const loadMoreRef = useMobileProjectsLoadMore({
    hasMoreProjects: hasMoreMobileProjects,
    isFetchingNextPage,
    onFetchNextPage: fetchMoreProjects,
    visibleError,
  });

  useEffect(() => {
    if (isUnauthorized) {
      router.replace('/login');
    }
  }, [isUnauthorized, router]);

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
    pageSize: projectsPerPage,
    projects,
    totalCount: data?.totalCount ?? 0,
    visibleError,
  };
}
