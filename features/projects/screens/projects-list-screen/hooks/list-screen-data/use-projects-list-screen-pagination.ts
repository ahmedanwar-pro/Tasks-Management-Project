'use client';

import { useCallback, useState } from 'react';
import {
  initialProjectsPage,
  projectsPerPage,
} from '../../utils/projects-pagination';
import { useMobileProjectsViewport } from '../mobile-pagination/use-mobile-projects-viewport';

export function useProjectsListScreenPagination() {
  const [currentPage, setCurrentPage] = useState(initialProjectsPage);
  const resetToFirstPage = useCallback(() => {
    setCurrentPage(initialProjectsPage);
  }, []);
  const isMobileViewport = useMobileProjectsViewport(resetToFirstPage);
  const limit = projectsPerPage;

  return {
    currentPage,
    isMobileViewport,
    limit,
    setCurrentPage,
  };
}
