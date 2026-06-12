import type { ReactElement } from 'react';
import type { ProjectEpicListItem } from '../../types';
import { ProjectEpicCard } from '../card/project-epic-card';

type ProjectEpicsListProps = {
  epics: ProjectEpicListItem[];
  projectId: string;
};

export function ProjectEpicsList({
  epics,
  projectId,
}: ProjectEpicsListProps): ReactElement {
  return (
    <div className="mt-6 grid w-full gap-6 lg:mt-6 lg:grid-cols-2">
      {epics.map((epic) => (
        <ProjectEpicCard
          epic={epic}
          key={epic.id}
          projectId={projectId}
        />
      ))}
    </div>
  );
}
