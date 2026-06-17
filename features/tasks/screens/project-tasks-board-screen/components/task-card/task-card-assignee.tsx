import type { ReactElement } from 'react';
import { Avatar } from '@/components/ui';
import { joinClasses } from '@/components/ui/utils';
import { UnassignedIcon } from '@/features/epics/screens/epic-details-modal/components/icons/epic-details-modal-icons';
import type { ProjectTasksBoardAssignee } from '../../types';

type TaskCardAssigneeProps = {
  assignee: ProjectTasksBoardAssignee | null;
  isActiveProgressTask: boolean;
  isReadyForProductionTask: boolean;
};

export function TaskCardAssignee({
  assignee,
  isActiveProgressTask,
  isReadyForProductionTask,
}: TaskCardAssigneeProps): ReactElement {
  if (!assignee) {
    return (
      <span
        aria-label="Unassigned"
        className="bg-surface-high text-text-subtle border-border-inverse flex size-6 shrink-0 items-center justify-center rounded-lg border shadow-sm"
        role="img"
      >
        <UnassignedIcon className="size-3" />
      </span>
    );
  }

  return (
    <Avatar
      className={joinClasses(
        'border-border-inverse rounded-lg border',
        isActiveProgressTask && '!bg-primary-container !text-text-inverse',
        isReadyForProductionTask && '!bg-success-icon !text-text-inverse',
      )}
      initials={assignee.initials}
      name={assignee.name}
      size="sm"
      src={assignee.avatarUrl}
    />
  );
}
