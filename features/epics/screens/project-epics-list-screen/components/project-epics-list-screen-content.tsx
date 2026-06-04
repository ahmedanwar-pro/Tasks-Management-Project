import type { ReactElement } from 'react';
import type { ProjectEpicListItem } from '../utils';
import { ProjectEpicsHeader } from './header/project-epics-header';
import { ProjectEpicsErrorState } from './list/project-epics-error-state';
import { ProjectEpicsFloatingAddButton } from './list/project-epics-floating-add-button';
import { ProjectEpicsList } from './list/project-epics-list';
import { ProjectEpicsLoadingList } from './list/project-epics-loading-list';
import { ProjectEpicsPagination } from './list/project-epics-pagination';

type ProjectEpicsListScreenContentProps = {
  currentPage: number;
  epics: ProjectEpicListItem[];
  isError: boolean;
  isLoading: boolean;
  onRetry: () => void;
  pageSize: number;
  projectId: string;
  projectName: string;
  totalCount: number;
};

export function ProjectEpicsListScreenContent({
  currentPage,
  epics,
  isError,
  isLoading,
  onRetry,
  pageSize,
  projectId,
  projectName,
  totalCount,
}: ProjectEpicsListScreenContentProps): ReactElement {
  if (isError) {
    return <ProjectEpicsErrorState onRetry={onRetry} />;
  }

  return (
    <section
      aria-labelledby="project-epics-title"
      className="relative mx-auto flex w-full max-w-7xl flex-col px-6 pt-6 pb-32 md:px-8 lg:min-h-[calc(100dvh-4rem)] lg:px-8 lg:pt-8 lg:pb-8"
    >
      <ProjectEpicsHeader projectId={projectId} projectName={projectName} />
      {isLoading ? (
        <ProjectEpicsLoadingList />
      ) : (
        <ProjectEpicsList epics={epics} />
      )}
      {!isLoading && totalCount > 0 ? (
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
