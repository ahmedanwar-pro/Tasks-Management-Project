import type { ReactElement } from 'react';
import type { ProjectTasksBoardColumnData } from '../../types';
import { ProjectTasksBoardColumn } from '../project-tasks-board-column';

export type ProjectTasksBoardColumnState = {
  hasBoardError: boolean;
  isBoardEmpty: boolean;
  isDragDisabled: boolean;
  isSearchActive: boolean;
  isSearchPending: boolean;
  pendingTaskId: string | null;
};

type ProjectTasksBoardColumnListProps = {
  columns: ProjectTasksBoardColumnData[];
  columnState: ProjectTasksBoardColumnState;
  projectId: string;
};

export function ProjectTasksBoardColumnList({
  columns,
  columnState,
  projectId,
}: ProjectTasksBoardColumnListProps): ReactElement {
  return (
    <div className="flex flex-1 items-start gap-6">
      {columns.map((column) => (
        <ProjectTasksBoardColumn
          {...columnState}
          column={column}
          key={column.config.status}
          projectId={projectId}
        />
      ))}
    </div>
  );
}
