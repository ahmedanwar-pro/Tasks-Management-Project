'use client';

import type { ReactElement } from 'react';
import { useProjectNameQuery } from '@/features/members/screens/project-members-list-screen/hooks';
import {
  AddNewEpicCard,
  AddNewEpicForm,
  AddNewEpicPageHeader,
} from './components';
import { useAddNewEpicBreadcrumbVisibility } from './hooks';

type AddNewEpicScreenProps = {
  projectId: string;
};

export function AddNewEpicScreen({
  projectId,
}: AddNewEpicScreenProps): ReactElement {
  const isBreadcrumbVisible = useAddNewEpicBreadcrumbVisibility();
  const { data: project } = useProjectNameQuery(
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
