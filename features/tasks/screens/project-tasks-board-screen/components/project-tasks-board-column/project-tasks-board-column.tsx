import type { ReactElement } from 'react';
import { useProjectTasksByStatusQuery } from '../../hooks';
import type { BoardStatusConfig } from '../../types';
import { mapProjectTask } from '../../utils';
import { ProjectTasksBoardColumnContent } from './project-tasks-board-column-content';
import { ProjectTasksBoardColumnHeader } from './project-tasks-board-column-header';

type ProjectTasksBoardColumnProps = {
  config: BoardStatusConfig;
  projectId: string;
};

export function ProjectTasksBoardColumn({
  config,
  projectId,
}: ProjectTasksBoardColumnProps): ReactElement {
  const { data, error, isPending, refetch } = useProjectTasksByStatusQuery(
    projectId,
    config.status,
  );
  const tasks = (data ?? []).map((task) => mapProjectTask(task, config.status));

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
        taskCount={tasks.length}
      />

      <ProjectTasksBoardColumnContent
        error={error}
        isPending={isPending}
        onRetry={() => {
          void refetch();
        }}
        projectId={projectId}
        status={config.status}
        tasks={tasks}
      />
    </section>
  );
}
