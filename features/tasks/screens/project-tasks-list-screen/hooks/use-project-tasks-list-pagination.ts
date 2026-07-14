'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useSyncExternalStore } from 'react';
import {
  getProjectTasksListPageFromSearchParams,
  initialProjectTasksListPage,
  mobileProjectTasksListViewportQuery,
  normalizeProjectTasksListPage,
  projectTasksListPageSize,
} from '../utils';

function getServerViewportSnapshot(): null {
  return null;
}

export function useProjectTasksListPagination() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = getProjectTasksListPageFromSearchParams(searchParams);
  const setCurrentPage = useCallback(
    (page: number) => {
      const nextPage = normalizeProjectTasksListPage(page);
      const params = new URLSearchParams(searchParams.toString());

      if (nextPage === initialProjectTasksListPage) {
        params.delete('page');
      } else {
        params.set('page', String(nextPage));
      }

      const queryString = params.toString();
      const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

      router.replace(nextUrl, { scroll: false });
    },
    [pathname, router, searchParams],
  );
  const resetToFirstPage = useCallback(() => {
    setCurrentPage(initialProjectTasksListPage);
  }, [setCurrentPage]);
  const subscribeToViewport = useCallback(
    (onViewportChange: () => void) => {
      const viewportQuery = window.matchMedia(
        mobileProjectTasksListViewportQuery,
      );
      const handleViewportChange = (): void => {
        if (viewportQuery.matches) {
          resetToFirstPage();
        }

        onViewportChange();
      };

      viewportQuery.addEventListener('change', handleViewportChange);

      return () => {
        viewportQuery.removeEventListener('change', handleViewportChange);
      };
    },
    [resetToFirstPage],
  );
  const getViewportSnapshot = useCallback(
    () => window.matchMedia(mobileProjectTasksListViewportQuery).matches,
    [],
  );
  const mobileViewportSnapshot = useSyncExternalStore(
    subscribeToViewport,
    getViewportSnapshot,
    getServerViewportSnapshot,
  );
  const isViewportResolved = mobileViewportSnapshot !== null;
  const isMobileViewport = mobileViewportSnapshot === true;

  return {
    currentPage,
    isMobileViewport,
    isViewportResolved,
    limit: projectTasksListPageSize,
    resetToFirstPage,
    setCurrentPage,
  };
}
