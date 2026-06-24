'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { TaskDetailsCopyFeedback } from '../task-details-popup.types';
import { copyCurrentUrl } from '../utils/copy-current-url';

type UseTaskDetailsPopupActionsResult = {
  copyFeedback: TaskDetailsCopyFeedback | null;
  handleClose: () => void;
  handleCopyLink: () => void;
};

export function useTaskDetailsPopupActions(
  closeHref: string,
): UseTaskDetailsPopupActionsResult {
  const router = useRouter();
  const [copyFeedback, setCopyFeedback] =
    useState<TaskDetailsCopyFeedback | null>(null);

  function handleClose(): void {
    router.replace(closeHref);
  }

  function handleCopyLink(): void {
    setCopyFeedback(null);

    void copyCurrentUrl()
      .then(() => {
        setCopyFeedback({ success: 'Task link copied.' });
      })
      .catch(() => {
        setCopyFeedback({ error: 'Could not copy task link.' });
      });
  }

  return {
    copyFeedback,
    handleClose,
    handleCopyLink,
  };
}
