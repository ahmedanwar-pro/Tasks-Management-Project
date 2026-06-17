import type { ReactElement } from 'react';
import { projectTasksBoardStatuses } from '../utils';
import { ProjectTasksBoardColumn } from './project-tasks-board-column';

type ProjectTasksBoardProps = {
  projectId: string;
};

export function ProjectTasksBoard({
  projectId,
}: ProjectTasksBoardProps): ReactElement {
  return (
    <section
      aria-label="Project tasks board"
      className="-mx-6 min-h-0 flex-1 overflow-auto px-6 pb-4 md:-mx-8 md:px-8"
    >
      <div className="flex min-h-full w-max items-start gap-6 pb-4">
        {projectTasksBoardStatuses.map((config) => (
          <ProjectTasksBoardColumn
            config={config}
            key={config.status}
            projectId={projectId}
          />
        ))}
      </div>
    </section>
  );
}
