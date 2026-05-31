'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import type { ReactElement } from 'react';
import type { ProjectFormValues } from '../../project-form';
import { ProjectsLoadingState } from '../projects-list-screen/components';
import { ProjectFormToast } from '../add-new-project-screen/components';
import { isProjectUnauthorizedError } from './api';
import { EditProjectCard, EditProjectPageHeader } from './components';
import { useProjectQuery, useUpdateProjectMutation } from './hooks';

type EditProjectScreenProps = {
  projectId: string;
};

export function EditProjectScreen({
  projectId,
}: EditProjectScreenProps): ReactElement {
  const router = useRouter();
  const {
    data: project,
    error: projectError,
    isPending: isProjectPending,
  } = useProjectQuery(projectId);
  const {
    error: updateProjectError,
    isPending: isUpdateProjectPending,
    isSuccess: isUpdateProjectSuccess,
    mutate: submitProject,
    reset: resetUpdateProject,
  } = useUpdateProjectMutation(projectId);
  const visibleError = projectError ?? updateProjectError;
  const isUnauthorized =
    isProjectUnauthorizedError(projectError) ||
    isProjectUnauthorizedError(updateProjectError);
  const initialValues = useMemo<ProjectFormValues>(
    () => ({
      description: project?.description ?? '',
      name: project?.name ?? '',
    }),
    [project?.description, project?.name],
  );

  useEffect(() => {
    if (isUnauthorized) {
      router.replace('/login');
    }
  }, [isUnauthorized, router]);

  function handleFieldChange(): void {
    if (updateProjectError || isUpdateProjectSuccess) {
      resetUpdateProject();
    }
  }

  function handleUpdateProject({
    description,
    name,
  }: ProjectFormValues): void {
    resetUpdateProject();

    submitProject({
      description,
      name: name.trim(),
      projectId,
    });
  }

  if (isProjectPending || isUnauthorized) {
    return <ProjectsLoadingState />;
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-6 pt-8 pb-12 lg:px-8">
      <EditProjectPageHeader />

      <ProjectFormToast
        error={visibleError ? visibleError.message : undefined}
        success={
          isUpdateProjectSuccess ? 'Project updated successfully' : undefined
        }
      />

      <EditProjectCard
        initialValues={initialValues}
        isLoading={isUpdateProjectPending}
        onFieldChange={handleFieldChange}
        onSubmit={handleUpdateProject}
      />
    </section>
  );
}
