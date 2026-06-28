import type { ReactElement } from 'react';
import type { ProjectTasksBoardColumnData } from '../../types';
import { ProjectTasksBoardColumnContent } from './project-tasks-board-column-content';
import { ProjectTasksBoardColumnHeader } from './project-tasks-board-column-header';

type ProjectTasksBoardColumnProps = {
  column: ProjectTasksBoardColumnData;
  projectId: string;
};

export function ProjectTasksBoardColumn({
  column,
  projectId,
}: ProjectTasksBoardColumnProps): ReactElement {
  const { config, error, isPending, onRetry, tasks, totalCount } = column;

  return (
    <section
      aria-labelledby={`project-tasks-${config.status}`}
      className="flex w-72 shrink-0 flex-col gap-4"
    >
      <ProjectTasksBoardColumnHeader
        config={config}
        error={error}
        isPending={isPending}
        projectId={projectId}
        taskCount={totalCount}
      />

      <ProjectTasksBoardColumnContent
        error={error}
        isPending={isPending}
        onRetry={onRetry}
        projectId={projectId}
        status={config.status}
        tasks={tasks}
      />
    </section>
  );
}
