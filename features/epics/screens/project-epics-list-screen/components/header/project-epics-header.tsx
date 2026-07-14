import type { ReactElement, ReactNode } from 'react';
import { ProjectEpicsBreadcrumb } from './project-epics-breadcrumb';
import { ProjectEpicsDesktopNewButton } from './project-epics-desktop-new-button';
import { ProjectEpicsPageTitle } from './project-epics-page-title';
import { ProjectEpicsSearchInput } from './project-epics-search-input';

type ProjectEpicsHeaderProps = {
  children?: ReactNode;
  onSearchTermChange: (value: string) => void;
  projectId: string;
  projectName?: string | null;
  searchTerm: string;
};

export function ProjectEpicsHeader({
  children,
  onSearchTermChange,
  projectId,
  projectName,
  searchTerm,
}: ProjectEpicsHeaderProps): ReactElement {
  return (
    <header className="flex w-full shrink-0 flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-6 xl:gap-8">
      <div className="flex min-w-0 flex-col">
        <ProjectEpicsBreadcrumb projectName={projectName} />
        <ProjectEpicsPageTitle />
        {children ? (
          <div className="w-full max-w-[calc(100vw-3rem)] lg:max-w-[20rem]">
            {children}
          </div>
        ) : null}
      </div>

      <div className="flex w-full flex-col gap-4 lg:w-auto lg:shrink-0 lg:flex-row lg:items-start lg:gap-8">
        <ProjectEpicsSearchInput
          onChange={onSearchTermChange}
          value={searchTerm}
        />
        <ProjectEpicsDesktopNewButton projectId={projectId} />
      </div>
    </header>
  );
}
