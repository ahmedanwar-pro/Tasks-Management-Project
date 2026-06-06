import type { ReactElement } from 'react';
import { ProjectEpicsBreadcrumb } from './project-epics-breadcrumb';
import { ProjectEpicsDesktopNewButton } from './project-epics-desktop-new-button';
import { ProjectEpicsPageTitle } from './project-epics-page-title';
import { ProjectEpicsSearchInput } from './project-epics-search-input';

type ProjectEpicsHeaderProps = {
  projectId: string;
  projectName?: string | null;
};

export function ProjectEpicsHeader({
  projectId,
  projectName,
}: ProjectEpicsHeaderProps): ReactElement {
  return (
    <header className="flex w-full shrink-0 flex-col lg:flex-row lg:items-end lg:justify-between lg:gap-6 xl:gap-8">
      <div className="flex min-w-0 flex-col gap-4">
        <ProjectEpicsBreadcrumb projectName={projectName} />
        <ProjectEpicsPageTitle />
      </div>

      <div className="flex w-full flex-col gap-4 lg:w-auto lg:shrink-0 lg:flex-row lg:items-start lg:gap-8">
        <ProjectEpicsSearchInput />
        <ProjectEpicsDesktopNewButton projectId={projectId} />
      </div>
    </header>
  );
}
