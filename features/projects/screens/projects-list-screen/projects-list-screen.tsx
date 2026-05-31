'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { isProjectsUnauthorizedError } from './api/get-projects';
import {
  AddProjectCard,
  MobileCreateProjectButton,
  ProjectCard,
  ProjectsEmptyState,
  ProjectsErrorState,
  ProjectsListHeader,
  ProjectsLoadingState,
  ProjectsPagination,
} from './components';
import {
  useMoreProjectsQuery,
  useProjectsQuery,
} from './hooks/use-projects-query';
import {
  useMobileProjectsLoadMore,
  useMobileProjectsViewport,
} from './hooks/use-mobile-projects-pagination';
import {
  initialProjectsPage,
  projectsPerPage,
} from './utils/projects-pagination';
import { mapProject } from './utils/map-project';

export function ProjectsListScreen(): ReactElement {
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

  if (isPending || isUnauthorized) {
    return <ProjectsLoadingState />;
  }

  if (visibleError) {
    return <ProjectsErrorState onRetry={() => void retryProjects()} />;
  }

  if (!data) {
    return <ProjectsLoadingState />;
  }

  const projects = displayedProjectResponses.map(mapProject);

  if (projects.length === 0) {
    return <ProjectsEmptyState />;
  }

  return (
    <section
      aria-labelledby="projects-title"
      className="relative mx-auto flex w-full max-w-7xl flex-col px-6 pt-9 pb-8 lg:h-[calc(100dvh-4rem)] lg:px-8 lg:pt-8"
    >
      <ProjectsListHeader />

      <div className="mt-6 flex flex-col gap-6 lg:mt-8 lg:grid lg:grid-cols-3">
        <ul aria-label="Projects" className="contents">
          {projects.map((project) => (
            <ProjectCard
              className="lg:block"
              key={project.id}
              project={project}
            />
          ))}
        </ul>
        <AddProjectCard />
      </div>

      {hasMoreMobileProjects && (
        <div
          aria-live="polite"
          className="text-text-secondary flex min-h-12 items-center justify-center pt-4 text-[12px] font-medium md:hidden"
          ref={loadMoreRef}
          role={isFetchingNextPage ? 'status' : undefined}
        >
          {isFetchingNextPage ? 'Loading more projects...' : null}
        </div>
      )}

      <ProjectsPagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageSize={projectsPerPage}
        projectCount={projects.length}
        totalCount={data.totalCount}
      />
      <MobileCreateProjectButton />
    </section>
  );
}
