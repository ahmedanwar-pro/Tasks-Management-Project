'use client';

import { useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useMobileViewport } from '@/features/shared/hooks/use-mobile-viewport';
import {
  initialProjectEpicsPage,
  mobileProjectEpicsViewportQuery,
  normalizeProjectEpicsPage,
  projectEpicsPerPage,
} from '../utils';

export function useProjectEpicsListScreenPagination(initialPage: number) {
  const currentPage = normalizeProjectEpicsPage(initialPage);
  const pathname = usePathname();
  const router = useRouter();
  const setCurrentPage = useCallback(
    (page: number) => {
      const nextPage = normalizeProjectEpicsPage(page);
      const params = new URLSearchParams(window.location.search);

      if (nextPage === initialProjectEpicsPage) {
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
    setCurrentPage(initialProjectEpicsPage);
  }, [setCurrentPage]);
  const isMobileViewport = useMobileViewport({
    mediaQuery: mobileProjectEpicsViewportQuery,
    onMobileViewport: resetToFirstPage,
  });
  const limit = projectEpicsPerPage;

  return {
    currentPage,
    isMobileViewport,
    limit,
    resetToFirstPage,
    setCurrentPage,
  };
}
