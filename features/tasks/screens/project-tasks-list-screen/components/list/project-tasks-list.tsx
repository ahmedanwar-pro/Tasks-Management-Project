import type { ReactElement } from 'react';
import type { ProjectTasksListItem } from '../../types';
import { ProjectTasksListTable } from './project-tasks-list-table';
import { ProjectTasksMobileList } from './project-tasks-mobile-list';

type ProjectTasksListProps = {
  projectId: string;
  tasks: ProjectTasksListItem[];
};

export function ProjectTasksList({
  projectId,
  tasks,
}: ProjectTasksListProps): ReactElement {
  return (
    <section aria-label="Project tasks list" className="mt-5 md:mt-8">
      <ProjectTasksMobileList projectId={projectId} tasks={tasks} />
      <ProjectTasksListTable projectId={projectId} tasks={tasks} />
    </section>
  );
}
