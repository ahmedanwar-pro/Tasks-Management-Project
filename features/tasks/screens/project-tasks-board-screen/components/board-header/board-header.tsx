import type { ReactElement, ReactNode } from 'react';
import { useProjectNameQuery } from '@/features/members/screens/project-members-list-screen/hooks';
import { ProjectTasksBoardBreadcrumb } from './project-tasks-board-breadcrumb';
import { ProjectTasksBoardControls } from './project-tasks-board-controls';
import { ProjectTasksBoardTitle } from './project-tasks-board-title';

type BoardHeaderProps = {
  children?: ReactNode;
  onSearchTermChange: (value: string) => void;
  projectId: string;
  searchTerm: string;
};

export function BoardHeader({
  children,
  onSearchTermChange,
  projectId,
  searchTerm,
}: BoardHeaderProps): ReactElement {
  const { data: project } = useProjectNameQuery(projectId);
  const projectName = project?.name ?? 'Project';

  return (
    <header className="flex w-full flex-col gap-6">
      <ProjectTasksBoardBreadcrumb projectName={projectName} />

      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div className="flex min-w-0 flex-col gap-1">
          <ProjectTasksBoardTitle projectName={projectName} />
          {children ? (
            <div className="w-full max-w-[20rem]">{children}</div>
          ) : null}
        </div>
        <ProjectTasksBoardControls
          onSearchTermChange={onSearchTermChange}
          projectId={projectId}
          searchTerm={searchTerm}
        />
      </div>
    </header>
  );
}
