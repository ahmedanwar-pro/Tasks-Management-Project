import type { ReactElement } from 'react';
import { EpicDetailsTasksEmptyState } from './epic-details-tasks-empty-state';
import { EpicDetailsTasksHeader } from './header/epic-details-tasks-header';

type EpicDetailsTasksSectionProps = {
  epicId: string;
  projectId: string;
  taskCount: number;
};

export function EpicDetailsTasksSection({
  epicId,
  projectId,
  taskCount,
}: EpicDetailsTasksSectionProps): ReactElement {
  return (
    <section className="flex w-full flex-col gap-4 md:gap-6">
      <EpicDetailsTasksHeader
        epicId={epicId}
        projectId={projectId}
        taskCount={taskCount}
      />
      <EpicDetailsTasksEmptyState epicId={epicId} projectId={projectId} />
    </section>
  );
}
