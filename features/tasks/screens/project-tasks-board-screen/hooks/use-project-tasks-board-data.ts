'use client';

import type { ProjectTasksBoardData } from '../types';
import {
  getProjectTasksBoardScopeKey,
  getProjectTasksBoardQueryData,
} from '../utils';
import { useProjectTasksBoardPageActions } from './board-data/use-project-tasks-board-page-actions';
import { useProjectTasksBoardPaginationState } from './board-data/use-project-tasks-board-pagination-state';
import { useProjectTasksBoardQueries } from './board-data/use-project-tasks-board-queries';

type UseProjectTasksBoardDataOptions = {
  projectId: string;
  queryScopeKey?: string;
};

export function useProjectTasksBoardData({
  projectId,
  queryScopeKey = 'default',
}: UseProjectTasksBoardDataOptions): ProjectTasksBoardData {
  const scopeKey = getProjectTasksBoardScopeKey(projectId, queryScopeKey);
  const { advancePage, beginRequest, currentPage, finishRequest } =
    useProjectTasksBoardPaginationState(scopeKey);
  const { queryDefinitions, queryResults } = useProjectTasksBoardQueries({
    currentPage,
    projectId,
    queryScopeKey,
  });
  const {
    columns,
    currentPageResults,
    hasNextPage,
    initialError,
    isFetchingNextPage,
    loadMoreError,
  } = getProjectTasksBoardQueryData(
    currentPage,
    queryDefinitions,
    queryResults,
  );
  const { loadNextPage, retryNextPage } = useProjectTasksBoardPageActions({
    advancePage,
    beginRequest,
    currentPageResults,
    finishRequest,
    hasNextPage,
    initialError,
    isFetchingNextPage,
    loadMoreError,
  });

  return {
    columns,
    hasNextPage,
    isFetchingNextPage,
    loadMoreError,
    loadNextPage,
    retryNextPage,
  };
}
