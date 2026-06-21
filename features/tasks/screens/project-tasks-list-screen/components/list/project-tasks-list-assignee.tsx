import type { ReactElement } from 'react';
import { Avatar } from '@/components/ui';
import { joinClasses } from '@/components/ui/utils';
import { UnassignedIcon } from '@/features/epics/screens/epic-details-modal/components/icons/epic-details-modal-icons';
import type {
  ProjectTasksBoardAssignee,
  ProjectTasksBoardTask,
} from '../../../project-tasks-board-screen/types';

type ProjectTasksListAssigneeProps = {
  assignee: ProjectTasksBoardAssignee | null;
  status: ProjectTasksBoardTask['status'];
  statusBadgeClassName: string;
};

function getAssigneeAvatarClassName({
  status,
  statusBadgeClassName,
}: Pick<
  ProjectTasksListAssigneeProps,
  'status' | 'statusBadgeClassName'
>): string {
  if (status === 'BLOCKED') {
    return 'rounded-full bg-danger text-text-inverse';
  }

  return joinClasses('rounded-full', statusBadgeClassName);
}

export function ProjectTasksListAssignee({
  assignee,
  status,
  statusBadgeClassName,
}: ProjectTasksListAssigneeProps): ReactElement {
  if (!assignee) {
    return (
      <span className="flex min-w-0 items-center gap-3">
        <span
          aria-label="Unassigned"
          className="bg-surface-high text-text-subtle border-border-inverse flex size-7 shrink-0 items-center justify-center rounded-full border shadow-sm"
          role="img"
        >
          <UnassignedIcon className="size-3" />
        </span>
        <span className="text-text-secondary text-[13px] leading-[17px]">
          Unassigned
        </span>
      </span>
    );
  }

  return (
    <div className="flex min-w-0 items-center gap-3">
      <Avatar
        className={getAssigneeAvatarClassName({
          status,
          statusBadgeClassName,
        })}
        initials={assignee.initials}
        name={assignee.name}
        size="md"
        src={assignee.avatarUrl}
        tone="custom"
      />
      <span className="text-text-primary min-w-0 text-[13px] leading-[17px] font-medium break-normal whitespace-normal">
        {assignee.name}
      </span>
    </div>
  );
}
