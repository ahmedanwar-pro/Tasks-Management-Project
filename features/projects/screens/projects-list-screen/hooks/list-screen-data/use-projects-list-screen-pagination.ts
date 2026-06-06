'use client';

import { useCallback, useState } from 'react';
import { useMobileViewport } from '@/features/shared/hooks/use-mobile-viewport';
import {
  initialProjectsPage,
  mobileProjectsViewportQuery,
  projectsPerPage,
} from '../../utils/projects-pagination';

export function useProjectsListScreenPagination() {
  const [currentPage, setCurrentPage] = useState(initialProjectsPage);
  const resetToFirstPage = useCallback(() => {
    setCurrentPage(initialProjectsPage);
  }, []);
  const isMobileViewport = useMobileViewport({
    mediaQuery: mobileProjectsViewportQuery,
    onMobileViewport: resetToFirstPage,
  });
  const limit = projectsPerPage;

  return {
    currentPage,
    isMobileViewport,
    limit,
    setCurrentPage,
  };
}
