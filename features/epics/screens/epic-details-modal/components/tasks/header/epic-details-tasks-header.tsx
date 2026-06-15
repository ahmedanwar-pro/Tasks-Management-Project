import type { ReactElement } from 'react';
import { EpicDetailsTasksAddButton } from './epic-details-tasks-add-button';
import { EpicDetailsTasksCountBadge } from './epic-details-tasks-count-badge';
import { EpicDetailsTasksHeading } from './epic-details-tasks-heading';

type EpicDetailsTasksHeaderProps = {
  epicId: string;
  projectId: string;
  taskCount: number;
};

export function EpicDetailsTasksHeader({
  epicId,
  projectId,
  taskCount,
}: EpicDetailsTasksHeaderProps): ReactElement {
  return (
    <div className="flex w-full items-center justify-between">
      <EpicDetailsTasksHeading />
      <EpicDetailsTasksCountBadge taskCount={taskCount} />
      <EpicDetailsTasksAddButton epicId={epicId} projectId={projectId} />
    </div>
  );
}
