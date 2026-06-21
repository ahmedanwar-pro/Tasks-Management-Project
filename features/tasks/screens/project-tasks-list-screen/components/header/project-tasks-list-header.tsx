import type { ReactElement } from 'react';
import { useProjectNameQuery } from '@/features/members/screens/project-members-list-screen/hooks';
import { ProjectTasksBoardBreadcrumb } from '../../../project-tasks-board-screen/components/board-header/project-tasks-board-breadcrumb';
import { ProjectTasksListControls } from './project-tasks-list-controls';
import { ProjectTasksListTitle } from './project-tasks-list-title';

type ProjectTasksListHeaderProps = {
  isAddTaskVisible: boolean;
  projectId: string;
};

export function ProjectTasksListHeader({
  isAddTaskVisible,
  projectId,
}: ProjectTasksListHeaderProps): ReactElement {
  const { data: project } = useProjectNameQuery(projectId);
  const projectName = project?.name ?? 'Project';

  return (
    <header className="flex w-full flex-col gap-6">
      <div className="hidden md:block">
        <ProjectTasksBoardBreadcrumb projectName={projectName} />
      </div>

      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <ProjectTasksListTitle projectName={projectName} />
        <ProjectTasksListControls
          isAddTaskVisible={isAddTaskVisible}
          projectId={projectId}
        />
      </div>
    </header>
  );
}
