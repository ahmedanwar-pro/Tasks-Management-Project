import { formatDisplayDate } from '@/features/shared/utils/date-format';
import { getText } from './text-values';

export function getDisplayDate(value: unknown, fallback = 'Not set'): string {
  const text = getText(value);

  if (!text) {
    return fallback;
  }

  return formatDisplayDate(text, text);
}
