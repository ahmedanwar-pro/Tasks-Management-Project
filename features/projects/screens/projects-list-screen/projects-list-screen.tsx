'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { ReactElement } from 'react';
import { ProjectsListScreenContent } from './components';
import { useProjectsListScreenData } from './hooks';
import {
  consumePersistedProjectsSuccessState,
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
  const initialSearchTerm = searchParams.get('search') ?? '';
  const [successMessage, setSuccessMessage] = useState(() =>
    successType ? getProjectsSuccessMessage(successType) : undefined,
  );
  const [isSuccessToastVisible, setIsSuccessToastVisible] = useState(
    Boolean(successType),
  );
  const {
    committedSearchTerm,
    currentPage,
    hasMoreMobileProjects,
    isFetchingNextPage,
    isLoading,
    isPaginationInteractionDisabled,
    isPaginationLoading,
    isSearchInputDisabled,
    isSearchActive,
    loadMoreRef,
    onPageChange,
    onRetry,
    onSearchTermChange,
    paginationProjectCount,
    paginationTotalCount,
    pageSize,
    projects,
    searchTerm,
    totalCount,
    visibleError,
  } = useProjectsListScreenData(initialPage, initialSearchTerm);
  const clearProjectsSuccessQuery = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete('success');

    const queryString = params.toString();
    const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

    router.replace(nextUrl, { scroll: false });
  }, [pathname, router, searchParams]);

  const showProjectsSuccessToast = useCallback(
    (projectsSuccessType: ProjectsListSuccessType) => {
      setSuccessMessage(getProjectsSuccessMessage(projectsSuccessType));
      setIsSuccessToastVisible(true);
    },
    [],
  );

  const consumePersistedProjectsSuccess = useCallback(() => {
    const persistedSuccessType = consumePersistedProjectsSuccessState();

    if (!persistedSuccessType) {
      return;
    }

    showProjectsSuccessToast(persistedSuccessType);
  }, [showProjectsSuccessToast]);

  useEffect(() => {
    if (successType) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      consumePersistedProjectsSuccess();
    }, 0);

    window.addEventListener('pageshow', consumePersistedProjectsSuccess);
    window.addEventListener('popstate', consumePersistedProjectsSuccess);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener('pageshow', consumePersistedProjectsSuccess);
      window.removeEventListener('popstate', consumePersistedProjectsSuccess);
    };
  }, [consumePersistedProjectsSuccess, successType]);

  useEffect(() => {
    if (!successType) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      showProjectsSuccessToast(successType);
      clearProjectsSuccessQuery();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [clearProjectsSuccessQuery, showProjectsSuccessToast, successType]);

  useEffect(() => {
    const currentSearchParam = searchParams.get('search') ?? '';

    if (committedSearchTerm === currentSearchParam) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (committedSearchTerm.length === 0) {
      params.delete('search');
    } else {
      params.set('search', committedSearchTerm);
    }

    const queryString = params.toString();
    const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

    router.replace(nextUrl, { scroll: false });
  }, [committedSearchTerm, pathname, router, searchParams]);

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
      isPaginationInteractionDisabled={isPaginationInteractionDisabled}
      isPaginationLoading={isPaginationLoading}
      isSearchInputDisabled={isSearchInputDisabled}
      isSearchActive={isSearchActive}
      loadMoreRef={loadMoreRef}
      onPageChange={onPageChange}
      onSearchTermChange={onSearchTermChange}
      onSuccessToastClose={handleSuccessToastClose}
      onRetry={onRetry}
      paginationProjectCount={paginationProjectCount}
      paginationTotalCount={paginationTotalCount}
      pageSize={pageSize}
      projects={projects}
      searchTerm={searchTerm}
      successMessage={successMessage}
      showSuccessToast={isSuccessToastVisible}
      totalCount={totalCount}
      visibleError={visibleError}
    />
  );
}
