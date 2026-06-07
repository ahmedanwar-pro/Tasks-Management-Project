'use client';

import type { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { CloseIcon } from '../icons/epic-details-modal-icons';

type EpicDetailsModalCloseProps = {
  className?: string;
  projectId: string;
};

type NextHistoryState = {
  idx?: number;
};

export function closeEpicDetailsModal(
  projectId: string,
  replace: (href: string) => void,
  back: () => void,
) {
  const historyState = window.history.state as NextHistoryState | null;

  if (typeof historyState?.idx === 'number' && historyState.idx > 0) {
    back();
    return;
  }

  replace(`/projects/${projectId}/epics`);
}

export function EpicDetailsModalClose({
  className,
  projectId,
}: EpicDetailsModalCloseProps) {
  const router = useRouter();

  function handleClose(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    closeEpicDetailsModal(projectId, router.replace, router.back);
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
