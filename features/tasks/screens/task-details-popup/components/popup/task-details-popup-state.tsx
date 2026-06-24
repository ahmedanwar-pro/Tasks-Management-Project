import type { ReactElement } from 'react';
import { EpicDetailsModalShell } from '@/features/epics/screens/epic-details-modal/components/shell/epic-details-modal-shell';
import {
  TaskDetailsPopupStateContent,
  TaskDetailsStateCloseButton,
  type TaskDetailsPopupStateType,
} from './state';

type TaskDetailsPopupStateProps = {
  label: string;
  message?: string;
  onClose: () => void;
  onRetry?: () => void;
  type: TaskDetailsPopupStateType;
};

export function TaskDetailsPopupState({
  label,
  message,
  onClose,
  onRetry,
  type,
}: TaskDetailsPopupStateProps): ReactElement {
  const content = (
    <TaskDetailsPopupStateContent
      message={message}
      onRetry={onRetry}
      type={type}
    />
  );

  return (
    <EpicDetailsModalShell
      closeOnOutsideClick
      initialFocus="none"
      label={label}
      onClose={onClose}
    >
      <div className="relative flex min-h-0 flex-1 flex-col">
        {type === 'loading' ? null : (
          <TaskDetailsStateCloseButton onClose={onClose} />
        )}
        {content}
      </div>
    </EpicDetailsModalShell>
  );
}
