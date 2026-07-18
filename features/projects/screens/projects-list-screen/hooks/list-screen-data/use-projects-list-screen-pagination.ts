'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useMobileViewport } from '@/features/shared/hooks/use-mobile-viewport';
import {
  initialProjectsPage,
  mobileProjectsViewportQuery,
  normalizeProjectsPage,
  projectsPerPage,
} from '../../utils/projects-pagination';

export function useProjectsListScreenPagination(initialPage: number) {
  const [currentPage, setCurrentPageState] = useState(() =>
    normalizeProjectsPage(initialPage),
  );
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setCurrentPageState(normalizeProjectsPage(initialPage));
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [initialPage]);

  const updateCurrentPage = useCallback(
    (page: number, searchTerm?: string) => {
      const nextPage = normalizeProjectsPage(page);
      const params = new URLSearchParams(window.location.search);

      setCurrentPageState(nextPage);

      if (nextPage === initialProjectsPage) {
        params.delete('page');
      } else {
        params.set('page', String(nextPage));
      }

      if (searchTerm !== undefined) {
        if (searchTerm.length === 0) {
          params.delete('search');
        } else {
          params.set('search', searchTerm);
        }
      }

      const queryString = params.toString();
      const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

      router.replace(nextUrl, { scroll: false });
    },
    [pathname, router],
  );
  const resetToFirstPage = useCallback(
    (searchTerm?: string) => {
      updateCurrentPage(initialProjectsPage, searchTerm);
    },
    [updateCurrentPage],
  );
  const isMobileViewport = useMobileViewport({
    mediaQuery: mobileProjectsViewportQuery,
    onMobileViewport: resetToFirstPage,
  });
  const limit = projectsPerPage;

  return {
    currentPage,
    isMobileViewport,
    limit,
    resetToFirstPage,
    setCurrentPage: updateCurrentPage,
  };
}
