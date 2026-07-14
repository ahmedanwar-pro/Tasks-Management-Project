'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { DateField } from '@/components/forms';
import {
  getCreatedProjectEpicDestinationPage,
  getProjectEpicsPageHref,
} from '@/features/epics/screens/project-epics-list-screen/utils';
import {
  addNewEpicFormSchema,
  type AddNewEpicFormValues,
} from '../add-new-epic-form-schema';
import { useCreateEpicMutation } from '../hooks';
import {
  addNewEpicDefaultValues,
  mapAddNewEpicFormToRequest,
} from '../utils';
import { AddNewEpicFormActions } from './add-new-epic-form-actions';
import { EpicAssigneeField } from './epic-assignee-field';
import { EpicDescriptionField } from './epic-description-field';
import { EpicTitleField } from './epic-title-field';

type AddNewEpicFormProps = {
  projectId: string;
};

export function AddNewEpicForm({
  projectId,
}: AddNewEpicFormProps): ReactElement {
  const router = useRouter();
  const {
    error: createEpicError,
    isPending: isCreateEpicPending,
    mutate: submitEpic,
    reset: resetCreateEpic,
  } = useCreateEpicMutation(projectId);
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<AddNewEpicFormValues>({
    defaultValues: addNewEpicDefaultValues,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(addNewEpicFormSchema),
  });

  // eslint-disable-next-line react-hooks/incompatible-library -- The character count must update while typing.
  const descriptionValue = watch('description');

  function handleFieldChange(): void {
    if (createEpicError) {
      resetCreateEpic();
    }
  }

  function handleCreateEpic(values: AddNewEpicFormValues): void {
    resetCreateEpic();

    submitEpic(mapAddNewEpicFormToRequest(values, projectId), {
      onSuccess: () => {
        reset(addNewEpicDefaultValues);

        router.replace(
          getProjectEpicsPageHref(
            projectId,
            getCreatedProjectEpicDestinationPage(),
            'created',
          ),
        );
      },
    });
  }

  return (
    <form
      className="mt-8 flex flex-col gap-6 lg:mt-0 lg:gap-8"
      noValidate
      onChange={handleFieldChange}
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
        <EpicAssigneeField
          projectId={projectId}
          registration={register('assigneeId')}
        />
        <DateField
          {...register('deadline')}
          className="gap-2 lg:gap-4"
          error={errors.deadline?.message}
          label="Deadline"
          labelClassName="text-text-secondary text-[11px] leading-[16.5px] tracking-[1.1px]"
          size="lg"
        />
      </div>

      <AddNewEpicFormActions
        isLoading={isCreateEpicPending}
        projectId={projectId}
      />
    </form>
  );
}
