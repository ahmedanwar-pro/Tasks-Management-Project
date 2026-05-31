'use client';

import type { ReactElement } from 'react';
import {
  AddNewProjectCard,
  AddNewProjectPageHeader,
  ProjectFormToast,
} from './components';
import type { ProjectFormValues } from '../../project-form';
import { useCreateProjectMutation } from './hooks/use-create-project-mutation';

export function AddNewProjectScreen(): ReactElement {
  const {
    error: createProjectError,
    isPending: isCreateProjectPending,
    isSuccess: isCreateProjectSuccess,
    mutate: submitProject,
    reset: resetCreateProject,
  } = useCreateProjectMutation();

  function handleFieldChange(): void {
    if (createProjectError || isCreateProjectSuccess) {
      resetCreateProject();
    }
  }

  function handleCreateProject(
    { description, name }: ProjectFormValues,
    onSuccess: () => void,
  ): void {
    resetCreateProject();

    submitProject(
      {
        description,
        name: name.trim(),
      },
      { onSuccess },
    );
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-6 pt-8 pb-12 lg:px-8">
      <AddNewProjectPageHeader />

      <ProjectFormToast
        error={
          createProjectError
            ? `Failed to create project: ${createProjectError.message}`
            : undefined
        }
        success={
          isCreateProjectSuccess ? 'Project created successfully' : undefined
        }
      />

      <AddNewProjectCard
        isLoading={isCreateProjectPending}
        onFieldChange={handleFieldChange}
        onSubmit={handleCreateProject}
      />
    </section>
  );
}
