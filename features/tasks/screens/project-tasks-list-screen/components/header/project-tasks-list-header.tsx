import type { ReactElement, ReactNode } from 'react';
import { useProjectNameQuery } from '@/features/members/screens/project-members-list-screen/hooks';
import { ProjectTasksBoardBreadcrumb } from '../../../project-tasks-board-screen/components/board-header/project-tasks-board-breadcrumb';
import { ProjectTasksListControls } from './project-tasks-list-controls';
import { ProjectTasksListTitle } from './project-tasks-list-title';

type ProjectTasksListHeaderProps = {
  children?: ReactNode;
  isAddTaskVisible: boolean;
  onSearchTermChange: (value: string) => void;
  projectId: string;
  searchTerm: string;
};

export function ProjectTasksListHeader({
  children,
  isAddTaskVisible,
  onSearchTermChange,
  projectId,
  searchTerm,
}: ProjectTasksListHeaderProps): ReactElement {
  const { data: project } = useProjectNameQuery(projectId);
  const projectName = project?.name ?? 'Project';

  return (
    <header className="flex w-full flex-col gap-6">
      <div className="hidden md:block">
        <ProjectTasksBoardBreadcrumb projectName={projectName} />
      </div>

      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div className="flex min-w-0 flex-col gap-1">
          <ProjectTasksListTitle projectName={projectName} />
          {children ? (
            <div className="w-full max-w-[20rem]">{children}</div>
          ) : null}
        </div>
        <ProjectTasksListControls
          isAddTaskVisible={isAddTaskVisible}
          onSearchTermChange={onSearchTermChange}
          projectId={projectId}
          searchTerm={searchTerm}
        />
      </div>
    </header>
  );
}
