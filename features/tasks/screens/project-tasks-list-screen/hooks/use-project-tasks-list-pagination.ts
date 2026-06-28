'use client';

import { useCallback, useState, useSyncExternalStore } from 'react';
import {
  initialProjectTasksListPage,
  mobileProjectTasksListViewportQuery,
  projectTasksListPageSize,
} from '../utils';

type ProjectTasksListPageState = {
  currentPage: number;
  projectId: string;
};

function getServerViewportSnapshot(): null {
  return null;
}

export function useProjectTasksListPagination(projectId: string) {
  const [pageState, setPageState] = useState<ProjectTasksListPageState>({
    currentPage: initialProjectTasksListPage,
    projectId,
  });
  const currentPage =
    pageState.projectId === projectId
      ? pageState.currentPage
      : initialProjectTasksListPage;
  const setCurrentPage = useCallback(
    (page: number) => {
      setPageState({ currentPage: page, projectId });
    },
    [projectId],
  );
  const resetToFirstPage = useCallback(() => {
    setPageState({
      currentPage: initialProjectTasksListPage,
      projectId,
    });
  }, [projectId]);
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
    setCurrentPage,
  };
}
