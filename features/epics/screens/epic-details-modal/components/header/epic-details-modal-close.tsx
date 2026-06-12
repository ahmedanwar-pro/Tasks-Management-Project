'use client';

import type { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { CloseIcon } from '../icons/epic-details-modal-icons';

type EpicDetailsModalCloseProps = {
  className?: string;
  projectId: string;
};

export function closeEpicDetailsModal(
  projectId: string,
  replace: (href: string) => void,
) {
  replace(`/projects/${projectId}/epics`);
}

export function EpicDetailsModalClose({
  className,
  projectId,
}: EpicDetailsModalCloseProps) {
  const router = useRouter();

  function handleClose(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    closeEpicDetailsModal(projectId, router.replace);
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
