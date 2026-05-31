import type { ReactElement } from 'react';
import { ProjectTip } from '../../add-new-project-screen/components';
import { EditProjectForm } from './edit-project-form';
import { EditProjectIntro } from './edit-project-intro';

export function EditProjectCard(): ReactElement {
  return (
    <article className="lg:bg-surface mx-auto w-full max-w-2xl lg:overflow-hidden lg:rounded-md lg:shadow-sm">
      <div className="lg:border-surface-low lg:border-b lg:px-8 lg:pt-8 lg:pb-10.25">
        <EditProjectIntro />
      </div>

      <div className="pt-8 lg:px-8 lg:pt-8 lg:pb-12">
        <EditProjectForm />
      </div>

      <ProjectTip />
    </article>
  );
}
