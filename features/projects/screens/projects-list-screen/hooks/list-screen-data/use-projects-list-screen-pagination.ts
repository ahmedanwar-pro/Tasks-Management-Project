'use client';

import { useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useMobileViewport } from '@/features/shared/hooks/use-mobile-viewport';
import {
  initialProjectsPage,
  mobileProjectsViewportQuery,
  normalizeProjectsPage,
  projectsPerPage,
} from '../../utils/projects-pagination';

export function useProjectsListScreenPagination(initialPage: number) {
  const currentPage = normalizeProjectsPage(initialPage);
  const pathname = usePathname();
  const router = useRouter();
  const updateCurrentPage = useCallback(
    (page: number) => {
      const nextPage = normalizeProjectsPage(page);
      const params = new URLSearchParams(window.location.search);

      if (nextPage === initialProjectsPage) {
        params.delete('page');
      } else {
        params.set('page', String(nextPage));
      }

      const queryString = params.toString();
      const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

      router.replace(nextUrl, { scroll: false });
    },
    [pathname, router],
  );
  const resetToFirstPage = useCallback(() => {
    updateCurrentPage(initialProjectsPage);
  }, [updateCurrentPage]);
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
