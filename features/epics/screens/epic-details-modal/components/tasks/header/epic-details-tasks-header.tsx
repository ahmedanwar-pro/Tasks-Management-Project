import type { ReactElement } from 'react';
import { EpicDetailsTasksAddButton } from './epic-details-tasks-add-button';
import { EpicDetailsTasksCountBadge } from './epic-details-tasks-count-badge';
import { EpicDetailsTasksHeading } from './epic-details-tasks-heading';

type EpicDetailsTasksHeaderProps = {
  taskCount: number;
};

export function EpicDetailsTasksHeader({
  taskCount,
}: EpicDetailsTasksHeaderProps): ReactElement {
  return (
    <div className="flex w-full items-center justify-between">
      <EpicDetailsTasksHeading />
      <EpicDetailsTasksCountBadge taskCount={taskCount} />
      <EpicDetailsTasksAddButton />
    </div>
  );
}
