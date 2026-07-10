import { supabase } from '@/lib/supabase';
import {
  isProjectUnauthorizedResponse,
  ProjectUnauthorizedError,
} from '@/features/projects/screens/edit-project-screen/api/project-api-errors';
import { requireProjectSession } from '@/features/projects/screens/edit-project-screen/api/require-project-session';
import type { TaskStatus } from '../../add-new-task-screen/add-new-task-form-schema';
import {
  getTaskTitleValidationMessage,
  isTaskStatus,
  isValidTaskDueDate,
  normalizeNullableTaskText,
} from '../utils/task-update-validation';
import { getTaskDetails, type TaskDetailsResponse } from './get-task-details';

type TaskUpdateValues = {
  assignee_id: string | null;
  description: string | null;
  due_date: string | null;
  epic_id: string | null;
  status: TaskStatus;
  title: string;
};

export type TaskUpdateField = keyof TaskUpdateValues;

type ExactlyOne<T> = {
  [Key in keyof T]: Pick<T, Key> &
    Partial<Record<Exclude<keyof T, Key>, never>>;
}[keyof T];

export type TaskUpdatePayload = ExactlyOne<TaskUpdateValues>;

export type UpdateTaskRequest = {
  projectId: string;
  taskId: string;
  updates: TaskUpdatePayload;
};

export function getTaskUpdateField(
  updates: TaskUpdatePayload,
): TaskUpdateField {
  const fields = Object.entries(updates)
    .filter(([, value]) => value !== undefined)
    .map(([field]) => field as TaskUpdateField);

  if (fields.length !== 1) {
    throw new Error('A task update must contain exactly one changed field.');
  }

  return fields[0];
}

function getValidatedUpdates(updates: TaskUpdatePayload): TaskUpdatePayload {
  const field = getTaskUpdateField(updates);
  const value = updates[field];

  if (field === 'title') {
    const title = typeof value === 'string' ? value.trim() : '';
    const validationMessage = getTaskTitleValidationMessage(title);

    if (validationMessage) {
      throw new Error(validationMessage);
    }

    return { title };
  }

  if (field === 'status') {
    if (!isTaskStatus(value)) {
      throw new Error('Invalid task status.');
    }

    return { status: value };
  }

  if (field === 'due_date') {
    const dueDate = normalizeNullableTaskText(
      typeof value === 'string' ? value : null,
    );

    if (dueDate && !isValidTaskDueDate(dueDate)) {
      throw new Error('Due date must be today or a future valid date.');
    }

    return { due_date: dueDate };
  }

  if (field === 'description') {
    return {
      description: normalizeNullableTaskText(
        typeof value === 'string' ? value : null,
      ),
    };
  }

  if (field === 'assignee_id') {
    return {
      assignee_id: normalizeNullableTaskText(
        typeof value === 'string' ? value : null,
      ),
    };
  }

  return {
    epic_id: normalizeNullableTaskText(
      typeof value === 'string' ? value : null,
    ),
  };
}

export async function updateTask({
  projectId,
  taskId,
  updates,
}: UpdateTaskRequest): Promise<TaskDetailsResponse[]> {
  await requireProjectSession();

  const validatedUpdates = getValidatedUpdates(updates);
  const { error } = await supabase
    .from('tasks')
    .update(validatedUpdates)
    .eq('id', taskId)
    .eq('project_id', projectId)
    .select('id')
    .single();

  if (error) {
    if (isProjectUnauthorizedResponse(error)) {
      throw new ProjectUnauthorizedError();
    }

    throw error;
  }

  return getTaskDetails({ projectId, taskId });
}
