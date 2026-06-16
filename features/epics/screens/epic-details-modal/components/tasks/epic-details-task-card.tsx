import type { ReactElement } from 'react';
import type { EpicDetailsTask } from '../../types';
import {
  MoreVerticalIcon,
  TaskCheckIcon,
} from '../icons/epic-details-modal-icons';
import { EpicDetailsTaskAssignee } from './epic-details-task-assignee';
import { EpicDetailsTaskDueDate } from './epic-details-task-due-date';

type EpicDetailsTaskCardProps = {
  task: EpicDetailsTask;
};

export function EpicDetailsTaskCard({
  task,
}: EpicDetailsTaskCardProps): ReactElement {
  return (
    <article className="bg-surface flex w-full flex-col gap-3 rounded-lg border border-[#e8edff] p-4 shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
      <div className="flex min-w-0 items-start justify-between gap-3">
        <h4 className="text-text-primary min-w-0 text-[14px] leading-5 font-semibold break-words">
          {task.title}
        </h4>
        <button
          aria-label={`Open actions for ${task.title}`}
          className="hover:text-text-primary focus-visible:ring-primary/40 mt-[1px] flex h-[9.333px] w-[2.333px] shrink-0 items-center justify-center text-[#4f5f7b] transition-colors focus-visible:ring-2 focus-visible:outline-none"
          type="button"
        >
          <MoreVerticalIcon className="size-full" />
        </button>
      </div>
      <div className="flex min-w-0 items-center justify-between gap-3">
        <EpicDetailsTaskAssignee assignee={task.assignee} compact />
        <EpicDetailsTaskDueDate
          dateTime={task.dueDateTime}
          isOverdue={task.isOverdue}
          label={task.dueDate}
        />
      </div>
    </article>
  );
}

type EpicDetailsTaskRowProps = {
  task: EpicDetailsTask;
};

export function EpicDetailsTaskRow({
  task,
}: EpicDetailsTaskRowProps): ReactElement {
  return (
    <li className="border-border-subtle bg-surface flex w-full items-center justify-between gap-6 border-t px-4 py-4 first:border-t-0">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <TaskCheckIcon className="text-text-tertiary" />
        <div className="flex min-w-0 flex-col gap-1">
          <h4 className="text-body-md text-text-primary min-w-0 leading-relaxed font-medium break-words">
            {task.title}
          </h4>
          <EpicDetailsTaskAssignee assignee={task.assignee} compact />
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-6">
        <EpicDetailsTaskDueDate
          dateTime={task.dueDateTime}
          label={task.dueDate}
          variant="desktop"
        />
        <button
          aria-label={`Open actions for ${task.title}`}
          className="text-text-tertiary hover:text-text-primary focus-visible:ring-primary/40 flex size-5 items-center justify-center rounded-xs transition-colors focus-visible:ring-2 focus-visible:outline-none"
          type="button"
        >
          <MoreVerticalIcon />
        </button>
      </div>
    </li>
  );
}
