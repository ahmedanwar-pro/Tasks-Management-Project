'use client';

import type { ReactElement } from 'react';
import {
  AddNewTaskCard,
  AddNewTaskForm,
  AddNewTaskPageHeader,
} from './components';
import { useAddNewTaskScreenData } from './hooks';

type AddNewTaskScreenProps = {
  projectId: string;
  initialEpicId?: string;
};

export function AddNewTaskScreen({
  projectId,
  initialEpicId,
}: AddNewTaskScreenProps): ReactElement {
  const {
    assigneeOptions,
    assigneeOptionsError,
    createError,
    createSuccess,
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
  } = useAddNewTaskScreenData(projectId);

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
          createSuccess={createSuccess}
          epicOptions={epicOptions}
          epicOptionsError={epicOptionsError}
          initialEpicId={initialEpicId}
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
