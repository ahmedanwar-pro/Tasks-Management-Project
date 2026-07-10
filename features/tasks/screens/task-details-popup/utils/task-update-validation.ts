import { isEpicDeadlineTodayOrFuture } from '@/features/epics/screens/shared/utils';
import {
  taskStatusValues,
  type TaskStatus,
} from '../../add-new-task-screen/add-new-task-form-schema';

export const taskTitleMaxLength = 100;

export function getTaskTitleValidationMessage(title: string): string | null {
  if (!title) {
    return 'Title is required.';
  }

  if (Array.from(title).length > taskTitleMaxLength) {
    return 'Title must be 100 characters or fewer.';
  }

  return null;
}

export function isTaskStatus(value: unknown): value is TaskStatus {
  return (
    typeof value === 'string' && taskStatusValues.includes(value as TaskStatus)
  );
}

export function isValidTaskDueDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day &&
    isEpicDeadlineTodayOrFuture(value)
  );
}

export const taskDueDatePastMessage =
  'Due date must be today or a future date.';

export function normalizeNullableTaskText(value: string | null): string | null {
  const normalizedValue = value?.trim() ?? '';
  return normalizedValue || null;
}
