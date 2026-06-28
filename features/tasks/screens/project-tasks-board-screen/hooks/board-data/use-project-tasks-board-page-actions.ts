'use client';

import { useCallback, useEffect } from 'react';

type RetryableProjectTasksBoardQuery = {
  error: Error | null;
  refetch: () => Promise<unknown>;
};

type UseProjectTasksBoardPageActionsOptions = {
  advancePage: () => void;
  beginRequest: () => boolean;
  currentPageResults: RetryableProjectTasksBoardQuery[];
  finishRequest: () => void;
  hasNextPage: boolean;
  initialError: Error | null;
  isFetchingNextPage: boolean;
  loadMoreError: Error | null;
};

type ProjectTasksBoardPageActions = {
  loadNextPage: () => void;
  retryNextPage: () => void;
};

export function useProjectTasksBoardPageActions({
  advancePage,
  beginRequest,
  currentPageResults,
  finishRequest,
  hasNextPage,
  initialError,
  isFetchingNextPage,
  loadMoreError,
}: UseProjectTasksBoardPageActionsOptions): ProjectTasksBoardPageActions {
  useEffect(() => {
    if (!isFetchingNextPage) {
      finishRequest();
    }
  }, [finishRequest, isFetchingNextPage]);

  const loadNextPage = useCallback((): void => {
    if (
      !hasNextPage ||
      isFetchingNextPage ||
      initialError ||
      loadMoreError ||
      !beginRequest()
    ) {
      return;
    }

    advancePage();
  }, [
    advancePage,
    beginRequest,
    hasNextPage,
    initialError,
    isFetchingNextPage,
    loadMoreError,
  ]);

  const retryNextPage = useCallback((): void => {
    if (!beginRequest()) {
      return;
    }

    const failedResults = currentPageResults.filter((result) => result.error);

    if (failedResults.length === 0) {
      finishRequest();
      return;
    }

    failedResults.forEach((result) => {
      void result.refetch();
    });
  }, [beginRequest, currentPageResults, finishRequest]);

  return { loadNextPage, retryNextPage };
}
