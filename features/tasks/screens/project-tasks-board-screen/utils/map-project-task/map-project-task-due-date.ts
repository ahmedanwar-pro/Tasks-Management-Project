import { formatDisplayDate } from '@/features/shared/utils/date-format';
import { getText } from './map-project-task-text';

export function getTaskDueDate(value?: string | null): string {
  const text = getText(value);

  if (!text) {
    return 'No due date';
  }

  return formatDisplayDate(text, text);
}

export function getTaskDueDateTime(value?: string | null): string {
  const text = getText(value);

  if (!text || Number.isNaN(new Date(text).getTime())) {
    return '';
  }

  return text;
}

function getDateOnly(value: string): Date | null {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function isTaskOverdue(value?: string | null): boolean {
  const text = getText(value);

  if (!text) {
    return false;
  }

  const dueDate = getDateOnly(text);

  if (!dueDate) {
    return false;
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  return dueDate < today;
}
