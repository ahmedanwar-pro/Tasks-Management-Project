'use client';

import { useCallback, useRef, useState } from 'react';

type ProjectTasksBoardPageState = {
  currentPage: number;
  scopeKey: string;
};

type ProjectTasksBoardRequestState = {
  isInFlight: boolean;
  scopeKey: string;
};

type ProjectTasksBoardPaginationState = {
  advancePage: () => void;
  beginRequest: () => boolean;
  currentPage: number;
  finishRequest: () => void;
};

export function useProjectTasksBoardPaginationState(
  scopeKey: string,
): ProjectTasksBoardPaginationState {
  const [pageState, setPageState] = useState<ProjectTasksBoardPageState>({
    currentPage: 1,
    scopeKey,
  });
  const requestStateRef = useRef<ProjectTasksBoardRequestState>({
    isInFlight: false,
    scopeKey,
  });
  const currentPage =
    pageState.scopeKey === scopeKey ? pageState.currentPage : 1;

  const beginRequest = useCallback((): boolean => {
    if (requestStateRef.current.scopeKey !== scopeKey) {
      requestStateRef.current = { isInFlight: false, scopeKey };
    }

    if (requestStateRef.current.isInFlight) {
      return false;
    }

    requestStateRef.current.isInFlight = true;
    return true;
  }, [scopeKey]);

  const finishRequest = useCallback((): void => {
    if (requestStateRef.current.scopeKey === scopeKey) {
      requestStateRef.current.isInFlight = false;
    }
  }, [scopeKey]);

  const advancePage = useCallback((): void => {
    setPageState((previousState) => ({
      currentPage:
        previousState.scopeKey === scopeKey ? previousState.currentPage + 1 : 2,
      scopeKey,
    }));
  }, [scopeKey]);

  return {
    advancePage,
    beginRequest,
    currentPage,
    finishRequest,
  };
}
