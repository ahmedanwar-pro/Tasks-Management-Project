'use client';

import { useDroppable } from '@dnd-kit/core';
import type { ReactElement } from 'react';
import { joinClasses } from '@/components/ui/utils';
import type { ProjectTaskDropData } from '../../utils';
import type { ProjectTasksBoardColumnData } from '../../types';
import { ProjectTasksBoardColumnContent } from './project-tasks-board-column-content';
import { ProjectTasksBoardColumnHeader } from './project-tasks-board-column-header';

type ProjectTasksBoardColumnProps = {
  column: ProjectTasksBoardColumnData;
  hasBoardError: boolean;
  isBoardEmpty: boolean;
  isDragDisabled: boolean;
  isSearchActive: boolean;
  isSearchPending: boolean;
  pendingTaskId: string | null;
  projectId: string;
};

export function ProjectTasksBoardColumn({
  column,
  hasBoardError,
  isBoardEmpty,
  isDragDisabled,
  isSearchActive,
  isSearchPending,
  pendingTaskId,
  projectId,
}: ProjectTasksBoardColumnProps): ReactElement {
  const { config, error, isPending, onRetry, tasks, totalCount } = column;
  const isColumnPending = isPending || isSearchPending;
  const dropData: ProjectTaskDropData = {
    status: config.status,
    type: 'column',
  };
  const { isOver, setNodeRef } = useDroppable({
    data: dropData,
    disabled: isDragDisabled,
    id: `project-tasks-column-${config.status}`,
  });

  return (
    <section
      aria-labelledby={`project-tasks-${config.status}`}
      className={joinClasses(
        'flex w-72 shrink-0 flex-col gap-4 rounded-md transition-colors',
        isOver && 'bg-primary-container-muted/40 ring-primary/30 ring-2',
      )}
      ref={setNodeRef}
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
        isDragDisabled={isDragDisabled}
        isPending={isColumnPending}
        isSearchActive={isSearchActive}
        onRetry={onRetry}
        pendingTaskId={pendingTaskId}
        projectId={projectId}
        status={config.status}
        tasks={tasks}
      />
    </section>
  );
}
