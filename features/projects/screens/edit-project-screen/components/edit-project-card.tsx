import type { ReactElement } from 'react';
import type { ProjectFormValues } from '../../../project-form';
import { ProjectTip } from '../../add-new-project-screen/components';
import { EditProjectForm } from './edit-project-form';
import { EditProjectIntro } from './edit-project-intro';

type EditProjectCardProps = {
  initialValues: ProjectFormValues;
  isLoading: boolean;
  onFieldChange: () => void;
  onSubmit: (values: ProjectFormValues) => void;
};

export function EditProjectCard({
  initialValues,
  isLoading,
  onFieldChange,
  onSubmit,
}: EditProjectCardProps): ReactElement {
  return (
    <article className="lg:bg-surface mx-auto w-full max-w-2xl lg:overflow-hidden lg:rounded-md lg:shadow-sm">
      <div className="lg:border-surface-low lg:border-b lg:px-8 lg:pt-8 lg:pb-10.25">
        <EditProjectIntro />
      </div>

      <div className="pt-8 lg:px-8 lg:pt-8 lg:pb-12">
        <EditProjectForm
          initialValues={initialValues}
          isLoading={isLoading}
          onFieldChange={onFieldChange}
          onSubmit={onSubmit}
        />
      </div>

      <ProjectTip />
    </article>
  );
}
