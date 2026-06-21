import type { ReactElement } from 'react';
import type { ProjectTasksListItem } from '../../types';
import { ProjectTasksListTable } from './project-tasks-list-table';
import { ProjectTasksMobileList } from './project-tasks-mobile-list';

type ProjectTasksListProps = {
  tasks: ProjectTasksListItem[];
};

export function ProjectTasksList({
  tasks,
}: ProjectTasksListProps): ReactElement {
  return (
    <section aria-label="Project tasks list" className="mt-5 md:mt-8">
      <ProjectTasksMobileList tasks={tasks} />
      <ProjectTasksListTable tasks={tasks} />
    </section>
  );
}
