import { formatDisplayDate } from '@/features/shared/utils/date-format';
import { getText } from './project-epic-person-utils';

export function formatDate(value?: string | null): string {
  const text = getText(value);

  if (!text) {
    return 'Unknown date';
  }

  return formatDisplayDate(text, text);
}

export function getDateTime(value?: string | null): string {
  const text = getText(value);

  if (!text) {
    return '';
  }

  return Number.isNaN(new Date(text).getTime()) ? '' : text;
}
