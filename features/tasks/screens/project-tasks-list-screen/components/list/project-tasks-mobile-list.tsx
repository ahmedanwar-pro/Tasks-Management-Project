import Link from 'next/link';
import type { ReactElement } from 'react';
import { Avatar } from '@/components/ui';
import { UnassignedIcon } from '@/features/epics/screens/epic-details-modal/components/icons/epic-details-modal-icons';
import type { ProjectTasksListItem } from '../../types';
import { ProjectTasksListDueDate } from './project-tasks-list-due-date';
import { ProjectTasksListSettingsButton } from './project-tasks-list-settings-button';
import { ProjectTasksListStatusBadge } from './project-tasks-list-status-badge';

type ProjectTasksMobileListProps = {
  projectId: string;
  tasks: ProjectTasksListItem[];
};

function formatMobileDueDate(dateTime: string, fallback: string): string {
  if (!dateTime) {
    return fallback;
  }

  const date = new Date(dateTime);

  if (Number.isNaN(date.getTime())) {
    return fallback;
  }

  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function ProjectTasksMobileList({
  projectId,
  tasks,
}: ProjectTasksMobileListProps): ReactElement {
  return (
    <ul
      aria-label="Project tasks"
      className="flex w-full flex-col gap-3 md:hidden"
    >
      {tasks.map((task) => (
        <li
          className="bg-surface hover:bg-surface-low relative flex min-h-[122px] flex-col justify-between gap-4 rounded-md p-4 shadow-sm transition-colors"
          key={task.id}
        >
          <Link
            aria-label={`Open details for ${task.title}`}
            className="focus-visible:outline-primary absolute inset-0 z-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2"
            href={`/projects/${projectId}/tasks/${task.id}?view=list`}
          >
            <span className="sr-only">Open details for {task.title}</span>
          </Link>
          <div className="pointer-events-none relative z-10 flex min-h-[90px] flex-col justify-between gap-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="text-[11px] leading-[16.5px] font-bold tracking-[-0.55px] text-[#43465480] uppercase">
                  {task.taskId}
                </p>
                <h2 className="text-text-primary mt-[-1px] text-[18px] leading-[24.75px] font-medium tracking-normal break-words">
                  {task.title}
                </h2>
              </div>
              <ProjectTasksListStatusBadge
                allowWrap={false}
                className={task.statusBadgeClassName}
                label={task.statusLabel}
              />
            </div>

            <div className="flex items-end justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                {task.assignee ? (
                  <Avatar
                    className="size-7 rounded-[12px] bg-[#DAE2FF] text-[11px] leading-[normal] font-bold tracking-normal text-[#001848]"
                    initials={task.assignee.initials}
                    name={task.assignee.name}
                    size="sm"
                    src={task.assignee.avatarUrl}
                    tone="custom"
                  />
                ) : (
                  <span
                    aria-label="Unassigned"
                    className="flex size-7 shrink-0 items-center justify-center rounded-[12px] bg-[#DAE2FF] text-[#001848] shadow-sm"
                    role="img"
                  >
                    <UnassignedIcon className="size-3" />
                  </span>
                )}
                <div className="flex min-w-0 flex-col gap-0">
                  <p className="text-[11px] leading-[16.5px] font-bold tracking-normal text-[#434654b2]">
                    DUE DATE
                  </p>
                  <ProjectTasksListDueDate
                    className="text-[12px] leading-4 font-medium tracking-normal"
                    dateTime={task.dueDateTime}
                    label={formatMobileDueDate(task.dueDateTime, task.dueDate)}
                    layout="inline"
                  />
                </div>
              </div>
              <span className="pointer-events-auto relative z-20">
                <ProjectTasksListSettingsButton
                  taskTitle={task.title}
                  variant="mobile"
                />
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
