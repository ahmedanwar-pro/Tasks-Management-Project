'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import type { ReactElement } from 'react';
import { isProjectUnauthorizedError } from '@/features/projects/screens/edit-project-screen/api';
import { useEpicAuthRedirect } from '../shared/hooks';
import { EpicDetailsModalContent } from './components/epic-details-modal-content';
import { EpicDetailsModalLoading } from './components/epic-details-modal-loading';
import { EpicDetailsModalUnavailable } from './components/epic-details-modal-error';
import { EpicDetailsModalShell } from './components/shell/epic-details-modal-shell';
import { useEpicDetailsQuery, useUpdateEpicMutation } from './hooks';
import type { EpicDetailsTaskSuccessType } from './utils/epic-details-task-navigation';
import { getEpicDetailsDisplayData } from './utils/epic-details-display-data';

type EpicDetailsModalProps = {
  epicId: string;
  initialPage: number;
  projectId: string;
  shouldUseHistoryBack?: boolean;
  taskSuccessType?: EpicDetailsTaskSuccessType;
};

export function EpicDetailsModal({
  epicId,
  initialPage,
  projectId,
  shouldUseHistoryBack = false,
  taskSuccessType,
}: EpicDetailsModalProps): ReactElement {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    data: epicResponse,
    error,
    isPending,
    refetch,
  } = useEpicDetailsQuery(projectId, epicId);
  const { mutateAsync: updateEpic } = useUpdateEpicMutation(projectId, epicId);
  const isUnauthorized = isProjectUnauthorizedError(error);

  useEpicAuthRedirect(isUnauthorized);

  const clearEpicTaskSuccessQuery = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('taskSuccess');
    const nextUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;

    router.replace(nextUrl, { scroll: false });
  }, [pathname, router, searchParams]);

  useEffect(() => {
    if (!taskSuccessType) {
      return;
    }

    clearEpicTaskSuccessQuery();
  }, [clearEpicTaskSuccessQuery, taskSuccessType]);

  if (isPending) {
    return <EpicDetailsModalLoading projectId={projectId} />;
  }

  if (error || !epicResponse) {
    return (
      <EpicDetailsModalUnavailable
        currentPage={initialPage}
        onRetry={() => {
          void refetch();
        }}
        projectId={projectId}
        shouldUseHistoryBack={shouldUseHistoryBack}
      />
    );
  }

  const epic = getEpicDetailsDisplayData(epicResponse);

  return (
    <EpicDetailsModalShell
      currentPage={initialPage}
      projectId={projectId}
      shouldUseHistoryBack={shouldUseHistoryBack}
    >
      <EpicDetailsModalContent
        epic={epic}
        epicId={epicId}
        initialPage={initialPage}
        projectId={projectId}
        shouldUseHistoryBack={shouldUseHistoryBack}
        taskSuccessType={taskSuccessType}
        updateEpic={updateEpic}
      />
    </EpicDetailsModalShell>
  );
}
