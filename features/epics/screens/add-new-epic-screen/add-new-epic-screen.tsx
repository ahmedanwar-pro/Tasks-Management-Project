'use client';

import type { ReactElement } from 'react';
import {
  AddNewEpicCard,
  AddNewEpicForm,
  AddNewEpicPageHeader,
} from './components';
import {
  useAddNewEpicBreadcrumbVisibility,
  useAddNewEpicProjectQuery,
} from './hooks';

type AddNewEpicScreenProps = {
  projectId: string;
};

export function AddNewEpicScreen({
  projectId,
}: AddNewEpicScreenProps): ReactElement {
  const isBreadcrumbVisible = useAddNewEpicBreadcrumbVisibility();
  const { data: project } = useAddNewEpicProjectQuery(
    projectId,
    isBreadcrumbVisible,
  );
  const projectName = project?.name ?? 'Project';

  return (
    <section
      aria-labelledby="add-new-epic-title"
      className="mx-auto w-full max-w-4xl px-6 pt-8 pb-12 lg:pt-10"
    >
      <AddNewEpicPageHeader projectId={projectId} projectName={projectName} />
      <AddNewEpicCard>
        <AddNewEpicForm projectId={projectId} />
      </AddNewEpicCard>
    </section>
  );
}
