'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
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

type EditProjectFormProps = {
  initialValues: AddNewProjectFormValues;
  isLoading: boolean;
  onFieldChange: () => void;
  onSubmit: (values: AddNewProjectFormValues) => void;
};

export function EditProjectForm({
  initialValues,
  isLoading,
  onFieldChange,
  onSubmit,
}: EditProjectFormProps): ReactElement {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<AddNewProjectFormValues>({
    defaultValues: initialValues,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(addNewProjectSchema),
  });

  // eslint-disable-next-line react-hooks/incompatible-library -- The character count must update while typing.
  const descriptionValue = watch('description');

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  return (
    <form
      className="flex flex-col gap-6 lg:gap-8"
      noValidate
      onChange={onFieldChange}
      onSubmit={handleSubmit(onSubmit)}
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
      <EditProjectFormActions isLoading={isLoading} />
    </form>
  );
}
