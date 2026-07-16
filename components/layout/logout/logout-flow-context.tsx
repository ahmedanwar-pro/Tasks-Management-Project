'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import {
  useQueryClient,
  type QueryClient,
  type QueryKey,
} from '@tanstack/react-query';
import { useLogoutMutation } from '../hooks/use-logout-mutation';

export const logoutRetryErrorMessage =
  'Couldn\u2019t log out. Please try again.';

export type LogoutTriggerId = string;

type LogoutFlowContextValue = {
  activeLogoutTriggerId: LogoutTriggerId | null;
  failedLogoutTriggerId: LogoutTriggerId | null;
  isLogoutPending: boolean;
  logout: (triggerId: LogoutTriggerId) => void;
  logoutError: Error | null;
  registerLogoutErrorTarget: (triggerId: LogoutTriggerId) => () => void;
  resetLogoutError: () => void;
  shouldShowFallbackLogoutError: boolean;
  shouldShowLogoutError: (triggerId: LogoutTriggerId) => boolean;
};

type LogoutFlowProviderProps = {
  children: ReactNode;
};

const authenticatedQueryKeyRoots = new Set([
  'epic-details',
  'epic-details-tasks',
  'my-statistics',
  'project',
  'project-epics',
  'project-members',
  'project-tasks',
  'projects',
  'task-details',
  'task-epic-options',
]);

const LogoutFlowContext = createContext<LogoutFlowContextValue | null>(null);
const logoutSuccessNavigationFallbackMs = 10000;

function isAuthenticatedQueryKey(queryKey: QueryKey): boolean {
  const rootKey = queryKey[0];

  return typeof rootKey === 'string' && authenticatedQueryKeyRoots.has(rootKey);
}

export function removeAuthenticatedQueryData(queryClient: QueryClient): void {
  queryClient.removeQueries({
    predicate: ({ queryKey }) => isAuthenticatedQueryKey(queryKey),
  });
}

export function LogoutFlowProvider({
  children,
}: LogoutFlowProviderProps): ReactElement {
  const queryClient = useQueryClient();
  const [activeLogoutTriggerId, setActiveLogoutTriggerId] =
    useState<LogoutTriggerId | null>(null);
  const [failedLogoutTriggerId, setFailedLogoutTriggerId] =
    useState<LogoutTriggerId | null>(null);
  const [mountedErrorTargetIds, setMountedErrorTargetIds] = useState<
    Set<LogoutTriggerId>
  >(() => new Set());
  const logoutRequestActiveRef = useRef(false);
  const successNavigationFallbackTimerRef = useRef<number | null>(null);
  const logoutMutation = useLogoutMutation();
  const isLogoutPending =
    logoutMutation.isPending || activeLogoutTriggerId !== null;
  const failedTriggerMounted =
    failedLogoutTriggerId !== null &&
    mountedErrorTargetIds.has(failedLogoutTriggerId);

  const resetLogoutError = useCallback(() => {
    setFailedLogoutTriggerId(null);
    logoutMutation.reset();
  }, [logoutMutation]);

  const clearSuccessNavigationFallbackTimer = useCallback(() => {
    if (successNavigationFallbackTimerRef.current === null) {
      return;
    }

    window.clearTimeout(successNavigationFallbackTimerRef.current);
    successNavigationFallbackTimerRef.current = null;
  }, []);

  const finishSuccessfulLogoutTransition = useCallback(() => {
    clearSuccessNavigationFallbackTimer();
    logoutRequestActiveRef.current = false;
    setActiveLogoutTriggerId(null);
  }, [clearSuccessNavigationFallbackTimer]);

  useEffect(
    () => () => {
      clearSuccessNavigationFallbackTimer();
    },
    [clearSuccessNavigationFallbackTimer],
  );

  const logout = useCallback(
    (triggerId: LogoutTriggerId) => {
      if (logoutRequestActiveRef.current) {
        return;
      }

      logoutRequestActiveRef.current = true;
      clearSuccessNavigationFallbackTimer();
      resetLogoutError();
      setActiveLogoutTriggerId(triggerId);

      logoutMutation.mutate(undefined, {
        onError: () => {
          clearSuccessNavigationFallbackTimer();
          logoutRequestActiveRef.current = false;
          setActiveLogoutTriggerId(null);
          setFailedLogoutTriggerId(triggerId);
        },
        onSuccess: () => {
          removeAuthenticatedQueryData(queryClient);
          setFailedLogoutTriggerId(null);
          successNavigationFallbackTimerRef.current = window.setTimeout(() => {
            finishSuccessfulLogoutTransition();
          }, logoutSuccessNavigationFallbackMs);
        },
      });
    },
    [
      clearSuccessNavigationFallbackTimer,
      finishSuccessfulLogoutTransition,
      logoutMutation,
      queryClient,
      resetLogoutError,
    ],
  );

  const registerLogoutErrorTarget = useCallback(
    (triggerId: LogoutTriggerId) => {
      setMountedErrorTargetIds((currentTargetIds) => {
        const nextTargetIds = new Set(currentTargetIds);
        nextTargetIds.add(triggerId);

        return nextTargetIds;
      });

      return () => {
        setMountedErrorTargetIds((currentTargetIds) => {
          const nextTargetIds = new Set(currentTargetIds);
          nextTargetIds.delete(triggerId);

          return nextTargetIds;
        });
      };
    },
    [],
  );

  const shouldShowLogoutError = useCallback(
    (triggerId: LogoutTriggerId) =>
      Boolean(
        logoutMutation.error &&
        failedLogoutTriggerId === triggerId &&
        failedTriggerMounted,
      ),
    [failedLogoutTriggerId, failedTriggerMounted, logoutMutation.error],
  );

  const value = useMemo<LogoutFlowContextValue>(
    () => ({
      activeLogoutTriggerId,
      failedLogoutTriggerId,
      isLogoutPending,
      logout,
      logoutError: logoutMutation.error,
      registerLogoutErrorTarget,
      resetLogoutError,
      shouldShowFallbackLogoutError: Boolean(
        logoutMutation.error && failedLogoutTriggerId && !failedTriggerMounted,
      ),
      shouldShowLogoutError,
    }),
    [
      activeLogoutTriggerId,
      failedLogoutTriggerId,
      failedTriggerMounted,
      isLogoutPending,
      logout,
      logoutMutation.error,
      registerLogoutErrorTarget,
      resetLogoutError,
      shouldShowLogoutError,
    ],
  );

  return (
    <LogoutFlowContext.Provider value={value}>
      {children}
    </LogoutFlowContext.Provider>
  );
}

export function useLogoutFlow(): LogoutFlowContextValue {
  const context = useContext(LogoutFlowContext);

  if (!context) {
    throw new Error('useLogoutFlow must be used within LogoutFlowProvider');
  }

  return context;
}
