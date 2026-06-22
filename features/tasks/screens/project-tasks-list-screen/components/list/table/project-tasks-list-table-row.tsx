'use client';

import { useRouter } from 'next/navigation';
import type { KeyboardEvent, MouseEvent, ReactElement } from 'react';
import type { ProjectTasksListItem } from '../../../types';
import { ProjectTasksListAssignee } from '../project-tasks-list-assignee';
import { ProjectTasksListDueDate } from '../project-tasks-list-due-date';
import { ProjectTasksListSettingsButton } from '../project-tasks-list-settings-button';
import { ProjectTasksListStatusBadge } from '../project-tasks-list-status-badge';

type ProjectTasksListTableRowProps = {
  projectId: string;
  shouldShortenCompleted: boolean;
  shouldShortenInProgress: boolean;
  shouldSplitTaskIds: boolean;
  shouldStackDueDates: boolean;
  task: ProjectTasksListItem;
};

type ProjectTasksListTaskIdProps = {
  isSplit: boolean;
  taskId: string;
};

function splitTaskId(taskId: string): { label: string; number: string } {
  const [label, ...rest] = taskId.split('-');

  return {
    label: label || taskId,
    number: rest.join('-'),
  };
}

function ProjectTasksListTaskId({
  isSplit,
  taskId,
}: ProjectTasksListTaskIdProps): ReactElement {
  const { label, number } = splitTaskId(taskId);

  if (!isSplit || !number) {
    return <span>{taskId}</span>;
  }

  return (
    <span className="flex flex-col items-center text-center">
      <span>{label}</span>
      <span>{number}</span>
    </span>
  );
}

function getResponsiveStatusLabel({
  label,
  shouldShortenCompleted,
  shouldShortenInProgress,
}: {
  label: string;
  shouldShortenCompleted: boolean;
  shouldShortenInProgress: boolean;
}): string {
  if (shouldShortenInProgress && label === 'IN PROGRESS') {
    return 'PROGRESS';
  }

  if (shouldShortenCompleted && label === 'COMPLETED') {
    return 'COMPLETE';
  }

  return label;
}

export function ProjectTasksListTableRow({
  projectId,
  shouldShortenCompleted,
  shouldShortenInProgress,
  shouldSplitTaskIds,
  shouldStackDueDates,
  task,
}: ProjectTasksListTableRowProps): ReactElement {
  const router = useRouter();
  const taskDetailsHref = `/projects/${projectId}/tasks/${task.id}?view=list`;

  function openTaskDetails(): void {
    router.push(taskDetailsHref);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTableRowElement>): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openTaskDetails();
    }
  }

  function stopRowNavigation(event: MouseEvent<HTMLTableCellElement>): void {
    event.stopPropagation();
  }

  function stopRowKeyboard(event: KeyboardEvent<HTMLTableCellElement>): void {
    event.stopPropagation();
  }

  return (
    <tr
      aria-label={`Open details for ${task.title}`}
      className="border-surface-muted hover:bg-surface-low focus-visible:outline-primary h-[68px] cursor-pointer border-t transition-colors first:border-t-0 focus-visible:outline-2 focus-visible:outline-offset-[-2px]"
      onClick={openTaskDetails}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <th
        className="px-6 py-4 text-left text-[12px] leading-4 font-normal text-[#003D9B]"
        scope="row"
      >
        <ProjectTasksListTaskId
          isSplit={shouldSplitTaskIds}
          taskId={task.taskId}
        />
      </th>
      <td className="px-6 py-4">
        <p className="text-text-primary text-[14px] leading-[17px] font-medium break-words">
          {task.title}
        </p>
      </td>
      <td className="px-6 py-4">
        <ProjectTasksListStatusBadge
          className={task.statusBadgeClassName}
          label={getResponsiveStatusLabel({
            label: task.statusLabel,
            shouldShortenCompleted,
            shouldShortenInProgress,
          })}
        />
      </td>
      <td className="py-4 pr-4 pl-8 xl:px-6">
        <ProjectTasksListDueDate
          className="text-[14px] leading-[17px]"
          dateTime={task.dueDateTime}
          label={task.dueDate}
          layout={shouldStackDueDates ? 'stacked' : 'inline'}
        />
      </td>
      <td className="py-4 pr-4 pl-8 xl:px-6">
        <ProjectTasksListAssignee
          assignee={task.assignee}
          status={task.status}
          statusBadgeClassName={task.statusBadgeClassName}
        />
      </td>
      <td
        className="py-4 pr-4 pl-1 text-right xl:pr-6 xl:pl-2"
        onClick={stopRowNavigation}
        onKeyDown={stopRowKeyboard}
      >
        <ProjectTasksListSettingsButton taskTitle={task.title} />
      </td>
    </tr>
  );
}
