import type { ReactElement } from 'react';
import type { ProjectFormValues } from '../../../project-form';
import { AddNewProjectForm } from './add-new-project-form';
import { InitializeProjectIntro } from './initialize-project-intro';
import { ProjectTip } from './project-tip';

type AddNewProjectCardProps = {
  currentPage: number;
  isLoading: boolean;
  onFieldChange: () => void;
  onSubmit: (values: ProjectFormValues, onSuccess: () => void) => void;
};

export function AddNewProjectCard({
  currentPage,
  isLoading,
  onFieldChange,
  onSubmit,
}: AddNewProjectCardProps): ReactElement {
  return (
    <article className="lg:bg-surface mx-auto w-full max-w-2xl lg:overflow-hidden lg:rounded-md lg:shadow-sm">
      <div className="lg:border-surface-low lg:border-b lg:px-8 lg:pt-8 lg:pb-10.25">
        <InitializeProjectIntro />
      </div>

      <div className="pt-8 lg:px-8 lg:pt-8 lg:pb-12">
        <AddNewProjectForm
          currentPage={currentPage}
          isLoading={isLoading}
          onFieldChange={onFieldChange}
          onSubmit={onSubmit}
        />
      </div>

      <ProjectTip />
    </article>
  );
}
