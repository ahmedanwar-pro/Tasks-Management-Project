'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { ReactElement } from 'react';
import { ProjectsListScreenContent } from './components';
import { useProjectsListScreenData } from './hooks';
import {
  getProjectsSuccessMessage,
  type ProjectsListSuccessType,
} from './utils/projects-list-navigation';

const projectCreationSuccessToastDurationMs = 4000;

type ProjectsListScreenProps = {
  initialPage: number;
  successType?: ProjectsListSuccessType;
};

export function ProjectsListScreen({
  initialPage,
  successType,
}: ProjectsListScreenProps): ReactElement {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [successMessage] = useState(() =>
    successType ? getProjectsSuccessMessage(successType) : undefined,
  );
  const [isSuccessToastVisible, setIsSuccessToastVisible] =
    useState(Boolean(successType));
  const {
    currentPage,
    hasMoreMobileProjects,
    isFetchingNextPage,
    isLoading,
    loadMoreRef,
    onPageChange,
    onRetry,
    pageSize,
    projects,
    totalCount,
    visibleError,
  } = useProjectsListScreenData(initialPage);
  const clearProjectsSuccessQuery = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete('success');

    const queryString = params.toString();
    const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

    router.replace(nextUrl, { scroll: false });
  }, [pathname, router, searchParams]);

  useEffect(() => {
    if (!successType) {
      return;
    }

    clearProjectsSuccessQuery();
  }, [clearProjectsSuccessQuery, successType]);

  const handleSuccessToastClose = useCallback(() => {
    setIsSuccessToastVisible(false);
  }, []);

  useEffect(() => {
    if (!isSuccessToastVisible) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsSuccessToastVisible(false);
    }, projectCreationSuccessToastDurationMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isSuccessToastVisible]);

  return (
    <ProjectsListScreenContent
      currentPage={currentPage}
      hasMoreMobileProjects={hasMoreMobileProjects}
      isFetchingNextPage={isFetchingNextPage}
      isLoading={isLoading}
      loadMoreRef={loadMoreRef}
      onPageChange={onPageChange}
      onSuccessToastClose={handleSuccessToastClose}
      onRetry={onRetry}
      pageSize={pageSize}
      projects={projects}
      successMessage={successMessage}
      showSuccessToast={isSuccessToastVisible}
      totalCount={totalCount}
      visibleError={visibleError}
    />
  );
}
