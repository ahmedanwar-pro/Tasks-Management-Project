import type { ReactElement } from 'react';
import { TaskDetailsEpicIcon } from '../shared/task-details-icons';
import type { TaskDetailsPopupDetails } from '../../task-details-popup.types';

type TaskDetailsTitleBlockProps = {
  details: TaskDetailsPopupDetails;
};

export function TaskDetailsTitleBlock({
  details,
}: TaskDetailsTitleBlockProps): ReactElement {
  return (
    <header className="border-surface-muted flex h-[149px] shrink-0 flex-col gap-2 border-b px-8 py-6">
      <div className="flex items-center gap-3">
        <span className="bg-surface-highest text-primary text-label-md tracking-label rounded-xs px-2 py-0.5 leading-tight font-bold">
          {details.taskKey}
        </span>
        <span className="text-body-sm text-text-secondary leading-base flex items-center gap-1.5 font-medium">
          <TaskDetailsEpicIcon />
          {details.epicLabel}
        </span>
      </div>
      <h2
        className="text-text-primary max-w-[512px] text-[30px] leading-9 font-bold tracking-normal"
        id="task-details-dialog-title"
      >
        {details.title}
      </h2>
    </header>
  );
}
