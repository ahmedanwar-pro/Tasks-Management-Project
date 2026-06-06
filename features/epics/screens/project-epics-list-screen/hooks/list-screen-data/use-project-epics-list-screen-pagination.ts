'use client';

import { useCallback, useState } from 'react';
import {
  initialProjectEpicsPage,
  projectEpicsPerPage,
} from '../../utils';
import { useMobileProjectEpicsViewport } from '../mobile-pagination/use-mobile-project-epics-viewport';

export function useProjectEpicsListScreenPagination() {
  const [currentPage, setCurrentPage] = useState(initialProjectEpicsPage);
  const resetToFirstPage = useCallback(() => {
    setCurrentPage(initialProjectEpicsPage);
  }, []);
  const isMobileViewport = useMobileProjectEpicsViewport(resetToFirstPage);
  const limit = projectEpicsPerPage;

  return {
    currentPage,
    isMobileViewport,
    limit,
    setCurrentPage,
  };
}
