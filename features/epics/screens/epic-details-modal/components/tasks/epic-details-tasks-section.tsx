import type { ReactElement } from 'react';
import { EpicDetailsTasksEmptyState } from './epic-details-tasks-empty-state';
import { EpicDetailsTasksHeader } from './header/epic-details-tasks-header';

type EpicDetailsTasksSectionProps = {
  taskCount: number;
};

export function EpicDetailsTasksSection({
  taskCount,
}: EpicDetailsTasksSectionProps): ReactElement {
  return (
    <section className="flex w-full flex-col gap-4 md:gap-6">
      <EpicDetailsTasksHeader taskCount={taskCount} />
      <EpicDetailsTasksEmptyState />
    </section>
  );
}
