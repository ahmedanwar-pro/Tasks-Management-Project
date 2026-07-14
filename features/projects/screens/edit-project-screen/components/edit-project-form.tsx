'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import {
  ProjectDescriptionField,
  ProjectTitleField,
  projectFormSchema,
  type ProjectFormValues,
} from '../../../project-form';
import { EditProjectFormActions } from './edit-project-form-actions';

type EditProjectFormProps = {
  initialValues: ProjectFormValues;
  initialPage: number;
  initialSource: 'list' | 'sidebar';
  isLoading: boolean;
  onFieldChange: () => void;
  onSubmit: (values: ProjectFormValues) => void;
  projectId: string;
};

export function EditProjectForm({
  initialValues,
  initialPage,
  initialSource,
  isLoading,
  onFieldChange,
  onSubmit,
  projectId,
}: EditProjectFormProps): ReactElement {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<ProjectFormValues>({
    defaultValues: initialValues,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(projectFormSchema),
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
      <EditProjectFormActions
        initialPage={initialPage}
        initialSource={initialSource}
        isLoading={isLoading}
        projectId={projectId}
      />
    </form>
  );
}
