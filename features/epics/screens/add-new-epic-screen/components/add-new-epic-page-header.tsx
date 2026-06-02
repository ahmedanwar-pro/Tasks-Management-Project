import type { ReactElement } from 'react';
import { getBreadcrumbProjectName } from '../utils';
import { AddNewEpicBreadcrumb } from './add-new-epic-breadcrumb';
import { AddNewEpicHeaderContent } from './add-new-epic-header-content';

type AddNewEpicPageHeaderProps = {
  projectId: string;
  projectName?: string | null;
};

export function AddNewEpicPageHeader({
  projectId,
  projectName,
}: AddNewEpicPageHeaderProps): ReactElement {
  const breadcrumbProjectName = getBreadcrumbProjectName(projectName);

  return (
    <header className="flex flex-col gap-1.5 lg:gap-8">
      <AddNewEpicBreadcrumb
        projectId={projectId}
        projectName={breadcrumbProjectName}
      />
      <AddNewEpicHeaderContent />
    </header>
  );
}
