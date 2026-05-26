import type { ReactElement } from 'react';
import { AddNewProjectForm } from './add-new-project-form';
import { InitializeProjectIntro } from './initialize-project-intro';
import { ProjectTip } from './project-tip';
import type { AddNewProjectFormValues } from '../utils';

type AddNewProjectCardProps = {
  isLoading: boolean;
  onFieldChange: () => void;
  onSubmit: (values: AddNewProjectFormValues, onSuccess: () => void) => void;
};

export function AddNewProjectCard({
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
          isLoading={isLoading}
          onFieldChange={onFieldChange}
          onSubmit={onSubmit}
        />
      </div>

      <ProjectTip />
    </article>
  );
}
