'use client';

import { useRouter } from 'next/navigation';
import type { JSX } from 'react';
import { TaskDetailsPopupContent } from './components/popup';
import { copyCurrentUrl } from './utils/copy-current-url';

type TaskDetailsPopupProps = {
  closeHref: string;
  taskId: string;
};

export function TaskDetailsPopup({
  closeHref,
}: TaskDetailsPopupProps): JSX.Element {
  const router = useRouter();

  function handleClose(): void {
    router.replace(closeHref);
  }

  function handleCopyLink(): void {
    void copyCurrentUrl();
  }

  return (
    <TaskDetailsPopupContent
      onClose={handleClose}
      onCopyLink={handleCopyLink}
    />
  );
}
