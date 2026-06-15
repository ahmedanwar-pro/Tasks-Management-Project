import { useEffect } from 'react';
import type { ReactElement } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  addNewTaskFormSchema,
  type AddNewTaskFormValues,
} from '../add-new-task-form-schema';
import { getAddNewTaskDefaultValues } from '../utils';
import {
  AddNewTaskFormActions,
  TaskAssigneeField,
  TaskDescriptionField,
  TaskDueDateField,
  TaskEpicField,
  TaskStatusField,
  TaskTitleField,
} from './add-new-task-form-fields';
import { AddNewTaskFormFeedback } from './add-new-task-form-feedback';
import type { AddNewTaskFormProps } from './add-new-task-form.types';

export function AddNewTaskForm({
  projectId,
  assigneeOptions = [],
  assigneeOptionsError,
  epicOptions = [],
  epicOptionsError,
  initialEpicId,
  isAssigneeOptionsLoading = false,
  isCreating = false,
  isEpicOptionsLoading = false,
  createError,
  createSuccess = false,
  onChange,
  onRetryAssigneeOptions,
  onRetryEpicOptions,
  onSubmit,
}: AddNewTaskFormProps): ReactElement {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<AddNewTaskFormValues>({
    defaultValues: getAddNewTaskDefaultValues(),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(addNewTaskFormSchema),
  });

  useEffect(() => {
    if (!initialEpicId) {
      return;
    }

    const hasInitialEpic = epicOptions.some(
      (epic) => epic.id === initialEpicId,
    );

    setValue('epicId', hasInitialEpic ? initialEpicId : '');
  }, [epicOptions, initialEpicId, setValue]);

  function handleCreateTask(values: AddNewTaskFormValues): void {
    onSubmit?.(values);
  }

  const hasNoAssigneeOptions =
    !isAssigneeOptionsLoading &&
    !assigneeOptionsError &&
    assigneeOptions.length === 0;
  const hasNoEpicOptions =
    !isEpicOptionsLoading && !epicOptionsError && epicOptions.length === 0;

  return (
    <form
      className="mt-8 flex flex-col gap-6 lg:mt-0 lg:gap-8"
      noValidate
      onChange={onChange}
      onSubmit={handleSubmit(handleCreateTask)}
    >
      <AddNewTaskFormFeedback error={createError} success={createSuccess} />

      <fieldset
        className="m-0 flex min-w-0 flex-col gap-6 border-0 p-0 lg:gap-8"
        disabled={isCreating}
      >
        <TaskTitleField
          disabled={isCreating}
          error={errors.title?.message}
          registration={register('title')}
        />

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <TaskStatusField
            disabled={isCreating}
            error={errors.status?.message}
            registration={register('status')}
          />

          <TaskAssigneeField
            assigneeOptions={assigneeOptions}
            disabled={isCreating}
            error={assigneeOptionsError}
            hasNoOptions={hasNoAssigneeOptions}
            isLoading={isAssigneeOptionsLoading}
            onRetry={onRetryAssigneeOptions}
            registration={register('assigneeId')}
          />
        </div>

        <TaskEpicField
          disabled={isCreating}
          epicOptions={epicOptions}
          error={epicOptionsError}
          hasNoOptions={hasNoEpicOptions}
          isLoading={isEpicOptionsLoading}
          onRetry={onRetryEpicOptions}
          registration={register('epicId')}
        />

        <TaskDueDateField
          disabled={isCreating}
          error={errors.dueDate?.message}
          registration={register('dueDate')}
        />

        <TaskDescriptionField
          disabled={isCreating}
          error={errors.description?.message}
          registration={register('description')}
        />
      </fieldset>

      <AddNewTaskFormActions isCreating={isCreating} projectId={projectId} />
    </form>
  );
}
