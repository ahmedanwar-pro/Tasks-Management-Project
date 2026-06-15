import type { ReactElement } from 'react';
import { AddNewTaskBreadcrumb } from './add-new-task-breadcrumb';
import { AddNewTaskHeaderContent } from './add-new-task-header-content';

type AddNewTaskPageHeaderProps = {
  projectId: string;
  projectName: string;
};

export function AddNewTaskPageHeader({
  projectId,
  projectName,
}: AddNewTaskPageHeaderProps): ReactElement {
  return (
    <header className="flex flex-col gap-4 lg:gap-8">
      <AddNewTaskBreadcrumb projectId={projectId} projectName={projectName} />
      <AddNewTaskHeaderContent />
    </header>
  );
}
