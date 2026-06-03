import type { ReactElement } from 'react';
import {
  ProjectEpicsFloatingAddButton,
  ProjectEpicsHeader,
  ProjectEpicsList,
  ProjectEpicsPagination,
} from './components';
import { sampleEpics } from './utils';

type ProjectEpicsListScreenProps = {
  projectId: string;
};

export function ProjectEpicsListScreen({
  projectId,
}: ProjectEpicsListScreenProps): ReactElement {
  const projectName = 'Project Name';

  return (
    <section
      aria-labelledby="project-epics-title"
      className="relative mx-auto flex w-full max-w-7xl flex-col px-6 pt-6 pb-32 md:px-8 lg:min-h-[calc(100dvh-4rem)] lg:px-8 lg:pt-8 lg:pb-8"
    >
      <ProjectEpicsHeader projectId={projectId} projectName={projectName} />
      <ProjectEpicsList epics={sampleEpics} />
      <ProjectEpicsPagination
        currentPage={1}
        pageSize={6}
        totalCount={24}
        visibleCount={sampleEpics.length}
      />
      <ProjectEpicsFloatingAddButton projectId={projectId} />
    </section>
  );
}
