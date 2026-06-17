import type { ReactElement } from 'react';
import { useProjectNameQuery } from '@/features/members/screens/project-members-list-screen/hooks';
import { ProjectTasksBoardBreadcrumb } from './project-tasks-board-breadcrumb';
import { ProjectTasksBoardControls } from './project-tasks-board-controls';
import { ProjectTasksBoardTitle } from './project-tasks-board-title';

type BoardHeaderProps = {
  projectId: string;
};

export function BoardHeader({ projectId }: BoardHeaderProps): ReactElement {
  const { data: project } = useProjectNameQuery(projectId);
  const projectName = project?.name ?? 'Project';

  return (
    <header className="flex w-full flex-col gap-6">
      <ProjectTasksBoardBreadcrumb projectName={projectName} />

      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <ProjectTasksBoardTitle projectName={projectName} />
        <ProjectTasksBoardControls projectId={projectId} />
      </div>
    </header>
  );
}
