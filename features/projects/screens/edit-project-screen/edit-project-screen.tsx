'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import type { ReactElement } from 'react';
import type { ProjectFormValues } from '../../project-form';
import { ProjectsLoadingState } from '../projects-list-screen/components';
import { ProjectFormToast } from '../add-new-project-screen/components';
import {
  getProjectsPageHref,
  getUpdatedProjectDestinationPage,
} from '../projects-list-screen/utils/projects-list-navigation';
import { isProjectUnauthorizedError } from './api';
import { EditProjectCard, EditProjectPageHeader } from './components';
import { useProjectQuery, useUpdateProjectMutation } from './hooks';

type EditProjectScreenProps = {
  initialPage: number;
  initialSource: 'list' | 'sidebar';
  projectId: string;
};

export function EditProjectScreen({
  initialPage,
  initialSource,
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
    if (updateProjectError) {
      resetUpdateProject();
    }
  }

  function handleUpdateProject({
    description,
    name,
  }: ProjectFormValues): void {
    resetUpdateProject();

    submitProject(
      {
        description,
        name: name.trim(),
        projectId,
      },
      {
        onSuccess: () => {
          if (initialSource === 'sidebar') {
            router.replace(`/projects/${projectId}/epics`);

            return;
          }

          try {
            const projectPage = getUpdatedProjectDestinationPage(initialPage);

            router.replace(getProjectsPageHref(projectPage, 'updated'));
          } catch {
            router.replace('/projects');
          }
        },
      },
    );
  }

  if (isProjectPending || isUnauthorized) {
    return <ProjectsLoadingState />;
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-6 pt-8 pb-12 lg:px-8">
      <EditProjectPageHeader projectName={project?.name} />

      <ProjectFormToast
        error={visibleError ? visibleError.message : undefined}
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
