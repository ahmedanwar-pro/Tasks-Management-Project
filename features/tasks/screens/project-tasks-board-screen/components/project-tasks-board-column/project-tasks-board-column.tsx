import type { ReactElement } from 'react';
import type { ProjectTasksBoardColumnData } from '../../types';
import { ProjectTasksBoardColumnContent } from './project-tasks-board-column-content';
import { ProjectTasksBoardColumnHeader } from './project-tasks-board-column-header';

type ProjectTasksBoardColumnProps = {
  column: ProjectTasksBoardColumnData;
  hasBoardError: boolean;
  isBoardEmpty: boolean;
  isSearchActive: boolean;
  isSearchPending: boolean;
  projectId: string;
};

export function ProjectTasksBoardColumn({
  column,
  hasBoardError,
  isBoardEmpty,
  isSearchActive,
  isSearchPending,
  projectId,
}: ProjectTasksBoardColumnProps): ReactElement {
  const { config, error, isPending, onRetry, tasks, totalCount } = column;
  const isColumnPending = isPending || isSearchPending;

  return (
    <section
      aria-labelledby={`project-tasks-${config.status}`}
      className="flex w-72 shrink-0 flex-col gap-4"
    >
      <ProjectTasksBoardColumnHeader
        config={config}
        error={error}
        isPending={isColumnPending}
        projectId={projectId}
        taskCount={totalCount}
      />

      <ProjectTasksBoardColumnContent
        error={error}
        hasBoardError={hasBoardError}
        isBoardEmpty={isBoardEmpty}
        isPending={isColumnPending}
        isSearchActive={isSearchActive}
        onRetry={onRetry}
        projectId={projectId}
        status={config.status}
        tasks={tasks}
      />
    </section>
  );
}
