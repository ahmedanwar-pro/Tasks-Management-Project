'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { ProjectDescriptionField } from './project-description-field';
import { ProjectFormActions } from './project-form-actions';
import { ProjectTitleField } from './project-title-field';
import { addNewProjectSchema, type AddNewProjectFormValues } from '../utils';

type AddNewProjectFormProps = {
  isLoading: boolean;
  onFieldChange: () => void;
  onSubmit: (values: AddNewProjectFormValues, onSuccess: () => void) => void;
};

export function AddNewProjectForm({
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
  } = useForm<AddNewProjectFormValues>({
    defaultValues: {
      description: '',
      name: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(addNewProjectSchema),
  });

  // eslint-disable-next-line react-hooks/incompatible-library -- The character count must update while typing.
  const descriptionValue = watch('description');

  function handleCreateProject(values: AddNewProjectFormValues): void {
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
      <ProjectFormActions isLoading={isLoading} />
    </form>
  );
}
