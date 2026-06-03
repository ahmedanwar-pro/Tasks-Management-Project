import type { ReactElement } from 'react';
import type { ProjectEpicListItem } from '../utils';
import { ProjectEpicsHeader } from './header/project-epics-header';
import { ProjectEpicsFloatingAddButton } from './list/project-epics-floating-add-button';
import { ProjectEpicsList } from './list/project-epics-list';
import { ProjectEpicsPagination } from './list/project-epics-pagination';

type ProjectEpicsListScreenContentProps = {
  currentPage: number;
  epics: ProjectEpicListItem[];
  pageSize: number;
  projectId: string;
  projectName: string;
  totalCount: number;
};

export function ProjectEpicsListScreenContent({
  currentPage,
  epics,
  pageSize,
  projectId,
  projectName,
  totalCount,
}: ProjectEpicsListScreenContentProps): ReactElement {
  return (
    <section
      aria-labelledby="project-epics-title"
      className="relative mx-auto flex w-full max-w-7xl flex-col px-6 pt-6 pb-32 md:px-8 lg:min-h-[calc(100dvh-4rem)] lg:px-8 lg:pt-8 lg:pb-8"
    >
      <ProjectEpicsHeader projectId={projectId} projectName={projectName} />
      <ProjectEpicsList epics={epics} />
      {totalCount > 0 ? (
        <ProjectEpicsPagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalCount={totalCount}
          visibleCount={epics.length}
        />
      ) : null}
      <ProjectEpicsFloatingAddButton projectId={projectId} />
    </section>
  );
}
