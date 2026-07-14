import type { ReactElement } from 'react';
import { EpicDetailsTasksAddButton } from './epic-details-tasks-add-button';
import { EpicDetailsTasksCountBadge } from './epic-details-tasks-count-badge';
import { EpicDetailsTasksHeading } from './epic-details-tasks-heading';

type EpicDetailsTasksHeaderProps = {
  currentPage: number;
  epicId: string;
  isLoading?: boolean;
  projectId: string;
  taskCount: number;
};

export function EpicDetailsTasksHeader({
  currentPage,
  epicId,
  isLoading = false,
  projectId,
  taskCount,
}: EpicDetailsTasksHeaderProps): ReactElement {
  return (
    <div className="flex w-full items-center justify-between">
      <EpicDetailsTasksHeading />
      <EpicDetailsTasksCountBadge isLoading={isLoading} taskCount={taskCount} />
      <EpicDetailsTasksAddButton
        currentPage={currentPage}
        epicId={epicId}
        projectId={projectId}
      />
    </div>
  );
}
