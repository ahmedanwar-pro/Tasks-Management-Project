import Link from 'next/link';
import type { ReactElement } from 'react';
import { joinClasses } from '@/components/ui/utils';
import type { ProjectTasksBoardTask } from '../../types';
import { TaskCardFooter } from './task-card-footer';
import { TaskCardTitle } from './task-card-title';

type TaskCardProps = {
  projectId: string;
  task: ProjectTasksBoardTask;
};

export function TaskCard({ projectId, task }: TaskCardProps): ReactElement {
  const isDelayed = task.isOverdue;
  const metaLabel = task.isDone
    ? 'COMPLETED'
    : isDelayed
      ? 'DELAYED'
      : task.dueDate;
  const isActiveProgressTask =
    task.status === 'IN_PROGRESS' && !isDelayed && !task.isDone;
  const isReadyForProductionTask =
    task.status === 'READY_FOR_PRODUCTION' && !isDelayed && !task.isDone;

  return (
    <Link
      aria-label={`Open details for ${task.title}`}
      className={joinClasses(
        'bg-surface hover:border-primary/30 focus-visible:outline-primary flex h-[104px] w-full flex-col overflow-hidden rounded-md border border-[#c3c6d61a] p-[17px] shadow-[0_2px_4px_rgba(0,0,0,0.02)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
        task.status === 'IN_PROGRESS' &&
          'border-l-primary-container relative border-l-[3px]',
        isReadyForProductionTask &&
          'border-l-success-icon relative border-l-[3px]',
        isDelayed && '!border-[rgba(186,26,26,0.1)] !bg-[#ffdad633]',
        task.isDone && 'opacity-60',
      )}
      href={`/projects/${projectId}/tasks/${task.id}?view=board`}
    >
      <TaskCardTitle isDone={task.isDone} title={task.title} />
      <TaskCardFooter
        assignee={task.assignee}
        dueDateTime={task.dueDateTime}
        isActiveProgressTask={isActiveProgressTask}
        isDelayed={isDelayed}
        isDone={task.isDone}
        isReadyForProductionTask={isReadyForProductionTask}
        metaLabel={metaLabel}
      />
    </Link>
  );
}
