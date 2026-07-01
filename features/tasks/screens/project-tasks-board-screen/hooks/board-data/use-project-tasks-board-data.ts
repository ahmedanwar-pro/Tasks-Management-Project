'use client';

import type { ProjectTasksBoardData } from '../../types';
import {
  getProjectTasksBoardScopeKey,
  getProjectTasksBoardQueryData,
} from '../../utils';
import { useProjectTasksBoardPageActions } from './use-project-tasks-board-page-actions';
import { useProjectTasksBoardPaginationState } from './use-project-tasks-board-pagination-state';
import { useProjectTasksBoardQueries } from './use-project-tasks-board-queries';

type UseProjectTasksBoardDataOptions = {
  projectId: string;
  queryScopeKey?: string;
  searchTerm?: string;
};

export function useProjectTasksBoardData({
  projectId,
  queryScopeKey = 'default',
  searchTerm = '',
}: UseProjectTasksBoardDataOptions): ProjectTasksBoardData {
  const scopeKey = getProjectTasksBoardScopeKey(
    projectId,
    queryScopeKey,
    searchTerm,
  );
  const { advancePage, beginRequest, currentPage, finishRequest } =
    useProjectTasksBoardPaginationState(scopeKey);
  const { queryDefinitions, queryResults } = useProjectTasksBoardQueries({
    currentPage,
    projectId,
    queryScopeKey,
    searchTerm,
  });
  const {
    columns,
    currentPageResults,
    hasNextPage,
    hasBoardError,
    initialError,
    isBoardEmpty,
    isFetchingNextPage,
    loadMoreError,
    retryBoard,
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
    hasBoardError,
    isBoardEmpty,
    isFetchingNextPage,
    isSearchActive: searchTerm.length > 0,
    loadMoreError,
    loadNextPage,
    retryBoard,
    retryNextPage,
  };
}
