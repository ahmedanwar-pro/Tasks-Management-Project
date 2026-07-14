'use client';

import type { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { getProjectEpicsPageHref } from '@/features/epics/screens/project-epics-list-screen/utils';
import { CloseIcon } from '../icons/epic-details-modal-icons';

type EpicDetailsModalCloseProps = {
  className?: string;
  currentPage: number;
  projectId: string;
  shouldUseHistoryBack?: boolean;
};

export function closeEpicDetailsModal(
  currentPage: number,
  projectId: string,
  replace: (href: string) => void,
  historyBack?: () => void,
  shouldUseHistoryBack = false,
) {
  if (shouldUseHistoryBack && historyBack && window.history.length > 1) {
    historyBack();
    return;
  }

  replace(getProjectEpicsPageHref(projectId, currentPage));
}

export function EpicDetailsModalClose({
  className,
  currentPage,
  projectId,
  shouldUseHistoryBack = false,
}: EpicDetailsModalCloseProps) {
  const router = useRouter();

  function handleClose(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    closeEpicDetailsModal(
      currentPage,
      projectId,
      router.replace,
      router.back,
      shouldUseHistoryBack,
    );
  }

  return (
    <button
      aria-label="Close epic details"
      className={className}
      onClick={handleClose}
      type="button"
    >
      <CloseIcon />
    </button>
  );
}
