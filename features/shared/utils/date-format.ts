export function formatDisplayDate(
  value: string,
  invalidFallback: string,
): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return invalidFallback;
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}
