'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import {
  ProjectDescriptionField,
  ProjectTitleField,
  projectFormSchema,
  type ProjectFormValues,
} from '../../../project-form';
import { ProjectFormActions } from './project-form-actions';

type AddNewProjectFormProps = {
  currentPage: number;
  isLoading: boolean;
  onFieldChange: () => void;
  onSubmit: (values: ProjectFormValues, onSuccess: () => void) => void;
};

export function AddNewProjectForm({
  currentPage,
  isLoading,
  onFieldChange,
  onSubmit,
}: AddNewProjectFormProps): ReactElement {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<ProjectFormValues>({
    defaultValues: {
      description: '',
      name: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(projectFormSchema),
  });

  // eslint-disable-next-line react-hooks/incompatible-library -- The character count must update while typing.
  const descriptionValue = watch('description');

  function handleCreateProject(values: ProjectFormValues): void {
    onSubmit(values, () => reset());
  }

  return (
    <form
      className="flex flex-col gap-6 lg:gap-8"
      noValidate
      onChange={onFieldChange}
      onSubmit={handleSubmit(handleCreateProject)}
    >
      <ProjectTitleField
        error={errors.name?.message}
        registration={register('name')}
      />
      <ProjectDescriptionField
        characterCount={descriptionValue.length}
        error={errors.description?.message}
        registration={register('description')}
      />
      <ProjectFormActions currentPage={currentPage} isLoading={isLoading} />
    </form>
  );
}
