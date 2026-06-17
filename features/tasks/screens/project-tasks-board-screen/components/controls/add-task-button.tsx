import Link from 'next/link';
import type { ReactElement } from 'react';
import type { TaskStatus } from '../../../add-new-task-screen/add-new-task-form-schema';
import { AddTaskIcon, CompactAddTaskIcon } from '../icons';

type AddTaskButtonProps = {
  compact?: boolean;
  projectId: string;
  status: TaskStatus;
};

export function AddTaskButton({
  compact = false,
  projectId,
  status,
}: AddTaskButtonProps): ReactElement {
  const href = `/projects/${projectId}/tasks/new?status=${status}`;

  if (compact) {
    return (
      <Link
        aria-label={`Add task in ${status.replaceAll('_', ' ')}`}
        className="text-text-subtle hover:text-primary focus-visible:outline-primary inline-flex shrink-0 items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
        href={href}
      >
        <CompactAddTaskIcon />
      </Link>
    );
  }

  return (
    <Link
      className="text-text-secondary/60 hover:border-primary/30 hover:bg-surface-low focus-visible:outline-primary flex w-full items-center justify-center gap-2 rounded-md border-2 border-dashed border-[#c3c6d64d] px-0.5 py-[18px] text-[12px] leading-tight font-bold tracking-[1.2px] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
      href={href}
    >
      <AddTaskIcon />
      Add New Task
    </Link>
  );
}
