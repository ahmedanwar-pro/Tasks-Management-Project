import { getText } from './project-epic-person-utils';

export function formatDate(value?: string | null): string {
  const text = getText(value);

  if (!text) {
    return 'Unknown date';
  }

  const date = new Date(text);

  if (Number.isNaN(date.getTime())) {
    return text;
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function getDateTime(value?: string | null): string {
  const text = getText(value);

  if (!text) {
    return '';
  }

  return Number.isNaN(new Date(text).getTime()) ? '' : text;
}
