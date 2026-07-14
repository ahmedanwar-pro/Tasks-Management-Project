'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { TaskDetailsCopyFeedback } from '../../task-details-popup.types';
import { copyCurrentUrl } from '../../utils/copy-current-url';

type UseTaskDetailsPopupActionsResult = {
  copyFeedback: TaskDetailsCopyFeedback | null;
  handleClose: () => void;
  handleCopyLink: () => void;
};

export function useTaskDetailsPopupActions(
  closeHref: string,
  shouldUseHistoryBack: boolean,
): UseTaskDetailsPopupActionsResult {
  const router = useRouter();
  const [copyFeedback, setCopyFeedback] =
    useState<TaskDetailsCopyFeedback | null>(null);

  function handleClose(): void {
    if (shouldUseHistoryBack && window.history.length > 1) {
      router.back();
      return;
    }

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
