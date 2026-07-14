'use client';

import type { ReactElement } from 'react';
import type { TaskStatus } from './add-new-task-form-schema';
import {
  AddNewTaskCard,
  AddNewTaskForm,
  AddNewTaskPageHeader,
} from './components';
import { useAddNewTaskScreenData } from './hooks';

type AddNewTaskScreenProps = {
  projectId: string;
  initialEpicId?: string;
  initialPage?: number;
  initialSource?: 'epic-details';
  initialStatus?: TaskStatus;
};

export function AddNewTaskScreen({
  projectId,
  initialEpicId,
  initialPage,
  initialSource,
  initialStatus,
}: AddNewTaskScreenProps): ReactElement {
  const {
    assigneeOptions,
    assigneeOptionsError,
    createError,
    epicOptions,
    epicOptionsError,
    handleCreateTask,
    isAssigneeOptionsLoading,
    isCreating,
    isEpicOptionsLoading,
    projectName,
    resetCreateTask,
    retryAssigneeOptions,
    retryEpicOptions,
  } = useAddNewTaskScreenData(
    projectId,
    initialEpicId,
    initialPage,
    initialSource,
  );

  return (
    <section
      aria-labelledby="add-new-task-title"
      className="mx-auto w-full max-w-4xl px-6 pt-8 pb-56 lg:pt-10 lg:pb-12"
    >
      <AddNewTaskPageHeader projectId={projectId} projectName={projectName} />
      <AddNewTaskCard>
        <AddNewTaskForm
          assigneeOptions={assigneeOptions}
          assigneeOptionsError={assigneeOptionsError}
          isAssigneeOptionsLoading={isAssigneeOptionsLoading}
          isCreating={isCreating}
          isEpicOptionsLoading={isEpicOptionsLoading}
          createError={createError}
          epicOptions={epicOptions}
          epicOptionsError={epicOptionsError}
          initialEpicId={initialEpicId}
          initialStatus={initialStatus}
          onChange={resetCreateTask}
          onRetryAssigneeOptions={retryAssigneeOptions}
          onRetryEpicOptions={retryEpicOptions}
          onSubmit={handleCreateTask}
          projectId={projectId}
        />
      </AddNewTaskCard>
    </section>
  );
}
