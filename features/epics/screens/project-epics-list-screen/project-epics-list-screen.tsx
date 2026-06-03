'use client';

import type { ReactElement } from 'react';
import { ProjectEpicsListScreenContent } from './components';
import { useProjectEpicsListScreenData } from './hooks';

type ProjectEpicsListScreenProps = {
  projectId: string;
};

export function ProjectEpicsListScreen({
  projectId,
}: ProjectEpicsListScreenProps): ReactElement {
  const { currentPage, epics, pageSize, projectName, totalCount } =
    useProjectEpicsListScreenData(projectId);

  return (
    <ProjectEpicsListScreenContent
      currentPage={currentPage}
      epics={epics}
      pageSize={pageSize}
      projectId={projectId}
      projectName={projectName}
      totalCount={totalCount}
    />
  );
}
