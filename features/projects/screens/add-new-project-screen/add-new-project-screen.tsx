'use client';

import { useRouter } from 'next/navigation';
import type { ReactElement } from 'react';
import {
  AddNewProjectCard,
  AddNewProjectPageHeader,
  ProjectFormToast,
} from './components';
import type { ProjectFormValues } from '../../project-form';
import { useCreateProjectMutation } from './hooks/use-create-project-mutation';
import {
  persistProjectsSuccessState,
  getCreatedProjectDestinationPage,
  getProjectsPageHref,
} from '../projects-list-screen/utils/projects-list-navigation';

type AddNewProjectScreenProps = {
  initialPage: number;
};

export function AddNewProjectScreen({
  initialPage,
}: AddNewProjectScreenProps): ReactElement {
  const router = useRouter();
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
      {
        onSuccess: () => {
          onSuccess();

          persistProjectsSuccessState('created');

          if (window.history.length > 1) {
            router.back();

            return;
          }

          router.replace(
            getProjectsPageHref(getCreatedProjectDestinationPage(), 'created'),
          );
        },
      },
    );
  }

  const createProjectErrorMessage = createProjectError
    ? `Failed to create project: ${createProjectError.message}`
    : undefined;

  return (
    <section className="relative mx-auto w-full max-w-7xl px-6 pt-8 pb-12 lg:px-8">
      <AddNewProjectPageHeader currentPage={initialPage} />

      <ProjectFormToast
        className="lg:hidden xl:block"
        error={createProjectErrorMessage}
      />

      <div className="relative mx-auto w-full max-w-2xl">
        <ProjectFormToast
          className="hidden lg:top-auto lg:bottom-[calc(100%+12px)] lg:left-0 lg:block lg:translate-x-0 xl:hidden"
          error={createProjectErrorMessage}
        />

        <AddNewProjectCard
          currentPage={initialPage}
          isLoading={isCreateProjectPending}
          onFieldChange={handleFieldChange}
          onSubmit={handleCreateProject}
        />
      </div>
    </section>
  );
}
