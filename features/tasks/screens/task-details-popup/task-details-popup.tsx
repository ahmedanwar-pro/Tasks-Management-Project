'use client';

import type { JSX } from 'react';
import { TaskDetailsPopupResult } from './components/popup/task-details-popup-result';
import { useTaskDetailsPopupActions, useTaskDetailsPopupData } from './hooks';

type TaskDetailsPopupProps = {
  closeHref: string;
  projectId: string;
  taskId: string;
};

export function TaskDetailsPopup({
  closeHref,
  projectId,
  taskId,
}: TaskDetailsPopupProps): JSX.Element {
  const { copyFeedback, handleClose, handleCopyLink } =
    useTaskDetailsPopupActions(closeHref);
  const { data, error, isPending, isUnauthorized, refetch } =
    useTaskDetailsPopupData(projectId, taskId);

  function handleRetry(): void {
    void refetch();
  }

  return (
    <TaskDetailsPopupResult
      copyFeedback={copyFeedback}
      data={data}
      error={error}
      isPending={isPending}
      isUnauthorized={isUnauthorized}
      onClose={handleClose}
      onCopyLink={handleCopyLink}
      onRetry={handleRetry}
      projectId={projectId}
      taskId={taskId}
    />
  );
}
