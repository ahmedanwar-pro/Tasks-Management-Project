'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { ReactElement } from 'react';
import { ProjectEpicsListScreenContent } from './components';
import { useProjectEpicsListScreenData } from './hooks';
import {
  getProjectEpicsSuccessMessage,
  type ProjectEpicsListSuccessType,
} from './utils';

const epicCreationSuccessToastDurationMs = 4000;

type ProjectEpicsListScreenProps = {
  initialPage: number;
  projectId: string;
  successType?: ProjectEpicsListSuccessType;
};

export function ProjectEpicsListScreen({
  initialPage,
  projectId,
  successType,
}: ProjectEpicsListScreenProps): ReactElement {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [successMessage] = useState(() =>
    successType ? getProjectEpicsSuccessMessage(successType) : undefined,
  );
  const [isSuccessToastVisible, setIsSuccessToastVisible] =
    useState(Boolean(successType));
  const {
    currentPage,
    epics,
    hasMoreMobileEpics,
    isFetchingNextPage,
    isError,
    isLoading,
    isRetrying,
    isSearchActive,
    loadMoreRef,
    onPageChange,
    onRetry,
    onSearchTermChange,
    pageSize,
    projectName,
    searchTerm,
    totalCount,
  } = useProjectEpicsListScreenData(projectId, initialPage);
  const clearProjectEpicsSuccessQuery = useCallback(() => {
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

    clearProjectEpicsSuccessQuery();
  }, [clearProjectEpicsSuccessQuery, successType]);

  const handleSuccessToastClose = useCallback(() => {
    setIsSuccessToastVisible(false);
  }, []);

  useEffect(() => {
    if (!isSuccessToastVisible) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsSuccessToastVisible(false);
    }, epicCreationSuccessToastDurationMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isSuccessToastVisible]);

  return (
    <ProjectEpicsListScreenContent
      currentPage={currentPage}
      epics={epics}
      hasMoreMobileEpics={hasMoreMobileEpics}
      isFetchingNextPage={isFetchingNextPage}
      isError={isError}
      isLoading={isLoading}
      isRetrying={isRetrying}
      isSearchActive={isSearchActive}
      loadMoreRef={loadMoreRef}
      onPageChange={onPageChange}
      onRetry={onRetry}
      onSearchTermChange={onSearchTermChange}
      onSuccessToastClose={handleSuccessToastClose}
      pageSize={pageSize}
      projectId={projectId}
      projectName={projectName}
      searchTerm={searchTerm}
      showSuccessToast={isSuccessToastVisible}
      successMessage={successMessage}
      totalCount={totalCount}
    />
  );
}
