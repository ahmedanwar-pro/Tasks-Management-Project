'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import {
  ProjectDescriptionField,
  ProjectTitleField,
} from '../../add-new-project-screen/components';
import {
  addNewProjectSchema,
  type AddNewProjectFormValues,
} from '../../add-new-project-screen/utils';
import { EditProjectFormActions } from './edit-project-form-actions';

const initialProjectValues: AddNewProjectFormValues = {
  description: '',
  name: 'Project Title',
};

export function EditProjectForm(): ReactElement {
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<AddNewProjectFormValues>({
    defaultValues: initialProjectValues,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(addNewProjectSchema),
  });

  // eslint-disable-next-line react-hooks/incompatible-library -- The character count must update while typing.
  const descriptionValue = watch('description');

  return (
    <form
      className="flex flex-col gap-6 lg:gap-8"
      noValidate
      onSubmit={handleSubmit(() => undefined)}
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
      <EditProjectFormActions />
    </form>
  );
}
