import type { ReactElement } from 'react';
import type { ProjectEpicListItem } from '../../utils';
import { ProjectEpicCard } from '../card/project-epic-card';

type ProjectEpicsListProps = {
  epics: ProjectEpicListItem[];
  showAllOnMobile?: boolean;
};

export function ProjectEpicsList({
  epics,
  showAllOnMobile = false,
}: ProjectEpicsListProps): ReactElement {
  return (
    <div className="mt-6 grid w-full gap-6 lg:mt-10 lg:grid-cols-2">
      {epics.map((epic, index) => (
        <ProjectEpicCard
          epic={epic}
          hideOnMobile={!showAllOnMobile && index > 3}
          key={epic.id}
        />
      ))}
    </div>
  );
}
