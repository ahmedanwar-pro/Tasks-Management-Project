import type { ReactElement } from 'react';
import type { ProjectTasksListItem } from '../../../types';
import { ProjectTasksListTableRow } from './project-tasks-list-table-row';

type ProjectTasksListTableBodyProps = {
  shouldShortenCompleted: boolean;
  shouldShortenInProgress: boolean;
  shouldSplitTaskIds: boolean;
  shouldStackDueDates: boolean;
  tasks: ProjectTasksListItem[];
};

export function ProjectTasksListTableBody({
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
          key={task.id}
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
