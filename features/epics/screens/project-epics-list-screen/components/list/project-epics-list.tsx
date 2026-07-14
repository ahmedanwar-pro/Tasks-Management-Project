import type { ReactElement } from 'react';
import type { ProjectEpicCardProps, ProjectEpicListItem } from '../../types';
import { ProjectEpicCard } from '../card/project-epic-card';

type ProjectEpicsListProps = {
  currentPage: ProjectEpicCardProps['currentPage'];
  epics: ProjectEpicListItem[];
  projectId: string;
};

export function ProjectEpicsList({
  currentPage,
  epics,
  projectId,
}: ProjectEpicsListProps): ReactElement {
  return (
    <div className="mt-6 grid w-full gap-6 lg:mt-6 lg:grid-cols-2">
      {epics.map((epic) => (
        <ProjectEpicCard
          currentPage={currentPage}
          epic={epic}
          key={epic.id}
          projectId={projectId}
        />
      ))}
    </div>
  );
}
