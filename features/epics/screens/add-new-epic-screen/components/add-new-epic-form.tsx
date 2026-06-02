'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { DateField } from '@/components/forms';
import { Button } from '@/components/ui';
import {
  addNewEpicFormSchema,
  type AddNewEpicFormValues,
} from '../add-new-epic-form-schema';
import { EpicAssigneeField } from './epic-assignee-field';
import { EpicDescriptionField } from './epic-description-field';
import { EpicTitleField } from './epic-title-field';

type AddNewEpicFormProps = {
  projectId: string;
};

export function AddNewEpicForm({
  projectId,
}: AddNewEpicFormProps): ReactElement {
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<AddNewEpicFormValues>({
    defaultValues: {
      deadline: '',
      description: '',
      title: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(addNewEpicFormSchema),
  });

  // eslint-disable-next-line react-hooks/incompatible-library -- The character count must update while typing.
  const descriptionValue = watch('description');

  function handleCreateEpic(values: AddNewEpicFormValues): void {
    const trimmedValues = {
      ...values,
      description: values.description.trim(),
      title: values.title.trim(),
    };

    void trimmedValues;
  }

  return (
    <form
      className="mt-8 flex flex-col gap-6 lg:mt-0 lg:gap-8"
      noValidate
      onSubmit={handleSubmit(handleCreateEpic)}
    >
      <EpicTitleField
        error={errors.title?.message}
        registration={register('title')}
      />
      <EpicDescriptionField
        characterCount={descriptionValue.length}
        error={errors.description?.message}
        registration={register('description')}
      />

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <EpicAssigneeField />
        <DateField
          {...register('deadline')}
          className="gap-2 lg:gap-4"
          error={errors.deadline?.message}
          label="Deadline"
          labelClassName="text-text-secondary text-[11px] leading-[16.5px] tracking-[1.1px]"
          size="lg"
        />
      </div>

      <div className="border-border-subtle flex flex-col gap-3 pt-6 lg:flex-row-reverse lg:items-center lg:justify-start lg:gap-4 lg:border-t lg:pt-8">
        <Button
          className="text-body-md lg:text-body-sm h-(--control-height-2xl) rounded-sm px-10 font-semibold lg:h-(--control-height-xl) lg:w-auto lg:font-bold"
          fullWidth
          type="submit"
        >
          Create Epic
        </Button>
        <Link
          className="text-text-tertiary focus-visible:outline-primary text-body-md lg:text-body-sm flex h-(--control-height-2xl) items-center justify-center rounded-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 lg:h-(--control-height-xl) lg:px-6"
          href={`/projects/${projectId}/epics`}
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
