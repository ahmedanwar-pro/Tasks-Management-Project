import Link from 'next/link';
import type { ReactElement } from 'react';
import type { EpicDetailsTask } from '../../types';
import {
  MoreVerticalIcon,
  TaskCheckIcon,
} from '../icons/epic-details-modal-icons';
import { EpicDetailsTaskAssignee } from './epic-details-task-assignee';
import { EpicDetailsTaskDueDate } from './epic-details-task-due-date';

type EpicDetailsTaskCardProps = {
  epicId: string;
  projectId: string;
  task: EpicDetailsTask;
};

export function EpicDetailsTaskCard({
  epicId,
  projectId,
  task,
}: EpicDetailsTaskCardProps): ReactElement {
  return (
    <Link
      aria-label={`Open details for ${task.title}`}
      className="bg-surface hover:border-primary/30 focus-visible:outline-primary flex w-full flex-col gap-3 rounded-lg border border-[#e8edff] p-4 shadow-[0_1px_1px_rgba(0,0,0,0.05)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
      href={`/projects/${projectId}/tasks/${task.id}?fromEpic=${epicId}`}
    >
      <div className="flex min-w-0 items-start justify-between gap-3">
        <h4 className="text-text-primary min-w-0 text-[14px] leading-5 font-semibold break-words">
          {task.title}
        </h4>
        <span
          aria-hidden="true"
          className="mt-[1px] flex h-[9.333px] w-[2.333px] shrink-0 items-center justify-center text-[#4f5f7b]"
        >
          <MoreVerticalIcon className="size-full" />
        </span>
      </div>
      <div className="flex min-w-0 items-center justify-between gap-3">
        <EpicDetailsTaskAssignee assignee={task.assignee} compact />
        <EpicDetailsTaskDueDate
          dateTime={task.dueDateTime}
          isOverdue={task.isOverdue}
          label={task.dueDate}
        />
      </div>
    </Link>
  );
}

type EpicDetailsTaskRowProps = {
  epicId: string;
  projectId: string;
  task: EpicDetailsTask;
};

export function EpicDetailsTaskRow({
  epicId,
  projectId,
  task,
}: EpicDetailsTaskRowProps): ReactElement {
  return (
    <li className="border-border-subtle bg-surface border-t first:border-t-0">
      <Link
        aria-label={`Open details for ${task.title}`}
        className="hover:bg-surface-low focus-visible:outline-primary flex w-full items-center justify-between gap-6 px-4 py-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px]"
        href={`/projects/${projectId}/tasks/${task.id}?fromEpic=${epicId}`}
      >
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
          <span
            aria-hidden="true"
            className="text-text-tertiary flex size-5 items-center justify-center rounded-xs"
          >
            <MoreVerticalIcon />
          </span>
        </div>
      </Link>
    </li>
  );
}
