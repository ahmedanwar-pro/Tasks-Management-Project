'use client';

import type { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';

type EpicDetailsModalCloseProps = {
  projectId: string;
};

type NextHistoryState = {
  idx?: number;
};

export function EpicDetailsModalClose({
  projectId,
}: EpicDetailsModalCloseProps) {
  const router = useRouter();
  const epicsHref = `/projects/${projectId}/epics`;

  function handleClose(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    const historyState = window.history.state as NextHistoryState | null;

    if (typeof historyState?.idx === 'number' && historyState.idx > 0) {
      router.back();
      return;
    }

    router.replace(epicsHref);
  }

  return (
    <a
      aria-label="Close epic details"
      className="focus-visible:outline-primary rounded-md px-2 py-1 text-lg leading-none focus-visible:outline-2 focus-visible:outline-offset-2"
      href={epicsHref}
      onClick={handleClose}
    >
      x
    </a>
  );
}
