'use client';

import { useCallback, useState } from 'react';
import { useMobileViewport } from '@/features/shared/hooks/use-mobile-viewport';
import {
  initialProjectEpicsPage,
  mobileProjectEpicsViewportQuery,
  projectEpicsPerPage,
} from '../utils';

export function useProjectEpicsListScreenPagination() {
  const [currentPage, setCurrentPage] = useState(initialProjectEpicsPage);
  const resetToFirstPage = useCallback(() => {
    setCurrentPage(initialProjectEpicsPage);
  }, []);
  const isMobileViewport = useMobileViewport({
    mediaQuery: mobileProjectEpicsViewportQuery,
    onMobileViewport: resetToFirstPage,
  });
  const limit = projectEpicsPerPage;

  return {
    currentPage,
    isMobileViewport,
    limit,
    setCurrentPage,
  };
}
