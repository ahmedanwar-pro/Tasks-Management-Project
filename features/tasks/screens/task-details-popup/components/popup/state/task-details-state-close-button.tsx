import type { ReactElement } from 'react';
import { TaskDetailsCloseIcon } from '../../shared/task-details-icons';

type TaskDetailsStateCloseButtonProps = {
  onClose: () => void;
};

export function TaskDetailsStateCloseButton({
  onClose,
}: TaskDetailsStateCloseButtonProps): ReactElement {
  return (
    <button
      aria-label="Close task details"
      className="text-text-secondary hover:bg-surface-low hover:text-text-primary focus-visible:outline-primary absolute top-4 right-4 z-10 flex size-[var(--control-height-xs)] items-center justify-center rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
      onClick={onClose}
      type="button"
    >
      <TaskDetailsCloseIcon />
    </button>
  );
}
