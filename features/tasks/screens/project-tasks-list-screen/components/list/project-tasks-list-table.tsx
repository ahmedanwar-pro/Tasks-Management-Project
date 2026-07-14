'use client';

import type { ReactElement } from 'react';
import { useRef } from 'react';
import { ProjectTasksListPagination } from '../pagination';
import type { ProjectTasksListItem } from '../../types';
import { useProjectTasksListTableLayout } from '../../hooks/use-project-tasks-list-table-layout';
import { ProjectTasksListTableBody } from './table/project-tasks-list-table-body';
import { ProjectTasksListTableHead } from './table/project-tasks-list-table-head';
import { ProjectTasksListTableMeasurements } from './table/project-tasks-list-table-measurements';

type ProjectTasksListTableProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  projectId: string;
  tasks: ProjectTasksListItem[];
  totalCount: number;
};

export function ProjectTasksListTable({
  currentPage,
  onPageChange,
  pageSize,
  projectId,
  tasks,
  totalCount,
}: ProjectTasksListTableProps): ReactElement {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const completedMeasureRef = useRef<HTMLSpanElement>(null);
  const dueDateMeasureRef = useRef<HTMLSpanElement>(null);
  const inProgressMeasureRef = useRef<HTMLSpanElement>(null);
  const taskIdMeasureRef = useRef<HTMLSpanElement>(null);
  const layout = useProjectTasksListTableLayout({
    completedMeasureRef,
    dueDateMeasureRef,
    inProgressMeasureRef,
    tableContainerRef,
    taskIdMeasureRef,
    tasks,
  });

  return (
    <div className="border-surface-muted bg-surface-low hidden rounded-md border p-1 md:block">
      <div
        className="bg-surface relative overflow-hidden rounded-md shadow-sm"
        ref={tableContainerRef}
      >
        <ProjectTasksListTableMeasurements
          completedMeasureRef={completedMeasureRef}
          dueDateMeasureRef={dueDateMeasureRef}
          inProgressMeasureRef={inProgressMeasureRef}
          longestTaskId={layout.longestTaskId}
          taskIdMeasureRef={taskIdMeasureRef}
        />

        <table className="w-full table-fixed border-collapse">
          <caption className="sr-only">Project tasks</caption>
          <ProjectTasksListTableHead />
          <ProjectTasksListTableBody
            currentPage={currentPage}
            projectId={projectId}
            shouldShortenCompleted={layout.shouldShortenCompleted}
            shouldShortenInProgress={layout.shouldShortenInProgress}
            shouldSplitTaskIds={layout.shouldSplitTaskIds}
            shouldStackDueDates={layout.shouldStackDueDates}
            tasks={tasks}
          />
        </table>

        <ProjectTasksListPagination
          currentPage={currentPage}
          onPageChange={onPageChange}
          pageSize={pageSize}
          totalCount={totalCount}
          visibleCount={tasks.length}
        />
      </div>
    </div>
  );
}
