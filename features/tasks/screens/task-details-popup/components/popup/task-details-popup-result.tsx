import type { ReactElement } from 'react';
import type { TaskDetailsResponse } from '../../api';
import type { TaskDetailsCopyFeedback } from '../../task-details-popup.types';
import { mapTaskDetails } from '../../utils/map-task-details';
import { TaskDetailsPopupContent } from './task-details-popup-content';
import { TaskDetailsPopupState } from './task-details-popup-state';

type TaskDetailsPopupResultProps = {
  copyFeedback: TaskDetailsCopyFeedback | null;
  data: TaskDetailsResponse[] | undefined;
  error: Error | null;
  isPending: boolean;
  isUnauthorized: boolean;
  onClose: () => void;
  onCopyLink: () => void;
  onRetry: () => void;
  projectId: string;
  taskId: string;
};

export function TaskDetailsPopupResult({
  copyFeedback,
  data,
  error,
  isPending,
  isUnauthorized,
  onClose,
  onCopyLink,
  onRetry,
  projectId,
  taskId,
}: TaskDetailsPopupResultProps): ReactElement {
  if (!projectId || !taskId || isPending || isUnauthorized) {
    return (
      <TaskDetailsPopupState
        label="Loading task details"
        onClose={onClose}
        type="loading"
      />
    );
  }

  if (error) {
    return (
      <TaskDetailsPopupState
        label="Task details unavailable"
        message="Failed to load task details"
        onClose={onClose}
        onRetry={onRetry}
        type="error"
      />
    );
  }

  const task = data?.[0];

  if (!task) {
    return (
      <TaskDetailsPopupState
        label="Task not found"
        message="Task not found"
        onClose={onClose}
        type="empty"
      />
    );
  }

  return (
    <TaskDetailsPopupContent
      copyFeedback={copyFeedback}
      details={mapTaskDetails(task)}
      onClose={onClose}
      onCopyLink={onCopyLink}
    />
  );
}
