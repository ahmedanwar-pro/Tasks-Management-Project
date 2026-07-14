import type { ReactElement } from 'react';
import type { ProjectTasksListItem } from '../../../types';
import { ProjectTasksListTableRow } from './project-tasks-list-table-row';

type ProjectTasksListTableBodyProps = {
  currentPage: number;
  projectId: string;
  shouldShortenCompleted: boolean;
  shouldShortenInProgress: boolean;
  shouldSplitTaskIds: boolean;
  shouldStackDueDates: boolean;
  tasks: ProjectTasksListItem[];
};

export function ProjectTasksListTableBody({
  currentPage,
  projectId,
  shouldShortenCompleted,
  shouldShortenInProgress,
  shouldSplitTaskIds,
  shouldStackDueDates,
  tasks,
}: ProjectTasksListTableBodyProps): ReactElement {
  return (
    <tbody>
      {tasks.map((task) => (
        <ProjectTasksListTableRow
          currentPage={currentPage}
          key={task.id}
          projectId={projectId}
          shouldShortenCompleted={shouldShortenCompleted}
          shouldShortenInProgress={shouldShortenInProgress}
          shouldSplitTaskIds={shouldSplitTaskIds}
          shouldStackDueDates={shouldStackDueDates}
          task={task}
        />
      ))}
    </tbody>
  );
}
