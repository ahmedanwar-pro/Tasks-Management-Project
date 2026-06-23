import type { ReactElement } from 'react';
import { TaskDetailsCloseIcon } from '../shared/task-details-icons';

type TaskDetailsMobileHeaderProps = {
  taskKey: string;
  onClose: () => void;
};

export function TaskDetailsMobileHeader({
  taskKey,
  onClose,
}: TaskDetailsMobileHeaderProps): ReactElement {
  return (
    <header className="flex h-[70px] shrink-0 flex-col items-center pt-3 pb-2">
      <div className="h-5 w-10 pb-4">
        <div className="bg-border-muted/50 h-1 w-10 rounded-xl" />
      </div>
      <div className="flex w-full items-center justify-between px-4 min-[375px]:px-6">
        <p className="text-text-tertiary text-[11px] leading-[16.5px] font-bold tracking-[1.1px] uppercase">
          {taskKey}
        </p>
        <button
          aria-label="Close task details"
          className="text-text-secondary focus-visible:outline-primary flex size-[30px] items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2"
          onClick={onClose}
          type="button"
        >
          <TaskDetailsCloseIcon />
        </button>
      </div>
    </header>
  );
}
